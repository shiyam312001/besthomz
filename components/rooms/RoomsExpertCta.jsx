import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Headphones, Map, ShieldCheck, Sparkles } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";

const PERKS = [
  { icon: Headphones, label: "Free Consultation" },
  { icon: Map, label: "Custom Room Planning" },
  { icon: ShieldCheck, label: "Best Price Guarantee" },
  { icon: Sparkles, label: "Expert Support" },
];

export function RoomsExpertCta() {
  return (
    <section className="bg-bh-warm-white pb-16 pt-2 md:pb-20">
      <PageContainer>
        <div className="bh-shadow-soft overflow-hidden rounded-3xl lg:grid lg:grid-cols-12 lg:min-h-[16rem]">
          <div className="relative min-h-[12rem] lg:col-span-5 lg:min-h-full">
            <Image
              src="/BestHomz/Homepage/banners/27-banner-custom-green-armchair.png"
              alt=""
              fill
              className="object-cover object-center"
              sizes="42vw"
            />
          </div>
          <div className="flex flex-col justify-center bg-bh-green-dark px-6 py-8 md:px-10 md:py-10 lg:col-span-4">
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
              Need Help Designing Your Perfect Room?
            </h2>
            <p className="mt-2 text-sm text-white/85">Speak with our team for layout and furniture guidance.</p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-bh-green shadow-[0_8px_22px_rgba(27,61,47,0.15)] bh-focus-ring"
            >
              Talk to an Expert
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="flex flex-col justify-center bg-bh-green-dark/95 px-6 py-8 md:px-8 lg:col-span-3 lg:py-10">
            <ul className="space-y-4">
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
