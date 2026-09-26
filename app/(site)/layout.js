import { SiteShell } from "@/components/layout/SiteShell";
import { fetchCart } from "@/app/actions/cart";
import { fetchUserWishlist } from "@/app/actions/wishlist";
import { fetchSiteNavMenus } from "@/lib/navigation/site-nav-menus";

async function getCommerceCounts() {
  const cartRes = await fetchCart();
  const cartCount =
    cartRes.cart?.cart_items?.reduce((sum, line) => sum + (line.quantity || 0), 0) ?? 0;
  const wlRes = await fetchUserWishlist();
  let wishlistCount = wlRes.wishlist?.wishlist_items?.length ?? 0;
  return { cartCount, wishlistCount };
}

export default async function SiteLayout({ children }) {
  const [{ cartCount, wishlistCount }, navMenus] = await Promise.all([
    getCommerceCounts(),
    fetchSiteNavMenus(),
  ]);
  return (
    <SiteShell cartCount={cartCount} wishlistCount={wishlistCount} navMenus={navMenus}>
      {children}
    </SiteShell>
  );
}
