import { cardBase, heading, body, btnPrimary } from "./ui";

export default function ContactFinalCTA() {
  return (
    <section className={`${cardBase} p-5 sm:p-6`}>
      <h2 className={`${heading} text-xl`}>A Final Note</h2>

      <p className={`${body} mt-3`}>
        We build systems meant to hold weight. That requires clarity, intention,
        and structure.
      </p>

      <p className={`${body} mt-3`}>
        If you’re ready to move forward with definition, begin here.
      </p>

      <a href="#routing-form" className={`${btnPrimary} mt-5`}>
        Request Routing Call
      </a>
    </section>
  );
}
