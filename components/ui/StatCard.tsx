import {
  AlertTriangle,
  CheckCircle2,
  Filter,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

type StatCardIcon = "users" | "target" | "check" | "filter" | "alert" | "trend";

type StatCardProps = {
  label: string;
  value: string;
  subtext?: string;
  tone?: "default" | "accent" | "warning" | "muted";
  className?: string;
  compact?: boolean;
  icon?: StatCardIcon;
};

function StatIcon({ icon }: { icon?: StatCardIcon }) {
  if (!icon) return null;

  const iconProps = {
    size: 18,
    strokeWidth: 2,
    "aria-hidden": true,
  } as const;

  switch (icon) {
    case "users":
      return <Users {...iconProps} />;
    case "target":
      return <Target {...iconProps} />;
    case "check":
      return <CheckCircle2 {...iconProps} />;
    case "filter":
      return <Filter {...iconProps} />;
    case "alert":
      return <AlertTriangle {...iconProps} />;
    case "trend":
      return <TrendingUp {...iconProps} />;
    default:
      return null;
  }
}

export default function StatCard({
  label,
  value,
  subtext,
  tone = "default",
  className,
  compact = false,
  icon,
}: StatCardProps) {
  const classes = [
    "dash-stat-card",
    `dash-stat-card--${tone}`,
    compact ? "dash-stat-card--compact" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes}>
      <div className="dash-stat-card__top">
        {icon ? (
          <div className="dash-stat-card__icon">
            <StatIcon icon={icon} />
          </div>
        ) : null}

        <div className="dash-stat-card__label">{label}</div>
      </div>

      <div className="dash-stat-card__value" title={value}>
        {value}
      </div>

      {subtext ? (
        <div className="dash-stat-card__subtext" title={subtext}>
          {subtext}
        </div>
      ) : null}
    </article>
  );
}
