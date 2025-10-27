// /lib/utm.js
export function captureUTMs() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];
  let found = false;
  keys.forEach((k) => {
    if (params.has(k)) {
      localStorage.setItem(k, params.get(k));
      found = true;
    }
  });
  if (found) console.log("UTMs stored!");
}
