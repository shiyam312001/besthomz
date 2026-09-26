import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { HomeTrustBadge } from "@/components/home/HomeTrustBadge";
import { COMMERCE_HERO_TRUST } from "@/components/commerce/commerce-page-data";
import { ABOUT_IMAGES } from "@/components/about/about-assets";

export function AboutHero() {
  return (
    <section className="relative min-h-[20rem] overflow-hidden md:min-h-[26rem] lg:min-h-[30rem]">
      <Image
        src={ABOUT_IMAGES.hero}
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bh-warm-white/25 via-bh-green-dark/45 to-bh-green-dark/30" />
      <p
        className="pointer-events-none absolute right-[5%] top-[14%] hidden max-w-[11rem] rotate-[-3deg] font-display text-lg italic text-white drop-shadow-[0_2px_12px_rgba(27,61,47,0.4)] md:block lg:right-[8%] lg:text-xl"
        aria-hidden
      >
        Better Homes, Brighter Tomorrows
      </p>

      <PageContainer className="relative flex min-h-[20rem] flex-col justify-between py-6 md:min-h-[26rem] md:py-10 lg:min-h-[30rem] lg:py-12">
        <div className="max-w-xl rounded-2xl p-4 bh-glass-hero-content md:rounded-3xl md:p-7 lg:p-8">
          <nav className="text-xs text-bh-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-bh-green">
              Home
            </Link>
            <span className="mx-2 text-bh-muted/60">/</span>
            <span className="font-medium text-bh-charcoal">About</span>
          </nav>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-bh-muted md:mt-4">
            About us
          </p>
          <h1 className="mt-2 font-display text-[1.75rem] font-semibold leading-tight text-bh-charcoal sm:text-3xl md:text-4xl lg:text-[2.65rem]">
            More Than Furniture,
            <br />
            A Better Way of Living
          </h1>
          <p className="mt-2 max-w-lg text-[0.9375rem] leading-relaxed text-bh-muted md:mt-3 md:text-base">
            At Best Homz, we believe furniture should elevate everyday life — blending comfort, craftsmanship and
            thoughtful design for homes across Chennai.
          </p>
          <Link
            href="#our-story"
            className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-bh-green px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,61,47,0.22)] transition hover:bg-bh-green-light bh-focus-ring sm:w-auto md:mt-6"
          >
            Our Story
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div
          className="mt-6 flex gap-4 overflow-x-auto pb-1 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden md:mt-10 md:flex-wrap md:overflow-visible md:gap-8 lg:gap-10"
        >
          {COMMERCE_HERO_TRUST.map((item) => (
            <HomeTrustBadge key={item.label} icon={item.icon} label={item.label} variant="hero" />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
