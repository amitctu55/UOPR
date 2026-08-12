"use client";

import { Badge, statusTone } from "@/components/ui/badge";
import { PageHeader, SectionPanel, StatBlock } from "@/components/ui/feedback";
import { alerts, auditLogs, systemServices } from "@/lib/mock-data";

export default function MonitoringPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="System monitoring"
        description="Real-time service health, latency, alerts, and operational logs."
      />

      <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatBlock label="Overall status" value="Degraded" hint="1 service impacted" accent="warn" />
        <StatBlock label="Error rate" value="0.12%" hint="Last 15 min" accent="care" />
        <StatBlock label="p95 latency" value="94ms" accent="brand" />
        <StatBlock label="Open alerts" value={String(alerts.length)} accent="alert" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionPanel title="Service status">
          <ul className="divide-y divide-line">
            {systemServices.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="font-semibold text-ink">{s.name}</p>
                  <p className="text-body-sm text-ink-muted">
                    Latency {s.latency} · Uptime {s.uptime}
                  </p>
                </div>
                <Badge tone={statusTone(s.status)}>{s.status}</Badge>
              </li>
            ))}
          </ul>
        </SectionPanel>

        <SectionPanel id="alerts" title="Alerts">
          <ul className="space-y-4">
            {alerts.map((a) => (
              <li key={a.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{a.title}</p>
                    <p className="text-body-sm text-ink-muted">{a.detail}</p>
                  </div>
                  <Badge tone={a.severity === "high" ? "danger" : a.severity === "medium" ? "warning" : "neutral"}>
                    {a.severity}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </SectionPanel>
      </div>

      <SectionPanel className="mt-6" title="Recent logs">
        <ul className="divide-y divide-line font-mono text-body-sm">
          {auditLogs.map((l) => (
            <li key={l.id} className="flex flex-wrap justify-between gap-2 py-3 first:pt-0 last:pb-0">
              <span className="text-ink">
                [{l.time}] {l.actor} — {l.action} → {l.target}
              </span>
            </li>
          ))}
          <li className="py-3 text-ink-muted">[now] healthcheck · all regions · ok</li>
        </ul>
      </SectionPanel>
    </div>
  );
}
