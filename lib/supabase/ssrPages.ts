// lib/supabase/ssrPages.ts  (PAGES SSR ONLY)
import { createServerClient } from "@supabase/ssr";
import { serialize } from "cookie";
import type { GetServerSidePropsContext } from "next";

export function supabaseSsr(ctx: GetServerSidePropsContext) {
  const req = ctx.req;
  const res = ctx.res;

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // In SSR, Next does not give req.cookies typed like API routes.
          // But cookie parsing is already done by Next in Pages router.
          // If it's missing in your setup, we can swap to a manual parser.
          // @ts-ignore
          return req.cookies?.[name];
        },
        set(name: string, value: string, options: any) {
          res.setHeader("Set-Cookie", serialize(name, value, options));
        },
        remove(name: string, options: any) {
          res.setHeader(
            "Set-Cookie",
            serialize(name, "", { ...options, maxAge: 0 })
          );
        },
      },
    }
  );
}
