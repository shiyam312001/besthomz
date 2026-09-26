import { notFound } from "next/navigation";
import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CollectionsNewsletter } from "@/components/collections/CollectionsNewsletter";
import { fetchCollectionBySlug } from "@/lib/catalog/collections";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const col = await fetchCollectionBySlug(slug);
  if (!col) return { title: "Collection not found" };
  return { title: col.name, description: col.description };
}

export default async function CollectionDetailPage({ params }) {
  const { slug } = await params;
  const collection = await fetchCollectionBySlug(slug);
  if (!collection) notFound();

  const linked =
    collection.collection_products?.map((cp) => cp.products).filter(Boolean) || [];

  return (
    <div className="bg-bh-warm-white">
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
