export function offerScheduleLabel(offer) {
  if (!offer?.is_active) return "Inactive";
  const now = Date.now();
  const start = offer.starts_at ? new Date(offer.starts_at).getTime() : null;
  const end = offer.ends_at ? new Date(offer.ends_at).getTime() : null;
  if (start && now < start) return "Upcoming";
  if (end && now > end) return "Expired";
  return "Active";
}
