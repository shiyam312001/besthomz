/**
 * Map HTC BestHomz products from public/Products (+ optional CSV overlay).
 * Does not invent dimensions, materials, warranty, or colours.
 *
 * Run: node scripts/map-htc-catalog.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRODUCTS_DIR = path.join(ROOT, "public", "Products");
const CSV_CANDIDATES = [
  path.join(ROOT, "HTC_BestHomz_Product_Catalog_Details.csv"),
  path.join(ROOT, "data", "HTC_BestHomz_Product_Catalog_Details.csv"),
];
const IMAGE_EXT = new Set([".webp", ".jpg", ".jpeg", ".png", ".gif", ".avif"]);

function fileHash(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function deduplicateProductImages(product) {
  const seenHashes = new Set();
  const unique = [];
  for (const img of product.images || []) {
    const relative = decodeURIComponent(String(img.original_path || img.image_url || "")
      .replace(/^\/Products\//, "")
      .replace(/^\//, ""));
    const imagePath = path.resolve(PRODUCTS_DIR, ...relative.split(/[\\/]+/));
    let hash;
    if (fs.existsSync(imagePath) && fs.statSync(imagePath).isFile()) {
      hash = fileHash(imagePath);
    } else {
      hash = String(img.image_url || img.original_path || "");
    }
    if (seenHashes.has(hash)) continue;
    seenHashes.add(hash);
    unique.push({
      ...img,
      image_type: unique.length === 0 ? "primary" : "gallery",
      is_primary: unique.length === 0,
      sort_order: unique.length + 1,
    });
  }
  product.images = unique;
}

function slugify(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function categorySlug(folderName) {
  const map = {
    "AVALON MATTRESS": "avalon-mattress",
    "BAR CHAIR": "bar-chairs",
    "BAR CHAIRS": "bar-chairs",
    "BED 5FT": "beds-5ft",
    "BED 6FT": "beds-6ft",
    "BED ROOM SET": "bedroom-sets",
    "BOOK SHELF": "bookshelves",
    "COAT HANGER": "coat-hangers",
    "COFFEE TABLE": "coffee-tables",
    CONSOLE: "consoles",
    "DINING CHAIR": "dining-chairs",
    DRESSER: "dressers",
    DS4: "dining-sets-4-seater",
    DS6: "dining-sets-6-seater",
    DS8: "dining-sets-8-seater",
    "MASSAGER CHAIR": "massager-chairs",
    "OFFICE CHAIR": "office-chairs",
    "OFFICE TABLE": "office-tables",
    OTHERS: "others",
    OUTDOOR: "outdoor",
    "RECEPTION TABLE": "reception-tables",
    "SHOE RACK": "shoe-racks",
    "SIDE TABLE": "side-tables",
    SOFA: "sofas",
    SWING: "swings",
    TROLLY: "trolleys",
    "TV UNIT": "tv-units",
    "VISITOR CHAIR": "visitor-chairs",
    WARDROBE: "wardrobes",
  };
  const key = String(folderName || "").trim().replace(/_/g, " ").toUpperCase();
  return map[key] || slugify(folderName);
}

function parseCsv(text) {
  text = text.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell.trim());
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && next === "\n") i++;
      row.push(cell.trim());
      cell = "";
      if (row.some((c) => c)) rows.push(row);
      row = [];
    } else {
      cell += ch;
    }
  }
  if (cell || row.length) {
    row.push(cell.trim());
    if (row.some((c) => c)) rows.push(row);
  }
  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.toLowerCase().replace(/[^a-z0-9]+/g, "_"));
  return rows.slice(1).map((r) => {
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = r[idx] || "";
    });
    return obj;
  });
}

function loadCsvOverlay() {
  const found = CSV_CANDIDATES.find((p) => fs.existsSync(p));
  if (!found) return { path: null, rows: [] };
  const rows = parseCsv(fs.readFileSync(found, "utf8"));
  return { path: found, rows };
}

function normalizeSku(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

function normalizeFolderPath(value) {
  return String(value || "")
    .replace(/\\/g, "/")
    .replace(/^\/+|\/+$/g, "")
    .toUpperCase();
}

function categorySlugFromCsv(name) {
  const map = {
    "4-seater dining set": "dining-sets-4-seater",
    "6-seater dining set": "dining-sets-6-seater",
    "8-seater dining set": "dining-sets-8-seater",
    ds4: "dining-sets-4-seater",
    ds6: "dining-sets-6-seater",
    ds8: "dining-sets-8-seater",
    "avalon mattress": "avalon-mattress",
    "bar chair": "bar-chairs",
    "bed 5ft": "beds-5ft",
    "bed 6ft": "beds-6ft",
    "bed room set": "bedroom-sets",
    bookshelf: "bookshelves",
    "book shelf": "bookshelves",
    "coat hanger": "coat-hangers",
    "coffee table": "coffee-tables",
    console: "consoles",
    "dining chair": "dining-chairs",
    dresser: "dressers",
    "massager chair": "massager-chairs",
    mattress: "mattresses",
    "office chair": "office-chairs",
    "office table": "office-tables",
    others: "others",
    outdoor: "outdoor",
    "reception table": "reception-tables",
    "shoe rack": "shoe-racks",
    "side table": "side-tables",
    sofa: "sofas",
    swing: "swings",
    trolley: "trolleys",
    trolly: "trolleys",
    "tv unit": "tv-units",
    "visitor chair": "visitor-chairs",
    wardrobe: "wardrobes",
  };
  return map[String(name || "").trim().toLowerCase()] || slugify(name);
}

function categorySlugFromFolder(name) {
  const normalized = String(name || "").replace(/^_+Additional\s*/i, "");
  return categorySlug(normalized);
}

function parseProductFolder(folderName) {
  const extraGallery = /(?:_2|\(\d+\))$/i.test(folderName);
  const base = folderName.replace(/\(\d+\)$/i, "").replace(/_2$/i, "").trim();
  const reviews = [];

  if (/^image[_-]?\d+$/i.test(base) || base.startsWith("_")) {
    return { skip: true, reason: "unmatched_folder", extraGallery, reviews };
  }

  const commaMatch = base.match(/^(.*?)[\s-]+([\d,]{4,})$/);
  let namePart = base;
  let price = null;
  let priceUncertain = false;

  if (commaMatch) {
    namePart = commaMatch[1].trim().replace(/[-\s]+$/, "");
    const numeric = commaMatch[2].replace(/,/g, "");
    price = Number(numeric);
  } else {
    const letterTail = base.match(/^(.*?)[\s-]+(\d{3,7})([A-Za-z])$/);
    if (letterTail) {
      namePart = letterTail[1].trim();
      price = Number(letterTail[2]);
      priceUncertain = true;
      reviews.push("price_suffix_letter");
    } else {
      const normal = base.match(/^(.*?)[\s-]+(\d{3,7})$/);
      if (normal) {
        namePart = normal[1].trim();
        price = Number(normal[2]);
      } else {
        reviews.push("no_price_in_folder_name");
      }
    }
  }

  if (price != null && (!Number.isFinite(price) || price < 100)) {
    reviews.push("implausible_price");
    priceUncertain = true;
    price = null;
  }

  const sku = namePart.replace(/\s+/g, " ").trim() || base;
  const looksCoded = !/\s/.test(sku) || /^[A-Z0-9]+[-_]/.test(sku);
  const displayName = looksCoded ? sku : toTitle(sku);

  return {
    skip: false,
    extraGallery,
    sku,
    skuKey: sku.toUpperCase(),
    displayName,
    price,
    priceUncertain,
    reviews,
    folderName,
  };
}

function toTitle(value) {
  return value
    .toLowerCase()
    .replace(/\b([a-z])/g, (m) => m.toUpperCase())
    .replace(/\bTv\b/g, "TV");
}

function collectImages(absDir, publicPrefix) {
  if (!fs.existsSync(absDir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
    const abs = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectImages(abs, `${publicPrefix}/${entry.name}`));
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (!IMAGE_EXT.has(ext)) continue;
    const url = `${publicPrefix}/${entry.name}`.replace(/\\/g, "/");
    files.push({
      filename: entry.name,
      image_url: encodePath(url),
      original_path: url,
    });
  }
  files.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }));
  return files;
}

function encodePath(url) {
  return url
    .split("/")
    .map((part) => (part ? encodeURIComponent(part) : part))
    .join("/")
    .replace(/%2F/g, "/");
}

function applyCsv(product, csvRow) {
  if (!csvRow) return product;
  const name = csvRow.product_name || csvRow.name || csvRow.title;
  const description = csvRow.product_description || csvRow.description || csvRow.long_description;
  const short = csvRow.short_description || csvRow.summary;
  const seoTitle = csvRow.seo_title || csvRow.meta_title;
  const seoDescription = csvRow.seo_description || csvRow.meta_description;
  const csvPrice = Number(String(csvRow.price || csvRow.selling_price || csvRow.mrp || "").replace(/[^\d.]/g, ""));
  const confirmedValue = (value) => {
    const normalized = String(value || "").trim();
    return normalized && !/to be confirmed|unknown|not specified|^n\/a$|^-$|^$/i.test(normalized)
      ? normalized
      : null;
  };

  if (name) product.name = name;
  if (csvRow.category) {
    product.category = csvRow.category;
    product.category_slug = categorySlugFromCsv(csvRow.category);
  }
  if (short) product.short_description = short;
  if (description) product.description = description;
  if (seoTitle) product.seo_title = seoTitle;
  if (seoDescription) product.seo_description = seoDescription;
  if (Number.isFinite(csvPrice) && csvPrice > 0) {
    product.price = csvPrice;
    product.price_source = "csv";
  }
  product.currency = csvRow.currency || null;
  product.price_type = csvRow.price_type || null;
  product.price_uncertain = /confirm|verify/i.test(product.price_type || "");
  product.source_status = csvRow.product_status || null;
  product.brand = csvRow.brand || null;
  product.material_summary = confirmedValue(csvRow.material);
  product.dimensions = confirmedValue(csvRow.dimensions);
  product.warranty = confirmedValue(csvRow.warranty);
  product.colours = confirmedValue(csvRow.colour_finish)
    ? [confirmedValue(csvRow.colour_finish)]
    : [];
  product.features = confirmedValue(csvRow.key_features)
    ? [{ feature: confirmedValue(csvRow.key_features), description: null }]
    : [];
  product.csv_matched = true;
  return product;
}

function main() {
  if (!fs.existsSync(PRODUCTS_DIR)) {
    console.error("Missing public/Products");
    process.exit(1);
  }

  const csv = loadCsvOverlay();
  if (!csv.path) {
    throw new Error(
      "Product CSV not found. Place HTC_BestHomz_Product_Catalog_Details.csv in the project root or data folder.",
    );
  }

  const productsBySku = new Map();
  const productsByFolder = new Map();
  const unmatchedImages = [];
  const missingImages = [];
  const duplicateFolders = [];
  const manualReview = [];
  const skippedFolders = [];
  const foldersWithoutCsvSku = [];
  const duplicateCsvSkus = [];
  const ambiguousSourceFolders = [];
  let folderCount = 0;
  let imageFileCount = 0;
  const usedSlugs = new Set();

  for (const [rowIndex, row] of csv.rows.entries()) {
    const sku = (row.sku_product_code || "").trim();
    if (!sku) {
      manualReview.push({ sku: null, slug: null, flags: ["missing_csv_sku"], folders: [] });
      continue;
    }

    const skuKey = normalizeSku(sku);
    if (productsBySku.has(skuKey)) {
      duplicateCsvSkus.push(sku);
    }

    const category = row.category || "Uncategorized";
    let slug = slugify(`${categorySlugFromCsv(category)}-${sku}`) || slugify(sku);
    let suffix = 2;
    while (usedSlugs.has(slug)) {
      slug = `${slugify(`${categorySlugFromCsv(category)}-${sku}`)}-${suffix}`;
      suffix += 1;
    }
    usedSlugs.add(slug);

    const product = {
      name: row.product_name || sku,
      slug,
      sku,
      category,
      category_folder: null,
      category_slug: categorySlugFromCsv(category),
      source_folders: [],
      images: [],
      price: null,
      price_source: null,
      price_uncertain: false,
      csv_matched: true,
      mapping_confidence: "REVIEW",
      review_flags: [],
      seo_title: null,
      seo_description: null,
      short_description: null,
      description: null,
      currency: null,
      price_type: null,
      source_status: null,
      brand: null,
      material_summary: null,
      dimensions: null,
      warranty: null,
      colours: [],
      features: [],
      _image_source_paths: [
        row.original_filename,
        row.image_path,
        row.additional_image_1,
        row.additional_image_2,
        row.additional_image_3,
      ].filter(Boolean),
    };
    applyCsv(product, row);
    product._csv_row_index = rowIndex;

    const skuProducts = productsBySku.get(skuKey) || [];
    skuProducts.push(product);
    productsBySku.set(skuKey, skuProducts);

    for (const sourcePath of product._image_source_paths) {
      const cleanPath = String(sourcePath)
        .replace(/^public[\\/]+Products[\\/]+/i, "")
        .replace(/^\/?Products[\\/]+/i, "")
        .replace(/^[/\\]+/, "");
      const sourceFolder = path.join(path.dirname(cleanPath), path.parse(cleanPath).name);
      const folderKey = normalizeFolderPath(sourceFolder);
      const folderProducts = productsByFolder.get(folderKey) || [];
      if (!folderProducts.includes(product)) folderProducts.push(product);
      productsByFolder.set(folderKey, folderProducts);
    }
  }

  const duplicateSkuCounts = new Map();
  for (const product of [...productsBySku.values()].flat()) {
    if (!product.sku) continue;
    const skuKey = normalizeSku(product.sku);
    duplicateSkuCounts.set(skuKey, (duplicateSkuCounts.get(skuKey) || 0) + 1);
  }
  for (const [skuKey, productRows] of productsBySku.entries()) {
    if (duplicateSkuCounts.get(skuKey) <= 1) continue;
    for (const product of productRows) {
      const price = Number(product.price);
      const variantLabel = Number.isFinite(price) && price > 0
        ? `₹${price.toLocaleString("en-IN")}`
        : "Variant";
      product.name = `${product.name} - ${variantLabel}`;
    }
  }

  const categoryDirs = fs
    .readdirSync(PRODUCTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "__pycache__");

  for (const catDir of categoryDirs) {
    const categoryFolder = catDir.name;
    const catAbs = path.join(PRODUCTS_DIR, categoryFolder);

    for (const prodDir of fs.readdirSync(catAbs, { withFileTypes: true })) {
      if (!prodDir.isDirectory()) continue;
      folderCount += 1;
      const parsed = parseProductFolder(prodDir.name);
      const publicPrefix = `/Products/${categoryFolder}/${prodDir.name}`;
      const images = collectImages(path.join(catAbs, prodDir.name), publicPrefix);
      imageFileCount += images.length;

      const folderPath = `${categoryFolder}/${prodDir.name}`;
      const exactProducts = productsByFolder.get(normalizeFolderPath(folderPath)) || [];
      const numberedCopyPath = folderPath.replace(/\(\d+\)$/, "");
      const numberedCopyProducts = /\(\d+\)$/.test(folderPath)
        ? productsByFolder.get(normalizeFolderPath(numberedCopyPath)) || []
        : [];
      let matchedProducts = exactProducts.length ? exactProducts : numberedCopyProducts;

      if (!matchedProducts.length && !parsed.skip) {
        const skuProducts = productsBySku.get(normalizeSku(parsed.sku)) || [];
        if (skuProducts.length === 1) matchedProducts = skuProducts;
        else if (skuProducts.length > 1) {
          ambiguousSourceFolders.push(folderPath);
          for (const product of skuProducts) {
            product.review_flags.push("duplicate_sku_without_exact_filename_match");
          }
        }
      }

      if (!matchedProducts.length && parsed.skip) {
        skippedFolders.push(`${categoryFolder}/${prodDir.name}`);
        if (images.length) {
          unmatchedImages.push({
            folder: `${categoryFolder}/${prodDir.name}`,
            images: images.map((i) => i.original_path),
          });
        }
        continue;
      }

      if (!matchedProducts.length) {
        if (!parsed.skip) foldersWithoutCsvSku.push(folderPath);
        continue;
      }

      for (const product of matchedProducts) {
        if (product.category_slug !== categorySlugFromFolder(categoryFolder)) {
          product.review_flags.push("sku_folder_category_conflict");
          product.mapping_confidence = "REVIEW";
          continue;
        }

        if (product.source_folders.length) {
          duplicateFolders.push({
            sku: product.sku,
            folder: folderPath,
            existing: product.source_folders[0],
          });
          if (parsed.extraGallery) {
            product.review_flags.push("merged_extra_gallery_folder");
          } else {
            product.review_flags.push("duplicate_folder_merged_by_sku");
          }
        }

        product.source_folders.push(folderPath);
        if (!product.category_folder) product.category_folder = categoryFolder;
        product.review_flags.push(...parsed.reviews);
        for (const img of images) {
          product.images.push({
            ...img,
            image_type: product.images.length === 0 ? "primary" : "gallery",
            is_primary: product.images.length === 0,
            sort_order: product.images.length + 1,
          });
        }
      }
    }
  }

  const products = [];
  for (const skuProducts of productsBySku.values()) {
    for (const product of skuProducts) {
      product.review_flags = [...new Set(product.review_flags)];
      deduplicateProductImages(product);
      if (!product.images.length) {
        for (const sourcePath of product._image_source_paths) {
          const relative = String(sourcePath)
            .replace(/^public[\\/]+Products[\\/]+/i, "")
            .replace(/^Products[\\/]+/i, "")
            .replace(/^[/\\]+/, "");
          const imagePath = path.resolve(PRODUCTS_DIR, ...relative.split(/[\\/]+/));
          if (
            !imagePath.startsWith(`${PRODUCTS_DIR}${path.sep}`) ||
            product.category_slug !== categorySlugFromFolder(relative.split(/[\\/]+/)[0]) ||
            !fs.existsSync(imagePath) ||
            !fs.statSync(imagePath).isFile() ||
            !IMAGE_EXT.has(path.extname(imagePath).toLowerCase()) ||
            !normalizeSku(relative).includes(normalizeSku(product.sku))
          ) {
            continue;
          }

          const publicPath = `/Products/${relative.split(/[\\/]+/).map(encodeURIComponent).join("/")}`;
          product.images.push({
            filename: path.basename(imagePath),
            image_url: publicPath,
            original_path: `/Products/${relative.replace(/\\/g, "/")}`,
            image_type: product.images.length === 0 ? "primary" : "gallery",
            is_primary: product.images.length === 0,
            sort_order: product.images.length + 1,
          });
        }
      }

      if (!product.images.length) {
        missingImages.push({ sku: product.sku, name: product.name, folders: product.source_folders });
        product.mapping_confidence = "REVIEW";
        product.review_flags.push("missing_images");
      } else if (
        product.review_flags.includes("sku_folder_category_conflict") ||
        product.review_flags.includes("duplicate_sku_without_exact_filename_match")
      ) {
        product.mapping_confidence = "REVIEW";
      } else {
        product.mapping_confidence = "HIGH";
      }
      if (!product.short_description) {
        product.short_description = `${product.category} · SKU ${product.sku}. Specifications available on request.`;
      }
      if (!product.description) {
        product.description = `${product.name} is listed in the Best Homz ${product.category} collection (SKU ${product.sku}). Dimensions, materials, colours, and warranty are confirmed with our team at quotation or checkout — they are not assumed from the filename.`;
      }
      if (!product.seo_title) product.seo_title = `${product.name} | ${product.category} | Best Homz`;
      if (!product.seo_description) {
        product.seo_description = product.short_description.slice(0, 160);
      }
      if (product.mapping_confidence === "REVIEW") {
        manualReview.push({
          sku: product.sku,
          slug: product.slug,
          flags: product.review_flags,
          folders: product.source_folders,
        });
      }
      deduplicateProductImages(product);
      delete product._image_source_paths;
      delete product._csv_row_index;
      products.push({
        ...product,
        subcategory: null,
        status: "active",
        is_featured: false,
        is_new: false,
        is_bestseller: false,
        is_customizable: true,
        is_quote_enabled: true,
        warranty: product.warranty,
        care_instructions: null,
        dimensions: product.dimensions,
        material_summary: product.material_summary,
        specifications: [{ specification_name: "SKU", specification_value: product.sku }],
        features: product.features,
        variants: [],
        materials: product.material_summary ? [product.material_summary] : [],
      });
    }
  }

  products.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

  const categories = [...new Map(products.map((p) => [p.category_slug, {
    name: p.category,
    slug: p.category_slug,
    folder: p.category_folder,
    product_count: products.filter((x) => x.category_slug === p.category_slug).length,
  }])).values()];

  const mappedWithImages = products.filter((p) => p.images.length > 0).length;
  const mappedCsvSkus = products.filter((p) => p.source_folders.length > 0).length;
  const report = {
    generated_at: new Date().toISOString(),
    csv_path: csv.path,
    csv_rows: csv.rows.length,
    csv_sku_matches: mappedCsvSkus,
    duplicate_csv_skus: duplicateCsvSkus,
    duplicate_csv_sku_count: duplicateCsvSkus.length,
    unmatched_product_folders: foldersWithoutCsvSku.length,
    total_category_folders: categoryDirs.length,
    total_product_folders: folderCount,
    total_products: products.length,
    successfully_mapped_products: mappedWithImages,
    missing_images: missingImages.length,
    duplicate_image_mappings: duplicateFolders.length,
    ambiguous_image_folders: ambiguousSourceFolders,
    unmatched_image_folders: unmatchedImages.length,
    products_requiring_manual_review: manualReview.length,
    image_files_scanned: imageFileCount,
    notes: [
      "The CSV is the catalog source of truth; products absent from it are excluded.",
      "Images map first by the CSV original filename's exact product folder, then by a unique normalized SKU.",
      "Unmatched or ambiguous products are kept without guessed images and listed for manual review.",
      "Dimensions, material, warranty, and colour are not invented.",
      "Image_* and _Other Generated folders are excluded unless the CSV filename identifies them exactly.",
      "*_2 and numbered duplicate folders merge only when their CSV filename or unique SKU mapping identifies the same product.",
    ],
    missing_images: missingImages,
    duplicate_image_mappings: duplicateFolders,
    unmatched_images: unmatchedImages,
    manual_review: manualReview,
    skipped_folders: skippedFolders,
    categories,
  };

  fs.mkdirSync(path.join(ROOT, "data"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "data", "htc-catalog.json"), JSON.stringify(products, null, 2));
  fs.writeFileSync(path.join(ROOT, "data", "products-import.json"), JSON.stringify(products, null, 2));
  fs.writeFileSync(path.join(ROOT, "data", "htc-image-mapping-report.json"), JSON.stringify(report, null, 2));

  const md = [
    "# HTC BestHomz product / image mapping report",
    "",
    `Generated: ${report.generated_at}`,
    "",
    "## Summary",
    "",
    `| Metric | Count |`,
    `| --- | ---: |`,
    `| Total products | ${report.total_products} |`,
    `| CSV rows | ${report.csv_rows} |`,
    `| CSV products mapped to image folders | ${report.csv_sku_matches} |`,
    `| Successfully mapped (has images) | ${report.successfully_mapped_products} |`,
    `| Missing images | ${report.missing_images.length} |`,
    `| Duplicate folder mappings | ${report.duplicate_image_mappings.length} |`,
    `| Ambiguous image folders | ${report.ambiguous_image_folders.length} |`,
    `| Unmatched image folders | ${report.unmatched_images.length} |`,
    `| Products requiring manual review | ${report.products_requiring_manual_review} |`,
    `| Image files scanned | ${report.image_files_scanned} |`,
    `| CSV file | ${csv.path ? path.basename(csv.path) : "not found"} |`,
    `| CSV SKU matches | ${report.csv_sku_matches} |`,
    `| Duplicate SKU rows (retained) | ${report.duplicate_csv_sku_count} |`,
    `| Product folders without a CSV SKU | ${report.unmatched_product_folders} |`,
    "",
    "## Notes",
    "",
    ...report.notes.map((n) => `- ${n}`),
    "",
    "## Categories",
    "",
    ...categories.map((c) => `- ${c.name} (\`${c.slug}\`) — ${c.product_count} products`),
    "",
    "## Manual review",
    "",
    ...(manualReview.length
      ? manualReview.map((p) => `- **${p.sku}** (\`${p.slug}\`) — ${p.flags.join(", ")}`)
      : ["- None"]),
    "",
    "## Unmatched image folders",
    "",
    ...(unmatchedImages.length
      ? unmatchedImages.map((u) => `- \`${u.folder}\` (${u.images.length} files)`)
      : ["- None"]),
    "",
    "## Product folders excluded because their SKU is not in the CSV",
    "",
    ...(foldersWithoutCsvSku.length
      ? foldersWithoutCsvSku.map((folder) => `- \`${folder}\``)
      : ["- None"]),
    "",
  ].join("\n");

  fs.mkdirSync(path.join(ROOT, "docs"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "docs", "htc-image-mapping-report.md"), md);

  console.log(`Products: ${products.length}`);
  console.log(`Mapped with images: ${mappedWithImages}`);
  console.log(`Manual review: ${manualReview.length}`);
  console.log(`CSV: ${csv.path || "not found"}`);
}

main();
