import { createAdminClient } from "@/lib/supabase/admin";
import { verifyWebhookSignature } from "@/lib/payments/razorpay";
import { markCartConverted } from "@/lib/services/cart";

export const dynamic = "force-dynamic";

async function markOrderPaid(admin, { providerOrderId, providerPaymentId }) {
  const { data: payment } = await admin
    .from("payments")
    .select("*")
    .eq("provider", "razorpay")
    .eq("provider_order_id", providerOrderId)
    .maybeSingle();

  if (!payment) return { ok: false, reason: "payment_not_found" };
  if (payment.status === "paid") return { ok: true, idempotent: true };

  const { data: order } = await admin.from("orders").select("id, payment_status").eq("id", payment.order_id).maybeSingle();
  if (!order) return { ok: false, reason: "order_not_found" };

  await admin
    .from("payments")
    .update({
      status: "paid",
      provider_payment_id: providerPaymentId,
      paid_at: new Date().toISOString(),
    })
    .eq("id", payment.id);

  await admin.from("orders").update({ status: "confirmed", payment_status: "paid" }).eq("id", order.id);

  const cartItemIds = payment.metadata?.cart_item_ids;
  if (Array.isArray(cartItemIds) && cartItemIds.length) {
    await admin.from("cart_items").delete().in("id", cartItemIds);
  }
  if (payment.metadata?.cart_id) {
    await markCartConverted(admin, payment.metadata.cart_id);
  }

  return { ok: true };
}

export async function POST(request) {
  const signature = request.headers.get("x-razorpay-signature");
  const rawBody = await request.text();

  if (!verifyWebhookSignature(rawBody, signature)) {
    return new Response("Invalid signature", { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const eventType = event?.event;
  const payload = event?.payload;

  try {
    const admin = createAdminClient();

    if (eventType === "payment.captured") {
      const p = payload?.payment?.entity;
      await markOrderPaid(admin, {
        providerOrderId: p?.order_id,
        providerPaymentId: p?.id,
      });
    }

    if (eventType === "payment.failed") {
      const p = payload?.payment?.entity;
      if (p?.order_id) {
        await admin
          .from("payments")
          .update({ status: "failed", failure_reason: p?.error_description || "failed" })
          .eq("provider", "razorpay")
          .eq("provider_order_id", p.order_id)
          .neq("status", "paid");
        const { data: pay } = await admin
          .from("payments")
          .select("order_id")
          .eq("provider_order_id", p.order_id)
          .maybeSingle();
        if (pay?.order_id) {
          await admin.from("orders").update({ payment_status: "failed" }).eq("id", pay.order_id).neq("payment_status", "paid");
        }
      }
    }
  } catch (e) {
    console.error("razorpay webhook error", e?.message);
    return new Response("Webhook error", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
