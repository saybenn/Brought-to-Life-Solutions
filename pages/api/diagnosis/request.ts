import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import { getSiteConfig } from "@/lib/siteConfig/getSiteConfig";
import { DiagnosisRequestBodySchema } from "@/lib/dashboard/schemas/diagnosis";

type DiagnosisRequestSuccess = {
  ok: true;
  status: "created";
};

type DiagnosisRequestError = {
  error: string;
  details?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DiagnosisRequestSuccess | DiagnosisRequestError>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const parsedBody = DiagnosisRequestBodySchema.safeParse(req.body ?? {});

    if (!parsedBody.success) {
      return res.status(400).json({
        error: "Invalid diagnosis request input.",
        details: parsedBody.error.issues.map((issue) => issue.message).join(" "),
      });
    }

    const supabase = supabaseServer(req, res);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return res.status(401).json({
        error: "Unauthorized.",
      });
    }

    const siteContext = await getSiteConfig(req, res);
    const siteId = siteContext.siteId;

    if (!siteId) {
      return res.status(400).json({
        error: "Unable to resolve site context.",
      });
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: existingRequest, error: existingError } = await supabase
      .from("diagnosis_requests")
      .select("id, requested_at")
      .eq("site_id", siteId)
      .gte("requested_at", thirtyDaysAgo.toISOString())
      .order("requested_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existingError) {
      throw existingError;
    }

    if (existingRequest) {
      return res.status(409).json({
        error: "A diagnosis request already exists for this site in the last 30 days.",
      });
    }

    const note = parsedBody.data.note?.trim() ? parsedBody.data.note.trim() : null;

    const { error: insertError } = await supabase.from("diagnosis_requests").insert({
      site_id: siteId,
      requested_by: user.id,
      requested_at: new Date().toISOString(),
      status: "requested",
      note,
    });

    if (insertError) {
      throw insertError;
    }

    return res.status(200).json({
      ok: true,
      status: "created",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown diagnosis request error.";

    console.error("diagnosis request error", error);

    return res.status(500).json({
      error: "Failed to create diagnosis request.",
      details: message,
    });
  }
}