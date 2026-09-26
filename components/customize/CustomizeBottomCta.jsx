import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { CUSTOMIZE_IMAGES } from "@/components/customize/customize-data";
import { CustomizeOpenQuote } from "@/components/customize/CustomizeOpenQuote";

export function CustomizeBottomCta() {
  return (
    <section className="bg-bh-warm-white pb-16 pt-2 md:pb-20">
      <PageContainer>
        <div className="relative min-h-[220px] overflow-hidden rounded-3xl bh-shadow-soft md:min-h-[260px]">
          <Image src={CUSTOMIZE_IMAGES.hero} alt="" fill className="object-cover object-right" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark via-bh-green-dark/92 to-bh-green-dark/55" />
          <div className="relative px-6 py-10 md:px-10 md:py-12 lg:max-w-xl">
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
              Bring Your Dream Space to Life
            </h2>
            <p className="mt-3 text-sm text-white/85 md:text-base">
              Share your customization choices and get a free quote from our team.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CustomizeOpenQuote
                className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-bh-green shadow-[0_8px_24px_rgba(27,61,47,0.15)] bh-focus-ring"
              >
                Get a Free Quote
              </CustomizeOpenQuote>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white bh-glass-on-dark bh-focus-ring"
              >
                Talk to an Expert
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
