import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Download, Loader2, Printer } from "lucide-react";
import { toast } from "sonner";

export const DASHBOARD_PDF_REQUEST_EVENT = "btls:dashboard-pdf-request";
export const DASHBOARD_PDF_DONE_EVENT = "btls:dashboard-pdf-done";

type DashboardTopbarProps = {
  siteId?: string;
  role?: string;
};

type PdfRequestDetail = {
  accepted: boolean;
};

const PDF_TIMEOUT_MS = 30000;

function getRoleLabel(role?: string): string {
  if (!role) return "Owner";

  return role
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getInitial(role?: string): string {
  const label = getRoleLabel(role);
  return label.charAt(0).toUpperCase() || "O";
}

function handlePrintReport() {
  if (typeof window === "undefined") return;
  window.print();
}

export default function DashboardTopbar({
  siteId,
  role,
}: DashboardTopbarProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDownloadTimeout = useCallback(() => {
    if (!timeoutRef.current) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  useEffect(() => {
    function handleDone() {
      clearDownloadTimeout();
      setIsDownloading(false);
    }

    window.addEventListener(DASHBOARD_PDF_DONE_EVENT, handleDone);

    return () => {
      clearDownloadTimeout();
      window.removeEventListener(DASHBOARD_PDF_DONE_EVENT, handleDone);
    };
  }, [clearDownloadTimeout]);

  const handleDownloadReport = useCallback(() => {
    if (typeof window === "undefined" || isDownloading) return;

    const detail: PdfRequestDetail = { accepted: false };

    setIsDownloading(true);

    window.dispatchEvent(
      new CustomEvent<PdfRequestDetail>(DASHBOARD_PDF_REQUEST_EVENT, {
        detail,
      }),
    );

    if (!detail.accepted) {
      setIsDownloading(false);
      toast.error("PDF export is not connected on this dashboard page.");
      return;
    }

    clearDownloadTimeout();

    timeoutRef.current = setTimeout(() => {
      setIsDownloading(false);
      timeoutRef.current = null;
      toast.error("PDF export took too long. Please try again.");
    }, PDF_TIMEOUT_MS);
  }, [clearDownloadTimeout, isDownloading]);

  return (
    <header className="dash-topbar">
      <Link
        href="/dashboard/analytics"
        className="dash-topbar__mobile-brand"
        aria-label="BTLS dashboard home"
      >
        <span className="dash-topbar__mobile-logo" aria-hidden="true">
          BT
        </span>

        <span className="dash-topbar__mobile-brand-copy">
          <span className="dash-topbar__mobile-title">BTLS</span>
          <span className="dash-topbar__mobile-subtitle">
            Funnel intelligence
          </span>
        </span>
      </Link>

      <div className="dash-topbar__actions" aria-label="Dashboard actions">
        <button
          type="button"
          className="dash-topbar__icon-button"
          aria-label="Print report"
          onClick={handlePrintReport}
          title="Print report"
        >
          <Printer size={17} strokeWidth={2} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="dash-topbar__secondary-action"
          onClick={handleDownloadReport}
          disabled={isDownloading}
          aria-busy={isDownloading}
          title="Download PDF"
        >
          {isDownloading ? (
            <Loader2
              className="dash-topbar__spinner"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          ) : (
            <Download size={16} strokeWidth={2} aria-hidden="true" />
          )}

          <span>{isDownloading ? "Preparing…" : "Download PDF"}</span>
        </button>

        <Link href="/" className="dash-topbar__primary-action">
          Back to site
        </Link>

        <div className="dash-topbar__user-chip" aria-label="Current workspace">
          <span className="dash-topbar__avatar" aria-hidden="true">
            {getInitial(role)}
          </span>

          <span className="dash-topbar__user-copy">
            <span className="dash-topbar__user-name">{getRoleLabel(role)}</span>
            <span className="dash-topbar__user-meta">
              {siteId ? `Site ${siteId}` : "BTLS workspace"}
            </span>
          </span>

          <ChevronDown
            className="dash-topbar__user-chevron"
            size={15}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  );
}
