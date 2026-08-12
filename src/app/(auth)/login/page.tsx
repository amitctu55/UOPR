"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useAuthStore } from "@/stores/auth-store";
import type { UserRole } from "@/lib/types";

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();
  const [email, setEmail] = useState("amelia.chen@email.com");
  const [password, setPassword] = useState("demo-password");
  const [role, setRole] = useState<UserRole>("patient");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await login(email, password, role);
      if (res.needsMfa) router.push("/mfa");
    } catch {
      setError("Unable to sign in. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="font-display text-heading-lg text-ink">Welcome back</h1>
      <p className="mt-1 text-body-sm text-ink-muted">Sign in with email. MFA is required for every session.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Select
          label="Demo role"
          name="role"
          hint="Pick a role to explore that workspace"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          options={[
            { value: "patient", label: "Patient" },
            { value: "doctor", label: "Doctor" },
            { value: "hospital", label: "Hospital Admin" },
            { value: "admin", label: "System Admin" },
          ]}
        />
        {error && (
          <p className="rounded-xl bg-alert-50 px-3 py-2 text-body-sm text-alert-600" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" className="w-full" loading={loading}>
          Continue to MFA
        </Button>
      </form>
      <div className="mt-5 flex flex-col gap-2 text-center text-body-sm text-ink-muted">
        <Link href="/forgot-password" className="text-brand-600 hover:underline">
          Forgot password?
        </Link>
        <p>
          New to UPCHAR?{" "}
          <Link href="/register" className="font-semibold text-brand-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </>
  );
}
