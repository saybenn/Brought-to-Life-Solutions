import type { NextApiRequest, NextApiResponse } from "next";

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(opts: {
  req: NextApiRequest;
  res: NextApiResponse;
  keyPrefix: string;
  limit: number;
  windowMs: number;
}) {
  const ip =
    (opts.req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    opts.req.socket.remoteAddress ||
    "unknown";

  const key = `${opts.keyPrefix}:${ip}`;
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true };
  }

  if (entry.count >= opts.limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    opts.res.setHeader("Retry-After", retryAfter.toString());
    return { ok: false, retryAfter };
  }

  entry.count += 1;
  hits.set(key, entry);
  return { ok: true };
}