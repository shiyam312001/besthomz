"use client";

import { useEffect, useState } from "react";
import { Share2, MessageCircle } from "lucide-react";
import { productEnquiryMessage, whatsAppHref } from "@/lib/utils/whatsapp";
import { useToast } from "@/components/providers/ToastProvider";

export function ProductShareButtons({ productName, productUrl }) {
  const { toast } = useToast();
  const [clientUrl, setClientUrl] = useState(productUrl ?? "");

  useEffect(() => {
    if (!productUrl && typeof window !== "undefined") {
      setClientUrl(window.location.href);
    }
  }, [productUrl]);

  const shareUrl = productUrl || clientUrl;

  async function share() {
    const url = shareUrl || (typeof window !== "undefined" ? window.location.href : "");
    if (!url) return;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: productName, url });
        return;
      } catch {
        /* cancelled */
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      toast("Product link copied");
    }
  }

  const wa = shareUrl
    ? whatsAppHref(productEnquiryMessage({ productName, productUrl: shareUrl }))
    : undefined;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm bh-glass-panel bh-focus-ring hover:shadow-[0_10px_28px_rgba(27,61,47,0.1)]"
      >
        <Share2 className="h-4 w-4" /> Share
      </button>
      <a
        href={wa || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm bh-glass-panel bh-focus-ring hover:shadow-[0_10px_28px_rgba(27,61,47,0.1)]"
        aria-disabled={!wa}
        onClick={(e) => {
          if (!wa) e.preventDefault();
        }}
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp enquiry
      </a>
    </div>
  );
}
