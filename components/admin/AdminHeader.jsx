import Link from "next/link";
import { signOut } from "@/app/actions/auth";

export function AdminHeader() {
  return (
    <header className="flex items-center justify-between border-b border-bh-border bg-white/90 px-4 py-3 backdrop-blur md:px-6">
      <p className="text-sm text-bh-muted">Staff workspace</p>
      <div className="flex items-center gap-3 text-sm">
        <Link href="/" className="text-bh-green hover:underline">View site</Link>
        <form action={signOut}>
          <button type="submit" className="rounded-full border border-bh-border px-3 py-1.5 bh-focus-ring hover:bg-bh-cream">
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
