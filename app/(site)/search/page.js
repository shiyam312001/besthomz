import { SearchView } from "@/components/search/SearchView";
import { searchProducts } from "@/lib/catalog/products";

export const metadata = {
  title: "Search",
  description: "Search Best Homz furniture by name or category.",
};

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const q = (params?.q || "").trim();
  const results = q ? await searchProducts(q) : [];

  return <SearchView query={q} products={results} />;
}
