import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { site } from "@/config/site";
import { ABOUT_IMAGES } from "@/components/about/about-assets";

export function AboutShowroom() {
  return (
    <section className="bg-bh-sage-muted/40 py-12 md:py-16">
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div>
            <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">Visit Our Showroom</h2>
            <p className="mt-2 text-sm text-bh-muted md:text-base">Experience our furniture collection in person.</p>
          <div className="bh-glass-panel mt-6 rounded-3xl p-6 md:mt-8 md:p-8">
            <ul className="space-y-4 text-sm text-bh-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bh-green" aria-hidden />
                <span>{site.address.full}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-bh-green" aria-hidden />
                <a href={site.phoneHref} className="hover:text-bh-green bh-focus-ring">{site.phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-bh-green" aria-hidden />
                <a href={site.emailHref} className="hover:text-bh-green bh-focus-ring">{site.email}</a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-bh-green px-5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(27,61,47,0.2)] bh-focus-ring"
              >
                Get Directions
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-white/95 px-5 text-sm font-semibold text-bh-green shadow-[0_8px_22px_rgba(27,61,47,0.1)] backdrop-blur-sm bh-focus-ring"
              >
                Book a Visit
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bh-shadow-soft">
            <Image src={ABOUT_IMAGES.showroom} alt="Best Homz showroom" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
