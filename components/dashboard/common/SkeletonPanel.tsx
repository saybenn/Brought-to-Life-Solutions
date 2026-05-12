type SkeletonPanelProps = {
  height?: number;
  className?: string;
};

export default function SkeletonPanel({
  height = 280,
  className,
}: SkeletonPanelProps) {
  return (
    <div
      className={`dash-skeleton-panel skeleton ${className ?? ""}`}
      aria-hidden="true"
      style={{ minHeight: height }}
    >
      <div className="dash-skeleton-panel__header">
        <div className="dash-skeleton-panel__title" />
        <div className="dash-skeleton-panel__description" />
      </div>

      <div className="dash-skeleton-panel__body" />
    </div>
  );
}
