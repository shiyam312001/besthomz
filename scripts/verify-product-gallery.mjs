/**
 * Verify each catalog product exposes 4 gallery slides and files exist on disk.
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

  if (slides.length !== 4) {
    issues.push({ slug: p.slug, problem: `slides=${slides.length} (expected 4)`, imageCount });
  }

  for (const slide of slides) {
    const rel = slide.image_url?.replace(/^\//, "");
    if (!rel) {
      issues.push({ slug: p.slug, problem: "missing image_url on slide" });
      continue;
    }
    const file = path.join(PUBLIC, rel.split("/").join(path.sep));
    if (!fs.existsSync(file)) {
      issues.push({ slug: p.slug, problem: `missing file ${slide.image_url}` });
    }
  }
}

const sample = products.find((p) => p.slug === "bed-design-1");
const sampleSlides = buildProductGallerySlides(sample);

console.log(
  JSON.stringify(
    {
      productCount: products.length,
      allHaveFourSlides: issues.length === 0,
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
