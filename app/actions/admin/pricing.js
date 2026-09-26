"use server";

import { revalidatePath } from "next/cache";
import { getStaffSupabase } from "@/lib/auth/staff";

export async function adminSaveProductPricing(formData) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };

  const productId = formData.get("product_id")?.toString();
  if (!productId) return { ok: false, error: "Missing product." };

  const priceRaw = formData.get("price")?.toString().trim();
  const price = priceRaw ? Number(priceRaw) : null;
  if (price != null && (!Number.isFinite(price) || price < 0)) {
    return { ok: false, error: "Invalid price." };
  }

  const is_active = formData.get("is_active") === "on";
  const currency = formData.get("currency")?.toString() || "INR";

  const { data: existing } = await supabase
    .from("product_pricing")
    .select("id")
    .eq("product_id", productId)
    .is("variant_id", null)
    .maybeSingle();

  const payload = { product_id: productId, variant_id: null, price, currency, is_active };

  const { error } = existing?.id
    ? await supabase.from("product_pricing").update(payload).eq("id", existing.id)
    : await supabase.from("product_pricing").insert(payload);

  if (error) return { ok: false, error: error.message };
  revalidatePath(`/admin/products/${productId}/edit`);
  return { ok: true };
}
