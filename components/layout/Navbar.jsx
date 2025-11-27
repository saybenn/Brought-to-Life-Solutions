import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/process", label: "Process" },
  { href: "/services", label: "Services" },
  { href: "/results", label: "Results" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isSolid, setIsSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  // Scroll behavior: glass over hero → solid after threshold
  useEffect(() => {
    const onScroll = () => {
      const threshold = 80; // px before switching to solid nav
      setIsSolid(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => setMobileOpen(false);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  const handleStartProject = () => {
    router.push("/start"); // intake → checkout
  };

  const handleBookCall = () => {
    router.push("/call"); // strategy call / Calendly wrapper
  };

  const brandTextColor = isSolid
    ? "text-[var(--ink-900)]"
    : "text-[var(--bg-elevated)]";

  const linkColor = isSolid ? "text-[var(--ink-900)]" : "text-[var(--ink-900)]";

  const innerPadding = isSolid ? "py-2" : "py-4 md:py-5";

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "mx-auto flex max-w-11/12 items-center justify-between px-4 md:px-6 lg:px-8 transition-base",
          innerPadding,
          isSolid
            ? "nav-is-solid rounded-[var(--r-lg)]"
            : "bg-[var(--bg-page)]/20 mt-3 rounded-[var(--r-lg)]"
        )}
      >
        {/* LEFT: BRAND */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--green-forest-700)] text-xs font-semibold text-white">
            BLS
          </div>
          <Link href="/" className="no-underline">
            <span
              className={cn(
                "text-sm md:text-base font-semibold tracking-[0.14em] uppercase transition-base",
                brandTextColor
              )}
            >
              Brought to Life Solutions
            </span>
          </Link>
        </div>

        {/* CENTER: NAV (desktop) */}
        <nav className="hidden items-center justify-center md:flex md:flex-1">
          <ul
            className={cn(
              "flex items-center justify-center gap-6 text-md font-medium",
              linkColor
            )}
          >
            {NAV_LINKS.map((item) => {
              const active =
                item.href === "/"
                  ? router.pathname === "/"
                  : router.pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative transition-base hover:text-[var(--green-forest-700)] text-[var(--bg-page)]",
                      !active && "text-[var(--bg-page)]/70 ",
                      isSolid && "text-[var(--ink-900)]/80"
                    )}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span
                        className={cn(
                          "absolute inset-x-0 -bottom-1 h-[2px] rounded-full",
                          isSolid
                            ? "bg-[var(--green-forest-700)]"
                            : "bg-[var(--green-forest-700))]"
                        )}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* RIGHT: CTAs (desktop) */}
        <div className="hidden items-center gap-2 md:flex">
          {isSolid ? (
            // Slim, single primary CTA when scrolled
            <button
              className="btn btn-primary px-4 py-1.5 text-sm"
              type="button"
              onClick={handleStartProject}
            >
              Start project
            </button>
          ) : (
            // Dual CTA in hero state
            <>
              <button
                className="btn btn-secondary px-4 py-1.5 text-sm"
                type="button"
                onClick={handleBookCall}
              >
                Book strategy call
              </button>
              <button
                className="btn btn-primary px-4 py-1.5 text-sm"
                type="button"
                onClick={handleStartProject}
              >
                Start project
              </button>
            </>
          )}
        </div>
        {/* MOBILE: small Start button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="btn btn-primary px-3 py-1 text-xs leading-none mr-2"
            onClick={handleStartProject}
          >
            Get Started
          </button>
        </div>

        {/* MOBILE: hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-[var(--r-md)] border border-[color-mix(in_oklab,var(--muted-400)_40%,transparent)] px-3 py-2 md:hidden bg-[color-mix(in_oklab,var(--bg-elevated)_10%,transparent)]"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={cn(
                "block h-[2px] w-5 rounded-full transition-base",
                isSolid ? "bg-[var(--ink-900)]" : "bg-[var(--bg-elevated)]",
                mobileOpen && "translate-y-[5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-[2px] w-4 rounded-full transition-base",
                isSolid ? "bg-[var(--ink-900)]" : "bg-[var(--bg-elevated)]",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-[2px] w-5 rounded-full transition-base",
                isSolid ? "bg-[var(--ink-900)]" : "bg-[var(--bg-elevated)]",
                mobileOpen && "-translate-y-[5px] -rotate-45"
              )}
            />
          </div>
        </button>
      </div>

      {/* MOBILE MENU PANEL */}
      {mobileOpen && (
        <div className="md:hidden" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-[var(--border)] bg-[var(--bg-ivory)] px-4 py-4">
            <nav>
              <ul className="flex flex-col gap-3 text-sm font-medium text-[var(--ink-900)]">
                {NAV_LINKS.map((item) => {
                  const active =
                    item.href === "/"
                      ? router.pathname === "/"
                      : router.pathname.startsWith(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-[var(--r-md)] px-2 py-2 transition-base hover:bg-[var(--sage-100)]",
                          active && "bg-[var(--sage-100)]"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-2 flex flex-col gap-2">
              <button
                className="btn btn-secondary w-full justify-center"
                type="button"
                onClick={handleBookCall}
              >
                Book strategy call
              </button>
              <button
                className="btn btn-primary w-full justify-center"
                type="button"
                onClick={handleStartProject}
              >
                Start project
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
