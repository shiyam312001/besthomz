"use client";

import { useState, useTransition } from "react";
import { ArrowRight } from "lucide-react";
import { submitContactMessage } from "@/app/actions/contact";
import { FormField } from "@/components/ui/FormField";
import { cn } from "@/lib/cn";

const fieldClass =
  "bh-input-glass h-12 w-full rounded-2xl border-0 px-4 text-sm text-bh-text shadow-[0_6px_20px_rgba(27,61,47,0.06)] placeholder:text-bh-muted/75";

export function ContactForm({ className }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitContactMessage(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSuccess(true);
      e.target.reset();
    });
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4 md:space-y-5", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Your Name" htmlFor="name" required>
          <input id="name" name="name" required className={fieldClass} placeholder="Your name" />
        </FormField>
        <FormField label="Email Address" htmlFor="email">
          <input id="email" name="email" type="email" className={fieldClass} placeholder="Email address" />
        </FormField>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Phone Number" htmlFor="phone">
          <input id="phone" name="phone" type="tel" className={fieldClass} placeholder="Phone number" />
        </FormField>
        <FormField label="Subject" htmlFor="subject">
          <select
            id="subject"
            name="subject"
            defaultValue="general"
            className={cn(fieldClass, "appearance-none")}
          >
            <option value="general">General enquiry</option>
            <option value="quote">Quote request</option>
            <option value="showroom">Showroom visit</option>
            <option value="custom">Custom furniture</option>
          </select>
        </FormField>
      </div>
      <FormField label="Message" htmlFor="message" required>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={cn(fieldClass, "min-h-[9.5rem] resize-y py-3")}
          placeholder="How can we help?"
        />
      </FormField>
      {error && (
        <p className="text-sm text-red-600" role="alert">{error}</p>
      )}
      {success && (
        <p className="text-sm font-medium text-bh-green" role="status">
          Thank you — we will get back to you soon.
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-bh-green text-sm font-semibold text-white shadow-[0_10px_28px_rgba(27,61,47,0.22)] transition hover:bg-bh-green-light disabled:opacity-60 bh-focus-ring"
      >
        {pending ? "Sending..." : "Send Message"}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}
