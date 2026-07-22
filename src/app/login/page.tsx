"use client";

import { LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-12">
      <LoginForm />
    </div>
  );
}
