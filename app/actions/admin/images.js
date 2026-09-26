"use server";

import { revalidatePath } from "next/cache";
import { getStaffSupabase } from "@/lib/auth/staff";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 10 * 1024 * 1024;

export async function adminUploadProductImage(productId, formData) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const file = formData.get("file");
  if (!file || typeof file === "string") return { ok: false, error: "No file provided." };
  if (!ALLOWED.has(file.type)) return { ok: false, error: "Only JPEG, PNG and WebP images are allowed." };
  if (file.size > MAX_BYTES) return { ok: false, error: "Image must be 10MB or smaller." };

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `${productId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: upErr } = await supabase.storage.from("products").upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });
  if (upErr) return { ok: false, error: upErr.message };

  const { data: pub } = supabase.storage.from("products").getPublicUrl(path);
  const image_url = pub.publicUrl;

  const { count } = await supabase
    .from("product_images")
    .select("id", { count: "exact", head: true })
    .eq("product_id", productId);

  const isPrimary = (count ?? 0) === 0;

  const { error: insErr } = await supabase.from("product_images").insert({
    product_id: productId,
    image_url,
    alt_text: file.name?.slice(0, 200) || null,
    image_type: isPrimary ? "primary" : "gallery",
    sort_order: count ?? 0,
    is_primary: isPrimary,
  });

  if (insErr) return { ok: false, error: insErr.message };
  revalidatePath(`/admin/products/${productId}/edit`);
  return { ok: true, image_url };
}

export async function adminDeleteProductImage(imageId, productId) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const { error } = await supabase.from("product_images").delete().eq("id", imageId);
  if (error) return { ok: false, error: error.message };
  revalidatePath(`/admin/products/${productId}/edit`);
  return { ok: true };
}

export async function adminSetPrimaryImage(imageId, productId) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  await supabase.from("product_images").update({ is_primary: false }).eq("product_id", productId);
  const { error } = await supabase
    .from("product_images")
    .update({ is_primary: true, image_type: "primary" })
    .eq("id", imageId);
  if (error) return { ok: false, error: error.message };
  revalidatePath(`/admin/products/${productId}/edit`);
  return { ok: true };
}

export async function adminReorderProductImages(productId, orderedIds) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  if (!Array.isArray(orderedIds)) return { ok: false, error: "Invalid order." };
  for (let i = 0; i < orderedIds.length; i++) {
    await supabase.from("product_images").update({ sort_order: i }).eq("id", orderedIds[i]).eq("product_id", productId);
  }
  revalidatePath(`/admin/products/${productId}/edit`);
  return { ok: true };
}
