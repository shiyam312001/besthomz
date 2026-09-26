import { PageContainer } from "@/components/layout/PageContainer";
import { RoomExplorerBlock } from "@/components/rooms/RoomExplorerBlock";

export function RoomsExplorer({ rooms = [] }) {
  return (
    <section className="bg-bh-warm-white py-12 md:py-16">
      <PageContainer>
        <div className="mb-8 md:mb-10">
          <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">Explore by Room</h2>
          <p className="mt-2 text-sm text-bh-muted md:text-base">
            Browse complete room ideas and jump into the furniture categories you need.
          </p>
        </div>
        {rooms.map((room, index) => (
          <RoomExplorerBlock key={room.slug} room={room} reversed={index % 2 === 1} />
        ))}
      </PageContainer>
    </section>
  );
}
