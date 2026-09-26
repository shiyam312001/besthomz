import Link from "next/link";
import { getAuthUser, getProfileForUser } from "@/lib/auth/server";
import { createClientOptional } from "@/lib/supabase/server";
import { getQuotesForUser } from "@/lib/services/quotes";
import { getShowroomVisitsForUser } from "@/lib/services/showroom";
import { fetchCart } from "@/app/actions/cart";
import { fetchUserWishlist } from "@/app/actions/wishlist";
import { GlassCard } from "@/components/ui/GlassCard";
export const metadata = { title: "My account" };

export default async function AccountPage() {
  const user = await getAuthUser();
  const profile = await getProfileForUser(user.id);
  const supabase = await createClientOptional();
  const [quotes, showroom, cartRes, wlRes] = await Promise.all([
    supabase ? getQuotesForUser(supabase, user.id) : { data: [] },
    supabase ? getShowroomVisitsForUser(supabase, user.id) : { data: [] },
    fetchCart(),
    fetchUserWishlist(),
  ]);
  const customizations = supabase
    ? await supabase.from("customizations").select("id", { count: "exact", head: true }).eq("user_id", user.id)
    : { count: 0 };

  const cards = [
    { label: "My quotes", value: quotes.data?.length ?? 0, href: "/account/quotes", empty: "Request a quote from any product" },
    { label: "Wishlist", value: wlRes.wishlist?.wishlist_items?.length ?? 0, href: "/wishlist", empty: "Save pieces you love" },
    { label: "Cart", value: cartRes.cart?.cart_items?.length ?? 0, href: "/cart", empty: "Add furniture to request a quote" },
    { label: "Customizations", value: customizations.count ?? 0, href: "/account/customizations", empty: "Start from Customize" },
    { label: "Showroom visits", value: showroom.data?.length ?? 0, href: "/account/showroom-visits", empty: "Book a showroom visit" },
    { label: "Profile", value: null, href: "/account/profile", empty: "Update your details", isProfile: true },
  ];

  const allEmpty = cards.filter((c) => !c.isProfile).every((c) => c.value === 0);

  return (
    <>
      <h1 className="font-display text-3xl font-semibold">Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}</h1>
      <p className="mt-2 text-sm text-bh-muted">Manage quotes, wishlist and showroom requests.</p>
      {allEmpty && (
        <div className="mt-6 rounded-2xl border border-bh-border bg-bh-sage/40 px-5 py-4 text-sm">
          No activity yet.{" "}
          <Link href="/furniture" className="font-medium text-bh-green underline">Browse furniture</Link> or{" "}
          <Link href="/contact" className="font-medium text-bh-green underline">contact us</Link> for a quote.
        </div>
      )}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href}>
            <GlassCard className="p-6 transition hover:shadow-md">
              <p className="text-sm text-bh-muted">{c.label}</p>
              <p className="mt-2 font-display text-3xl font-semibold">{c.isProfile ? "View" : c.value}</p>
              {c.value === 0 && c.empty && <p className="mt-1 text-xs text-bh-muted">{c.empty}</p>}
            </GlassCard>
          </Link>
        ))}
      </div>
    </>
  );
}
