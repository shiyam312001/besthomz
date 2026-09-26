# Phase 5 — Catalog reconciliation notes

## Website structure (besthomz.in)

- **No WooCommerce-style PDP URLs** — catalog is exposed via category landing pages and `gallery.php`.
- **Primary product imagery:** `assets/images/new/prod/{category}/{1-6}.webp` (48 images, 8 categories × 6).
- **Category pages:** `*-manufacturers-showroom-in-...-chennai.php` (8 URLs aligned with seeded categories).
- **Homepage** highlights bestsellers by category name only (no per-SKU titles).
- **Coffee Table** appears on the homepage shop section but is **not** one of the eight seeded categories — documented for manual schema decision.

## Import policy

- **HIGH** confidence: gallery folder path defines category; one Supabase product per gallery image.
- **MEDIUM** local assets (`public/BestHomz/assets/...`) are mapped in `docs/besthomz-product-image-map.md` but **not** merged into `products-import.json` (no single source SKU).
- **LOW** mappings are excluded.
- **No prices** imported; `product_pricing` untouched.

## Regenerate staging data

```bash
npm run catalog:reconcile
npm run catalog:validate
```
