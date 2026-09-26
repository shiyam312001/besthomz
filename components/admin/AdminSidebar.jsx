"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Layers,
  DoorOpen,
  Sparkles,
  Tag,
  FileText,
  ShoppingCart,
  Palette,
  MapPin,
  Users,
  Star,
  HelpCircle,
  Mail,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/subcategories", label: "Subcategories", icon: Layers },
  { href: "/admin/rooms", label: "Rooms", icon: DoorOpen },
  { href: "/admin/collections", label: "Collections", icon: Sparkles },
  { href: "/admin/offers", label: "Offers", icon: Tag },
  { href: "/admin/quotes", label: "Quotes", icon: FileText },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customizations", label: "Customizations", icon: Palette },
  { href: "/admin/showroom-visits", label: "Showroom", icon: MapPin },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/contact-messages", label: "Contact", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function NavLinks({ onNavigate }) {
  const pathname = usePathname();
  return (
    <ul className="space-y-1">
      {NAV.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium bh-focus-ring",
                active ? "bg-bh-green text-white" : "text-bh-charcoal hover:bg-white/70",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-bh-border bg-white/80 p-4 backdrop-blur md:block">
        <p className="mb-6 font-display text-lg font-semibold text-bh-green">Best Homz Admin</p>
        <NavLinks />
      </aside>
      <button
        type="button"
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-bh-green text-white shadow-lg md:hidden bh-focus-ring"
        aria-label="Open admin menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[min(100%,18rem)] bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display font-semibold">Menu</span>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 bh-focus-ring" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
