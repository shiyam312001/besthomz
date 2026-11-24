"use client";

import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchaseBar } from "@/components/product/ProductPurchaseBar";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductFeatureTiles } from "@/components/product/ProductFeatureTiles";
import { ProductDescSpecs } from "@/components/product/ProductDescSpecs";
import { ProductCompleteRoomBanner } from "@/components/product/ProductCompleteRoomBanner";
import { ProductValueStrip } from "@/components/product/ProductValueStrip";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductShareButtons } from "@/components/product/ProductShareButtons";
import { AddToCompareButton } from "@/components/product/AddToCompareButton";
import { RecordRecentlyViewed } from "@/components/product/RecordRecentlyViewed";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { pickPrimaryImage } from "@/lib/utils/product-helpers";
import { absoluteUrl } from "@/lib/seo/site-url";
import { isMattressCategory } from "@/components/product/product-pdp-data";

export function ProductDetail({ product, related }) {
  const category = product.categories;
  const specs = product.product_specifications || [];
  const features = product.product_features || [];
  const primaryImage = pickPrimaryImage(product);
  const isMattress = isMattressCategory(category);

  const recentPayload = {
    slug: product.slug,
    name: product.name,
    image: primaryImage,
    category: category?.name,
  };

  const roomHref =
    category?.slug === "sofas" || category?.name?.toLowerCase().includes("sofa")
      ? "/rooms/living-room"
      : "/rooms";

  return (
    <div className="bg-bh-warm-white">
      <RecordRecentlyViewed product={recentPayload} />
      <PageContainer
        className={isMattress ? "max-w-[100rem] py-4 md:py-8" : "max-w-[100rem] py-6 md:py-10"}
      >
        <Breadcrumb
          className={isMattress ? "mb-2 md:mb-3" : "mb-6"}
          items={[
            { label: "Home", href: "/" },
            { label: "Furniture", href: "/furniture" },
            ...(category ? [{ label: category.name, href: `/furniture/${category.slug}` }] : []),
            { label: product.name },
          ]}
        />
        <div className="grid gap-6 xl:grid-cols-2 xl:gap-8 2xl:gap-10">
          <ProductGallery
            product={product}
            productName={product.name}
            isNew={product.is_new}
            productId={product.id}
            slug={product.slug}
            images={product.product_images}
          />
          <ProductPurchasePanel product={product} category={category} />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <ProductShareButtons productName={product.name} productUrl={absoluteUrl(`/product/${product.slug}`)} />
          <AddToCompareButton product={product} />
        </div>

        {!isMattress && <ProductFeatureTiles features={features} image={primaryImage} />}
        <ProductDescSpecs product={product} specs={specs} />
        {!isMattress && <ProductCompleteRoomBanner roomHref={roomHref} />}

        {related?.length > 0 && (
          <section className="mt-12 md:mt-16">
            <h2 className="mb-6 font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">You May Also Like</h2>
            <ProductGrid products={related} cardVariant="home" />
          </section>
        )}
        <RecentlyViewed excludeSlug={product.slug} />
      </PageContainer>
      <ProductValueStrip />
      <ProductPurchaseBar product={product} />
    </div>
  );
}
