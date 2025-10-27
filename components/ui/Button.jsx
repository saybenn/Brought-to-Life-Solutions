import React from "react";
import clsx from "clsx";

export default function Button({
  variant = "primary",
  size = "md",
  full = false,
  className,
  children,
  ...props
}) {
  const base =
    "btn focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2";

  const variantStyles = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
  };

  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-3",
  };

  return (
    <button
      className={clsx(
        base,
        variantStyles[variant] || variantStyles.primary,
        sizeStyles[size] || sizeStyles.md,
        full && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
