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

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Settings" description="Configure workspace preferences, security, and integrations." />

      <div className="flex flex-col gap-6 lg:flex-row">
        <nav className="flex gap-1 overflow-x-auto lg:w-52 lg:flex-col" aria-label="Settings sections">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-xl px-3 py-2.5 text-left text-body-sm font-semibold transition-colors whitespace-nowrap",
                tab === t.id ? "bg-brand-600 text-white dark:bg-brand-500 dark:text-brand-900" : "text-ink-muted hover:bg-surface-muted"
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="min-w-0 flex-1 space-y-4">
          {saved && (
            <div className="rounded-xl bg-care-50 px-4 py-3 text-body-sm text-care-700" role="status">
              Settings saved.
            </div>
          )}

          {tab === "general" && (
            <SectionPanel title="General" description="Organization profile and appearance">
              <div className="space-y-4 max-w-lg">
                <Input label="Organization name" defaultValue="Northshore Medical" />
                <Input label="Support email" type="email" defaultValue="support@northshore.care" />
                <Select
                  label="Theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as "light" | "dark")}
                  options={[
                    { value: "light", label: "Light" },
                    { value: "dark", label: "Dark" },
                  ]}
                />
                <Select
                  label="Timezone"
                  defaultValue="America/New_York"
                  options={[
                    { value: "America/New_York", label: "Eastern (ET)" },
                    { value: "America/Chicago", label: "Central (CT)" },
                    { value: "America/Los_Angeles", label: "Pacific (PT)" },
                  ]}
                />
                <Button onClick={save}>Save changes</Button>
              </div>
            </SectionPanel>
          )}

          {tab === "security" && (
            <SectionPanel title="Security" description="MFA, session, and access policies">
              <div className="space-y-4 max-w-lg">
                <Select
                  label="MFA policy"
                  defaultValue="required"
                  options={[
                    { value: "required", label: "Required for all users" },
                    { value: "admins", label: "Required for admins only" },
                    { value: "optional", label: "Optional" },
                  ]}
                />
                <Select
                  label="Session timeout"
                  defaultValue="30"
                  options={[
                    { value: "15", label: "15 minutes" },
                    { value: "30", label: "30 minutes" },
                    { value: "60", label: "60 minutes" },
                  ]}
                />
                <Input label="Allowed IP ranges" hint="Comma-separated CIDR" placeholder="10.0.0.0/8" />
                <Button onClick={save}>Update security</Button>
              </div>
            </SectionPanel>
          )}

          {tab === "integrations" && (
            <SectionPanel title="Integrations" description="Labs, insurers, and identity">
              <ul className="divide-y divide-line">
                {[
                  { name: "MediLink Labs", status: "Connected" },
                  { name: "BlueCare Claims API", status: "Connected" },
                  { name: "SSO · Okta", status: "Configured" },
                  { name: "Twilio SMS", status: "Not connected" },
                ].map((i) => (
                  <li key={i.name} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-semibold text-ink">{i.name}</p>
                      <p className="text-body-sm text-ink-muted">{i.status}</p>
                    </div>
                    <Button size="sm" variant="secondary">
                      Manage
                    </Button>
                  </li>
                ))}
              </ul>
            </SectionPanel>
          )}

          {tab === "notifications" && (
            <SectionPanel title="Notifications" description="Email, SMS, and in-app alerts">
              <div className="space-y-3 max-w-lg">
                {[
                  "Appointment reminders",
                  "Lab result availability",
                  "Billing due notices",
                  "System incident alerts",
                ].map((label) => (
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
            <SectionPanel title="Backup & recovery" description="Automated snapshots and retention">
              <div className="space-y-4 max-w-lg">
                <Select
                  label="Backup frequency"
                  defaultValue="daily"
                  options={[
                    { value: "hourly", label: "Hourly" },
                    { value: "daily", label: "Daily" },
                    { value: "weekly", label: "Weekly" },
                  ]}
                />
                <Select
                  label="Retention"
                  defaultValue="30"
                  options={[
                    { value: "7", label: "7 days" },
                    { value: "30", label: "30 days" },
                    { value: "90", label: "90 days" },
                  ]}
                />
                <p className="text-body-sm text-ink-muted">Last successful backup: today at 03:12 UTC (us-east-1).</p>
                <Button onClick={save}>Save backup policy</Button>
              </div>
            </SectionPanel>
          )}
        </div>
      </div>
    </div>
  );
}
