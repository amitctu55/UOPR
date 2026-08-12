import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandMark({ className, inverse = false, compact = false }: { className?: string; inverse?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5 rounded-lg focus-visible:shadow-focus", className)} aria-label="UPCHAR home">
      <span className={cn("relative flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105", inverse ? "bg-white/15 text-white" : "bg-brand-600 text-white dark:bg-brand-500 dark:text-brand-900")}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M12 4v16M8 8.5c0-1.5 1.2-3 4-3s4 1.5 4 3c0 3.5-8 3.5-8 7 0 1.5 1.2 3 4 3s4-1.5 4-3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.25" opacity="0.35" />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={cn("font-display text-lg font-bold tracking-tight", inverse ? "text-white" : "text-ink")}>UPCHAR</span>
          <span className={cn("text-[10px] font-medium uppercase tracking-[0.14em]", inverse ? "text-white/70" : "text-ink-soft")}>Care Platform</span>
        </span>
      )}
    </Link>
  );
}
