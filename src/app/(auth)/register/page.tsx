"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useAuthStore } from "@/stores/auth-store";
import type { UserRole } from "@/lib/types";

export default function RegisterPage() {
  const register = useAuthStore((s) => s.register);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("patient");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Enter your full name.";
    if (!email.includes("@")) next.email = "Enter a valid email.";
    if (password.length < 8) next.password = "Use at least 8 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    await register({ name, email, password, role });
    setLoading(false);
    router.push("/verify-email");
  }

  return (
    <>
      <h1 className="font-display text-heading-lg text-ink">Create your account</h1>
      <p className="mt-1 text-body-sm text-ink-muted">Choose your role — we&apos;ll tailor the workspace.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <Input label="Full name" name="name" required value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
        <Input
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          required
          hint="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <Select
          label="I am a…"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          options={[
            { value: "patient", label: "Patient" },
            { value: "doctor", label: "Doctor" },
            { value: "hospital", label: "Hospital Admin" },
            { value: "admin", label: "System Admin" },
          ]}
        />
        <Button type="submit" className="w-full" loading={loading}>
          Continue
        </Button>
      </form>
      <p className="mt-5 text-center text-body-sm text-ink-muted">
        Already registered?{" "}
        <Link href="/login" className="font-semibold text-brand-600 hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
}
