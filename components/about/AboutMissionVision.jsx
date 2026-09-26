import Image from "next/image";
import { Target, Eye } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ABOUT_IMAGES } from "@/components/about/about-assets";

export function AboutMissionVision() {
  return (
    <section className="bg-bh-sage-muted/50 py-12 md:py-16">
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl bh-shadow-soft lg:col-span-5 lg:min-h-0">
            <Image
              src={ABOUT_IMAGES.missionBed}
              alt="Bedroom furniture"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 40vw"
            />
          </div>
          <div className="bh-glass-panel flex flex-col justify-center gap-10 rounded-3xl p-6 md:gap-12 md:p-8 lg:col-span-7">
            <div className="flex gap-4 md:gap-5">
              <span className="bh-icon-badge-trust shrink-0 text-bh-green">
                <Target className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bh-muted">Our mission</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-bh-charcoal md:text-2xl">Our Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-bh-muted md:text-base">
                  To make premium, well-crafted furniture accessible to every home — with honest guidance, custom options
                  and service you can rely on from first visit to final installation.
                </p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-5">
              <span className="bh-icon-badge-trust shrink-0 text-bh-green">
                <Eye className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bh-muted">Our vision</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-bh-charcoal md:text-2xl">Our Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-bh-muted md:text-base">
                  To be Chennai&apos;s most trusted furniture partner — known for quality, design flexibility and spaces
                  that feel truly like home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
