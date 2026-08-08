"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { roleHome } from "@/lib/types";
import { useAuthStore } from "@/stores/auth-store";

export default function MfaPage() {
  const { user, mfaEmail, completeMfa } = useAuthStore();
  const router = useRouter();
  const [code, setCode] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await completeMfa(code.replace(/\s/g, ""));
      const role = useAuthStore.getState().user?.role;
      if (role) router.push(roleHome[role]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid code.");
    } finally {
      setLoading(false);
    }
  }

  if (!mfaEmail && !user) {
    return (
      <div className="text-center">
        <p className="text-ink-muted">No pending MFA challenge.</p>
        <Link href="/login" className="mt-4 inline-block text-brand-600 hover:underline">Back to login</Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-display text-heading-lg text-ink">Verify it&apos;s you</h1>
      <p className="mt-1 text-body-sm text-ink-muted">Enter any 6-digit code. The API validates and issues a bearer token.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <Input label="Authentication code" name="code" inputMode="numeric" maxLength={6} required value={code} onChange={(e) => setCode(e.target.value)} error={error} />
        <Button type="submit" className="w-full" loading={loading}>Verify & continue</Button>
      </form>
    </>
  );
}
