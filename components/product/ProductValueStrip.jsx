import { Fragment } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { HomeStripDivider } from "@/components/home/HomeStripDivider";
import { HomeTrustBadge } from "@/components/home/HomeTrustBadge";
import { PDP_VALUE_STRIP } from "@/components/product/product-pdp-data";

export function ProductValueStrip() {
  return (
    <section className="bg-bh-sage-muted/35 py-10 md:py-12">
      <PageContainer>
        <div className="bh-glass-panel flex min-h-[7.5rem] items-center rounded-2xl px-2 py-7 md:min-h-[8rem] md:rounded-3xl md:px-4 md:py-8">
          <div className="grid w-full grid-cols-2 gap-x-1 gap-y-8 sm:grid-cols-4 md:flex md:flex-nowrap md:items-center md:justify-between md:gap-y-0">
            {PDP_VALUE_STRIP.map((item, index) => (
              <Fragment key={item.label}>
                {index > 0 && <HomeStripDivider tall className="mx-0 max-md:hidden" />}
                <div className="flex flex-col items-center px-1 md:flex-1">
                  <HomeTrustBadge icon={item.icon} label={item.label} />
                  <p className="mt-1 hidden text-center text-[10px] text-bh-muted md:block">{item.sub}</p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
