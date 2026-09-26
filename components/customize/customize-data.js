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
  { id: "sofa", label: "Sofa", icon: "sofa" },
  { id: "bed", label: "Bed", icon: "bed" },
  { id: "dining-table", label: "Dining Table", icon: "table" },
  { id: "dining-chair", label: "Dining Chair", icon: "chair" },
  { id: "office-chair", label: "Office Chair", icon: "office-chair" },
  { id: "office-table", label: "Office Table", icon: "desk" },
];

export const SOFA_STYLES = [
  { id: "2-seater", name: "2 Seater", image: `${SOFA_STYLE_BASE}/033-2-seater.png` },
  { id: "3-seater", name: "3 Seater", image: `${SOFA_STYLE_BASE}/034-3-seater.png` },
  { id: "l-shape", name: "L Shape", image: `${SOFA_STYLE_BASE}/035-l-shape.png` },
  { id: "u-shape", name: "U Shape", image: `${SOFA_STYLE_BASE}/036-u-shape.png` },
  { id: "recliner", name: "Recliner", image: `${SOFA_STYLE_BASE}/037-recliner.png` },
  { id: "sofa-bed", name: "Sofa Cum Bed", image: `${SOFA_STYLE_BASE}/038-sofa-cum-bed.png` },
];

const CAT_IMG = {
  bed: "/BestHomz/Homepage/categories/05-category-bed.png",
  diningTable: "/BestHomz/Homepage/categories/02-category-dining-table.png",
  diningChair: "/BestHomz/Homepage/categories/03-category-dining-chair.png",
  officeChair: "/BestHomz/Homepage/categories/08-category-office-chair.png",
  officeTable: "/BestHomz/Homepage/categories/09-category-office-table.png",
};

function styleRow(id, name, image) {
  return { id, name, image };
}

export const CATEGORY_CONFIG = {
  sofa: {
    typeTitle: "Select Sofa Type",
    styles: SOFA_STYLES,
    sizes: ["2 Seater", "3 Seater", "L Shape", "Custom Size"],
  },
  bed: {
    typeTitle: "Select Bed Type",
    styles: [
      styleRow("single", "Single", CAT_IMG.bed),
      styleRow("queen", "Queen", CAT_IMG.bed),
      styleRow("king", "King", CAT_IMG.bed),
      styleRow("storage", "Storage Bed", CAT_IMG.bed),
      styleRow("bunk", "Bunk Bed", CAT_IMG.bed),
      styleRow("custom-bed", "Custom", CAT_IMG.bed),
    ],
    sizes: ["Single", "Queen", "King", "Custom Size"],
  },
  "dining-table": {
    typeTitle: "Select Dining Table Type",
    styles: [
      styleRow("4-seater", "4 Seater", CAT_IMG.diningTable),
      styleRow("6-seater", "6 Seater", CAT_IMG.diningTable),
      styleRow("8-seater", "8 Seater", CAT_IMG.diningTable),
      styleRow("round", "Round Table", CAT_IMG.diningTable),
      styleRow("extendable", "Extendable", CAT_IMG.diningTable),
      styleRow("custom-table", "Custom", CAT_IMG.diningTable),
    ],
    sizes: ["4 Seater", "6 Seater", "8 Seater", "Custom Size"],
  },
  "dining-chair": {
    typeTitle: "Select Dining Chair Type",
    styles: [
      styleRow("standard", "Standard", CAT_IMG.diningChair),
      styleRow("upholstered", "Upholstered", CAT_IMG.diningChair),
      styleRow("armchair", "Armchair", CAT_IMG.diningChair),
      styleRow("bench", "Bench", CAT_IMG.diningChair),
      styleRow("bar-stool", "Bar Stool", CAT_IMG.diningChair),
      styleRow("custom-chair", "Custom", CAT_IMG.diningChair),
    ],
    sizes: ["Standard", "Counter Height", "Bar Height", "Custom"],
  },
  "office-chair": {
    typeTitle: "Select Office Chair Type",
    styles: [
      styleRow("task", "Task Chair", CAT_IMG.officeChair),
      styleRow("executive", "Executive", CAT_IMG.officeChair),
      styleRow("ergonomic", "Ergonomic", CAT_IMG.officeChair),
      styleRow("mesh", "Mesh Back", CAT_IMG.officeChair),
      styleRow("visitor", "Visitor", CAT_IMG.officeChair),
      styleRow("custom-oc", "Custom", CAT_IMG.officeChair),
    ],
    sizes: ["Standard", "High Back", "Custom"],
  },
  "office-table": {
    typeTitle: "Select Office Table Type",
    styles: [
      styleRow("desk", "Work Desk", CAT_IMG.officeTable),
      styleRow("l-desk", "L-Desk", CAT_IMG.officeTable),
      styleRow("conference", "Conference", CAT_IMG.officeTable),
      styleRow("standing", "Standing Desk", CAT_IMG.officeTable),
      styleRow("meeting", "Meeting Table", CAT_IMG.officeTable),
      styleRow("custom-ot", "Custom", CAT_IMG.officeTable),
    ],
    sizes: ["120 cm", "140 cm", "160 cm", "Custom Size"],
  },
};

export function getCategoryConfig(categoryId) {
  return CATEGORY_CONFIG[categoryId] ?? CATEGORY_CONFIG.sofa;
}

export const MATERIAL_OPTIONS = ["Fabric", "Leather", "Solid Wood", "Engineered Wood"];
export const COLOUR_SWATCHES = [
  { label: "Beige", hex: "#D4C4A8" },
  { label: "Grey", hex: "#9CA3AF" },
  { label: "Green", hex: "#3D523B" },
  { label: "Brown", hex: "#8B6914" },
  { label: "Custom", hex: "#E8E4DC" },
];
export const FINISH_OPTIONS = ["Matte", "Gloss", "Natural", "Textured"];

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
