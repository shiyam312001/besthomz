import { ContactView } from "@/components/contact/ContactView";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Visit Our Chennai Furniture Showroom",
  description: "Visit Best Homz at 41 Nelson Manickam Road, Aminjikarai, Chennai 600094. Call or WhatsApp for furniture quotes and showroom appointments.",
  path: "/contact",
  keywords: [
    "Best Homz Chennai address",
    "furniture showroom Aminjikarai",
    "furniture showroom Nelson Manickam Road",
    "furniture shop Chennai",
  ],
});

export default function ContactPage() {
  return <ContactView />;
}
