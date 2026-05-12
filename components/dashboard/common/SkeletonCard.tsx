type SkeletonCardProps = {
  className?: string;
};

export default function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={`dash-skeleton-card skeleton ${className ?? ""}`}
      aria-hidden="true"
    >
      <div className="dash-skeleton-card__top">
        <div className="dash-skeleton-card__icon" />
        <div className="dash-skeleton-card__label" />
      </div>

      <div className="dash-skeleton-card__value" />
      <div className="dash-skeleton-card__subtext" />
    </div>
  );
}
