import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { MORE_OFFERS } from "@/components/offers/offers-data";

export function OffersMoreGrid() {
  return (
    <section className="bg-bh-sage-muted/30 py-12 md:py-16">
      <PageContainer>
        <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">More Offers for Your Home</h2>
        <p className="mt-2 text-sm text-bh-muted">Explore category promotions and bundle ideas.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MORE_OFFERS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex items-center gap-4 rounded-2xl p-4 bh-glass-panel transition hover:shadow-[0_16px_40px_-12px_rgba(27,61,47,0.12)] bh-focus-ring md:rounded-3xl md:p-5"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-bh-cream/60">
                <Image src={item.image} alt="" fill className="object-contain p-1.5" sizes="64px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-bh-charcoal">{item.title}</p>
                <p className="text-xs font-medium text-bh-green">{item.discount}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-bh-muted group-hover:text-bh-green">
                  Shop Now
                  <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
