export function AdminTable({ columns, rows, emptyMessage = "No records yet." }) {
  if (!rows?.length) {
    return <p className="rounded-xl border border-dashed border-bh-border bg-white p-8 text-center text-sm text-bh-muted">{emptyMessage}</p>;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-bh-border bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-bh-border bg-bh-cream/60 text-xs uppercase tracking-wide text-bh-muted">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-semibold">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id || i} className="border-b border-bh-border/60 last:border-0 hover:bg-bh-cream/30">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 align-middle">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
