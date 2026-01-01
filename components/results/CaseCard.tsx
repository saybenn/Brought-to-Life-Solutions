// /components/results/CaseCard.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

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

export function CaseCard({
  title,
  clientType,
  sockets,
  before,
  system,
  after,
  imageSrc,
  highlight,
}: CaseCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
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

      <header className="mb-3 flex flex-col gap-1">
        <p className="text-xs font-medium tracking-[0.18em] text-(--ink-500) uppercase">
          {clientType}
        </p>
        <h3 className="text-base sm:text-lg font-semibold text-(--ink-900)">
          {title}
        </h3>
        {sockets.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
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

      <dl className="mt-3 space-y-3 text-sm text-(--ink-800)">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--ink-500)">
            Before
          </dt>
          <dd className="mt-1 text-(--ink-800)">{before}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--ink-500)">
            System we installed
          </dt>
          <dd className="mt-1 text-(--ink-800)">{system}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--ink-500)">
            After
          </dt>
          <dd className="mt-1 text-(--ink-900)">{after}</dd>
        </div>
      </dl>
    </article>
  );
}
