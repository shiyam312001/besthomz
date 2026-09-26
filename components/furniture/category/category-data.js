export const CATEGORY_TRUST = [
  {
    icon: "/BestHomz/Homepage/icons/13-icon-installation.png",
    title: "Free Delivery",
    sub: "Chennai & nearby",
  },
  {
    icon: "/BestHomz/Homepage/icons/10-icon-materials.png",
    title: "Quality Assured",
    sub: "Premium craftsmanship",
  },
  {
    icon: "/BestHomz/Homepage/icons/12-icon-warranty.png",
    title: "Easy Returns",
    sub: "Hassle-free support",
  },
  {
    icon: "/BestHomz/Homepage/icons/14-icon-support.png",
    title: "Expert Support",
    sub: "Showroom guidance",
  },
];

const DEFAULT_BADGES = [
  { icon: "/BestHomz/Homepage/icons/11-icon-custom-design.png", label: "Wide Range" },
  { icon: "/BestHomz/Homepage/icons/10-icon-materials.png", label: "Premium Quality" },
  { icon: "/BestHomz/Homepage/icons/12-icon-warranty.png", label: "Custom Options" },
  { icon: "/BestHomz/Homepage/icons/15-icon-families.png", label: "For Every Home" },
];

/** @type {Record<string, { heroImage: string; script: string; badges: typeof DEFAULT_BADGES; promo: object; seatingFilters?: string[] }>} */
export const CATEGORY_PAGE_CONFIG = {
  sofas: {
    heroImage: "/BestHomz/assets/sofa-room-looks/039-modern-green-living.jpg",
    script: "Better Homes, Brighter Tomorrows",
    badges: DEFAULT_BADGES,
    seatingFilters: ["2 Seater", "3 Seater", "L Shape", "U Shape"],
    promo: {
      title: "Design a Sofa That Fits Your Life",
      subtitle: "Choose size, fabric, and configuration — built for your living room.",
      image: "/BestHomz/assets/banners/008-custom-sofa-banner.jpg",
      href: "/customize",
      cta: "Customize Your Sofa",
    },
  },
  beds: {
    heroImage: "/BestHomz/assets/room-strips/045-room-strip-bedroom.jpg",
    script: "Restful nights, beautiful mornings",
    badges: DEFAULT_BADGES,
    seatingFilters: ["Queen", "King", "With Storage"],
    promo: {
      title: "Create Your Dream Bedroom",
      subtitle: "Beds tailored to your space and storage needs.",
      image: "/BestHomz/assets/products/024-storage-bed.jpg",
      href: "/customize",
      cta: "Customize Your Bed",
    },
  },
  mattresses: {
    heroImage: "/BestHomz/Homepage/categories/06-category-mattress.png",
    script: "Comfort you can feel every night",
    badges: DEFAULT_BADGES,
    promo: {
      title: "Find Your Perfect Mattress",
      subtitle: "Orthopedic, memory foam, and dual-comfort options.",
      image: "/BestHomz/assets/products/025-memory-foam-mattress.jpg",
      href: "/contact",
      cta: "Get Expert Advice",
    },
  },
  "dining-tables": {
    heroImage: "/BestHomz/assets/room-strips/046-room-strip-dining.jpg",
    script: "Gather around timeless design",
    badges: DEFAULT_BADGES,
    seatingFilters: ["4 Seater", "6 Seater", "8 Seater"],
    promo: {
      title: "Complete Your Dining Space",
      subtitle: "Tables sized for everyday meals and celebrations.",
      image: "/BestHomz/assets/products/021-dining-table.jpg",
      href: "/customize",
      cta: "Request a Quote",
    },
  },
  "dining-chairs": {
    heroImage: "/BestHomz/Homepage/rooms/19-room-dining.png",
    script: "Seating that completes the table",
    badges: DEFAULT_BADGES,
    promo: {
      title: "Pair Chairs With Your Table",
      subtitle: "Upholstered and wooden dining chairs to match.",
      image: "/BestHomz/assets/products/022-dining-chair.jpg",
      href: "/furniture/dining-tables",
      cta: "Shop Dining Tables",
    },
  },
  "dressing-tables": {
    heroImage: "/BestHomz/Homepage/rooms/18-room-bedroom.png",
    script: "Vanity with purpose and style",
    badges: DEFAULT_BADGES,
    promo: {
      title: "Dressing Tables With Storage",
      subtitle: "Mirrors, drawers, and finishes to suit your bedroom.",
      image: "/BestHomz/assets/products/023-dressing-table.jpg",
      href: "/customize",
      cta: "Customize Yours",
    },
  },
  "office-chairs": {
    heroImage: "/BestHomz/assets/room-strips/047-room-strip-home-office.jpg",
    script: "Work comfortably, every day",
    badges: DEFAULT_BADGES,
    promo: {
      title: "Ergonomic Office Seating",
      subtitle: "Mesh, executive, and task chairs for long hours.",
      image: "/BestHomz/assets/products/027-ergonomic-office-chair.jpg",
      href: "/contact",
      cta: "Talk to an Expert",
    },
  },
  "office-tables": {
    heroImage: "/BestHomz/Homepage/rooms/20-room-office.png",
    script: "Desks built for focus",
    badges: DEFAULT_BADGES,
    promo: {
      title: "Workstations That Fit Your Office",
      subtitle: "Desks and tables for home offices and workplaces.",
      image: "/BestHomz/assets/products/028-modern-work-desk.jpg",
      href: "/customize",
      cta: "Get a Quote",
    },
  },
};

export function getCategoryPageConfig(slug) {
  return (
    CATEGORY_PAGE_CONFIG[slug] || {
      heroImage: "/BestHomz/Homepage/hero/01-hero-sofa.png",
      script: "Better Homes, Brighter Tomorrows",
      badges: DEFAULT_BADGES,
      promo: {
        title: "Custom Furniture for Your Home",
        subtitle: "Share your requirements for a personalised quote.",
        image: "/BestHomz/Homepage/banners/27-banner-custom-green-armchair.png",
        href: "/customize",
        cta: "Start Customizing",
      },
    }
  );
}

export {
  FILTER_COLOURS,
  FILTER_MATERIALS,
  FILTER_STYLES,
} from "@/components/collections/collections-data";
