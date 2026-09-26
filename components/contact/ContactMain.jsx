import { Clock, Headphones, Mail, MapPin, Phone } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/config/site";

const DETAILS = [
  { icon: MapPin, title: "Our Address", text: site.address.full },
  {
    icon: Phone,
    title: "Call Us",
    text: `${site.phone}\nMon – Sat: 10:00 AM – 8:00 PM`,
    href: site.phoneHref,
  },
  { icon: Mail, title: "Email Us", text: site.email, href: site.emailHref },
  {
    icon: Clock,
    title: "Business Hours",
    text: "Mon – Sat: 10:00 AM – 8:00 PM\nSun: 10:00 AM – 6:00 PM",
  },
  { icon: Headphones, title: "Customer Support", text: "Quote help, delivery & installation queries welcome." },
];

export function ContactMain() {
  return (
    <section className="relative z-10 bg-bh-warm-white pb-14 pt-0 md:pb-16 lg:pb-20">
      <PageContainer className="mt-[40px]">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="min-h-[28rem] rounded-2xl p-6 bh-glass-panel md:min-h-[30rem] md:rounded-3xl md:p-8 lg:p-9">
            <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-[1.75rem] lg:text-3xl">
              Send Us a Message
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-bh-muted">
              Fill in the form and we&apos;ll respond as soon as possible.
            </p>
            <div className="mt-6 md:mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="relative min-h-[28rem] overflow-hidden rounded-2xl p-6 bh-glass-subtle md:min-h-[30rem] md:rounded-3xl md:p-8 lg:p-9">
            <h2 className="font-display text-2xl font-semibold text-bh-charcoal md:text-[1.75rem] lg:text-3xl">
              Get in Touch
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-bh-muted">
              Reach us by phone, email or visit our Chennai showroom.
            </p>
            <ul className="mt-8 space-y-5 md:mt-10 md:space-y-6">
              {DETAILS.map(({ icon: Icon, title, text, href }) => (
                <li key={title} className="flex gap-3 md:gap-4">
                  <span className="bh-icon-badge-trust shrink-0 text-bh-green">
                    <Icon className="h-4 w-4 md:h-[1.15rem] md:w-[1.15rem]" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="min-w-0 text-sm">
                    <p className="font-semibold text-bh-charcoal">{title}</p>
                    {href ? (
                      <a href={href} className="mt-0.5 block whitespace-pre-line text-bh-muted hover:text-bh-green bh-focus-ring">
                        {text}
                      </a>
                    ) : (
                      <p className="mt-0.5 whitespace-pre-line text-bh-muted">{text}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div
              className="pointer-events-none absolute -right-4 bottom-2 hidden h-48 w-40 opacity-[0.14] lg:block"
              aria-hidden
            >
              <svg viewBox="0 0 120 160" fill="none" className="h-full w-full text-bh-green">
                <path
                  d="M60 8C45 40 20 55 12 85c-6 22 8 48 28 62 5-28 18-48 35-65 12-12 28-22 45-28-18-8-38-12-60-46z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
