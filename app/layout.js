import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo/metadata";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  ...pageMetadata({ title: "Premium Furniture in Chennai", description: site.description, path: "/" }),
  title: {
    default: `${site.name} | Premium Furniture`,
    template: `%s | ${site.name}`,
  },
  icons: {
    icon: site.logo,
    apple: site.logo,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${dmSans.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans font-normal antialiased bh-type-body text-bh-text">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
