import { FurnitureView } from "@/components/furniture/FurnitureView";
import { fetchActiveCategories } from "@/lib/catalog/categories";
import { fetchActiveProducts } from "@/lib/catalog/products";
import { loadProductsImport } from "@/lib/catalog/load-import";

export const metadata = {
  title: "Furniture",
  description: "Browse premium furniture by category. Request a quote from Best Homz Chennai.",
};

export default async function FurniturePage() {
  const catalogProductCount = loadProductsImport().length;
  const [categories, products] = await Promise.all([
    fetchActiveCategories(),
    fetchActiveProducts({ limit: catalogProductCount }),
  ]);

  return <FurnitureView categories={categories} products={products} />;
}
