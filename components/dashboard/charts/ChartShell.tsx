import type { ReactNode } from "react";

type ChartShellProps = {
  children: ReactNode;
  minHeight?: number;
  mobileMinHeight?: number;
  className?: string;
};

export default function ChartShell({
  children,
  minHeight = 260,
  mobileMinHeight = 220,
  className,
}: ChartShellProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        minHeight,
        height: minHeight,
      }}
    >
      <style jsx>{`
        div {
          min-height: ${mobileMinHeight}px;
          height: ${mobileMinHeight}px;
        }

        @media (min-width: 768px) {
          div {
            min-height: ${minHeight}px;
            height: ${minHeight}px;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
