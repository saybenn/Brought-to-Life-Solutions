// components/Navbar.tsx
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

/**
 * MVP nav:
 * - Remove pages you don't want exposed yet (Services, Pricing, etc.)
 * - Point Results directly to your single case study
 * - Add Shop as primary navigation surface for systems
 */
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/process", label: "Process" },
  { href: "/shop", label: "Shop" },
  { href: "/case-studies/bold-city-iaq", label: "Results" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Pages where the top hero is light (ivory / white) so the “transparent” header
 * must still render dark ink for legibility.
 *
 * Note: this is a pragmatic MVP approach (route-based). If later you want a
 * fully automatic solution, add an IntersectionObserver “hero sentinel” and
 * switch based on actual background coverage.
 */
const LIGHT_HEADER_PREFIXES = [
  "/about",
  "/process",
  "/contact",
  "/legal",
  "/case-studies",
  "/shop", // your shop hero can be dark; keep this if you sometimes render light heroes
];

export default function Navbar() {
  const router = useRouter();
  const [isSolid, setIsSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = 80;
      setIsSolid(window.scrollY > threshold);
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

  // Use pathname (no query/hash) for routing decisions
  const path = router.pathname;

  const isLightHeaderRoute = useMemo(() => {
    return LIGHT_HEADER_PREFIXES.some((p) =>
      p === "/" ? path === "/" : path.startsWith(p)
    );
  }, [path]);

  /**
   * Header modes:
   * - isSolid: scrolled → always ink on ivory pill (your existing intent)
   * - !isSolid: top of page
   *    - if route is light: render an “ink” version so it doesn't disappear
   *    - if route is dark: render light text on translucent shell
   */
  const topMode: "darkOnLight" | "lightOnDark" = isLightHeaderRoute
    ? "darkOnLight"
    : "lightOnDark";

  // Visual tokens per mode
  const shellClass = cn(
    "transition-base",
    // always add a bit more opacity so links don't vanish on light heroes
    !isSolid &&
      topMode === "darkOnLight" &&
      "bg-[var(--bg-ivory)]/80 backdrop-blur-md border-b border-[var(--border)]",
    !isSolid &&
      topMode === "lightOnDark" &&
      "bg-[var(--bg-page)]/25 backdrop-blur-md",
    isSolid && "bg-transparent"
  );

  const innerClass = cn(
    "mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 transition-base",
    isSolid
      ? "mt-3 max-w-6xl rounded-[var(--r-lg)] bg-[var(--bg-ivory)] py-2 shadow-[var(--shadow-card)]"
      : "max-w-none py-4 md:py-5"
  );

  const brandTextClass = cn(
    "text-sm md:text-base font-semibold tracking-[0.14em] uppercase transition-base",
    isSolid && "text-[var(--ink-900)]",
    !isSolid && topMode === "darkOnLight" && "text-[var(--ink-900)]",
    !isSolid && topMode === "lightOnDark" && "text-[var(--bg-elevated)]"
  );

  const linkBase =
    "relative transition-base hover:text-[var(--green-forest-700)]";
  const linkColor = cn(
    isSolid && "text-[var(--ink-900)]/80",
    !isSolid && topMode === "darkOnLight" && "text-[var(--ink-900)]/80",
    !isSolid && topMode === "lightOnDark" && "text-[var(--bg-page)]/80"
  );

  const activeUnderline = cn(
    "absolute inset-x-0 -bottom-1 h-[2px] rounded-full",
    // keep underline visible in both modes
    isSolid || topMode === "darkOnLight"
      ? "bg-[var(--green-forest-700)]"
      : "bg-[var(--bg-page)]"
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40 w-full">
      {/* OUTER SHELL */}
      <div className={shellClass}>
        {/* INNER CONTAINER */}
        <div className={innerClass}>
          {/* LEFT: BRAND */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--green-forest-700)] text-xs font-semibold text-white">
              BLS
            </div>
            <Link href="/" className="no-underline">
              <span className={brandTextClass}>Brought to Life Solutions</span>
            </Link>
          </div>

          {/* CENTER NAV */}
          <nav
            className="hidden md:flex md:flex-1 justify-center"
            aria-label="Primary"
          >
            <ul className="flex items-center gap-4 lg:gap-6 text-sm lg:text-base font-medium">
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

          {/* RIGHT CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Secondary CTA: “View systems” is calmer + matches your Shop intent */}
            {!isSolid && (
              <button
                data-track="click cta"
                data-location="navbar"
                data-intent="View systems"
                data-label="View systems"
                className={cn(
                  "btn btn-secondary px-4 py-1.5 text-sm",
                  // ensure legibility on light hero when not solid
                  !isSolid &&
                    topMode === "darkOnLight" &&
                    "border-[var(--border)]"
                )}
              >
                View systems
              </button>
            )}

            {/* Primary CTA: unify across site */}
            <Link
              data-track="click cta"
              data-location="navbar"
              data-intent="Request a routing call"
              data-label="Routing call"
              href="/contact"
              className="btn btn-primary px-4 py-1.5 text-sm"
            >
              Request routing call
            </Link>
          </div>

          {/* MOBILE CTA */}
          <div className="flex items-center lg:hidden">
            <Link
              href="/contact"
              className="btn btn-primary px-3 py-1 text-sm"
              data-track="click cta"
              data-location="navbar"
              data-intent="Request a routing call"
              data-label="Routing call"
            >
              Routing call
            </Link>
          </div>

          {/* HAMBURGER */}
          <button
            className={cn(
              "md:hidden rounded-[var(--r-md)] border px-3 py-2 transition-base",
              // make icon visible in both modes
              isSolid || topMode === "darkOnLight"
                ? "border-[var(--border)] text-[var(--ink-900)]"
                : "border-[var(--bg-page)]/30 text-[var(--bg-elevated)]"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE PANEL */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--bg-ivory)] shadow-[var(--shadow-card)] border-t border-[var(--border)]">
          <div className="mx-auto max-w-6xl px-4 py-4 space-y-3">
            <nav aria-label="Mobile">
              <ul className="space-y-2">
                {NAV_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-[var(--r-md)] px-3 py-2 text-[var(--ink-900)]/85 hover:bg-[var(--bg-page)]/40 transition-base"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="pt-2 flex gap-2">
              <Link
                href="/shop"
                data-track="click cta"
                data-location="mobile navbar"
                data-intent="View systems"
                data-label="View systems"
                className="btn btn-secondary flex-1"
              >
                View systems
              </Link>
              <Link
                data-track="click cta"
                data-location="mobile navbar"
                data-intent="Request a routing call"
                data-label="Routing call"
                href="/contact"
                className="btn btn-primary flex-1"
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
