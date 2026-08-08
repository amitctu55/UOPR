"use client";

import { useState } from "react";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { PageHeader, SectionPanel, StatBlock } from "@/components/ui/feedback";
import { DepartmentChart, RevenueChart } from "@/components/charts";
import { departmentStats } from "@/lib/mock-data";

const revenue = [
  { month: "Mar", collected: 420, outstanding: 80 },
  { month: "Apr", collected: 460, outstanding: 70 },
  { month: "May", collected: 510, outstanding: 95 },
  { month: "Jun", collected: 490, outstanding: 60 },
  { month: "Jul", collected: 540, outstanding: 75 },
  { month: "Aug", collected: 380, outstanding: 110 },
];

export default function ReportsPage() {
  const [range, setRange] = useState("90d");
  const [metric, setMetric] = useState("utilization");
  const [exported, setExported] = useState("");

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Reports builder"
        description="Customize charts and export PDF or CSV for leadership and compliance."
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setExported("CSV");
                setTimeout(() => setExported(""), 2000);
              }}
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export CSV
            </Button>
            <Button
              onClick={() => {
                setExported("PDF");
                setTimeout(() => setExported(""), 2000);
              }}
            >
              <FileText className="h-4 w-4" />
              Export PDF
            </Button>
          </>
        }
      />

      {exported && (
        <div className="mb-4 rounded-xl bg-care-50 px-4 py-3 text-body-sm text-care-700" role="status">
          {exported} export queued — download will start shortly.
        </div>
      )}

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Select
          label="Date range"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          options={[
            { value: "30d", label: "Last 30 days" },
            { value: "90d", label: "Last 90 days" },
            { value: "ytd", label: "Year to date" },
          ]}
        />
        <Select
          label="Primary metric"
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          options={[
            { value: "utilization", label: "Department utilization" },
            { value: "revenue", label: "Collections vs outstanding" },
            { value: "throughput", label: "Visit throughput" },
          ]}
        />
        <div className="flex items-end">
          <Button variant="soft" className="w-full">
            <Download className="h-4 w-4" />
            Save report preset
          </Button>
        </div>
      </div>

      <div className="mb-6 grid gap-6 sm:grid-cols-3">
        <StatBlock label="Visits in range" value="1,284" accent="brand" />
        <StatBlock label="Avg wait (min)" value="11" accent="care" />
        <StatBlock label="Collection rate" value="92%" accent="brand" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionPanel title="Department utilization" description={`Range: ${range}`}>
          <DepartmentChart data={departmentStats} />
        </SectionPanel>
        <SectionPanel title="Revenue health" description="Collected vs outstanding ($k)">
          <RevenueChart data={revenue} />
        </SectionPanel>
      </div>
    </div>
  );
}
