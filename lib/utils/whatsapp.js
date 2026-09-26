import { site } from "@/config/site";

export function whatsAppHref(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

export function productEnquiryMessage({ productName, productUrl }) {
  const lines = [
    "Hello Best Homz,",
    productName ? `I am interested in ${productName}.` : "I would like to enquire about your furniture.",
    productUrl ? productUrl : "",
    "I would like to know more about this product.",
  ].filter(Boolean);
  return lines.join("\n");
}
