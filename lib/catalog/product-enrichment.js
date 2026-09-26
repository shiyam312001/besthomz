/**
 * Display names, copy, and gallery extras for catalog SKUs (besthomz.in gallery lines).
 * Source site has no per-SKU titles — names are curated to match showroom styles.
 */

const BESTHOMZ_CDN = "https://besthomz.in/assets/images/new/prod";

/** Four gallery files per SKU under `public/BestHomz/products/{category}/`. */
export function localPathForProductImage(slug, sortOrder) {
  const folder = folderFromSlug(slug);
  if (!folder || !slug || !sortOrder) return null;
  return `/BestHomz/products/${folder}/${slug}-g${sortOrder}.webp`;
}

/** Public path for a besthomz.in CDN URL (shared / numbered catalog assets). */
export function localPathForRemoteUrl(url) {
  if (!url || typeof url !== "string") return null;
  const numbered = url.match(/\/prod\/([a-z-]+)\/(\d+)\.webp$/i);
  if (numbered) {
    const folder = numbered[1];
    const num = String(Number(numbered[2])).padStart(2, "0");
    return `/BestHomz/products/${folder}/${folder}-design-${num}.webp`;
  }
  const legacy = url.match(/\/prod\/([a-z0-9-]+\.webp)$/i);
  if (legacy) {
    return `/BestHomz/products/_shared/${legacy[1]}`;
  }
  return null;
}

/** @type {Record<string, string[]>} */
export const CATEGORY_PRODUCT_NAMES = {
  sofa: [
    "Modern Fabric Sofa",
    "Contemporary L-Shaped Sofa",
    "Classic Chesterfield Sofa",
    "Minimalist Linen Sofa",
    "Plush Sectional Sofa",
    "Elegant Velvet Sofa",
  ],
  bed: [
    "King Size Storage Bed",
    "Queen Platform Bed",
    "Upholstered Panel Bed",
    "Modern Wooden Bed",
    "Hydraulic Storage Bed",
    "Minimalist Low Profile Bed",
  ],
  mattress: [
    "Memory Foam Mattress",
    "Orthopedic Spring Mattress",
    "Natural Latex Mattress",
    "Pocket Spring Mattress",
    "Dual Comfort Mattress",
    "Premium Euro Top Mattress",
  ],
  "dining-table": [
    "Premium Wooden Dining Table",
    "Modern Six Seater Dining Table",
    "Solid Sheesham Dining Table",
    "Scandinavian Dining Table",
    "Extendable Family Dining Table",
    "Marble Top Dining Table",
  ],
  "dining-chair": [
    "Upholstered Dining Chair",
    "Modern Wooden Dining Chair",
    "Classic Ladder Back Chair",
    "Contemporary Arm Dining Chair",
    "Minimalist Dining Chair",
    "Premium Fabric Dining Chair",
  ],
  "dressing-table": [
    "Modern Dressing Table with Mirror",
    "Wooden Vanity Dressing Table",
    "Compact Bedroom Dressing Unit",
    "Classic Dressing Table Set",
    "Contemporary Dressing Console",
    "Premium Dressing Table with Storage",
  ],
  "office-chair": [
    "Ergonomic Office Chair",
    "Executive Mesh Office Chair",
    "Adjustable Task Chair",
    "High-Back Office Chair",
    "Modern Swivel Office Chair",
    "Comfort Plus Office Chair",
  ],
  "office-table": [
    "Modern Work Desk",
    "Executive Office Table",
    "Compact Study Desk",
    "L-Shaped Office Workstation",
    "Minimalist Writing Desk",
    "Premium Office Table with Storage",
  ],
};

/** Extra besthomz.in lifestyle shots per category (homepage / category promos). */
const CATEGORY_LEGACY_GALLERY = {
  sofa: ["sofa1.webp", "sofa2.webp"],
  bed: ["bed1.webp", "bed2.webp"],
  mattress: ["mat1.webp", "mat2.webp"],
  "dining-table": ["din1.webp", "din2.webp"],
  "dining-chair": ["din-ch3.webp", "din-ch4.webp"],
  "dressing-table": ["dress1.webp", "dress2.webp"],
  "office-chair": ["off-ch1.webp", "off-ch2.webp"],
  "office-table": ["off-ta1.webp", "off-ta2.webp"],
};

const CATEGORY_FOLDER_FROM_NAME = {
  Sofa: "sofa",
  Bed: "bed",
  Mattress: "mattress",
  "Dining Table": "dining-table",
  "Dining Chair": "dining-chair",
  "Dressing Table": "dressing-table",
  "Office Chair": "office-chair",
  "Office Table": "office-table",
};

export function folderFromSlug(slug) {
  const m = slug?.match(/^([a-z-]+)-design-\d+$/);
  return m ? m[1] : null;
}

export function designIndexFromSlug(slug) {
  const m = slug?.match(/-design-(\d+)$/);
  return m ? Number(m[1]) : 1;
}

export function displayNameForProduct({ slug, category }) {
  const folder = folderFromSlug(slug) || CATEGORY_FOLDER_FROM_NAME[category];
  const idx = designIndexFromSlug(slug) - 1;
  const names = folder ? CATEGORY_PRODUCT_NAMES[folder] : null;
  if (names && names[idx]) return names[idx];
  return category ? `${category} Collection` : "Best Homz Furniture";
}

export function buildProductDescription(name, category) {
  const type = category || "furniture";
  return [
    `The ${name} is designed for everyday comfort and lasting style in modern Indian homes. Crafted with attention to proportion, finish, and durability, it brings a refined look to your space while staying practical for family living.`,
    `Available through Best Homz showrooms in Chennai, this ${type.toLowerCase()} can be customised for size, finish, and upholstery to suit your room layout. Share your requirements for a personalised quote, delivery, and installation support from our furniture specialists.`,
  ].join("\n\n");
}

export function buildShortDescription(name, category) {
  const tagline =
    category === "Sofa"
      ? "A perfect blend of comfort and contemporary design for modern homes."
      : `Thoughtfully designed ${(category || "furniture").toLowerCase()} for everyday living.`;
  return `${tagline} Custom sizes and finishes available at Best Homz Chennai.`;
}

export function buildSpecifications(name, category, folder, designIndex) {
  const rows = [
    { specification_name: "Product Type", specification_value: category },
    { specification_name: "Style", specification_value: "Modern Contemporary" },
    { specification_name: "Colour Options", specification_value: "Multiple finishes available" },
    { specification_name: "Care Instructions", specification_value: "Wipe with soft cloth; professional cleaning for upholstery" },
  ];

  const seating = seatingForCategory(folder, designIndex);
  if (seating) {
    rows.splice(1, 0, { specification_name: "Seating / Size", specification_value: seating });
  }

  const dimensions = dimensionsForCategory(folder, designIndex);
  if (dimensions) {
    rows.splice(seating ? 2 : 1, 0, { specification_name: "Dimensions (approx.)", specification_value: dimensions });
  }

  rows.splice(1, 0, {
    specification_name: "Material",
    specification_value: materialForCategory(folder),
  });

  rows.push({ specification_name: "Model", specification_value: name });

  return rows;
}

function seatingForCategory(folder, designIndex) {
  if (folder === "sofa") {
    const map = ["2 Seater", "3 Seater", "L Shape", "3 Seater", "Sectional", "3 Seater"];
    return map[designIndex - 1] || "3 Seater";
  }
  if (folder === "dining-table") {
    const map = ["4 Seater", "6 Seater", "6 Seater", "4 Seater", "8 Seater", "6 Seater"];
    return map[designIndex - 1] || "6 Seater";
  }
  if (folder === "bed") {
    const map = ["King", "Queen", "Queen", "King", "King with storage", "Queen"];
    return map[designIndex - 1] || "Queen";
  }
  if (folder === "mattress") {
    const map = ["Queen", "King", "Queen", "King", "Queen", "King"];
    return map[designIndex - 1] || "Queen";
  }
  return null;
}

function dimensionsForCategory(folder, designIndex) {
  if (folder === "sofa") {
    const map = [
      "W 160 × D 85 × H 85 cm",
      "W 220 × D 95 × H 85 cm",
      "W 200 × D 90 × H 88 cm",
      "W 180 × D 88 × H 82 cm",
      "W 280 × D 160 × H 85 cm",
      "W 200 × D 92 × H 86 cm",
    ];
    return map[designIndex - 1];
  }
  if (folder === "dining-table") {
    return designIndex >= 5 ? "L 200 × W 100 × H 76 cm" : "L 150 × W 90 × H 76 cm";
  }
  if (folder === "bed") {
    return designIndex % 2 === 0 ? "Queen 198 × 152 cm" : "King 198 × 183 cm";
  }
  if (folder === "mattress") {
    return designIndex % 2 === 0 ? "King 198 × 183 × 20 cm" : "Queen 198 × 152 × 20 cm";
  }
  if (folder === "dining-chair") return "W 45 × D 52 × H 92 cm";
  if (folder === "dressing-table") return "W 120 × D 45 × H 150 cm";
  if (folder === "office-chair") return "Seat H 45–52 cm (adjustable)";
  if (folder === "office-table") return "L 140 × W 70 × H 75 cm";
  return null;
}

function materialForCategory(folder) {
  const map = {
    sofa: "Premium fabric upholstery, engineered wood & metal frame",
    bed: "Engineered wood / solid wood with premium finish",
    mattress: "High-density foam with breathable quilted cover",
    "dining-table": "Solid / engineered wood with protective finish",
    "dining-chair": "Wood frame with upholstered seat",
    "dressing-table": "Engineered wood with mirror & storage",
    "office-chair": "Mesh back, cushioned seat, metal base",
    "office-table": "Engineered wood top with metal / wood legs",
  };
  return map[folder] || "Premium materials with durable finish";
}

const GALLERY_IMAGES_PER_PRODUCT = 4;

/**
 * Exactly 4 distinct besthomz.in URLs: primary SKU, 2 category promos, 1 alternate showroom shot.
 */
export function buildBestHomzGalleryUrls(slug) {
  const folder = folderFromSlug(slug);
  const num = designIndexFromSlug(slug);
  if (!folder) return [];

  const seen = new Set();
  const urls = [];

  const push = (url) => {
    if (!url || seen.has(url)) return;
    seen.add(url);
    urls.push(url);
  };

  push(`${BESTHOMZ_CDN}/${folder}/${num}.webp`);

  for (const file of CATEGORY_LEGACY_GALLERY[folder] || []) {
    push(`${BESTHOMZ_CDN}/${file}`);
  }

  for (let offset = 1; urls.length < GALLERY_IMAGES_PER_PRODUCT && offset <= 5; offset += 1) {
    const other = ((num - 1 + offset) % 6) + 1;
    if (other === num) continue;
    push(`${BESTHOMZ_CDN}/${folder}/${other}.webp`);
  }

  return urls.slice(0, GALLERY_IMAGES_PER_PRODUCT);
}

export function enrichImportProduct(p) {
  const folder = folderFromSlug(p.slug);
  const designIndex = designIndexFromSlug(p.slug);
  const name = displayNameForProduct(p);
  const description = buildProductDescription(name, p.category);
  const short_description = buildShortDescription(name, p.category);
  const specifications = buildSpecifications(name, p.category, folder, designIndex);
  const galleryUrls = buildBestHomzGalleryUrls(p.slug);

  const images = galleryUrls.map((url, i) => {
    const isPrimary = i === 0;
    const sort_order = i + 1;
    const image_url = localPathForProductImage(p.slug, sort_order);
    return {
      image_url,
      remote_url: url,
      image_type: isPrimary ? "primary" : "gallery",
      is_primary: isPrimary,
      sort_order,
      format: "webp",
    };
  });

  return {
    ...p,
    name,
    description,
    short_description,
    specifications,
    material_summary: materialForCategory(folder),
    warranty: "Up to 5 years on select ranges (varies by product)",
    care_instructions: "Keep away from direct sunlight; clean spills promptly",
    dimensions: dimensionsForCategory(folder, designIndex),
    images,
  };
}
