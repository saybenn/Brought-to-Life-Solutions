type DashboardInsightBannerProps = {
  title?: string;
  lines: string[];
};

export default function DashboardInsightBanner({
  title = "Implementation Notes",
  lines,
}: DashboardInsightBannerProps) {
  if (!lines.length) return null;

  return (
    <aside className="dash-insight-banner">
      <div className="dash-insight-banner__eyebrow">{title}</div>

      <div className="dash-insight-banner__body">
        {lines.map((line, index) => (
          <p key={`${line}-${index}`} className="dash-insight-banner__line">
            {line}
          </p>
        ))}
      </div>
    </aside>
  );
}
