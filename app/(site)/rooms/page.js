import { RoomsView } from "@/components/rooms/RoomsView";
import { fetchActiveRooms } from "@/lib/catalog/rooms";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Furniture by Room",
  description: "Shop living room, bedroom, dining room, home office and kids room furniture in Chennai with expert guidance from Best Homz.",
  path: "/rooms",
  keywords: [
    "living room furniture Chennai",
    "bedroom furniture Chennai",
    "dining room furniture Chennai",
    "home office furniture Chennai",
  ],
});

export default async function RoomsPage() {
  const rooms = await fetchActiveRooms();
  return <RoomsView rooms={rooms} />;
}
