"use client";

import { RegisterForm } from "@/features/auth";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-12">
      <RegisterForm />
    </div>
  );
}
