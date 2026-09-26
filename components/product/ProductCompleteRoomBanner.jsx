import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProductCompleteRoomBanner({ roomHref = "/rooms/living-room" }) {
  return (
    <section className="mt-12 overflow-hidden rounded-3xl bh-shadow-soft md:mt-16 lg:grid lg:min-h-[11rem] lg:grid-cols-12">
      <div className="flex flex-col justify-center bg-bh-green-dark px-6 py-8 md:px-10 lg:col-span-5">
        <h2 className="font-display text-2xl font-semibold text-white md:text-[1.65rem]">Complete Your Living Room</h2>
        <p className="mt-2 text-sm text-white/85">Pair this piece with tables, storage and accents from our living room edit.</p>
        <Link
          href={roomHref}
          className="mt-5 inline-flex h-10 w-fit items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-bh-green shadow-[0_8px_22px_rgba(27,61,47,0.15)] bh-focus-ring"
        >
          Explore Living Room Collection
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <div className="relative min-h-[10rem] lg:col-span-7 lg:min-h-full">
        <Image
          src="/BestHomz/assets/products/031-living-room-set.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width:1024px) 100vw, 58vw"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-bh-green-dark/20" />
      </div>
    </section>
  );
}
