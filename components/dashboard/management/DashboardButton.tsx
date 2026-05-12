// /components/dashboard/management/DashboardButton.tsx

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LinkProps } from "next/link";

type DashboardButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type DashboardButtonSize = "sm" | "md";

type DashboardButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: DashboardButtonVariant;
  size?: DashboardButtonSize;
};

type DashboardLinkButtonProps = LinkProps & {
  children: ReactNode;
  variant?: Exclude<DashboardButtonVariant, "danger">;
  size?: DashboardButtonSize;
  className?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

function getButtonClassName({
  variant = "secondary",
  size = "md",
  className,
}: {
  variant?: DashboardButtonVariant;
  size?: DashboardButtonSize;
  className?: string;
}) {
  return [
    "dash-button",
    `dash-button--${variant}`,
    size === "sm" ? "dash-button--sm" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function DashboardButton({
  variant = "secondary",
  size = "md",
  className,
  type = "button",
  ...props
}: DashboardButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={getButtonClassName({ variant, size, className })}
    />
  );
}

export function DashboardLinkButton({
  variant = "secondary",
  size = "md",
  className,
  children,
  ...props
}: DashboardLinkButtonProps) {
  return (
    <Link
      {...props}
      className={getButtonClassName({ variant, size, className })}
    >
      {children}
    </Link>
  );
}
