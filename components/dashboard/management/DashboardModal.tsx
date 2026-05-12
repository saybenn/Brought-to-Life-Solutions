// /components/dashboard/management/DashboardModal.tsx

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

type DashboardModalProps = {
  title: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
};

export default function DashboardModal({
  title,
  description,
  open,
  onClose,
  children,
  footer,
}: DashboardModalProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="dash-modal-backdrop" role="presentation">
      <section
        className="dash-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dash-modal-title"
        aria-describedby={description ? "dash-modal-description" : undefined}
      >
        <header className="dash-modal-header">
          <div>
            <h2 id="dash-modal-title" className="dash-modal-title">
              {title}
            </h2>

            {description ? (
              <p id="dash-modal-description" className="dash-modal-description">
                {description}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            className="dash-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </header>

        <div className="dash-modal-body">{children}</div>

        {footer ? (
          <footer className="dash-modal-footer">{footer}</footer>
        ) : null}
      </section>
    </div>
  );
}
