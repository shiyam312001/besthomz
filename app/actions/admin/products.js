"use server";

import { revalidatePath } from "next/cache";
import { getStaffSupabase } from "@/lib/auth/staff";
import { validateSlug, trimField, FORM_LIMITS } from "@/lib/validation/forms";

function productPayload(formData) {
  const category_id = formData.get("category_id")?.toString() || null;
  const subcategory_id = formData.get("subcategory_id")?.toString() || null;
  return {
    name: trimField(formData.get("name"), FORM_LIMITS.name),
    slug: trimField(formData.get("slug"), FORM_LIMITS.slug),
    short_description: trimField(formData.get("short_description"), FORM_LIMITS.shortText),
    description: formData.get("description")?.toString().trim() || null,
    category_id: category_id || null,
    subcategory_id: subcategory_id || null,
    status: formData.get("status")?.toString() || "draft",
    is_featured: formData.get("is_featured") === "on",
    is_new: formData.get("is_new") === "on",
    is_bestseller: formData.get("is_bestseller") === "on",
    is_customizable: formData.get("is_customizable") === "on",
    is_quote_enabled: formData.get("is_quote_enabled") !== "off",
  };
}

async function slugTaken(supabase, slug, excludeId) {
  let q = supabase.from("products").select("id").eq("slug", slug);
  if (excludeId) q = q.neq("id", excludeId);
  const { data } = await q.maybeSingle();
  return Boolean(data?.id);
}

export async function adminSaveProduct(formData) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const id = formData.get("id")?.toString();
  const payload = productPayload(formData);
  if (!payload.name) return { ok: false, error: "Name is required." };
  const slugCheck = validateSlug(payload.slug);
  if (!slugCheck.ok) return { ok: false, error: slugCheck.error };
  payload.slug = slugCheck.slug;

  if (await slugTaken(supabase, payload.slug, id)) {
    return { ok: false, error: "Another product already uses this slug." };
  }

  const query = id
    ? supabase.from("products").update(payload).eq("id", id).select("id").single()
    : supabase.from("products").insert(payload).select("id").single();

  const { data, error } = await query;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/products");
  if (data?.id) revalidatePath(`/admin/products/${data.id}/edit`);
  return { ok: true, id: data?.id };
}

export async function adminArchiveProduct(productId) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const { error } = await supabase.from("products").update({ status: "archived" }).eq("id", productId);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/products");
  return { ok: true };
}

export async function adminRestoreProduct(productId, status = "active") {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const next = status === "draft" ? "draft" : "active";
  const { error } = await supabase.from("products").update({ status: next }).eq("id", productId);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}/edit`);
  return { ok: true };
}
