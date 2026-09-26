import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/cn";

export function QuoteCTA({
  title = "Get a Free Quote Today",
  description = "Tell us what you need — our team will respond with personalized pricing and options.",
  primaryLabel = "Get a Quote",
  secondaryLabel = "Talk to an Expert",
  primaryHref = "/quote",
  secondaryHref = "/furniture-expert",
  variant = "dark",
  className,
  backgroundImage,
}) {
  const isDark = variant === "dark";
  const isGlass = variant === "glass";
  const isLight = variant === "light";

  const wrapperClass = cn(
    "relative overflow-hidden rounded-2xl p-6 md:p-10",
    isDark && "bg-bh-green text-white",
    isLight && "bg-bh-cream text-bh-charcoal border border-bh-border",
    isGlass && "text-bh-charcoal",
    className,
  );

  const Inner = isGlass ? GlassCard : "div";

  return (
    <div className={wrapperClass}>
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            aria-hidden
          />
          <div className="absolute inset-0 bg-bh-green/85" aria-hidden />
        </>
      )}
      <Inner
        variant={isGlass ? "strong" : undefined}
        className={cn("relative z-[1]", !isGlass && "contents")}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">{title}</h2>
            <p className={cn("mt-2 text-sm leading-relaxed md:text-base", isDark ? "text-white/85" : "text-bh-muted")}>
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={primaryHref}
              variant={isDark || backgroundImage ? "secondary" : "primary"}
              className={isDark || backgroundImage ? "bg-white text-bh-green hover:bg-bh-cream" : undefined}
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              {primaryLabel}
            </Button>
            {secondaryLabel && (
              <Button
                href={secondaryHref}
                variant="outline"
                className={isDark || backgroundImage ? "border-white/40 text-white hover:bg-white/10" : undefined}
              >
                {secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </Inner>
    </div>
  );
}
