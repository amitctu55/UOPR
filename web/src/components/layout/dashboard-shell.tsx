"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Skeleton } from "@/components/ui/feedback";
import { roleHome, type UserRole } from "@/lib/types";
import { useAuthStore } from "@/stores/auth-store";

export function DashboardShell({ children, requiredRole }: { children: React.ReactNode; requiredRole?: UserRole }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !user) { router.replace("/login"); return; }
    if (requiredRole && user.role !== requiredRole) router.replace(roleHome[user.role]);
  }, [isAuthenticated, user, requiredRole, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface p-8">
        <div className="w-full max-w-md space-y-3"><Skeleton className="h-8 w-48" /><Skeleton className="h-32 w-full" /><Skeleton className="h-32 w-full" /></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role={user.role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
