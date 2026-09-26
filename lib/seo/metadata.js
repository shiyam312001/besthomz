import { site } from "@/config/site";
import { absoluteUrl, defaultOg } from "@/lib/seo/site-url";

export function pageMetadata({ title, description, path, noIndex = false, image }) {
  const url = path ? absoluteUrl(path) : absoluteUrl("/");
  const desc = description || site.description;
  const og = defaultOg();
  const imgUrl = image ? (image.startsWith("http") ? image : absoluteUrl(image)) : null;
  const images = imgUrl ? [{ url: imgUrl, alt: title || site.name }] : og.images;

  return {
    title,
    description: desc,
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: title ? `${title} | ${site.name}` : site.name,
      description: desc,
      url,
      siteName: og.siteName,
      locale: og.locale,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: title || site.name,
      description: desc,
      images: images.map((i) => i.url),
    },
  };
}
