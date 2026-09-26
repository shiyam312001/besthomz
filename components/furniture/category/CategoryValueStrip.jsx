import { Fragment } from "react";
import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { HomeStripDivider } from "@/components/home/HomeStripDivider";
import { CATEGORY_TRUST } from "@/components/furniture/category/category-data";

export function CategoryValueStrip() {
  return (
    <section className="bg-bh-sage-muted/35 py-10 md:py-14">
      <PageContainer>
        <div className="bh-glass-panel flex min-h-[7rem] items-center rounded-2xl px-4 py-6 md:min-h-[8rem] md:rounded-3xl md:px-6 md:py-8">
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:flex md:flex-nowrap md:items-center md:justify-between md:gap-2">
            {CATEGORY_TRUST.map((item, index) => (
              <Fragment key={item.title}>
                {index > 0 && <HomeStripDivider tall className="mx-0 max-md:hidden" />}
                <div className="flex items-center gap-3 md:flex-1 md:px-2">
                  <span className="bh-icon-badge-trust shrink-0">
                    <Image src={item.icon} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-bh-charcoal">{item.title}</p>
                    <p className="text-xs text-bh-muted">{item.sub}</p>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
