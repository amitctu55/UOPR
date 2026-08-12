"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ClipboardList, Video } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionPanel, StatBlock } from "@/components/ui/feedback";
import { api } from "@/lib/api";
import { formatTime } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

export default function DoctorDashboard() {
  const user = useAuthStore((s) => s.user);
  const { data: appointments = [] } = useQuery({ queryKey: ["appointments"], queryFn: api.appointments });
  const { data: patients = [] } = useQuery({ queryKey: ["patients"], queryFn: api.patients });
  const schedule = appointments.filter((a) => a.doctor.includes("Webb") || a.status === "Waiting");
  const queue = appointments.filter((a) => a.type === "Video" && ["Waiting", "Confirmed"].includes(a.status));

  return (
    <div className="animate-fade-in">
      <PageHeader title={user?.name || "Clinician"} description="Today’s schedule, telemedicine queue, and patient list."
        actions={<Link href="/dashboard/ehr/p-1"><Button><ClipboardList className="h-4 w-4" /> Open EHR editor</Button></Link>} />
      <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatBlock label="Appointments today" value={String(schedule.length)} />
        <StatBlock label="Telemedicine queue" value={String(queue.length)} accent="care" />
        <StatBlock label="Unsigned notes" value="2" accent="warn" />
        <StatBlock label="Active patients" value={String(patients.length)} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionPanel title="Schedule" description="Day view · next slots">
          <ol className="relative space-y-0 border-l border-line pl-5">
            {schedule.map((a) => (
              <li key={a.id} className="relative pb-5 last:pb-0">
                <span className="absolute -left-[1.4rem] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-500 ring-4 ring-surface-raised" />
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-ink">{formatTime(a.start)} · {a.patient}</p>
                    <p className="text-body-sm text-ink-muted">{a.type} · {a.location}</p>
                  </div>
                  <Badge tone={statusTone(a.status)}>{a.status}</Badge>
                </div>
              </li>
            ))}
          </ol>
        </SectionPanel>
        <SectionPanel title="Telemedicine queue" action={<Link href="/dashboard/telemedicine/apt-1"><Button size="sm"><Video className="h-4 w-4" /> Launch</Button></Link>}>
          <ul className="space-y-3">
            {queue.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 rounded-xl bg-surface px-3 py-3">
                <div className="flex items-center gap-3"><Avatar name={a.patient} size="sm" /><div><p className="font-semibold text-ink">{a.patient}</p><p className="text-body-sm text-ink-muted">{formatTime(a.start)}</p></div></div>
                <Badge tone={statusTone(a.status)}>{a.status}</Badge>
              </li>
            ))}
          </ul>
        </SectionPanel>
      </div>
      <SectionPanel className="mt-6" title="Patient list">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-body-sm">
            <thead><tr className="border-b border-line text-label text-ink-soft"><th className="pb-3 font-semibold">Patient</th><th className="pb-3 font-semibold">MRN</th><th className="pb-3 font-semibold">Conditions</th><th className="pb-3 font-semibold">Actions</th></tr></thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-b border-line last:border-0">
                  <td className="py-3 font-semibold text-ink">{p.name}</td>
                  <td className="py-3 text-ink-muted">{p.mrn}</td>
                  <td className="py-3 text-ink-muted">{p.conditions.join(", ")}</td>
                  <td className="py-3"><div className="flex gap-2"><Link href={`/dashboard/patients/${p.id}`} className="font-semibold text-brand-600 hover:underline">Profile</Link><Link href={`/dashboard/ehr/${p.id}`} className="font-semibold text-brand-600 hover:underline">Chart</Link></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionPanel>
    </div>
  );
}
