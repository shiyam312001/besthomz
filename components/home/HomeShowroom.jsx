import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { site } from "@/config/site";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9!2d80.22!3d13.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNelson%20Manickam%20Road!5e0!3m2!1sen!2sin!4v1";

export function HomeShowroom() {
  return (
    <section className="bh-section bg-bh-warm-white">
      <PageContainer>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr] lg:gap-8">
          {/* Image - no overlay, no gradient */}
          <div className="relative min-h-[260px] overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/5 lg:min-h-[300px]">
            <Image
              src="/BestHomz/Homepage/showroom/34-showroom-exterior.png"
              alt="Best Homz showroom exterior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>

          {/* Text + contact + buttons */}
          <div className="flex flex-col justify-center gap-4">
            <div>
              <h3 className="font-display text-2xl font-semibold text-bh-charcoal">
                Visit Our Showroom
              </h3>
              <p className="mt-1 text-sm text-bh-muted">
                Experience our furniture collection in person.
              </p>
            </div>

            <ul className="space-y-3 text-sm text-bh-muted">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bh-green" aria-hidden />
                <span>{site.address.full}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-bh-green" aria-hidden />
                <a href={site.phoneHref} className="hover:text-bh-green bh-focus-ring">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-bh-green" aria-hidden />
                <a href={site.emailHref} className="hover:text-bh-green bh-focus-ring">
                  {site.email}
                </a>
              </li>
            </ul>

            <div className="mt-2 flex flex-wrap gap-3">
              {/* Glassy outline button */}
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-bh-charcoal bh-glass-panel transition-all hover:shadow-[0_8px_28px_rgba(27,61,47,0.12)] bh-focus-ring"
              >
                Get Directions
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>

              {/* Solid dark-green pill */}
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-bh-green px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all hover:bg-bh-green/90 hover:shadow-[0_6px_24px_rgba(0,0,0,0.2)] bh-focus-ring"
              >
                Book a Visit
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="relative min-h-[260px] overflow-hidden rounded-2xl bg-bh-cream shadow-[0_4px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/5 lg:min-h-[300px]">
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