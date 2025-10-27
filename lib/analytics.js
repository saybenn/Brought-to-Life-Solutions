export function track(event, params = {}) {
  // Make sure there's a mailbox
  window.dataLayer = window.dataLayer || [];
  // Drop our note into it
  window.dataLayer.push({ event, ...params });
}
