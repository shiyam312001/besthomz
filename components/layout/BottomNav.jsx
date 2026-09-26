"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Heart, Home, LayoutGrid, Store } from "lucide-react";
import { bottomNavItems } from "@/config/site";
import { isBottomNavHidden } from "@/config/mobile-nav";
import { useQuote } from "@/components/providers/QuoteProvider";
import { cn } from "@/lib/cn";

const iconMap = {
  home: Home,
  shop: Store,
  rooms: LayoutGrid,
  heart: Heart,
  quote: FileText,
};

export function BottomNav() {
  const pathname = usePathname();
  const { openQuote } = useQuote();

  if (isBottomNavHidden(pathname)) {
    return null;
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
      aria-label="Mobile navigation"
    >
      <div
        className="border-0 bg-white/95 shadow-[0_-10px_36px_rgba(27,61,47,0.12)] backdrop-blur-xl pb-[max(0.4rem,env(safe-area-inset-bottom,0px))] pt-1.5"
      >
        <ul className="mx-auto flex max-w-lg items-stretch justify-around px-1">
          {bottomNavItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isQuote = item.action === "quote";
            const active =
              !isQuote &&
              (item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname?.startsWith(`${item.href}/`));

            const itemClass = cn(
              "flex min-h-[3.75rem] w-full flex-col items-center justify-center gap-1 rounded-2xl px-1 bh-type-small font-semibold leading-none bh-focus-ring",
              active ? "text-bh-green" : "text-bh-muted",
            );

            const iconWrap = cn(
              "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              active && item.href === "/" ? "bg-bh-green text-white shadow-[0_6px_16px_rgba(27,61,47,0.22)]" : "",
            );

            if (isQuote) {
              return (
                <li key={item.label} className="flex-1">
                  <button type="button" className={itemClass} onClick={() => openQuote()}>
                    <span className={iconWrap}>
                      <Icon className="h-[1.25rem] w-[1.25rem]" strokeWidth={1.75} aria-hidden />
                    </span>
                    {item.label}
                  </button>
                </li>
              );
            }

            return (
              <li key={item.href} className="flex-1">
                <Link href={item.href} className={itemClass}>
                  <span className={iconWrap}>
                    <Icon
                      className={cn(
                        "h-[1.25rem] w-[1.25rem]",
                        active && item.href === "/" ? "text-white" : "",
                      )}
                      strokeWidth={active ? 2.25 : 1.75}
                      aria-hidden
                    />
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
