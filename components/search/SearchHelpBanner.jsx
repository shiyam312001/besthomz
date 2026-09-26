import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { site } from "@/config/site";

export function SearchHelpBanner() {
  return (
    <div className="mt-10 overflow-hidden rounded-2xl bh-glass-panel md:mt-12 md:flex md:min-h-[7.5rem] md:items-center md:rounded-3xl">
      <div className="relative h-32 w-full shrink-0 md:h-auto md:w-44 lg:w-52">
        <Image
          src="/BestHomz/Homepage/banners/27-banner-custom-green-armchair.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="200px"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:px-6 md:py-6">
        <div className="max-w-md">
          <h3 className="font-display text-lg font-semibold text-bh-charcoal md:text-xl">Need Help Choosing?</h3>
          <p className="mt-1 text-sm text-bh-muted">
            Our showroom team can shortlist pieces for your space and budget.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Link
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-bh-charcoal bh-glass-panel bh-focus-ring"
          >
            <MessageCircle className="h-4 w-4 text-bh-green" aria-hidden />
            Chat on WhatsApp
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-bh-green px-5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(27,61,47,0.2)] bh-focus-ring"
          >
            Get Quote
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
