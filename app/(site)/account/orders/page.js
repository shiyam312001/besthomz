import Link from "next/link";
import { requireAuth } from "@/lib/auth/server";
import { createClientOptional } from "@/lib/supabase/server";
import { getOrdersForUser } from "@/lib/services/orders";
import { EmptyState } from "@/components/ui/EmptyState";
import { SHOW_PRICES, CHECKOUT_ENABLED } from "@/config/pricing";
import { formatInrFromRupees } from "@/lib/commerce/money";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = {
  ...pageMetadata({ title: "Orders", path: "/account/orders", noIndex: true }),
};

export default async function AccountOrdersPage() {
  const user = await requireAuth("/account/orders");
  const supabase = await createClientOptional();
  const { data: orders } = supabase ? await getOrdersForUser(supabase, user.id) : { data: [] };
  const showTotals = SHOW_PRICES || CHECKOUT_ENABLED;

  if (!orders?.length) {
    return (
      <>
        <h1 className="font-display text-2xl font-semibold">Orders</h1>
        <EmptyState
          className="mt-8"
          title="No orders yet"
          description="When you complete checkout or pay for an approved quote, your orders will appear here."
          actionHref="/furniture"
          actionLabel="Explore furniture"
        />
      </>
    );
  }

  return (
    <>
      <h1 className="font-display text-2xl font-semibold">Orders</h1>
      <ul className="mt-8 space-y-3">
        {orders.map((order) => (
          <li key={order.id}>
            <Link
              href={`/account/orders/${order.id}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-bh-border bg-white/80 p-4 shadow-sm backdrop-blur bh-focus-ring"
            >
              <div>
                <p className="font-medium">{order.order_number}</p>
                <p className="text-xs text-bh-muted">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <div className="text-right text-sm">
                <p className="capitalize">{order.status?.replace(/_/g, " ")}</p>
                <p className="text-bh-muted">Payment: {order.payment_status}</p>
                {showTotals && order.total != null && (
                  <p className="font-semibold">{formatInrFromRupees(order.total)}</p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
