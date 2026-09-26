import { createClientOptional } from "@/lib/supabase/server";
import * as categoryService from "@/lib/services/categories";

const FALLBACK_CATEGORIES = [
  { name: "Dining Table", slug: "dining-tables", image_url: "/BestHomz/Homepage/categories/02-category-dining-table.png", description: "Premium dining tables for everyday meals and gatherings.", sort_order: 1 },
  { name: "Dining Chair", slug: "dining-chairs", image_url: "/BestHomz/Homepage/categories/03-category-dining-chair.png", description: "Comfortable dining chairs to complement your table.", sort_order: 2 },
  { name: "Dressing Table", slug: "dressing-tables", image_url: "/BestHomz/Homepage/categories/04-category-dressing-table.png", description: "Elegant dressing tables for bedroom storage and style.", sort_order: 3 },
  { name: "Bed", slug: "beds", image_url: "/BestHomz/Homepage/categories/05-category-bed.png", description: "Beds designed for rest and modern bedrooms.", sort_order: 4 },
  { name: "Mattress", slug: "mattresses", image_url: "/BestHomz/Homepage/categories/06-category-mattress.png", description: "Supportive mattresses for better sleep.", sort_order: 5 },
  { name: "Sofa", slug: "sofas", image_url: "/BestHomz/Homepage/categories/07-category-sofa.png", description: "Sofas crafted for comfort and contemporary living.", sort_order: 6 },
  { name: "Office Chair", slug: "office-chairs", image_url: "/BestHomz/Homepage/categories/08-category-office-chair.png", description: "Ergonomic office chairs for productive workspaces.", sort_order: 7 },
  { name: "Office Table", slug: "office-tables", image_url: "/BestHomz/Homepage/categories/09-category-office-table.png", description: "Office tables and desks for home and workplace.", sort_order: 8 },
];

export async function fetchActiveCategories() {
  const supabase = await createClientOptional();
  if (supabase) {
    const { data, error } = await categoryService.getActiveCategories(supabase);
    if (!error && data?.length) return data;
  }
  return FALLBACK_CATEGORIES;
}

export async function fetchCategoryBySlug(slug) {
  const supabase = await createClientOptional();
  if (supabase) {
    const { data, error } = await categoryService.getCategoryBySlug(supabase, slug);
    if (!error && data) return data;
  }
  return FALLBACK_CATEGORIES.find((c) => c.slug === slug) || null;
}
