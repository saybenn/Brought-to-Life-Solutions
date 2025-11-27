// /lib/invoices/client.ts  (Flow 3 submit helper)
export async function requestDepositInvoice(payload: {
  slug: string;
  name: string;
  email: string;
  business?: string;
  notes?: string;
  quantity?: number;
}) {
  const r = await fetch("/api/invoices/deposit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error || "Could not create invoice");
  return j; // { invoiceId, hosted_invoice_url }
}
