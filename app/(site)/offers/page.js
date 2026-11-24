import { OffersView } from "@/components/offers/OffersView";
import { pageMetadata } from "@/lib/seo/metadata";
import { fetchActiveOffers } from "@/lib/catalog/offers";
import { fetchFeaturedProducts } from "@/lib/catalog/products";
import { mapProductForCard } from "@/lib/utils/product-helpers";

export const metadata = pageMetadata({
  title: "Furniture Offers in Chennai",
  description: "Discover current furniture offers and seasonal promotions at Best Homz in Chennai. Explore featured sofas, beds, dining and office furniture.",
  path: "/offers",
  keywords: [
    "furniture offers Chennai",
    "sofa offers Chennai",
    "bed offers Chennai",
    "Best Homz offers",
  ],
});

export default async function OffersPage() {
  const [offers, featured] = await Promise.all([fetchActiveOffers(), fetchFeaturedProducts(12)]);
  const products = featured.map(mapProductForCard);

  return <OffersView products={products} offers={offers} />;
}
