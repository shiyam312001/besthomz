const CATEGORY_DETAILS = [
  {
    key: "mattress",
    title: "Mattress Details",
    fields: [
      { label: "Comfort", keys: ["Comfort", "Support", "Mattress Type"] },
      { label: "Dimensions", keys: ["Mattress Dimensions", "Dimensions", "Dimensions (approx.)"], property: "dimensions" },
      { label: "Materials", keys: ["Materials", "Material"], property: "material_summary" },
      { label: "Warranty", keys: ["Warranty"], property: "warranty" },
    ],
  },
  {
    key: "sofa",
    title: "Sofa Details",
    fields: [
      { label: "Configuration", keys: ["Configuration", "Seating Capacity", "Seating / Size"] },
      { label: "Upholstery & Frame", keys: ["Upholstery", "Frame Material", "Material"], property: "material_summary" },
      { label: "Dimensions", keys: ["Dimensions", "Dimensions (approx.)"], property: "dimensions" },
      { label: "Care", keys: ["Care Instructions"], property: "care_instructions" },
    ],
  },
  {
    key: "bed",
    title: "Bed Details",
    fields: [
      { label: "Dimensions", keys: ["Bed Dimensions", "Dimensions", "Dimensions (approx.)"], property: "dimensions" },
      { label: "Frame Material", keys: ["Frame Material", "Material"], property: "material_summary" },
      { label: "Storage", keys: ["Storage", "Storage Type"] },
      { label: "Warranty", keys: ["Warranty"], property: "warranty" },
    ],
  },
  {
    key: "dining-table",
    title: "Dining Table Details",
    fields: [
      { label: "Seating Capacity", keys: ["Seating Capacity", "Seating / Size", "Seats"] },
      { label: "Dimensions", keys: ["Dimensions", "Dimensions (approx.)"], property: "dimensions" },
      { label: "Material", keys: ["Material"], property: "material_summary" },
      { label: "Shape & Finish", keys: ["Shape", "Finish"] },
    ],
  },
  {
    key: "dining-chair",
    title: "Dining Chair Details",
    fields: [
      { label: "Upholstery", keys: ["Upholstery"] },
      { label: "Material", keys: ["Material"], property: "material_summary" },
      { label: "Dimensions", keys: ["Dimensions", "Dimensions (approx.)"], property: "dimensions" },
      { label: "Care", keys: ["Care Instructions"], property: "care_instructions" },
    ],
  },
  {
    key: "dressing-table",
    title: "Dressing Table Details",
    fields: [
      { label: "Storage", keys: ["Storage", "Storage Type"] },
      { label: "Mirror", keys: ["Mirror", "Mirror Type"] },
      { label: "Dimensions", keys: ["Dimensions", "Dimensions (approx.)"], property: "dimensions" },
      { label: "Material", keys: ["Material"], property: "material_summary" },
    ],
  },
  {
    key: "office-chair",
    title: "Office Chair Details",
    fields: [
      { label: "Adjustability", keys: ["Adjustability", "Ergonomic Features"] },
      { label: "Material", keys: ["Material"], property: "material_summary" },
      { label: "Dimensions", keys: ["Dimensions", "Dimensions (approx.)"], property: "dimensions" },
      { label: "Warranty", keys: ["Warranty"], property: "warranty" },
    ],
  },
  {
    key: "office-table",
    title: "Office Table Details",
    fields: [
      { label: "Workspace", keys: ["Workspace", "Table Type"] },
      { label: "Storage", keys: ["Storage", "Storage Type"] },
      { label: "Dimensions", keys: ["Dimensions", "Dimensions (approx.)"], property: "dimensions" },
      { label: "Material", keys: ["Material"], property: "material_summary" },
    ],
  },
];

function normalizeDetailText(value) {
  return String(value ?? "").trim();
}

function normalizeDetailKey(value) {
  return String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findSpecification(specifications, keys) {
  const wanted = new Set(keys.map(normalizeDetailKey));
  const match = specifications.find((item) =>
    wanted.has(normalizeDetailKey(item?.specification_name)),
  );
  return normalizeDetailText(match?.specification_value);
}

function findCategory(category) {
  const text = `${category?.slug || ""} ${category?.name || ""}`.toLowerCase();
  return (
    CATEGORY_DETAILS.find(({ key }) =>
      key.split("-").every((part) => text.includes(part)),
    ) || null
  );
}

export function getProductCategoryDetails(product, category = product?.categories) {
  const specifications = product?.product_specifications || [];
  const categoryName = normalizeDetailText(
    category?.name || product?.category_name || product?.category,
  );
  const categoryDetails = findCategory(category) || {
    title: categoryName ? `${categoryName} Details` : "Product Details",
    fields: [
      { label: "Dimensions", keys: ["Dimensions", "Dimensions (approx.)"], property: "dimensions" },
      { label: "Material", keys: ["Material"], property: "material_summary" },
      { label: "Warranty", keys: ["Warranty"], property: "warranty" },
      { label: "Care", keys: ["Care Instructions"], property: "care_instructions" },
    ],
  };
  const rows = [];

  if (categoryName) rows.push({ label: "Product Type", value: categoryName });

  const model = normalizeDetailText(
    product?.sku || findSpecification(specifications, ["Model", "SKU"]),
  );
  if (model) rows.push({ label: "Model", value: model });

  for (const field of categoryDetails.fields) {
    const value = normalizeDetailText(
      (field.property && product?.[field.property]) ||
        findSpecification(specifications, field.keys),
    );
    if (!value || rows.some((row) => row.value === value)) continue;
    rows.push({ label: field.label, value });
  }

  return {
    title: categoryDetails.title,
    rows,
    needsConfirmation: rows.length <= (categoryName ? 2 : 1),
  };
}
