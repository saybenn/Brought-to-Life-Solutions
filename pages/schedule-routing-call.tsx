import Head from "next/head";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-link-here";

export default function ScheduleRoutingCallPage() {
  return (
    <>
      <Head>
        <title>Schedule Routing Call | Brought to Life Solutions</title>
        <meta
          name="description"
          content="Schedule your BTLS routing call after submitting the request form."
        />
      </Head>

      <main className="min-h-screen px-4 py-14">
        <div className="mx-auto max-w-xl">
          <p className="text-sm opacity-75">Schedule</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">
            Book Your Routing Call
          </h1>

          <p className="mt-4 leading-relaxed opacity-90">
            This call is a short, focused step to confirm fit and bring
            definition to what comes next. It is not a consulting session or
            audit.
          </p>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium"
          >
            Open Scheduling
          </a>

          <p className="mt-4 text-xs opacity-70">
            If the link doesn’t open, copy and paste it into your browser.
          </p>
        </div>
      </main>
    </>
  );
}
