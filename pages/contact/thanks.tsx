import Head from "next/head";
import { cardBase, heading, body, btnOutline } from "@/components/contact/ui";
import Link from "next/link";

export default function ContactThanksPage() {
  return (
    <>
      <Head>
        <title>Received | Brought to Life Solutions</title>
        <meta name="description" content="We received your message." />
      </Head>

      <main className="min-h-screen pt-16 bg-[var(--bg-page)] text-[var(--ink-700)]">
        <div className="px-4 pt-12 pb-16">
          <div className="mx-auto max-w-3xl">
            <section className={`${cardBase} p-5 sm:p-6`}>
              <h1 className={`${heading} text-2xl`}>Message Received</h1>
              <p className={`${body} mt-3`}>
                Your message has been received. You can expect a reply within
                one business day.
              </p>
              <div className="mt-6">
                <Link href="/" className={btnOutline}>
                  Return Home
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
