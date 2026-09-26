export const ROOMS_HERO = {
  image: "/BestHomz/assets/room-pages/049-room-page-living.jpg",
  script: "Make every room feel like home.",
  badges: [
    { icon: "/BestHomz/Homepage/icons/11-icon-custom-design.png", label: "Curated by Experts" },
    { icon: "/BestHomz/Homepage/icons/13-icon-installation.png", label: "Complete Room Solutions" },
    { icon: "/BestHomz/Homepage/icons/15-icon-families.png", label: "Designed for Best Homes" },
  ],
};

export const ROOM_EXPLORER_CONFIG = {
  "living-room": {
    stripImage: "/BestHomz/assets/room-strips/044-room-strip-living.jpg",
    fallbackHero: "/BestHomz/Homepage/rooms/17-room-living.png",
    cta: "Explore Living Room",
    subcategories: [
      { label: "Sofas", href: "/furniture/sofas", image: "/BestHomz/Homepage/categories/07-category-sofa.png" },
      { label: "Coffee Tables", href: "/furniture", image: "/BestHomz/Homepage/categories/02-category-dining-table.png" },
      { label: "TV Units", href: "/furniture", image: "/BestHomz/Homepage/categories/09-category-office-table.png" },
      { label: "Accent Chairs", href: "/furniture/dining-chairs", image: "/BestHomz/Homepage/categories/03-category-dining-chair.png" },
      { label: "Side Tables", href: "/furniture", image: "/BestHomz/Homepage/categories/04-category-dressing-table.png" },
    ],
  },
  bedroom: {
    stripImage: "/BestHomz/assets/room-strips/045-room-strip-bedroom.jpg",
    fallbackHero: "/BestHomz/Homepage/rooms/18-room-bedroom.png",
    cta: "Explore Bedroom",
    subcategories: [
      { label: "Beds", href: "/furniture/beds", image: "/BestHomz/Homepage/categories/05-category-bed.png" },
      { label: "Wardrobes", href: "/furniture", image: "/BestHomz/Homepage/categories/04-category-dressing-table.png" },
      { label: "Dressing Tables", href: "/furniture/dressing-tables", image: "/BestHomz/Homepage/categories/04-category-dressing-table.png" },
      { label: "Nightstands", href: "/furniture", image: "/BestHomz/Homepage/categories/05-category-bed.png" },
      { label: "Mattresses", href: "/furniture/mattresses", image: "/BestHomz/Homepage/categories/06-category-mattress.png" },
    ],
  },
  "dining-room": {
    stripImage: "/BestHomz/assets/room-strips/046-room-strip-dining.jpg",
    fallbackHero: "/BestHomz/Homepage/rooms/19-room-dining.png",
    cta: "Explore Dining Room",
    subcategories: [
      { label: "Dining Tables", href: "/furniture/dining-tables", image: "/BestHomz/Homepage/categories/02-category-dining-table.png" },
      { label: "Dining Chairs", href: "/furniture/dining-chairs", image: "/BestHomz/Homepage/categories/03-category-dining-chair.png" },
      { label: "Sideboards", href: "/furniture", image: "/BestHomz/Homepage/categories/09-category-office-table.png" },
      { label: "Bar Units", href: "/furniture", image: "/BestHomz/Homepage/categories/02-category-dining-table.png" },
      { label: "Buffets", href: "/furniture", image: "/BestHomz/Homepage/categories/02-category-dining-table.png" },
    ],
  },
  "home-office": {
    stripImage: "/BestHomz/assets/room-strips/047-room-strip-home-office.jpg",
    fallbackHero: "/BestHomz/Homepage/rooms/20-room-office.png",
    cta: "Explore Home Office",
    subcategories: [
      { label: "Desks", href: "/furniture/office-tables", image: "/BestHomz/Homepage/categories/09-category-office-table.png" },
      { label: "Office Chairs", href: "/furniture/office-chairs", image: "/BestHomz/Homepage/categories/08-category-office-chair.png" },
      { label: "Bookcases", href: "/furniture", image: "/BestHomz/Homepage/categories/09-category-office-table.png" },
      { label: "Storage", href: "/furniture", image: "/BestHomz/Homepage/categories/09-category-office-table.png" },
      { label: "Meeting Tables", href: "/furniture/office-tables", image: "/BestHomz/Homepage/categories/02-category-dining-table.png" },
    ],
  },
  "kids-room": {
    stripImage: "/BestHomz/assets/room-strips/048-room-strip-kids.jpg",
    fallbackHero: "/BestHomz/Homepage/rooms/21-room-kids.png",
    cta: "Explore Kids Room",
    subcategories: [
      { label: "Kids Beds", href: "/furniture/beds", image: "/BestHomz/Homepage/categories/05-category-bed.png" },
      { label: "Study Desks", href: "/furniture/office-tables", image: "/BestHomz/Homepage/categories/09-category-office-table.png" },
      { label: "Storage", href: "/furniture", image: "/BestHomz/Homepage/categories/04-category-dressing-table.png" },
      { label: "Chairs", href: "/furniture/dining-chairs", image: "/BestHomz/Homepage/categories/03-category-dining-chair.png" },
      { label: "Play Furniture", href: "/furniture", image: "/BestHomz/Homepage/rooms/21-room-kids.png" },
    ],
  },
};

export function getRoomExplorerConfig(slug) {
  return ROOM_EXPLORER_CONFIG[slug] ?? {
    stripImage: null,
    fallbackHero: "/BestHomz/Homepage/rooms/17-room-living.png",
    cta: "Explore Room",
    subcategories: [],
  };
}

export const ROOMS_TRUST = [
  { icon: "/BestHomz/Homepage/icons/10-icon-materials.png", label: "Premium Quality Materials" },
  { icon: "/BestHomz/Homepage/icons/11-icon-custom-design.png", label: "Custom Design Options" },
  { icon: "/BestHomz/Homepage/icons/12-icon-warranty.png", label: "5 Years Warranty" },
  { icon: "/BestHomz/Homepage/icons/13-icon-installation.png", label: "Safe & Timely Delivery" },
];

export const ROOMS_INSPIRE = [
  { src: "/BestHomz/Homepage/inspiration/30-inspire-living.png", label: "Modern Living Room", href: "/rooms/living-room" },
  { src: "/BestHomz/Homepage/inspiration/31-inspire-bedroom.png", label: "Elegant Bedroom", href: "/rooms/bedroom" },
  { src: "/BestHomz/Homepage/inspiration/32-inspire-dining.png", label: "Stylish Dining", href: "/rooms/dining-room" },
  { src: "/BestHomz/Homepage/inspiration/33-inspire-office.png", label: "Home Office", href: "/rooms/home-office" },
  { src: "/BestHomz/Homepage/rooms/21-room-kids.png", label: "Kids Room", href: "/rooms/kids-room" },
];
