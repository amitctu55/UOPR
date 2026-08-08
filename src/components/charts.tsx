"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const tooltipStyle = {
  background: "var(--surface-raised)",
  border: "1px solid var(--line)",
  borderRadius: "12px",
  color: "var(--ink)",
  fontSize: "12px",
};

export function HealthTrendChart({ data }: { data: { month: string; bp: number; hr: number }[] }) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="bpFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c8f86" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#0c8f86" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "var(--ink-soft)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "var(--ink-soft)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="bp" name="Systolic" stroke="#0c6b6b" fill="url(#bpFill)" strokeWidth={2} />
          <Area type="monotone" dataKey="hr" name="Heart rate" stroke="#2a9d7a" fill="transparent" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DepartmentChart({ data }: { data: { name: string; utilization: number; patients: number }[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "var(--ink-soft)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "var(--ink-soft)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="utilization" name="Utilization %" fill="#0c8f86" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenueChart({
  data,
}: {
  data: { month: string; collected: number; outstanding: number }[];
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "var(--ink-soft)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "var(--ink-soft)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="collected" name="Collected" stroke="#0c6b6b" fill="#0c8f86" fillOpacity={0.2} strokeWidth={2} />
          <Area type="monotone" dataKey="outstanding" name="Outstanding" stroke="#e59a2b" fill="#e59a2b" fillOpacity={0.12} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
