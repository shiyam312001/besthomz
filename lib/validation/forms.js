const LIMITS = {
  name: 120,
  phone: 20,
  email: 254,
  location: 200,
  message: 5000,
  shortText: 500,
  slug: 120,
};

export function trimField(value, max) {
  if (value == null) return null;
  const s = value.toString().trim();
  if (!s) return null;
  return s.length > max ? s.slice(0, max) : s;
}

export function validateQuotePayload(raw) {
  const full_name = trimField(raw.full_name, LIMITS.name);
  const phone = trimField(raw.phone, LIMITS.phone);
  const email = trimField(raw.email, LIMITS.email);
  const location = trimField(raw.location, LIMITS.location);
  const message = trimField(raw.message, LIMITS.message);
  const furniture_requirement = trimField(raw.furniture_requirement, LIMITS.shortText);
  const customization_requirement = trimField(raw.customization_requirement, LIMITS.shortText);
  const room_size = trimField(raw.room_size, 80);
  const budget_range = trimField(raw.budget_range, 80);
  const preferred_contact_method = trimField(raw.preferred_contact_method, 40);

  if (!full_name || full_name.length < 2) {
    return { ok: false, error: "Please enter your full name." };
  }
  if (!phone || phone.replace(/\D/g, "").length < 8) {
    return { ok: false, error: "Please enter a valid phone number." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  return {
    ok: true,
    data: {
      full_name,
      phone,
      email,
      location,
      message,
      furniture_requirement,
      customization_requirement,
      room_size,
      budget_range,
      preferred_contact_method,
    },
  };
}

export function validateSlug(slug) {
  const s = trimField(slug, LIMITS.slug);
  if (!s) return { ok: false, error: "Slug is required." };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)) {
    return { ok: false, error: "Slug must be lowercase letters, numbers and hyphens only." };
  }
  return { ok: true, slug: s };
}

export const FORM_LIMITS = LIMITS;
