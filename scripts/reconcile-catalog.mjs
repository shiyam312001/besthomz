/**
 * Phase 5 — build catalog inventory from besthomz.in gallery + map local assets.
 * Run: node scripts/reconcile-catalog.mjs
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { enrichImportProduct, displayNameForProduct } from "../lib/catalog/product-enrichment.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const PUBLIC_PRODUCTS = path.join(ROOT, "public", "BestHomz", "products");
const BASE_URL = "https://besthomz.in";

const CATEGORY_MAP = {
  "dining-table": { name: "Dining Table", slug: "dining-tables" },
  "dining-chair": { name: "Dining Chair", slug: "dining-chairs" },
  "dressing-table": { name: "Dressing Table", slug: "dressing-tables" },
  bed: { name: "Bed", slug: "beds" },
  mattress: { name: "Mattress", slug: "mattresses" },
  sofa: { name: "Sofa", slug: "sofas" },
  "office-chair": { name: "Office Chair", slug: "office-chairs" },
  "office-table": { name: "Office Table", slug: "office-tables" },
};

const CATEGORY_PAGES = {
  "dining-table":
    "dining-table-manufacturers-showroom-in-nungambakkam-arumbakkam-anna-nagar-t-nagar-chennai.php",
  "dining-chair":
    "dining-chair-manufacturers-showroom-in-nungambakkam-arumbakkam-anna-nagar-t-nagar-chennai.php",
  "dressing-table":
    "dressing-table-manufacturers-showroom-in-nungambakkam-arumbakkam-anna-nagar-t-nagar-chennai.php",
  bed: "bed-manufacturers-showroom-in-nungambakkam-arumbakkam-anna-nagar-t-nagar-chennai.php",
  mattress:
    "mattress-manufacturers-showroom-in-nungambakkam-arumbakkam-anna-nagar-t-nagar-chennai.php",
  sofa: "sofa-manufacturers-showroom-in-nungambakkam-arumbakkam-anna-nagar-t-nagar-chennai.php",
  "office-chair":
    "office-chair-manufacturers-showroom-in-nungambakkam-arumbakkam-anna-nagar-t-nagar-chennai.php",
  "office-table":
    "office-table-manufacturers-showroom-in-nungambakkam-arumbakkam-anna-nagar-t-nagar-chennai.php",
};

const LOCAL_ASSET_HINTS = [
  {
    local: "/BestHomz/assets/products/021-dining-table.jpg",
    category: "Dining Table",
    note: "Manifest dining table hero — category visual",
    confidence: "MEDIUM",
  },
  {
    local: "/BestHomz/assets/products/022-dining-chair.jpg",
    category: "Dining Chair",
    confidence: "MEDIUM",
  },
  {
    local: "/BestHomz/assets/products/023-dressing-table.jpg",
    category: "Dressing Table",
    confidence: "MEDIUM",
  },
  {
    local: "/BestHomz/assets/products/024-storage-bed.jpg",
    category: "Bed",
    confidence: "MEDIUM",
  },
  {
    local: "/BestHomz/assets/products/025-memory-foam-mattress.jpg",
    category: "Mattress",
    confidence: "MEDIUM",
  },
  {
    local: "/BestHomz/assets/sofa-collection/012-modern-fabric-sofa.jpg",
    category: "Sofa",
    note: "UI mockup PDP reference — not linked to a single gallery SKU",
    confidence: "MEDIUM",
  },
  {
    local: "/BestHomz/assets/products/027-ergonomic-office-chair.jpg",
    category: "Office Chair",
    confidence: "MEDIUM",
  },
  {
    local: "/BestHomz/assets/products/028-modern-work-desk.jpg",
    category: "Office Table",
    confidence: "MEDIUM",
  },
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractGalleryItems(html) {
  const regex =
    /assets\/images\/new\/prod\/([a-z-]+)\/(\d+)\.webp/gi;
  const seen = new Set();
  const items = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const folder = match[1];
    const num = match[2];
    if (folder === "bread") continue;
    const key = `${folder}/${num}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (!CATEGORY_MAP[folder]) continue;
    items.push({ folder, num: Number(num), relPath: `assets/images/new/prod/${folder}/${num}.webp` });
  }
  return items.sort((a, b) =>
    a.folder.localeCompare(b.folder) || a.num - b.num,
  );
}

function extractCategoryImageMeta(html, folder) {
  const meta = {};
  const imgRegex = new RegExp(
    `src="assets/images/new/prod/${folder}/(\\d+)\\.webp"[^>]*(?:alt="([^"]*)")?[^>]*(?:title="([^"]*)")?`,
    "gi",
  );
  let m;
  while ((m = imgRegex.exec(html)) !== null) {
    const n = Number(m[1]);
    const alt = (m[2] || "").trim();
    const title = (m[3] || "").trim();
    meta[n] = { alt, title };
  }
  return meta;
}

function extractCategoryIntro(html) {
  const h2 = html.match(/<h2[^>]*>([^<]+)<\/h2>/i);
  const p = html.match(/<h2[^>]*>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
  const text = p
    ? p[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
    : "";
  return { heading: h2 ? h2[1].trim() : null, intro: text.slice(0, 500) || null };
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "BestHomzCatalogBot/1.0 (+local-dev)" },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

async function downloadFile(url, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const res = await fetch(url, {
    headers: { "User-Agent": "BestHomzCatalogBot/1.0 (+local-dev)" },
  });
  if (!res.ok) throw new Error(`Download failed ${url} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf;
}

function fileMeta(filePath) {
  const buf = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha256").update(buf).digest("hex");
  return { size: buf.length, sha256: hash };
}

async function main() {
  const galleryPath = path.join(DATA_DIR, "_tmp_gallery.html");
  let galleryHtml;
  if (fs.existsSync(galleryPath)) {
    galleryHtml = fs.readFileSync(galleryPath, "utf8");
  } else {
    galleryHtml = await fetchText(`${BASE_URL}/gallery.php`);
    fs.writeFileSync(galleryPath, galleryHtml);
  }

  const galleryItems = extractGalleryItems(galleryHtml);
  const categoryIntros = {};
  const categoryImageMeta = {};

  for (const [folder, page] of Object.entries(CATEGORY_PAGES)) {
    const url = `${BASE_URL}/${page}`;
    try {
      const html = await fetchText(url);
      categoryIntros[folder] = extractCategoryIntro(html);
      categoryImageMeta[folder] = extractCategoryImageMeta(html, folder);
      await new Promise((r) => setTimeout(r, 400));
    } catch (e) {
      console.warn(`Category page fetch failed: ${folder}`, e.message);
      categoryIntros[folder] = { heading: null, intro: null };
      categoryImageMeta[folder] = {};
    }
  }

  const products = [];
  const imageMapEntries = [];
  const sourceMapEntries = [];
  const downloaded = [];
  const hashSeen = new Map();
  let duplicatesIgnored = 0;

  for (const item of galleryItems) {
    const cat = CATEGORY_MAP[item.folder];
    const meta = categoryImageMeta[item.folder]?.[item.num] || {};
    const title = meta.title || meta.alt || "";
    const slug = slugify(`${item.folder}-design-${item.num}`);
    const displayName = displayNameForProduct({ slug, category: cat.name });
    const sourceUrl = `${BASE_URL}/${CATEGORY_PAGES[item.folder]}`;
    const remoteUrl = `${BASE_URL}/${item.relPath}`;
    const localFile = `${item.folder}-design-${String(item.num).padStart(2, "0")}.webp`;
    const localPublicPath = `/BestHomz/products/${item.folder}/${localFile}`;
    const dest = path.join(PUBLIC_PRODUCTS, item.folder, localFile);

    let imageMeta = null;
    if (!fs.existsSync(dest)) {
      try {
        const buf = await downloadFile(remoteUrl, dest);
        const hash = crypto.createHash("sha256").update(buf).digest("hex");
        imageMeta = { size: buf.length, sha256: hash, source: remoteUrl };
        downloaded.push(localPublicPath);
      } catch (e) {
        console.warn(`Skip download ${remoteUrl}:`, e.message);
        continue;
      }
    } else {
      imageMeta = { ...fileMeta(dest), source: remoteUrl };
    }

    if (hashSeen.has(imageMeta.sha256)) {
      duplicatesIgnored += 1;
    } else {
      hashSeen.set(imageMeta.sha256, localPublicPath);
    }

    const intro = categoryIntros[item.folder]?.intro;

    products.push({
      name: displayName,
      slug,
      description: intro,
      short_description: intro ? intro.slice(0, 160) + (intro.length > 160 ? "…" : "") : null,
      category: cat.name,
      subcategory: null,
      source_url: sourceUrl,
      source_gallery_image: `${BASE_URL}/gallery.php`,
      images: [
        {
          image_url: localPublicPath,
          remote_url: remoteUrl,
          image_type: "primary",
          is_primary: true,
          sort_order: 1,
          width: null,
          height: null,
          format: "webp",
          file_size: imageMeta.size,
          sha256: imageMeta.sha256,
        },
      ],
      materials: [],
      colours: [],
      variants: [],
      specifications: [],
      features: [],
      is_featured: item.num === 1,
      is_new: false,
      is_bestseller: false,
      is_customizable: true,
      is_quote_enabled: true,
      status: "active",
      mapping_confidence: "HIGH",
      source_status: "verified_gallery_folder",
    });

    imageMapEntries.push({
      product: displayName,
      slug,
      category: cat.name,
      source: sourceUrl,
      images: [localPublicPath, `(remote) ${remoteUrl}`],
      confidence: "HIGH",
      notes: `Gallery folder assets/images/new/prod/${item.folder}/${item.num}.webp`,
    });

    sourceMapEntries.push({
      product: displayName,
      slug,
      source_url: sourceUrl,
      source_title: categoryIntros[item.folder]?.heading,
      category: cat.name,
      local_assets: [localPublicPath],
      image_source: remoteUrl,
      imported_fields: ["name", "slug", "category", "images", "description (category intro)"],
      missing_fields: ["sku", "dimensions", "materials", "colours", "per-product specifications"],
      confidence: "HIGH",
      notes: "No per-SKU PDP on source site; category gallery image treated as catalog line.",
    });

    await new Promise((r) => setTimeout(r, 150));
  }

  const inventoryPath = path.join(DATA_DIR, "catalog-inventory.json");
  const importPath = path.join(DATA_DIR, "products-import.json");

  const enriched = products.map(enrichImportProduct);

  fs.writeFileSync(
    inventoryPath,
    JSON.stringify({ generated_at: new Date().toISOString(), products: enriched, local_hints: LOCAL_ASSET_HINTS }, null, 2),
  );
  fs.writeFileSync(importPath, JSON.stringify(enriched, null, 2));

  const stats = {
    discovered: galleryItems.length,
    verified: products.length,
    downloaded: downloaded.length,
    duplicatesIgnored,
    localHints: LOCAL_ASSET_HINTS.length,
  };
  fs.writeFileSync(path.join(DATA_DIR, "phase5-stats.json"), JSON.stringify(stats, null, 2));

  // Markdown docs
  writeImageMapDoc(imageMapEntries, LOCAL_ASSET_HINTS);
  writeSourceMapDoc(sourceMapEntries);

  console.log(JSON.stringify(stats, null, 2));
}

function writeImageMapDoc(entries, localHints) {
  let md = `# Best Homz Product Image Map\n\nPhase 5 — gallery + local asset reconciliation.\n\n`;
  for (const e of entries) {
    md += `## ${e.product}\n\n`;
    md += `- **Slug:** ${e.slug}\n`;
    md += `- **Category:** ${e.category}\n`;
    md += `- **Source:** ${e.source}\n`;
    md += `- **Confidence:** ${e.confidence}\n`;
    md += `- **Images:**\n`;
    for (const img of e.images) md += `  - ${img}\n`;
    md += `- **Notes:** ${e.notes}\n\n`;
  }
  md += `## Local assets (not auto-linked to single gallery SKU)\n\n`;
  for (const h of localHints) {
    md += `### ${h.local}\n\n- **Category:** ${h.category}\n- **Confidence:** ${h.confidence}\n`;
    if (h.note) md += `- **Notes:** ${h.note}\n`;
    md += `\n`;
  }
  fs.writeFileSync(path.join(ROOT, "docs", "besthomz-product-image-map.md"), md);
}

function writeSourceMapDoc(entries) {
  let md = `# Best Homz Product Source Map\n\n`;
  for (const e of entries) {
    md += `## ${e.product}\n\n`;
    md += `| Field | Value |\n|---|---|\n`;
    md += `| Slug | ${e.slug} |\n`;
    md += `| Source URL | ${e.source_url} |\n`;
    md += `| Source title | ${e.source_title || "—"} |\n`;
    md += `| Category | ${e.category} |\n`;
    md += `| Local asset(s) | ${e.local_assets.join(", ")} |\n`;
    md += `| Image source | ${e.image_source} |\n`;
    md += `| Imported fields | ${e.imported_fields.join(", ")} |\n`;
    md += `| Missing fields | ${e.missing_fields.join(", ")} |\n`;
    md += `| Confidence | ${e.confidence} |\n`;
    md += `| Notes | ${e.notes} |\n\n`;
  }
  fs.writeFileSync(path.join(ROOT, "docs", "besthomz-product-source-map.md"), md);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
