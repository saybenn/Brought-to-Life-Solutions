import { useMemo, useState } from "react";
import type { ReactNode } from "react";

type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
};

export default function Accordion({
  items,
  allowMultiple = true,
  className,
}: AccordionProps) {
  const defaultOpenIds = useMemo(
    () => items.filter((item) => item.defaultOpen).map((item) => item.id),
    [items],
  );

  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  function toggleItem(id: string) {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);

      if (allowMultiple) {
        return isOpen ? prev.filter((openId) => openId !== id) : [...prev, id];
      }

      return isOpen ? [] : [id];
    });
  }

  return (
    <div className={className} style={{ display: "grid", gap: 12 }}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <section
            key={item.id}
            className="dash-accordion"
            style={{
              border: "1px solid var(--dash-border-soft)",
              borderRadius: "var(--dash-radius-lg)",
              background: "rgba(255,255,255,0.03)",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              className="dash-accordion__trigger"
              style={{
                width: "100%",
                minHeight: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "14px 16px",
                background: "transparent",
                border: 0,
                color: "var(--dash-text-1)",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 600 }}>
                {item.title}
              </span>
              <span
                style={{
                  color: "var(--dash-text-3)",
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen ? (
              <div
                id={`accordion-panel-${item.id}`}
                style={{
                  padding: "0 16px 16px",
                  borderTop: "1px solid var(--dash-border-soft)",
                }}
              >
                {item.content}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
