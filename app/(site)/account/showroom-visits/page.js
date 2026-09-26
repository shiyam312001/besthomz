import { getAuthUser, getProfileForUser } from "@/lib/auth/server";
import { createClientOptional } from "@/lib/supabase/server";
import { getShowroomVisitsForUser } from "@/lib/services/showroom";
import { ShowroomVisitForm } from "@/components/account/ShowroomVisitForm";

export const metadata = { title: "Showroom visits" };

export default async function ShowroomVisitsPage() {
  const user = await getAuthUser();
  const profile = await getProfileForUser(user.id);
  const supabase = await createClientOptional();
  const { data: visits } = supabase ? await getShowroomVisitsForUser(supabase, user.id) : { data: [] };

  return (
    <>
      <h1 className="font-display text-2xl font-semibold">Showroom visits</h1>
      <ShowroomVisitForm defaults={{ full_name: profile?.full_name, phone: profile?.phone, email: user.email }} />
      <h2 className="mt-10 font-semibold">Your requests</h2>
      <ul className="mt-4 space-y-3">
        {(visits || []).map((v) => (
          <li key={v.id} className="rounded-xl border border-bh-border bg-white p-4 text-sm">
            <p className="font-medium">{v.preferred_date || "Date TBC"} {v.preferred_time ? `· ${v.preferred_time}` : ""}</p>
            <p className="text-bh-muted">{v.status} · {v.requirement || "—"}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
