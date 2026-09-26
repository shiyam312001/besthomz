import { cn } from "@/lib/cn";

const variants = {
  default:
    "w-full rounded-xl border border-bh-border bg-white px-4 py-3 text-sm text-bh-text placeholder:text-bh-muted/70 transition-colors focus:border-bh-green focus:outline-none focus:ring-2 focus:ring-bh-green/20",
  glass:
    "bh-input-glass w-full resize-y rounded-2xl border-0 px-4 py-3 text-sm text-bh-text shadow-[0_6px_20px_rgba(27,61,47,0.06)] placeholder:text-bh-muted/75",
};

export function Textarea({ className, id, rows = 4, variant = "default", ...props }) {
  return (
    <textarea
      id={id}
      rows={rows}
      className={cn(variants[variant] ?? variants.default, className)}
      {...props}
    />
  );
}
