// /components/results/CaseCard.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { useMemo, useState } from "react";

type CaseCardProps = {
  title: string;
  clientType: string;
  sockets: string[];
  before: string;
  system: string;
  after: string;
  imageSrc?: string;
  highlight?: boolean;
};

function splitTitle(title: string) {
  const parts = title
    .split("—")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    return { clientName: parts[0], outcome: parts.slice(1).join(" — ") };
  }
  return { clientName: title, outcome: "" };
}

export function CaseCard(props: CaseCardProps) {
  const {
    title,
    clientType,
    sockets,
    before,
    system,
    after,
    imageSrc,
    highlight,
  } = props;

  const { ref, inView } = useInView<HTMLDivElement>();
  const [open, setOpen] = useState(false);

  const { clientName, outcome } = useMemo(() => splitTitle(title), [title]);

  return (
    <>
      <article
        ref={ref}
        className={cn(
          "flex h-full flex-col rounded-[var(--r-lg)] border border-(--border-soft) bg-(--surface-elevated) p-5 sm:p-6 md:p-7 shadow-[var(--shadow-soft)]",
          "transition-all duration-700 ease-out",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          highlight && "border-(--ink-900) shadow-[var(--shadow-card-strong)]"
        )}
      >
        {imageSrc && (
          <div className="relative mb-4 overflow-hidden rounded-[var(--r-md)] bg-(--ink-50) aspect-[16/9]">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        )}

        <header className="mb-4 space-y-2">
          <p className="text-xs font-medium tracking-[0.18em] text-(--ink-500) uppercase">
            {clientType}
          </p>

          <p className="text-sm font-semibold text-(--ink-900)">{clientName}</p>

          {outcome ? (
            <h3 className="text-lg sm:text-xl font-semibold leading-snug text-(--ink-900)">
              {outcome}
            </h3>
          ) : (
            <h3 className="text-lg sm:text-xl font-semibold leading-snug text-(--ink-900)">
              {title}
            </h3>
          )}

          {sockets.length > 0 && (
            <div className="pt-1 flex flex-wrap gap-1.5">
              {sockets.map((socket) => (
                <span
                  key={socket}
                  className="inline-flex items-center rounded-full border border-(--border-soft) bg-(--surface-muted) px-2 py-0.5 text-[11px] font-medium text-(--ink-700)"
                >
                  {socket}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="mb-4 rounded-2xl border border-(--border-soft) bg-(--surface-muted) px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--ink-500)">
            System installed
          </p>
          <p className="mt-1 text-sm text-(--ink-800) line-clamp-2">{system}</p>
        </div>

        {/* Keep card height stable */}
        <div className="mt-auto space-y-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--ink-500)">
              Before
            </p>
            <p className="mt-1 text-sm text-(--ink-800) line-clamp-2">
              {before}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--ink-500)">
              After
            </p>
            <p className="mt-1 text-sm text-(--ink-900) line-clamp-2">
              {after}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-xs font-medium text-(--ink-700 underline underline-offset-4 hover:text-(--ink-900) w-fit"
          >
            Read details
          </button>
        </div>
      </article>

      {/* Modal / Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop (behind panel) */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Panel (above backdrop) */}
          <div className="relative z-10 w-full sm:w-[min(760px,92vw)] max-h-[85vh] overflow-auto rounded-3xl bg-(--isabelline) border border-(--border-soft) shadow-[var(--shadow-card-strong)]">
            <div className="p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium tracking-[0.18em] text-(--ink-500) uppercase">
                    {clientType}
                  </p>
                  <h4 className="mt-2 text-lg sm:text-xl font-semibold text-(--ink-900)">
                    {clientName}
                  </h4>
                  {outcome && (
                    <p className="mt-1 text-sm sm:text-base text-(--ink-700)">
                      {outcome}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="shrink-0 rounded-full border border-(--border-soft) bg-(--surface-muted) px-3 py-1.5 text-xs font-medium text-(--ink-800) hover:bg-(--surface-elevated)"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 space-y-5 text-sm text-(--ink-800)">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--ink-500)">
                    Before
                  </p>
                  <p className="mt-1">{before}</p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--ink-500)">
                    System installed
                  </p>
                  <p className="mt-1">{system}</p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--ink-500)">
                    After
                  </p>
                  <p className="mt-1 text-(--ink-900)">{after}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
