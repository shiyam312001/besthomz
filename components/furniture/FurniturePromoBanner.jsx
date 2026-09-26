import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FURNITURE_PROMO } from "@/components/furniture/furniture-data";

export function FurniturePromoBanner() {
  return (
    <div className="mb-8 overflow-hidden rounded-3xl bh-shadow-soft lg:grid lg:grid-cols-12 lg:min-h-[9rem]">
      <div className="relative min-h-[7.5rem] lg:col-span-5 lg:min-h-full">
        <Image src={FURNITURE_PROMO.image} alt="" fill className="object-cover" sizes="42vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/80 to-transparent" />
      </div>
      <div className="flex flex-col justify-center bg-bh-green-dark px-6 py-6 md:px-8 lg:col-span-7 lg:py-8">
        <h2 className="font-display text-xl font-semibold text-white md:text-2xl">{FURNITURE_PROMO.title}</h2>
        <p className="mt-2 max-w-lg text-sm text-white/85">{FURNITURE_PROMO.subtitle}</p>
        <Link
          href={FURNITURE_PROMO.href}
          className="mt-5 inline-flex h-10 w-fit items-center gap-2 rounded-full px-5 text-sm font-semibold text-bh-charcoal bh-glass-panel bh-focus-ring"
        >
          Shop Sofas
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
