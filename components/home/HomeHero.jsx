"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { useQuote } from "@/components/providers/QuoteProvider";
import { cn } from "@/lib/cn";

const SLIDES = [
  {
    src: "/BestHomz/Homepage/hero/01-hero-sofa.png",
    alt: "Premium living room with Best Homz sofa",
  },
];

const HERO_TRUST = ["Quality", "Custom Design", "Trusted by Families"];
const SLIDE_TOTAL = 3;

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const { openQuote } = useQuote();
  const slide = SLIDES[index] ?? SLIDES[0];

  return (
    <section className="relative min-h-[28rem] overflow-hidden bg-bh-cream md:min-h-[32rem] lg:min-h-[36rem]">
      <Image
        key={slide.src}
        src={slide.src}
        alt={slide.alt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Light cream fade on the left for dark text legibility, not a dark scrim */}
      <div className="absolute inset-0 bg-gradient-to-r from-bh-warm-white via-bh-warm-white/70 to-transparent md:from-bh-warm-white md:via-bh-warm-white/40 md:to-transparent" />

      <p
        className="pointer-events-none absolute right-[6%] top-[14%] hidden max-w-[11rem] rotate-[-3deg] font-display text-[1.5rem] italic leading-tight text-white drop-shadow-sm md:block lg:right-[8%] lg:text-[1.75rem]"
        aria-hidden
      >
        Furniture that feels like home
      </p>

      <PageContainer className="relative flex min-h-[28rem] flex-col justify-center py-10 md:min-h-[32rem] md:py-14 lg:min-h-[36rem]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-bh-text/70 md:text-[11px]">
          Premium furniture for a better tomorrow
        </p>
        <h1 className="mt-3 max-w-lg font-display text-[2.1rem] font-semibold leading-[1.12] text-bh-charcoal md:text-[3rem] lg:text-[3.25rem]">
          Stylish Spaces
          <br />
          Happier Homes
        </h1>
        <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-bh-muted md:text-base">
          Explore premium furniture crafted for comfort, style and a better everyday living.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            href="/collections"
            className="w-full rounded-full bg-bh-green text-white hover:bg-bh-green-light sm:w-auto"
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
          >
            Shop Collection
          </Button>
          <button
            type="button"
            onClick={() => openQuote()}
            className={cn(
              "inline-flex h-12 w-full min-w-0 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold sm:h-11 sm:w-auto sm:min-w-[10.5rem]",
              "text-bh-green bh-glass-panel shadow-[0_10px_28px_rgba(27,61,47,0.12)]",
              "transition hover:shadow-[0_14px_36px_rgba(27,61,47,0.16)] hover:text-bh-green-light bh-focus-ring",
            )}
          >
            <FileText className="h-4 w-4 shrink-0" aria-hidden />
            Get a Quote
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </button>
        </div>
        <div className="mt-6 flex flex-wrap items-center text-xs font-medium text-bh-text/80 md:text-sm">
          {HERO_TRUST.map((label, i) => (
            <span key={label} className="inline-flex items-center">
              {i > 0 && <span className="mx-3 h-3 w-px bg-bh-charcoal/25" aria-hidden />}
              {label}
            </span>
          ))}
        </div>
      </PageContainer>

 
    </section>
  );
}