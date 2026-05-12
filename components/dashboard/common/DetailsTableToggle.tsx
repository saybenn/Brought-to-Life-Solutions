type DetailsTableToggleProps = {
  open: boolean;
  onToggle: () => void;
  labelOpen?: string;
  labelClosed?: string;
};

export default function DetailsTableToggle({
  open,
  onToggle,
  labelOpen = "Hide details",
  labelClosed = "View details",
}: DetailsTableToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="dash-details-toggle"
      style={{
        height: 36,
        padding: "0 12px",
        borderRadius: 999,
        border: "1px solid var(--dash-border-soft)",
        background: "rgba(255,255,255,0.03)",
        color: "var(--dash-text-2)",
        fontSize: 13,
        cursor: "pointer",
      }}
    >
      {open ? labelOpen : labelClosed}
    </button>
  );
}
