"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/bookings";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    setIsSubmitting(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-background px-4">
      <Card className="w-full max-w-md p-8 shadow-xl border border-border bg-card">
        <h1 className="text-3xl font-semibold mb-3 text-heading-black">
          Admin Login
        </h1>
        <p className="text-base text-text-gray mb-6">
          Sign in to manage bookings, drivers, and more.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 text-base">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-border bg-white rounded-md py-2 px-3"
              required
            />
          </div>

          <div className="space-y-2 text-base">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-border bg-white rounded-md py-2 px-3"
              required
            />
          </div>

          {error && (
            <p
              className="text-base text-destructive mt-1"
              role="alert"
              aria-live="polite"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground text-center">
          Use your existing admin email and password stored in the dashboard
          database to sign in.
        </p>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/" className="underline underline-offset-4">
            Back to website
          </Link>
        </p>
      </Card>
    </div>
  );
}


