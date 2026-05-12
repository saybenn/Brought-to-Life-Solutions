// lib/postmark.ts
import postmark from "postmark";

const token = process.env.POSTMARK_SERVER_TOKEN;

function client() {
  if (!token) throw new Error("Missing POSTMARK_SERVER_TOKEN");
  return new postmark.ServerClient(token);
}

export async function sendTemplateEmail(opts: {
  to: string;
  templateId: number;
  templateModel: Record<string, any>;
  from?: string;
  replyTo?: string;
  messageStream?: string;
}) {
  const from = opts.from ?? process.env.POSTMARK_FROM;
  if (!from) throw new Error("Missing POSTMARK_FROM");

  const res = await client().sendEmailWithTemplate({
    From: from,
    To: opts.to,
    TemplateId: opts.templateId,
    TemplateModel: opts.templateModel,
    ReplyTo: opts.replyTo,
    MessageStream: opts.messageStream,
  });

  return res; // includes MessageID
}

export async function sendPlainEmail(opts: {
  to: string;
  subject: string;
  textBody: string;
  from?: string;
  replyTo?: string;
  messageStream?: string;
}) {
  const from = opts.from ?? process.env.POSTMARK_FROM;
  if (!from) throw new Error("Missing POSTMARK_FROM");

  const res = await client().sendEmail({
    From: from,
    To: opts.to,
    Subject: opts.subject,
    TextBody: opts.textBody,
    ReplyTo: opts.replyTo,
    MessageStream: opts.messageStream,
  });

  return res; // includes MessageID
}