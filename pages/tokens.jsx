import Head from "next/head";
import SiteContainer from "@/components/layout/SiteContainer";

function Swatch({ label, cls }) {
  return (
    <div className="rounded-[var(--r-md)] border border-[var(--border)] p-3">
      <div className={`h-16 rounded-[var(--r-sm)] ${cls}`} />
      <div className="mt-2 text-[var(--ink-700)] text-sm">{label}</div>
      <pre className="mt-1 text-xs bg-[var(--bg-ivory)] p-2 rounded-[var(--r-sm)] border border-[var(--border)] overflow-x-auto">
        <code>{cls}</code>
      </pre>
    </div>
  );
}

function Code({ children }) {
  return (
    <pre className="mt-2 text-xs bg-[var(--bg-ivory)] p-3 rounded-[var(--r-md)] border border-[var(--border)] overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

function Divider() {
  return <hr className="my-8 border-[var(--border)]" />;
}

export default function Tokens() {
  return (
    <>
      <Head>
        <title>Tokens — Brought to Life</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SiteContainer className="py-10">
        {/* Title */}
        <h1 className="h1">Design Tokens & Primitives</h1>
        <p className="subhead mt-2">
          Live preview of colors, type, spacing, focus, buttons, sections, and
          cards.
        </p>

        {/* --- COLORS --- */}
        <Divider />
        <h2 className="h2">Colors</h2>
        <p className="caption mt-1">
          All background, text, border, and accent swatches from CSS variables.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <Swatch label="bg-ivory" cls="bg-[var(--bg-ivory)]" />
          <Swatch label="bg-cream" cls="bg-[var(--bg-cream)]" />
          <Swatch label="bg-sand" cls="bg-[var(--bg-sand)]" />
          <Swatch label="ink-900" cls="bg-[var(--ink-900)]" />
          <Swatch label="ink-700" cls="bg-[var(--ink-700)]" />
          <Swatch label="forest-700" cls="bg-[var(--green-forest-700)]" />
          <Swatch label="pine-800" cls="bg-[var(--green-pine-800)]" />
          <Swatch label="emerald-500" cls="bg-[var(--green-emerald-500)]" />
          <Swatch label="sage-100" cls="bg-[var(--sage-100)]" />
          <Swatch label="sage-200" cls="bg-[var(--sage-200)]" />
          <Swatch label="border" cls="bg-[var(--border)]" />
          <Swatch label="focus" cls="bg-[var(--focus)]" />
        </div>

        {/* --- TYPOGRAPHY --- */}
        <Divider />
        <h2 className="h2">Typography</h2>
        <p className="caption mt-1">
          Uses your classes: <code>.h1</code>, <code>.h2</code>,{" "}
          <code>.subhead</code>, <code>.eyebrow</code>, <code>.caption</code>.
          Font families and sizes are driven by CSS variables (e.g.,{" "}
          <code>--font-head</code>, <code>--size-3xl</code>).
        </p>

        <div className="card p-6 mt-4">
          <div className="eyebrow">Demo</div>
          <h1 className="h1 mt-2">
            H1 — Get backed. Get seen. Get heard. Get paid.
          </h1>
          <h2 className="h2 mt-2">H2 — Outcomes over hype</h2>
          <p className="subhead mt-2">
            Lead — Practical sites, real SEO, clear coaching, honest imagery.
          </p>
          <p className="mt-2">
            Paragraph — This is standard body copy using{" "}
            <code>--font-body</code>. Keep sentences short and direct. Favor
            specificity over hype. Communicate timelines, deliverables, and
            responsibilities explicitly.
          </p>
          <ul className="mt-3 list-disc pl-6">
            <li>Promise one thing per section.</li>
            <li>Show “Includes / Doesn’t include.”</li>
            <li>Use numbers: “launch in 14 days.”</li>
          </ul>
          <blockquote className="mt-3 border-l-4 pl-3 border-[var(--border)] text-[var(--ink-700)]">
            “Clarity beats cleverness. Buyers need confidence, not fireworks.”
          </blockquote>
          <p className="caption mt-3">
            Caption — small helper text in a muted tone.
          </p>

          <Code>
            {`<h1 className="h1">H1 — Main headline</h1>
<h2 className="h2">H2 — Section headline</h2>
<p className="subhead">Lead line / body lead</p>
<p>Standard paragraph body text.</p>
<p className="caption">Caption / helper text</p>`}
          </Code>
        </div>

        {/* Font scale preview via variables */}
        <div className="card p-6 mt-4">
          <div className="eyebrow">Font Scale (variables)</div>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "var(--size-3xl)",
                  lineHeight: "var(--leading-tight)",
                }}
              >
                Head 3XL — var(--size-3xl)
              </div>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "var(--size-2xl)",
                  lineHeight: "var(--leading-tight)",
                }}
              >
                Head 2XL — var(--size-2xl)
              </div>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "var(--size-xl)",
                  lineHeight: "var(--leading-tight)",
                }}
              >
                Head XL — var(--size-xl)
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--size-lg)",
                  lineHeight: "var(--leading-normal)",
                }}
              >
                Body LG — var(--size-lg)
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--size-base)",
                  lineHeight: "var(--leading-normal)",
                }}
              >
                Body BASE — var(--size-base)
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--size-sm)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                Body SM — var(--size-sm)
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--size-xs)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                Caption XS — var(--size-xs)
              </div>
            </div>
          </div>

          <Code>
            {`/* Example CSS mapping (already in your components.css/tokens.css)
.h1 { font-family: var(--font-head); font-size: var(--size-3xl); line-height: var(--leading-tight); }
.subhead { font-size: var(--size-lg); line-height: var(--leading-normal); }
.caption { font-size: var(--size-xs); line-height: var(--leading-relaxed); }`}
          </Code>
        </div>

        {/* --- SPACING SCALE --- */}
        <Divider />
        <h2 className="h2">Spacing Scale</h2>
        <p className="caption mt-1">
          Visual bars pulled straight from your <code>--space-*</code>{" "}
          variables.
        </p>

        <div className="card p-6 mt-4">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ["--space-1", "4px"],
              ["--space-2", "8px"],
              ["--space-3", "12px"],
              ["--space-4", "16px"],
              ["--space-5", "20px"],
              ["--space-6", "24px"],
              ["--space-8", "32px"],
              ["--space-10", "40px"],
              ["--space-12", "48px"],
              ["--space-16", "64px"],
            ].map(([token, px]) => (
              <div key={token}>
                <div className="text-sm text-[var(--ink-700)]">
                  {token} ({px})
                </div>
                <div
                  className="bg-[var(--sage-200)] rounded-[var(--r-sm)] mt-1"
                  style={{ height: "8px", width: "100%" }}
                />
                <div
                  className="bg-[var(--green-forest-700)] rounded-[var(--r-sm)] mt-1"
                  style={{ height: "8px", width: `calc(${token})` }}
                />
              </div>
            ))}
          </div>

          <Code>
            {`/* Example spacing usage */
<section className="section p-6 md:p-8 mt-[var(--space-8)]">
  <h2 className="h2">Section title</h2>
  <p className="mt-[var(--space-2)]">Paragraph with top margin via tokens.</p>
</section>`}
          </Code>
        </div>

        {/* --- FOCUS & INTERACTIONS --- */}
        <Divider />
        <h2 className="h2">Focus Ring & Interactions</h2>
        <p className="caption mt-1">
          Tab to the controls to see the <code>--focus</code> outline. Buttons
          use subtle scale on hover/active.
        </p>

        <div className="card p-6 mt-4 flex flex-wrap gap-3">
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-free">Free Aisle</button>
          <a href="#" className="btn btn-ghost">
            Ghost Link
          </a>
          <input
            className="border border-[var(--border)] rounded-[var(--r-md)] px-3 py-2"
            placeholder="Focusable input"
          />
        </div>

        <Code>
          {`/* Buttons and focus ring are global classes (components.css)
.btn { transition: transform var(--dur-2) var(--ease-out); }
:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }`}
        </Code>

        {/* --- SECTIONS & CARDS --- */}
        <Divider />
        <h2 className="h2">Sections & Cards</h2>
        <p className="caption mt-1">
          Global surface patterns. Cards lift slightly on hover.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <section className="section p-6">
            <div className="eyebrow">Section</div>
            <h3 className="h2 mt-1">Calm editorial section</h3>
            <p className="mt-2">
              This wrapper uses <code>.section</code> for background, border,
              radius, and shadow.
            </p>
            <button className="btn btn-primary mt-4">Primary CTA</button>
          </section>

          <div className="card p-6">
            <div className="eyebrow">Card</div>
            <h3 className="h2 mt-1">Hover-lift card</h3>
            <p className="mt-2">
              Cards use a white background and soft shadow. On hover, translate
              Y by 1px.
            </p>
            <button className="btn btn-secondary mt-4">Secondary CTA</button>
          </div>
        </div>

        <Code>
          {`/* Section / Card classes (components.css)
.section { background: var(--bg-cream); border: 1px solid var(--border); border-radius: var(--r-lg); box-shadow: var(--shadow-card); }
.card    { background: #fff; border: 1px solid var(--border); border-radius: var(--r-md); box-shadow: var(--shadow-soft); }`}
        </Code>

        {/* --- RADIUS & SHADOWS PREVIEW --- */}
        <Divider />
        <h2 className="h2">Radii & Shadows</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="p-6 border border-[var(--border)] rounded-[var(--r-sm)]">
            r-sm
          </div>
          <div className="p-6 border border-[var(--border)] rounded-[var(--r-md)]">
            r-md
          </div>
          <div className="p-6 border border-[var(--border)] rounded-[var(--r-lg)]">
            r-lg
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div
            className="p-6 rounded-[var(--r-md)] border border-[var(--border)]"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            shadow-soft
          </div>
          <div
            className="p-6 rounded-[var(--r-md)] border border-[var(--border)]"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            shadow-card
          </div>
        </div>

        <Code>
          {`/* Token examples in CSS:
--r-sm: 10px; --r-md: 12px; --r-lg: 16px;
--shadow-soft: 0 2px 8px rgb(0 0 0 / 0.06);
--shadow-card: 0 6px 20px rgb(0 0 0 / 0.08);`}
        </Code>

        {/* --- HERO EXAMPLE (COPY-PASTE READY) --- */}
        <Divider />
        <h2 className="h2">Copy-paste Hero Example</h2>
        <section className="section p-8 mt-4 bg-[var(--bg-cream)]">
          <div className="eyebrow">Brought to Life</div>
          <h1 className="h1 mt-1">
            Get backed. Get seen. Get heard. Get paid.
          </h1>
          <p className="subhead mt-2">
            Practical sites, real SEO, clear coaching, honest imagery. No
            fluff—just outcomes.
          </p>
          <div className="mt-4 flex gap-3">
            <button className="btn btn-primary">Shop Services</button>
            <button className="btn btn-secondary">Free Aisle</button>
          </div>
        </section>

        <Code>
          {`<section className="section p-8 bg-[var(--bg-cream)]">
  <div className="eyebrow">Brought to Life</div>
  <h1 className="h1">Get backed. Get seen. Get heard. Get paid.</h1>
  <p className="subhead mt-[var(--space-2)]">Practical sites, real SEO, clear coaching, honest imagery.</p>
  <div className="mt-[var(--space-4)] flex gap-3">
    <button className="btn btn-primary">Shop Services</button>
    <button className="btn btn-secondary">Free Aisle</button>
  </div>
</section>`}
        </Code>

        <Divider />
        <p className="caption">
          Tip: If a class has no effect, confirm it exists in{" "}
          <code>/styles/components.css</code> and that
          <code>globals.css</code> imports <code>tokens.css</code> then{" "}
          <code>components.css</code> (in that order).
        </p>
      </SiteContainer>
    </>
  );
}
