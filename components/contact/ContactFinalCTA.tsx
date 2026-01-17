import { cardBase, heading, body } from "./ui";

export default function ContactFinalCTA() {
  return (
    <section className={`${cardBase} p-5 sm:p-6`}>
      <h2 className={`${heading} text-xl`}>A Final Note</h2>

      <p className={`${body} mt-3`}>
        Most engagements begin with a routing call. If you&apos;re ready to move
        forward with definition, begin here.
      </p>
    </section>
  );
}
