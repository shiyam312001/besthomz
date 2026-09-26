import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";

export function HomeRoomGrid({ rooms }) {
  return (
    <section className="bg-bh-warm-white pb-10 pt-6 max-lg:pb-12 max-lg:pt-7 md:pb-16 md:pt-10 lg:pb-[var(--bh-section-y)]">
      <PageContainer>
        <div className="mb-5 flex flex-col gap-2 md:mb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="bh-type-h2">Shop by Room</h2>
            <p className="mt-1 bh-type-body text-bh-muted">Find the perfect furniture for every space in your home.</p>
          </div>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-1 text-sm font-semibold text-bh-green bh-focus-ring"
          >
            View All Rooms
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2.5 md:gap-4 lg:grid-cols-5">
          {rooms.map((room) => (
            <Link key={room.slug} href={`/rooms/${room.slug}`} className="group bh-focus-ring">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bh-cream shadow-[0_12px_32px_-10px_rgba(27,61,47,0.12)] transition duration-300 max-lg:bh-glass-card max-lg:shadow-[0_16px_36px_-12px_rgba(27,61,47,0.14)] group-hover:-translate-y-0.5 group-hover:shadow-md lg:shadow-sm">
                <Image
                  src={room.hero_image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 1024px) 45vw, 20vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="pt-3">
                <h3 className="text-sm font-semibold text-bh-charcoal">{room.name}</h3>
                {room.description && (
                  <p className="mt-0.5 text-xs text-bh-muted">{room.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}