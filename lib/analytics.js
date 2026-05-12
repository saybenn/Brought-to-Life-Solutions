export function track(event, params = {}) {
  if (typeof window === "undefined") return;

  if (event === "click cta") {
    const { label, location, intent } = params || {};
    if (!label || !location || !intent) {
      console.warn("[track] blocked click cta missing params", params);
      return;
    }
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
