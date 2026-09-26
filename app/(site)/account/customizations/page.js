import { getAuthUser } from "@/lib/auth/server";
import { createClientOptional } from "@/lib/supabase/server";
import { EmptyState } from "@/components/ui/EmptyState";
import Link from "next/link";

export const metadata = { title: "Customizations" };

export default async function AccountCustomizationsPage() {
  const user = await getAuthUser();
  const supabase = await createClientOptional();
  const { data } = supabase
    ? await supabase
        .from("customizations")
        .select("id, status, created_at, products(name, slug)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  if (!data?.length) {
    return <EmptyState title="No customization requests" description="Start from the customize page." actionHref="/customize" actionLabel="Customize furniture" />;
  }

  return (
    <>
      <h1 className="font-display text-2xl font-semibold">Customizations</h1>
      <ul className="mt-6 space-y-3">
        {data.map((row) => (
          <li key={row.id} className="rounded-2xl border border-bh-border bg-white p-4 text-sm">
            <p className="font-medium">{row.products?.name || "Custom request"}</p>
            <p className="text-bh-muted">{row.status} · {new Date(row.created_at).toLocaleDateString()}</p>
            <Link href="/customize" className="mt-2 inline-block text-bh-green underline">Request quote</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
