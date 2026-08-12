"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { PageHeader, SectionPanel } from "@/components/ui/feedback";
import { useThemeStore } from "@/stores/theme-store";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "general", label: "General" },
  { id: "security", label: "Security" },
  { id: "integrations", label: "Integrations" },
  { id: "notifications", label: "Notifications" },
  { id: "backup", label: "Backup" },
] as const;

type Tab = (typeof tabs)[number]["id"];

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("general");
  const [saved, setSaved] = useState(false);
  const { theme, setTheme } = useThemeStore();
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Settings" description="Workspace preferences, security, and integrations." />
      <div className="flex flex-col gap-6 lg:flex-row">
        <nav className="flex gap-1 overflow-x-auto lg:w-52 lg:flex-col" aria-label="Settings sections">
          {tabs.map((t) => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)} className={cn("whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-body-sm font-semibold transition-colors", tab === t.id ? "bg-brand-600 text-white dark:bg-brand-500 dark:text-brand-900" : "text-ink-muted hover:bg-surface-muted")}>{t.label}</button>
          ))}
        </nav>
        <div className="min-w-0 flex-1 space-y-4">
          {saved && <div className="rounded-xl bg-care-50 px-4 py-3 text-body-sm text-care-700" role="status">Settings saved.</div>}
          {tab === "general" && (
            <SectionPanel title="General">
              <div className="max-w-lg space-y-4">
                <Input label="Organization name" defaultValue="Northshore Medical" />
                <Select label="Theme" value={theme} onChange={(e) => setTheme(e.target.value as "light" | "dark")} options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} />
                <Button onClick={save}>Save changes</Button>
              </div>
            </SectionPanel>
          )}
          {tab === "security" && (
            <SectionPanel title="Security">
              <div className="max-w-lg space-y-4">
                <Select label="MFA policy" defaultValue="required" options={[{ value: "required", label: "Required for all users" }, { value: "admins", label: "Admins only" }]} />
                <Select label="Session timeout" defaultValue="30" options={[{ value: "15", label: "15 minutes" }, { value: "30", label: "30 minutes" }, { value: "60", label: "60 minutes" }]} />
                <Button onClick={save}>Update security</Button>
              </div>
            </SectionPanel>
          )}
          {tab === "integrations" && (
            <SectionPanel title="Integrations">
              <ul className="divide-y divide-line">
                {["MediLink Labs", "BlueCare Claims API", "SSO · Okta", "Twilio SMS"].map((name) => (
                  <li key={name} className="flex items-center justify-between py-3"><p className="font-semibold text-ink">{name}</p><Button size="sm" variant="secondary">Manage</Button></li>
                ))}
              </ul>
            </SectionPanel>
          )}
          {tab === "notifications" && (
            <SectionPanel title="Notifications">
              <div className="max-w-lg space-y-3">
                {["Appointment reminders", "Lab result availability", "Billing due notices", "System incident alerts"].map((label) => (
                  <label key={label} className="flex items-center justify-between gap-4 rounded-xl border border-line px-4 py-3">
                    <span className="text-body-sm font-medium text-ink">{label}</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4 accent-brand-600" />
                  </label>
                ))}
                <Button onClick={save}>Save preferences</Button>
              </div>
            </SectionPanel>
          )}
          {tab === "backup" && (
            <SectionPanel title="Backup & recovery">
              <div className="max-w-lg space-y-4">
                <Select label="Backup frequency" defaultValue="daily" options={[{ value: "hourly", label: "Hourly" }, { value: "daily", label: "Daily" }, { value: "weekly", label: "Weekly" }]} />
                <p className="text-body-sm text-ink-muted">Last successful backup: today at 03:12 UTC.</p>
                <Button onClick={save}>Save backup policy</Button>
              </div>
            </SectionPanel>
          )}
        </div>
      </div>
    </div>
  );
}
