import type { Appointment, Invoice, MessageThread, Patient, User, UserRole } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail.detail || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  login: (email: string, password: string, role?: UserRole) =>
    request<{ access_token: string; user: User; mfa_required: boolean }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    }),
  mfa: (email: string, code: string) =>
    request<{ access_token: string; user: User }>("/api/auth/mfa", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    }),
  register: (data: { name: string; email: string; password: string; role: UserRole }) =>
    request<User>("/api/auth/register", { method: "POST", body: JSON.stringify(data) }),
  verifyEmail: (email: string, code: string) =>
    request<{ access_token: string; user: User }>("/api/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    }),
  me: (token: string) =>
    request<User>("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } }),
  appointments: () => request<Appointment[]>("/api/appointments"),
  createAppointment: (body: Record<string, unknown>) =>
    request<Appointment>("/api/appointments", { method: "POST", body: JSON.stringify(body) }),
  patients: () => request<Patient[]>("/api/patients"),
  patient: (id: string) => request<Patient>(`/api/patients/${id}`),
  invoices: () => request<Invoice[]>("/api/billing/invoices"),
  payInvoice: (id: string) => request<Invoice>(`/api/billing/invoices/${id}/pay`, { method: "POST" }),
  messages: () => request<MessageThread[]>("/api/messages"),
  sendMessage: (id: string, body: string) =>
    request<MessageThread>(`/api/messages/${id}`, { method: "POST", body: JSON.stringify({ body }) }),
  services: () => request<{ name: string; status: string; latency_ms: number; uptime: string }[]>("/api/monitoring/services"),
  alerts: () => request<{ id: string; severity: string; title: string; detail: string; time: string }[]>("/api/monitoring/alerts"),
  departments: () => request<{ name: string; patients: number; utilization: number }[]>("/api/monitoring/departments"),
  healthTrend: () => request<{ month: string; bp: number; hr: number }[]>("/api/monitoring/health-trend"),
};
