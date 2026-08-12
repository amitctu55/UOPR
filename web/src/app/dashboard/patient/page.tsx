"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MessageSquare, Receipt, Video } from "lucide-react";
import { HealthTrendChart } from "@/components/charts";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionPanel, Skeleton, StatBlock } from "@/components/ui/feedback";
import { api } from "@/lib/api";
import { formatDate, formatTime } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

export default function PatientDashboard() {
  const user = useAuthStore((s) => s.user);
  const { data: appointments = [], isLoading: loadingAppts } = useQuery({ queryKey: ["appointments"], queryFn: api.appointments });
  const { data: invoices = [] } = useQuery({ queryKey: ["invoices"], queryFn: api.invoices });
  const { data: messages = [] } = useQuery({ queryKey: ["messages"], queryFn: api.messages });
  const { data: trend = [] } = useQuery({ queryKey: ["health-trend"], queryFn: api.healthTrend });

  const upcoming = appointments.filter((a) => a.patient === "Amelia Chen" && a.status !== "Completed");

  return (
    <div className="animate-fade-in">
      <PageHeader title={`Hello, ${user?.name?.split(" ")[0] || "there"}`} description="Your care summary — live from the UPCHAR API."
        actions={<>
          <Link href="/dashboard/telemedicine/apt-1"><Button><Video className="h-4 w-4" /> Join telemedicine</Button></Link>
          <Link href="/dashboard/appointments"><Button variant="secondary"><Calendar className="h-4 w-4" /> Book visit</Button></Link>
        </>} />

      <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatBlock label="Next visit" value={upcoming[0] ? formatTime(upcoming[0].start) : "—"} hint={upcoming[0]?.doctor} />
        <StatBlock label="Open invoices" value={String(invoices.filter((i) => i.status !== "Paid").length)} accent="warn" />
        <StatBlock label="Unread messages" value={String(messages.filter((m) => m.unread).length)} accent="care" />
        <StatBlock label="Blood pressure" value="128/82" hint="mmHg · stable" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <SectionPanel className="lg:col-span-3" title="Upcoming appointments" action={<Link href="/dashboard/appointments" className="text-body-sm font-semibold text-brand-600 hover:underline">View calendar</Link>}>
          {loadingAppts ? <Skeleton className="h-32 w-full" /> : (
            <ul className="divide-y divide-line">
              {upcoming.map((a) => (
                <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-ink">{a.doctor}</p>
                    <p className="text-body-sm text-ink-muted">{formatDate(a.start)} · {formatTime(a.start)} · {a.specialty}</p>
                  </div>
                  <div className="flex gap-2"><Badge tone={statusTone(a.type)}>{a.type}</Badge><Badge tone={statusTone(a.status)}>{a.status}</Badge></div>
                </li>
              ))}
            </ul>
          )}
        </SectionPanel>
        <SectionPanel className="lg:col-span-2" title="Quick actions">
          <div className="flex flex-col gap-2">
            <Link href="/dashboard/messages"><Button variant="soft" className="w-full justify-start"><MessageSquare className="h-4 w-4" /> Messages</Button></Link>
            <Link href="/dashboard/billing"><Button variant="soft" className="w-full justify-start"><Receipt className="h-4 w-4" /> Billing portal</Button></Link>
            <Link href="/dashboard/patients/p-1"><Button variant="soft" className="w-full justify-start">View health record</Button></Link>
          </div>
        </SectionPanel>
      </div>

      <SectionPanel className="mt-6" title="Six-month trend" description="Blood pressure & heart rate">
        <HealthTrendChart data={trend} />
      </SectionPanel>
    </div>
  );
}
