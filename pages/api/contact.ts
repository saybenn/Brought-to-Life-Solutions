// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendPlainEmail, sendTemplateEmail } from "@/lib/postmark";

type ContactPath = "routing" | "support" | "general";

type Body = {
  path: ContactPath;
  fullName: string;
  email: string;
  businessName?: string;
  website?: string;
  goal?: string;
  message: string;
  utm?: Record<string, string> | null;
};

function isEmail(x: string) {
  return /^\S+@\S+\.\S+$/.test(x);
}

function env(name: string, required = true) {
  const v = process.env[name];
  if (!v && required) throw new Error(`Missing ${name}`);
  return v || "";
}

function validate(b: Body): string | null {
  if (!b?.path) return "Missing path.";
  if (!b.fullName?.trim()) return "Missing fullName.";
  if (!b.email?.trim() || !isEmail(b.email.trim())) return "Invalid email.";
  if (!b.message?.trim()) return "Missing message.";

  if ((b.path === "routing" || b.path === "support") && !b.businessName?.trim()) {
    return "Missing businessName.";
  }
  if (b.path === "routing" && !b.goal?.trim()) return "Missing goal.";
  return null;
}

function fmtUtm(utm: Record<string, string> | null | undefined) {
  if (!utm) return "";
  try {
    return JSON.stringify(utm, null, 2);
  } catch {
    return String(utm);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = req.body as Body;
  const v = validate(body);
  if (v) return res.status(400).json({ error: v });

  const siteId = env("DEFAULT_SITE_ID");
  const siteName = env("SITE_NAME");
  const baseUrl = env("NEXT_PUBLIC_SITE_URL");
  const adminBase = env("ADMIN_BASE_URL");
  const internalTo = env("POSTMARK_INTERNAL_TO");

  const email = body.email.trim().toLowerCase();

  const notesLines = [
    `Inquiry type: ${body.path}`,
    body.businessName?.trim() ? `Business: ${body.businessName.trim()}` : null,
    body.path === "routing" ? `Primary goal: ${body.goal || "—"}` : null,
    body.website?.trim() ? `Website: ${body.website.trim()}` : null,
    body.message?.trim() ? `Message: ${body.message.trim()}` : null,
  ].filter(Boolean) as string[];

  const upsertRow = {
    site_id: siteId,
    email,

    name: body.fullName.trim(),
    phone: null,

    notes: notesLines.join("\n"),
    tags: ['contact_form'],

    contact_path: body.path,
    goal: body.goal?.trim() || null,
    message: body.message.trim(),
    utm: body.utm || null,

    scheduled: false,
    scheduled_at: null,
    calendly_event_uri: null,
    calendly_invitee_uri: null,
  };

  const { data: customer, error: upsertErr } = await supabaseAdmin
    .from("customers")
    .upsert(upsertRow, { onConflict: "site_id,email" })
    .select("id, name, email, contact_path, goal, message, notes")
    .single();

  if (upsertErr || !customer?.id) {
    console.error("customer_upsert_failed", upsertErr);
    return res.status(500).json({ error: "Failed to create customer record" });
  }

  const customerId = String(customer.id);
  const adminLink = `${adminBase.replace(/\/$/, "")}/customers/${customerId}`;

  // routing-only schedule link (point them to your success page w/embed)
  const scheduleUrl =
    customer.contact_path === "routing"
      ? `${baseUrl.replace(/\/$/, "")}/contact/success`
      : "";

  // Email timing copy: never blank
  const expectedResponseWindow = "one business day";
  const replyToEmail = internalTo;

  // Send emails (never break UX)
  let userMessageId: string | null = null;
  let internalMessageId: string | null = null;

  try {
    const tplContact = Number(env("POSTMARK_TEMPLATE_CONTACT_CONFIRMATION"));
    const tplInternal = Number(env("POSTMARK_TEMPLATE_INTERNAL_LEAD"));

    const userRes = await sendTemplateEmail({
      to: email,
      templateId: tplContact,
      templateModel: {
        site_name: siteName,
        full_name: customer.name,
        contact_path: customer.contact_path,
        goal: customer.goal || null,
        message: customer.message,
        schedule_url: scheduleUrl || null,
        expected_response_window: expectedResponseWindow,
        reply_to_email: replyToEmail,
      },
    });

    const internalRes = await sendTemplateEmail({
      to: internalTo,
      templateId: tplInternal,
      templateModel: {
        site_name: siteName,
        submitted_at: new Date().toISOString(),
        full_name: customer.name,
        email,
        contact_path: customer.contact_path,
        goal: customer.goal || null,
        message: customer.message,
        notes: customer.notes || null,
        utm: body.utm ? fmtUtm(body.utm) : null,
        customer_id: customerId,
        admin_link: adminLink,
      },
    });

    // @ts-ignore
    userMessageId = userRes?.MessageID ?? null;
    // @ts-ignore
    internalMessageId = internalRes?.MessageID ?? null;
  } catch (e) {
    console.error("postmark_send_failed", e);
    // fallback: optional; keep it minimal
    try {
      await sendPlainEmail({
        to: email,
        subject: "We received your message",
        textBody: `Thanks — we received your request.\n\nWe’ll reply within ${expectedResponseWindow}.\n`,
      });
    } catch {}
  }

  if (userMessageId || internalMessageId) {
    const { error: updateErr } = await supabaseAdmin
      .from("customers")
      .update({
        postmark_message_id_user: userMessageId,
        postmark_message_id_internal: internalMessageId,
      })
      .eq("id", customerId)
      .eq("site_id", siteId);

    if (updateErr) console.error("postmark_ids_update_failed", updateErr);
  }

  return res.status(200).json({ customer_id: customerId });
}