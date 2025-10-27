import Link from "next/link";
import SiteContainer from "./SiteContainer";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-ivory">
      <SiteContainer className="py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-semibold">Brought to Life Solutions</div>
          <p className="mt-2 text-ink-muted text-sm">
            Practical sites. Real SEO. Clear coaching. Honest imagery.
          </p>
        </div>
        <div>
          <div className="font-medium mb-2">Explore</div>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/bundles">Bundles</Link>
            </li>
            <li>
              <Link href="/resources">Resources</Link>
            </li>
            <li>
              <Link href="/results">Results</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Legal</div>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/legal/terms">Terms of Service</Link>
            </li>
            <li>
              <Link href="/legal/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/legal/refund">Refund Policy</Link>
            </li>
          </ul>
        </div>
      </SiteContainer>
      <SiteContainer className="py-4 border-t border-[var(--border)] text-xs text-ink-muted">
        © {new Date().getFullYear()} Brought to Life Solutions
      </SiteContainer>
    </footer>
  );
}
