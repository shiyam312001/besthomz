import { CollectionsHero } from "@/components/collections/CollectionsHero";
import { CollectionsCatalog } from "@/components/collections/CollectionsCatalog";
import { CollectionsPromoDuo } from "@/components/collections/CollectionsPromoDuo";
import { CollectionsTrust } from "@/components/collections/CollectionsTrust";
import { CollectionsNewsletter } from "@/components/collections/CollectionsNewsletter";

export function CollectionsView({ products, collections, collectionProductSlugs }) {
  return (
    <div className="bg-bh-warm-white">
      <CollectionsHero />
      <CollectionsCatalog
        products={products}
        collections={collections}
        collectionProductSlugs={collectionProductSlugs}
      />
      <CollectionsPromoDuo />
      <CollectionsTrust />
      <CollectionsNewsletter />
    </div>
  );
}
