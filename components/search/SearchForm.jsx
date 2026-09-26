"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

export function SearchForm({ initialQuery = "", className = "" }) {
  const router = useRouter();

  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        const q = new FormData(e.currentTarget).get("q")?.toString().trim();
        router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
      }}
    >
      <label className="sr-only" htmlFor="search-q">Search furniture</label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bh-muted" aria-hidden />
        <Input id="search-q" name="q" defaultValue={initialQuery} placeholder="Search products…" className="pl-10" />
      </div>
      {initialQuery && (
        <button type="button" className="mt-2 text-sm text-bh-green underline" onClick={() => router.push("/search")}>
          Clear search
        </button>
      )}
    </form>
  );
}
