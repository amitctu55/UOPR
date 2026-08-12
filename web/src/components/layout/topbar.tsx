"use client";

import Link from "next/link";
import { Bell, LogOut, Moon, Search, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";
import { useThemeStore } from "@/stores/theme-store";
import { cn } from "@/lib/utils";

export function Topbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { theme, toggleTheme } = useThemeStore();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { data: messages = [] } = useQuery({ queryKey: ["messages"], queryFn: api.messages });
  const unread = messages.filter((m) => m.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-surface-raised/90 px-4 backdrop-blur-md sm:px-6">
      <div className="relative hidden min-w-0 flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
        <input type="search" placeholder="Search patients, appointments, invoices…" aria-label="Global search"
          className="h-10 w-full max-w-md rounded-xl border border-line bg-surface pl-9 pr-3 text-body-sm text-ink placeholder:text-ink-soft focus:border-brand-500 focus:shadow-focus" />
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
        <div className="relative">
          <Button variant="ghost" size="icon" aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
            onClick={() => { setNotifOpen(!notifOpen); setMenuOpen(false); }}>
            <Bell className="h-5 w-5" />
            {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-alert-500 ring-2 ring-surface-raised" />}
          </Button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-lift animate-fade-up">
              <div className="border-b border-line px-4 py-3"><p className="font-semibold text-ink">Notifications</p></div>
              <ul>
                {messages.slice(0, 3).map((m) => (
                  <li key={m.id} className="border-b border-line last:border-0">
                    <Link href="/dashboard/messages" className="block px-4 py-3 hover:bg-surface-muted" onClick={() => setNotifOpen(false)}>
                      <p className="text-body-sm font-semibold text-ink">{m.from_name}</p>
                      <p className="line-clamp-1 text-body-sm text-ink-muted">{m.preview}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <button type="button" className={cn("flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-surface-muted focus-visible:shadow-focus")}
            onClick={() => { setMenuOpen(!menuOpen); setNotifOpen(false); }} aria-expanded={menuOpen} aria-haspopup="menu">
            <Avatar name={user?.name || "User"} size="sm" />
            <span className="hidden text-left sm:block">
              <span className="block text-body-sm font-semibold text-ink">{user?.name}</span>
              <span className="block text-[11px] text-ink-soft">{user?.email}</span>
            </span>
          </button>
          {menuOpen && (
            <div role="menu" className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-lift animate-fade-up">
              <Link href="/dashboard/settings" className="block px-4 py-2.5 text-body-sm hover:bg-surface-muted" role="menuitem" onClick={() => setMenuOpen(false)}>Account settings</Link>
              <button type="button" role="menuitem" className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-body-sm text-alert-600 hover:bg-alert-50"
                onClick={() => { logout(); router.push("/login"); }}>
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
