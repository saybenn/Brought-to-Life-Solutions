// /components/home/showcase/ShowcaseMetricStrip.tsx

type ShowcaseMetric = {
  label: string;
  value: string;
};

type ShowcaseMetricStripProps = {
  items: ShowcaseMetric[];
};

export default function ShowcaseMetricStrip({
  items,
}: ShowcaseMetricStripProps) {
  if (!items.length) return null;

  return (
    <div className="showcase-metric-strip">
      {items.map((item) => (
        <div key={item.label} className="showcase-metric-strip__item">
          <p className="showcase-metric-strip__label">{item.label}</p>
          <p className="showcase-metric-strip__value">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
