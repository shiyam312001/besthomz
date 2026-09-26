export function pickPrimaryImage(product) {
  const images = product?.product_images || product?.images || [];
  if (!images.length) return null;
  const sorted = [...images].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });
  const primary = sorted[0];
  return primary?.image_url || primary?.image_url;
}

function homeSpecLine(product, categoryName) {
  if (product.material_summary?.trim()) {
    const parts = product.material_summary.split("|").map((s) => s.trim()).filter(Boolean);
    return parts.slice(0, 2).join(" | ");
  }
  const name = product.name || "";
  const seater = name.match(/\d+\s*Seater/i);
  const material = name.match(/\b(Solid Wood|Wooden|Engineered Wood|Fabric|Leather|Upholstered)\b/i);
  if (seater && material) return `${seater[0]} | ${material[0]}`;
  if (seater) return `${seater[0]} | ${categoryName || "Premium"}`;
  const short = name.split(/\s+/).slice(0, 4).join(" ");
  return short || categoryName || "";
}

export function mapProductForCard(product) {
  const categoryName =
    product.categories?.name || product.category || product.category_name || "";
  const image = pickPrimaryImage(product);
  let badge;
  if (product.is_new) badge = "new";
  else if (product.is_bestseller) badge = "bestseller";
  else if (product.is_featured) badge = "featured";

  return {
    id: product.id || product.slug,
    slug: product.slug,
    name: product.name,
    category: categoryName,
    description: product.short_description,
    specLine: homeSpecLine(product, categoryName),
    image: image || "/BestHomz/Homepage/categories/07-category-sofa.png",
    href: `/product/${product.slug}`,
    badge,
    is_customizable: product.is_customizable,
    colors: ["#5C6B4A", "#D4C4A8", "#B8B8B8"],
  };
}

export function sortProducts(products, sortKey) {
  const list = [...products];
  switch (sortKey) {
    case "name":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
      return list.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    default:
      return list;
  }
}
