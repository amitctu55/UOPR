"use client";

import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { PageHeader, SectionPanel, StatBlock } from "@/components/ui/feedback";
import { invoices } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function BillingPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof invoices)[0] | null>(null);
  const [sort, setSort] = useState<"date" | "amount">("date");

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    const list = invoices.filter(
      (i) => i.id.toLowerCase().includes(q) || i.patient.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
    );
    return list.sort((a, b) => (sort === "amount" ? b.amount - a.amount : b.date.localeCompare(a.date)));
  }, [query, sort]);

  const due = invoices.filter((i) => i.status !== "Paid").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Billing portal"
        description="Invoices, payment history, and insurance claims."
        actions={
          <Button variant="secondary">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        }
      />

      <div className="mb-6 grid gap-6 sm:grid-cols-3">
        <StatBlock label="Outstanding" value={formatCurrency(due)} accent="warn" />
        <StatBlock label="Paid (30d)" value={formatCurrency(240)} accent="care" />
        <StatBlock label="Claims pending" value="2" accent="brand" />
      </div>

      <SectionPanel title="Invoices">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search invoices…"
              className="h-10 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-body-sm focus:border-brand-500 focus:shadow-focus"
              aria-label="Search invoices"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant={sort === "date" ? "primary" : "secondary"} onClick={() => setSort("date")}>
              Sort by date
            </Button>
            <Button size="sm" variant={sort === "amount" ? "primary" : "secondary"} onClick={() => setSort("amount")}>
              Sort by amount
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-body-sm">
            <thead>
              <tr className="border-b border-line text-label text-ink-soft">
                <th className="pb-3 font-semibold">Invoice</th>
                <th className="pb-3 font-semibold">Patient</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Insurer</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((inv) => (
                <tr key={inv.id} className="border-b border-line last:border-0">
                  <td className="py-3 font-semibold text-ink">{inv.id}</td>
                  <td className="py-3 text-ink-muted">{inv.patient}</td>
                  <td className="py-3 text-ink-muted">{formatDate(inv.date)}</td>
                  <td className="py-3 text-ink-muted">{inv.insurer}</td>
                  <td className="py-3 font-semibold text-ink">{formatCurrency(inv.amount)}</td>
                  <td className="py-3">
                    <Badge tone={statusTone(inv.status)}>{inv.status}</Badge>
                  </td>
                  <td className="py-3">
                    <button
                      type="button"
                      className="font-semibold text-brand-600 hover:underline"
                      onClick={() => setSelected(inv)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionPanel>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.id || "Invoice"}
        description={selected?.description}
      >
        {selected && (
          <div className="space-y-3 text-body-sm">
            <p>
              <span className="text-ink-muted">Patient:</span> {selected.patient}
            </p>
            <p>
              <span className="text-ink-muted">Amount:</span> {formatCurrency(selected.amount)}
            </p>
            <p>
              <span className="text-ink-muted">Insurer:</span> {selected.insurer}
            </p>
            <p>
              <span className="text-ink-muted">Status:</span> {selected.status}
            </p>
            {selected.status !== "Paid" && (
              <form
                className="space-y-3 border-t border-line pt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSelected(null);
                }}
              >
                <Input label="Payment method" placeholder="Card ending 4242" />
                <Button type="submit" className="w-full">
                  Pay {formatCurrency(selected.amount)}
                </Button>
              </form>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
