"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { UserRole } from "@/lib/types";
import { useAuthStore } from "@/stores/auth-store";

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
    setLoading(true);
    try {
      await login(email, password, role);
      router.push("/mfa");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="font-display text-heading-lg text-ink">Welcome back</h1>
      <p className="mt-1 text-body-sm text-ink-muted">Sign in against the UPCHAR API. MFA is required for every session.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <Input label="Email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Select label="Demo role" name="role" hint="API will issue a session for this role" value={role} onChange={(e) => setRole(e.target.value as UserRole)}
          options={[
            { value: "patient", label: "Patient" },
            { value: "doctor", label: "Doctor" },
            { value: "hospital", label: "Hospital Admin" },
            { value: "admin", label: "System Admin" },
          ]} />
        {error && <p className="rounded-xl bg-alert-50 px-3 py-2 text-body-sm text-alert-600" role="alert">{error}</p>}
        <Button type="submit" className="w-full" loading={loading}>Continue to MFA</Button>
      </form>
      <div className="mt-5 flex flex-col gap-2 text-center text-body-sm text-ink-muted">
        <Link href="/forgot-password" className="text-brand-600 hover:underline">Forgot password?</Link>
        <p>New to UPCHAR? <Link href="/register" className="font-semibold text-brand-600 hover:underline">Create an account</Link></p>
      </div>
    </>
  );
}
