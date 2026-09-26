import Image from "next/image";
import { Layers, Palette, Sparkles, Sofa } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { CUSTOMIZE_HERO_FEATURES, CUSTOMIZE_IMAGES } from "@/components/customize/customize-data";

const FEATURE_ICONS = [Sofa, Layers, Sparkles, Palette];

export function CustomizeHero() {
  return (
    <section className="relative min-h-[22rem] overflow-hidden md:min-h-[26rem] lg:min-h-[28rem]">
      <Image src={CUSTOMIZE_IMAGES.hero} alt="" fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/85 via-bh-green-dark/50 to-bh-green-dark/20" />
      <PageContainer className="relative flex min-h-[22rem] flex-col justify-between py-8 md:min-h-[26rem] md:py-10 lg:min-h-[28rem] lg:py-12">
        <div className="max-w-2xl pt-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">Custom furniture</p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-[2.75rem]">
            Your Space. Your Style.
            <br />
            Your Furniture.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/88 md:text-base">
            Configure size, materials, colours and finishes — then request a personalised quote from our Chennai team.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {CUSTOMIZE_HERO_FEATURES.map(({ label }, i) => {
            const Icon = FEATURE_ICONS[i] ?? Sofa;
            return (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-2xl px-3 py-4 text-center bh-glass-hero md:rounded-3xl md:py-5"
              >
                <span className="bh-icon-badge-trust bg-white/95 text-bh-green">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="text-[10px] font-semibold leading-tight text-white md:text-[11px]">{label}</span>
              </div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
