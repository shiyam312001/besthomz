import { CartPageClient } from "@/components/cart/CartPageClient";
import { CommercePageHero } from "@/components/commerce/CommercePageHero";

export const metadata = {
  title: "Cart",
  description: "Your Best Homz cart — request a quote for your selected furniture.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <>
      <CommercePageHero
        breadcrumbCurrent="Cart"
        title="Your Cart"
        subtitle="Handpicked pieces for a better home. Review your items and proceed to get a quote."
      />
      <section className="bg-bh-sage-muted/25 py-10 md:py-12 lg:py-14">
        <CartPageClient />
      </section>
    </>
  );
}
