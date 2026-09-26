"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export function HeaderNavDropdown({ label, href, items, isActive, viewAllLabel }) {
  const hasItems = items?.length > 0;

  if (!hasItems) {
    return (
      <Link
        href={href}
        className={cn(
          "relative inline-flex items-center gap-0.5 whitespace-nowrap py-2 text-[13px] font-medium bh-focus-ring rounded-sm lg:text-sm",
          "after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:w-5 after:-translate-x-1/2 after:rounded-full after:bg-bh-green after:transition-opacity",
          isActive
            ? "text-bh-green after:opacity-100"
            : "text-bh-text after:opacity-0 hover:text-bh-green hover:after:opacity-100",
        )}
      >
        {label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link
        href={href}
        className={cn(
          "relative inline-flex items-center gap-0.5 whitespace-nowrap py-2 text-[13px] font-medium bh-focus-ring rounded-sm lg:text-sm",
          "after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:w-5 after:-translate-x-1/2 after:rounded-full after:bg-bh-green after:transition-opacity",
          isActive
            ? "text-bh-green after:opacity-100"
            : "text-bh-text after:opacity-0 hover:text-bh-green hover:after:opacity-100",
        )}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className="h-3.5 w-3.5 text-bh-muted transition group-hover:rotate-180 group-focus-within:rotate-180"
          aria-hidden
        />
      </Link>

      <div
        className={cn(
          "pointer-events-none invisible absolute left-1/2 top-full z-50 w-[min(100vw-2rem,15rem)] -translate-x-1/2 pt-2 opacity-0 transition",
          "group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100",
          "group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100",
        )}
      >
        <div className="overflow-hidden rounded-2xl p-2 bh-glass-panel shadow-[0_16px_40px_rgba(27,61,47,0.12)]">
          <ul className="max-h-[min(70vh,20rem)] overflow-y-auto">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-bh-charcoal transition hover:bg-bh-sage-muted/80 hover:text-bh-green bh-focus-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-1 border-t border-black/5 pt-1">
            <Link
              href={href}
              className="block rounded-xl px-3 py-2.5 text-xs font-semibold text-bh-green bh-focus-ring hover:bg-bh-sage-muted/60"
            >
              {viewAllLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
