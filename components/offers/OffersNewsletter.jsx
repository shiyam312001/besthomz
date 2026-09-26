"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { useToast } from "@/components/providers/ToastProvider";

export function OffersNewsletter() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  return (
    <section className="bg-bh-warm-white pb-16 pt-2 md:pb-20">
      <PageContainer>
        <div className="relative overflow-hidden rounded-3xl bh-shadow-soft">
          <div className="absolute inset-0 bg-gradient-to-br from-bh-green-dark via-bh-green to-bh-green-light" />
          <Image
            src="/BestHomz/assets/banners/011-newsletter-green-chair.png"
            alt=""
            fill
            className="object-cover object-right opacity-35 mix-blend-soft-light"
            sizes="100vw"
          />
          <div className="relative grid gap-6 px-6 py-10 md:grid-cols-2 md:items-center md:px-10 md:py-12">
            <div>
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">Don&apos;t Miss Out!</h2>
              <p className="mt-2 max-w-md text-sm text-white/88 md:text-base">
                Subscribe for new offers, showroom events and furniture inspiration.
              </p>
            </div>
            <form
              className="flex max-w-md gap-2 md:ml-auto"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.trim()) {
                  toast("Please enter your email", { variant: "error" });
                  return;
                }
                toast("Thanks — you're on the list!");
                setEmail("");
              }}
            >
              <label className="sr-only" htmlFor="offers-newsletter-email">Email</label>
              <input
                id="offers-newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="h-11 min-w-0 flex-1 rounded-full px-4 text-sm text-bh-charcoal bh-glass-panel placeholder:text-bh-muted bh-focus-ring"
              />
              <button
                type="submit"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bh-green-dark text-white shadow-[0_6px_18px_rgba(27,61,47,0.25)] bh-focus-ring"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
