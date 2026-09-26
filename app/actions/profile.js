"use server";

import { revalidatePath } from "next/cache";
import { createClientOptional } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/auth/server";
import { trimField, FORM_LIMITS } from "@/lib/validation/forms";

export async function updateProfile(formData) {
  const user = await getAuthUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const supabase = await createClientOptional();
  if (!supabase) return { ok: false, error: "Unavailable." };

  const full_name = trimField(formData.get("full_name"), FORM_LIMITS.name);
  const phone = trimField(formData.get("phone"), FORM_LIMITS.phone);
  const avatar_url = trimField(formData.get("avatar_url"), 500);
  if (!full_name || full_name.length < 2) {
    return { ok: false, error: "Please enter your name." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ full_name, phone, avatar_url })
    .eq("id", user.id);

  if (error) return { ok: false, error: error.message };
  revalidatePath("/account/profile");
  return { ok: true };
}
