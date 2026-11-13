import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PUBLIC = path.join(ROOT, "public");
const file = path.join(ROOT, "data", "products-import.json");
const reportFile = path.join(ROOT, "data", "htc-image-mapping-report.json");
const products = JSON.parse(fs.readFileSync(file, "utf8"));
const report = JSON.parse(fs.readFileSync(reportFile, "utf8"));

const slugs = new Set();
const errors = [];
let mapped = 0;
let needsReview = 0;

for (const product of products) {
  if (!product.slug || slugs.has(product.slug)) errors.push(`Duplicate or missing slug: ${product.slug}`);
  slugs.add(product.slug);
  if (!product.sku) errors.push(`${product.slug}: missing CSV SKU`);

  if (!product.category || !product.category_slug) {
    errors.push(`${product.slug}: missing CSV category`);
  }
  if (!product.csv_matched) errors.push(`${product.slug}: not present in the CSV`);
  if (!Array.isArray(product.images)) errors.push(`${product.slug}: images must be an array`);
  if (!product.images?.length) {
    needsReview += 1;
    if (!product.review_flags?.includes("missing_images")) {
      errors.push(`${product.slug}: missing image is not flagged for review`);
    }
  } else {
    mapped += 1;
  }

  for (const image of product.images || []) {
    if (!image.image_url?.startsWith("/Products/")) {
      errors.push(`${product.slug}: image is outside /Products`);
      continue;
    }
    const relativePath = decodeURIComponent(image.image_url.slice(1));
    if (!fs.existsSync(path.join(PUBLIC, relativePath.split("/").join(path.sep)))) {
      errors.push(`${product.slug}: missing image file ${image.image_url}`);
    }
  }
}

if (products.length !== report.csv_rows) {
  errors.push(`Catalog has ${products.length} products but CSV has ${report.csv_rows} rows`);
}

if (errors.length) {
  console.error("Validation failed:\n", errors.join("\n"));
  process.exit(1);
}

console.log(
  `Validated ${products.length} CSV rows; ${mapped} mapped to images; ${needsReview} need image review.`,
);
