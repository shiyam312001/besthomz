"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/account", label: "Overview" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/quotes", label: "Quotes" },
  { href: "/account/wishlist", label: "Wishlist" },
  { href: "/account/cart", label: "Cart" },
  { href: "/account/customizations", label: "Customizations" },
  { href: "/account/showroom-visits", label: "Showroom" },
  { href: "/account/orders", label: "Orders" },
];

export function AccountNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Account" className="bh-scroll-x flex gap-2 border-b border-bh-border pb-3">
      {LINKS.map((link) => {
        const active = pathname === link.href || (link.href !== "/account" && pathname.startsWith(link.href));
        return (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-medium bh-focus-ring",
            active ? "bg-bh-green text-white" : "bg-bh-cream text-bh-charcoal hover:bg-bh-sage/60",
          )}
        >
          {link.label}
        </Link>
        );
      })}
    </nav>
  );
}
