import { redirect } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { CheckoutView } from "@/components/checkout/CheckoutView";
import { getCheckoutPreview } from "@/app/actions/checkout";
import { CHECKOUT_ENABLED } from "@/config/pricing";
import { getAuthUser } from "@/lib/auth/server";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = {
  ...pageMetadata({ title: "Checkout", path: "/checkout", noIndex: true }),
};

export default async function CheckoutPage() {
  if (!CHECKOUT_ENABLED) {
    redirect("/cart");
  }
  const user = await getAuthUser();
  if (!user) {
    redirect("/login?next=/checkout");
  }
  const preview = await getCheckoutPreview();

  return (
    <PageContainer className="bh-section">
      <h1 className="font-display text-2xl font-semibold sm:text-3xl lg:text-3xl">Checkout</h1>
      <p className="mt-2 text-[0.9375rem] text-bh-muted lg:text-sm">Secure payment · quote-first service still available</p>
      <div className="mt-8">
        <CheckoutView preview={preview} userEmail={user.email} />
      </div>
    </PageContainer>
  );
}
