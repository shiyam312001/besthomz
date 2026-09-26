export const CUSTOMIZE_STORAGE_KEY = "bh-customize-design-v1";

export function buildDesignState({
  category,
  styleId,
  size,
  material,
  colour,
  finish,
}) {
  return {
    category,
    styleId,
    size,
    material,
    colour,
    finish,
    savedAt: new Date().toISOString(),
  };
}

export function designToSearchParams(state) {
  const params = new URLSearchParams();
  if (state.category) params.set("cat", state.category);
  if (state.styleId) params.set("style", state.styleId);
  if (state.size) params.set("size", state.size);
  if (state.material) params.set("material", state.material);
  if (state.colour) params.set("colour", state.colour);
  if (state.finish) params.set("finish", state.finish);
  return params;
}

export function parseDesignFromSearchParams(searchParams) {
  if (!searchParams) return null;
  const get = (key) => searchParams.get(key)?.trim() || null;
  const cat = get("cat");
  if (!cat) return null;
  return {
    category: cat,
    styleId: get("style"),
    size: get("size"),
    material: get("material"),
    colour: get("colour"),
    finish: get("finish"),
  };
}

export function saveDesignToStorage(state) {
  try {
    localStorage.setItem(CUSTOMIZE_STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function loadDesignFromStorage() {
  try {
    const raw = localStorage.getItem(CUSTOMIZE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function formatQuoteFromDesign({ productLabel, styleName, size, material, colour, finish }) {
  const furnitureRequirement = productLabel || "Custom furniture";
  const customization_requirement = [
    styleName && `Style: ${styleName}`,
    size && `Size: ${size}`,
    material && `Material: ${material}`,
    colour && `Colour: ${colour}`,
    finish && `Finish: ${finish}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return {
    furnitureRequirement,
    customizationRequirement: customization_requirement,
  };
}
