// /lib/ui/scrollToId.ts
export function scrollToId(id: string, behavior: ScrollBehavior = "smooth") {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior, block: "start" });
}
