import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} aria-hidden />;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: { icon: LucideIcon; title: string; description: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-100"><Icon className="h-7 w-7" strokeWidth={1.5} /></div>
      <h3 className="font-display text-heading-sm text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-body-sm text-ink-muted">{description}</p>
      {actionLabel && onAction && <Button className="mt-5" onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-display-md text-ink">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-body-md text-ink-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatBlock({ label, value, hint, accent = "brand" }: { label: string; value: string; hint?: string; accent?: "brand" | "care" | "warn" | "alert" }) {
  const accents = { brand: "border-l-brand-500", care: "border-l-care-500", warn: "border-l-warn-500", alert: "border-l-alert-500" };
  return (
    <div className={cn("border-l-4 py-1 pl-4", accents[accent])}>
      <p className="text-label text-ink-soft">{label}</p>
      <p className="mt-1 font-display text-heading-lg text-ink">{value}</p>
      {hint && <p className="mt-1 text-body-sm text-ink-muted">{hint}</p>}
    </div>
  );
}

export function SectionPanel({ title, description, action, children, className, id }: { title?: string; description?: string; action?: React.ReactNode; children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("rounded-2xl border border-line bg-surface-raised p-5 sm:p-6", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h2 className="font-display text-heading-sm text-ink">{title}</h2>}
            {description && <p className="mt-0.5 text-body-sm text-ink-muted">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
