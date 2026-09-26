/**
 * Download besthomz.in product images into public/ and keep JSON on local paths.
 * Run: node scripts/download-product-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { localPathForRemoteUrl } from "../lib/catalog/product-enrichment.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const importPath = path.join(ROOT, "data", "products-import.json");
const inventoryPath = path.join(ROOT, "data", "catalog-inventory.json");
const PUBLIC = path.join(ROOT, "public");

async function downloadFile(url, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const res = await fetch(url, {
    headers: { "User-Agent": "BestHomzCatalogBot/1.0 (+local-dev)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

/** @returns {Array<{ remote: string, local: string }>} */
function collectDownloadJobs(products) {
  const jobs = [];
  for (const p of products) {
    for (const img of p.images || []) {
      const remote = img.remote_url || (img.image_url?.startsWith("http") ? img.image_url : null);
      if (!remote) continue;
      const local =
        typeof img.image_url === "string" && img.image_url.startsWith("/")
          ? img.image_url
          : localPathForRemoteUrl(remote);
      if (!local) {
        console.warn("No local mapping for", remote);
        continue;
      }
      jobs.push({ remote, local });
    }
  }
  return jobs;
}

async function main() {
  const products = JSON.parse(fs.readFileSync(importPath, "utf8"));
  const jobs = collectDownloadJobs(products);
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const { remote, local } of jobs) {
    const dest = path.join(PUBLIC, local.replace(/^\//, "").split("/").join(path.sep));
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      skipped += 1;
      continue;
    }
    try {
      const bytes = await downloadFile(remote, dest);
      downloaded += 1;
      console.log(`OK ${local} (${bytes} bytes)`);
      await new Promise((r) => setTimeout(r, 100));
    } catch (e) {
      failed += 1;
      console.warn(`FAIL ${local} ${remote}:`, e.message);
    }
  }

  fs.writeFileSync(importPath, JSON.stringify(products, null, 2));
  if (fs.existsSync(inventoryPath)) {
    const inv = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
    inv.products = products;
    inv.generated_at = new Date().toISOString();
    fs.writeFileSync(inventoryPath, JSON.stringify(inv, null, 2));
  }

  const perProduct = products.map((p) => ({
    slug: p.slug,
    images: (p.images || []).length,
  }));
  const withFour = perProduct.filter((x) => x.images === 4).length;
  console.log(
    JSON.stringify({ jobCount: jobs.length, productsWithFourImages: withFour, downloaded, skipped, failed }, null, 2),
  );
  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
