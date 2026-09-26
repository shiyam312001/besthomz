import { notFound } from "next/navigation";
import { getStaffSupabase } from "@/lib/auth/staff";
import { RoomForm } from "@/components/admin/RoomForm";

export default async function AdminEditRoomPage({ params }) {
  const { id } = await params;
  const { supabase } = await getStaffSupabase();
  if (!supabase) notFound();
  const { data: room } = await supabase.from("rooms").select("*").eq("id", id).maybeSingle();
  if (!room) notFound();
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Edit room</h1>
      <RoomForm room={room} />
    </div>
  );
}
