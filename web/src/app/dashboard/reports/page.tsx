"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FileSpreadsheet, FileText } from "lucide-react";
import { DepartmentChart, RevenueChart } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { PageHeader, SectionPanel, StatBlock } from "@/components/ui/feedback";
import { api } from "@/lib/api";

const revenue = [
  { month: "Mar", collected: 420, outstanding: 80 },
  { month: "Apr", collected: 460, outstanding: 70 },
  { month: "May", collected: 510, outstanding: 95 },
  { month: "Jun", collected: 490, outstanding: 60 },
  { month: "Jul", collected: 540, outstanding: 75 },
  { month: "Aug", collected: 380, outstanding: 110 },
];

export default function ReportsPage() {
  const { data: departments = [] } = useQuery({ queryKey: ["departments"], queryFn: api.departments });
  const [range, setRange] = useState("90d");
  const [exported, setExported] = useState("");

  return (
    <div className="animate-fade-in">
      <PageHeader title="Reports builder" description="Customize charts and export PDF or CSV."
        actions={<>
          <Button variant="secondary" onClick={() => { setExported("CSV"); setTimeout(() => setExported(""), 2000); }}><FileSpreadsheet className="h-4 w-4" /> Export CSV</Button>
          <Button onClick={() => { setExported("PDF"); setTimeout(() => setExported(""), 2000); }}><FileText className="h-4 w-4" /> Export PDF</Button>
        </>} />
      {exported && <div className="mb-4 rounded-xl bg-care-50 px-4 py-3 text-body-sm text-care-700" role="status">{exported} export queued.</div>}
      <div className="mb-6 max-w-xs"><Select label="Date range" value={range} onChange={(e) => setRange(e.target.value)} options={[{ value: "30d", label: "Last 30 days" }, { value: "90d", label: "Last 90 days" }, { value: "ytd", label: "Year to date" }]} /></div>
      <div className="mb-6 grid gap-6 sm:grid-cols-3">
        <StatBlock label="Visits in range" value="1,284" />
        <StatBlock label="Avg wait (min)" value="11" accent="care" />
        <StatBlock label="Collection rate" value="92%" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionPanel title="Department utilization" description={`Range: ${range}`}><DepartmentChart data={departments} /></SectionPanel>
        <SectionPanel title="Revenue health" description="Collected vs outstanding ($k)"><RevenueChart data={revenue} /></SectionPanel>
      </div>
    </div>
  );
}
