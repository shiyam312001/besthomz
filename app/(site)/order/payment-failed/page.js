import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth/server";
import { createClientOptional } from "@/lib/supabase/server";
import { getOrderByIdForUser } from "@/lib/services/orders";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PayOrderButton } from "@/components/orders/PayOrderButton";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = {
  ...pageMetadata({ title: "Payment failed", path: "/order/payment-failed", noIndex: true }),
};

export default async function OrderPaymentFailedPage({ searchParams }) {
  const params = await searchParams;
  const orderId = params?.order;
  if (!orderId) notFound();

  const user = await requireAuth("/order/payment-failed");
  const supabase = await createClientOptional();
  if (!supabase) notFound();
  const { data: order } = await getOrderByIdForUser(supabase, orderId, user.id);
  if (!order) notFound();

  return (
    <PageContainer className="bh-section max-w-xl text-center">
      <h1 className="font-display text-3xl font-semibold">Payment could not be completed</h1>
      <p className="mt-2 text-bh-muted">Order {order.order_number} — your cart and order details are saved.</p>
      <GlassCard className="mt-8 p-6">
        <PayOrderButton orderId={order.id} />
      </GlassCard>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button href="/cart" variant="outline">Return to cart</Button>
        <Button href="/contact" variant="outline">Contact Best Homz</Button>
      </div>
    </PageContainer>
  );
}
