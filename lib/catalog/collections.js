import { createClientOptional } from "@/lib/supabase/server";
import * as collectionService from "@/lib/services/collections";

const FALLBACK_COLLECTIONS = [
  { name: "Modern Living", slug: "modern-living", description: "Clean lines and calm living spaces.", hero_image: "/BestHomz/Homepage/inspiration/30-inspire-living.png", is_featured: true, sort_order: 1 },
  { name: "Bedroom Collection", slug: "bedroom-collection", description: "Restful, refined bedroom essentials.", hero_image: "/BestHomz/Homepage/inspiration/31-inspire-bedroom.png", is_featured: true, sort_order: 2 },
  { name: "Office Collection", slug: "office-collection", description: "Productive, premium workspaces.", hero_image: "/BestHomz/Homepage/inspiration/33-inspire-office.png", is_featured: false, sort_order: 3 },
];

export async function fetchActiveCollections() {
  const supabase = await createClientOptional();
  if (supabase) {
    const { data, error } = await collectionService.getActiveCollections(supabase);
    if (!error && data?.length) return data;
  }
  return FALLBACK_COLLECTIONS;
}

export async function fetchCollectionBySlug(slug) {
  const supabase = await createClientOptional();
  if (supabase) {
    const { data, error } = await collectionService.getCollectionBySlug(supabase, slug);
    if (!error && data) return data;
  }
  const col = FALLBACK_COLLECTIONS.find((c) => c.slug === slug);
  if (!col) return null;
  return { ...col, collection_products: [] };
}
