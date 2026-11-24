import { FurnitureView } from "@/components/furniture/FurnitureView";
import { fetchActiveCategories } from "@/lib/catalog/categories";
import { fetchActiveProducts } from "@/lib/catalog/products";
import { loadProductsImport } from "@/lib/catalog/load-import";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Furniture in Chennai",
  description: "Browse premium sofas, beds, dining, office and custom furniture at Best Homz showroom in Aminjikarai, Chennai.",
  path: "/furniture",
  keywords: [
    "furniture Chennai",
    "buy furniture Chennai",
    "premium furniture Aminjikarai",
    "sofas beds dining furniture Chennai",
  ],
});

export default async function FurniturePage() {
  const catalogProductCount = loadProductsImport().length;
  const [categories, products] = await Promise.all([
    fetchActiveCategories(),
    fetchActiveProducts({ limit: catalogProductCount }),
  ]);

  return <FurnitureView categories={categories} products={products} />;
}
