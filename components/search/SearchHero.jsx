"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { POPULAR_SEARCHES, SEARCH_HERO } from "@/components/search/search-data";
import { cn } from "@/lib/cn";

export function SearchHero({ initialQuery = "" }) {
  const router = useRouter();

  function submit(query) {
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <section className="relative min-h-[16rem] overflow-hidden md:min-h-[20rem] lg:min-h-[24rem]">
      <Image src={SEARCH_HERO.image} alt="" fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/85 via-bh-green-dark/55 to-bh-green-dark/25" />
      <PageContainer className="relative flex min-h-[16rem] flex-col justify-center py-8 md:min-h-[20rem] md:py-12 lg:min-h-[24rem]">
        <div className="mx-auto w-full max-w-2xl text-center">
          <h1 className="font-display text-[1.65rem] font-semibold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[2.5rem]">
            {SEARCH_HERO.title}
          </h1>
          <p className="mt-2 text-[0.9375rem] text-white/88 md:mt-3 md:text-base">{SEARCH_HERO.subtitle}</p>

          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              submit(new FormData(e.currentTarget).get("q")?.toString() || "");
            }}
          >
            <label className="sr-only" htmlFor="search-hero-q">Search furniture</label>
            <div className="flex overflow-hidden rounded-full bg-white/95 p-1.5 shadow-[0_12px_40px_rgba(27,61,47,0.18)] backdrop-blur-sm">
              <div className="relative flex flex-1 items-center">
                <Search className="pointer-events-none absolute left-4 h-5 w-5 text-bh-muted" aria-hidden />
                <input
                  id="search-hero-q"
                  name="q"
                  type="search"
                  defaultValue={initialQuery}
                  placeholder="Search furniture…"
                  className="h-12 w-full rounded-full bg-transparent pl-12 pr-4 text-sm text-bh-charcoal outline-none placeholder:text-bh-muted md:h-[3.25rem] md:text-base"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-bh-green px-6 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(27,61,47,0.22)] bh-focus-ring md:h-[3.25rem] md:px-8"
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium text-white/75">Popular searches:</span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => submit(term)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium text-white/95 bh-glass-on-dark bh-focus-ring",
                  initialQuery.toLowerCase() === term.toLowerCase() && "ring-1 ring-white/50",
                )}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
