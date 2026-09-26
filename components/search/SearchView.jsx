import { SearchHero } from "@/components/search/SearchHero";
import { SearchResultsCatalog } from "@/components/search/SearchResultsCatalog";

export function SearchView({ query, products }) {
  return (
    <div className="bg-bh-warm-white">
      <SearchHero initialQuery={query} />
      <SearchResultsCatalog query={query} products={products} />
    </div>
  );
}
