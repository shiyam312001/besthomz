import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, Layers, Palette, Ruler, Sparkles } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { HomeStripDivider } from "@/components/home/HomeStripDivider";
import { HomeTrustBadge } from "@/components/home/HomeTrustBadge";
import { CollectionsNewsletter } from "@/components/collections/CollectionsNewsletter";
import { FURNITURE_INSPIRE, FURNITURE_TRUST } from "@/components/furniture/furniture-data";

const CUSTOM_OPTIONS = [
  { label: "Size", icon: Ruler },
  { label: "Material", icon: Layers },
  { label: "Colour", icon: Palette },
  { label: "Finish", icon: Sparkles },
];

export function FurnitureBottom() {
  return (
    <>
      <section className="bg-bh-sage-muted/35 py-12 md:py-16">
        <PageContainer>
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <div className="relative min-h-[12rem] overflow-hidden rounded-3xl bh-shadow-soft md:min-h-[14rem]">
              <Image
                src="/BestHomz/Homepage/banners/27-banner-custom-green-armchair.png"
                alt=""
                fill
                className="object-cover object-center"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/92 via-bh-green-dark/55 to-transparent" />
              <div className="relative flex h-full min-h-[12rem] flex-col justify-center p-6 md:min-h-[14rem] md:p-8">
                <h3 className="font-display text-2xl font-semibold text-white">Customise Your Furniture</h3>
                <p className="mt-2 max-w-xs text-sm text-white/85">Built to your size, material and finish.</p>
                <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-2 md:flex">
                  {CUSTOM_OPTIONS.map(({ label, icon: Icon }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-white bh-glass-on-dark"
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                      {label}
                    </span>
                  ))}
                </div>
                <Link
                  href="/customize"
                  className="mt-6 inline-flex h-10 w-fit items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-bh-green shadow-[0_8px_22px_rgba(27,61,47,0.15)] bh-focus-ring"
                >
                  Start Customizing
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[12rem] overflow-hidden rounded-3xl bg-bh-cream/90 bh-shadow-soft md:min-h-[14rem]">
              <Image
                src="/BestHomz/Homepage/banners/28-banner-help-consultant.png"
                alt=""
                fill
                className="object-cover object-top"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bh-cream via-bh-cream/88 to-transparent" />
              <div className="relative flex h-full min-h-[12rem] flex-col justify-center p-6 md:min-h-[14rem] md:p-8">
                <h3 className="font-display text-2xl font-semibold text-bh-charcoal">Need Help Choosing?</h3>
                <p className="mt-2 max-w-xs text-sm text-bh-muted">Talk to our showroom team for personalised advice.</p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex h-10 w-fit items-center gap-2 rounded-full px-5 text-sm font-semibold text-bh-charcoal bh-glass-panel bh-focus-ring"
                >
                  Talk to an Expert
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="bg-bh-warm-white py-10 md:py-14">
        <PageContainer>
          <div className="bh-glass-panel flex min-h-[7.5rem] items-center rounded-2xl px-2 py-7 md:min-h-[8.5rem] md:rounded-3xl md:px-4 md:py-8">
            <div className="grid w-full grid-cols-2 gap-x-1 gap-y-8 sm:grid-cols-3 md:flex md:flex-nowrap md:items-center md:justify-between md:gap-y-0 lg:grid-cols-6">
              {FURNITURE_TRUST.map((item, index) => (
                <Fragment key={item.label}>
                  {index > 0 && <HomeStripDivider tall className="mx-0 max-md:hidden" />}
                  <div className="flex justify-center px-0.5 md:flex-1 md:px-1">
                    <HomeTrustBadge icon={item.icon} label={item.label} />
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="bg-bh-sage-muted/30 py-12 md:py-16">
        <PageContainer>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-8">
            <div>
              <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">Get Inspired</h2>
              <p className="mt-2 text-sm text-bh-muted">Room ideas styled with Best Homz furniture.</p>
            </div>
            <Link href="/rooms" className="inline-flex items-center gap-1 text-sm font-semibold text-bh-green bh-focus-ring">
              View Lookbook
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {FURNITURE_INSPIRE.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group overflow-hidden rounded-2xl bh-shadow-soft bh-focus-ring md:rounded-3xl"
              >
                <div className="relative aspect-[4/3] md:aspect-[3/4]">
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width:768px) 45vw, 25vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3">
                    <p className="text-xs font-semibold text-white md:text-sm">{item.label}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>

      <CollectionsNewsletter />
    </>
  );
}
