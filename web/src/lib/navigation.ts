import type { UserRole } from "@/lib/types";
import {
  Activity, Bell, Calendar, ClipboardList, FileText, HeartPulse, LayoutDashboard,
  MessageSquare, Receipt, Settings, Shield, Stethoscope, Users, Video, type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; href: string; icon: LucideIcon };

const shared: NavItem[] = [
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const navByRole: Record<UserRole, NavItem[]> = {
  patient: [
    { label: "Overview", href: "/dashboard/patient", icon: LayoutDashboard },
    { label: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { label: "Health record", href: "/dashboard/patients/p-1", icon: HeartPulse },
    { label: "Telemedicine", href: "/dashboard/telemedicine/apt-1", icon: Video },
    { label: "Billing", href: "/dashboard/billing", icon: Receipt },
    ...shared,
  ],
  doctor: [
    { label: "Overview", href: "/dashboard/doctor", icon: LayoutDashboard },
    { label: "Schedule", href: "/dashboard/appointments", icon: Calendar },
    { label: "Patients", href: "/dashboard/patients/p-1", icon: Users },
    { label: "Telemedicine", href: "/dashboard/telemedicine/apt-1", icon: Video },
    { label: "EHR editor", href: "/dashboard/ehr/p-1", icon: ClipboardList },
    { label: "Reports", href: "/dashboard/reports", icon: FileText },
    ...shared,
  ],
  hospital: [
    { label: "Overview", href: "/dashboard/hospital", icon: LayoutDashboard },
    { label: "Staff", href: "/dashboard/hospital#staff", icon: Stethoscope },
    { label: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { label: "Billing", href: "/dashboard/billing", icon: Receipt },
    { label: "Reports", href: "/dashboard/reports", icon: FileText },
    { label: "Monitoring", href: "/dashboard/monitoring", icon: Activity },
    ...shared,
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Users & roles", href: "/dashboard/admin#users", icon: Shield },
    { label: "Monitoring", href: "/dashboard/monitoring", icon: Activity },
    { label: "Reports", href: "/dashboard/reports", icon: FileText },
    { label: "Alerts", href: "/dashboard/monitoring#alerts", icon: Bell },
    ...shared,
  ],
};
