import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiteContainer from "./SiteContainer";
import { cn } from "@/lib/utils";

export default function Navbar({ offsetTop = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // tint after small scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // hide on down, show on up — no threshold (works even with slow scroll)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (y > 80 && y > lastY.current) setHidden(true); // scrolling down
      if (y < lastY.current) setHidden(false); // scrolling up
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{ top: offsetTop }}
      className={cn(
        "fixed inset-x-0 z-50 transition-[opacity,transform,background-color] duration-300 ease-out will-change-[opacity,transform] glass ",
        hidden
          ? "opacity-0 -translate-y-full pointer-events-none"
          : "opacity-100 translate-y-0 ",
        scrolled
          ? "bg-[var(--green-forest-700)] backdrop-blur border-b border-[var(--border)]"
          : "bg-[var(--green-forest-700)]"
      )}
    >
      <SiteContainer className="h-14 flex items-center justify-between text-[var(--bg-sand)]">
        <Link
          href="/"
          className="font-semibold tracking-tight text-[var(--bg-sand)]"
          aria-label="Home"
        >
          Brought to Life
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/shop">Shop</Link>
          <Link href="/collections/seen">Collections</Link>
          <Link href="/bundles">Bundles</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/results">Results</Link>
          <Link href="/book/consult" className="btn btn-primary">
            Book
          </Link>
        </div>

        <Link href="/book/consult" className="md:hidden btn btn-primary">
          Book
        </Link>
      </SiteContainer>
    </nav>
  );
}
