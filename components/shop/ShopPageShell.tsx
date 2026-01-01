import React from "react";
import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; className?: string };

export default function ShopPageShell({ children, className }: Props) {
  return (
    <div className={cn("relative min-h-screen", className)}>
      {/* Fixed background lifted 1:1 from ShopIntroBand */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          background: `
            radial-gradient(1200px 600px at 18% 20%, rgba(35,67,46,0.32), rgba(0,0,0,0) 60%),
            radial-gradient(900px 520px at 76% 28%, rgba(214,185,138,0.14), rgba(0,0,0,0) 62%),
            linear-gradient(135deg, var(--submerge-900) 0%, var(--submerge-800) 32%, var(--submerge-700) 54%, rgba(0,0,0,0) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.70) 46%, rgba(173, 145, 88, 1) 100%)
          `,
        }}
      />

      {/* Fixed grain lifted 1:1 from ShopIntroBand */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22400%22 height=%22400%22 filter=%22url(%23n)%22 opacity=%220.45%22/%3E%3C/svg%3E')",
        }}
      />

      {/* Content stack */}
      <div className="relative z-10 text-[rgba(247,243,235,0.9)]">
        {children}
      </div>
    </div>
  );
}
