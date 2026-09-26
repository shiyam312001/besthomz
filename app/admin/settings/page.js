import { staffSelect } from "@/lib/admin/entity-list";
import { site } from "@/config/site";

export default async function AdminSettingsPage() {
  const rows = await staffSelect("site_settings", "key, value, description, is_public");
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="font-display text-2xl font-semibold">Settings</h1>
      <p className="text-sm text-bh-muted">
        Code defaults remain in <code className="text-xs">config/site.js</code> (phone {site.phone}, WhatsApp {site.whatsapp}).
        Database settings below override public values when synced to the storefront in a future phase.
      </p>
      <ul className="space-y-3">
        {rows.map((row) => (
          <li key={row.key} className="rounded-xl border border-bh-border bg-white p-4 text-sm">
            <p className="font-medium">{row.key}</p>
            <pre className="mt-2 overflow-x-auto rounded bg-bh-cream/60 p-2 text-xs">{JSON.stringify(row.value, null, 2)}</pre>
            {row.description && <p className="mt-1 text-bh-muted">{row.description}</p>}
          </li>
        ))}
        {!rows.length && <p className="text-sm text-bh-muted">No site_settings rows.</p>}
      </ul>
    </div>
  );
}
