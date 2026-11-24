import { SearchView } from "@/components/search/SearchView";
import { searchProducts } from "@/lib/catalog/products";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Search Furniture",
  description: "Search premium furniture by name or category at Best Homz Chennai.",
  path: "/search",
  noIndex: true,
  noIndex: true,
});

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const q = (params?.q || "").trim();
  const results = q ? await searchProducts(q) : [];

  return <SearchView query={q} products={results} />;
}
