import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { HomeTrustBadge } from "@/components/home/HomeTrustBadge";
import { HomeStripDivider } from "@/components/home/HomeStripDivider";

const TRUST = [
  { icon: "/BestHomz/Homepage/icons/10-icon-materials.png", label: "Premium Materials" },
  { icon: "/BestHomz/Homepage/icons/11-icon-custom-design.png", label: "Custom Design Options" },
  { icon: "/BestHomz/Homepage/icons/12-icon-warranty.png", label: "5 Years Warranty" },
  { icon: "/BestHomz/Homepage/icons/13-icon-installation.png", label: "Professional Installation" },
  { icon: "/BestHomz/Homepage/icons/14-icon-support.png", label: "Dedicated Support" },
  { icon: "/BestHomz/Homepage/icons/15-icon-families.png", label: "Trusted by 1000+ Families" },
];

export function HomeTrustVision() {
  return (
    <section className="bg-bh-warm-white py-8 md:py-10 lg:py-12">
      <PageContainer>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch lg:gap-5">
          <div className="bh-glass-panel flex min-h-[7.5rem] items-center rounded-2xl px-2 py-7 md:min-h-[8.5rem] md:rounded-3xl md:px-4 md:py-8 lg:col-span-8">
            <div className="grid w-full grid-cols-3 gap-x-1 gap-y-8 md:flex md:flex-nowrap md:items-center md:justify-between md:gap-y-0">
              {TRUST.map((item, index) => (
                <Fragment key={item.label}>
                  {index > 0 && <HomeStripDivider tall className="mx-0 max-md:hidden" />}
                  <div className="flex justify-center px-0.5 md:flex-1 md:px-1">
                    <HomeTrustBadge icon={item.icon} label={item.label} />
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          <div className="relative min-h-[11rem] overflow-hidden rounded-2xl shadow-[0_20px_44px_-14px_rgba(27,61,47,0.2)] md:min-h-[8.5rem] md:rounded-3xl lg:col-span-4 lg:min-h-0">
            <Image
              src="/BestHomz/Homepage/banners/16-banner-vision-armchair.png"
              alt=""
              fill
              className="object-cover object-[70%_center]"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark from-[30%] via-bh-green-dark/65 to-transparent" />
            <div className="relative flex h-full min-h-[11rem] max-w-[58%] flex-col justify-center p-5 md:min-h-[8.5rem] md:p-6">
              <h3 className="font-display text-lg font-semibold leading-snug text-white md:text-xl">
                Bring Your Vision To Life
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/88 md:text-sm">
                Custom furniture for your unique space.
              </p>
              <Link
                href="/customize"
                className="mt-4 inline-flex h-9 w-fit items-center gap-1.5 rounded-full bg-white px-4 text-xs font-semibold text-bh-green shadow-[0_6px_18px_rgba(27,61,47,0.15)] transition hover:bg-bh-cream bh-focus-ring md:mt-5 md:h-10 md:px-5 md:text-sm"
              >
                Start Customizing
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
