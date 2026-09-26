import { ContactHero } from "@/components/contact/ContactHero";
import { ContactMain } from "@/components/contact/ContactMain";
import { ContactShowroomBanner } from "@/components/contact/ContactShowroomBanner";
import { ContactFaqHelp } from "@/components/contact/ContactFaqHelp";

export function ContactView() {
  return (
    <div className="bg-bh-warm-white">
      <ContactHero />
      <ContactMain />
      <ContactShowroomBanner />
      <ContactFaqHelp />
    </div>
  );
}
