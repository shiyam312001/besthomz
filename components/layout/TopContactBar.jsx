import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { IconFacebook, IconInstagram, IconYoutube } from "@/components/icons/SocialIcons";
import { site } from "@/config/site";
import { PageContainer } from "@/components/layout/PageContainer";

const socialIcons = [
  { href: site.social.instagram, label: "Instagram", Icon: IconInstagram },
  { href: site.social.facebook, label: "Facebook", Icon: IconFacebook },
  { href: site.social.youtube, label: "YouTube", Icon: IconYoutube },
];

export function TopContactBar() {
  return (
    <div className="hidden bg-bh-green text-white md:block">
      <PageContainer className="grid h-[var(--bh-topbar-height)] grid-cols-[1fr_auto_1fr] items-center gap-4 text-[11px] lg:text-xs">
        <p className="inline-flex min-w-0 items-center gap-1.5 truncate">
          <MapPin className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
          <span className="truncate">{site.address.full}</span>
        </p>
        <div className="flex shrink-0 items-center justify-center gap-4 lg:gap-6">
          <Link
            href={site.phoneHref}
            className="inline-flex items-center gap-1.5 whitespace-nowrap hover:opacity-90 bh-focus-ring rounded-sm"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {site.phone}
          </Link>
          <Link
            href={site.emailHref}
            className="hidden items-center gap-1.5 whitespace-nowrap hover:opacity-90 bh-focus-ring rounded-sm lg:inline-flex"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            {site.email}
          </Link>
        </div>
        <div className="flex items-center justify-end gap-2">
          {socialIcons.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="rounded-full p-1 hover:bg-white/10 bh-focus-ring"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}

/** Compact bar for mobile — phone only */
export function TopContactBarMobile() {
  return (
    <div className="bg-bh-green text-white md:hidden">
      <PageContainer className="flex h-8 items-center justify-center text-[11px]">
        <Link href={site.phoneHref} className="font-medium bh-focus-ring rounded-sm">
          {site.phone}
        </Link>
      </PageContainer>
    </div>
  );
}
