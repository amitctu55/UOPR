import { create } from "zustand";
import { persist } from "zustand/middleware";
import { demoUsers, type User, type UserRole } from "@/lib/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  mfaPending: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<{ needsMfa: boolean }>;
  completeMfa: (code: string) => Promise<boolean>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

function resolveRole(email: string, role?: UserRole): UserRole {
  if (role) return role;
  if (email.includes("admin")) return "admin";
  if (email.includes("hospital") || email.includes("admin@")) return "hospital";
  if (email.includes("dr") || email.includes("doctor")) return "doctor";
  return "patient";
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      mfaPending: false,
      login: async (email, _password, role) => {
        await new Promise((r) => setTimeout(r, 600));
        const resolved = resolveRole(email, role);
        const base = demoUsers[resolved];
        set({
          user: { ...base, email },
          isAuthenticated: false,
          mfaPending: true,
        });
        return { needsMfa: true };
      },
      completeMfa: async (code) => {
        await new Promise((r) => setTimeout(r, 400));
        if (code.length < 6) return false;
        const user = get().user;
        if (!user) return false;
        set({ isAuthenticated: true, mfaPending: false });
        return true;
      },
      register: async ({ name, email, role }) => {
        await new Promise((r) => setTimeout(r, 700));
        set({
          user: {
            id: `u-${Date.now()}`,
            name,
            email,
            role,
            organization: role === "patient" ? "Self" : "UPCHAR Network",
          },
          isAuthenticated: false,
          mfaPending: false,
        });
      },
      logout: () => set({ user: null, isAuthenticated: false, mfaPending: false }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
    }),
    { name: "upchar-auth" }
  )
);
