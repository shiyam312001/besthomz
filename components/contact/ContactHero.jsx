import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { site } from "@/config/site";

const QUICK = [
  { icon: Phone, label: "Call Us Anytime", href: site.phoneHref },
  { icon: MessageCircle, label: "Chat With Us", href: `https://wa.me/${site.whatsapp}` },
  { icon: Mail, label: "Email Us", href: site.emailHref },
  { icon: MapPin, label: "Visit Our Showroom", href: "#showroom" },
];

export function ContactHero() {
  return (
    <section className="relative min-h-[20rem] overflow-hidden md:min-h-[26rem] lg:min-h-[30rem]">
      <Image
        src="/BestHomz/Homepage/hero/01-hero-sofa.png"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bh-warm-white/20 via-bh-green-dark/40 to-bh-green-dark/20" />
      <p
        className="pointer-events-none absolute right-[5%] top-[14%] hidden max-w-[11rem] rotate-[-3deg] font-display text-lg italic text-white drop-shadow-[0_2px_12px_rgba(27,61,47,0.4)] md:block lg:right-[8%] lg:text-xl"
        aria-hidden
      >
        Better Homes, Brighter Tomorrows
      </p>
      <PageContainer className="relative flex min-h-[20rem] flex-col justify-between py-6 md:min-h-[26rem] md:py-10 lg:min-h-[30rem] lg:py-12">
        <div className="max-w-xl rounded-2xl p-4 bh-glass-hero-content md:rounded-3xl md:p-7 lg:p-8">
          <p className="bh-type-eyebrow">Contact us</p>
          <h1 className="bh-type-h1 mt-2">We&apos;re Here To Help</h1>
          <p className="mt-2 max-w-lg bh-type-body text-bh-muted md:mt-3">
            Questions about furniture, quotes or showroom visits? Reach out — our Chennai team is ready to assist.
          </p>
        </div>

        <div className="mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 md:mt-10 md:gap-4">
          {QUICK.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="group flex flex-col items-center gap-2.5 rounded-2xl px-2 py-3 text-center bh-focus-ring md:py-4"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <span className="bh-icon-badge-trust bg-white/95 text-bh-green shadow-[0_10px_28px_rgba(27,61,47,0.12)] transition group-hover:scale-[1.04]">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-xs font-medium leading-tight text-white drop-shadow-[0_1px_4px_rgba(27,61,47,0.35)] md:text-[11px]">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
