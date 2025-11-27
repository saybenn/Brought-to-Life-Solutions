// /lib/ordersTemp.ts
export type Order = {
  id: string;  // checkout.session.id
  slug?: string;
  mode: "payment" | "subscription";
  status: "created" | "paid";
  tier?: string;
  sku?: string;
  email?: string;
  customerId?: string;        // from webhook
  depositPriceId?: string;    // if one-time 50% flow
  remainderPriceId?: string;  // for final invoice
  quantity: number;
    meetingCompleted?: boolean;  // set true when Calendly event booked
  intakeSubmitted?: boolean;   // set true when intake submit succeeds
  agreement?: {
    version?: string;
    url?: string;
    timestamp?: number;
    ip?: string;
    ua?: string;
  };
receiptUrl?: string;         // from webhook (charge.receipt_url)
  hostedInvoiceUrl?: string;   // if paid via invoice
  createdAt: number;
  // optional lightweight intake snapshot
  intake?: Record<string, any>;};

const ORDERS = new Map<string, Order>();

export function putOrder(o: Order) { ORDERS.set(o.id, o); }
export function getOrder(id: string) { return ORDERS.get(id) || null; }

export function upsertOrder(id: string, patch: Partial<Order>) {
  const existing = ORDERS.get(id);
  if (!existing) return;
  ORDERS.set(id, { ...existing, ...patch });
}
export function markPaid(id: string, receiptUrl?: string) {
  const o = ORDERS.get(id);
  if (!o) return;
  o.status = "paid";
  if (receiptUrl) o.receiptUrl = receiptUrl;
  ORDERS.set(id, o);
}

export function setCustomer(id: string, customerId: string, email?: string) {
  const o = ORDERS.get(id); if (!o) return;
  o.customerId = customerId; if (email) o.email = email; ORDERS.set(id, o);
}
export function setMeetingCompletedByEmailSlug(email: string, slug: string) {
  for (const o of ORDERS.values()) {
    if (o.email?.toLowerCase() === email.toLowerCase() && o.slug === slug) {
      o.meetingCompleted = true;
      ORDERS.set(o.id, o);
    }
  }
}

export function setIntakeSubmitted(id: string, intakeData: Record<string, any>) {
  const o = ORDERS.get(id);
  if (!o) return;
  o.intakeSubmitted = true;
  o.intake = intakeData;
  ORDERS.set(id, o);
}

export function allOrders() {
  return Array.from(ORDERS.values()).sort((a, b) => b.createdAt - a.createdAt);
}
