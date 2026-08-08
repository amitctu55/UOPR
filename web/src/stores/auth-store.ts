"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";
import type { User, UserRole } from "@/lib/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  mfaEmail: string | null;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  completeMfa: (code: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; role: UserRole }) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      mfaEmail: null,
      login: async (email, password, role) => {
        const res = await api.login(email, password, role);
        set({ user: res.user, mfaEmail: res.user.email, isAuthenticated: false, token: null });
      },
      completeMfa: async (code) => {
        const email = get().mfaEmail || get().user?.email;
        if (!email) throw new Error("No pending MFA session.");
        const res = await api.mfa(email, code);
        set({ user: res.user, token: res.access_token, isAuthenticated: true, mfaEmail: null });
      },
      register: async (data) => {
        const user = await api.register(data);
        set({ user, mfaEmail: user.email, isAuthenticated: false, token: null });
      },
      verifyEmail: async (code) => {
        const email = get().mfaEmail || get().user?.email;
        if (!email) throw new Error("Missing email for verification.");
        const res = await api.verifyEmail(email, code);
        set({ user: res.user, token: res.access_token, isAuthenticated: true, mfaEmail: null });
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false, mfaEmail: null }),
    }),
    { name: "upchar-auth-v2" }
  )
);
