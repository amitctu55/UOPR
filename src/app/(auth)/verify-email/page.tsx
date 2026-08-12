"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { roleHome } from "@/lib/types";
import { useAuthStore } from "@/stores/auth-store";

export default function VerifyEmailPage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function verify() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    if (user) {
      setUser(user);
      useAuthStore.setState({ isAuthenticated: true, mfaPending: false });
      router.push(roleHome[user.role]);
    } else {
      router.push("/login");
    }
    setLoading(false);
  }

  return (
    <div className="text-center">
      <h1 className="font-display text-heading-lg text-ink">Verify your email</h1>
      <p className="mt-2 text-body-sm text-ink-muted">
        We sent a verification link to <strong>{user?.email || "your inbox"}</strong>. For this demo,
        confirm below to continue.
      </p>
      <Button className="mt-6 w-full" loading={loading} onClick={verify}>
        I verified my email
      </Button>
      <p className="mt-4 text-body-sm text-ink-soft">
        Wrong address?{" "}
        <Link href="/register" className="text-brand-600 hover:underline">
          Re-register
        </Link>
      </p>
    </div>
  );
}
