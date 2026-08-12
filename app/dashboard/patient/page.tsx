"use client";

import Link from "next/link";
import { Video, MessageSquare, Receipt, Calendar } from "lucide-react";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionPanel, StatBlock } from "@/components/ui/feedback";
import { HealthTrendChart } from "@/components/charts";
import { appointments, healthTrend, invoices, messages, vitals } from "@/lib/mock-data";
import { formatDate, formatTime } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

export default function PatientDashboard() {
  const user = useAuthStore((s) => s.user);
  const upcoming = appointments.filter((a) => a.patient === "Amelia Chen" && a.status !== "Completed");

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={`Hello, ${user?.name?.split(" ")[0] || "there"}`}
        description="Your care summary for today — appointments, vitals, and messages in one place."
        actions={
          <>
            <Link href="/dashboard/telemedicine/apt-1">
              <Button>
                <Video className="h-4 w-4" />
                Join telemedicine
              </Button>
            </Link>
            <Link href="/dashboard/appointments">
              <Button variant="secondary">
                <Calendar className="h-4 w-4" />
                Book visit
              </Button>
            </Link>
          </>
        }
      />

      <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatBlock label="Next visit" value={upcoming[0] ? formatTime(upcoming[0].start) : "—"} hint={upcoming[0]?.doctor} accent="brand" />
        <StatBlock label="Open invoices" value={String(invoices.filter((i) => i.status !== "Paid").length)} hint="Action needed" accent="warn" />
        <StatBlock label="Unread messages" value={String(messages.filter((m) => m.unread).length)} hint="Care team" accent="care" />
        <StatBlock label="Blood pressure" value={vitals[0].value} hint="mmHg · stable" accent="brand" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <SectionPanel
          className="lg:col-span-3"
          title="Upcoming appointments"
          action={
            <Link href="/dashboard/appointments" className="text-body-sm font-semibold text-brand-600 hover:underline">
              View calendar
            </Link>
          }
        >
          <ul className="divide-y divide-line">
            {upcoming.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="font-semibold text-ink">{a.doctor}</p>
                  <p className="text-body-sm text-ink-muted">
                    {formatDate(a.start)} · {formatTime(a.start)} · {a.specialty}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={statusTone(a.type)}>{a.type}</Badge>
                  <Badge tone={statusTone(a.status)}>{a.status}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </SectionPanel>

        <SectionPanel className="lg:col-span-2" title="Health snapshot" description="Recent vitals">
          <ul className="space-y-3">
            {vitals.map((v) => (
              <li key={v.label} className="flex items-baseline justify-between gap-2">
                <span className="text-body-sm text-ink-muted">{v.label}</span>
                <span className="font-display text-heading-sm text-ink">
                  {v.value}
                  <span className="ml-1 text-body-sm font-sans font-normal text-ink-soft">{v.unit}</span>
                </span>
              </li>
            ))}
          </ul>
        </SectionPanel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <SectionPanel className="lg:col-span-3" title="Six-month trend" description="Blood pressure & heart rate">
          <HealthTrendChart data={healthTrend} />
        </SectionPanel>
        <SectionPanel
          className="lg:col-span-2"
          title="Quick actions"
        >
          <div className="flex flex-col gap-2">
            <Link href="/dashboard/messages">
              <Button variant="soft" className="w-full justify-start">
                <MessageSquare className="h-4 w-4" /> Messages
              </Button>
            </Link>
            <Link href="/dashboard/billing">
              <Button variant="soft" className="w-full justify-start">
                <Receipt className="h-4 w-4" /> Billing portal
              </Button>
            </Link>
            <Link href="/dashboard/patients/p-1">
              <Button variant="soft" className="w-full justify-start">
                View full health record
              </Button>
            </Link>
          </div>
        </SectionPanel>
      </div>
    </div>
  );
}
