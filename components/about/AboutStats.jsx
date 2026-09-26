import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { HomeStripDivider } from "@/components/home/HomeStripDivider";
import { Fragment } from "react";

const STATS = [
  { icon: "/BestHomz/Homepage/icons/15-icon-families.png", value: "10,000+", label: "Happy Customers" },
  { icon: "/BestHomz/Homepage/icons/12-icon-warranty.png", value: "5+", label: "Years of Experience" },
  { icon: "/BestHomz/Homepage/icons/10-icon-materials.png", value: "500+", label: "Furniture Designs" },
  { icon: "/BestHomz/Homepage/icons/14-icon-support.png", value: "98%", label: "Customer Satisfaction" },
];

export function AboutStats() {
  return (
    <section className="bg-bh-warm-white pb-12 md:pb-16">
      <PageContainer>
        <div className="bh-glass-panel flex flex-wrap items-center justify-center gap-y-8 rounded-3xl px-4 py-8 md:flex-nowrap md:justify-between md:px-6 md:py-10">
          {STATS.map((stat, index) => (
            <Fragment key={stat.label}>
              {index > 0 && <HomeStripDivider tall className="mx-2 max-md:hidden" />}
              <div className="flex w-1/2 flex-col items-center text-center md:w-auto md:flex-1 md:px-2">
                <span className="bh-icon-badge-trust">
                  <Image src={stat.icon} alt="" width={28} height={28} className="h-7 w-7 object-contain md:h-8 md:w-8" />
                </span>
                <p className="mt-3 font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-bh-muted md:text-sm">{stat.label}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
