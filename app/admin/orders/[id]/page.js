import { notFound } from "next/navigation";
import Link from "next/link";
import { getStaffSupabase } from "@/lib/auth/staff";
import { getOrderByIdStaff } from "@/lib/services/orders";
import { OrderAdminActions } from "@/components/admin/OrderAdminActions";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { formatInrFromRupees } from "@/lib/commerce/money";

export default async function AdminOrderDetailPage({ params }) {
  const { id } = await params;
  const { supabase } = await getStaffSupabase();
  if (!supabase) notFound();
  const { data: order } = await getOrderByIdStaff(supabase, id);
  if (!order) notFound();

  let profile = null;
  if (order.user_id) {
    const { data } = await supabase.from("profiles").select("full_name, email, phone").eq("id", order.user_id).maybeSingle();
    profile = data;
  }

  const payment = (order.payments || [])[0];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">{order.order_number}</h1>
          <p className="text-sm text-bh-muted">{new Date(order.created_at).toLocaleString()}</p>
          {order.quote_id && (
            <Link href={`/admin/quotes/${order.quote_id}`} className="text-sm text-bh-green underline">View quote</Link>
          )}
        </div>
        <OrderAdminActions order={order} />
      </div>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-bh-border bg-white p-4">
          <p className="text-xs text-bh-muted">Status</p>
          <p className="font-semibold capitalize">{order.status}</p>
        </div>
        <div className="rounded-2xl border border-bh-border bg-white p-4">
          <p className="text-xs text-bh-muted">Payment</p>
          <p className="font-semibold capitalize">{order.payment_status}</p>
        </div>
        <div className="rounded-2xl border border-bh-border bg-white p-4">
          <p className="text-xs text-bh-muted">Total</p>
          <p className="font-semibold">{order.total != null ? formatInrFromRupees(order.total) : "—"}</p>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-bh-border bg-white p-6">
          <h2 className="font-semibold">Customer</h2>
          <p className="mt-2 text-sm">{profile?.full_name || order.billing_address?.name}</p>
          <p className="text-sm">{profile?.email || order.billing_address?.email}</p>
          <p className="text-sm">{profile?.phone || order.billing_address?.phone}</p>
        </div>
        <div className="rounded-2xl border border-bh-border bg-white p-6">
          <h2 className="font-semibold">Timeline</h2>
          <div className="mt-4">
            <OrderTimeline status={order.status} />
          </div>
        </div>
      </section>
      <section className="rounded-2xl border border-bh-border bg-white p-6">
        <h2 className="font-semibold">Items</h2>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="text-left text-bh-muted">
              <th className="pb-2">Product</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Line</th>
            </tr>
          </thead>
          <tbody>
            {(order.order_items || []).map((item) => (
              <tr key={item.id} className="border-t border-bh-border">
                <td className="py-2">{item.product_name_snapshot}</td>
                <td>{item.quantity}</td>
                <td>{item.unit_price != null ? formatInrFromRupees(item.unit_price) : "—"}</td>
                <td>{item.line_total != null ? formatInrFromRupees(item.line_total) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 space-y-1 text-sm text-right">
          <p>Subtotal: {formatInrFromRupees(order.subtotal)}</p>
          <p>Tax: {formatInrFromRupees(order.tax)}</p>
          <p>Shipping: {formatInrFromRupees(order.shipping)}</p>
          <p className="font-semibold">Total: {formatInrFromRupees(order.total)}</p>
        </div>
      </section>
      {payment && (
        <section className="rounded-2xl border border-bh-border bg-white p-6">
          <h2 className="font-semibold">Payment</h2>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div><dt className="text-bh-muted">Provider</dt><dd>{payment.provider}</dd></div>
            <div><dt className="text-bh-muted">Razorpay order</dt><dd className="break-all">{payment.provider_order_id || "—"}</dd></div>
            <div><dt className="text-bh-muted">Razorpay payment</dt><dd className="break-all">{payment.provider_payment_id || "—"}</dd></div>
            <div><dt className="text-bh-muted">Status</dt><dd className="capitalize">{payment.status}</dd></div>
            <div><dt className="text-bh-muted">Amount</dt><dd>{formatInrFromRupees(payment.amount)}</dd></div>
            <div><dt className="text-bh-muted">Paid at</dt><dd>{payment.paid_at ? new Date(payment.paid_at).toLocaleString() : "—"}</dd></div>
          </dl>
        </section>
      )}
    </div>
  );
}
