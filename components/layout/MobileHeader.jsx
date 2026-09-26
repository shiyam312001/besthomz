"use client";

import { Menu, Search, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { useCommerce } from "@/components/providers/CommerceProvider";
import { cn } from "@/lib/cn";

export function MobileHeader({ scrolled, onMenuOpen, menuOpen = false }) {
  const { cartCount, wishlistCount } = useCommerce();
  return (
    <div
      className={cn(
        "flex h-14 items-center justify-between gap-2 px-4 md:hidden",
        scrolled && "shadow-sm",
      )}
    >
      <Logo className="min-w-0" />
      <div className="flex items-center gap-0.5">
        <Link
          href="/search"
          className="rounded-full p-2.5 text-bh-charcoal hover:bg-bh-sage/60 bh-focus-ring"
          aria-label="Search"
        >
          <Search className="h-5 w-5" strokeWidth={1.75} />
        </Link>
        <Link
          href="/wishlist"
          className="relative rounded-full p-2.5 text-bh-charcoal hover:bg-bh-sage/60 bh-focus-ring"
          aria-label="Wishlist"
        >
          <Heart className="h-5 w-5" strokeWidth={1.75} />
          {wishlistCount > 0 && (
            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-bh-green px-0.5 text-[9px] font-bold text-white">
              {wishlistCount > 9 ? "9+" : wishlistCount}
            </span>
          )}
        </Link>
        <Link
          href="/cart"
          className="relative rounded-full p-2.5 text-bh-charcoal hover:bg-bh-sage/60 bh-focus-ring"
          aria-label="Cart"
        >
          <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
          {cartCount > 0 && (
            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-bh-green px-0.5 text-[9px] font-bold text-white">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </Link>
        <button
          type="button"
          onClick={onMenuOpen}
          className="rounded-full p-2.5 text-bh-charcoal hover:bg-bh-sage/60 bh-focus-ring"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
