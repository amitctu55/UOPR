"use client";

import { useQuery } from "@tanstack/react-query";
import { Badge, statusTone } from "@/components/ui/badge";
import { PageHeader, SectionPanel, Skeleton, StatBlock } from "@/components/ui/feedback";
import { api } from "@/lib/api";

export default function MonitoringPage() {
  const { data: services = [], isLoading } = useQuery({ queryKey: ["services"], queryFn: api.services });
  const { data: alerts = [] } = useQuery({ queryKey: ["alerts"], queryFn: api.alerts });

  return (
    <div className="animate-fade-in">
      <PageHeader title="System monitoring" description="Real-time service health from the UPCHAR API." />
      <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatBlock label="Overall status" value={services.some((s) => s.status !== "Operational") ? "Degraded" : "Healthy"} accent="warn" />
        <StatBlock label="Error rate" value="0.12%" accent="care" />
        <StatBlock label="p95 latency" value="94ms" />
        <StatBlock label="Open alerts" value={String(alerts.length)} accent="alert" />
      </div>
      {isLoading ? <Skeleton className="h-48 w-full" /> : (
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionPanel title="Service status">
            <ul className="divide-y divide-line">
              {services.map((s) => (
                <li key={s.name} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div><p className="font-semibold text-ink">{s.name}</p><p className="text-body-sm text-ink-muted">Latency {s.latency_ms}ms · Uptime {s.uptime}</p></div>
                  <Badge tone={statusTone(s.status)}>{s.status}</Badge>
                </li>
              ))}
            </ul>
          </SectionPanel>
          <SectionPanel id="alerts" title="Alerts">
            <ul className="space-y-4">
              {alerts.map((a) => (
                <li key={a.id} className="flex items-start justify-between gap-3">
                  <div><p className="font-semibold text-ink">{a.title}</p><p className="text-body-sm text-ink-muted">{a.detail}</p></div>
                  <Badge tone={a.severity === "high" ? "danger" : a.severity === "medium" ? "warning" : "neutral"}>{a.severity}</Badge>
                </li>
              ))}
            </ul>
          </SectionPanel>
        </div>
      )}
    </div>
  );
}
