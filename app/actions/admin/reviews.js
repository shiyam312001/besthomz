"use server";

import { revalidatePath } from "next/cache";
import { getStaffSupabase } from "@/lib/auth/staff";

export async function adminUpdateReviewStatus(id, status) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false };
  await supabase.from("reviews").update({ status }).eq("id", id);
  revalidatePath("/admin/reviews");
  return { ok: true };
}

export async function adminDeleteReview(id) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/reviews");
  return { ok: true };
}
