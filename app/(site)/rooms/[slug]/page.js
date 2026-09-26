import { notFound } from "next/navigation";
import Image from "next/image";
import { PageContainer } from "@/components/layout/PageContainer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { fetchRoomBySlug } from "@/lib/catalog/rooms";
import { fetchActiveProducts } from "@/lib/catalog/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { RoomsExpertCta } from "@/components/rooms/RoomsExpertCta";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const room = await fetchRoomBySlug(slug);
  if (!room) return { title: "Room not found" };
  return { title: room.name, description: room.description };
}

export default async function RoomDetailPage({ params }) {
  const { slug } = await params;
  const room = await fetchRoomBySlug(slug);
  if (!room) notFound();

  const products = await fetchActiveProducts({ limit: 8 });

  return (
    <div className="bg-bh-warm-white">
      <section className="relative min-h-[16rem] overflow-hidden md:min-h-[20rem]">
        <Image src={room.hero_image} alt={room.name} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-bh-green-dark/85 via-bh-green-dark/45 to-bh-green-dark/20" />
        <PageContainer className="relative flex min-h-[16rem] flex-col justify-end py-8 md:min-h-[20rem] md:py-10">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Rooms", href: "/rooms" }, { label: room.name }]}
            className="mb-3"
          />
          <h1 className="font-display text-3xl font-semibold text-white md:text-4xl">{room.name}</h1>
          {room.description && <p className="mt-2 max-w-xl text-sm text-white/88 md:text-base">{room.description}</p>}
        </PageContainer>
      </section>
      <PageContainer className="py-10 md:py-12">
        <p className="mb-8 text-sm text-bh-muted">
          Room-specific product relationships are not yet mapped in the catalog. Browse featured pieces below or request a quote for your room.
        </p>
        <ProductGrid products={products} cardVariant="home" />
      </PageContainer>
      <RoomsExpertCta />
    </div>
  );
}
