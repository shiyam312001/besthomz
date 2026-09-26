import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function Checkbox({ className, id, label, variant = "default", checked, ...props }) {
  if (variant === "filter") {
    return (
      <label
        htmlFor={id}
        className={cn(
          "flex w-full cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 transition bh-focus-ring",
          checked
            ? "bg-bh-sage/65 shadow-[0_4px_14px_rgba(27,61,47,0.07)]"
            : "hover:bg-bh-sage-muted/55",
          className,
        )}
      >
        <input type="checkbox" id={id} className="sr-only" checked={checked} {...props} />
        <span
          className={cn(
            "flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-[0.35rem] transition",
            checked
              ? "bg-bh-green text-white shadow-[0_4px_10px_rgba(27,61,47,0.2)]"
              : "bg-white/95 shadow-[0_2px_8px_rgba(27,61,47,0.08)]",
          )}
          aria-hidden
        >
          {checked ? <Check className="h-3 w-3" strokeWidth={2.75} /> : null}
        </span>
        {label && (
          <span className={cn("text-sm leading-tight", checked ? "font-medium text-bh-charcoal" : "text-bh-muted")}>
            {label}
          </span>
        )}
      </label>
    );
  }

  return (
    <label htmlFor={id} className="inline-flex cursor-pointer items-start gap-2.5">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0 rounded border-bh-border text-bh-green focus:ring-bh-green/30",
          className,
        )}
        {...props}
      />
      {label && <span className="text-sm text-bh-text">{label}</span>}
    </label>
  );
}
