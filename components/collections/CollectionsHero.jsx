import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { HomeTrustBadge } from "@/components/home/HomeTrustBadge";
import { COLLECTIONS_HERO } from "@/components/collections/collections-data";

export function CollectionsHero() {
  return (
    <section className="relative min-h-[22rem] overflow-hidden md:min-h-[26rem] lg:min-h-[30rem]">
      <Image src={COLLECTIONS_HERO.image} alt="" fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/80 via-bh-green-dark/45 to-bh-green-dark/20" />
      <PageContainer className="relative flex min-h-[22rem] flex-col justify-between py-8 md:min-h-[26rem] md:py-10 lg:min-h-[30rem] lg:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/88">Our Collections</p>
            <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-[2.75rem]">
              Timeless Furniture
              <br />
              Collections
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/88 md:text-base">
              Discover curated living, bedroom, dining and office collections — crafted for comfort and designed to last.
            </p>
          </div>
          <p
            className="hidden max-w-[11rem] rotate-[-3deg] font-display text-xl italic text-white/95 drop-shadow-md lg:block lg:text-2xl"
            aria-hidden
          >
            {COLLECTIONS_HERO.script}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 rounded-2xl px-2 py-4 bh-glass-hero md:grid-cols-4 md:gap-4 md:rounded-3xl md:px-4 md:py-5">
          {COLLECTIONS_HERO.badges.map((item) => (
            <div key={item.label} className="flex justify-center">
              <HomeTrustBadge icon={item.icon} label={item.label} variant="hero" />
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
