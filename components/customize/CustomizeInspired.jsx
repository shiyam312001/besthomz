import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { INSPIRE } from "@/components/customize/customize-data";

export function CustomizeInspired() {
  return (
    <section className="bg-bh-warm-white py-12 md:py-16">
      <PageContainer>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:mb-8">
          <div>
            <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">Get Inspired</h2>
            <p className="mt-2 text-sm text-bh-muted">Real homes styled with Best Homz furniture.</p>
          </div>
          <Link href="/furniture" className="inline-flex items-center gap-1 text-sm font-semibold text-bh-green bh-focus-ring">
            View Gallery
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {INSPIRE.map((item) => (
            <Link
              key={item.label}
              href="/furniture"
              className="group overflow-hidden rounded-2xl bh-shadow-soft bh-focus-ring"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width:768px) 45vw, 20vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3">
                  <p className="text-xs font-semibold text-white">{item.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
