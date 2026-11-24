import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/site-url";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FurnitureStore",
        "@id": `${absoluteUrl("/")}#organization`,
        name: site.name,
        url: absoluteUrl("/"),
        logo: absoluteUrl(site.logo),
        image: absoluteUrl("/BestHomz/Homepage/hero/01-hero-sofa.png"),
        description: site.description,
        telephone: site.phone,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "No. 41 Nelson Manickam Road",
          addressLocality: "Aminjikarai",
          addressRegion: "Tamil Nadu",
          postalCode: "600094",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Chennai" },
          { "@type": "Place", name: "Aminjikarai" },
        ],
        sameAs: Object.values(site.social).filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        url: absoluteUrl("/"),
        name: site.name,
        publisher: { "@id": `${absoluteUrl("/")}#organization` },
        inLanguage: "en-IN",
      },
    ],
  };
}

export function productSchema(product) {
  const category = product.categories?.name || product.category_name || null;
  const primaryImage = product.product_images?.find((image) => image.is_primary) || product.product_images?.[0];
  const price = Number(product.price);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description || product.description,
    sku: product.sku || product.slug,
    category,
    url: absoluteUrl(`/product/${product.slug}`),
    image: primaryImage?.image_url ? absoluteUrl(primaryImage.image_url) : undefined,
    brand: { "@type": "Brand", name: site.name },
  };

  if (Number.isFinite(price) && price > 0) {
    schema.offers = {
      "@type": "Offer",
      url: absoluteUrl(`/product/${product.slug}`),
      priceCurrency: product.currency || "INR",
      price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "FurnitureStore", name: site.name },
    };
  }

  return schema;
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? absoluteUrl(item.path) : undefined,
    })),
  };
}
