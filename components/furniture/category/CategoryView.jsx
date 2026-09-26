import { CategoryHero } from "@/components/furniture/category/CategoryHero";
import { CategoryCatalog } from "@/components/furniture/category/CategoryCatalog";
import { CategoryExploreMore } from "@/components/furniture/category/CategoryExploreMore";
import { CategoryValueStrip } from "@/components/furniture/category/CategoryValueStrip";
import { CollectionsNewsletter } from "@/components/collections/CollectionsNewsletter";
import { getCategoryPageConfig } from "@/components/furniture/category/category-data";

export function CategoryView({ category, products, categories }) {
  const config = getCategoryPageConfig(category.slug);

  return (
    <div className="bg-bh-warm-white">
      <CategoryHero category={category} config={config} />
      <CategoryCatalog category={category} products={products} categories={categories} config={config} />
      <CategoryExploreMore categories={categories} currentSlug={category.slug} />
      <CategoryValueStrip />
      <CollectionsNewsletter />
    </div>
  );
}
