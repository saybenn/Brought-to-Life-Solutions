import Head from "next/head";
import ContactHero from "@/components/contact/ContactHero";
import ContactPaths from "@/components/contact/ContactPaths";
import BoundaryNote from "@/components/contact/BoundaryNote";
import RoutingForm from "@/components/contact/RoutingForm";
import WhatHappensNext from "@/components/contact/WhatHappensNext";
import ContactFinalCTA from "@/components/contact/ContactFinalCTA";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Brought to Life Solutions</title>
        <meta
          name="description"
          content="Request a routing call, get support as an existing client, or send a general inquiry."
        />
      </Head>

      <main className="min-h-screen pt-16 bg-[var(--bg-page)] text-[var(--ink-700)]">
        <div className="px-4 pt-12 pb-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="space-y-8">
                  <ContactHero />
                  <ContactPaths />
                  <BoundaryNote />
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="space-y-8 lg:sticky lg:top-24">
                  <RoutingForm />
                  <WhatHappensNext />
                  <ContactFinalCTA />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
