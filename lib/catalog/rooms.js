import { createClientOptional } from "@/lib/supabase/server";
import * as roomService from "@/lib/services/rooms";

const FALLBACK_ROOMS = [
  { name: "Living Room", slug: "living-room", description: "Sofas, tables & more for relaxed living.", hero_image: "/BestHomz/Homepage/rooms/17-room-living.png", sort_order: 1 },
  { name: "Bedroom", slug: "bedroom", description: "Beds, wardrobes & comfort essentials.", hero_image: "/BestHomz/Homepage/rooms/18-room-bedroom.png", sort_order: 2 },
  { name: "Dining Room", slug: "dining-room", description: "Tables, chairs & storage for shared meals.", hero_image: "/BestHomz/Homepage/rooms/19-room-dining.png", sort_order: 3 },
  { name: "Home Office", slug: "home-office", description: "Desks, chairs & storage for productive work.", hero_image: "/BestHomz/Homepage/rooms/20-room-office.png", sort_order: 4 },
  { name: "Kids Room", slug: "kids-room", description: "Functional furniture for growing spaces.", hero_image: "/BestHomz/Homepage/rooms/21-room-kids.png", sort_order: 5 },
];

export async function fetchActiveRooms() {
  const supabase = await createClientOptional();
  if (supabase) {
    const { data, error } = await roomService.getActiveRooms(supabase);
    if (!error && data?.length) return data;
  }
  return FALLBACK_ROOMS;
}

export async function fetchRoomBySlug(slug) {
  const supabase = await createClientOptional();
  if (supabase) {
    const { data, error } = await roomService.getRoomBySlug(supabase, slug);
    if (!error && data) return data;
  }
  return FALLBACK_ROOMS.find((r) => r.slug === slug) || null;
}
