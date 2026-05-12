// pages/api/webhooks/calendly.ts
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendTemplateEmail } from "@/lib/postmark";

export const config = { api: { bodyParser: false } };

function env(name: string, required = true) {
  const v = process.env[name];
  if (!v && required) throw new Error(`Missing ${name}`);
  return v || "";
}

async function readRawBody(req: NextApiRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
}

function safeJsonParse<T>(raw: string): T | null {
  try { return JSON.parse(raw) as T; } catch { return null; }
}

function parseSignatureHeader(headerValue: string) {
  const parts = Object.fromEntries(
    headerValue.split(",").map((p) => {
      const [k, ...rest] = p.split("=");
      return [k.trim(), rest.join("=").trim()];
    })
  );
  const t = Number(parts["t"]);
  const v1 = parts["v1"];
  if (!Number.isFinite(t) || !v1) return null;
  return { t, v1 };
}

function timingSafeEqualHex(a: string, b: string) {
  const aBuf = Buffer.from(a, "hex");
  const bBuf = Buffer.from(b, "hex");
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function verifyCalendlySignature(opts: {
  rawBody: Buffer;
  signatureHeader: string;
  signingKey: string;
  toleranceSeconds?: number;
}) {
  const { rawBody, signatureHeader, signingKey, toleranceSeconds = 180 } = opts;
  const parsed = parseSignatureHeader(signatureHeader);
  if (!parsed) return { ok: false, reason: "bad_signature_header" as const };

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parsed.t) > toleranceSeconds) {
    return { ok: false, reason: "timestamp_out_of_tolerance" as const };
  }

  const signedPayload = `${parsed.t}.${rawBody.toString("utf8")}`;
  const computed = crypto.createHmac("sha256", signingKey).update(signedPayload).digest("hex");

  if (!timingSafeEqualHex(computed, parsed.v1)) {
    return { ok: false, reason: "signature_mismatch" as const };
  }
  return { ok: true as const };
}

type CalendlyWebhook = { event?: string; payload?: any };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const rawBody = await readRawBody(req);

  const signingKey = env("CALENDLY_WEBHOOK_SIGNING_KEY", false);
  const sigHeader = (req.headers["calendly-webhook-signature"] as string | undefined);

  if (signingKey) {
    if (!sigHeader) return res.status(401).json({ error: "Missing signature" });
    const v = verifyCalendlySignature({ rawBody, signatureHeader: sigHeader, signingKey });
    if (!v.ok) {
      console.error("calendly_webhook_signature_failed", v.reason);
      return res.status(401).json({ error: "Invalid signature" });
    }
  }

  const parsed = safeJsonParse<CalendlyWebhook>(rawBody.toString("utf8"));
  if (!parsed?.event) return res.status(400).json({ error: "Missing event" });

  if (parsed.event !== "invitee.created") return res.status(200).json({ ok: true, ignored: true });

  const siteId = env("DEFAULT_SITE_ID");
  const siteName = env("SITE_NAME");
  const adminBase = env("ADMIN_BASE_URL");
  const internalTo = env("POSTMARK_INTERNAL_TO");

  const inviteeEmail =
    parsed.payload?.invitee?.email ||
    parsed.payload?.email ||
    parsed.payload?.invitee_email;

  if (!inviteeEmail) return res.status(400).json({ error: "Missing invitee email" });
  const email = String(inviteeEmail).trim().toLowerCase();

  const calendlyInviteeUri =
    parsed.payload?.invitee?.uri ||
    parsed.payload?.invitee?.resource?.uri ||
    parsed.payload?.invitee_uri ||
    null;

  const calendlyEventUri =
    parsed.payload?.scheduled_event?.uri ||
    parsed.payload?.event?.uri ||
    parsed.payload?.event_uri ||
    null;

  const scheduledAtRaw =
    parsed.payload?.scheduled_event?.start_time ||
    parsed.payload?.event?.start_time ||
    parsed.payload?.start_time ||
    null;

  const scheduledAt = scheduledAtRaw ? new Date(String(scheduledAtRaw)).toISOString() : null;

  // Update DB and fetch customer id + name (so emails have names)
  const { data: customer, error } = await supabaseAdmin
    .from("customers")
    .update({
      scheduled: true,
      scheduled_at: scheduledAt,
      calendly_event_uri: calendlyEventUri,
      calendly_invitee_uri: calendlyInviteeUri,
      updated_at: new Date().toISOString(),
    })
    .eq("site_id", siteId)
    .eq("email", email)
    .select("id, name")
    .maybeSingle();

  if (error) {
    console.error("calendly_webhook_update_failed", error);
    return res.status(500).json({ error: "DB update failed" });
  }

  const customerId = customer?.id ? String(customer.id) : "";
  const adminLink = customerId ? `${adminBase.replace(/\/$/, "")}/customers/${customerId}` : "";

  // Internal "call booked" email (always; best-effort)
  try {
    const tplCallBooked = Number(env("POSTMARK_TEMPLATE_CALL_BOOKED_INTERNAL"));
    await sendTemplateEmail({
      to: internalTo,
      templateId: tplCallBooked,
      templateModel: {
        site_name: siteName,
        booked_at: new Date().toISOString(),
        email,
        customer_id: customerId || null,
        scheduled_at: scheduledAt || null,
        calendly_event_uri: calendlyEventUri || null,
        calendly_invitee_uri: calendlyInviteeUri || null,
        admin_link: adminLink || null,
      },
    });
  } catch (e) {
    console.error("call_booked_internal_send_failed", e);
  }

  // Optional: also send your own booking_confirmed to the client
  const SEND_CLIENT_BOOKING_EMAIL = process.env.SEND_CLIENT_BOOKING_EMAIL === "true";
  if (SEND_CLIENT_BOOKING_EMAIL && customerId) {
    try {
      const tplBookedClient = Number(env("POSTMARK_TEMPLATE_BOOKING_CONFIRMED"));
      await sendTemplateEmail({
        to: email,
        templateId: tplBookedClient,
        templateModel: {
          site_name: siteName,
          full_name: customer?.name || "there",
          scheduled_at: scheduledAt || null,
          reply_to_email: internalTo,
        },
      });
    } catch (e) {
      console.error("booking_confirmed_client_send_failed", e);
    }
  }

  return res.status(200).json({ ok: true, matched: Boolean(customer?.id) });
}