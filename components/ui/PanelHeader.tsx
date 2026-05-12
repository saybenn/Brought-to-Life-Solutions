import type { ReactNode } from "react";
import InfoTooltip from "@/components/ui/InfoTooltip";

type PanelHeaderProps = {
  title: string;
  description?: string;
  tooltip?: string;
  actions?: ReactNode;
  className?: string;
};

export default function PanelHeader({
  title,
  description,
  tooltip,
  actions,
  className,
}: PanelHeaderProps) {
  return (
    <div className={`dash-panel-header ${className ?? ""}`}>
      <div className="dash-panel-header__copy">
        <div className="dash-panel-header__title-row">
          <h2 className="dash-panel-header__title">{title}</h2>
          {tooltip ? <InfoTooltip content={tooltip} /> : null}
        </div>
        {description ? (
          <p className="dash-panel-header__description">{description}</p>
        ) : null}
      </div>

      {actions ? (
        <div className="dash-panel-header__actions">{actions}</div>
      ) : null}
    </div>
  );
}
