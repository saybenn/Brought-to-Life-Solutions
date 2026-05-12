type ChartTooltipPayloadItem = {
  name?: string;
  value?: string | number;
  color?: string;
  dataKey?: string;
  payload?: Record<string, unknown>;
};

type ChartTooltipProps = {
  active?: boolean;
  payload?: ChartTooltipPayloadItem[];
  label?: string;
  formatter?: (
    value: number | string,
    name: string,
    raw?: Record<string, unknown>,
  ) => [string, string];
  labelFormatter?: (label: string) => string;
};

export default function ChartTooltip({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        border: "1px solid var(--dash-border-strong)",
        background: "var(--dash-surface-3)",
        borderRadius: "14px",
        padding: "12px 14px",
        boxShadow: "var(--dash-shadow-soft)",
        minWidth: 180,
      }}
    >
      {label ? (
        <div
          style={{
            color: "var(--dash-text-1)",
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          {labelFormatter ? labelFormatter(label) : label}
        </div>
      ) : null}

      <div style={{ display: "grid", gap: 6 }}>
        {payload.map((item, index) => {
          const rawValue = item.value ?? "";
          const rawName = item.name ?? item.dataKey ?? "Value";

          const [displayValue, displayName] = formatter
            ? formatter(rawValue, rawName, item.payload)
            : [String(rawValue), rawName];

          return (
            <div
              key={`${rawName}-${index}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div
                style={{
                  color: "var(--dash-text-2)",
                  fontSize: 12,
                }}
              >
                {displayName}
              </div>

              <div
                style={{
                  color: "var(--dash-text-1)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {displayValue}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
