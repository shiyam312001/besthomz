/**
 * Verify mapped product gallery images exist and no unrelated images are substituted.
 * Run: node scripts/verify-product-gallery.mjs
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { importProductsToRecords } from "../lib/catalog/load-import.js";
import { buildProductGallerySlides } from "../lib/utils/product-gallery.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public");

const products = importProductsToRecords();
const issues = [];

for (const p of products) {
  const slides = buildProductGallerySlides(p);
  const imageCount = p.product_images?.length ?? 0;
  const imageHashes = [];

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
      continue;
    }
    const hash = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
    imageHashes.push(hash);
  }
  if (imageHashes.length >= 2 && new Set(imageHashes).size === 1) {
    issues.push({ slug: p.slug, problem: "gallery contains only duplicate image bytes" });
  }
  if (!imageCount && slides.length) {
    issues.push({ slug: p.slug, problem: "unmapped product received fallback images" });
  }

  const thumbnailPath = p.thumbnail_url?.replace(/^\//, "");
  const thumbnailFile = thumbnailPath
    ? path.join(PUBLIC, decodeURIComponent(thumbnailPath).split("/").join(path.sep))
    : null;
  if (!thumbnailFile || !fs.existsSync(thumbnailFile)) {
    issues.push({ slug: p.slug, problem: "missing generated card thumbnail" });
  } else {
    const metadata = await sharp(thumbnailFile).metadata();
    if (metadata.width !== 720 || metadata.height !== 480) {
      issues.push({
        slug: p.slug,
        problem: `thumbnail dimensions are ${metadata.width}x${metadata.height}, expected 720x480`,
      });
    }
  }
}

const sample = products.find((p) => p.product_images?.length);
const sampleSlides = buildProductGallerySlides(sample);
const thumbnailIssues = issues.filter(({ problem }) => problem.includes("thumbnail"));
const galleryIssues = issues.filter(({ problem }) => !problem.includes("thumbnail"));

console.log(
  JSON.stringify(
    {
      productCount: products.length,
      allSlidesUseMappedImages: galleryIssues.length === 0,
      allCardThumbnailsValid: thumbnailIssues.length === 0,
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
