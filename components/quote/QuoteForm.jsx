"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { submitQuoteRequest } from "@/app/actions/quotes";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";

export function QuoteForm({ context = {}, onSuccess }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    if (context.productId) formData.set("product_id", context.productId);
    if (context.productName) formData.set("product_name", context.productName);
    if (context.quantity) formData.set("quantity", String(context.quantity));
    if (context.cartItems?.length) {
      formData.set("cart_items", JSON.stringify(context.cartItems));
      formData.set("from_cart", "1");
    }

    startTransition(async () => {
      const result = await submitQuoteRequest(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSuccess({
        quoteNumber: result.quoteNumber,
        quoteId: result.quoteId,
      });
      e.target.reset();
    });
  }

  if (success) {
    return (
      <div className="rounded-3xl px-6 py-8 text-center bh-glass-subtle md:px-8 md:py-10">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-bh-green/10 text-bh-green">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <p className="font-display text-2xl font-semibold text-bh-charcoal">Quote request received</p>
        {success.quoteNumber && (
          <p className="mt-2 text-sm text-bh-muted">
            Reference: <strong className="text-bh-charcoal">{success.quoteNumber}</strong>
          </p>
        )}
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-bh-muted">
          Our team will contact you shortly to confirm requirements and share a personalised quote.
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          {success.quoteId && (
            <Button href={`/account/quotes/${success.quoteId}`} variant="outline" className="rounded-full border-0 bh-glass-panel">
              View quote
            </Button>
          )}
          <Button href="/furniture" onClick={onSuccess} className="rounded-full">
            Continue shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
      {context.cartItems?.length > 0 && (
        <div className="rounded-2xl px-4 py-3 text-sm bh-glass-subtle md:rounded-3xl">
          <p className="font-medium text-bh-charcoal">{context.cartItems.length} item(s) from your cart</p>
          <ul className="mt-1.5 space-y-0.5 text-bh-muted">
            {context.cartItems.slice(0, 5).map((item) => (
              <li key={item.id || item.product_id} className="truncate">
                · {item.product_name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {context.productName && !context.cartItems?.length && (
        <p className="rounded-2xl px-4 py-3 text-sm text-bh-charcoal bh-glass-subtle md:rounded-3xl">
          Product: <strong>{context.productName}</strong>
        </p>
      )}
      <FormField label="Full name" htmlFor="full_name" required>
        <Input id="full_name" name="full_name" required autoComplete="name" variant="glass" placeholder="Your full name" />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Phone" htmlFor="phone" required>
          <Input id="phone" name="phone" type="tel" required autoComplete="tel" variant="glass" placeholder="Phone number" />
        </FormField>
        <FormField label="Email" htmlFor="email">
          <Input id="email" name="email" type="email" autoComplete="email" variant="glass" placeholder="Email (optional)" />
        </FormField>
      </div>
      <FormField label="Location" htmlFor="location">
        <Input id="location" name="location" variant="glass" placeholder="City or area" />
      </FormField>
      <FormField label="Furniture requirement" htmlFor="furniture_requirement">
        <Input
          id="furniture_requirement"
          name="furniture_requirement"
          variant="glass"
          placeholder="e.g. Living room sofa set"
          defaultValue={context.furnitureRequirement || ""}
        />
      </FormField>
      <FormField label="Customization requirement" htmlFor="customization_requirement">
        <Textarea
          id="customization_requirement"
          name="customization_requirement"
          rows={2}
          variant="glass"
          className="min-h-[5.5rem]"
          placeholder="Fabric, size, finish, or other details"
          defaultValue={context.customizationRequirement || ""}
        />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Room size" htmlFor="room_size">
          <Input id="room_size" name="room_size" variant="glass" placeholder="Optional" />
        </FormField>
        <FormField label="Budget range (optional)" htmlFor="budget_range">
          <Input id="budget_range" name="budget_range" variant="glass" placeholder="Optional" />
        </FormField>
      </div>
      <FormField label="Preferred contact method" htmlFor="preferred_contact_method">
        <Select id="preferred_contact_method" name="preferred_contact_method" variant="glass" defaultValue="phone">
          <option value="phone">Phone</option>
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
        </Select>
      </FormField>
      <FormField label="Message" htmlFor="message">
        <Textarea id="message" name="message" rows={3} variant="glass" className="min-h-[6.5rem]" placeholder="Anything else we should know?" />
      </FormField>
      {error && (
        <p className="rounded-2xl px-4 py-2.5 text-sm text-red-700 bh-glass-subtle" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className={cn(
          "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-bh-green text-sm font-semibold text-white",
          "shadow-[0_10px_28px_rgba(27,61,47,0.22)] transition hover:bg-bh-green-light disabled:opacity-60 bh-focus-ring",
        )}
      >
        {pending ? "Sending request..." : "Request a Quote"}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
      <p className="text-center text-xs leading-relaxed text-bh-muted">
        Prefer WhatsApp?{" "}
        <Link href="/contact" className="font-medium text-bh-green underline-offset-2 hover:underline">
          Contact us
        </Link>
      </p>
    </form>
  );
}
