import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again in a moment.",
  onRetry,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-red-200/80 bg-red-50/50 px-6 py-12 text-center",
        className,
      )}
      role="alert"
    >
      <AlertCircle className="mb-3 h-10 w-10 text-red-600" strokeWidth={1.5} aria-hidden />
      <h3 className="font-display text-xl font-semibold text-bh-charcoal">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-bh-muted">{description}</p>
      {onRetry && (
        <Button variant="outline" className="mt-6" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
