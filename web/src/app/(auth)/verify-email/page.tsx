"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { roleHome } from "@/lib/types";
import { useAuthStore } from "@/stores/auth-store";

export default function VerifyEmailPage() {
  const user = useAuthStore((s) => s.user);
  const verifyEmail = useAuthStore((s) => s.verifyEmail);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function verify() {
    setLoading(true);
    setError("");
    try {
      await verifyEmail("123456");
      const role = useAuthStore.getState().user?.role;
      if (role) router.push(roleHome[role]);
      else router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-center">
      <h1 className="font-display text-heading-lg text-ink">Verify your email</h1>
      <p className="mt-2 text-body-sm text-ink-muted">
        We sent a verification link to <strong>{user?.email || "your inbox"}</strong>. For this demo, confirm below.
      </p>
      {error && <p className="mt-3 text-body-sm text-alert-600" role="alert">{error}</p>}
      <Button className="mt-6 w-full" loading={loading} onClick={verify}>I verified my email</Button>
      <p className="mt-4 text-body-sm text-ink-soft">Wrong address? <Link href="/register" className="text-brand-600 hover:underline">Re-register</Link></p>
    </div>
  );
}
