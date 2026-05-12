import { useId, useState } from "react";

type InfoTooltipProps = {
  content: string;
  label?: string;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
};

export default function InfoTooltip({
  content,
  label = "More information",
  side = "top",
  className,
}: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  return (
    <span className={`dash-info-wrap ${className ?? ""}`}>
      <button
        type="button"
        aria-label={label}
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((prev) => !prev)}
        className="dash-info-trigger"
      >
        i
      </button>

      {open ? (
        <span
          id={tooltipId}
          role="tooltip"
          className={`dash-tooltip dash-tooltip--${side}`}
        >
          {content}
        </span>
      ) : null}
    </span>
  );
}
