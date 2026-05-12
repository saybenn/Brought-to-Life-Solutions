// 1) Create this file:
// /components/ui/Tooltip.tsx

import { useEffect, useId, useMemo, useState } from "react";

type Placement = "top" | "right" | "bottom" | "left";

type TooltipProps = {
  label: string; // what screen readers announce
  title?: string; // optional bold title line
  body: string | React.ReactNode; // main tooltip content
  placement?: Placement;
  maxWidth?: number; // px
  className?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function Tooltip({
  label,
  title,
  body,
  placement = "top",
  maxWidth = 320,
  className,
}: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Prevent touch “sticky hover” issues
  const isTouch = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      matchMedia?.("(hover: none) and (pointer: coarse)")?.matches ?? false
    );
  }, []);

  return (
    <span
      className={`twrap ${className ?? ""}`}
      style={{ ["--tmax" as any]: `${maxWidth}px` }}
    >
      <button
        type="button"
        className="tbtn"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => {
          // on touch devices, keep open only if user taps again
          if (isTouch) return;
          setOpen(false);
        }}
        onMouseEnter={() => !isTouch && setOpen(true)}
        onMouseLeave={() => !isTouch && setOpen(false)}
        onFocus={() => !isTouch && setOpen(true)}
      >
        <span aria-hidden="true" className="ticon">
          i
        </span>
      </button>

      {open && (
        <div
          id={id}
          role="tooltip"
          className={`tip tip-${placement}`}
          onMouseEnter={() => !isTouch && setOpen(true)}
          onMouseLeave={() => !isTouch && setOpen(false)}
        >
          {title ? <div className="tip-title">{title}</div> : null}
          <div className="tip-body">{body}</div>
        </div>
      )}
    </span>
  );
}
