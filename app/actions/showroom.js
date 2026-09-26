"use server";

import { revalidatePath } from "next/cache";
import { createClientOptional } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/auth/server";
import { createShowroomVisit } from "@/lib/services/showroom";

export async function submitShowroomVisit(formData) {
  const user = await getAuthUser();
  const payload = {
    full_name: formData.get("full_name")?.toString().trim(),
    phone: formData.get("phone")?.toString().trim(),
    email: formData.get("email")?.toString().trim() || null,
    preferred_date: formData.get("preferred_date")?.toString() || null,
    preferred_time: formData.get("preferred_time")?.toString().trim() || null,
    visitors_count: Number(formData.get("visitors_count") || 0) || null,
    requirement: formData.get("requirement")?.toString().trim() || null,
    message: formData.get("message")?.toString().trim() || null,
    user_id: user?.id ?? null,
  };

  if (!payload.full_name || !payload.phone) {
    return { ok: false, error: "Name and phone are required." };
  }

  const supabase = await createClientOptional();
  if (!supabase) return { ok: false, error: "Unable to submit. Please call us." };

  const { error } = await createShowroomVisit(supabase, payload);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/account/showroom-visits");
  return { ok: true };
}
