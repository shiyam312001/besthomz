import { RoomsView } from "@/components/rooms/RoomsView";
import { fetchActiveRooms } from "@/lib/catalog/rooms";

export const metadata = {
  title: "Shop by Room",
  description: "Explore furniture ideas for living room, bedroom, dining, home office and kids rooms.",
};

export default async function RoomsPage() {
  const rooms = await fetchActiveRooms();
  return <RoomsView rooms={rooms} />;
}
