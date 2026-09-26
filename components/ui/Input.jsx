import { cn } from "@/lib/cn";

const variants = {
  default:
    "h-11 w-full rounded-xl border border-bh-border bg-white px-4 font-sans text-[length:var(--bh-text-body)] text-bh-text placeholder:text-bh-muted/70 transition-colors focus:border-bh-green focus:outline-none focus:ring-2 focus:ring-bh-green/20",
  glass:
    "bh-input-glass h-12 w-full rounded-2xl border-0 px-4 font-sans text-[length:var(--bh-text-body)] text-bh-text shadow-[0_6px_20px_rgba(27,61,47,0.06)] placeholder:text-bh-muted/75",
};

export function Input({ className, id, variant = "default", ...props }) {
  return (
    <input
      id={id}
      className={cn(variants[variant] ?? variants.default, className)}
      {...props}
    />
  );
}
