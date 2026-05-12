type EmptyStateProps = {
  title?: string;
  description: string;
  compact?: boolean;
  className?: string;
};

export default function EmptyState({
  title = "No data available",
  description,
  compact = false,
  className,
}: EmptyStateProps) {
  const classes = [
    "dash-empty-state",
    compact ? "is-compact" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="status" aria-live="polite">
      <div className="dash-empty-state__title">{title}</div>
      <div className="dash-empty-state__description">{description}</div>
    </div>
  );
}
