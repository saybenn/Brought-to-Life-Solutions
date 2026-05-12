// /components/dashboard/management/DashboardField.tsx

import type { ReactNode } from "react";

type DashboardFieldProps = {
  label: string;
  children: ReactNode;
  className?: string;
  hint?: string;
};

export default function DashboardField({
  label,
  children,
  className,
  hint,
}: DashboardFieldProps) {
  return (
    <label className={`dash-field ${className ?? ""}`}>
      <span className="dash-field__label">{label}</span>
      {children}
      {hint ? <span className="dash-field__hint">{hint}</span> : null}
    </label>
  );
}
