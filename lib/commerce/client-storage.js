"use client";

const WISHLIST_KEY = "bh_wishlist_slugs";
const RECENT_KEY = "bh_recent_products";
const COMPARE_KEY = "bh_compare_products";
const MAX_RECENT = 10;
const MAX_COMPARE = 4;

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota */
  }
}

export function getGuestWishlistSlugs() {
  return readJson(WISHLIST_KEY, []);
}

export function setGuestWishlistSlugs(slugs) {
  writeJson(WISHLIST_KEY, slugs);
}

export function toggleGuestWishlistSlug(slug) {
  const list = getGuestWishlistSlugs();
  const idx = list.indexOf(slug);
  if (idx >= 0) list.splice(idx, 1);
  else list.push(slug);
  setGuestWishlistSlugs(list);
  return list;
}

export function getRecentProducts() {
  return readJson(RECENT_KEY, []);
}

export function pushRecentProduct(product) {
  if (!product?.slug) return;
  const list = getRecentProducts().filter((p) => p.slug !== product.slug);
  list.unshift({
    slug: product.slug,
    name: product.name,
    image: product.image,
    category: product.category,
  });
  writeJson(RECENT_KEY, list.slice(0, MAX_RECENT));
}

export function getCompareProducts() {
  return readJson(COMPARE_KEY, []);
}

export function addCompareProduct(product) {
  if (!product?.slug) return getCompareProducts();
  const list = getCompareProducts().filter((p) => p.slug !== product.slug);
  list.unshift(product);
  writeJson(COMPARE_KEY, list.slice(0, MAX_COMPARE));
  return readJson(COMPARE_KEY, []);
}

export function removeCompareProduct(slug) {
  const list = getCompareProducts().filter((p) => p.slug !== slug);
  writeJson(COMPARE_KEY, list);
  return list;
}

export function clearGuestWishlist() {
  localStorage.removeItem(WISHLIST_KEY);
}

export function pruneRecentProducts(validSlugs) {
  const set = new Set(validSlugs);
  const list = getRecentProducts().filter((p) => set.has(p.slug));
  writeJson(RECENT_KEY, list);
  return list;
}
