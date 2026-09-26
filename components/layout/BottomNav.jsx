"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Heart, Home, ShoppingBag, User } from "lucide-react";
import { bottomNavItems } from "@/config/site";
import { isBottomNavHidden } from "@/config/mobile-nav";
import { cn } from "@/lib/cn";

const iconMap = {
  home: Home,
  compass: Compass,
  heart: Heart,
  bag: ShoppingBag,
  user: User,
};

export function BottomNav() {
  const pathname = usePathname();

  if (isBottomNavHidden(pathname)) {
    return null;
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      aria-label="Mobile navigation"
    >
      <div
        className="mx-auto max-w-lg border-0 bg-white/92 px-2 pt-1 shadow-[0_-8px_32px_rgba(27,61,47,0.1)] backdrop-blur-xl pb-[max(0.35rem,env(safe-area-inset-bottom,0px))]"
      >
        <ul className="flex items-stretch justify-around">
          {bottomNavItems.map((item) => {
            const Icon = iconMap[item.icon];
            const active =
              item.href === "/"
                ? pathname === "/"
                : item.href === "/account"
                  ? pathname === "/account" || pathname?.startsWith("/account/")
                  : pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex min-h-[3.5rem] flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[11px] font-semibold leading-none bh-focus-ring",
                    active ? "text-bh-green" : "text-bh-muted",
                  )}
                >
                  <Icon className="h-[1.35rem] w-[1.35rem]" strokeWidth={active ? 2.25 : 1.75} aria-hidden />
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
