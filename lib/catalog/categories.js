import { createClientOptional } from "@/lib/supabase/server";
import * as categoryService from "@/lib/services/categories";
import { loadProductsImport } from "@/lib/catalog/load-import";

function getCatalogCategories() {
  const categories = new Map();

  for (const product of loadProductsImport()) {
    if (!product.category || !product.category_slug) continue;

    const category = categories.get(product.category_slug) || {
      name: product.category,
      slug: product.category_slug,
      image_url: null,
      description: null,
      product_count: 0,
      sort_order: categories.size + 1,
    };
    category.product_count += 1;
    if (!category.image_url) {
      category.image_url = product.images?.find((image) => image.is_primary)?.image_url || null;
    }
    categories.set(product.category_slug, category);
  }

  return [...categories.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function mergeCatalogCategories(catalogCategories, databaseCategories = []) {
  const bySlug = new Map(databaseCategories.map((category) => [category.slug, category]));
  return catalogCategories.map((category) => ({
    ...bySlug.get(category.slug),
    ...category,
    id: bySlug.get(category.slug)?.id,
    description: bySlug.get(category.slug)?.description || category.description,
  }));
}

export async function fetchActiveCategories() {
  const supabase = await createClientOptional();
  const catalogCategories = getCatalogCategories();
  if (supabase) {
    const { data, error } = await categoryService.getActiveCategories(supabase);
    if (!error && data?.length) return mergeCatalogCategories(catalogCategories, data);
  }
  return catalogCategories;
}

export async function fetchCategoryBySlug(slug) {
  const catalogCategory = getCatalogCategories().find((category) => category.slug === slug);
  if (!catalogCategory) return null;

  const supabase = await createClientOptional();
  if (supabase) {
    const { data, error } = await categoryService.getCategoryBySlug(supabase, slug);
    if (!error && data) {
      return {
        ...data,
        ...catalogCategory,
        id: data.id,
        description: data.description || catalogCategory.description,
      };
    }
  }
  return catalogCategory;
}
