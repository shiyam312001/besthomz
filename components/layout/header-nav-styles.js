import { cn } from "@/lib/cn";

/** Shared underline + color states for desktop nav links */
export function desktopNavLinkClass(isActive) {
  return cn(
    "bh-nav-link relative inline-flex items-center gap-0.5 whitespace-nowrap py-2 bh-focus-ring rounded-sm",
    "after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:w-5 after:-translate-x-1/2 after:rounded-full after:bg-bh-green after:transition-opacity",
    isActive
      ? "bh-nav-link-active text-bh-green after:opacity-100"
      : "text-bh-text after:opacity-0 hover:text-bh-green hover:after:opacity-100",
  );
}
