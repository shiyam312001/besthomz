import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { getRoomExplorerConfig } from "@/components/rooms/rooms-data";

export function RoomExplorerBlock({ room, reversed = false }) {
  const config = getRoomExplorerConfig(room.slug);
  const mainImage = config.stripImage || room.hero_image || config.fallbackHero;
  const href = `/rooms/${room.slug}`;

  return (
    <article
      className={cn(
        "mb-6 overflow-hidden rounded-3xl bh-shadow-soft last:mb-0 lg:mb-8 lg:grid lg:min-h-[17rem] lg:grid-cols-12",
        "bg-bh-sage-muted/35",
      )}
    >
      <div
        className={cn(
          "relative min-h-[12rem] lg:col-span-5 lg:min-h-full",
          reversed ? "lg:order-2" : "lg:order-1",
        )}
      >
        <Image src={mainImage} alt={room.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 42vw" />
      </div>

      <div
        className={cn(
          "flex flex-col justify-center px-6 py-8 md:px-8 lg:col-span-4 lg:py-10",
          "bg-bh-sage/50 backdrop-blur-sm",
          reversed ? "lg:order-1" : "lg:order-2",
        )}
      >
        <h3 className="font-display text-2xl font-semibold text-bh-charcoal md:text-[1.65rem]">{room.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-bh-muted md:text-base">
          {room.description || "Furniture and layouts curated for this space."}
        </p>
        <Link
          href={href}
          className="mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-bh-green px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,61,47,0.22)] bh-focus-ring"
        >
          {config.cta}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div
        className={cn(
          "px-4 py-5 md:px-5 lg:col-span-3 lg:py-6",
          "bh-glass-panel lg:rounded-none",
          reversed ? "lg:order-3" : "lg:order-3",
        )}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-bh-muted">Shop by type</p>
        <ul>
          {config.subcategories.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-3 border-b border-bh-green/8 py-3 transition last:border-0 hover:bg-bh-sage-muted/40 bh-focus-ring"
              >
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white/90 shadow-[0_4px_12px_rgba(27,61,47,0.08)]">
                  <Image src={item.image} alt="" fill className="object-contain p-1.5" sizes="40px" />
                </span>
                <span className="flex-1 text-sm font-medium text-bh-charcoal">{item.label}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-bh-muted" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
