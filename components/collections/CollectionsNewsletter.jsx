"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { useToast } from "@/components/providers/ToastProvider";
import { cn } from "@/lib/cn";

export function CollectionsNewsletter({ className }) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  return (
    <section className={cn("bg-bh-warm-white pb-16 pt-2 md:pb-20", className)}>
      <PageContainer>
        <div className="relative overflow-hidden rounded-2xl bh-shadow-soft md:rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-bh-green-dark via-bh-green to-bh-green-light" />
          <Image
            src="/BestHomz/assets/banners/011-newsletter-green-chair.png"
            alt=""
            fill
            className="object-cover object-right opacity-35 mix-blend-soft-light"
            sizes="100vw"
          />
          <div className="relative grid gap-6 px-5 py-8 sm:px-6 sm:py-10 md:grid-cols-2 md:items-center md:gap-8 md:px-10 md:py-12">
            <div className="text-[#fff]">
              <h2 className="bh-type-h2 !text-[#fff]">Stay Inspired</h2>
              <p className="mt-2 max-w-md bh-type-body !text-[#fff] opacity-90">
                Get collection launches, styling ideas and showroom news in your inbox.
              </p>
            </div>
            <form
              className="w-full md:ml-auto md:max-w-md"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.trim()) {
                  toast("Please enter your email", { variant: "error" });
                  return;
                }
                toast("Thanks for subscribing!");
                setEmail("");
              }}
            >
              <label className="sr-only" htmlFor="collections-newsletter-email">Email address</label>
              <div
                className={cn(
                  "flex w-full gap-0 overflow-hidden rounded-full bg-[#fff] p-1 shadow-[0_10px_32px_rgba(0,0,0,0.14)]",
                  "md:gap-3 md:overflow-visible md:rounded-none md:bg-transparent md:p-0 md:shadow-none",
                )}
              >
                <input
                  id="collections-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className={cn(
                    "h-11 min-w-0 flex-1 rounded-full bg-transparent px-4 font-sans text-[length:var(--bh-text-body)] text-bh-charcoal outline-none placeholder:text-bh-muted/80",
                    "md:h-12 md:flex-1 md:bg-[#fff] md:px-5 md:shadow-[0_10px_36px_rgba(0,0,0,0.12)] md:ring-1 md:ring-white/80",
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    "inline-flex h-11 shrink-0 items-center justify-center gap-1 rounded-full px-4 text-[length:var(--bh-text-small)] font-semibold bh-focus-ring sm:gap-2 sm:px-5",
                    "bg-bh-green text-white shadow-[0_6px_16px_rgba(27,61,47,0.25)]",
                    "md:h-12 md:min-w-[10.5rem] md:px-6 md:text-[length:var(--bh-text-body)]",
                    "md:border md:border-white/45 md:bg-white/12 md:text-[#fff] md:shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:backdrop-blur-md",
                    "md:hover:bg-white/20",
                  )}
                >
                  Subscribe
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                </button>
              </div>
            </form>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
