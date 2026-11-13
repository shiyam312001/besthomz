const SOFA_STYLE_BASE = "/BestHomz/assets/sofa-styles";

export const CUSTOMIZE_STEPS = [
  "Select Product",
  "Choose Size",
  "Select Material",
  "Pick Colour",
  "Choose Finish",
  "Review & Quote",
];

export const CUSTOMIZE_HERO_FEATURES = [
  { label: "Choose Your Style" },
  { label: "Premium Materials" },
  { label: "Made For You" },
  { label: "Expert Support" },
];

export const PRODUCT_CATEGORIES = [
  { id: "avalon-mattress", label: "Avalon Mattress" },
  { id: "bar-chairs", label: "Bar Chair" },
  { id: "beds-5ft", label: "Bed 5Ft" },
  { id: "beds-6ft", label: "Bed 6Ft" },
  { id: "bedroom-sets", label: "Bed Room Set" },
  { id: "bookshelves", label: "Book Shelf" },
  { id: "coat-hangers", label: "Coat Hanger" },
  { id: "coffee-tables", label: "Coffee Table" },
  { id: "consoles", label: "Console" },
  { id: "dining-chairs", label: "Dining Chair" },
  { id: "dressers", label: "Dresser" },
  { id: "dining-sets-4-seater", label: "Dining Set 4 Seater" },
  { id: "dining-sets-6-seater", label: "Dining Set 6 Seater" },
  { id: "dining-sets-8-seater", label: "Dining Set 8 Seater" },
  { id: "massager-chairs", label: "Massager Chair" },
  { id: "office-chairs", label: "Office Chair" },
  { id: "office-tables", label: "Office Table" },
  { id: "others", label: "Others" },
  { id: "outdoor", label: "Outdoor" },
  { id: "reception-tables", label: "Reception Table" },
  { id: "shoe-racks", label: "Shoe Rack" },
  { id: "side-tables", label: "Side Table" },
  { id: "sofas", label: "Sofa" },
  { id: "swings", label: "Swing" },
  { id: "trolleys", label: "Trolley" },
  { id: "tv-units", label: "TV Unit" },
  { id: "visitor-chairs", label: "Visitor Chair" },
  { id: "wardrobes", label: "Wardrobe" },
];

export const SOFA_STYLES = [
  { id: "2-seater", name: "2 Seater", image: `${SOFA_STYLE_BASE}/033-2-seater.png` },
  { id: "3-seater", name: "3 Seater", image: `${SOFA_STYLE_BASE}/034-3-seater.png` },
  { id: "l-shape", name: "L Shape", image: `${SOFA_STYLE_BASE}/035-l-shape.png` },
  { id: "u-shape", name: "U Shape", image: `${SOFA_STYLE_BASE}/036-u-shape.png` },
  { id: "recliner", name: "Recliner", image: `${SOFA_STYLE_BASE}/037-recliner.png` },
  { id: "sofa-bed", name: "Sofa Cum Bed", image: `${SOFA_STYLE_BASE}/038-sofa-cum-bed.png` },
];

function styleRow(id, name, image) {
  return { id, name, image };
}

const LEGACY_CATEGORY_IDS = {
  sofa: "sofas",
  bed: "beds-5ft",
  "dining-table": "dining-sets-4-seater",
  "dining-chair": "dining-chairs",
  "office-chair": "office-chairs",
  "office-table": "office-tables",
};

const CATEGORY_LABELS = {
  ds4: "Dining Set 4 Seater",
  ds6: "Dining Set 6 Seater",
  ds8: "Dining Set 8 Seater",
  "dining-sets-4-seater": "Dining Set 4 Seater",
  "dining-sets-6-seater": "Dining Set 6 Seater",
  "dining-sets-8-seater": "Dining Set 8 Seater",
  trolly: "Trolley",
  "tv unit": "TV Unit",
};

export function getCustomizeCategoryLabel(categoryId, name) {
  return CATEGORY_LABELS[categoryId?.toLowerCase()] ||
    CATEGORY_LABELS[name?.toLowerCase()] ||
    name ||
    categoryId;
}

export function resolveCategoryId(categoryId, categories = PRODUCT_CATEGORIES) {
  const resolvedId = LEGACY_CATEGORY_IDS[categoryId] || categoryId;
  return categories.some((category) => category.id === resolvedId)
    ? resolvedId
    : categories[0]?.id || "sofas";
}

function optionStyles(names, image) {
  return names.map((name) =>
    styleRow(name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name, image),
  );
}

export function getCategoryConfig(categoryId, category = {}) {
  const name = getCustomizeCategoryLabel(
    categoryId,
    category.name || PRODUCT_CATEGORIES.find((item) => item.id === categoryId)?.label,
  );
  const descriptor = `${categoryId} ${name}`.toLowerCase();
  const image = category.image_url || CUSTOMIZE_IMAGES.preview;

  if (descriptor.includes("sofa")) {
    return {
      typeTitle: "Select Sofa Type",
      styles: SOFA_STYLES,
      sizes: ["2 Seater", "3 Seater", "L Shape", "Custom Size"],
    };
  }
  if (descriptor.includes("mattress")) {
    return {
      typeTitle: "Select Mattress Type",
      styles: optionStyles(["Foam", "Spring", "Orthopedic", "Custom"], image),
      sizes: ["Single", "Double", "Queen", "King", "Custom Size"],
    };
  }
  if (descriptor.includes("bed")) {
    return {
      typeTitle: `Select ${name} Type`,
      styles: optionStyles(["Panel Bed", "Storage Bed", "Upholstered", "Custom"], image),
      sizes: ["Single", "Queen", "King", "Custom Size"],
    };
  }
  if (descriptor.includes("chair")) {
    return {
      typeTitle: `Select ${name} Type`,
      styles: optionStyles(["Standard", "Upholstered", "With Armrests", "Custom"], image),
      sizes: ["Standard", "Counter Height", "Bar Height", "Custom Size"],
    };
  }
  if (/(dining-set|table|console|trolley|unit)/.test(descriptor)) {
    const diningSeater = descriptor.match(/(4|6|8)-seater/);
    return {
      typeTitle: `Select ${name} Type`,
      styles: optionStyles(["Rectangular", "Round", "Extendable", "Custom"], image),
      sizes: diningSeater
        ? [`${diningSeater[1]} Seater`, "Custom Size"]
        : ["Compact", "Standard", "Large", "Custom Size"],
    };
  }
  if (/(shelf|hanger|dresser|shoe rack|wardrobe|storage)/.test(descriptor)) {
    return {
      typeTitle: `Select ${name} Type`,
      styles: optionStyles(["Compact", "Shelved", "With Doors", "Custom"], image),
      sizes: ["Compact", "Standard", "Large", "Custom Size"],
    };
  }
  if (/(outdoor|swing)/.test(descriptor)) {
    return {
      typeTitle: `Select ${name} Type`,
      styles: optionStyles(["Classic", "Contemporary", "Weather-resistant", "Custom"], image),
      sizes: ["Single", "Two Seater", "Three Seater", "Custom Size"],
    };
  }
  return {
    typeTitle: `Select ${name} Configuration`,
    styles: optionStyles(["Modern", "Classic", "Compact", "Custom"], image),
    sizes: ["Compact", "Standard", "Large", "Custom Size"],
  };
}

export const MATERIAL_OPTIONS = [
  "Solid Wood",
  "Engineered Wood",
  "Metal",
  "Glass",
  "Fabric",
  "Leather",
  "Rattan",
  "Mixed Materials",
  "Custom",
];
export const COLOUR_SWATCHES = [
  { label: "Beige", hex: "#D4C4A8" },
  { label: "Grey", hex: "#9CA3AF" },
  { label: "Green", hex: "#3D523B" },
  { label: "Brown", hex: "#8B6914" },
  { label: "Custom", hex: "#E8E4DC" },
];
export const FINISH_OPTIONS = ["Matte", "Gloss", "Natural", "Textured", "Painted", "Custom"];

export const HOW_CUSTOMIZE = [
  { num: "01", title: "Choose Product", text: "Pick a category and configuration." },
  { num: "02", title: "Customize Options", text: "Size, material, colour and finish." },
  { num: "03", title: "Preview Design", text: "Review your selections in real time." },
  { num: "04", title: "Get Quote", text: "Request pricing from our team." },
  { num: "05", title: "Delivery & Install", text: "We deliver and set up at your home." },
];

export const INSPIRE = [
  { src: "/BestHomz/Homepage/inspiration/30-inspire-living.png", label: "Modern Living Room" },
  { src: "/BestHomz/Homepage/inspiration/31-inspire-bedroom.png", label: "Cozy Bedroom" },
  { src: "/BestHomz/Homepage/inspiration/32-inspire-dining.png", label: "Elegant Dining" },
  { src: "/BestHomz/Homepage/inspiration/33-inspire-office.png", label: "Home Office" },
  { src: "/BestHomz/Homepage/banners/27-banner-custom-green-armchair.png", label: "Luxury Accent" },
];

export const CUSTOMIZE_IMAGES = {
  hero: "/BestHomz/Homepage/hero/01-hero-sofa.png",
  preview: "/BestHomz/Homepage/banners/27-banner-custom-green-armchair.png",
  help: "/BestHomz/Homepage/banners/28-banner-help-consultant.png",
};
