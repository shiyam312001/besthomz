"use server";

import { getAuthUser } from "@/lib/auth/server";
import { createClientOptional } from "@/lib/supabase/server";
import { createCustomization } from "@/lib/services/customizations";

export async function saveCustomizationDraft(payload) {
  const user = await getAuthUser();
  if (!user) {
    return { ok: false, error: "Sign in to save designs to your account.", needsAuth: true };
  }

  const supabase = await createClientOptional();
  if (!supabase) {
    return { ok: false, error: "Unable to save right now. Try again later." };
  }

  const {
    category,
    styleId,
    styleName,
    size,
    material,
    colour,
    finish,
  } = payload || {};

  const { data, error } = await createCustomization(supabase, {
    user_id: user.id,
    name: styleName || category || "Custom design",
    size: size || null,
    material: material || null,
    colour: colour || null,
    finish: finish || null,
    notes: category ? `Category: ${category}` : null,
    configuration_data: {
      category,
      styleId,
      styleName,
      size,
      material,
      colour,
      finish,
    },
    status: "draft",
  });

  if (error) {
    return { ok: false, error: "Could not save your design." };
  }

  return { ok: true, id: data?.id };
}
