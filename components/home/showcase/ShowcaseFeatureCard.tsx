import type { LucideIcon } from "lucide-react";

type ShowcaseFeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function ShowcaseFeatureCard({
  icon: Icon,
  title,
  description,
}: ShowcaseFeatureCardProps) {
  return (
    <article className="showcase-feature-card">
      <div className="showcase-feature-card__icon" aria-hidden="true">
        <Icon size={18} strokeWidth={1.9} />
      </div>

      <div className="showcase-feature-card__copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}
