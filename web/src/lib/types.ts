export type UserRole = "patient" | "doctor" | "hospital" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title?: string | null;
  organization?: string | null;
}

export interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  specialty: string;
  type: string;
  status: string;
  start: string;
  end: string;
  location: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  blood_type: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  last_visit: string;
  mrn: string;
}

export interface Invoice {
  id: string;
  patient: string;
  date: string;
  amount: number;
  status: string;
  insurer: string;
  description: string;
}

export interface MessageThread {
  id: string;
  from_name: string;
  preview: string;
  time: string;
  unread: boolean;
  messages: { id: string; sender: string; body: string; time: string }[];
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
