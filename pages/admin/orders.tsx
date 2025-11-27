// /pages/admin/orders.tsx
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // temp only: pull from in-memory via API you might add; or inline test list
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then(setOrders)
      .catch(() => {});
  }, []);

  const createFinal = async (id: string) => {
    const r = await fetch("/api/admin/create-final-invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: id }),
    });
    const j = await r.json();
    alert(r.ok ? `Invoice sent: ${j.invoiceId}` : `Error: ${j.error}`);
  };

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="h2 mb-4">Orders (temp)</h1>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Order</th>
            <th>Status</th>
            <th>Customer</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="font-mono">{o.id}</td>
              <td>{o.status}</td>
              <td>{o.email || "-"}</td>
              <td>{o.slug || "-"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => createFinal(o.id)}
                >
                  Send Final 50% Invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
