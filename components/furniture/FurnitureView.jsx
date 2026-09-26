import { FurnitureHero } from "@/components/furniture/FurnitureHero";
import { FurnitureCategoryStrip } from "@/components/furniture/FurnitureCategoryStrip";
import { FurnitureCatalog } from "@/components/furniture/FurnitureCatalog";
import { FurnitureBottom } from "@/components/furniture/FurnitureBottom";

export function FurnitureView({ categories, products }) {
  return (
    <div className="bg-bh-warm-white">
      <FurnitureHero />
      <FurnitureCategoryStrip categories={categories} />
      <FurnitureCatalog products={products} categories={categories} />
      <FurnitureBottom />
    </div>
  );
}
