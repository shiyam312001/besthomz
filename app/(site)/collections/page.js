import { CollectionsView } from "@/components/collections/CollectionsView";
import { fetchActiveCollections } from "@/lib/catalog/collections";
import { buildCollectionProductSlugMap } from "@/lib/catalog/collection-product-map";
import { fetchActiveProducts } from "@/lib/catalog/products";

export const metadata = {
  title: "Collections",
  description: "Explore timeless furniture collections from Best Homz — living, bedroom, dining and office.",
};

export default async function CollectionsPage() {
  const [collections, products] = await Promise.all([
    fetchActiveCollections(),
    fetchActiveProducts({ limit: 200 }),
  ]);
  const collectionProductSlugs = await buildCollectionProductSlugMap(collections);

  return (
    <CollectionsView
      products={products}
      collections={collections}
      collectionProductSlugs={collectionProductSlugs}
    />
  );
}
