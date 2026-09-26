import { cn } from "@/lib/cn";

const tones = {
  new: "bg-sky-100 text-sky-800",
  popular: "bg-bh-sage text-bh-green",
  bestseller: "bg-bh-green text-white",
  featured: "bg-amber-100 text-amber-900",
  customizable: "bg-bh-beige text-bh-charcoal",
  default: "bg-bh-sage-muted text-bh-green",
};

export function Badge({ children, tone = "default", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        tones[tone] ?? tones.default,
        className,
      )}
    >
      {children}
    </span>
  );
}
