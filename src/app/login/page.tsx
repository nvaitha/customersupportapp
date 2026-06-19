import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-4 text-neutral-950">
      <h1 className="text-lg font-medium text-neutral-900">Support Tickets</h1>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
