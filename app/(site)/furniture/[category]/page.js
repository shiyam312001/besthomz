import { notFound } from "next/navigation";
import { CategoryView } from "@/components/furniture/category/CategoryView";
import { fetchCategoryBySlug, fetchActiveCategories } from "@/lib/catalog/categories";
import { fetchProductsByCategorySlug } from "@/lib/catalog/products";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = await fetchCategoryBySlug(category);
  if (!cat) return { title: "Category not found" };
  return {
    title: cat.name,
    description: cat.description || `Browse ${cat.name} at Best Homz.`,
  };
}

export default async function CategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const category = await fetchCategoryBySlug(categorySlug);
  if (!category) notFound();

  const [products, categories] = await Promise.all([
    fetchProductsByCategorySlug(categorySlug, { limit: 100 }),
    fetchActiveCategories(),
  ]);

  return <CategoryView category={category} products={products} categories={categories} />;
}
