import { fetchCollectionBySlug } from "@/lib/catalog/collections";

export async function buildCollectionProductSlugMap(collections) {
  const map = {};
  for (const col of collections) {
    const full = await fetchCollectionBySlug(col.slug);
    const slugs =
      full?.collection_products
        ?.map((cp) => cp.products?.slug)
        .filter(Boolean) ?? [];
    map[col.slug] = slugs;
  }
  return map;
}
