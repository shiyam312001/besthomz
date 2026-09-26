import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { QuoteProvider } from "@/components/providers/QuoteProvider";
import { CommerceProvider } from "@/components/providers/CommerceProvider";
import { GuestCommerceSync } from "@/components/commerce/GuestCommerceSync";

export function SiteShell({ children, cartCount = 0, wishlistCount = 0, navMenus = {} }) {
  return (
    <QuoteProvider>
      <CommerceProvider initialCartCount={cartCount} initialWishlistCount={wishlistCount}>
        <GuestCommerceSync />
        <Header navMenus={navMenus} />
        <main className="flex flex-1 flex-col pt-[var(--bh-site-header-offset)] pb-safe-nav lg:pb-0">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </CommerceProvider>
    </QuoteProvider>
  );
}
