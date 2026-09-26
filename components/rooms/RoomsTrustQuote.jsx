import { Fragment } from "react";
import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { HomeStripDivider } from "@/components/home/HomeStripDivider";
import { HomeTrustBadge } from "@/components/home/HomeTrustBadge";
import { ROOMS_TRUST } from "@/components/rooms/rooms-data";

export function RoomsTrustQuote() {
  return (
    <section className="bg-bh-sage-muted/30 py-10 md:py-14">
      <PageContainer>
        <div className="grid gap-5 lg:grid-cols-12 lg:items-stretch">
          <div className="bh-glass-panel flex min-h-[8rem] items-center rounded-2xl px-2 py-7 md:min-h-[9rem] md:rounded-3xl md:px-4 md:py-8 lg:col-span-8">
            <div className="grid w-full grid-cols-2 gap-x-1 gap-y-8 sm:grid-cols-4 md:flex md:flex-nowrap md:items-center md:justify-between md:gap-y-0">
              {ROOMS_TRUST.map((item, index) => (
                <Fragment key={item.label}>
                  {index > 0 && <HomeStripDivider tall className="mx-0 max-md:hidden" />}
                  <div className="flex justify-center px-0.5 md:flex-1 md:px-1">
                    <HomeTrustBadge icon={item.icon} label={item.label} />
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="relative flex min-h-[9rem] flex-col justify-center overflow-hidden rounded-2xl px-6 py-8 bh-glass-panel md:rounded-3xl lg:col-span-4">
            <Image
              src="/BestHomz/Homepage/banners/16-banner-vision-armchair.png"
              alt=""
              fill
              className="object-cover object-right opacity-25"
              sizes="33vw"
            />
            <p className="relative font-display text-xl font-semibold leading-snug text-bh-charcoal md:text-2xl">
              Well-designed rooms create happier lives.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
