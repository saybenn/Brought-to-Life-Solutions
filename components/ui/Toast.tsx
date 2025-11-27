// /components/ui/Toast.tsx
import { useEffect, useState } from "react";

type ToastMsg = { id: number; text: string };

export default function ToastHost() {
  const [items, setItems] = useState<ToastMsg[]>([]);
  useEffect(() => {
    const h = (e: CustomEvent<string>) => {
      const id = Date.now();
      setItems((s) => [...s, { id, text: e.detail }]);
      setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 2600);
    };
    window.addEventListener("app:toast" as any, h as any);
    return () => window.removeEventListener("app:toast" as any, h as any);
  }, []);

  return (
    <div className="fixed inset-x-0 top-4 z-[9999] flex flex-col items-center gap-2 px-4">
      {items.map((t) => (
        <div
          key={t.id}
          className="rounded-[var(--r-md)] bg-(--card-800) text-(--ink-900) shadow-lg px-4 py-2 border border-(--border) max-w-lg w-full"
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}

// /components/ui/toast.ts
export function toast(msg: string) {
  window.dispatchEvent(new CustomEvent("app:toast", { detail: msg }));
}
