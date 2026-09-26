"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { signInWithPassword } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { getGuestWishlistSlugs } from "@/lib/commerce/client-storage";

export function LoginForm({ next = "/account" }) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.set("next", next);
    formData.set("guest_wishlist", JSON.stringify(getGuestWishlistSlugs()));
    startTransition(async () => {
      const result = await signInWithPassword(formData);
      if (result?.ok === false) setError(result.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField label="Email" htmlFor="email" required>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </FormField>
      <FormField label="Password" htmlFor="password" required>
        <Input id="password" name="password" type="password" required autoComplete="current-password" />
      </FormField>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <Button type="submit" className="w-full" loading={pending}>Sign in</Button>
      <p className="text-center text-sm text-bh-muted">
        <Link href="/forgot-password" className="text-bh-green underline">Forgot password?</Link>
      </p>
      <p className="text-center text-sm text-bh-muted">
        New here? <Link href={`/signup?next=${encodeURIComponent(next)}`} className="text-bh-green underline">Create account</Link>
      </p>
    </form>
  );
}
