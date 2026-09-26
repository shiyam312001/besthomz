import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { HomeTrustBadge } from "@/components/home/HomeTrustBadge";
import { COMMERCE_HERO_TRUST } from "@/components/commerce/commerce-page-data";

export function CommercePageHero({
  breadcrumbParent = { label: "Home", href: "/" },
  breadcrumbCurrent,
  title,
  subtitle,
  script = "Better Homes, Brighter Tomorrows",
}) {
  return (
    <section className="relative min-h-[19rem] overflow-hidden md:min-h-[24rem] lg:min-h-[28rem]">
      <Image
        src="/BestHomz/Homepage/hero/01-hero-sofa.png"
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
        {script}
      </p>
      <PageContainer className="relative flex min-h-[19rem] flex-col justify-between py-6 md:min-h-[24rem] md:py-9 lg:min-h-[28rem] lg:py-12">
        <div className="max-w-xl rounded-2xl p-4 bh-glass-hero-content md:rounded-3xl md:p-7 lg:p-8">
          <nav className="text-xs text-bh-muted" aria-label="Breadcrumb">
            <Link href={breadcrumbParent.href} className="hover:text-bh-green">
              {breadcrumbParent.label}
            </Link>
            <span className="mx-2 text-bh-muted/60">/</span>
            <span className="font-medium text-bh-charcoal">{breadcrumbCurrent}</span>
          </nav>
          <h1 className="mt-2 font-display text-[1.75rem] font-semibold leading-tight text-bh-charcoal sm:text-3xl md:mt-3 md:text-4xl lg:text-[2.65rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 max-w-lg text-[0.9375rem] leading-relaxed text-bh-muted md:mt-3 md:text-base">{subtitle}</p>
          )}
        </div>

        <div className="mt-6 -mx-1 flex gap-4 overflow-x-auto pb-1 bh-scroll-x md:mt-10 md:flex-wrap md:overflow-visible md:gap-8 lg:gap-10">
          {COMMERCE_HERO_TRUST.map((item) => (
            <HomeTrustBadge key={item.label} icon={item.icon} label={item.label} variant="hero" />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
