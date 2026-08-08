"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionPanel, Skeleton, StatBlock } from "@/components/ui/feedback";
import { api } from "@/lib/api";

export default function PatientProfilePage({ params }: { params: { id: string } }) {
  const { data: patient, isLoading, error } = useQuery({ queryKey: ["patient", params.id], queryFn: () => api.patient(params.id) });

  if (isLoading) return <div className="space-y-4"><Skeleton className="h-10 w-64" /><Skeleton className="h-40 w-full" /></div>;
  if (error || !patient) return <p className="text-alert-600" role="alert">Unable to load patient.</p>;

  return (
    <div className="animate-fade-in">
      <PageHeader title={patient.name} description={`${patient.mrn} · ${patient.age}y · ${patient.gender} · Blood type ${patient.blood_type}`}
        actions={<><Link href={`/dashboard/ehr/${patient.id}`}><Button variant="secondary">Open EHR</Button></Link><Link href="/dashboard/telemedicine/apt-1"><Button>Start visit</Button></Link></>} />
      <div className="mb-6 grid gap-6 sm:grid-cols-3">
        <StatBlock label="Last visit" value={patient.last_visit} />
        <StatBlock label="Active meds" value={String(patient.medications.length)} accent="care" />
        <StatBlock label="Allergies" value={String(patient.allergies.length)} accent="alert" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <SectionPanel title="Demographics">
          <dl className="space-y-3 text-body-sm">
            <div className="flex justify-between gap-4"><dt className="text-ink-muted">MRN</dt><dd className="font-semibold text-ink">{patient.mrn}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink-muted">Age / gender</dt><dd className="font-semibold text-ink">{patient.age} / {patient.gender}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink-muted">Blood type</dt><dd className="font-semibold text-ink">{patient.blood_type}</dd></div>
          </dl>
        </SectionPanel>
        <SectionPanel title="Allergies"><ul className="flex flex-wrap gap-2">{patient.allergies.map((a) => <li key={a}><Badge tone={a.toLowerCase().includes("none") ? "neutral" : "danger"}>{a}</Badge></li>)}</ul></SectionPanel>
        <SectionPanel title="Conditions"><ul className="space-y-2">{patient.conditions.map((c) => <li key={c} className="text-body-sm font-medium text-ink">{c}</li>)}</ul></SectionPanel>
      </div>
      <SectionPanel className="mt-6" title="Current medications">
        <ul className="divide-y divide-line">{patient.medications.map((m) => <li key={m} className="flex items-center justify-between py-3 first:pt-0 last:pb-0"><span className="font-medium text-ink">{m}</span><Badge tone="brand">Active</Badge></li>)}</ul>
      </SectionPanel>
    </div>
  );
}
