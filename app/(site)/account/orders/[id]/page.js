import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth/server";
import { createClientOptional } from "@/lib/supabase/server";
import { getOrderByIdForUser } from "@/lib/services/orders";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { PayOrderButton } from "@/components/orders/PayOrderButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { SHOW_PRICES, CHECKOUT_ENABLED, isPaymentsConfigured } from "@/config/pricing";
import { formatInrFromRupees } from "@/lib/commerce/money";
import { pageMetadata } from "@/lib/seo/metadata";

function AddressBlock({ address }) {
  if (!address || typeof address !== "object") return <p className="mt-2 text-sm text-bh-muted">—</p>;
  return (
    <div className="mt-2 text-sm text-bh-muted">
      {address.name && <p>{address.name}</p>}
      {address.line1 && <p>{address.line1}</p>}
      {address.line2 && <p>{address.line2}</p>}
      <p>{[address.city, address.state, address.pincode].filter(Boolean).join(", ")}</p>
      {address.phone && <p>{address.phone}</p>}
      {address.email && <p>{address.email}</p>}
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  return pageMetadata({ title: "Order", path: `/account/orders/${id}`, noIndex: true });
}

export default async function AccountOrderDetailPage({ params }) {
  const { id } = await params;
  const user = await requireAuth(`/account/orders/${id}`);
  const supabase = await createClientOptional();
  if (!supabase) notFound();

  const { data: order } = await getOrderByIdForUser(supabase, id, user.id);
  if (!order) notFound();

  const showTotals = SHOW_PRICES || CHECKOUT_ENABLED;
  const canPay =
    isPaymentsConfigured() &&
    order.payment_status !== "paid" &&
    order.status !== "cancelled" &&
    order.total > 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">{order.order_number}</h1>
        <p className="text-sm text-bh-muted">Placed {new Date(order.created_at).toLocaleString()}</p>
      </div>
      {canPay && (
        <GlassCard className="p-6">
          <p className="text-sm text-bh-muted">Your quote has been converted to an order. Complete payment to confirm.</p>
          <div className="mt-4">
            <PayOrderButton orderId={order.id} />
          </div>
        </GlassCard>
      )}
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="font-semibold">Status</h2>
          <p className="mt-2 capitalize">{order.status}</p>
          <p className="text-sm text-bh-muted">Payment: {order.payment_status}</p>
          {showTotals && order.total != null && (
            <p className="mt-2 text-lg font-semibold">{formatInrFromRupees(order.total)}</p>
          )}
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="font-semibold">Timeline</h2>
          <div className="mt-4">
            <OrderTimeline status={order.status} />
          </div>
        </GlassCard>
      </div>
      <GlassCard className="p-6">
        <h2 className="font-semibold">Items</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {(order.order_items || []).map((item) => (
            <li key={item.id} className="flex justify-between gap-4">
              <span>{item.product_name_snapshot} × {item.quantity}</span>
              {showTotals && item.line_total != null && <span>{formatInrFromRupees(item.line_total)}</span>}
            </li>
          ))}
        </ul>
      </GlassCard>
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="font-semibold">Billing</h2>
          <AddressBlock address={order.billing_address} />
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="font-semibold">Shipping</h2>
          <AddressBlock address={order.shipping_address} />
        </GlassCard>
      </div>
    </div>
  );
}
