"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthUser } from "@/lib/auth/server";
import { fetchCart } from "@/app/actions/cart";
import { calculateCartPricing } from "@/lib/commerce/pricing";
import { orderLineFromPricingLine } from "@/lib/services/orders";
import { createRazorpayOrder, verifyPaymentSignature, isRazorpayConfigured, getPublicKeyId } from "@/lib/payments/razorpay";
import { CHECKOUT_ENABLED, isPaymentsConfigured } from "@/config/pricing";
import { trimField, FORM_LIMITS } from "@/lib/validation/forms";
import { markCartConverted } from "@/lib/services/cart";
import { paiseToRupees } from "@/lib/commerce/money";
import { notifyOrderConfirmed, notifyPaymentConfirmed } from "@/lib/notifications/order-email";

function parseAddress(formData, prefix) {
  return {
    line1: trimField(formData.get(`${prefix}_line1`), 200),
    line2: trimField(formData.get(`${prefix}_line2`), 200),
    city: trimField(formData.get(`${prefix}_city`), 100),
    state: trimField(formData.get(`${prefix}_state`), 100),
    pincode: trimField(formData.get(`${prefix}_pincode`), 12),
  };
}

export async function getCheckoutPreview() {
  if (!CHECKOUT_ENABLED) {
    return { ok: false, error: "Checkout is not enabled." };
  }
  const user = await getAuthUser();
  if (!user) return { ok: false, error: "Please sign in to checkout.", authRequired: true };

  const cartRes = await fetchCart();
  const items = cartRes.cart?.cart_items || [];
  if (!items.length) return { ok: false, error: "Your cart is empty." };

  let admin;
  try {
    admin = createAdminClient();
  } catch {
    return { ok: false, error: "Checkout is temporarily unavailable." };
  }

  const pricing = await calculateCartPricing(admin, items);
  if (!pricing.ok) return pricing;

  return {
    ok: true,
    pricing,
    paymentsConfigured: isPaymentsConfigured() && isRazorpayConfigured(),
  };
}

export async function initiateCheckout(formData) {
  if (!CHECKOUT_ENABLED) {
    return { ok: false, error: "Checkout is not enabled." };
  }
  if (!isPaymentsConfigured() || !isRazorpayConfigured()) {
    return { ok: false, error: "Payment gateway is not configured." };
  }

  const user = await getAuthUser();
  if (!user) return { ok: false, error: "Please sign in to checkout.", authRequired: true };

  const full_name = trimField(formData.get("full_name"), FORM_LIMITS.name);
  const email = trimField(formData.get("email"), FORM_LIMITS.email);
  const phone = trimField(formData.get("phone"), FORM_LIMITS.phone);
  const customer_notes = trimField(formData.get("customer_notes"), FORM_LIMITS.message);
  const sameAsBilling = formData.get("same_as_billing") === "on";

  if (!full_name || !phone) {
    return { ok: false, error: "Name and phone are required." };
  }

  const billing = parseAddress(formData, "billing");
  if (!billing.line1 || !billing.city || !billing.pincode) {
    return { ok: false, error: "Please complete your billing address." };
  }

  const shipping = sameAsBilling ? billing : parseAddress(formData, "shipping");
  if (!sameAsBilling && (!shipping.line1 || !shipping.city || !shipping.pincode)) {
    return { ok: false, error: "Please complete your shipping address." };
  }

  const cartRes = await fetchCart();
  const cart = cartRes.cart;
  const items = cart?.cart_items || [];
  if (!items.length) return { ok: false, error: "Your cart is empty." };

  const admin = createAdminClient();
  const pricing = await calculateCartPricing(admin, items);
  if (!pricing.ok) return pricing;

  const { data: order, error: orderErr } = await admin
    .from("orders")
    .insert({
      user_id: user.id,
      status: "pending",
      payment_status: "created",
      currency: pricing.currency,
      subtotal: pricing.subtotal,
      discount: pricing.discount,
      tax: pricing.tax,
      shipping: pricing.shipping,
      total: pricing.total,
      customer_notes,
      billing_address: { ...billing, name: full_name, email, phone },
      shipping_address: { ...shipping, name: full_name, phone },
    })
    .select("id, order_number")
    .single();

  if (orderErr || !order) {
    return { ok: false, error: "Could not create order. Please try again." };
  }

  const orderItems = pricing.lines.map((line) => ({
    ...orderLineFromPricingLine(line),
    order_id: order.id,
  }));

  const { error: itemsErr } = await admin.from("order_items").insert(orderItems);
  if (itemsErr) {
    await admin.from("orders").update({ status: "cancelled", payment_status: "cancelled" }).eq("id", order.id);
    return { ok: false, error: "Could not save order items." };
  }

  const rz = await createRazorpayOrder({
    amountPaise: pricing.totalPaise,
    currency: pricing.currency,
    receipt: order.order_number,
    notes: { order_id: order.id, user_id: user.id },
  });

  if (!rz.ok) {
    return { ok: false, error: rz.error };
  }

  const { data: payment, error: payErr } = await admin
    .from("payments")
    .insert({
      order_id: order.id,
      provider: "razorpay",
      amount: pricing.total,
      currency: pricing.currency,
      status: "created",
      provider_order_id: rz.order.id,
      metadata: { cart_id: cart?.id, cart_item_ids: pricing.lines.map((l) => l.cart_item_id) },
    })
    .select("id")
    .single();

  if (payErr || !payment) {
    return { ok: false, error: "Could not initialize payment." };
  }

  return {
    ok: true,
    orderId: order.id,
    orderNumber: order.order_number,
    paymentId: payment.id,
    razorpayOrderId: rz.order.id,
    amountPaise: pricing.totalPaise,
    currency: pricing.currency,
    keyId: getPublicKeyId(),
    customer: { name: full_name, email, contact: phone },
  };
}

export async function verifyCheckoutPayment(formData) {
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

  if (!verifyPaymentSignature({
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    signature: razorpaySignature,
  })) {
    return { ok: false, error: "Payment verification failed." };
  }

  const admin = createAdminClient();

  const { data: order } = await admin
    .from("orders")
    .select("id, order_number, user_id, status, payment_status")
    .eq("id", orderId)
    .maybeSingle();
  if (!order || order.user_id !== user.id) {
    return { ok: false, error: "Order not found." };
  }

  const { data: payment } = await admin
    .from("payments")
    .select("*")
    .eq("id", paymentId)
    .eq("order_id", orderId)
    .maybeSingle();

  if (!payment) return { ok: false, error: "Payment not found." };

  if (payment.status === "paid" && order.payment_status === "paid") {
    return { ok: true, orderNumber: order.order_number, alreadyPaid: true };
  }

  const { error: payUpdErr } = await admin
    .from("payments")
    .update({
      status: "paid",
      provider_payment_id: razorpayPaymentId,
      provider_signature: razorpaySignature,
      paid_at: new Date().toISOString(),
    })
    .eq("id", payment.id)
    .neq("status", "paid");

  if (payUpdErr) return { ok: false, error: "Could not update payment." };

  await admin
    .from("orders")
    .update({ status: "confirmed", payment_status: "paid" })
    .eq("id", orderId);

  const cartItemIds = payment.metadata?.cart_item_ids;
  if (Array.isArray(cartItemIds) && cartItemIds.length) {
    await admin.from("cart_items").delete().in("id", cartItemIds);
  }
  if (payment.metadata?.cart_id) {
    await markCartConverted(admin, payment.metadata.cart_id);
  }

  const { data: confirmed } = await admin.from("orders").select("order_number").eq("id", orderId).maybeSingle();
  await notifyOrderConfirmed(confirmed);
  await notifyPaymentConfirmed(confirmed, payment);

  revalidatePath("/cart");
  revalidatePath("/account/orders");
  return { ok: true, orderId: order.id };
}

export async function markPaymentFailed(formData) {
  const user = await getAuthUser();
  if (!user) return { ok: false };
  const orderId = formData.get("order_id")?.toString();
  const paymentId = formData.get("payment_id")?.toString();
  if (!orderId) return { ok: false };

  const admin = createAdminClient();
  const { data: order } = await admin.from("orders").select("user_id, payment_status").eq("id", orderId).maybeSingle();
  if (!order || order.user_id !== user.id) return { ok: false };
  if (order.payment_status === "paid") return { ok: true };

  if (paymentId) {
    await admin.from("payments").update({ status: "failed", failure_reason: "Customer payment failed or cancelled" }).eq("id", paymentId);
  }
  await admin.from("orders").update({ payment_status: "failed" }).eq("id", orderId);
  return { ok: true };
}
