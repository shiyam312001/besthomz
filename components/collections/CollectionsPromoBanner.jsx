import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { COLLECTIONS_PROMO } from "@/components/collections/collections-data";

export function CollectionsPromoBanner() {
  return (
    <div className="mb-8 overflow-hidden rounded-3xl bh-shadow-soft lg:grid lg:grid-cols-12 lg:min-h-[9.5rem]">
      <div className="relative min-h-[8rem] bg-bh-green-dark lg:col-span-5 lg:min-h-full">
        <Image src={COLLECTIONS_PROMO.leftImage} alt="" fill className="object-cover opacity-90" sizes="42vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/90 to-bh-green-dark/40" />
        <div className="relative flex h-full min-h-[8rem] items-center p-6 md:p-8">
          <h2 className="font-display text-xl font-semibold text-white md:text-2xl">{COLLECTIONS_PROMO.leftTitle}</h2>
        </div>
      </div>
      <div className="flex min-h-[7rem] flex-col justify-center bg-bh-cream/80 px-6 py-6 backdrop-blur-sm md:px-10 lg:col-span-7 lg:min-h-full lg:py-8">
        <p className="font-display text-xl font-semibold leading-snug text-bh-charcoal md:text-2xl">
          {COLLECTIONS_PROMO.rightQuote}
        </p>
        <p className="mt-2 text-sm text-bh-muted">{COLLECTIONS_PROMO.rightSub}</p>
      </div>
    </div>
  );
}
