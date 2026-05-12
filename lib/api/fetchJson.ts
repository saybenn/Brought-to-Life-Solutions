// /lib/api/fetchJson.ts
export class UnauthorizedError extends Error {
  code = 401 as const;
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

type FetchJsonOptions = RequestInit & {
  // When true, always include cookies for authenticated routes
  withCredentials?: boolean;
};

export async function fetchJson<T>(
  input: RequestInfo | URL,
  init?: FetchJsonOptions
): Promise<T> {
  const withCredentials = init?.withCredentials ?? true;

  const res = await fetch(input, {
    ...init,
    credentials: withCredentials ? "include" : init?.credentials,
    headers: {
      ...(init?.headers ?? {}),
      ...(init?.body && !(init?.headers as any)?.["Content-Type"]
        ? { "Content-Type": "application/json" }
        : null),
    },
  });

  if (res.status === 401) throw new UnauthorizedError();

  const text = await res.text().catch(() => "");
  const json = text ? safeJsonParse(text) : null;

  if (!res.ok) {
    const msg = (json as any)?.error ?? `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return json as T;
}

function safeJsonParse(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}