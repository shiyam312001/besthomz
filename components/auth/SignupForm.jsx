"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { signUp } from "@/app/actions/auth";
import { getGuestWishlistSlugs } from "@/lib/commerce/client-storage";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";

export function SignupForm({ next = "/account" }) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        const fd = new FormData(e.currentTarget);
        fd.set("next", next);
        fd.set("guest_wishlist", JSON.stringify(getGuestWishlistSlugs()));
        startTransition(async () => {
          const res = await signUp(fd);
          if (res?.ok === false) setError(res.error);
        });
      }}
    >
      <FormField label="Full name" htmlFor="full_name" required><Input id="full_name" name="full_name" required /></FormField>
      <FormField label="Phone" htmlFor="phone"><Input id="phone" name="phone" type="tel" /></FormField>
      <FormField label="Email" htmlFor="email" required><Input id="email" name="email" type="email" required /></FormField>
      <FormField label="Password" htmlFor="password" required><Input id="password" name="password" type="password" required minLength={8} /></FormField>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" className="w-full" loading={pending}>Create account</Button>
      <p className="text-center text-sm text-bh-muted">
        Already have an account? <Link href={`/login?next=${encodeURIComponent(next)}`} className="text-bh-green underline">Sign in</Link>
      </p>
    </form>
  );
}
