import { OffersView } from "@/components/offers/OffersView";
import { fetchActiveOffers } from "@/lib/catalog/offers";
import { fetchFeaturedProducts } from "@/lib/catalog/products";
import { mapProductForCard } from "@/lib/utils/product-helpers";

export const metadata = {
  title: "Offers",
  description: "Current promotions and seasonal offers from Best Homz — premium furniture in Chennai.",
};

export default async function OffersPage() {
  const [offers, featured] = await Promise.all([fetchActiveOffers(), fetchFeaturedProducts(12)]);
  const products = featured.map(mapProductForCard);

  return <OffersView products={products} offers={offers} />;
}
