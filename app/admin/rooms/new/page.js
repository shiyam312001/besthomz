import { RoomForm } from "@/components/admin/RoomForm";

export default function AdminNewRoomPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">New room</h1>
      <RoomForm />
    </div>
  );
}
