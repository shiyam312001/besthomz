import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ROOMS_INSPIRE } from "@/components/rooms/rooms-data";

export function RoomsInspired() {
  return (
    <section className="bg-bh-warm-white py-12 md:py-16">
      <PageContainer>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-8">
          <div>
            <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">Get Inspired</h2>
            <p className="mt-2 text-sm text-bh-muted">Room looks to spark your next refresh.</p>
          </div>
          <Link href="/furniture" className="inline-flex items-center gap-1 text-sm font-semibold text-bh-green bh-focus-ring">
            View Gallery
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {ROOMS_INSPIRE.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group overflow-hidden rounded-2xl bh-shadow-soft bh-focus-ring md:rounded-3xl"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width:768px) 45vw, 20vw"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/55 to-transparent p-3">
                  <p className="text-xs font-semibold text-white md:text-sm">{item.label}</p>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/90 text-bh-green shadow-[0_4px_12px_rgba(27,61,47,0.12)]">
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
