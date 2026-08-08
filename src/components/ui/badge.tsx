import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-label uppercase tracking-wide",
  {
    variants: {
      tone: {
        neutral: "bg-surface-muted text-ink-muted",
        brand: "bg-brand-50 text-brand-700 dark:bg-brand-100 dark:text-brand-700",
        success: "bg-care-50 text-care-700",
        warning: "bg-warn-50 text-warn-600",
        danger: "bg-alert-50 text-alert-600",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
);

export function Badge({
  className,
  tone,
  children,
}: React.PropsWithChildren<VariantProps<typeof badgeVariants> & { className?: string }>) {
  return <span className={cn(badgeVariants({ tone }), className)}>{children}</span>;
}

export function statusTone(status: string): VariantProps<typeof badgeVariants>["tone"] {
  const s = status.toLowerCase();
  if (["confirmed", "paid", "operational", "on duty", "completed", "verified"].some((x) => s.includes(x)))
    return "success";
  if (["pending", "waiting", "partial", "insurance", "degraded"].some((x) => s.includes(x)))
    return "warning";
  if (["due", "failed", "high", "critical", "error"].some((x) => s.includes(x))) return "danger";
  if (["video", "in-person", "follow"].some((x) => s.includes(x))) return "brand";
  return "neutral";
}
