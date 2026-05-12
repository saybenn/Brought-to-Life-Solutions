import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "default" | "accent" | "warning" | "danger" | "muted";
  className?: string;
};

export default function Badge({
  children,
  tone = "default",
  className,
}: BadgeProps) {
  return (
    <span className={`dash-badge dash-badge--${tone} ${className ?? ""}`}>
      {children}
    </span>
  );
}
