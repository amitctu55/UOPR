"use client";

import { FormEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader, SectionPanel, Skeleton } from "@/components/ui/feedback";
import { api } from "@/lib/api";

export default function EhrEditorPage({ params }: { params: { id: string } }) {
  const { data: patient, isLoading } = useQuery({ queryKey: ["patient", params.id], queryFn: () => api.patient(params.id) });
  const [saved, setSaved] = useState(false);
  const [soap, setSoap] = useState({
    subjective: "Patient reports mild chest tightness after exertion; denies radiating pain.",
    objective: "BP 128/82, HR 72, SpO₂ 98%. Lungs clear. Regular rhythm, no murmur.",
    assessment: "Stable hypertension. Exertional symptoms likely non-cardiac; monitor.",
    plan: "Continue Lisinopril 10mg daily. Repeat BMP in 4 weeks.",
  });
  const [vitalsForm, setVitalsForm] = useState({ bp: "128/82", hr: "72", spo2: "98", temp: "98.4" });

  if (isLoading || !patient) return <div className="space-y-4"><Skeleton className="h-10 w-64" /><Skeleton className="h-64 w-full" /></div>;

  function onSave(e: FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="EHR editor" description={`${patient.name} · ${patient.mrn} — SOAP notes, vitals, and labs`}
        actions={<Button form="soap-form" type="submit">Sign & save note</Button>} />
      {saved && <div className="mb-4 rounded-xl border border-care-500/30 bg-care-50 px-4 py-3 text-body-sm text-care-700" role="status">Note signed and synced to the patient chart.</div>}
      <form id="soap-form" onSubmit={onSave} className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {(["subjective", "objective", "assessment", "plan"] as const).map((key) => (
            <SectionPanel key={key} title={key[0].toUpperCase() + key.slice(1)}>
              <textarea className="min-h-[100px] w-full resize-y rounded-xl border border-line bg-surface px-3 py-2.5 text-body-md text-ink focus:border-brand-500 focus:shadow-focus" value={soap[key]} onChange={(e) => setSoap({ ...soap, [key]: e.target.value })} aria-label={key} />
            </SectionPanel>
          ))}
        </div>
        <div className="space-y-6">
          <SectionPanel title="Vitals">
            <div className="space-y-3">
              <Input label="Blood pressure" value={vitalsForm.bp} onChange={(e) => setVitalsForm({ ...vitalsForm, bp: e.target.value })} />
              <Input label="Heart rate" value={vitalsForm.hr} onChange={(e) => setVitalsForm({ ...vitalsForm, hr: e.target.value })} />
              <Input label="SpO₂ %" value={vitalsForm.spo2} onChange={(e) => setVitalsForm({ ...vitalsForm, spo2: e.target.value })} />
              <Input label="Temperature °F" value={vitalsForm.temp} onChange={(e) => setVitalsForm({ ...vitalsForm, temp: e.target.value })} />
            </div>
          </SectionPanel>
          <SectionPanel title="Allergies"><div className="flex flex-wrap gap-2">{patient.allergies.map((a) => <Badge key={a} tone="danger">{a}</Badge>)}</div></SectionPanel>
        </div>
      </form>
    </div>
  );
}
