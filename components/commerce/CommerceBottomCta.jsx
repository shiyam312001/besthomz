import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Headphones } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { site } from "@/config/site";

export function CommerceBottomCta() {
  return (
    <section className="bg-bh-warm-white pb-14 pt-4 md:pb-20 md:pt-6">
      <PageContainer className="grid gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
        <div className="relative flex min-h-[12.5rem] overflow-hidden rounded-3xl bg-bh-green-dark shadow-[0_20px_48px_-12px_rgba(27,61,47,0.22)] md:min-h-[14rem]">
          <Image
            src="/BestHomz/Homepage/banners/27-banner-custom-green-armchair.png"
            alt=""
            fill
            className="object-cover object-center opacity-40"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/95 via-bh-green-dark/75 to-bh-green-dark/40" />
          <div className="relative z-[1] flex flex-col justify-center gap-4 p-6 md:p-8">
            <h2 className="max-w-xs font-display text-xl font-semibold text-white md:text-2xl">
              Explore Our Collections
            </h2>
            <p className="max-w-sm text-sm text-white/85">
              Curated living, dining and bedroom sets — crafted for comfort and style.
            </p>
            <Link
              href="/collections"
              className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-bh-green shadow-[0_8px_22px_rgba(0,0,0,0.12)] bh-focus-ring"
            >
              Explore Collections
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="flex min-h-[12.5rem] flex-col justify-between rounded-3xl p-6 bh-glass-panel md:min-h-[14rem] md:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-bh-green bh-glass-subtle">
              <Headphones className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold text-bh-charcoal md:text-2xl">Talk to Our Expert</h2>
              <p className="mt-2 text-sm leading-relaxed text-bh-muted">
                Get personalised recommendations for your space, budget and timeline.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-bh-green px-5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(27,61,47,0.2)] bh-focus-ring"
            >
              Talk to Our Expert
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/furniture"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-bh-green bh-glass-subtle bh-focus-ring"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Continue Shopping
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
