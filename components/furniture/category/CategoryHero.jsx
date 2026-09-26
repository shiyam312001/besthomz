import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { HomeTrustBadge } from "@/components/home/HomeTrustBadge";

export function CategoryHero({ category, config }) {
  return (
    <section className="relative min-h-[19rem] overflow-hidden md:min-h-[24rem] lg:min-h-[28rem]">
      <Image src={config.heroImage} alt="" fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-bh-warm-white/25 via-bh-green-dark/35 to-bh-green-dark/15" />
      <PageContainer className="relative flex min-h-[19rem] flex-col justify-between py-6 md:min-h-[24rem] md:py-10 lg:min-h-[28rem] lg:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl rounded-2xl p-4 bh-glass-hero-content md:rounded-3xl md:p-7 lg:p-8">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Furniture", href: "/furniture" },
                { label: category.name },
              ]}
              className="mb-4"
            />
            <h1 className="font-display text-[1.75rem] font-semibold leading-tight text-bh-charcoal sm:text-3xl md:text-4xl lg:text-[2.65rem]">
              {category.name}
            </h1>
            <p className="mt-2 max-w-lg text-[0.9375rem] leading-relaxed text-bh-muted md:mt-3 md:text-base">
              {category.description ||
                `Explore our ${category.name.toLowerCase()} range — premium craftsmanship with custom sizing and finishes.`}
            </p>
          </div>
          <p
            className="hidden max-w-[12rem] rotate-[-3deg] pt-4 font-display text-xl italic text-white drop-shadow-[0_2px_12px_rgba(27,61,47,0.45)] lg:block lg:text-2xl"
            aria-hidden
          >
            {config.script}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2 rounded-2xl px-3 py-4 bh-glass-hero sm:grid-cols-4 sm:gap-3 md:mt-10 md:rounded-3xl md:px-5 md:py-5">
          {config.badges.map((item) => (
            <div key={item.label} className="flex justify-center">
              <HomeTrustBadge icon={item.icon} label={item.label} variant="hero" />
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
