"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { IconFacebook, IconInstagram, IconYoutube } from "@/components/icons/SocialIcons";
import { footerCompanyLinks, footerQuickLinks, site } from "@/config/site";
import { Logo } from "@/components/brand/Logo";
import { PageContainer } from "@/components/layout/PageContainer";
import { cn } from "@/lib/cn";

function FooterColumn({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-black/10 md:border-none">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-bh-dark md:pointer-events-none md:py-0 md:text-[15px] bh-focus-ring rounded-md"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {title}
        <ChevronDown className={cn("h-4 w-4 md:hidden", open && "rotate-180")} aria-hidden />
      </button>
      <div className={cn("pb-5 md:pb-0", open ? "block" : "hidden md:block")}>{children}</div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto bg-bh-cream pb-safe-nav text-bh-dark md:pb-0">
      <PageContainer className="py-12 md:py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <div className="lg:col-span-3">
            <Logo showTagline />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bh-muted">{site.description}</p>
            <div className="mt-5 flex gap-2">
              {[
                { href: site.social.facebook, label: "Facebook", Icon: IconFacebook },
                { href: site.social.instagram, label: "Instagram", Icon: IconInstagram },
                { href: site.social.youtube, label: "YouTube", Icon: IconYoutube },
              ].map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/5 text-bh-dark transition hover:bg-bh-green hover:text-white hover:border-bh-green bh-focus-ring"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Quick Links">
              <ul className="space-y-2.5 md:mt-4">
                {footerQuickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-bh-muted transition hover:text-bh-green bh-focus-ring">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Company">
              <ul className="space-y-2.5 md:mt-4">
                {footerCompanyLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-bh-muted transition hover:text-bh-green bh-focus-ring">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>

          <div className="lg:col-span-3">
            <FooterColumn title="Contact Info" defaultOpen>
              <ul className="space-y-3 md:mt-4 text-sm text-bh-muted">
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bh-green" aria-hidden />
                  <span>
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                  </span>
                </li>
                <li>
                  <Link href={site.phoneHref} className="inline-flex items-center gap-2 hover:text-bh-green bh-focus-ring">
                    <Phone className="h-4 w-4 text-bh-green" aria-hidden />
                    {site.phone}
                  </Link>
                </li>
                <li>
                  <Link href={site.emailHref} className="inline-flex items-center gap-2 hover:text-bh-green bh-focus-ring">
                    <Mail className="h-4 w-4 text-bh-green" aria-hidden />
                    {site.email}
                  </Link>
                </li>
              </ul>
            </FooterColumn>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-bh-dark md:text-[15px]">Join Our Newsletter</h3>
            <p className="mt-2 text-sm text-bh-muted">Inspiration and updates for your home.</p>
            <form className="relative mt-4" onSubmit={(e) => e.preventDefault()}>
              <label className="sr-only" htmlFor="footer-email">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email address"
                className="h-11 w-full rounded-full border border-black/10 bg-white px-4 pr-12 text-sm text-bh-charcoal placeholder:text-bh-muted focus:border-bh-green focus:outline-none focus:ring-2 focus:ring-bh-green/20"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 flex h-9 w-9 items-center justify-center rounded-full bg-bh-green text-white hover:bg-bh-green-light bh-focus-ring"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </PageContainer>

      <div className="border-t border-black/10">
        <PageContainer className="flex flex-col items-center justify-between gap-2 py-4 text-center text-xs text-bh-muted sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{site.footerTagline}</p>
        </PageContainer>
      </div>
    </footer>
  );
}