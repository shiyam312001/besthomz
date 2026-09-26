"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { FESTIVE_SLIDES } from "@/components/offers/offers-data";

export function OffersFestiveBanner({ slides = FESTIVE_SLIDES }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index] ?? slides[0];
  if (!slide) return null;

  const perks = slide.perks ?? FESTIVE_SLIDES[0].perks;

  return (
    <section className="bg-bh-warm-white py-10 md:py-14">
      <PageContainer>
        <div className="bh-shadow-soft overflow-hidden rounded-3xl lg:grid lg:grid-cols-12 lg:min-h-[17rem]">
          <div className="relative min-h-[14rem] lg:col-span-7 lg:min-h-full">
            <Image src={slide.image} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 58vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-bh-green-dark/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-bh-green-dark/55 lg:to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:max-w-md">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/90">{slide.discount}</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-white md:text-3xl">{slide.title}</h2>
              <p className="mt-2 text-sm text-white/85">{slide.subtitle}</p>
              <Link
                href={slide.href}
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold text-bh-charcoal bh-glass-panel bh-focus-ring"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="absolute bottom-6 right-6 flex gap-2 lg:bottom-8 lg:right-8">
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white bh-glass-on-dark bh-focus-ring"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % slides.length)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white bh-glass-on-dark bh-focus-ring"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="bg-bh-green-dark px-6 py-8 md:px-10 md:py-10 lg:col-span-5">
            <ul className="space-y-4">
              {perks.map((label) => (
                <li key={label} className="flex items-center gap-3 text-sm font-medium text-white/92">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bh-glass-on-dark">
                    <Sparkles className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
