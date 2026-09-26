const SOFA_ROOM_LOOKS = [
  "/BestHomz/assets/sofa-room-looks/039-modern-green-living.jpg",
  "/BestHomz/assets/sofa-room-looks/040-modern-neutral-living.jpg",
  "/BestHomz/assets/sofa-room-looks/041-cozy-fabric-sofa.jpg",
  "/BestHomz/assets/sofa-room-looks/042-luxury-living-angle.jpg",
];

const SOFA_COLLECTION = [
  "/BestHomz/assets/sofa-collection/012-modern-fabric-sofa.jpg",
  "/BestHomz/assets/sofa-styles/033-2-seater.png",
  "/BestHomz/assets/sofa-styles/034-3-seater.png",
  "/BestHomz/assets/sofa-styles/035-l-shape.png",
];

const CATEGORY_GALLERY_FALLBACKS = {
  sofas: [...SOFA_COLLECTION, ...SOFA_ROOM_LOOKS],
  beds: [
    "/BestHomz/assets/room-strips/045-room-strip-bedroom.jpg",
    "/BestHomz/Homepage/rooms/18-room-bedroom.png",
    "/BestHomz/Homepage/inspiration/31-inspire-bedroom.png",
    "/BestHomz/assets/products/024-storage-bed.jpg",
  ],
  mattresses: [
    "/BestHomz/Homepage/categories/06-category-mattress.png",
    "/BestHomz/assets/products/025-memory-foam-mattress.jpg",
    "/BestHomz/Homepage/rooms/18-room-bedroom.png",
    "/BestHomz/Homepage/inspiration/31-inspire-bedroom.png",
  ],
  "dining-tables": [
    "/BestHomz/assets/room-strips/046-room-strip-dining.jpg",
    "/BestHomz/Homepage/rooms/19-room-dining.png",
    "/BestHomz/assets/products/029-six-seater-dining-set.jpg",
    "/BestHomz/Homepage/inspiration/32-inspire-dining.png",
  ],
  "dining-chairs": [
    "/BestHomz/Homepage/categories/03-category-dining-chair.png",
    "/BestHomz/Homepage/rooms/19-room-dining.png",
    "/BestHomz/assets/room-strips/046-room-strip-dining.jpg",
    "/BestHomz/Homepage/inspiration/32-inspire-dining.png",
  ],
  "dressing-tables": [
    "/BestHomz/Homepage/categories/04-category-dressing-table.png",
    "/BestHomz/Homepage/rooms/18-room-bedroom.png",
    "/BestHomz/assets/room-strips/045-room-strip-bedroom.jpg",
    "/BestHomz/Homepage/inspiration/31-inspire-bedroom.png",
  ],
  "office-chairs": [
    "/BestHomz/Homepage/categories/08-category-office-chair.png",
    "/BestHomz/assets/room-strips/047-room-strip-home-office.jpg",
    "/BestHomz/Homepage/rooms/20-room-office.png",
    "/BestHomz/Homepage/inspiration/33-inspire-office.png",
  ],
  "office-tables": [
    "/BestHomz/Homepage/categories/09-category-office-table.png",
    "/BestHomz/assets/room-strips/047-room-strip-home-office.jpg",
    "/BestHomz/Homepage/rooms/20-room-office.png",
    "/BestHomz/assets/products/032-office-furniture-set.jpg",
  ],
};

const MAX_GALLERY_SLIDES = 4;

function resolveCategorySlug(product) {
  return (
    product?.categories?.slug ||
    product?.category_slug ||
    slugFromCategoryName(product?.category_name || product?.categories?.name)
  );
}

function slugFromCategoryName(name) {
  if (!name) return null;
  const map = {
    sofa: "sofas",
    bed: "beds",
    mattress: "mattresses",
    "dining table": "dining-tables",
    "dining chair": "dining-chairs",
    "dressing table": "dressing-tables",
    "office chair": "office-chairs",
    "office table": "office-tables",
  };
  const key = name.toLowerCase();
  for (const [fragment, slug] of Object.entries(map)) {
    if (key.includes(fragment)) return slug;
  }
  return null;
}

/**
 * Up to 4 unique gallery slides: product images first, then category lifestyle alternates (no duplicate URLs).
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

  if (slides.length >= MAX_GALLERY_SLIDES) return slides;

  const categorySlug = resolveCategorySlug(product);
  const fallbacks =
    (categorySlug && CATEGORY_GALLERY_FALLBACKS[categorySlug]) ||
    SOFA_ROOM_LOOKS;

  for (const url of fallbacks) {
    if (seen.has(url)) continue;
    seen.add(url);
    slides.push({ image_url: url, alt_text: productName });
    if (slides.length >= MAX_GALLERY_SLIDES) break;
  }

  return slides;
}
