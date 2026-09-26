"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { mainNav } from "@/config/site";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { useQuote } from "@/components/providers/QuoteProvider";
import { cn } from "@/lib/cn";

function MobileNavSection({ item, items, onClose, viewAllLabel }) {
  const [open, setOpen] = useState(false);
  const hasChildren = items.length > 0;

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-bh-charcoal hover:bg-bh-sage/70 bh-focus-ring"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="rounded-xl bh-glass-panel">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-3 text-sm font-medium text-bh-charcoal bh-focus-ring"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown className={cn("h-4 w-4 text-bh-muted transition", open && "rotate-180")} aria-hidden />
      </button>
      {open && (
        <ul className="space-y-0.5 px-2 pb-2">
          {items.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onClose}
                className="block rounded-lg px-3 py-2.5 text-sm text-bh-charcoal hover:bg-bh-sage-muted/80 bh-focus-ring"
              >
                {child.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={item.href}
              onClick={onClose}
              className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-bh-green bh-focus-ring"
            >
              {viewAllLabel}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export function MobileMenuDrawer({ open, onClose, navMenus = {} }) {
  const { openQuote } = useQuote();

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function menuItems(menuKey) {
    if (menuKey === "furniture") return navMenus.furniture || [];
    if (menuKey === "rooms") return navMenus.rooms || [];
    return [];
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-bh-charcoal/40 transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={cn(
          "fixed inset-y-0 right-0 z-[70] flex w-[min(100%,20rem)] flex-col bg-bh-warm-white shadow-xl transition-transform duration-300 ease-out md:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-bh-charcoal hover:bg-bh-sage bh-focus-ring"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                {item.menu ? (
                  <MobileNavSection
                    item={item}
                    items={menuItems(item.menu)}
                    onClose={onClose}
                    viewAllLabel={item.menu === "furniture" ? "View all furniture" : "View all rooms"}
                  />
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-bh-charcoal hover:bg-bh-sage/70 bh-focus-ring"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-black/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button
            className="w-full"
            onClick={() => {
              onClose();
              openQuote();
            }}
          >
            Get a Quote
          </Button>
        </div>
      </aside>
    </>
  );
}
