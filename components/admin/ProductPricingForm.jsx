"use client";

import { useTransition } from "react";
import { adminSaveProductPricing } from "@/app/actions/admin/pricing";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassCard } from "@/components/ui/GlassCard";

export function ProductPricingForm({ productId, pricing }) {
  const [pending, startTransition] = useTransition();

  return (
    <GlassCard className="space-y-4 p-6">
      <h2 className="font-display text-lg font-semibold">Pricing (staff only)</h2>
      <p className="text-xs text-bh-muted">Customer visibility depends on SHOW_PRICES / checkout settings.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(async () => {
            await adminSaveProductPricing(new FormData(e.currentTarget));
          });
        }}
      >
        <input type="hidden" name="product_id" value={productId} />
        <label className="text-sm font-medium">Base price (INR)</label>
        <Input name="price" type="number" step="0.01" min="0" className="mt-1" defaultValue={pricing?.price ?? ""} />
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_active" defaultChecked={pricing?.is_active} />
          Active for checkout
        </label>
        <input type="hidden" name="currency" value="INR" />
        <Button type="submit" size="sm" className="mt-4" loading={pending}>Save pricing</Button>
      </form>
    </GlassCard>
  );
}
