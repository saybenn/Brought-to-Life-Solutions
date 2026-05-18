// /components/home/showcase/ShowcaseFeatureCard.tsx

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
        <Icon size={19} strokeWidth={2.25} />
      </div>

      <div className="showcase-feature-card__body">
        <h3 className="showcase-feature-card__title">{title}</h3>
        <p className="showcase-feature-card__description">{description}</p>
      </div>
    </article>
  );
}
