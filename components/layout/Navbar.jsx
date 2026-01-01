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

  const handleStartProject = () => {
    router.push("/start");
  };

  const handleBookCall = () => {
    router.push("/call");
  };

  const brandTextColor = isSolid
    ? "text-[var(--ink-900)]"
    : "text-[var(--bg-elevated)]";

  const innerPadding = isSolid ? "py-2" : "py-4 md:py-5";

  return (
    <header className="fixed inset-x-0 top-0 z-40 w-full">
      {/* OUTER SHELL */}
      <div
        className={cn(
          "transition-base",
          isSolid ? "bg-transparent" : "bg-[var(--bg-page)]/25 backdrop-blur-md"
        )}
      >
        {/* INNER CONTAINER */}
        <div
          className={cn(
            "mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 transition-base",
            isSolid
              ? "mt-3 max-w-6xl rounded-[var(--r-lg)] bg-[var(--bg-ivory)] py-2 shadow-[var(--shadow-card)]"
              : "max-w-none py-4 md:py-5"
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
                  isSolid
                    ? "text-[var(--ink-900)]"
                    : "text-[var(--bg-elevated)]"
                )}
              >
                Brought to Life Solutions
              </span>
            </Link>
          </div>

          {/* CENTER NAV */}
          <nav className="hidden md:flex md:flex-1 justify-center">
            <ul className="flex items-center gap-4 lg:gap-6 text-sm lg:text-base font-medium">
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
                        "relative transition-base hover:text-[var(--green-forest-700)]",
                        isSolid
                          ? "text-[var(--ink-900)]/80"
                          : "text-[var(--bg-page)]/70"
                      )}
                    >
                      {item.label}
                      {active && (
                        <span
                          className={cn(
                            "absolute inset-x-0 -bottom-1 h-[2px] rounded-full",
                            isSolid
                              ? "bg-[var(--green-forest-700)]"
                              : "bg-[var(--bg-page)]"
                          )}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* RIGHT CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            {!isSolid && (
              <button
                className="btn btn-secondary px-4 py-1.5 text-sm"
                onClick={handleBookCall}
              >
                Book strategy call
              </button>
            )}
            <button
              className="btn btn-primary px-4 py-1.5 text-sm"
              onClick={handleStartProject}
            >
              Start project
            </button>
          </div>

          {/* MOBILE CTA */}
          <div className="flex items-center lg:hidden">
            <button
              className="btn btn-primary px-3 py-1 text-xs"
              onClick={handleStartProject}
            >
              Get Started
            </button>
          </div>

          {/* HAMBURGER */}
          <button
            className="md:hidden rounded-[var(--r-md)] border px-3 py-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE PANEL (unchanged structurally) */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--bg-ivory)] shadow-[var(--shadow-card)]">
          {/* keep your existing mobile menu */}
        </div>
      )}
    </header>
  );
}
