"use server";

import { revalidatePath } from "next/cache";
import { getStaffSupabase } from "@/lib/auth/staff";

export async function adminUpdateContactStatus(id, status) {
  const { supabase } = await getStaffSupabase();
  if (!supabase) return { ok: false };
  await supabase.from("contact_messages").update({ status }).eq("id", id);
  revalidatePath("/admin/contact-messages");
  return { ok: true };
}
