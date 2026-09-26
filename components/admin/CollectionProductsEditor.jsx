"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { adminSetCollectionProducts, adminSearchProducts } from "@/app/actions/admin/catalog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/providers/ToastProvider";

export function CollectionProductsEditor({ collectionId, initialProducts = [] }) {
  const [selected, setSelected] = useState(initialProducts.map((p) => p.id));
  const [labels, setLabels] = useState(
    Object.fromEntries(initialProducts.map((p) => [p.id, p])),
  );
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  function addProduct(p) {
    if (selected.includes(p.id)) return;
    setSelected((s) => [...s, p.id]);
    setLabels((l) => ({ ...l, [p.id]: p }));
  }

  function removeProduct(id) {
    setSelected((s) => s.filter((x) => x !== id));
  }

  return (
    <section className="rounded-2xl border border-bh-border bg-white p-6">
      <h2 className="font-semibold">Collection products</h2>
      <div className="mt-4 flex gap-2">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" />
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            startTransition(async () => {
              const list = await adminSearchProducts(query);
              setResults(list);
            })
          }
        >
          Search
        </Button>
      </div>
      {results.length > 0 && (
        <ul className="mt-3 max-h-48 space-y-1 overflow-y-auto text-sm">
          {results.map((p) => (
            <li key={p.id} className="flex items-center justify-between rounded-lg bg-bh-cream/50 px-3 py-2">
              <span>{p.name}</span>
              <button type="button" className="text-bh-green underline" onClick={() => addProduct(p)}>Add</button>
            </li>
          ))}
        </ul>
      )}
      <ul className="mt-6 space-y-2">
        {selected.map((id, index) => {
          const p = labels[id];
          return (
            <li key={id} className="flex items-center gap-3 rounded-xl border border-bh-border p-2">
              {p?.image && (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-bh-cream">
                  <Image src={p.image} alt="" fill className="object-cover" sizes="48px" />
                </div>
              )}
              <span className="flex-1 text-sm font-medium">{p?.name || id}</span>
              <span className="text-xs text-bh-muted">#{index + 1}</span>
              <button type="button" className="text-xs text-red-600 underline" onClick={() => removeProduct(id)}>Remove</button>
            </li>
          );
        })}
      </ul>
      <Button
        className="mt-4"
        loading={pending}
        onClick={() =>
          startTransition(async () => {
            const res = await adminSetCollectionProducts(collectionId, selected);
            if (res.ok) toast("Collection products saved");
          })
        }
      >
        Save product order
      </Button>
    </section>
  );
}
