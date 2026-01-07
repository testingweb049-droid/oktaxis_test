import { Suspense } from "react";
import { AdminLoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-light-background px-4">
          <p className="text-base text-text-gray">Loading login...</p>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}


