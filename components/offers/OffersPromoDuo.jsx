import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PROMO_DUO } from "@/components/offers/offers-data";

export function OffersPromoDuo() {
  return (
    <section className="bg-bh-warm-white py-10 md:py-14">
      <PageContainer>
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {PROMO_DUO.map((item) => (
            <div
              key={item.title}
              className="relative min-h-[11rem] overflow-hidden rounded-3xl bh-shadow-soft md:min-h-[12.5rem]"
            >
              <Image src={item.image} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/88 via-bh-green-dark/55 to-transparent" />
              <div className="relative flex h-full min-h-[11rem] flex-col justify-center p-6 md:min-h-[12.5rem] md:p-8">
                <h3 className="font-display text-2xl font-semibold text-white md:text-[1.65rem]">{item.title}</h3>
                <p className="mt-1 text-sm font-semibold text-white/90">{item.discount}</p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex h-10 w-fit items-center gap-2 rounded-full px-5 text-sm font-semibold text-bh-charcoal bh-glass-panel bh-focus-ring"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
