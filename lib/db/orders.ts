// /lib/db/orders.ts
import type Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase/server";
type UTM = Record<string, string | undefined> | undefined;

export async function createOrderRow(input: {
  session_id: string;
  offer_id: string;
  offer_category: string;
  payment_plan: boolean;
  installments: number;
  cta_location?: string;
  entry_path?: string;
  referrer?: string;
  utm?: UTM;
  customer_email?: string;
}) {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .insert({
      session_id: input.session_id,
      offer_id: input.offer_id,
      offer_category: input.offer_category,
      payment_plan: input.payment_plan,
      installments: input.installments,
      cta_location: input.cta_location || null,
      entry_path: input.entry_path || null,
      referrer: input.referrer || null,
      utm_source: input.utm?.utm_source || null,
      utm_medium: input.utm?.utm_medium || null,
      utm_campaign: input.utm?.utm_campaign || null,
      utm_content: input.utm?.utm_content || null,
      utm_term: input.utm?.utm_term || null,
      customer_email: input.customer_email || null,
      status: "created",
    })
    .select("id")
    .single();

  if (error) throw error;
  return data; // { id }
}

export async function findOrderBySessionId(session_id: string) {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("session_id", session_id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function findOrderBySubscriptionId(stripe_subscription_id: string) {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("stripe_subscription_id", stripe_subscription_id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function attachCheckoutSessionToOrder(input: {
  session_id: string; // internal session uuid
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  customer_email: string | null;
  markPaid?: boolean;
}) {
  const patch: Record<string, any> = {
    stripe_checkout_session_id: input.stripe_checkout_session_id,
    stripe_payment_intent_id: input.stripe_payment_intent_id,
    stripe_subscription_id: input.stripe_subscription_id,
    stripe_customer_id: input.stripe_customer_id,
    customer_email: input.customer_email,
    updated_at: new Date().toISOString(),
  };

  if (input.markPaid) {
    patch.status = "paid";
    patch.paid_at = new Date().toISOString();
  }

  const { error } = await supabaseAdmin
    .from("orders")
    .update(patch)
    .eq("session_id", input.session_id);

  if (error) throw error;
}

export async function markOrderPaidBySubscriptionId(stripe_subscription_id: string) {
  const { error } = await supabaseAdmin
    .from("orders")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", stripe_subscription_id);

  if (error) throw error;
}