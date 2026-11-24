import { notFound } from "next/navigation";
import { CategoryView } from "@/components/furniture/category/CategoryView";
import { fetchCategoryBySlug, fetchActiveCategories } from "@/lib/catalog/categories";
import { fetchProductsByCategorySlug } from "@/lib/catalog/products";
import { loadProductsImport } from "@/lib/catalog/load-import";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = await fetchCategoryBySlug(category);
  if (!cat) return pageMetadata({
    title: "Category not found",
    path: `/furniture/${category}`,
    noIndex: true,
  });
  return pageMetadata({
    title: `${cat.name} in Chennai`,
    description: cat.description || `Shop premium ${cat.name} in Chennai at Best Homz. Explore designs, customization options and request a quote.`,
    path: `/furniture/${category}`,
    keywords: [
      `${cat.name} Chennai`,
      `buy ${cat.name} in Chennai`,
      `${cat.name} showroom Chennai`,
      `premium ${cat.name} Aminjikarai`,
      `custom ${cat.name} Chennai`,
      `Best Homz ${cat.name}`,
    ],
  });
}

export default async function CategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const category = await fetchCategoryBySlug(categorySlug);
  if (!category) notFound();

  const categoryProductCount = loadProductsImport().filter(
    (product) => product.category_slug === categorySlug,
  ).length;
  const [products, categories] = await Promise.all([
    fetchProductsByCategorySlug(categorySlug, { limit: categoryProductCount }),
    fetchActiveCategories(),
  ]);

  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Furniture", path: "/furniture" },
    { name: category.name },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }}
      />
      <CategoryView category={category} products={products} categories={categories} />
    </>
  );
}
