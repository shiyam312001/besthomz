import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const DATA_FILE = path.join(ROOT, "data", "products-import.json");
const THUMBNAIL_DIR = path.join(PUBLIC_DIR, "BestHomz", "product-thumbnails");
const MANIFEST_FILE = path.join(ROOT, "data", "product-card-thumbnails.json");
const WIDTH = 720;
const HEIGHT = 480;
const OUTPUT_PREFIX = "/BestHomz/product-thumbnails";
const WORKER_COUNT = 4;

const args = process.argv.slice(2);
const slugArg = args.find((arg) => arg.startsWith("--slug="));
const requestedSlug = slugArg?.slice("--slug=".length);
const products = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
const selectedProducts = requestedSlug
  ? products.filter((product) => product.slug === requestedSlug)
  : products;

if (requestedSlug && selectedProducts.length !== 1) {
  throw new Error(`Expected one product with slug "${requestedSlug}".`);
}

const slugCounts = new Map();
for (const product of products) {
  if (!/^[a-z0-9-]+$/.test(product.slug || "")) {
    throw new Error(`Product has an invalid thumbnail slug: ${product.slug}`);
  }
  slugCounts.set(product.slug, (slugCounts.get(product.slug) || 0) + 1);
}
const duplicateSlug = [...slugCounts].find(([, count]) => count > 1);
if (duplicateSlug) {
  throw new Error(`Duplicate product slug prevents unique thumbnails: ${duplicateSlug[0]}`);
}

let manifest = {};
if (requestedSlug) {
  try {
    manifest = JSON.parse(await fs.readFile(MANIFEST_FILE, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

await fs.mkdir(THUMBNAIL_DIR, { recursive: true });

let nextIndex = 0;
let totalBytes = 0;

async function generateThumbnail(product) {
  const primaryImage =
    product.images?.find((image) => image?.is_primary && image.image_url) ||
    product.images?.find((image) => image?.image_url);
  const imageUrl = primaryImage?.image_url || primaryImage?.remote_url;
  if (!imageUrl?.startsWith("/")) {
    throw new Error(`Product ${product.slug} has no local primary image.`);
  }

  const sourcePath = path.resolve(
    PUBLIC_DIR,
    decodeURIComponent(imageUrl.replace(/^\/+/, "")).split("/").join(path.sep),
  );
  const relativeSourcePath = path.relative(PUBLIC_DIR, sourcePath);
  if (relativeSourcePath.startsWith("..") || path.isAbsolute(relativeSourcePath)) {
    throw new Error(`Product ${product.slug} image path is outside public/.`);
  }
  await fs.access(sourcePath);

  const background = await sharp(sourcePath)
    .rotate()
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
    .blur(18)
    .modulate({ saturation: 0.6, brightness: 0.96 })
    .png()
    .toBuffer();

  const foreground = await sharp(sourcePath)
    .rotate()
    .resize(WIDTH - 48, HEIGHT - 32, { fit: "inside" })
    .png()
    .toBuffer();

  const foregroundCanvas = await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: foreground, gravity: "center" }])
    .png()
    .toBuffer();

  const outputPath = path.join(THUMBNAIL_DIR, `${product.slug}.webp`);
  await sharp(background)
    .composite([{ input: foregroundCanvas }])
    .webp({ quality: 84, effort: 5 })
    .toFile(outputPath);

  const metadata = await sharp(outputPath).metadata();
  if (metadata.width !== WIDTH || metadata.height !== HEIGHT) {
    throw new Error(`Generated thumbnail has an unexpected size for ${product.slug}.`);
  }

  manifest[product.slug] = `${OUTPUT_PREFIX}/${product.slug}.webp`;
  totalBytes += (await fs.stat(outputPath)).size;
}

async function worker() {
  while (nextIndex < selectedProducts.length) {
    const product = selectedProducts[nextIndex];
    nextIndex += 1;
    await generateThumbnail(product);
  }
}

await Promise.all(
  Array.from(
    { length: Math.min(WORKER_COUNT, selectedProducts.length) },
    () => worker(),
  ),
);

await fs.writeFile(MANIFEST_FILE, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      generated: selectedProducts.length,
      width: WIDTH,
      height: HEIGHT,
      totalMegabytes: Number((totalBytes / (1024 * 1024)).toFixed(2)),
      manifest: path.relative(ROOT, MANIFEST_FILE),
    },
    null,
    2,
  ),
);
