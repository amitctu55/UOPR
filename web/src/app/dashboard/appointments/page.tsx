"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addDays, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { PageHeader, SectionPanel, Skeleton } from "@/components/ui/feedback";
import { api } from "@/lib/api";
import { cn, formatTime } from "@/lib/utils";

type View = "day" | "week" | "month";

export default function AppointmentsPage() {
  const qc = useQueryClient();
  const { data: appointments = [], isLoading } = useQuery({ queryKey: ["appointments"], queryFn: api.appointments });
  const create = useMutation({
    mutationFn: api.createAppointment,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["appointments"] }),
  });
  const [view, setView] = useState<View>("week");
  const [cursor, setCursor] = useState(new Date("2026-08-08"));
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [patient, setPatient] = useState("");
  const [when, setWhen] = useState("2026-08-09T10:00");
  const [type, setType] = useState("Video");

  const filtered = useMemo(() => appointments.filter((a) => a.patient.toLowerCase().includes(query.toLowerCase()) || a.doctor.toLowerCase().includes(query.toLowerCase())), [appointments, query]);
  const monthDays = eachDayOfInterval({ start: startOfWeek(startOfMonth(cursor)), end: endOfWeek(endOfMonth(cursor)) });
  const weekDays = eachDayOfInterval({ start: startOfWeek(cursor), end: endOfWeek(cursor) });

  function shift(dir: -1 | 1) {
    if (view === "day") setCursor(addDays(cursor, dir));
    else if (view === "week") setCursor(addDays(cursor, dir * 7));
    else setCursor(addDays(startOfMonth(cursor), dir > 0 ? 32 : -1));
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Appointment calendar" description="Day, week, and month views powered by the API." actions={<Button onClick={() => setOpen(true)}>Book appointment</Button>} />
      <SectionPanel>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Previous" onClick={() => shift(-1)}><ChevronLeft className="h-5 w-5" /></Button>
            <h2 className="min-w-[10rem] text-center font-display text-heading-sm text-ink">
              {view === "day" ? format(cursor, "MMM d, yyyy") : view === "week" ? `${format(weekDays[0], "MMM d")} – ${format(weekDays[6], "MMM d")}` : format(cursor, "MMMM yyyy")}
            </h2>
            <Button variant="ghost" size="icon" aria-label="Next" onClick={() => shift(1)}><ChevronRight className="h-5 w-5" /></Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Input placeholder="Search patient or doctor" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full sm:w-56" aria-label="Search appointments" />
            {(["day", "week", "month"] as View[]).map((v) => <Button key={v} size="sm" variant={view === v ? "primary" : "secondary"} onClick={() => setView(v)}>{v[0].toUpperCase() + v.slice(1)}</Button>)}
          </div>
        </div>
        {isLoading ? <Skeleton className="h-64 w-full" /> : view === "week" ? (
          <div className="grid gap-3 md:grid-cols-7">
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="rounded-xl border border-line p-3">
                <p className="text-label text-ink-soft">{format(day, "EEE")}</p>
                <p className="font-display text-heading-sm text-ink">{format(day, "d")}</p>
                <ul className="mt-2 space-y-2">
                  {filtered.filter((a) => isSameDay(new Date(a.start), day)).map((a) => (
                    <li key={a.id} className="rounded-lg bg-brand-50 px-2 py-1.5 dark:bg-brand-100">
                      <p className="text-[11px] font-semibold text-brand-800">{formatTime(a.start)}</p>
                      <p className="truncate text-body-sm text-ink">{a.patient}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : view === "month" ? (
          <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d} className="bg-surface-muted px-2 py-2 text-center text-label text-ink-soft">{d}</div>)}
            {monthDays.map((day) => {
              const dayAppts = filtered.filter((a) => isSameDay(new Date(a.start), day));
              return (
                <button type="button" key={day.toISOString()} onClick={() => { setCursor(day); setView("day"); }}
                  className={cn("min-h-[5.5rem] bg-surface-raised p-2 text-left transition-colors hover:bg-brand-50/60", !isSameMonth(day, cursor) && "opacity-40")}>
                  <span className={cn("inline-flex h-6 w-6 items-center justify-center rounded-full text-body-sm", isSameDay(day, new Date("2026-08-08")) && "bg-brand-600 text-white")}>{format(day, "d")}</span>
                  <div className="mt-1 space-y-0.5">{dayAppts.slice(0, 2).map((a) => <p key={a.id} className="truncate text-[11px] text-brand-700">{formatTime(a.start)} {a.patient.split(" ")[0]}</p>)}</div>
                </button>
              );
            })}
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {filtered.filter((a) => isSameDay(new Date(a.start), cursor)).map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-semibold text-ink">{formatTime(a.start)} – {formatTime(a.end)}</p>
                  <p className="text-body-sm text-ink-muted">{a.patient} with {a.doctor} · {a.location}</p>
                </div>
                <div className="flex gap-2"><Badge tone={statusTone(a.type)}>{a.type}</Badge><Badge tone={statusTone(a.status)}>{a.status}</Badge></div>
              </li>
            ))}
          </ul>
        )}
      </SectionPanel>

      <Modal open={open} onClose={() => setOpen(false)} title="Book appointment" description="Creates a record via POST /api/appointments">
        <form className="space-y-4" onSubmit={async (e) => { e.preventDefault(); await create.mutateAsync({ patient, doctor: "Dr. Marcus Webb", specialty: "Primary Care", type, start: new Date(when).toISOString(), duration_minutes: 30, location: type === "Video" ? "Telemedicine Room A" : "Main Campus" }); setOpen(false); setPatient(""); }}>
          <Input label="Patient name" required value={patient} onChange={(e) => setPatient(e.target.value)} />
          <Select label="Visit type" value={type} onChange={(e) => setType(e.target.value)} options={[{ value: "Video", label: "Video consultation" }, { value: "In-person", label: "In-person" }, { value: "Follow-up", label: "Follow-up" }]} />
          <Input label="Date & time" type="datetime-local" required value={when} onChange={(e) => setWhen(e.target.value)} />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" loading={create.isPending}>Confirm booking</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
