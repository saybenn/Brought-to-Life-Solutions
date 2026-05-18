// components/Navbar.tsx
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/process", label: "Process" },
  { href: "/shop", label: "Shop" },
  { href: "/case-studies/bold-city-iaq", label: "Results" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

const LIGHT_HEADER_PREFIXES = [
  "/about",
  "/process",
  "/contact",
  "/legal",
  "/case-studies",
  "/dashboard",
  "/blog",
  "/shop",
];

export default function Navbar() {
  const router = useRouter();
  const [isSolid, setIsSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsSolid(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => setMobileOpen(false);

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  const path = router.pathname;

  const isLightHeaderRoute = useMemo(() => {
    return LIGHT_HEADER_PREFIXES.some((prefix) => path.startsWith(prefix));
  }, [path]);

  const topMode: "darkOnLight" | "lightOnDark" = isLightHeaderRoute
    ? "darkOnLight"
    : "lightOnDark";

  const isDarkText = isSolid || topMode === "darkOnLight";

  const shellClass = cn(
    "transition-base",
    !isSolid &&
      topMode === "lightOnDark" &&
      "bg-[rgba(31,38,26,0.72)] backdrop-blur-md",
    !isSolid &&
      topMode === "darkOnLight" &&
      "border-b border-[var(--border)] bg-[var(--bg-ivory)]/80 backdrop-blur-md",
    isSolid && "bg-transparent",
    mobileOpen && "bg-[rgba(18,24,17,0.94)] backdrop-blur-xl",
  );

  const innerClass = cn(
    "mx-auto flex items-center justify-between gap-3 px-4 transition-base sm:px-5 md:px-6 lg:px-8",
    isSolid
      ? "mt-3 max-w-6xl rounded-[var(--r-lg)] bg-[var(--bg-ivory)] py-2 shadow-[var(--shadow-card)]"
      : "max-w-none py-3.5 md:py-5",
    mobileOpen && "pb-3",
  );

  const brandTextClass = cn(
    "hidden min-w-0 text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] transition-base sm:block md:text-sm lg:text-base",
    isDarkText ? "text-[var(--ink-900)]" : "text-[var(--bg-elevated)]",
  );

  const linkBase =
    "relative transition-base hover:text-[var(--green-forest-700)]";

  const linkColor = cn(
    isDarkText ? "text-[var(--ink-900)]/80" : "text-[var(--bg-page)]/80",
  );

  const activeUnderline = cn(
    "absolute inset-x-0 -bottom-1 h-[2px] rounded-full",
    isDarkText ? "bg-[var(--green-forest-700)]" : "bg-[var(--bg-page)]",
  );

  const mobileControlClass = cn(
    "grid h-9 w-9 shrink-0 place-items-center rounded-full border text-base leading-none transition-base",
    isDarkText
      ? "border-[var(--border)] text-[var(--ink-900)]"
      : "border-[var(--bg-page)]/30 text-[var(--bg-elevated)]",
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40 w-full">
      <div className={shellClass}>
        <div className={innerClass}>
          {/* LEFT: BRAND */}
          <Link
            href="/"
            aria-label="Brought to Life Solutions home"
            className="flex min-w-0 shrink items-center gap-2 no-underline"
          >
            <span className="inline-flex h-8 items-center rounded-full bg-[var(--green-forest-700)] px-3 text-[10px] font-bold leading-none tracking-[-0.02em] text-white sm:text-[11px]">
              <span className="md:hidden">Brought to Life Solutions</span>
              <span className="hidden md:inline">BTLS</span>
            </span>

            <span className={brandTextClass}>
              Brought to Life
              <br />
              Solutions
            </span>
          </Link>

          {/* CENTER NAV */}
          <nav
            className="hidden flex-1 justify-center md:flex"
            aria-label="Primary"
          >
            <ul className="flex items-center gap-4 text-sm font-medium lg:gap-6 lg:text-base">
              {NAV_LINKS.map((item) => {
                const active =
                  item.href === "/"
                    ? router.asPath === "/"
                    : router.asPath.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link href={item.href} className={cn(linkBase, linkColor)}>
                      {item.label}
                      {active && <span className={activeUnderline} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* RIGHT: DESKTOP CTAs */}
          <div className="hidden items-center gap-2 lg:flex">
            {!isSolid && (
              <Link
                href="/shop"
                onClick={() =>
                  track("click cta", {
                    location: "navbar",
                    intent: "View systems",
                    label: "View systems",
                  })
                }
                className={cn(
                  "btn btn-secondary px-4 py-1.5 text-sm",
                  topMode === "darkOnLight" && "border-[var(--border)]",
                )}
              >
                View systems
              </Link>
            )}

            <Link
              href="/contact"
              onClick={() =>
                track("click cta", {
                  location: "navbar",
                  intent: "Request a routing call",
                  label: "Routing call",
                })
              }
              className="btn btn-primary px-4 py-1.5 text-sm"
            >
              Request Routing Call
            </Link>
          </div>

          {/* RIGHT: TABLET/MOBILE ACTIONS */}
          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <Link
              href="/contact"
              onClick={() =>
                track("click cta", {
                  location: "mobile navbar",
                  intent: "Request a routing call",
                  label: "Book Call",
                })
              }
              className="inline-flex h-8 items-center justify-center rounded-full bg-[var(--green-forest-700)] px-4 text-sm font-semibold leading-none text-white shadow-sm transition-base hover:bg-[var(--green-forest-800)] sm:px-5 sm:text-xs"
            >
              Book Call
            </Link>

            <button
              type="button"
              className={mobileControlClass}
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span aria-hidden="true">{mobileOpen ? "×" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE PANEL */}
      {mobileOpen && (
        <div className="md:hidden">
          <div className="mx-2 rounded-b-[1.5rem] border border-t-0 border-white/10 bg-[rgba(18,24,17,0.94)] px-3 pb-4 pt-3 shadow-2xl backdrop-blur-xl">
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {NAV_LINKS.map((item) => {
                  const active =
                    item.href === "/"
                      ? router.asPath === "/"
                      : router.asPath.startsWith(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-xl px-3 py-2.5 text-sm font-medium transition-base",
                          active
                            ? "bg-white/10 text-white"
                            : "text-white/72 hover:bg-white/10 hover:text-white",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
              <Link
                href="/shop"
                onClick={() =>
                  track("click cta", {
                    location: "mobile navbar",
                    intent: "View systems",
                    label: "View systems",
                  })
                }
                className="inline-flex h-10 items-center justify-center rounded-full border border-white/25 bg-white/5 px-4 text-xs font-semibold text-white transition-base hover:bg-white/10"
              >
                View systems
              </Link>

              <Link
                href="/contact"
                onClick={() =>
                  track("click cta", {
                    location: "mobile navbar",
                    intent: "Request a routing call",
                    label: "Routing call",
                  })
                }
                className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--green-forest-700)] px-4 text-xs font-semibold text-white shadow-sm transition-base hover:bg-[var(--green-forest-800)]"
              >
                Routing call
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
