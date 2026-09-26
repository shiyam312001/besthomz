import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, Palette, Ruler, Sparkles } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SPECIAL_COLLECTIONS_BANNER } from "@/components/collections/collections-data";

const OPTIONS = [
  { label: "Size", icon: Ruler },
  { label: "Material", icon: Layers },
  { label: "Colour", icon: Palette },
  { label: "Finish", icon: Sparkles },
];

export function CollectionsPromoDuo() {
  return (
    <section className="bg-bh-sage-muted/35 py-12 md:py-16">
      <PageContainer>
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <div className="relative min-h-[12rem] overflow-hidden rounded-3xl bh-shadow-soft md:min-h-[14rem]">
            <Image
              src="/BestHomz/Homepage/banners/27-banner-custom-green-armchair.png"
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/92 via-bh-green-dark/55 to-transparent" />
            <div className="relative flex h-full min-h-[12rem] flex-col justify-center p-6 md:min-h-[14rem] md:p-8">
              <h3 className="font-display text-2xl font-semibold text-white">Customise Your Furniture</h3>
              <p className="mt-2 max-w-xs text-sm text-white/85">Size, material, colour and finish — built for your space.</p>
              <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-2 md:flex">
                {OPTIONS.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-white bh-glass-on-dark"
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                    {label}
                  </span>
                ))}
              </div>
              <Link
                href="/customize"
                className="mt-6 inline-flex h-10 w-fit items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-bh-green shadow-[0_8px_22px_rgba(27,61,47,0.15)] bh-focus-ring"
              >
                Start Customizing
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[12rem] overflow-hidden rounded-3xl bg-bh-cream/90 bh-shadow-soft md:min-h-[14rem]">
            <Image src={SPECIAL_COLLECTIONS_BANNER.image} alt="" fill className="object-cover object-right" sizes="50vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-bh-cream via-bh-cream/85 to-transparent" />
            <div className="relative flex h-full min-h-[12rem] flex-col justify-center p-6 md:min-h-[14rem] md:p-8">
              <h3 className="font-display text-2xl font-semibold text-bh-charcoal">{SPECIAL_COLLECTIONS_BANNER.title}</h3>
              <p className="mt-2 max-w-xs text-sm text-bh-muted">Signature sideboards, storage and accent pieces.</p>
              <Link
                href={SPECIAL_COLLECTIONS_BANNER.href}
                className="mt-6 inline-flex h-10 w-fit items-center gap-2 rounded-full px-5 text-sm font-semibold text-bh-charcoal bh-glass-panel bh-focus-ring"
              >
                View All Collections
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
