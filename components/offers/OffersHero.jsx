import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem, Percent, Truck } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { OFFERS_HERO } from "@/components/offers/offers-data";

const BADGE_ICONS = { percent: Percent, gem: Gem, truck: Truck };

export function OffersHero() {
  return (
    <section className="relative min-h-[22rem] overflow-hidden md:min-h-[26rem] lg:min-h-[30rem]">
      <Image src={OFFERS_HERO.image} alt="" fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/75 via-bh-green-dark/35 to-bh-green-dark/15" />
      <PageContainer className="relative flex min-h-[22rem] flex-col justify-between py-8 md:min-h-[26rem] md:py-10 lg:min-h-[30rem] lg:py-12">
        <div className="max-w-md rounded-3xl px-6 py-7 md:max-w-lg md:px-8 md:py-9 bh-glass-panel bh-shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bh-green">Special Offers</p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-bh-charcoal md:text-4xl lg:text-[2.65rem]">
            Make Your Home
            <br />
            More Special
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-bh-muted md:text-base">
            Discover seasonal promotions on premium furniture — request a quote for personalised pricing and delivery.
          </p>
          <Link
            href="#top-deals"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-bh-green px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,61,47,0.22)] bh-focus-ring"
          >
            Explore Offers
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4">
          {OFFERS_HERO.badges.map(({ label, icon }) => {
            const Icon = BADGE_ICONS[icon] ?? Percent;
            return (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-2xl px-2 py-4 text-center bh-glass-hero md:rounded-3xl md:py-5"
              >
                <span className="bh-icon-badge-trust bg-white/95 text-bh-green">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="text-[10px] font-semibold leading-tight text-white md:text-[11px]">{label}</span>
              </div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
