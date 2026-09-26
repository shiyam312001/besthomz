"use client";

import Image from "next/image";
import { Percent } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { cn } from "@/lib/cn";
import { OFFER_CATEGORY_CHIPS } from "@/components/offers/offers-data";
import { useOffersFilter } from "@/components/offers/OffersFilterContext";

export function OffersCategoryStrip() {
  const { filter, setFilter } = useOffersFilter();

  return (
    <section className="relative z-10 bg-bh-warm-white pb-4 md:pb-6">
      <PageContainer className="-mt-6 md:-mt-8">
        <div className="bh-glass-panel rounded-2xl px-3 py-4 md:rounded-3xl md:px-4 md:py-5">
          <div className="bh-scroll-x flex items-end gap-3 pb-1 md:justify-between md:gap-2 md:overflow-visible md:pb-0">
            {OFFER_CATEGORY_CHIPS.map((chip) => {
              const active = filter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setFilter(chip.id)}
                  className={cn(
                    "flex min-w-[4.5rem] shrink-0 flex-col items-center gap-2 rounded-2xl px-2 py-2 transition bh-focus-ring md:min-w-0 md:flex-1",
                    active && "bg-bh-sage/50 shadow-[0_6px_18px_rgba(27,61,47,0.08)]",
                  )}
                >
                  <span
                    className={cn(
                      "relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl shadow-[0_6px_20px_rgba(27,61,47,0.08)] md:h-[4.75rem] md:w-[4.75rem]",
                      chip.isAll ? "bg-bh-green text-white" : "bg-white/90",
                    )}
                  >
                    {chip.isAll ? (
                      <Percent className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                    ) : (
                      <Image src={chip.image} alt="" fill className="object-contain p-2" sizes="80px" />
                    )}
                  </span>
                  <span className="max-w-full text-center text-[11px] font-medium leading-tight text-bh-charcoal sm:text-xs">
                    {chip.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
