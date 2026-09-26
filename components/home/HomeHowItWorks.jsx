import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { cn } from "@/lib/cn";

const STEPS = [
  { num: "01", label: "Explore", description: "Browse our collection" },
  { num: "02", label: "Customize", description: "Choose size, material & design" },
  { num: "03", label: "Get Quote", description: "Request a personalized quote" },
  { num: "04", label: "Confirmation", description: "Review and finalize" },
  { num: "05", label: "Delivery & Installation", description: "We deliver and set up at your home" },
];

function StepNumber({ num, variant = "light", className }) {
  const light = variant === "light";
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-bold",
        light
          ? "bg-bh-sage text-bh-green shadow-[0_4px_14px_rgba(27,61,47,0.08)]"
          : "bg-bh-green text-white shadow-[0_4px_14px_rgba(27,61,47,0.22)]",
        className,
      )}
    >
      {num}
    </span>
  );
}

export function HomeHowItWorks() {
  return (
    <section className="bh-section bg-bh-warm-white">
      <PageContainer>
        <div className="mb-6 md:mb-8 lg:mb-10">
          <h2 className="font-display text-2xl font-semibold text-bh-charcoal sm:text-3xl md:text-4xl">
            How It Works
          </h2>
          <p className="mt-2 max-w-xl text-[0.9375rem] text-bh-muted md:text-base lg:text-sm">
            From inspiration to installation — we make it simple.
          </p>
        </div>

        {/* Mobile: swipe cards */}
        <ol
          className={cn(
            "flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 md:hidden",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          {STEPS.map((step, stepIndex) => (
            <li
              key={step.num}
              className="relative flex min-w-[82%] shrink-0 snap-center flex-row items-start gap-3 rounded-2xl p-4 bh-glass-subtle sm:min-w-[58%]"
            >
              {stepIndex < STEPS.length - 1 && (
                <span
                  className="absolute bottom-4 left-[1.125rem] top-12 w-px bg-gradient-to-b from-bh-green/35 to-bh-green/10"
                  aria-hidden
                />
              )}
              <StepNumber num={step.num} variant="light" className="h-10 w-10 text-[11px]" />
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-semibold text-bh-green">{step.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-bh-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Medium & large: horizontal flow (screenshot) */}
        <ol className="hidden w-full md:flex md:items-start md:justify-between md:gap-1 lg:gap-2">
          {STEPS.map((step, stepIndex) => (
            <li
              key={step.num}
              className="flex min-w-0 flex-1 items-start"
            >
              <div className="flex min-w-0 flex-1 items-start gap-2.5 lg:gap-3">
                <StepNumber
                  num={step.num}
                  variant="light"
                  className="mt-0.5 h-9 w-9 text-[11px] lg:h-10 lg:w-10 lg:text-xs"
                />
                <div className="min-w-0 pr-1">
                  <p className="text-sm font-semibold leading-tight text-bh-green lg:text-[0.9375rem]">
                    {step.label}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-bh-muted lg:mt-1.5 lg:text-xs lg:leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {stepIndex < STEPS.length - 1 && (
                <span
                  className="flex shrink-0 items-center self-center px-0.5 pt-0.5 text-bh-muted/30 lg:px-1.5"
                  aria-hidden
                >
                  <ArrowRight className="h-4 w-4 stroke-[1.75] lg:h-[1.125rem] lg:w-[1.125rem]" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </PageContainer>
    </section>
  );
}
