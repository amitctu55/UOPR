"use client";

import { Badge, statusTone } from "@/components/ui/badge";
import { PageHeader, SectionPanel, StatBlock } from "@/components/ui/feedback";
import { DepartmentChart } from "@/components/charts";
import { alerts, departmentStats, staff } from "@/lib/mock-data";

export default function HospitalDashboard() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Hospital operations"
        description="Staff oversight, resource allocation, and department load for Northshore Medical."
      />

      <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatBlock label="Census" value="412" hint="+18 vs yesterday" accent="brand" />
        <StatBlock label="Bed utilization" value="86%" hint="Emergency 94%" accent="warn" />
        <StatBlock label="Staff on duty" value="128" hint="Across 5 departments" accent="care" />
        <StatBlock label="Open alerts" value={String(alerts.length)} hint="1 high severity" accent="alert" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <SectionPanel className="lg:col-span-3" title="Department utilization" description="% capacity">
          <DepartmentChart data={departmentStats} />
        </SectionPanel>
        <SectionPanel className="lg:col-span-2" title="Active alerts">
          <ul className="space-y-3">
            {alerts.map((a) => (
              <li key={a.id} className="border-l-4 border-l-transparent pl-3" style={{
                borderLeftColor: a.severity === "high" ? "var(--alert-500)" : a.severity === "medium" ? "var(--warn-500)" : "var(--brand-400)",
              }}>
                <p className="font-semibold text-ink">{a.title}</p>
                <p className="text-body-sm text-ink-muted">{a.detail}</p>
                <p className="mt-1 text-label text-ink-soft">{a.time} ago</p>
              </li>
            ))}
          </ul>
        </SectionPanel>
      </div>

      <SectionPanel id="staff" className="mt-6" title="Staff roster" description="Current shift assignments">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-body-sm">
            <thead>
              <tr className="border-b border-line text-label text-ink-soft">
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Department</th>
                <th className="pb-3 font-semibold">Shift</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.id} className="border-b border-line last:border-0">
                  <td className="py-3 font-semibold text-ink">{s.name}</td>
                  <td className="py-3 text-ink-muted">{s.role}</td>
                  <td className="py-3 text-ink-muted">{s.dept}</td>
                  <td className="py-3 text-ink-muted">{s.shift}</td>
                  <td className="py-3">
                    <Badge tone={statusTone(s.status)}>{s.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionPanel>
    </div>
  );
}
