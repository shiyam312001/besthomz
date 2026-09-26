import { RoomsHero } from "@/components/rooms/RoomsHero";
import { RoomsExplorer } from "@/components/rooms/RoomsExplorer";
import { RoomsTrustQuote } from "@/components/rooms/RoomsTrustQuote";
import { RoomsInspired } from "@/components/rooms/RoomsInspired";
import { RoomsExpertCta } from "@/components/rooms/RoomsExpertCta";
import { CollectionsNewsletter } from "@/components/collections/CollectionsNewsletter";

export function RoomsView({ rooms }) {
  return (
    <div className="bg-bh-warm-white">
      <RoomsHero />
      <RoomsExplorer rooms={rooms} />
      <RoomsTrustQuote />
      <RoomsInspired />
      <RoomsExpertCta />
      <CollectionsNewsletter />
    </div>
  );
}
