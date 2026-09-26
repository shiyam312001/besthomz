import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ABOUT_IMAGES } from "@/components/about/about-assets";

const VALUES = [
  {
    icon: "/BestHomz/Homepage/icons/10-icon-materials.png",
    label: "Quality",
    text: "Durable materials and careful finishing in every piece we deliver.",
  },
  {
    icon: "/BestHomz/Homepage/icons/14-icon-support.png",
    label: "Customer Focus",
    text: "Responsive support and clear communication at every step.",
  },
  {
    icon: "/BestHomz/Homepage/icons/13-icon-installation.png",
    label: "Sustainability",
    text: "Thoughtful sourcing and builds made to last for years.",
  },
  {
    icon: "/BestHomz/Homepage/icons/11-icon-custom-design.png",
    label: "Innovation",
    text: "Modern designs with custom sizes, fabrics and finishes.",
  },
];

export function AboutCoreValues() {
  return (
    <section className="bg-bh-warm-white py-12 md:py-16">
      <PageContainer>
        <div className="mb-8 max-w-xl md:mb-10">
          <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">Our Core Values</h2>
          <p className="mt-2 text-sm text-bh-muted md:text-base">The principles that guide how we design, build and serve.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {VALUES.map((item) => (
              <div
                key={item.label}
                className="bh-glass-panel flex flex-col items-center rounded-2xl px-4 py-6 text-center md:rounded-3xl md:py-8"
              >
                <span className="bh-icon-badge-trust">
                  <Image src={item.icon} alt="" width={28} height={28} className="h-7 w-7 object-contain md:h-8 md:w-8" />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-bh-charcoal">{item.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-bh-muted">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-3xl bh-shadow-soft lg:col-span-4 lg:min-h-0">
            <Image src={ABOUT_IMAGES.valueChair} alt="Green armchair" fill className="object-cover" sizes="33vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-bh-green-dark/85 via-bh-green-dark/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-medium backdrop-blur-sm">
                Comfort. Style. Always.
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold md:text-2xl">Furniture That Fits Your Life</h3>
              <Link
                href="/furniture"
                className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-xs font-semibold text-bh-green shadow-[0_6px_18px_rgba(27,61,47,0.15)] bh-focus-ring md:text-sm"
              >
                Explore
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
