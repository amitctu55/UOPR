"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center">
        <h1 className="font-display text-heading-lg text-ink">Check your inbox</h1>
        <p className="mt-2 text-body-sm text-ink-muted">
          If an account exists for <strong>{email}</strong>, we sent a reset link.
        </p>
        <Link href="/login" className="mt-6 inline-block">
          <Button variant="secondary">Back to login</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-display text-heading-lg text-ink">Reset password</h1>
      <p className="mt-1 text-body-sm text-ink-muted">We&apos;ll email you a secure reset link.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <Input
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" className="w-full" loading={loading}>
          Send reset link
        </Button>
      </form>
      <p className="mt-5 text-center text-body-sm">
        <Link href="/login" className="text-brand-600 hover:underline">
          Back to login
        </Link>
      </p>
    </>
  );
}
