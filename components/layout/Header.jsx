"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Heart, Search, ShoppingBag } from "lucide-react";
import { mainNav } from "@/config/site";
import { Logo } from "@/components/brand/Logo";
import { HeaderNavDropdown } from "@/components/layout/HeaderNavDropdown";
import { PageContainer } from "@/components/layout/PageContainer";
import { TopContactBar, TopContactBarMobile } from "@/components/layout/TopContactBar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileMenuDrawer } from "@/components/layout/MobileMenuDrawer";
import { cn } from "@/lib/cn";
import { desktopNavLinkClass } from "@/components/layout/header-nav-styles";
import { useQuote } from "@/components/providers/QuoteProvider";
import { useCommerce } from "@/components/providers/CommerceProvider";

function DesktopHeader({ navMenus }) {
  const { openQuote } = useQuote();
  const { cartCount, wishlistCount } = useCommerce();
  const pathname = usePathname();

  function menuItems(menuKey) {
    if (menuKey === "furniture") return navMenus.furniture || [];
    if (menuKey === "rooms") return navMenus.rooms || [];
    return [];
  }

  return (
    <PageContainer className="hidden h-[4.75rem] items-center gap-3 lg:flex lg:gap-4 xl:gap-6">
      <Logo className="shrink-0" showTagline />

      <nav aria-label="Main" className="hidden min-w-0 flex-1 justify-center xl:flex">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 lg:gap-x-5">
          {mainNav.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
            const items = item.menu ? menuItems(item.menu) : [];
            return (
              <li key={item.href}>
                {item.menu ? (
                  <HeaderNavDropdown
                    label={item.label}
                    href={item.href}
                    items={items}
                    isActive={isActive}
                    viewAllLabel={item.menu === "furniture" ? "View all furniture" : "View all rooms"}
                  />
                ) : (
                  <Link href={item.href} className={desktopNavLinkClass(isActive)}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-3">
        <form
          className="relative hidden min-w-0 sm:block sm:w-[11rem] md:w-[12.5rem] lg:w-[14rem] xl:w-[16rem]"
          onSubmit={(e) => {
            e.preventDefault();
            const q = new FormData(e.currentTarget).get("q")?.toString().trim();
            if (q) window.location.href = `/search?q=${encodeURIComponent(q)}`;
          }}
        >
          <span className="sr-only">Search furniture</span>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-bh-muted"
            aria-hidden
          />
          <input
            name="q"
            type="search"
            placeholder="Search furniture..."
            className="h-10 w-full rounded-full border border-black/10 bg-bh-cream/70 pl-10 pr-4 font-sans text-[length:var(--bh-text-body)] text-bh-text placeholder:text-bh-muted focus:border-bh-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-bh-green/12"
          />
        </form>

        <Link
          href="/wishlist"
          className="relative rounded-full p-2 text-bh-charcoal hover:bg-bh-sage/50 bh-focus-ring"
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
          className="relative rounded-full p-2 text-bh-charcoal hover:bg-bh-sage/50 bh-focus-ring"
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
          onClick={() => openQuote()}
          className="hidden h-10 items-center gap-1.5 rounded-full bg-bh-green px-4 font-sans text-[length:var(--bh-text-body)] font-semibold text-white shadow-sm transition hover:bg-bh-green-light bh-focus-ring sm:inline-flex lg:px-5"
        >
          Get Quote
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </PageContainer>
  );
}

export function Header({ navMenus = {} }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <TopContactBar />
      <TopContactBarMobile />
      <div
        className={cn(
          "bg-white transition-shadow duration-200",
          "max-lg:border-0 max-lg:shadow-[0_8px_28px_-14px_rgba(27,61,47,0.1)]",
          "lg:border-b lg:border-black/10",
          scrolled && "lg:shadow-[0_2px_12px_rgba(27,61,47,0.06)]",
        )}
      >
        <MobileHeader scrolled={scrolled} menuOpen={menuOpen} onMenuOpen={() => setMenuOpen(true)} />
        <DesktopHeader navMenus={navMenus} />
      </div>
      <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} navMenus={navMenus} />
    </header>
  );
}