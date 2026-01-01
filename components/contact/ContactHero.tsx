import { eyebrow, heading, body } from "./ui";

export default function ContactHero() {
  return (
    <section>
      <p className={eyebrow}>Contact</p>

      <h1
        className={`${heading} mt-3 text-3xl leading-[var(--leading-tight)] sm:text-4xl`}
      >
        Start the Right Conversation
      </h1>

      <div className="mt-4 h-px w-16 bg-[var(--border)]" />

      <p className={`${body} mt-5`}>
        This page helps bring definition to what comes next. It exists to
        understand your goals and constraints—so we can guide you into the right
        system.
      </p>

      <p className={`${body} mt-3`}>
        This is not a free consulting or brainstorming call. It is a structured
        first step toward clarity.
      </p>
    </section>
  );
}
