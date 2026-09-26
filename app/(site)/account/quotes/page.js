import Link from "next/link";
import { getAuthUser } from "@/lib/auth/server";
import { createClientOptional } from "@/lib/supabase/server";
import { getQuotesForUser } from "@/lib/services/quotes";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = { title: "My quotes" };

export default async function AccountQuotesPage() {
  const user = await getAuthUser();
  const supabase = await createClientOptional();
  const { data: quotes } = supabase ? await getQuotesForUser(supabase, user.id) : { data: [] };

  if (!quotes?.length) {
    return (
      <EmptyState
        title="No quote requests yet"
        description="Request a quote from any product or your cart."
        actionHref="/furniture"
        actionLabel="Start a quote"
      />
    );
  }

  return (
    <>
      <h1 className="font-display text-2xl font-semibold">Quote requests</h1>
      <ul className="mt-6 space-y-3">
        {quotes.map((q) => (
          <li key={q.id} className="rounded-2xl border border-bh-border bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold">{q.quote_number}</p>
                <p className="text-xs text-bh-muted">{new Date(q.created_at).toLocaleDateString()} · {q.status}</p>
              </div>
              <Link href={`/account/quotes/${q.id}`} className="text-sm font-medium text-bh-green underline">View quote</Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
