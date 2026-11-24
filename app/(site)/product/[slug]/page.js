import { notFound } from "next/navigation";
import { fetchProductBySlug, fetchRelatedProducts } from "@/lib/catalog/products";
import { ProductDetail } from "@/components/product/ProductDetail";
import { pageMetadata } from "@/lib/seo/metadata";
import { pickPrimaryImage } from "@/lib/utils/product-helpers";
import { buildProductSeoKeywords } from "@/lib/seo/metadata";
import { breadcrumbSchema, productSchema } from "@/lib/seo/structured-data";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return pageMetadata({
    title: "Product not found",
    path: `/product/${slug}`,
    noIndex: true,
  });
  const image = pickPrimaryImage(product);
  return pageMetadata({
    title: `${product.name} in Chennai`,
    description: product.short_description
      ? `${product.short_description} Available at Best Homz furniture showroom in Chennai.`
      : `${product.name} premium furniture in Chennai. Explore details and request a quote at Best Homz.`,
    path: `/product/${slug}`,
    image: image?.startsWith("/") ? image : undefined,
    keywords: buildProductSeoKeywords(product),
    type: "website",
  });
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  const related = await fetchRelatedProducts(product, 5);
  const category = product.categories;
  const structuredData = [
    productSchema(product),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Furniture", path: "/furniture" },
      ...(category ? [{ name: category.name, path: `/furniture/${category.slug}` }] : []),
      { name: product.name },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <ProductDetail product={product} related={related} />
    </>
  );
}
