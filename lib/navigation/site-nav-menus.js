export function mapCategoriesToNavItems(categories = []) {
  return [...categories]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((c) => ({
      label: c.name,
      href: `/furniture/${c.slug}`,
    }));
}

export function mapRoomsToNavItems(rooms = []) {
  return [...rooms]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((r) => ({
      label: r.name,
      href: `/rooms/${r.slug}`,
    }));
}

export async function fetchSiteNavMenus() {
  const { fetchActiveCategories } = await import("@/lib/catalog/categories");
  const { fetchActiveRooms } = await import("@/lib/catalog/rooms");
  const [categories, rooms] = await Promise.all([fetchActiveCategories(), fetchActiveRooms()]);
  return {
    furniture: mapCategoriesToNavItems(categories),
    rooms: mapRoomsToNavItems(rooms),
  };
}
