"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionPanel, StatBlock } from "@/components/ui/feedback";
import { api } from "@/lib/api";

const users = [
  { name: "Amelia Chen", email: "amelia.chen@email.com", role: "Patient", org: "Self" },
  { name: "Dr. Marcus Webb", email: "m.webb@upchar.care", role: "Doctor", org: "Northshore Medical" },
  { name: "Priya Nair", email: "p.nair@northshore.care", role: "Hospital Admin", org: "Northshore Medical" },
  { name: "Jordan Hale", email: "jordan.hale@upchar.io", role: "System Admin", org: "UPCHAR" },
];

const audit = [
  { id: "a1", actor: "Jordan Hale", action: "Updated RBAC policy", target: "role:hospital", time: "2 min ago" },
  { id: "a2", actor: "Priya Nair", action: "Allocated beds", target: "Emergency · +6", time: "18 min ago" },
  { id: "a3", actor: "Dr. Marcus Webb", action: "Signed SOAP note", target: "MRN-88421", time: "41 min ago" },
];

export default function AdminDashboard() {
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: api.services });
  const { data: alerts = [] } = useQuery({ queryKey: ["alerts"], queryFn: api.alerts });

  return (
    <div className="animate-fade-in">
      <PageHeader title="System administration" description="Platform health, user management, and audit activity."
        actions={<Link href="/dashboard/monitoring"><Button variant="secondary">Open monitoring</Button></Link>} />
      <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatBlock label="Active users" value="2,841" />
        <StatBlock label="API uptime (30d)" value="99.97%" accent="care" />
        <StatBlock label="Degraded services" value={String(services.filter((s) => s.status !== "Operational").length)} accent="warn" />
        <StatBlock label="Security alerts" value={String(alerts.filter((a) => a.severity !== "low").length)} accent="alert" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionPanel title="Service status">
          <ul className="divide-y divide-line">
            {services.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div><p className="font-semibold text-ink">{s.name}</p><p className="text-body-sm text-ink-muted">{s.latency_ms}ms · {s.uptime}</p></div>
                <Badge tone={statusTone(s.status)}>{s.status}</Badge>
              </li>
            ))}
          </ul>
        </SectionPanel>
        <SectionPanel title="Audit log">
          <ul className="space-y-3">
            {audit.map((a) => (
              <li key={a.id} className="flex items-start justify-between gap-3">
                <div><p className="font-semibold text-ink">{a.action}</p><p className="text-body-sm text-ink-muted">{a.actor} · {a.target}</p></div>
                <span className="shrink-0 text-label text-ink-soft">{a.time}</span>
              </li>
            ))}
          </ul>
        </SectionPanel>
      </div>
      <SectionPanel id="users" className="mt-6" title="User & role management">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-body-sm">
            <thead><tr className="border-b border-line text-label text-ink-soft"><th className="pb-3 font-semibold">Name</th><th className="pb-3 font-semibold">Email</th><th className="pb-3 font-semibold">Role</th><th className="pb-3 font-semibold">Organization</th><th className="pb-3 font-semibold">Status</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-b border-line last:border-0">
                  <td className="py-3 font-semibold text-ink">{u.name}</td>
                  <td className="py-3 text-ink-muted">{u.email}</td>
                  <td className="py-3"><Badge tone="brand">{u.role}</Badge></td>
                  <td className="py-3 text-ink-muted">{u.org}</td>
                  <td className="py-3"><Badge tone="success">Active</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionPanel>
    </div>
  );
}
