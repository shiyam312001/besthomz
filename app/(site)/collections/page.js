import { CollectionsView } from "@/components/collections/CollectionsView";
import { fetchActiveCollections } from "@/lib/catalog/collections";
import { buildCollectionProductSlugMap } from "@/lib/catalog/collection-product-map";
import { fetchActiveProducts } from "@/lib/catalog/products";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Furniture Collections",
  description: "Explore Best Homz living, bedroom, dining and office furniture collections, designed for premium Chennai homes.",
  path: "/collections",
  keywords: [
    "furniture collections Chennai",
    "living room collection Chennai",
    "bedroom collection Chennai",
    "office furniture collection Chennai",
  ],
});

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
