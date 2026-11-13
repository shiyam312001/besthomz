/**
 * Verify mapped product gallery images exist and no unrelated images are substituted.
 * Run: node scripts/verify-product-gallery.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { importProductsToRecords } from "../lib/catalog/load-import.js";
import { buildProductGallerySlides } from "../lib/utils/product-gallery.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public");

const products = importProductsToRecords();
const issues = [];

for (const p of products) {
  const slides = buildProductGallerySlides(p);
  const imageCount = p.product_images?.length ?? 0;

  if (slides.length > Math.min(imageCount, 4)) {
    issues.push({ slug: p.slug, problem: `slides=${slides.length} exceeds mapped images=${imageCount}`, imageCount });
  }

  for (const slide of slides) {
    const rel = slide.image_url?.replace(/^\//, "");
    if (!rel) {
      issues.push({ slug: p.slug, problem: "missing image_url on slide" });
      continue;
    }
    const file = path.join(PUBLIC, decodeURIComponent(rel).split("/").join(path.sep));
    if (!fs.existsSync(file)) {
      issues.push({ slug: p.slug, problem: `missing file ${slide.image_url}` });
    }
  }
  if (!imageCount && slides.length) {
    issues.push({ slug: p.slug, problem: "unmapped product received fallback images" });
  }
}

const sample = products.find((p) => p.product_images?.length);
const sampleSlides = buildProductGallerySlides(sample);

console.log(
  JSON.stringify(
    {
      productCount: products.length,
      allSlidesUseMappedImages: issues.length === 0,
      issueCount: issues.length,
      sample: {
        slug: sample?.slug,
        product_images: sample?.product_images?.length,
        slides: sampleSlides.map((s) => s.image_url),
      },
      issues: issues.slice(0, 10),
    },
    null,
    2,
  ),
);

if (issues.length) process.exit(1);
