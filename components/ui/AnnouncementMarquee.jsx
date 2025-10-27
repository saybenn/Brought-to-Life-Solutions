import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AnnouncementMarquee({
  items = [],
  speed = 60,
  gapPx = 48,
  dismissible = false,
  children,
  sticky = true,
  id = "ann:global",
  onHeightChange,
}) {
  const [closed, setClosed] = useState(false);
  const rootRef = useRef(null);

  // Measure height when sticky/visible
  useEffect(() => {
    if (!sticky || closed) {
      onHeightChange?.(0);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const report = () =>
      onHeightChange?.(el.getBoundingClientRect().height || 0);
    report();
    const ro = new ResizeObserver(report);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sticky, closed, onHeightChange]);

  const row = useMemo(
    () =>
      items.length
        ? items
        : [
            {
              id: "default",
              text: children || "New: Launch Kit is open.",
              href: "#",
            },
          ],
    [items, children]
  );
  if (closed || row.length === 0) return null;

  const durationSec = Math.max(
    20,
    Math.round((row.length * gapPx + 800) / speed)
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "w-full overflow-hidden glass opacity-95",
        sticky ? "fixed top-0 z-[60]" : "relative"
      )}
      style={{ background: "var(--bg-ivory)", color: "var(--ann-ink)" }}
      role="region"
      aria-label="Announcements"
    >
      <div
        className="whitespace-nowrap flex items-center"
        style={{
          animation: `ann-marquee ${durationSec}s linear infinite`,
          gap: `${gapPx}px`,
          padding: "10px 0",
        }}
      >
        {[...row, ...row].map((it, i) => (
          <Link
            key={`${it.id}-${i}`}
            href={it.href || "#"}
            className="text-sm hover:opacity-80 shrink-0"
          >
            {it.text}
          </Link>
        ))}
      </div>

      {dismissible && (
        <button
          onClick={() => setClosed(true)}
          aria-label="Dismiss announcements"
          className="absolute right-0 opacity-90 top-1/2 h-full w-8 bg-[var(--green-forest-700)] -translate-y-1/2 text-xs  hover:opacity-100"
        >
          ✕
        </button>
      )}

      <style jsx>{`
        @keyframes ann-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div > div {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
