import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  actionHref,
  actionLabel,
  align = "left",
  className,
}) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-3 md:mb-10",
        isCenter && "items-center text-center",
        !isCenter && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", isCenter && "mx-auto")}>
        {eyebrow && <p className="mb-2 bh-type-eyebrow">{eyebrow}</p>}
        {title && <h2 className="bh-type-h2">{title}</h2>}
        {description && <p className="mt-2 bh-type-body text-bh-muted">{description}</p>}
      </div>
      {(action || actionHref) && (
        <div className={cn("shrink-0", isCenter && "mt-1")}>
          {action ?? (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-1 bh-type-body font-semibold text-bh-green bh-focus-ring rounded-md"
            >
              {actionLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
