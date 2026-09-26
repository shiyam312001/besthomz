import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Heart, Home, ShieldCheck } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ABOUT_IMAGES } from "@/components/about/about-assets";

const PILLARS = [
  { icon: ShieldCheck, title: "Quality You Can Trust", text: "Materials chosen for lasting comfort." },
  { icon: Home, title: "Designed for Real Homes", text: "Practical layouts for Indian living." },
  { icon: Heart, title: "Customer First", text: "Guidance from browse to installation." },
  { icon: Leaf, title: "A Greener Tomorrow", text: "Responsible sourcing where possible." },
];

export function AboutStory() {
  return (
    <section id="our-story" className="bg-bh-warm-white pb-12 md:pb-16 mt-[40px]">
      <PageContainer>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">
              Built on a Simple Belief
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-bh-muted md:text-base">
              Best Homz began with a simple idea: every family deserves furniture that feels as good as it looks. From
              our showroom on Nelson Manickam Road, we have grown into a trusted destination for sofas, beds, dining and
              office furniture — with custom options for every room.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bh-muted md:text-base">
              We work closely with homeowners, designers and businesses to deliver pieces that fit your space, style and
              budget — backed by professional support from quote to delivery.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-bh-green px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,61,47,0.2)] transition hover:bg-bh-green-light bh-focus-ring"
            >
              Learn More
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="bh-shadow-soft overflow-hidden rounded-3xl lg:col-span-7">
            <div className="grid md:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[220px] md:min-h-[280px]">
                <Image
                  src={ABOUT_IMAGES.storyDining}
                  alt="Dining room by Best Homz"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 40vw"
                />
              </div>
              <div className="flex flex-col justify-center gap-5 bg-bh-green-dark p-6 md:p-7">
                {PILLARS.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white bh-glass-on-dark">
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="mt-0.5 text-xs text-white/75">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
