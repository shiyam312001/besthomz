"use client";

import { useState, useTransition } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { requestPasswordReset } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <AuthShell title="Reset password" subtitle="We will email you a secure reset link.">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          setMessage("");
          const fd = new FormData(e.currentTarget);
          startTransition(async () => {
            const res = await requestPasswordReset(fd);
            if (!res.ok) setError(res.error);
            else setMessage("Check your email for the reset link.");
          });
        }}
      >
        <FormField label="Email" htmlFor="email" required><Input id="email" name="email" type="email" required /></FormField>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-bh-green">{message}</p>}
        <Button type="submit" className="w-full" loading={pending}>Send reset link</Button>
      </form>
    </AuthShell>
  );
}
