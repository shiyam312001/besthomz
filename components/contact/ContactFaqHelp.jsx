"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Headphones, Minus, Plus, Users } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { site } from "@/config/site";

const FAQS = [
  {
    q: "How do I request a quote?",
    a: "Browse products or use the Get Quote button anywhere on the site. Share your requirements and our team will respond with options and pricing.",
  },
  {
    q: "Do you offer custom furniture sizes?",
    a: "Yes — many collections support custom dimensions, materials and finishes. Visit Customize or speak with showroom staff for guidance.",
  },
  {
    q: "What are your delivery areas?",
    a: "We deliver across Chennai and surrounding areas. Delivery timelines depend on product and customization — we confirm when you place your order or quote.",
  },
  {
    q: "Is installation included?",
    a: "Installation can be arranged for applicable items. Mention your needs when requesting a quote and we will include it in your plan.",
  },
  {
    q: "Can I visit the showroom without an appointment?",
    a: "Walk-ins are welcome during business hours. For dedicated consultation time, use Book a Visit on the contact page.",
  },
  {
    q: "What payment options do you accept?",
    a: "We accept major payment methods for confirmed orders. Your quote will outline payment terms before you commit.",
  },
];

const PERKS = [
  { icon: Clock, label: "Quick Response" },
  { icon: Headphones, label: "Friendly Support" },
  { icon: Users, label: "Trusted by Families" },
];

const HEADER_BLOCK = "min-h-[4.75rem] md:min-h-[5.25rem]";

export function ContactFaqHelp() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-bh-sage-muted/25 pb-16 pt-8 md:pb-20 md:pt-10 lg:pb-24">
      <PageContainer>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-x-10 lg:gap-y-8">
          <div className={`lg:col-span-8 ${HEADER_BLOCK}`}>
            <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-bh-muted">
              Quick answers to common questions about quotes, delivery and visits.
            </p>
          </div>

          <div className={`hidden lg:col-span-4 lg:block ${HEADER_BLOCK}`}>
            <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-3xl">Still Need Help?</h2>
            <p className="mt-2 text-sm leading-relaxed text-bh-muted">
              Speak with our team for personalised furniture advice.
            </p>
          </div>

          <ul className="space-y-3 lg:col-span-8 lg:row-start-2">
            {FAQS.map((item, index) => {
              const isOpen = open === index;
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="flex w-full min-h-[3.25rem] items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left bh-glass-panel transition hover:shadow-[0_16px_40px_-12px_rgba(27,61,47,0.1)] bh-focus-ring md:rounded-3xl md:px-6"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-bh-charcoal md:text-base">{item.q}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bh-sage-muted/90 text-bh-green shadow-[0_4px_12px_rgba(27,61,47,0.06)]">
                      {isOpen ? (
                        <Minus className="h-4 w-4" strokeWidth={2} aria-hidden />
                      ) : (
                        <Plus className="h-4 w-4" strokeWidth={2} aria-hidden />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mx-1 mt-2 rounded-2xl px-5 py-3 bh-glass-subtle md:mx-2 md:px-6">
                      <p className="text-sm leading-relaxed text-bh-muted">{item.a}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="bh-glass-panel flex flex-col overflow-hidden rounded-3xl lg:col-span-4 lg:row-start-2 lg:min-h-full">
            <div className="relative h-44 w-full shrink-0 md:h-48 lg:h-[12rem]">
              <Image
                src="/BestHomz/Homepage/banners/16-banner-vision-armchair.png"
                alt=""
                fill
                className="object-cover object-center"
                sizes="33vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-7 lg:p-8">
              <div className="lg:hidden">
                <h3 className="font-display text-xl font-semibold text-bh-charcoal md:text-2xl">Still Need Help?</h3>
                <p className="mt-2 text-sm text-bh-muted">Speak with our team for personalised furniture advice.</p>
              </div>
              <div className="mt-5 flex flex-col gap-3 lg:mt-0">
                <Link
                  href={site.phoneHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bh-green text-sm font-semibold text-white shadow-[0_10px_28px_rgba(27,61,47,0.22)] bh-focus-ring"
                >
                  Call Us
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/95 text-sm font-semibold text-bh-charcoal shadow-[0_8px_22px_rgba(27,61,47,0.1)] backdrop-blur-sm bh-focus-ring hover:bg-white"
                >
                  Chat on WhatsApp
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <ul className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:flex-wrap sm:gap-4 lg:pt-6">
                {PERKS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-xs font-medium text-bh-muted">
                    <span className="bh-icon-badge-trust text-bh-green">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
