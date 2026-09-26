import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const variants = {
  default:
    "h-11 w-full appearance-none rounded-xl border border-bh-border bg-white px-4 pr-10 font-sans text-[length:var(--bh-text-body)] text-bh-text transition-colors focus:border-bh-green focus:outline-none focus:ring-2 focus:ring-bh-green/20",
  glass:
    "bh-input-glass h-12 w-full appearance-none rounded-2xl border-0 px-4 pr-10 font-sans text-[length:var(--bh-text-body)] text-bh-text shadow-[0_6px_20px_rgba(27,61,47,0.06)]",
};

export function Select({ className, id, children, variant = "default", ...props }) {
  return (
    <div className="relative">
      <select
        id={id}
        className={cn(variants[variant] ?? variants.default, className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bh-muted"
        aria-hidden
      />
    </div>
  );
}
