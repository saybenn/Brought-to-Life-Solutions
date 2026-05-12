// /components/dashboard/management/DashboardTagList.tsx

type DashboardTagListProps = {
  tags?: string[];
  maxVisible?: number;
};

export default function DashboardTagList({
  tags = [],
  maxVisible = 3,
}: DashboardTagListProps) {
  const visibleTags = tags.slice(0, maxVisible);
  const hiddenCount = Math.max(tags.length - visibleTags.length, 0);

  if (!tags.length) {
    return <span className="dash-tag-list__empty">No tags</span>;
  }

  return (
    <span className="dash-tag-list">
      {visibleTags.map((tag) => (
        <span key={tag} className="dash-tag-chip">
          {tag}
        </span>
      ))}

      {hiddenCount > 0 ? (
        <span className="dash-tag-chip dash-tag-chip--overflow">
          +{hiddenCount}
        </span>
      ) : null}
    </span>
  );
}
