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

const MOBILE_TRUST_LABELS = [
  "Premium Materials",
  "Custom Design Options",
  "5 Years Warranty",
  "Trusted by 1000+ Families",
];
const MOBILE_TRUST = TRUST.filter((t) => MOBILE_TRUST_LABELS.includes(t.label));

export function HomeTrustVision() {
  return (
    <section className="bg-bh-warm-white py-6 max-lg:py-7 md:py-10 lg:py-12">
      <PageContainer>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch lg:gap-5">
          <div className="bh-glass-panel flex min-h-[6.5rem] items-center rounded-2xl px-3 py-5 shadow-[0_16px_40px_-12px_rgba(27,61,47,0.1)] max-lg:py-6 md:min-h-[8.5rem] md:rounded-3xl md:px-4 md:py-8 lg:col-span-8 lg:shadow-none">
            <div className="flex w-full items-center justify-between gap-1 overflow-x-auto [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
              {MOBILE_TRUST.map((item) => (
                <div key={item.label} className="flex min-w-[4.25rem] flex-1 justify-center px-0.5 [&_p]:text-[10px] [&_p]:leading-tight sm:[&_p]:text-[11px]">
                  <HomeTrustBadge icon={item.icon} label={item.label} />
                </div>
              ))}
            </div>
            <div className="hidden w-full lg:flex lg:flex-nowrap lg:items-center lg:justify-between">
              {TRUST.map((item, index) => (
                <Fragment key={item.label}>
                  {index > 0 && <HomeStripDivider tall className="mx-0" />}
                  <div className="flex flex-1 justify-center px-1">
                    <HomeTrustBadge icon={item.icon} label={item.label} />
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          <div className="relative min-h-[10.5rem] overflow-hidden rounded-2xl shadow-[0_20px_44px_-14px_rgba(27,61,47,0.2)] max-lg:min-h-[11rem] md:min-h-[8.5rem] md:rounded-3xl lg:col-span-4 lg:min-h-0">
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
