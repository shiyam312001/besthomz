import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { HomeTrustBadge } from "@/components/home/HomeTrustBadge";
import Link from "next/link";

const PILLARS = [
  { icon: "/BestHomz/Homepage/icons/10-icon-materials.png", label: "Premium Quality Materials" },
  { icon: "/BestHomz/Homepage/icons/11-icon-custom-design.png", label: "Custom Design & Sizes" },
  { icon: "/BestHomz/Homepage/icons/12-icon-warranty.png", label: "5 Years Warranty" },
  { icon: "/BestHomz/Homepage/icons/13-icon-installation.png", label: "Professional Installation" },
  { icon: "/BestHomz/Homepage/icons/14-icon-support.png", label: "Dedicated Customer Support" },
  { icon: "/BestHomz/Homepage/icons/15-icon-families.png", label: "Affordable Pricing" },
];

export function HomeWhyChoose() {
  return (
    <section className="bh-section bg-bh-sage-muted">
      <PageContainer>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Left: heading + copy */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-3xl font-semibold leading-tight text-bh-charcoal md:text-4xl">
              Why Choose
              <br />
              BEST HOMZ?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-bh-muted md:text-base">
              We believe furniture is more than just wood and fabric — it&apos;s about creating
              spaces where life happens.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex h-11 items-center gap-1.5 rounded-full border border-bh-border bg-white px-5 text-sm font-semibold text-bh-charcoal shadow-sm transition hover:border-bh-green hover:text-bh-green bh-focus-ring"
            >
              Know More
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {/* Right: unified card containing icon grid + image */}
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-sm sm:grid-cols-[1.3fr_1fr] lg:col-span-9">
            {/* Icon grid */}
            <div className="grid grid-cols-3 gap-x-4 gap-y-6 p-6 md:gap-x-6 md:p-8">
              {PILLARS.map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center">
                  <HomeTrustBadge icon={item.icon} label={item.label} />
                </div>
              ))}
            </div>

            {/* Image with green gradient + text */}
            <div className="relative min-h-[220px] overflow-hidden sm:min-h-0">
              <Image
                src="/BestHomz/Homepage/banners/29-banner-beautiful-homes-dining.png"
                alt="Beautiful dining room by Best Homz"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/25 via-transparent to-transparent" />
              <div className="absolute right-4 top-1/2 z-[1] flex w-[min(11rem,42%)] -translate-y-1/2 flex-col gap-3 rounded-2xl p-5 bh-glass-on-dark md:right-6 md:p-6">
                <p className="font-display text-lg font-semibold leading-snug text-white md:text-xl">
                  Beautiful Homes
                  <br />
                  Start with
                  <br />
                  Better Furniture
                </p>
                <span className="h-px w-10 bg-white/50" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}