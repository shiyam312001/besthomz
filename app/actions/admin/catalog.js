"use server";

import { revalidatePath } from "next/cache";
import { getStaffSupabase } from "@/lib/auth/staff";
import { validateSlug, trimField, FORM_LIMITS } from "@/lib/validation/forms";

async function uniqueSlug(supabase, table, slug, excludeId) {
  let q = supabase.from(table).select("id").eq("slug", slug);
  if (excludeId) q = q.neq("id", excludeId);
  const { data } = await q.maybeSingle();
  return !data?.id;
}

export async function adminSaveCategory(formData) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const id = formData.get("id")?.toString();
  const slugCheck = validateSlug(formData.get("slug"));
  if (!slugCheck.ok) return { ok: false, error: slugCheck.error };
  if (!(await uniqueSlug(supabase, "categories", slugCheck.slug, id))) {
    return { ok: false, error: "Slug already in use." };
  }
  const payload = {
    name: trimField(formData.get("name"), FORM_LIMITS.name),
    slug: slugCheck.slug,
    description: trimField(formData.get("description"), FORM_LIMITS.message),
    image_url: trimField(formData.get("image_url"), 500),
    sort_order: Number(formData.get("sort_order") || 0),
    is_active: formData.get("is_active") !== "off",
  };
  if (!payload.name) return { ok: false, error: "Name required." };
  const q = id ? supabase.from("categories").update(payload).eq("id", id) : supabase.from("categories").insert(payload);
  const { error } = await q;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/categories");
  return { ok: true };
}

export async function adminSaveSubcategory(formData) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const id = formData.get("id")?.toString();
  const category_id = formData.get("category_id")?.toString();
  if (!category_id) return { ok: false, error: "Category is required." };
  const slugCheck = validateSlug(formData.get("slug"));
  if (!slugCheck.ok) return { ok: false, error: slugCheck.error };
  const payload = {
    category_id,
    name: trimField(formData.get("name"), FORM_LIMITS.name),
    slug: slugCheck.slug,
    description: trimField(formData.get("description"), FORM_LIMITS.shortText),
    sort_order: Number(formData.get("sort_order") || 0),
    is_active: formData.get("is_active") !== "off",
  };
  if (!payload.name) return { ok: false, error: "Name required." };
  const q = id ? supabase.from("subcategories").update(payload).eq("id", id) : supabase.from("subcategories").insert(payload);
  const { error } = await q;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/subcategories");
  return { ok: true };
}

export async function adminSaveRoom(formData) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const id = formData.get("id")?.toString();
  const slugCheck = validateSlug(formData.get("slug"));
  if (!slugCheck.ok) return { ok: false, error: slugCheck.error };
  if (!(await uniqueSlug(supabase, "rooms", slugCheck.slug, id))) {
    return { ok: false, error: "Slug already in use." };
  }
  const payload = {
    name: trimField(formData.get("name"), FORM_LIMITS.name),
    slug: slugCheck.slug,
    description: trimField(formData.get("description"), FORM_LIMITS.message),
    hero_image: trimField(formData.get("hero_image"), 500),
    sort_order: Number(formData.get("sort_order") || 0),
    is_active: formData.get("is_active") !== "off",
  };
  if (!payload.name) return { ok: false, error: "Name required." };
  const q = id ? supabase.from("rooms").update(payload).eq("id", id) : supabase.from("rooms").insert(payload);
  const { error } = await q;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/rooms");
  return { ok: true };
}

export async function adminSaveCollection(formData) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const id = formData.get("id")?.toString();
  const slugCheck = validateSlug(formData.get("slug"));
  if (!slugCheck.ok) return { ok: false, error: slugCheck.error };
  if (!(await uniqueSlug(supabase, "collections", slugCheck.slug, id))) {
    return { ok: false, error: "Slug already in use." };
  }
  const payload = {
    name: trimField(formData.get("name"), FORM_LIMITS.name),
    slug: slugCheck.slug,
    description: trimField(formData.get("description"), FORM_LIMITS.message),
    hero_image: trimField(formData.get("hero_image"), 500),
    sort_order: Number(formData.get("sort_order") || 0),
    is_featured: formData.get("is_featured") === "on",
    is_active: formData.get("is_active") !== "off",
  };
  if (!payload.name) return { ok: false, error: "Name required." };
  if (id) {
    const { error } = await supabase.from("collections").update(payload).eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/collections");
    return { ok: true, id };
  }
  const { data, error } = await supabase.from("collections").insert(payload).select("id").single();
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/collections");
  return { ok: true, id: data?.id };
}

export async function adminSaveOffer(formData) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const id = formData.get("id")?.toString();
  const slugCheck = validateSlug(formData.get("slug"));
  if (!slugCheck.ok) return { ok: false, error: slugCheck.error };
  if (!(await uniqueSlug(supabase, "offers", slugCheck.slug, id))) {
    return { ok: false, error: "Slug already in use." };
  }
  const payload = {
    title: trimField(formData.get("title"), FORM_LIMITS.name),
    slug: slugCheck.slug,
    description: trimField(formData.get("description"), FORM_LIMITS.message),
    image_url: trimField(formData.get("image_url"), 500),
    cta_label: trimField(formData.get("cta_label"), 80),
    cta_url: trimField(formData.get("cta_url"), 500),
    starts_at: formData.get("starts_at")?.toString() || null,
    ends_at: formData.get("ends_at")?.toString() || null,
    is_active: formData.get("is_active") !== "off",
  };
  if (!payload.title) return { ok: false, error: "Title required." };
  const q = id ? supabase.from("offers").update(payload).eq("id", id) : supabase.from("offers").insert(payload);
  const { error } = await q;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/offers");
  return { ok: true };
}

export async function adminSaveFaq(formData) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const id = formData.get("id")?.toString();
  const payload = {
    question: trimField(formData.get("question"), FORM_LIMITS.shortText),
    answer: trimField(formData.get("answer"), FORM_LIMITS.message),
    category: trimField(formData.get("category"), 80),
    sort_order: Number(formData.get("sort_order") || 0),
    is_active: formData.get("is_active") !== "off",
  };
  if (!payload.question || !payload.answer) return { ok: false, error: "Question and answer required." };
  const q = id ? supabase.from("faqs").update(payload).eq("id", id) : supabase.from("faqs").insert(payload);
  const { error } = await q;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/faqs");
  return { ok: true };
}

export async function adminDeleteFaq(faqId) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const { error } = await supabase.from("faqs").delete().eq("id", faqId);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/faqs");
  return { ok: true };
}

export async function adminSearchProducts(query) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return [];
  const q = query?.toString().trim();
  if (!q) return [];
  const { data } = await supabase
    .from("products")
    .select("id, name, slug, product_images(image_url, is_primary)")
    .or(`name.ilike.%${q}%,slug.ilike.%${q}%`)
    .neq("status", "archived")
    .limit(20);
  return (data || []).map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    image: p.product_images?.find((i) => i.is_primary)?.image_url || p.product_images?.[0]?.image_url,
  }));
}

export async function adminSetCollectionProducts(collectionId, productIds) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  if (!Array.isArray(productIds)) return { ok: false, error: "Invalid products." };
  await supabase.from("collection_products").delete().eq("collection_id", collectionId);
  const rows = productIds.map((product_id, i) => ({
    collection_id: collectionId,
    product_id,
    sort_order: i,
  }));
  if (rows.length) {
    const { error } = await supabase.from("collection_products").insert(rows);
    if (error) return { ok: false, error: error.message };
  }
  revalidatePath(`/admin/collections/${collectionId}/edit`);
  revalidatePath("/collections");
  return { ok: true };
}
