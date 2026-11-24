import { site } from "@/config/site";
import { absoluteUrl, defaultOg } from "@/lib/seo/site-url";

function compactText(value, maxLength) {
  if (!value) return "";
  const text = String(value).replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
  image,
  keywords = [],
  type = "website",
}) {
  const url = path ? absoluteUrl(path) : absoluteUrl("/");
  const desc = compactText(description || site.description, 160);
  const pageTitle = compactText(title || site.name, 60);
  const og = defaultOg();
  const imgUrl = image ? (image.startsWith("http") ? image : absoluteUrl(image)) : null;
  const images = imgUrl ? [{ url: imgUrl, alt: pageTitle || site.name }] : og.images;
  const keywordList = [...new Set(keywords.filter(Boolean).map((keyword) => String(keyword).trim()))];

  return {
    title: pageTitle,
    description: desc,
    ...(keywordList.length ? { keywords: keywordList } : {}),
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle ? `${pageTitle} | ${site.name}` : site.name,
      description: desc,
      url,
      siteName: og.siteName,
      locale: og.locale,
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle || site.name,
      description: desc,
      images: images.map((i) => i.url),
    },
  };
}

export function buildProductSeoKeywords(product) {
  const category = product.categories?.name || product.category_name || "";
  const name = product.name || "Furniture";
  return [
    name,
    `${name} Chennai`,
    `${name} Aminjikarai`,
    `${category} Chennai`,
    `buy ${category || "furniture"} in Chennai`,
    `${category || "furniture"} showroom Chennai`,
    `${category || "furniture"} showroom Aminjikarai`,
    `premium ${category || "furniture"} Chennai`,
    `custom ${category || "furniture"} Chennai`,
    `best ${category || "furniture"} Chennai`,
  ];
}
