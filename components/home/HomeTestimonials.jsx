"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { CustomerAvatar } from "@/components/ui/CustomerAvatar";
import { HOME_TESTIMONIALS } from "@/components/home/home-testimonials-data";
import { useVisibleCarouselCount } from "@/components/home/useVisibleCarouselCount";

const AUTO_SLIDE_MS = 4500;

export function HomeTestimonials() {
  const reviews = HOME_TESTIMONIALS;
  const total = reviews.length;
  const visible = useVisibleCarouselCount();
  const maxIndex = Math.max(total - visible, 0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section className="bh-section bg-bh-cream/60">
      <PageContainer>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between md:mb-8">
          <div>
            <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl lg:text-3xl">
              What Our Customers Say
            </h2>
            <p className="mt-1 text-[0.9375rem] text-bh-muted lg:text-sm">Real homes. Real happiness.</p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-sm font-semibold text-bh-green bh-focus-ring"
          >
            View All Reviews
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-2xl md:rounded-none">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              width: `${(total / visible) * 100}%`,
              transform: `translateX(-${(index * 100) / total}%)`,
            }}
          >
            {reviews.map((review) => (
              <div key={review.name} className="shrink-0 px-1.5 sm:px-2" style={{ width: `${100 / total}%` }}>
                <div className="bh-glass-panel flex h-full min-h-[11.5rem] flex-col rounded-2xl p-5 md:min-h-0 md:p-6">
                  <div className="flex gap-0.5 text-amber-500" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current md:h-3.5 md:w-3.5" />
                    ))}
                  </div>

                  <div className="mt-3 flex flex-1 items-start gap-2">
                    <Quote className="mt-0.5 h-4 w-4 shrink-0 text-bh-green/50 md:h-3.5 md:w-3.5" aria-hidden />
                    <p className="text-[0.9375rem] leading-relaxed text-bh-text lg:text-sm">{review.quote}</p>
                  </div>

                  <div className="mt-5 flex items-center gap-3 border-t border-bh-sage/80 pt-4">
                    <CustomerAvatar
                      name={review.name}
                      src={review.avatar}
                      accent={review.accent}
                      size="md"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-bh-charcoal">{review.name}</p>
                      <p className="text-xs text-bh-muted">{review.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 md:mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all bh-focus-ring ${
                i === index ? "w-6 bg-bh-green" : "w-2 bg-bh-green/25 hover:bg-bh-green/40"
              }`}
            />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
