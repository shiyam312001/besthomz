"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronRight, FileText } from "lucide-react";
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

function HomeHeroMobile() {
  const [index] = useState(0);
  const { openQuote } = useQuote();
  const slide = SLIDES[index] ?? SLIDES[0];

  return (
    <section className="relative min-h-[22.5rem] overflow-hidden bg-bh-cream sm:min-h-[24rem] md:min-h-[26rem]">
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        priority
        className="object-cover object-[center_35%]"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-bh-warm-white/95"
        aria-hidden
      />

      <PageContainer className="relative flex min-h-[22.5rem] flex-col justify-end pb-4 pt-14 sm:min-h-[24rem] sm:pb-5 md:min-h-[26rem]">
        <div className="relative z-[1] w-full max-w-md">
          <div className="sr-only">
            <p>Premium furniture for a better tomorrow</p>
            <h1>Stylish Spaces Happier Homes</h1>
            <p>Explore premium furniture crafted for comfort, style and a better everyday living.</p>
          </div>

          <div className="flex flex-row gap-2.5 sm:gap-3">
            <Button
              href="/collections"
              className="h-11 min-h-0 flex-1 rounded-full bg-bh-green px-4 text-sm text-white shadow-[0_10px_24px_rgba(27,61,47,0.22)] hover:bg-bh-green-light sm:flex-none sm:px-6"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              Shop Collection
            </Button>
            <button
              type="button"
              onClick={() => openQuote()}
              className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-white/60 bg-white/75 px-4 text-sm font-semibold text-bh-charcoal shadow-[0_8px_24px_rgba(27,61,47,0.1)] backdrop-blur-md bh-focus-ring sm:flex-none sm:px-6"
            >
              Get a Quote
            </button>
          </div>
        </div>

      
      </PageContainer>
    </section>
  );
}

function HomeHeroDesktop() {
  const [index] = useState(0);
  const { openQuote } = useQuote();
  const slide = SLIDES[index] ?? SLIDES[0];

  return (
    <section className="relative min-h-[36rem] overflow-hidden bg-bh-cream">
      <Image
        key={slide.src}
        src={slide.src}
        alt={slide.alt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bh-warm-white from-[28%] via-bh-warm-white/45 to-transparent" />

      <p
        className="pointer-events-none absolute right-[8%] top-[14%] max-w-[11rem] rotate-[-3deg] font-display text-[1.75rem] italic leading-tight text-white drop-shadow-sm"
        aria-hidden
      >
        Furniture that feels like home
      </p>

      <PageContainer className="relative flex min-h-[36rem] flex-col justify-center py-14">
        <div className="max-w-lg">
          <p className="bh-type-eyebrow text-bh-text/70">Premium furniture for a better tomorrow</p>
          <h1 className="bh-type-hero mt-3">
            Stylish Spaces
            <br />
            Happier Homes
          </h1>
          <p className="mt-3 max-w-sm bh-type-body text-bh-muted lg:text-[length:var(--bh-text-body)]">
            Explore premium furniture crafted for comfort, style and a better everyday living.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href="/collections"
              className="h-11 rounded-full bg-bh-green text-white shadow-[0_10px_28px_rgba(27,61,47,0.22)] hover:bg-bh-green-light sm:w-auto"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              Shop Collection
            </Button>
            <button
              type="button"
              onClick={() => openQuote()}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-bh-green bh-glass-panel shadow-[0_10px_28px_rgba(27,61,47,0.12)] transition hover:shadow-[0_14px_36px_rgba(27,61,47,0.14)] bh-focus-ring sm:w-auto"
            >
              <FileText className="h-4 w-4 shrink-0" aria-hidden />
              Get a Quote
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center text-sm font-medium text-bh-text/80">
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

export function HomeHero() {
  return (
    <>
      <div className="lg:hidden">
        <HomeHeroMobile />
      </div>
      <div className="hidden lg:block">
        <HomeHeroDesktop />
      </div>
    </>
  );
}
