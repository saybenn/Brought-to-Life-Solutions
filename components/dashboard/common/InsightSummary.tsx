type InsightSummaryProps = {
  primaryText: string;
  secondaryText?: string;
};

export default function InsightSummary({
  primaryText,
  secondaryText,
}: InsightSummaryProps) {
  return (
    <div
      style={{
        border: "1px solid var(--dash-border-soft)",
        borderRadius: "var(--dash-radius-lg)",
        padding: "16px 18px",
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          color: "var(--dash-text-1)",
          fontSize: 15,
          lineHeight: 1.6,
          fontWeight: 600,
        }}
      >
        {primaryText}
      </div>

      {secondaryText ? (
        <div
          style={{
            marginTop: 6,
            color: "var(--dash-text-2)",
            fontSize: 13,
            lineHeight: 1.55,
          }}
        >
          {secondaryText}
        </div>
      ) : null}
    </div>
  );
}
