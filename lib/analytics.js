// /lib/analytics.js (or wherever you prefer)
export function track(event, params = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...params,
  });
}
