import { Fragment } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { HomeStripDivider } from "@/components/home/HomeStripDivider";
import { HomeTrustBadge } from "@/components/home/HomeTrustBadge";
import { COLLECTIONS_TRUST } from "@/components/collections/collections-data";

export function CollectionsTrust() {
  return (
    <section className="bg-bh-warm-white py-10 md:py-14">
      <PageContainer>
        <div className="bh-glass-panel flex min-h-[7.5rem] items-center rounded-2xl px-2 py-7 md:min-h-[8.5rem] md:rounded-3xl md:px-4 md:py-8">
          <div className="grid w-full grid-cols-2 gap-x-1 gap-y-8 sm:grid-cols-3 md:flex md:flex-nowrap md:items-center md:justify-between md:gap-y-0 lg:grid-cols-5">
            {COLLECTIONS_TRUST.map((item, index) => (
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
  );
}
