// /lib/db/installmentPlans.ts
import { supabaseAdmin } from "../supabase/server";

export async function upsertInstallmentPlan(input: {
  order_id: string;
  stripe_subscription_id: string;
  installments: number;
}) {
  // One plan per subscription id
  const { data, error } = await supabaseAdmin
    .from("installment_plans")
    .upsert(
      {
        order_id: input.order_id,
        stripe_subscription_id: input.stripe_subscription_id,
        installments: input.installments,
        status: "active",
      },
      { onConflict: "stripe_subscription_id" }
    )
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function updateInstallmentProgress(input: {
  stripe_subscription_id: string;
  paid_count: number;
}) {
  const { error } = await supabaseAdmin
    .from("installment_plans")
    .update({
      paid_count: input.paid_count,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", input.stripe_subscription_id);

  if (error) throw error;
}

export async function markInstallmentCompleted(input: {
  stripe_subscription_id: string;
}) {
  const { error } = await supabaseAdmin
    .from("installment_plans")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", input.stripe_subscription_id);

  if (error) throw error;
}
