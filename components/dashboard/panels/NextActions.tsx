import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Send,
  Sparkles,
  Star,
  Target,
  TrendingDown,
} from "lucide-react";
import { toast } from "sonner";

import DashboardPanelShell from "@/components/dashboard/layout/DashboardPanelShell";
import PanelHeader from "@/components/ui/PanelHeader";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";

import { DASHBOARD_COPY } from "@/lib/dashboard/copy";
import type { NextActionsPanelProps } from "@/lib/dashboard/payload";

type DiagnosisRequestSuccess = {
  ok: true;
  status: "created";
};

type DiagnosisRequestFailure = {
  ok: false;
  error: string;
  details?: string;
};

type DiagnosisRequestResponse =
  | DiagnosisRequestSuccess
  | DiagnosisRequestFailure;

type DiagnosisRequestResponseBody = {
  ok?: boolean;
  status?: "created";
  error?: string;
  details?: string;
};

type RequestState = "idle" | "submitting" | "created" | "conflict" | "error";

type InsightItem = {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
  tone: "accent" | "warning" | "muted";
  icon: "star" | "warning" | "target" | "lightbulb";
};

async function requestDiagnosis(
  note?: string,
): Promise<DiagnosisRequestResponse> {
  const response = await fetch("/api/diagnosis/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      note && note.trim().length > 0 ? { note: note.trim() } : {},
    ),
  });

  const body = (await response
    .json()
    .catch(() => null)) as DiagnosisRequestResponseBody | null;

  if (!response.ok) {
    return {
      ok: false,
      error: body?.error ?? "Failed to request diagnosis.",
      details: body?.details,
    };
  }

  return {
    ok: true,
    status: "created",
  };
}

function InsightIcon({ type }: { type: InsightItem["icon"] }) {
  const iconProps = {
    size: 17,
    strokeWidth: 2,
    "aria-hidden": true,
  } as const;

  switch (type) {
    case "star":
      return <Star {...iconProps} />;
    case "warning":
      return <TrendingDown {...iconProps} />;
    case "target":
      return <Target {...iconProps} />;
    case "lightbulb":
      return <Lightbulb {...iconProps} />;
    default:
      return <Lightbulb {...iconProps} />;
  }
}

function buildInsightItems(data: NextActionsPanelProps["data"]): InsightItem[] {
  const items: InsightItem[] = [];

  if (data.autoDiagnosis) {
    items.push({
      key: "auto-diagnosis",
      eyebrow: "Diagnosis Type",
      title: data.autoDiagnosis.diagnosisType,
      body: `${data.autoDiagnosis.reason} ${data.autoDiagnosis.recommendation}`,
      tone: "accent",
      icon: "lightbulb",
    });
  }

  if (data.topWinner) {
    items.push({
      key: "top-winner",
      eyebrow: "Top Winner",
      title: "Strongest current signal",
      body: data.topWinner,
      tone: "accent",
      icon: "star",
    });
  }

  if (data.underperformer) {
    items.push({
      key: "underperformer",
      eyebrow: "Underperformer",
      title: "Weakest current signal",
      body: data.underperformer,
      tone: "warning",
      icon: "warning",
    });
  }

  if (data.nextStep) {
    items.push({
      key: "next-step",
      eyebrow: "Next Step",
      title: "Recommended action",
      body: data.nextStep,
      tone: "muted",
      icon: "target",
    });
  }

  if (data.manual) {
    items.push({
      key: "manual-note",
      eyebrow: "Manual Note",
      title: "Operator guidance",
      body: data.manual,
      tone: "muted",
      icon: "lightbulb",
    });
  }

  return items;
}

function getButtonLabel(requestState: RequestState): string {
  switch (requestState) {
    case "submitting":
      return "Requesting…";
    case "created":
      return "Request Submitted";
    case "conflict":
      return "Already Requested";
    default:
      return "Request Diagnosis";
  }
}

function getRequestMessageClass(requestState: RequestState): string {
  if (requestState === "created") return "is-created";
  if (requestState === "conflict") return "is-conflict";
  if (requestState === "error") return "is-error";
  return "";
}

export default function NextActions({ data }: NextActionsPanelProps) {
  const [requestState, setRequestState] = useState<RequestState>("idle");
  const [requestMessage, setRequestMessage] = useState<string | null>(null);

  const insightItems = useMemo(() => buildInsightItems(data), [data]);
  const hasContent = insightItems.length > 0;

  async function handleDiagnosisRequest() {
    if (requestState === "submitting" || requestState === "created") return;

    setRequestState("submitting");
    setRequestMessage(null);

    const result = await requestDiagnosis();

    if (result.ok) {
      setRequestState("created");
      setRequestMessage("Diagnosis request submitted.");
      toast.success("Diagnosis request submitted.");
      return;
    }

    const message =
      result.details || result.error || "Failed to request diagnosis.";

    if (result.error.toLowerCase().includes("already exists")) {
      setRequestState("conflict");
      setRequestMessage(
        "A diagnosis request has already been submitted in the last 30 days.",
      );
      toast.info("A diagnosis request already exists for this site.");
      return;
    }

    setRequestState("error");
    setRequestMessage(message);
    toast.error(message);
  }

  if (!hasContent) {
    return (
      <DashboardPanelShell surface="base" className="dash-support-panel">
        <PanelHeader
          title={DASHBOARD_COPY.nextActions.title}
          description={DASHBOARD_COPY.nextActions.description}
          tooltip={DASHBOARD_COPY.nextActions.tooltip}
        />

        <EmptyState description="No next actions are available right now." />
      </DashboardPanelShell>
    );
  }

  return (
    <DashboardPanelShell surface="base" className="dash-support-panel">
      <PanelHeader
        title={DASHBOARD_COPY.nextActions.title}
        description={DASHBOARD_COPY.nextActions.description}
        tooltip={DASHBOARD_COPY.nextActions.tooltip}
        actions={
          data.autoDiagnosis ? (
            <Badge tone="accent">Diagnosis ready</Badge>
          ) : null
        }
      />

      <div className="dash-next-actions-list">
        {insightItems.map((item) => (
          <article
            key={item.key}
            className={`dash-next-action dash-next-action--${item.tone}`}
          >
            <div className="dash-next-action__icon">
              <InsightIcon type={item.icon} />
            </div>

            <div className="dash-next-action__body">
              <div className="dash-next-action__eyebrow">{item.eyebrow}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="dash-diagnosis-request-card">
        <div className="dash-diagnosis-request-card__icon" aria-hidden="true">
          {requestState === "created" ? (
            <CheckCircle2 size={18} strokeWidth={2} />
          ) : requestState === "error" ? (
            <AlertTriangle size={18} strokeWidth={2} />
          ) : (
            <Sparkles size={18} strokeWidth={2} />
          )}
        </div>

        <div className="dash-diagnosis-request-card__copy">
          <h3>Request BTLS diagnosis</h3>
          <p>
            Ask for a focused review based on this month’s funnel and traffic
            signals.
          </p>

          {requestMessage ? (
            <div
              className={`dash-request-message ${getRequestMessageClass(
                requestState,
              )}`}
            >
              {requestMessage}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          className="dash-diagnosis-request-card__button"
          onClick={handleDiagnosisRequest}
          disabled={requestState === "submitting" || requestState === "created"}
        >
          <Send size={15} strokeWidth={2} aria-hidden="true" />
          {getButtonLabel(requestState)}
        </button>
      </div>
    </DashboardPanelShell>
  );
}
