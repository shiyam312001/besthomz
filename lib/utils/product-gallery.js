const MAX_GALLERY_SLIDES = 4;

/**
 * Product pages only show images mapped to that product, never category-level substitutes.
 */
export function buildProductGallerySlides(product) {
  const productName = product?.name || "Product";
  const sorted = [...(product?.product_images || [])].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  );

  const seen = new Set();
  const slides = [];

  for (const img of sorted) {
    const url = img?.image_url;
    if (!url || seen.has(url)) continue;
    seen.add(url);
    slides.push({
      image_url: url,
      alt_text: img.alt_text || productName,
    });
    if (slides.length >= MAX_GALLERY_SLIDES) return slides;
  }

  return slides;
}
