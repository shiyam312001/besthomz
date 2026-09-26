import { OffersHero } from "@/components/offers/OffersHero";
import { OffersFilterProvider } from "@/components/offers/OffersFilterContext";
import { OffersCategoryStrip } from "@/components/offers/OffersCategoryStrip";
import { OffersFestiveBanner } from "@/components/offers/OffersFestiveBanner";
import { OffersTopDeals } from "@/components/offers/OffersTopDeals";
import { OffersPromoDuo } from "@/components/offers/OffersPromoDuo";
import { OffersMoreGrid } from "@/components/offers/OffersMoreGrid";
import { OffersWhyShop } from "@/components/offers/OffersWhyShop";
import { OffersNewsletter } from "@/components/offers/OffersNewsletter";
import { FESTIVE_SLIDES } from "@/components/offers/offers-data";

function mapDbOfferToSlide(offer) {
  if (!offer?.title) return null;
  return {
    id: offer.slug || offer.id,
    title: offer.title,
    subtitle: offer.description || "Limited time promotion",
    discount: offer.offer_type?.replace(/_/g, " ") || "Special Offer",
    image: offer.image_url || FESTIVE_SLIDES[0].image,
    href: offer.cta_url || "/furniture",
    perks: FESTIVE_SLIDES[0].perks,
  };
}

export function OffersView({ products = [], offers = [] }) {
  const dbSlides = offers.map(mapDbOfferToSlide).filter(Boolean);
  const festiveSlides = dbSlides.length ? dbSlides : FESTIVE_SLIDES;

  return (
    <div className="bg-bh-warm-white">
      <OffersHero />
      <OffersFilterProvider>
        <OffersCategoryStrip />
        <OffersFestiveBanner slides={festiveSlides} />
        <OffersTopDeals products={products} />
        <OffersPromoDuo />
        <OffersMoreGrid />
        <OffersWhyShop />
        <OffersNewsletter />
      </OffersFilterProvider>
    </div>
  );
}
