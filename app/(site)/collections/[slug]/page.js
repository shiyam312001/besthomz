import { notFound } from "next/navigation";
import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CollectionsNewsletter } from "@/components/collections/CollectionsNewsletter";
import { fetchCollectionBySlug } from "@/lib/catalog/collections";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const col = await fetchCollectionBySlug(slug);
  if (!col) return pageMetadata({
    title: "Collection not found",
    path: `/collections/${slug}`,
    noIndex: true,
  });
  return pageMetadata({
    title: `${col.name} in Chennai`,
    description: col.description
      ? `${col.description} Discover the collection at Best Homz, Chennai.`
      : `Explore ${col.name} premium furniture and custom collections at Best Homz Chennai.`,
    path: `/collections/${slug}`,
    keywords: [
      `${col.name} Chennai`,
      `${col.name} furniture`,
      `premium furniture collection Chennai`,
      `Best Homz collections`,
    ],
  });
}

export default async function CollectionDetailPage({ params }) {
  const { slug } = await params;
  const collection = await fetchCollectionBySlug(slug);
  if (!collection) notFound();

  const linked =
    collection.collection_products?.map((cp) => cp.products).filter(Boolean) || [];
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: collection.name },
  ]);

  return (
    <div className="bg-bh-warm-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }}
      />
      <section className="relative min-h-[16rem] overflow-hidden md:min-h-[20rem]">
        <Image src={collection.hero_image} alt={collection.name} fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/85 via-bh-green-dark/45 to-bh-green-dark/20" />
        <PageContainer className="relative flex min-h-[16rem] flex-col justify-end py-8 md:min-h-[20rem] md:py-10">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Collections", href: "/collections" }, { label: collection.name }]}
            className="mb-3"
          />
          <h1 className="font-display text-3xl font-semibold text-white md:text-4xl">{collection.name}</h1>
          {collection.description && (
            <p className="mt-2 max-w-xl text-sm text-white/88 md:text-base">{collection.description}</p>
          )}
        </PageContainer>
      </section>
      <PageContainer className="py-10 md:py-12">
        {linked.length > 0 ? (
          <ProductGrid products={linked} cardVariant="collection" />
        ) : (
          <p className="rounded-2xl p-10 text-center text-sm text-bh-muted bh-glass-panel md:rounded-3xl">
            Products for this collection will appear here once linked in the catalog. Request a quote and our team will curate pieces for you.
          </p>
        )}
      </PageContainer>
      <CollectionsNewsletter />
    </div>
  );
}
