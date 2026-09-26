# Best Homz Asset Manifest

Phase 2 documentation — maps UI screenshots to local assets, components, design tokens, and product imagery.  
**Do not treat this file as runtime configuration.**

**Reference screenshots:** `public/Pages/*.png` (10 files)  
**Asset library:** `public/BestHomz/**` (112 files: 51 PNG, 71 JPG; 122 total including `Pages/`)

---

## Global chrome (all customer pages)

Shared patterns visible across every `public/Pages/` mockup.

| UI Section | Screenshot Reference | Asset Path | Purpose |
|---|---|---|---|
| Top contact bar | All Pages | *(text only in mockup)* | Address, phone, email, social — no dedicated bar image |
| Logo (wordmark + icon) | All Pages | **None on disk** — see [Logo audit](#logo-audit) | Header/footer brand mark |
| Main navigation | All Pages | *(UI only)* | Home, Furniture, Rooms, Collections, Customize, Offers, About, Contact |
| Search field | All Pages | *(UI only)* | Pill search with magnifying glass |
| Wishlist / cart icons | All Pages | *(Lucide in Phase 3)* | Heart + bag; badge counts in mockups |
| Primary header CTA | All Pages | *(UI only)* | “Get Quote →” forest-green pill button |
| Script accent copy | Home, Furniture, Collections, Customize, Contact, About | *(typography only)* | e.g. “Better Homes, Brighter Tomorrows” — optional webfont |
| Footer brand block | All Pages | **Logo TBD** | Logo, blurb, social |
| Footer columns | All Pages | *(text from spec)* | Quick Links, Company, Contact, Newsletter |
| Footer tagline | All Pages | *(text only)* | “Crafted with ♥ for better homes.” |

**Best default showroom photo (shared):**  
`public/BestHomz/Homepage/showroom/34-showroom-exterior.png` (high-res) or `public/BestHomz/assets/showroom/006-showroom-exterior.jpg` (smaller JPG variant).

---

## Home

**Screenshot:** `public/Pages/Home-BestHomz.png`

| UI Section | Screenshot Reference | Asset Path | Purpose |
|---|---|---|---|
| Hero background | Home-BestHomz.png | `public/BestHomz/Homepage/hero/01-hero-sofa.png` | Full-width hero living room |
| Hero script accent | Home-BestHomz.png | *(typography)* | Decorative script overlay |
| Category strip (8 types) | Home-BestHomz.png | See [Category strip assets](#category-strip-assets) | Dining Table → Office Table |
| Trust / features strip (6) | Home-BestHomz.png | `public/BestHomz/Homepage/icons/10-icon-materials.png` … `15-icon-families.png` | Premium Materials, Custom Design, Warranty, Installation, Support, Families |
| Shop by Room (5 cards) | Home-BestHomz.png | `public/BestHomz/Homepage/rooms/17-room-living.png` … `21-room-kids.png` | Living, Bedroom, Dining, Office, Kids |
| Featured products (5) | Home-BestHomz.png | `public/BestHomz/Homepage/featured/22-featured-dining-table.png` … `26-featured-mattress.png` | Featured grid; quote CTA only |
| Customize banner (green + armchair) | Home-BestHomz.png | `public/BestHomz/Homepage/banners/27-banner-custom-green-armchair.png` | “Customise Your Furniture” + glass option list |
| Expert / help banner | Home-BestHomz.png | `public/BestHomz/Homepage/banners/28-banner-help-consultant.png` | “Need Help Choosing?” consultant |
| Lifestyle / vision banner | Home-BestHomz.png | `public/BestHomz/Homepage/banners/16-banner-vision-armchair.png` or `29-banner-beautiful-homes-dining.png` | Mid-page editorial banner |
| Why Choose Us (split) | Home-BestHomz.png | Icons: `Homepage/icons/*`; image: `29-banner-beautiful-homes-dining.png` | Feature grid + dining lifestyle |
| Testimonials | Home-BestHomz.png | *(no local avatar assets)* | Use placeholder initials or add later |
| How it works (5 steps) | Home-BestHomz.png | *(UI/icons — Lucide)* | Explore → Delivery |
| Get Inspired gallery (4) | Home-BestHomz.png | `public/BestHomz/Homepage/inspiration/30-inspire-living.png` … `33-inspire-office.png` | Inspiration row |
| Free quote CTA band | Home-BestHomz.png | `public/BestHomz/assets/banners/011-newsletter-green-chair.png` *(tone match)* or solid green UI | Dark green quote form strip |
| Showroom block | Home-BestHomz.png | `public/BestHomz/Homepage/showroom/34-showroom-exterior.png` | Storefront + map embed |
| Newsletter | Home-BestHomz.png | `public/BestHomz/assets/banners/011-newsletter-green-chair.png` | Optional background motif |

### Category strip assets

| Label in mockup | Asset Path |
|---|---|
| Dining Table | `public/BestHomz/Homepage/categories/02-category-dining-table.png` |
| Dining Chair | `public/BestHomz/Homepage/categories/03-category-dining-chair.png` |
| Dressing Table | `public/BestHomz/Homepage/categories/04-category-dressing-table.png` |
| Bed | `public/BestHomz/Homepage/categories/05-category-bed.png` |
| Mattress | `public/BestHomz/Homepage/categories/06-category-mattress.png` |
| Sofa | `public/BestHomz/Homepage/categories/07-category-sofa.png` |
| Office Chair | `public/BestHomz/Homepage/categories/08-category-office-chair.png` |
| Office Table | `public/BestHomz/Homepage/categories/09-category-office-table.png` |

---

## Furniture

**Screenshot:** `public/Pages/Furniture-BestHomez.png`  
*(Mockup combines hub + catalog: hero, category chips, sidebar filters, product grid, mid CTAs, inspiration, newsletter.)*

| UI Section | Screenshot Reference | Asset Path | Purpose |
|---|---|---|---|
| Hero | Furniture-BestHomez.png | `public/BestHomz/Homepage/hero/01-hero-sofa.png` or `assets/room-pages/049-room-page-living.jpg` | “Designed for a Better Everyday” |
| Hero trust chips | Furniture-BestHomez.png | `Homepage/icons/10`–`15` (subset) | Premium Quality, Modern Designs, Trusted by Families |
| Category quick links (8) | Furniture-BestHomez.png | `Homepage/categories/02`–`09` | Circular / chip navigation |
| Breadcrumb | Furniture-BestHomez.png | *(UI)* | Home › Furniture |
| Promo tile (“Transform Your Space”) | Furniture-BestHomez.png | `assets/banners/008-custom-sofa-banner.jpg` | Green promo card in grid header |
| Filter sidebar | Furniture-BestHomez.png | *(UI — hide price slider when `SHOW_PRICES=false`)* | Category, material, colour, style, availability |
| Product grid cards | Furniture-BestHomez.png | `public/BestHomz/assets/products/021-dining-table.jpg` … `032-office-furniture-set.jpg` | Primary catalog imagery |
| Customize CTA row | Furniture-BestHomez.png | `Homepage/banners/27-banner-custom-green-armchair.png` | Same as Home customize block |
| Expert CTA row | Furniture-BestHomez.png | `Homepage/banners/28-banner-help-consultant.png` | Talk to an Expert |
| Features strip | Furniture-BestHomez.png | `Homepage/icons/*` | Six-icon trust row |
| Get Inspired | Furniture-BestHomez.png | `Homepage/inspiration/30`–`33` | Four room lookbook tiles |
| Newsletter band | Furniture-BestHomez.png | `assets/banners/011-newsletter-green-chair.jpg` | “Stay Inspired” |

---

## Category

**Screenshot:** `public/Pages/Category_BestHomz.png` (example: **Sofas**)

| UI Section | Screenshot Reference | Asset Path | Purpose |
|---|---|---|---|
| Breadcrumb | Category_BestHomz.png | *(UI)* | Home › Furniture › Sofas |
| Category hero image | Category_BestHomz.png | `assets/sofa-room-looks/039-modern-green-living.jpg` or `049-room-page-living.jpg` | Lifestyle hero |
| Hero feature icons | Category_BestHomz.png | `Homepage/icons/*` (subset) | Wide Range, Premium Quality, etc. |
| Filter sidebar | Category_BestHomz.png | *(UI)* | Subcategory, seating, style, material, colour |
| Product grid (sofas) | Category_BestHomz.png | `assets/sofa-collection/012-modern-fabric-sofa.jpg` … `019-luxury-sofa-set.jpg` | Sofa lineup |
| Product badges | Category_BestHomz.png | *(UI badges)* | Popular / New / Best Seller |
| Customize sofa banner | Category_BestHomz.png | `assets/banners/008-custom-sofa-banner.jpg` + `027` armchair crop | Split green CTA |
| Explore more categories | Category_BestHomz.png | `Homepage/categories/*`, `assets/categories/020-category-coffee-table.png` | Related category chips |
| Trust strip | Category_BestHomz.png | `Homepage/icons/*` | Footer-adjacent features |

**Other categories (no dedicated full-page screenshot):** reuse same layout; swap hero + grid assets per category table in [Product data mapping](#product-data-mapping).

---

## Single Product

**Screenshot:** `public/Pages/Single-Product.png` (example: **Modern Fabric Sofa**)

| UI Section | Screenshot Reference | Asset Path | Purpose |
|---|---|---|---|
| Main gallery image | Single-Product.png | `assets/sofa-collection/012-modern-fabric-sofa.jpg` | Primary PDP image |
| Alternate angles / thumbs | Single-Product.png | `assets/sofa-room-looks/039`–`043` *(room context)*; `sofa-collection/*` for variants | Thumbnail strip |
| Feature icons (4) | Single-Product.png | `Homepage/icons/10`, `12`, plus Lucide for structure/maintenance | Premium Fabric, etc. |
| Colour swatches | Single-Product.png | *(UI tokens)* | Olive, beige, gray, brown, navy |
| Size pills | Single-Product.png | `assets/sofa-styles/033-2-seater.png` … `038-sofa-cum-bed.png` | 2/3/L/U seater |
| Detail feature tiles | Single-Product.png | Crop from `012-modern-fabric-sofa.jpg` or dedicated crops TBD | Fabric / frame / comfort / legs |
| Complete-the-room banner | Single-Product.png | `assets/products/031-living-room-set.jpg` | Green promo band |
| You may also like | Single-Product.png | `assets/room-subcategories/055-living-coffee-tables.jpg`, `056-living-tv-units.jpg`, etc. | Related cards |
| Value strip | Single-Product.png | `Homepage/icons/*` | Four bottom trust icons |

---

## Rooms

**Screenshot:** `public/Pages/Roomz.png`

| UI Section | Screenshot Reference | Asset Path | Purpose |
|---|---|---|---|
| Hero (split) | Roomz.png | `assets/room-pages/049-room-page-living.jpg` | “Beautiful Rooms Start…” |
| Living room block | Roomz.png | `assets/room-strips/044-room-strip-living.jpg` + subcats `054`–`058` | Main image + vertical subcategory list |
| Bedroom block | Roomz.png | `045-room-strip-bedroom.jpg` + `059`–`063` | Alternating layout |
| Dining room block | Roomz.png | `046-room-strip-dining.jpg` + `064`–`068` | |
| Home office block | Roomz.png | `047-room-strip-home-office.jpg` + `069`–`073` | |
| Kids room block | Roomz.png | `048-room-strip-kids.jpg` + `074`–`078` | |
| Trust + quote strip | Roomz.png | `Homepage/icons/*` | Icons + brand quote |
| Get Inspired row | Roomz.png | `Homepage/inspiration/30`–`33` + kids: `21-room-kids.png` | Five gallery cards |
| Expert consultation banner | Roomz.png | `Homepage/banners/27-banner-custom-green-armchair.png` or `assets/banners/009-custom-green-armchair.jpg` | Dark green expert CTA |

**Note:** Mockup lists Study Room / Entryway in product spec but **no dedicated room assets** in `public/BestHomz` — flag for art or reuse closest room.

---

## Collections

**Screenshot:** `public/Pages/Collection.png`

| UI Section | Screenshot Reference | Asset Path | Purpose |
|---|---|---|---|
| Hero | Collection.png | `Homepage/hero/01-hero-sofa.png` or `featured/24-featured-sage-sofa.png` | Olive sofa + wood slat room |
| Hero feature row | Collection.png | `Homepage/icons/*` | Four hero icons |
| Breadcrumb | Collection.png | *(UI)* | Home › Collections |
| Sidebar filters | Collection.png | *(UI — omit price filter in quote mode)* | Categories, material, colour, style |
| Inline promo banner | Collection.png | `assets/banners/010-special-collections-sideboard.jpg` | “Good Furniture Creates Great Moments” |
| Product grid | Collection.png | `assets/products/021`–`028` + sets `029`–`032` | Collection catalog |
| Custom collections CTA | Collection.png | `Homepage/banners/27-banner-custom-green-armchair.png` | Glass customization menu |
| Special collections CTA | Collection.png | `assets/banners/010-special-collections-sideboard.jpg` | Sideboard lifestyle |
| Newsletter | Collection.png | `assets/banners/011-newsletter-green-chair.jpg` | “Stay Inspired” |

**Collection themes** (Modern, Luxury, Minimal, etc.) — **no separate image folders**; map in Supabase to existing product/lifestyle assets or `sofa-room-looks/*`.

---

## Customize

**Screenshot:** `public/Pages/Custom_furniture.png`

| UI Section | Screenshot Reference | Asset Path | Purpose |
|---|---|---|---|
| Hero | Custom_furniture.png | `assets/banners/008-custom-sofa-banner.jpg` or `007-together-green-sofa.jpg` | Custom furniture intro |
| Stepper (6 steps) | Custom_furniture.png | *(UI)* | Product → Review & Quote |
| Category sidebar icons | Custom_furniture.png | `Homepage/categories/*` | Sofa, bed, dining, etc. |
| Sofa type grid | Custom_furniture.png | `assets/sofa-styles/033-2-seater.png` … `038-sofa-cum-bed.png` | Select sofa configuration |
| Live preview | Custom_furniture.png | `sofa-collection/012-modern-fabric-sofa.jpg` | Large preview + colour thumbs |
| Finish options | Custom_furniture.png | *(no leg close-up assets)* | Wooden vs metal legs — **Needs Product Verification** / new crops |
| Selection summary card | Custom_furniture.png | *(UI)* | Sticky summary + Get Quote |
| Expert help band | Custom_furniture.png | `Homepage/banners/28-banner-help-consultant.png` | Cream consultant strip |
| Get Inspired | Custom_furniture.png | `sofa-room-looks/039`–`043` | Custom room examples |
| How customization works | Custom_furniture.png | *(UI — same as Home how-it-works)* | 5-step process |
| Bottom quote banner | Custom_furniture.png | `assets/banners/007-together-green-sofa.jpg` | “Bring Your Dream Space to Life” |

---

## Offers

**Screenshot:** `public/Pages/Offer.png`

| UI Section | Screenshot Reference | Asset Path | Purpose |
|---|---|---|---|
| Hero | Offer.png | `assets/products/031-living-room-set.jpg` or `room-pages/049-room-page-living.jpg` | Cream L-sofa living room |
| Category offer chips | Offer.png | `Homepage/categories/*` + green “All Offers” tile *(UI)* | Horizontal category filter |
| Festive / seasonal banner | Offer.png | `assets/banners/003-king-bed-green-throw.jpg` or `room-pages/050-room-page-bedroom.jpg` | Bedroom festive slide |
| Top deals product row | Offer.png | `sofa-collection/012`, `products/024-storage-bed.jpg`, `021`, `025`, `027` | Deal cards — **show offer labels, not prices** in quote-first build |
| Sofa fest / dining delight duo | Offer.png | `026-luxury-fabric-sofa.jpg`, `029-six-seater-dining-set.jpg` | Split promos |
| More offers grid | Offer.png | `025-memory-foam-mattress.jpg`, `030-complete-bedroom-set.jpg` | 2×2 offer cards |
| Trust row | Offer.png | `Homepage/icons/*` | Why shop offers |
| Newsletter | Offer.png | `assets/banners/011-newsletter-green-chair.jpg` | “Don’t Miss Out!” |

**Quote-first note:** Mockup shows % OFF — use **offer type badges** (Limited Offer, Seasonal, Bundle) without numeric discount until pricing is enabled.

---

## About

**Screenshot:** `public/Pages/About_besthomx.png`

| UI Section | Screenshot Reference | Asset Path | Purpose |
|---|---|---|---|
| Hero | About_besthomx.png | `assets/banners/001-about-hero-sofa.jpg` | Living room hero + “Our Story” CTA |
| Our Story (dining image) | About_besthomx.png | `assets/banners/002-story-dining-room.jpg` | Split section + green feature panel |
| Stats strip | About_besthomx.png | `Homepage/icons/15-icon-families.png` etc. | 10k+ customers, 5+ years, etc. |
| Mission / vision | About_besthomx.png | `assets/banners/003-king-bed-green-throw.jpg` | Bedroom vertical image |
| Core values | About_besthomx.png | `Homepage/icons/*` | Four value icons |
| Featured value card | About_besthomx.png | `assets/banners/004-green-armchair-life.jpg` or `009-custom-green-armchair.jpg` | Green armchair card |
| Crafted with care | About_besthomx.png | `assets/banners/005-craftsmanship-hands.jpg` | Craftsman hands |
| Showroom | About_besthomx.png | `assets/showroom/006-showroom-exterior.jpg` | Night storefront |
| Testimonials | About_besthomx.png | *(no avatar assets)* | Three quote cards |
| Bottom CTA | About_besthomx.png | `assets/banners/007-together-green-sofa.jpg` | “Let’s Create a Better Home Together” |

---

## Contact

**Screenshot:** `public/Pages/Contact-BestHomz.png`

| UI Section | Screenshot Reference | Asset Path | Purpose |
|---|---|---|---|
| Hero | Contact-BestHomz.png | `Homepage/hero/01-hero-sofa.png` or `17-room-living.png` | Contact hero living room |
| Quick contact icons | Contact-BestHomz.png | Lucide + green circles *(UI)* | Call, chat, email, showroom |
| Contact form | Contact-BestHomz.png | *(UI)* | Name, email, phone, subject, message |
| Get in touch column | Contact-BestHomz.png | *(spec address/phone/email)* | Structured contact info |
| Showroom triptych | Contact-BestHomz.png | `showroom/34-showroom-exterior.png` + map embed | Store + directions |
| FAQ accordion | Contact-BestHomz.png | *(copy in CMS/seed)* | FAQ list |
| Still need help card | Contact-BestHomz.png | `assets/banners/009-custom-green-armchair.jpg` | Armchair + Call / WhatsApp |

---

## Component Mapping

### Home

```
Home
├── TopContactBar
├── Header (logo, nav, search, wishlist, cart, GetQuoteButton)
├── HeroSection
├── CategoryStrip
├── TrustFeaturesStrip
├── ShopByRoom
├── FeaturedProducts
├── CustomizeBanner
├── ExpertBanner
├── WhyChooseUs
├── Testimonials
├── HowItWorks
├── InspirationGallery
├── QuoteCTA
├── ShowroomSection (image + map)
├── Newsletter
└── Footer
```

### Furniture

```
Furniture
├── TopContactBar
├── Header
├── FurnitureHero
├── CategoryQuickLinks
├── Breadcrumb
├── CatalogLayout
│   ├── FilterSidebar (price filter slot — disabled in quote mode)
│   ├── CatalogToolbar (count, sort, grid/list)
│   └── ProductGrid
├── PromoTile (optional inline banner)
├── Pagination
├── CustomizeBanner
├── ExpertBanner
├── TrustFeaturesStrip
├── InspirationGallery
├── NewsletterBand
└── Footer
```

### Category (dynamic, e.g. Sofas)

```
CategoryPage
├── TopContactBar
├── Header
├── Breadcrumb
├── CategoryHero
├── CategoryFeatureIcons
├── CatalogLayout
│   ├── FilterSidebar (category-specific facets)
│   ├── CatalogToolbar
│   └── ProductGrid (ProductCard)
├── CustomizeCategoryBanner
├── RelatedCategories
├── TrustFeaturesStrip
└── Footer
```

### Single Product

```
ProductPage
├── TopContactBar
├── Header
├── Breadcrumb
├── ProductDetailLayout
│   ├── ProductGallery (main, thumbs, arrows, badges, wishlist)
│   └── ProductPurchasePanel
│       ├── ProductMeta
│       ├── FeatureIconRow
│       ├── ColourSelector
│       ├── SizeSelector
│       ├── QuantityStepper
│       ├── AddToCartButton
│       ├── GetQuoteButton
│       └── TrustMicroIcons
├── ProductFeatureTiles
├── DescriptionAndSpecs
├── CompleteTheRoomBanner
├── RelatedProducts
├── ValueStrip
└── Footer
```

### Rooms

```
RoomsPage
├── TopContactBar
├── Header
├── RoomsHero
├── RoomExplorerBlock × 5 (image | copy | subcategory rail)
├── TrustAndQuoteStrip
├── InspirationGallery
├── ExpertConsultationBanner
└── Footer
```

### Collections

```
CollectionsPage
├── TopContactBar
├── Header
├── CollectionsHero
├── Breadcrumb
├── CatalogLayout (filters + promo banner + grid)
├── Pagination
├── DualPromoBanners (custom + special)
├── TrustFeaturesStrip
├── NewsletterSection
└── Footer
```

### Customize

```
CustomizePage
├── TopContactBar
├── Header
├── CustomizeHero
├── Breadcrumb
├── PageTitle
├── CustomizeStepper
├── CustomizeWorkspace
│   ├── FurnitureCategorySidebar
│   ├── OptionGrid (e.g. sofa types)
│   └── PreviewPanel (image + thumbs)
├── OptionRows (size, material, colour, finish)
├── SelectionSummaryCard (sticky desktop / bottom sheet mobile)
├── ExpertHelpBanner
├── InspirationGallery
├── HowCustomizationWorks
├── QuoteBanner
└── Footer
```

### Offers

```
OffersPage
├── TopContactBar
├── Header
├── OffersHero
├── OfferCategoryStrip
├── FeaturedOfferCarousel
├── TopDealsGrid
├── DuoPromoBanners
├── MoreOffersGrid
├── TrustStrip
├── NewsletterCTA
└── Footer
```

### About

```
AboutPage
├── TopContactBar
├── Header
├── AboutHero
├── OurStorySection
├── StatsStrip
├── MissionVisionSection
├── CoreValuesSection
├── CraftedWithCareSection
├── ShowroomSection
├── Testimonials
├── BottomCTABanner
└── Footer
```

### Contact

```
ContactPage
├── TopContactBar
├── Header
├── ContactHero
├── QuickContactIcons
├── ContactFormSection
├── ShowroomMapSection
├── FAQSection
├── HelpCard (call + WhatsApp)
└── Footer
```

---

## Reusable Components

| Component | Appears on | Shared? | Visual characteristics |
|---|---|---|---|
| `TopContactBar` | All pages | Yes | Full-width forest green (~36–40px), white 12–13px text, social icons right |
| `Header` | All pages | Yes | White bar, logo left, centered nav (desktop), search pill, icon actions, green “Get Quote” pill |
| `Footer` | All pages | Yes | Cream/white background, 4–5 columns, newsletter pill input, copyright bar |
| `Breadcrumb` | Furniture, Category, Collections, Product, Customize | Yes | Muted gray, chevron separators |
| `SectionHeading` | Home, Rooms, Offers, etc. | Yes | Serif display title + optional subtitle + “View all →” link |
| `GlassCard` | Home customize, Collections custom CTA | Yes | `bg-white/70 backdrop-blur`, thin border, soft shadow, option list overlay |
| `CTAButton` / `Button` | Global | Yes | Pill radius ~9999px; primary filled green, secondary white outline, white on green bands |
| `GetQuoteButton` | Header, cards, PDP, cart (future) | Yes | Primary green or outline; arrow icon right |
| `CategoryCard` | Home strip, Furniture chips, Offers strip | Yes | Square/rounded image, label below, consistent 8-category set |
| `ProductCard` | Home featured, Furniture, Category, Collections, Offers | Yes | White card, soft shadow, heart top-right, category label, title, swatches, **no price**; actions “Get Quote” / “View Details” / “Add to Cart” |
| `RoomCard` | Home shop-by-room, inspiration | Yes | Large rounded image (~16–24px radius), title + subtitle |
| `CollectionCard` | Collections promos | Yes | Lifestyle image + title; used in grids and duo banners |
| `TrustFeaturesStrip` | Home, Furniture, Category, Collections | Yes | 4–6 icons in row; uses `Homepage/icons/*` artwork |
| `FeatureIcon` | Home, PDP, About | Yes | Circular or rounded icon + two-line label |
| `CustomizeBanner` | Home, Furniture, Category, Collections | Yes | Green panel + armchair/sofa + glass menu (Size, Material, Colour, Finish) |
| `ExpertBanner` | Home, Furniture, Customize, Rooms | Yes | Cream background, consultant photo, “Talk to an Expert” |
| `QuoteCTA` | Home, Customize, Contact | Yes | Dark green full-width form (name, phone, furniture type) |
| `NewsletterSection` | Home, Furniture, Collections, Offers | Yes | Green band, email pill, optional chair/plant art |
| `ShowroomSection` | Home, About, Contact | Yes | Storefront image + address + map + Directions / Book Visit |
| `TestimonialCard` | Home, About | Yes | White card, stars, quote, avatar, name/location |
| `HowItWorks` | Home, Customize | Yes | Numbered steps 01–05, horizontal desktop / vertical mobile |
| `InspirationGallery` | Home, Furniture, Customize, Rooms | Yes | 4–5 large landscape tiles, horizontal scroll on mobile |
| `FilterSidebar` | Furniture, Category, Collections | Yes | White panel, accordion sections, checkboxes, swatches; **hide price** in quote mode |
| `MobileFilterSheet` | Category, Furniture, Collections | Yes | Bottom sheet / full-screen filter on mobile |
| `CatalogToolbar` | Furniture, Category, Collections | Yes | Result count, sort dropdown, grid/list toggle |
| `Pagination` | Furniture, Category, Collections | Yes | Numeric pages, active page green circle |
| `ProductGallery` | Single Product | Yes | Main image 4:3, thumb strip, arrows, badge, wishlist |
| `VariantSelectors` | PDP, Customize | Yes | Colour dots with ring; size pills with filled active state |
| `QuantityStepper` | PDP, Cart | Yes | − / + with bordered container |
| `PromoBanner` | Collections, Offers | Yes | Split layout image + green copy block |
| `OfferCard` | Offers | Yes | Image, offer badge (type not %), “View Offer” — adapt for quote-first |
| `RoomExplorerBlock` | Rooms | Yes | Alternating 3-column: hero image, sage text panel, vertical subcategory thumbs |
| `SubcategoryThumb` | Rooms | Yes | Small square thumb + label in right rail |
| `CustomizeStepper` | Customize | Yes | 6 numbered steps, green active step |
| `SelectionSummaryCard` | Customize | Yes | White card, line items, primary Get Quote |
| `ContactForm` | Contact, Quote | Yes | Rounded inputs, green submit |
| `FAQAccordion` | Contact | Yes | Plus/minus rows, muted dividers |
| `HelpCard` | Contact | Yes | Image + Call + WhatsApp buttons |
| `MapEmbed` | Home, Contact, Showroom | Yes | Google Maps iframe placeholder |
| `EmptyState` / `LoadingSkeleton` | All data views | Yes | Premium minimal illustrations + copy |

---

## Design Tokens

Approximate values derived from `public/Pages/*` mockups. Refine with pixel inspection in Phase 3.

### Colors

| Token | Approximate value | Usage |
|---|---|---|
| `--color-primary-green` | `#1B3D2F` – `#1F4D3A` | Top bar, primary buttons, active nav |
| `--color-primary-green-dark` | `#152A22` – `#183528` | Hero overlays, footer bands |
| `--color-sage-panel` | `#E8EDE6` – `#EEF2EB` | Room text panels on Rooms page |
| `--color-cream` | `#F7F5F0` – `#FAF8F4` | Page background, footer |
| `--color-surface` | `#FFFFFF` | Cards, header |
| `--color-text` | `#1A1A1A` – `#2C2C2C` | Headings, body |
| `--color-text-muted` | `#6B7280` – `#78716C` | Breadcrumbs, secondary |
| `--color-border` | `#E5E7EB` – `rgba(0,0,0,0.08)` | Inputs, card borders |
| `--color-glass-bg` | `rgba(255,255,255,0.65–0.85)` | Customize overlay menu |
| `--color-accent-badge-new` | Light blue-gray | “New” product badge |
| `--color-accent-badge-sale` | Deep red *(Offers only — use carefully in quote mode)* | Offer badges in reference |

### Typography

| Role | Style | Notes |
|---|---|---|
| Display / H1 | Serif, 40–56px desktop, tight line-height | “Stylish Spaces Happier Homes”, category titles |
| H2 section | Serif 28–36px | “Shop by Room”, “Featured Products” |
| H3 card | Sans or semi-serif 16–18px semibold | Product names |
| Body | Sans 14–16px, line-height ~1.6 | Descriptions, footer |
| Label / nav | Sans 13–14px medium | Nav links, filter labels |
| Eyebrow | Sans 11–12px uppercase tracking-wide | “PREMIUM FURNITURE…”, “CONTACT US” |
| Script accent | Script font | “Better Homes, Brighter Tomorrows” — optional `Dancing Script` or custom |
| Button | Sans 14–15px semibold | Pill buttons |

**Phase 3 font pairing (recommended):** Display serif similar to **Playfair Display** or **Cormorant** + UI sans **Inter** or **DM Sans** (replace default Geist).

### Spacing

| Token | Approximate |
|---|---|
| Max content width | ~1280–1320px container, some heroes full-bleed |
| Section vertical padding | 64–96px desktop; 40–56px mobile |
| Grid gap (products) | 20–24px |
| Header height | ~72–80px main + ~36px top bar |
| Card padding | 16–20px |

### Shape

| Element | Radius |
|---|---|
| Primary button | `9999px` (full pill) |
| Cards / images | `12px`–`24px` (rooms larger ~20–24px) |
| Inputs / search | `9999px` or `12px` |
| Colour swatches | `50%` circles |
| Size pills | `8px`–`12px` |

### Effects

| Effect | Guidance |
|---|---|
| Glass | `backdrop-blur-md` + semi-transparent white + `border border-white/40` — customize menu only |
| Card shadow | `shadow-sm` to `shadow-md`, low spread |
| Hover | Slight image scale (1.02–1.05), shadow lift, button darken ~5% |
| Image treatment | Warm photography, no heavy filters |

---

## Product Data Mapping

### Core categories (required)

| Category | Representative assets | In screenshot? | Supabase product? |
|---|---|---|---|
| Sofa | `Homepage/categories/07-category-sofa.png`, `assets/sofa-collection/*`, `featured/24-featured-sage-sofa.png`, `products/026-luxury-fabric-sofa.jpg` | Yes | Yes |
| Dining Table | `categories/02`, `products/021-dining-table.jpg`, `featured/22` | Yes | Yes |
| Dining Chair | `categories/03`, `products/022-dining-chair.jpg` | Yes | Yes |
| Dressing Table | `categories/04`, `products/023-dressing-table.jpg` | Yes | Yes |
| Bed | `categories/05`, `products/024-storage-bed.jpg`, `featured/23` | Yes | Yes |
| Mattress | `categories/06`, `products/025-memory-foam-mattress.jpg`, `featured/26` | Yes | Yes |
| Office Chair | `categories/08`, `products/027-ergonomic-office-chair.jpg`, `featured/25` | Yes | Yes |
| Office Table | `categories/09`, `products/028-modern-work-desk.jpg` | Yes | Yes |

### Catalog product images (`assets/products/`)

| File | Probable category | Probable name (from filename / mockup) | Screenshot | Supabase seed |
|---|---|---|---|---|
| `021-dining-table.jpg` | Dining Table | Premium / Wooden Dining Table | Furniture, Collection | Yes |
| `022-dining-chair.jpg` | Dining Chair | Upholstered Dining Chair | Furniture, Collection | Yes |
| `023-dressing-table.jpg` | Dressing Table | Modern Dressing Table | Furniture, Collection | Yes |
| `024-storage-bed.jpg` | Bed | King Size Bed with Storage | Furniture, Collection, Offers | Yes |
| `025-memory-foam-mattress.jpg` | Mattress | Orthopedic / Memory Foam Mattress | Furniture, Collection | Yes |
| `026-luxury-fabric-sofa.jpg` | Sofa | Luxury Fabric Sofa | Furniture, Offers | Yes |
| `027-ergonomic-office-chair.jpg` | Office Chair | Ergonomic Office Chair | Furniture, Collection | Yes |
| `028-modern-work-desk.jpg` | Office Table | Modern Work Desk | Furniture, Collection | Yes |
| `029-six-seater-dining-set.jpg` | Dining Table (set) | Six Seater Dining Set | Offers | Yes (bundle) |
| `030-complete-bedroom-set.jpg` | Bed (set) | Complete Bedroom Set | Offers | Yes (bundle) |
| `031-living-room-set.jpg` | Living Room (set) | Living Room Set | Offers hero | Yes (bundle) |
| `032-office-furniture-set.jpg` | Office (set) | Office Furniture Set | Furniture grid | Yes (bundle) |

### Sofa collection (`assets/sofa-collection/`)

| File | Probable name | Supabase |
|---|---|---|
| `012-modern-fabric-sofa.jpg` | Modern Fabric Sofa | Yes — **matches PDP mockup** |
| `013-classic-comfort-sofa.jpg` | Classic Comfort Sofa | Yes |
| `014-minimalist-sofa.jpg` | Minimalist Sofa | Yes |
| `015-leather-sofa.jpg` | Leather Sofa | Yes |
| `016-l-shape-sofa.jpg` | L Shape Sofa | Yes |
| `017-recliner-sofa.jpg` | Recliner Sofa | Yes |
| `018-sofa-cum-bed.jpg` | Sofa Cum Bed | Yes |
| `019-luxury-sofa-set.jpg` | Luxury Sofa Set | Yes |

### Sofa configuration types (`assets/sofa-styles/`) — variants, not standalone SKUs

| File | Type | Notes |
|---|---|---|
| `033-2-seater.png` | 2 Seater | Customize step grid |
| `034-3-seater.png` | 3 Seater | |
| `035-l-shape.png` | L Shape | |
| `036-u-shape.png` | U Shape | |
| `037-recliner.png` | Recliner | |
| `038-sofa-cum-bed.png` | Sofa Cum Bed | |

### Featured homepage products

| File | Maps to |
|---|---|
| `22-featured-dining-table.png` | Dining table featured |
| `23-featured-bed.png` | Bed featured |
| `24-featured-sage-sofa.png` | Sofa featured (sage/green) |
| `25-featured-office-chair.png` | Office chair |
| `26-featured-mattress.png` | Mattress |

### Subcategory / room navigation images

`assets/room-subcategories/054`–`078` — use for room rails and related links; **category labels in filenames** (e.g. `064-dining-dining-tables.jpg`). Treat as **navigation imagery**, not always unique SKUs.

### Extra category asset

| File | Notes |
|---|---|
| `assets/categories/020-category-coffee-table.png` | Coffee Table — **not** in 8-category core list; use for “Explore more” / subcategory |

### Needs Product Verification

- **Finish / leg style close-ups** (Customize page) — no dedicated assets.
- **PDP thumbnail angles** for single SKU — may need multiple photos per product from live site migration.
- **Testimonial avatars** — not in asset library.
- **Logo SVG/PNG** — not in asset library.
- **Study Room / Entryway** — spec rooms without matching `room-pages` assets.
- **Accent Chair, TV Unit, Floor Lamp, Plant** (PDP “You may also like”) — partial coverage via subcategory images only; names not confirmed as catalog SKUs.

---

## Image Quality Audit

### Summary

- **Total files in `public/`:** 122 (~119 MB).
- **Large PNGs (>1 MB):** 39 files — mostly `Homepage/rooms`, `Homepage/inspiration`, `Homepage/featured`, `Homepage/categories`, `Homepage/hero`, `assets/sofa-styles`, and all `Pages/*.png` references.
- **JPG product/lifestyle assets:** typically 260–650 KB — reasonable for source; still convert to WebP in Phase 5/10.

### Large PNG files (optimize priority)

Highest: `Homepage/inspiration/30–33` (~2.4–2.8 MB each), `Homepage/rooms/17–21`, `Homepage/hero/01`, `Homepage/featured/*`, `sofa-styles/033–038`, `Pages/*.png` (1.7–2.1 MB each — **reference only, not for production**).

### Probable duplicate / paired assets (same subject, different path)

| Asset A | Asset B | Relationship |
|---|---|---|
| `Homepage/showroom/34-showroom-exterior.png` | `assets/showroom/006-showroom-exterior.jpg` | Same storefront; PNG larger, JPG ~488 KB |
| `Homepage/banners/27-banner-custom-green-armchair.png` | `assets/banners/009-custom-green-armchair.jpg` | Same armchair motif |
| `Homepage/hero/01-hero-sofa.png` | `assets/banners/001-about-hero-sofa.jpg` | Similar living-room hero (not byte-identical) |
| `featured/24-featured-sage-sofa.png` | `sofa-collection/012-modern-fabric-sofa.jpg` | Same product family (green sofa) |

**Action (later):** pick canonical asset per use-case; avoid loading both in same page.

### Suitability

| Use | Recommended sources |
|---|---|
| Hero (desktop) | `Homepage/hero/01`, `room-pages/*`, `banners/001` |
| Hero (mobile) | Same with `sizes` + crop; prefer JPG variants where smaller |
| Product cards | `assets/products/*`, `sofa-collection/*` (JPG) |
| Category chips | `Homepage/categories/*` (optimize PNG → WebP) |
| Mobile horizontal scroll | `categories/*`, `inspiration/*` (after resize) |
| Icons / trust strip | `Homepage/icons/*` (~150–280 KB — acceptable) |

### Unsuitable / caution

- **`public/Pages/*.png`** — design references only; do not use as runtime images.
- **`sofa-styles/*.png`** — large transparent product renders; good for customize grid after optimization.
- **No SVG icons** — rely on Lucide + raster trust icons.

---

## Logo Audit

| Asset type | Result |
|---|---|
| Filename containing `logo`, `favicon`, `brand` | **None** in `public/` |
| `favicon.ico` / `app/icon.*` | **None** in project |
| SVG brand marks | **None** in `public/` |
| Raster “logo” files | **None** — wordmark appears only inside **page mockups** and lifestyle photos (storefront signage in showroom images) |

**Trust / feature icons (not logo):** `public/BestHomz/Homepage/icons/10-icon-materials.png` through `15-icon-families.png`.

**Offers mockup** describes a green square **“BH” monogram** — no isolated monogram file on disk.

**Phase 3 action:** Export or recreate logo as `public/brand/best-homz-logo.svg` (+ favicon) from brand guidelines or traced from mockup; optional crop from storefront signage is **Needs Product Verification**.

---

## Mobile Design Analysis

Mockups are **desktop-width**; mobile behavior is inferred for premium app-like UX.

| Area | Desktop (reference) | Mobile transformation |
|---|---|---|
| **Header** | Top bar + full nav | Collapse top bar to single line or hide email; hamburger menu; keep search icon opening full-width search overlay |
| **Navigation** | Horizontal links | Full-height drawer or bottom sheet; Furniture/Rooms as expandable groups |
| **Hero** | Full-bleed image + left copy | Stack copy above image; reduce H1 to 32–36px; CTAs full-width stacked |
| **Category strip** | Row of 8 | Horizontal `scroll-snap` carousel; 4–5 visible chips |
| **Product grid** | 3–5 columns | 2 columns (375px+) or 1 column (320px) for dense cards |
| **Filters** | Left sidebar | Sticky “Filter” / “Sort” bar; `MobileFilterSheet` bottom sheet |
| **PDP** | Two columns | Gallery full-width swipe; sticky bottom bar: Wishlist \| Add to Cart \| Get Quote |
| **Customize** | 3-column workspace | Stepper compact; category sidebar → horizontal chips; summary → bottom sheet |
| **Rooms** | 3-column blocks | Stack image → copy → subcategory horizontal scroll per room |
| **CTA buttons** | Inline pills | Full-width primary; min height 48px touch targets |
| **Forms** | Multi-column | Single column; large inputs |
| **Footer** | 5 columns | Accordion sections or stacked blocks |
| **Sticky actions** | Rare on desktop | Cart/quote bar on PDP, cart, customize summary |

**Safe areas:** respect `env(safe-area-inset-bottom)` for bottom nav / sticky CTAs.

**Motion:** respect `prefers-reduced-motion`; use light fade/slide only.

---

## Missing / Uncertain Assets

1. **Brand logo + favicon** (isolated vector/raster).
2. **Customer testimonial avatars**.
3. **Customize finish / leg detail images**.
4. **Multi-angle product photo sets** per SKU (PDP gallery).
5. **Study Room & Entryway** room heroes.
6. **Dedicated mobile mockups** (infer from desktop).
7. **Pages without screenshots:** Cart, Wishlist, Quote flow, Auth, Account, Search, Compare, tools, Admin, 404, Checkout.
8. **Live-site product reconciliation** not done in Phase 2 (Phase 5).
9. **Coffee table** category art exists but not in core 8-category strip.

---

## Phase 2 Summary Statistics

| Metric | Count |
|---|---|
| Page screenshots inspected | **10** |
| Asset files inspected (`BestHomz/**` + inventory of `Pages/`) | **112** BestHomz + 10 reference PNGs (**122** total in `public/`) |
| Reusable components identified | **38** (see table above) |
| Product-oriented image files (catalog + sofa collection + featured) | **25** (12 `products/` + 8 `sofa-collection/` + 5 `featured/`) |
| Configuration / variant images (`sofa-styles/`) | **6** |
| Category card images (`Homepage/categories/`) | **8** |

---

*End of Phase 2 manifest. Phase 3 should implement global layout + tokens first, then Home using mappings in this document.*
