import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth/server";
import { createClientOptional } from "@/lib/supabase/server";
import { getOrderByIdForUser } from "@/lib/services/orders";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { CheckCircle2 } from "lucide-react";
import { formatInrFromRupees } from "@/lib/commerce/money";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = {
  ...pageMetadata({ title: "Order confirmed", path: "/order/success", noIndex: true }),
};

export default async function OrderSuccessPage({ searchParams }) {
  const params = await searchParams;
  const orderId = params?.order;
  if (!orderId) notFound();

  const user = await requireAuth("/order/success");
  const supabase = await createClientOptional();
  if (!supabase) notFound();
  const { data: order } = await getOrderByIdForUser(supabase, orderId, user.id);
  if (!order) notFound();

  return (
    <PageContainer className="bh-section max-w-2xl text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-bh-green" aria-hidden />
      <h1 className="mt-6 font-display text-3xl font-semibold">Your order has been confirmed</h1>
      <p className="mt-2 text-bh-muted">Order {order.order_number}</p>
      <GlassCard className="mt-8 p-6 text-left">
        <p className="text-sm">Payment status: <span className="font-medium capitalize">{order.payment_status}</span></p>
        {order.total != null && <p className="mt-2 text-sm">Total: {formatInrFromRupees(order.total)}</p>}
        <ul className="mt-4 space-y-2 text-sm">
          {(order.order_items || []).map((item) => (
            <li key={item.id}>{item.product_name_snapshot} × {item.quantity}</li>
          ))}
        </ul>
      </GlassCard>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button href={`/account/orders/${order.id}`}>View order</Button>
        <Button href="/furniture" variant="outline">Continue shopping</Button>
        <Button href="/contact" variant="outline">Contact Best Homz</Button>
      </div>
    </PageContainer>
  );
}
