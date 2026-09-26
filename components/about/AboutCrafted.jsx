import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hammer, Layers, Ruler, Sparkles } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ABOUT_IMAGES } from "@/components/about/about-assets";

const CRAFT = [
  { icon: Layers, label: "Premium Materials" },
  { icon: Hammer, label: "Skilled Craftsmanship" },
  { icon: Ruler, label: "Quality Check" },
  { icon: Sparkles, label: "Built to Last" },
];

export function AboutCrafted() {
  return (
    <section className="bg-bh-warm-white pb-12 md:pb-16">
      <PageContainer>
        <div className="bh-shadow-soft overflow-hidden rounded-3xl">
          <div className="grid lg:grid-cols-12">
            <div className="flex flex-col justify-center bg-bh-green-dark p-6 md:p-8 lg:col-span-3">
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">Crafted with Care</h2>
              <p className="mt-3 text-sm text-white/85">From raw materials to your home — every detail matters.</p>
              <Link
                href="/customize"
                className="mt-6 inline-flex h-10 w-fit items-center gap-2 rounded-full px-5 text-sm font-semibold text-white bh-glass-on-dark transition hover:bg-white/20 bh-focus-ring"
              >
                Our Process
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="relative min-h-[220px] lg:col-span-6 lg:min-h-[280px]">
              <Image
                src={ABOUT_IMAGES.craftedHands}
                alt="Furniture craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 bg-bh-green-dark p-6 md:p-8 lg:col-span-3">
              {CRAFT.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-white">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bh-glass-on-dark">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
