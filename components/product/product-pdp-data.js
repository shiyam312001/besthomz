export const PDP_SIZES = ["2 Seater", "3 Seater", "L Shape", "U Shape"];

export const PDP_TRUST_MICRO = [
  { icon: "/BestHomz/Homepage/icons/13-icon-installation.png", title: "Free Delivery", sub: "Chennai & nearby" },
  { icon: "/BestHomz/Homepage/icons/12-icon-warranty.png", title: "Secure Packaging", sub: "Careful handling" },
  { icon: "/BestHomz/Homepage/icons/14-icon-support.png", title: "Easy Returns", sub: "Hassle-free support" },
  { icon: "/BestHomz/Homepage/icons/15-icon-families.png", title: "Expert Support", sub: "Showroom guidance" },
];

export const PDP_VALUE_STRIP = [
  { icon: "/BestHomz/Homepage/icons/10-icon-materials.png", label: "Premium Quality", sub: "Crafted to last" },
  { icon: "/BestHomz/Homepage/icons/11-icon-custom-design.png", label: "Modern Designs", sub: "Timeless style" },
  { icon: "/BestHomz/Homepage/icons/12-icon-warranty.png", label: "5 Years Warranty", sub: "Peace of mind" },
  { icon: "/BestHomz/Homepage/icons/14-icon-support.png", label: "Dedicated Support", sub: "We're here to help" },
];

export function isMattressCategory(category) {
  return `${category?.slug || ""} ${category?.name || ""}`.toLowerCase().includes("mattress");
}
