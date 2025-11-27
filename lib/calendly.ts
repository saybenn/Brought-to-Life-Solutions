// /lib/calendly.ts
import {track} from './analytics'
export {};

declare global {
  interface Window {
    // GTM/GA4
    dataLayer?: Array<Record<string, any>> & {
      push?: (evt: Record<string, any>) => number;
    };

    // Calendly popup widget (loaded by their script)
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
      closePopupWidget?: () => void;
    };
  }
}

export function openCalendly(productSlug?: string) {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL!;
    track({ event: "generate_lead", method: "calendly", item_id: productSlug });
 if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({ url });
  } else {
    // Fallback: open Calendly scheduling page in a new tab
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
