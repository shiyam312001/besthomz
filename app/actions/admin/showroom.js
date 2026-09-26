"use server";

import { revalidatePath } from "next/cache";
import { getStaffSupabase } from "@/lib/auth/staff";

export async function adminUpdateShowroomStatus(id, status) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false };
  await supabase.from("showroom_visits").update({ status }).eq("id", id);
  revalidatePath("/admin/showroom-visits");
  return { ok: true };
}
