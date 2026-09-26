"use client";

import { useState, useTransition } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { updatePassword } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <AuthShell title="Choose a new password" subtitle="Use at least 8 characters.">
      {done ? (
        <p className="text-sm">
          Password updated. <Link href="/login" className="text-bh-green underline">Sign in</Link>
        </p>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setError("");
            const fd = new FormData(e.currentTarget);
            startTransition(async () => {
              const res = await updatePassword(fd);
              if (!res.ok) setError(res.error);
              else setDone(true);
            });
          }}
        >
          <FormField label="New password" htmlFor="password" required>
            <Input id="password" name="password" type="password" required minLength={8} />
          </FormField>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" loading={pending}>Update password</Button>
        </form>
      )}
    </AuthShell>
  );
}
