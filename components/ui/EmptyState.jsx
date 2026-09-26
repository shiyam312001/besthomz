import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export function EmptyState({
  title = "Nothing here yet",
  description,
  actionLabel,
  actionHref,
  onAction,
  icon,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-bh-border bg-white/60 px-6 py-14 text-center max-lg:border-0 max-lg:bg-transparent max-lg:shadow-none",
        className,
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-bh-sage text-bh-green">
        {icon ?? <PackageOpen className="h-7 w-7" strokeWidth={1.5} aria-hidden />}
      </div>
      <h3 className="font-display text-xl font-semibold text-bh-charcoal">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-bh-muted">{description}</p>}
      {(actionLabel && actionHref) && (
        <Button href={actionHref} className="mt-6" size="sm">
          {actionLabel}
        </Button>
      )}
      {actionLabel && onAction && (
        <Button className="mt-6" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
