import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Headphones, Layers, Ruler } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { CUSTOMIZE_IMAGES } from "@/components/customize/customize-data";

const PERKS = [
  { icon: Headphones, label: "Free Consultation" },
  { icon: Box, label: "3D Preview" },
  { icon: Ruler, label: "Custom Sizing" },
  { icon: Layers, label: "Material Samples" },
];

export function CustomizeHelp() {
  return (
    <section className="bg-bh-sage-muted/40 py-12 md:py-16">
      <PageContainer>
        <div className="bh-shadow-soft overflow-hidden rounded-3xl lg:grid lg:grid-cols-12 lg:min-h-[16rem]">
          <div className="relative min-h-[12rem] lg:col-span-4 lg:min-h-full">
            <Image src={CUSTOMIZE_IMAGES.preview} alt="" fill className="object-cover object-center" sizes="33vw" />
          </div>
          <div className="flex flex-col justify-center bg-bh-green-dark px-6 py-8 md:px-10 md:py-10 lg:col-span-5">
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">Need Help Customizing?</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
              Our experts can guide you through materials, dimensions and finishes for your space.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-bh-green shadow-[0_8px_22px_rgba(27,61,47,0.15)] bh-focus-ring"
            >
              Talk to an Expert
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="flex flex-col justify-between bg-bh-green-dark/95 px-6 py-8 md:px-8 lg:col-span-3 lg:py-10">
            <div className="relative mb-6 hidden h-24 overflow-hidden rounded-2xl lg:block">
              <Image src={CUSTOMIZE_IMAGES.help} alt="" fill className="object-cover object-top" sizes="25vw" />
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {PERKS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm font-medium text-white/92">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bh-glass-on-dark">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
