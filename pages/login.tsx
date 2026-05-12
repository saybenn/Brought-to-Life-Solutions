// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";

import { supabaseBrowser } from "@/lib/supabase/browser"; // <-- YOUR browser helper

export default function LoginPage() {
  const router = useRouter();
  const supabase = supabaseBrowser;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="dash-shell" style={{ maxWidth: 520 }}>
      <div className="card dash-card">
        <h1 className="dash-title" style={{ marginBottom: 8 }}>
          Client Dashboard Login
        </h1>
        <div className="dash-meta" style={{ marginBottom: 16 }}>
          Sign in to view your dashboard.
        </div>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span className="dash-meta">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "var(--bg-elevated)",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span className="dash-meta">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "var(--bg-elevated)",
              }}
            />
          </label>

          {error ? <div style={{ color: "crimson" }}>{error}</div> : null}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
