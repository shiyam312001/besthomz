import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";

const INSPIRATION = [
  { src: "/BestHomz/Homepage/inspiration/30-inspire-living.png", href: "/rooms/living-room" },
  { src: "/BestHomz/Homepage/inspiration/31-inspire-bedroom.png", href: "/rooms/bedroom" },
  { src: "/BestHomz/Homepage/inspiration/32-inspire-dining.png", href: "/rooms/dining-room" },
  { src: "/BestHomz/Homepage/inspiration/33-inspire-office.png", href: "/rooms/home-office" },
];

export function HomeInspiration() {
  return (
    <section className="bh-section bg-white">
      <PageContainer>
        <div className="flex min-h-[11.5rem] flex-col gap-3 overflow-hidden rounded-2xl sm:min-h-[12.5rem] sm:flex-row md:min-h-[13.5rem]">
          <div className="bh-glass-panel flex w-full shrink-0 flex-col justify-center rounded-2xl p-6 sm:w-[32%] md:p-8">
            <h2 className="font-display text-xl font-semibold text-bh-charcoal md:text-2xl lg:text-3xl">
              Get Inspired
            </h2>
            <p className="mt-2 text-xs text-bh-muted md:text-sm">
              Explore beautiful homes and furniture ideas.
            </p>
            <Link
              href="/furniture"
              className="mt-5 inline-flex h-10 w-fit items-center gap-1.5 rounded-full px-5 text-sm font-semibold text-bh-charcoal transition bh-focus-ring max-lg:bh-glass-panel max-lg:shadow-[0_8px_22px_rgba(27,61,47,0.08)] max-lg:hover:text-bh-green lg:border lg:border-bh-border/80 lg:bg-white lg:shadow-sm lg:hover:border-bh-green lg:hover:text-bh-green"
            >
              View Gallery
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
            {INSPIRATION.map((item) => (
              <Link
                key={item.src}
                href={item.href}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bh-focus-ring sm:aspect-auto sm:min-h-[11.5rem] md:min-h-[13.5rem]"
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 45vw, 20vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
