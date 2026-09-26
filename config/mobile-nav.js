/** Routes where the app-style bottom tab bar is hidden (dedicated sticky CTAs, etc.) */
export const BOTTOM_NAV_HIDDEN_PREFIXES = ["/product/", "/checkout"];

export function isBottomNavHidden(pathname) {
  if (!pathname) return false;
  return BOTTOM_NAV_HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
