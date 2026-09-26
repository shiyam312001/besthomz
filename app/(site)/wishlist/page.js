import { WishlistView } from "@/components/wishlist/WishlistView";
import { CommercePageHero } from "@/components/commerce/CommercePageHero";
import { getAuthUser } from "@/lib/auth/server";
import { createClientOptional } from "@/lib/supabase/server";
import { getWishlistForUser } from "@/lib/services/wishlist";

export const metadata = {
  title: "Wishlist",
  description: "Saved furniture from Best Homz.",
  robots: { index: false, follow: false },
};

export default async function WishlistPage() {
  const user = await getAuthUser();
  const supabase = await createClientOptional();
  let items = [];
  if (user && supabase) {
    const { data } = await getWishlistForUser(supabase, user.id);
    items = data?.wishlist_items || [];
  }

  return (
    <>
      <CommercePageHero
        breadcrumbCurrent="Wishlist"
        title="Your Wishlist"
        subtitle="Pieces you love, saved for later. Request a quote or add to cart anytime."
      />
      <section className="bg-bh-sage-muted/25 py-10 md:py-12 lg:py-14">
        <WishlistView serverProducts={items} isLoggedIn={Boolean(user)} />
      </section>
    </>
  );
}
