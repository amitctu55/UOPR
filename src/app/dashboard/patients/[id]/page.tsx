"use client";

import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { PageHeader, SectionPanel, StatBlock } from "@/components/ui/feedback";
import { patients } from "@/lib/mock-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PatientProfilePage({ params }: { params: { id: string } }) {
  const patient = patients.find((p) => p.id === params.id) || patients[0];
  if (!patient) notFound();

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={patient.name}
        description={`${patient.mrn} · ${patient.age}y · ${patient.gender} · Blood type ${patient.bloodType}`}
        actions={
          <>
            <Link href={`/dashboard/ehr/${patient.id}`}>
              <Button variant="secondary">Open EHR</Button>
            </Link>
            <Link href="/dashboard/telemedicine/apt-1">
              <Button>Start visit</Button>
            </Link>
          </>
        }
      />

      <div className="mb-6 grid gap-6 sm:grid-cols-3">
        <StatBlock label="Last visit" value={patient.lastVisit} accent="brand" />
        <StatBlock label="Active meds" value={String(patient.medications.length)} accent="care" />
        <StatBlock label="Allergies" value={String(patient.allergies.length)} accent="alert" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionPanel title="Demographics">
          <dl className="space-y-3 text-body-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Full name</dt>
              <dd className="font-semibold text-ink">{patient.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">MRN</dt>
              <dd className="font-semibold text-ink">{patient.mrn}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Age / gender</dt>
              <dd className="font-semibold text-ink">
                {patient.age} / {patient.gender}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Blood type</dt>
              <dd className="font-semibold text-ink">{patient.bloodType}</dd>
            </div>
          </dl>
        </SectionPanel>

        <SectionPanel title="Allergies">
          <ul className="flex flex-wrap gap-2">
            {patient.allergies.map((a) => (
              <li key={a}>
                <Badge tone={a.toLowerCase().includes("none") ? "neutral" : "danger"}>{a}</Badge>
              </li>
            ))}
          </ul>
        </SectionPanel>

        <SectionPanel title="Conditions">
          <ul className="space-y-2">
            {patient.conditions.map((c) => (
              <li key={c} className="text-body-sm font-medium text-ink">
                {c}
              </li>
            ))}
          </ul>
        </SectionPanel>
      </div>

      <SectionPanel className="mt-6" title="Current medications">
        <ul className="divide-y divide-line">
          {patient.medications.map((m) => (
            <li key={m} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <span className="font-medium text-ink">{m}</span>
              <Badge tone="brand">Active</Badge>
            </li>
          ))}
        </ul>
      </SectionPanel>
    </div>
  );
}
