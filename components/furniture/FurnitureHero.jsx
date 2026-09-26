import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { HomeTrustBadge } from "@/components/home/HomeTrustBadge";
import { FURNITURE_HERO } from "@/components/furniture/furniture-data";

export function FurnitureHero() {
  return (
    <section className="relative min-h-[22rem] overflow-hidden md:min-h-[26rem] lg:min-h-[28rem]">
      <Image src={FURNITURE_HERO.image} alt="" fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/82 via-bh-green-dark/48 to-bh-green-dark/18" />
      <PageContainer className="relative flex min-h-[22rem] flex-col justify-between py-8 md:min-h-[26rem] md:py-10 lg:min-h-[28rem] lg:py-12">
        <div className="max-w-2xl pt-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/88">Furniture Collection</p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-[2.75rem]">
            Designed for a Better Everyday
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/88 md:text-base">
            Explore sofas, beds, dining and office furniture — request a personalised quote for any piece.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl px-2 py-4 bh-glass-hero md:gap-4 md:rounded-3xl md:px-4 md:py-5">
          {FURNITURE_HERO.badges.map((item) => (
            <div key={item.label} className="flex justify-center">
              <HomeTrustBadge icon={item.icon} label={item.label} variant="hero" />
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
