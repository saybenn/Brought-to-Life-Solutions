type MetricRowProps = {
  label: string;
  value: string;
  muted?: boolean;
};

export default function MetricRow({
  label,
  value,
  muted = false,
}: MetricRowProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        padding: "8px 0",
        borderBottom: "1px solid var(--dash-border-soft)",
      }}
    >
      <span
        style={{
          color: muted ? "var(--dash-text-3)" : "var(--dash-text-2)",
          fontSize: 14,
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: "var(--dash-text-1)",
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {value}
      </span>
    </div>
  );
}
