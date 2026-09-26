"use client";

import { GitCompare } from "lucide-react";
import { addCompareProduct } from "@/lib/commerce/client-storage";
import { useToast } from "@/components/providers/ToastProvider";

export function AddToCompareButton({ product }) {
  const { toast } = useToast();
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm bh-glass-panel bh-focus-ring hover:shadow-[0_10px_28px_rgba(27,61,47,0.1)]"
      onClick={() => {
        addCompareProduct({
          slug: product.slug,
          name: product.name,
          category: product.categories?.name,
          description: product.short_description,
        });
        toast("Added to compare (max 4)");
      }}
    >
      <GitCompare className="h-4 w-4" /> Compare
    </button>
  );
}
