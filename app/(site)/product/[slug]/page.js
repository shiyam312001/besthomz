import { notFound } from "next/navigation";
import { fetchProductBySlug, fetchRelatedProducts } from "@/lib/catalog/products";
import { ProductDetail } from "@/components/product/ProductDetail";
import { pageMetadata } from "@/lib/seo/metadata";
import { pickPrimaryImage } from "@/lib/utils/product-helpers";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  const image = pickPrimaryImage(product);
  return pageMetadata({
    title: product.name,
    description: product.short_description || product.description?.slice(0, 160),
    path: `/product/${slug}`,
    image: image?.startsWith("/") ? image : undefined,
  });
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  const related = await fetchRelatedProducts(product, 5);

  return <ProductDetail product={product} related={related} />;
}
