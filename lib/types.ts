export type UserRole = "patient" | "doctor" | "hospital" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  title?: string;
  organization?: string;
}

export const roleLabels: Record<UserRole, string> = {
  patient: "Patient",
  doctor: "Doctor",
  hospital: "Hospital Admin",
  admin: "System Admin",
};

export const roleHome: Record<UserRole, string> = {
  patient: "/dashboard/patient",
  doctor: "/dashboard/doctor",
  hospital: "/dashboard/hospital",
  admin: "/dashboard/admin",
};

export const demoUsers: Record<UserRole, User> = {
  patient: {
    id: "u-patient",
    name: "Amelia Chen",
    email: "amelia.chen@email.com",
    role: "patient",
    organization: "Self",
  },
  doctor: {
    id: "u-doctor",
    name: "Dr. Marcus Webb",
    email: "m.webb@upchar.care",
    role: "doctor",
    title: "Cardiologist",
    organization: "Northshore Medical",
  },
  hospital: {
    id: "u-hospital",
    name: "Priya Nair",
    email: "p.nair@northshore.care",
    role: "hospital",
    title: "Hospital Administrator",
    organization: "Northshore Medical",
  },
  admin: {
    id: "u-admin",
    name: "Jordan Hale",
    email: "jordan.hale@upchar.io",
    role: "admin",
    title: "Platform Admin",
    organization: "UPCHAR",
  },
};
