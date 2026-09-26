import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CategoryPromoBanner({ promo }) {
  if (!promo) return null;

  return (
    <div className="mt-10 overflow-hidden rounded-2xl bh-shadow-soft md:mt-12 md:rounded-3xl lg:grid lg:grid-cols-12 lg:min-h-[10rem]">
      <div className="relative min-h-[8rem] sm:min-h-[9rem] lg:col-span-5 lg:min-h-full">
        <Image src={promo.image} alt="" fill className="object-cover" sizes="42vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/75 to-transparent" />
      </div>
      <div className="flex flex-col justify-center bg-bh-green-dark px-6 py-6 md:px-8 lg:col-span-7 lg:py-8">
        <h2 className="font-display text-xl font-semibold text-white md:text-2xl">{promo.title}</h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/88">{promo.subtitle}</p>
        <Link
          href={promo.href}
          className="mt-5 inline-flex h-10 w-fit items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-bh-green shadow-[0_8px_22px_rgba(27,61,47,0.18)] bh-focus-ring"
        >
          {promo.cta}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
