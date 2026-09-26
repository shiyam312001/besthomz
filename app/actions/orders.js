"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthUser } from "@/lib/auth/server";
import { createRazorpayOrder, verifyPaymentSignature, isRazorpayConfigured, getPublicKeyId } from "@/lib/payments/razorpay";
import { isPaymentsConfigured } from "@/config/pricing";
import { rupeesToPaise } from "@/lib/commerce/money";
import { revalidatePath } from "next/cache";

export async function initiateOrderPayment(orderId) {
  if (!isPaymentsConfigured() || !isRazorpayConfigured()) {
    return { ok: false, error: "Payment gateway is not configured." };
  }
  const user = await getAuthUser();
  if (!user) return { ok: false, error: "Please sign in.", authRequired: true };

  const admin = createAdminClient();
  const { data: order } = await admin
    .from("orders")
    .select("id, order_number, user_id, total, currency, payment_status, status, billing_address")
    .eq("id", orderId)
    .maybeSingle();

  if (!order || order.user_id !== user.id) return { ok: false, error: "Order not found." };
  if (order.payment_status === "paid") return { ok: false, error: "This order is already paid." };
  if (!order.total || order.total <= 0) return { ok: false, error: "Order total is not ready for payment." };

  const amountPaise = rupeesToPaise(order.total);
  const rz = await createRazorpayOrder({
    amountPaise,
    currency: order.currency || "INR",
    receipt: order.order_number,
    notes: { order_id: order.id, user_id: user.id },
  });
  if (!rz.ok) return { ok: false, error: rz.error };

  const { data: payment, error: payErr } = await admin
    .from("payments")
    .insert({
      order_id: order.id,
      provider: "razorpay",
      amount: order.total,
      currency: order.currency || "INR",
      status: "created",
      provider_order_id: rz.order.id,
    })
    .select("id")
    .single();

  if (payErr || !payment) return { ok: false, error: "Could not initialize payment." };

  await admin.from("orders").update({ payment_status: "created" }).eq("id", order.id);

  const billing = order.billing_address || {};
  return {
    ok: true,
    orderId: order.id,
    orderNumber: order.order_number,
    paymentId: payment.id,
    razorpayOrderId: rz.order.id,
    amountPaise,
    currency: order.currency || "INR",
    keyId: getPublicKeyId(),
    customer: {
      name: billing.name || user.email,
      email: billing.email || user.email,
      contact: billing.phone,
    },
  };
}

export async function verifyOrderPayment(formData) {
  const user = await getAuthUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const orderId = formData.get("order_id")?.toString();
  const paymentId = formData.get("payment_id")?.toString();
  const razorpayOrderId = formData.get("razorpay_order_id")?.toString();
  const razorpayPaymentId = formData.get("razorpay_payment_id")?.toString();
  const razorpaySignature = formData.get("razorpay_signature")?.toString();

  if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return { ok: false, error: "Invalid payment response." };
  }

  if (!verifyPaymentSignature({ orderId: razorpayOrderId, paymentId: razorpayPaymentId, signature: razorpaySignature })) {
    return { ok: false, error: "Payment verification failed." };
  }

  const admin = createAdminClient();
  const { data: order } = await admin.from("orders").select("id, user_id, payment_status").eq("id", orderId).maybeSingle();
  if (!order || order.user_id !== user.id) return { ok: false, error: "Order not found." };

  const { data: payment } = await admin.from("payments").select("*").eq("id", paymentId).eq("order_id", orderId).maybeSingle();
  if (!payment) return { ok: false, error: "Payment not found." };
  if (payment.status === "paid") return { ok: true, orderId };

  await admin
    .from("payments")
    .update({
      status: "paid",
      provider_payment_id: razorpayPaymentId,
      provider_signature: razorpaySignature,
      paid_at: new Date().toISOString(),
    })
    .eq("id", payment.id)
    .neq("status", "paid");

  await admin.from("orders").update({ status: "confirmed", payment_status: "paid" }).eq("id", orderId);

  revalidatePath("/account/orders");
  revalidatePath(`/account/orders/${orderId}`);
  return { ok: true, orderId };
}
