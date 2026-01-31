import { cardSoft, heading, body } from "./ui";

export default function BoundaryNote() {
  return (
    <section className={`${cardSoft} p-5 sm:p-6`}>
      <h2 className={`${heading} text-lg sm:text-xl`}>Before You Reach Out</h2>

      <p className={`${body} mt-3`}>Our process is structured by design.</p>

      <p className={`${body} mt-3`}>
        Introductory calls exist to establish fit and direction. They are not
        consulting sessions or planning calls.
      </p>

      <p className={`${body} mt-3`}>
        This keeps the process clear and respectful of everyone&apos;s time.
      </p>
    </section>
  );
}
