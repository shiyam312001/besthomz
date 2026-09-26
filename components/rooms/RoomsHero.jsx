import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { HomeTrustBadge } from "@/components/home/HomeTrustBadge";
import { ROOMS_HERO } from "@/components/rooms/rooms-data";

export function RoomsHero() {
  return (
    <section className="relative min-h-[24rem] overflow-hidden md:min-h-[28rem] lg:min-h-[32rem]">
      <Image src={ROOMS_HERO.image} alt="" fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-bh-warm-white/95 via-bh-warm-white/55 to-bh-green-dark/25 md:from-bh-warm-white/90 md:via-bh-warm-white/40" />
      <PageContainer className="relative flex min-h-[24rem] flex-col justify-between py-8 md:min-h-[28rem] md:py-10 lg:min-h-[32rem] lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-lg rounded-3xl px-6 py-7 md:px-8 md:py-9 bh-glass-panel bh-shadow-soft">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bh-green">Our Rooms</p>
            <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-bh-charcoal md:text-4xl lg:text-[2.65rem]">
              Beautiful Rooms Start with Better Furniture
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-bh-muted md:text-base">
              Curated ideas for living, bedroom, dining, office and kids spaces — with expert support from our Chennai showroom.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {ROOMS_HERO.badges.map((item) => (
                <HomeTrustBadge key={item.label} icon={item.icon} label={item.label} />
              ))}
            </div>
          </div>
          <p
            className="hidden max-w-[12rem] rotate-[-3deg] self-center font-display text-2xl italic text-bh-green/90 drop-shadow-sm lg:block"
            aria-hidden
          >
            {ROOMS_HERO.script}
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
