import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Car, LayoutGrid, MessageSquare, Sparkles } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { site } from "@/config/site";

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.full)}`;

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9!2d80.22!3d13.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNelson%20Manickam%20Road!5e0!3m2!1sen!2sin!4v1";

const FEATURES = [
  { icon: Car, label: "Ample Parking" },
  { icon: LayoutGrid, label: "Wide Range" },
  { icon: MessageSquare, label: "Expert Consultation" },
  { icon: Sparkles, label: "Personalised Recommendations" },
];

export function ContactShowroomBanner() {
  return (
    <section id="showroom" className="bg-bh-warm-white py-14 md:py-16 lg:py-20">
      <PageContainer>
        <div className="grid overflow-hidden rounded-2xl bh-shadow-soft md:rounded-3xl lg:min-h-[19rem] lg:grid-cols-12">
          <div className="relative min-h-[14rem] lg:col-span-3 lg:min-h-full">
            <Image
              src="/BestHomz/Homepage/showroom/34-showroom-exterior.png"
              alt="Best Homz showroom exterior"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
          <div className="flex flex-col justify-center bg-bh-green-dark px-6 py-9 md:px-8 md:py-10 lg:col-span-6">
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">Visit Our Showroom</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/88">
              See materials, finishes and layouts in person — our team will walk you through collections and custom
              options.
            </p>
            <Link
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-bh-green shadow-[0_10px_28px_rgba(27,61,47,0.18)] bh-focus-ring"
            >
              Get Directions
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <div className="mt-9 grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-4">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2.5 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full text-white bh-glass-on-dark">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="text-[10px] font-medium leading-tight text-white/92 md:text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[14rem] bg-bh-cream/80 lg:col-span-3 lg:min-h-full">
            <iframe
              title="Best Homz showroom map"
              src={MAP_EMBED}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
