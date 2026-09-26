"use client";

import { useTransition } from "react";
import { ArrowRight, Clock, Headphones, ShieldCheck } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { useQuote } from "@/components/providers/QuoteProvider";
import { cn } from "@/lib/cn";

const FURNITURE_TYPES = ["Living room", "Bedroom", "Dining", "Office", "Custom / other"];

const PERKS = [
  { icon: Clock, label: "Quick Response" },
  { icon: ShieldCheck, label: "No Obligation" },
  { icon: Headphones, label: "Expert Assistance" },
];

const fieldClass =
  "h-11 w-full min-w-0 rounded-full bg-white px-4 text-sm font-medium text-bh-charcoal placeholder:text-bh-muted/70 bh-focus-ring focus:outline-none focus:ring-2 focus:ring-white/50";

export function HomeQuoteStrip() {
  const { openQuote } = useQuote();
  const [pending, startTransition] = useTransition();

  return (
    <section className="bh-section bg-bh-warm-white">
      <PageContainer>
        <div
          className="overflow-hidden rounded-2xl px-5 py-6 shadow-[var(--bh-shadow-lg)] md:rounded-3xl md:px-7 md:py-7 lg:px-8 lg:py-8"
          style={{
            background: "linear-gradient(110deg, #2d5c46 0%, #1e4433 45%, #142e24 100%)",
          }}
        >
          <div
            className={cn(
              "flex flex-col gap-6 md:gap-7",
              "xl:grid xl:grid-cols-[minmax(10.5rem,12.75rem)_minmax(0,1fr)_auto] xl:items-center xl:gap-6 2xl:gap-8",
            )}
          >
            <div className="min-w-0 xl:max-w-[12.75rem]">
              <h2 className="font-display text-lg font-semibold leading-tight text-white sm:text-xl md:text-2xl">
                Get a Free Quote Today
              </h2>
              <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-white/85 sm:text-sm">
                Tell us your requirements and we&apos;ll get back to you soon.
              </p>
            </div>

            <form
              className={cn(
                "grid min-w-0 gap-3",
                "sm:grid-cols-2",
                "lg:grid-cols-2",
                "xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]",
              )}
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const furnitureType = fd.get("furniture_type")?.toString();
                startTransition(async () => {
                  openQuote({
                    furnitureRequirement: furnitureType || "Homepage quote request",
                  });
                });
              }}
            >
              <input
                name="full_name"
                placeholder="Full Name"
                required
                aria-label="Full name"
                className={fieldClass}
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                required
                aria-label="Phone number"
                className={fieldClass}
              />
              <select
                name="furniture_type"
                aria-label="Furniture type"
                defaultValue=""
                required
                className={cn(
                  fieldClass,
                  "appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-9",
                  "sm:col-span-2 lg:col-span-2 xl:col-span-1",
                )}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%236b7280' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                }}
              >
                <option value="" disabled>
                  Select Furniture Type
                </option>
                {FURNITURE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={pending}
                className={cn(
                  "inline-flex h-11 w-full min-w-0 items-center justify-center gap-1.5 rounded-full bg-white px-5 text-sm font-semibold text-bh-green shadow-sm transition hover:bg-bh-cream disabled:opacity-70 bh-focus-ring",
                  "sm:col-span-2 lg:col-span-2 xl:col-span-1 xl:w-auto xl:shrink-0 xl:whitespace-nowrap xl:px-6",
                )}
              >
                {pending ? "Sending..." : "Request Quote"}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </button>
            </form>

            <ul
              className={cn(
                "flex min-w-0 flex-col gap-3",
                "sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2",
                "xl:flex-col xl:items-stretch xl:gap-3 xl:pl-1",
              )}
            >
              {PERKS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm text-white/90">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="whitespace-nowrap text-[0.8125rem] sm:text-sm">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
