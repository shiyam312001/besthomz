"use server";

import { createClientOptional } from "@/lib/supabase/server";
import { createContactMessage } from "@/lib/services/contact";

export async function submitContactMessage(formData) {
  const name = formData.get("name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const subject = formData.get("subject")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !message) {
    return { ok: false, error: "Name and message are required." };
  }

  const supabase = await createClientOptional();
  if (!supabase) {
    return { ok: false, error: "Unable to send message. Please call us directly." };
  }

  const { error } = await createContactMessage(supabase, {
    name,
    phone: phone || null,
    email: email || null,
    subject: subject || null,
    message,
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
