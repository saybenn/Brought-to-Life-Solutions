// /lib/payments/client.ts
import { loadStripe } from "@stripe/stripe-js";

const getStripe = (() => {
  let p: Promise<any> | null = null;
  return () => (p ??= loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!));
})();

export async function startCheckoutBySlug(slug: string, opts?: {
  email?: string; qty?: number; agreement?: { version: string; url: string; timestamp: number };
}) {
  const r = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug, quantity: opts?.qty ?? 1, customerEmail: opts?.email, agreement: opts?.agreement }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error || "Checkout failed");
  const stripe = await getStripe();
  const { error } = await stripe.redirectToCheckout({ sessionId: j.sessionId });
  if (error) window.location.href = j.url; // fallback
}
