"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { navByRole } from "@/lib/navigation";
import { roleLabels, type UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Sidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = navByRole[role];

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4" aria-label="Primary">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;
        return (
          <Link key={item.href + item.label} href={item.href} onClick={() => setOpen(false)}
            className={cn("group flex items-center gap-3 rounded-xl px-3 py-2.5 text-body-sm font-medium transition-all duration-200",
              active ? "bg-brand-600 text-white shadow-soft dark:bg-brand-500 dark:text-brand-900" : "text-ink-muted hover:bg-surface-muted hover:text-ink")}>
            <Icon className="h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:scale-110" strokeWidth={1.75} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <div className="flex items-center justify-between border-b border-line bg-surface-raised px-4 py-3 lg:hidden">
        <BrandMark />
        <Button variant="ghost" size="icon" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {open && <div className="fixed inset-0 z-40 bg-brand-900/40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-surface-raised transition-transform duration-300 lg:static lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="hidden border-b border-line px-4 py-5 lg:block">
          <BrandMark />
          <p className="mt-3 text-label text-ink-soft">{roleLabels[role]} workspace</p>
        </div>
        <div className="border-b border-line px-4 py-4 lg:hidden"><BrandMark /></div>
        {nav}
        <div className="mt-auto border-t border-line p-4">
          <p className="text-body-sm text-ink-soft">HIPAA-ready · Encrypted at rest</p>
        </div>
      </aside>
    </>
  );
}
