"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore, useUIStore } from "@/store";
import { registerSchema, type RegisterInput } from "@/lib/validators";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/shared";
import { GraduationCap, Mail, Lock, Eye, EyeOff, User } from "lucide-react";

const roles = [
  { value: "student", label: "Student", description: "Find and apply for scholarships" },
  { value: "university", label: "University", description: "List your scholarships" },
  { value: "organization", label: "Organization", description: "Fund education globally" },
] as const;

export function RegisterForm() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthStore();
  const { addToast } = useUIStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student" as "student" | "university" | "organization",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setErrors({});

    const result = registerSchema.safeParse(formState);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await register({
        name: formState.name,
        email: formState.email,
        password: formState.password,
        role: formState.role,
      });
      addToast({ type: "success", title: "Account created!" });
      router.push("/dashboard");
    } catch {
      // error is set in store
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-btn">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">GlobalScholar AI</span>
        </Link>
        <h1 className="text-2xl font-bold">Create Your Account</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Start your journey to global education
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label className="text-sm font-medium">I am a...</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setFormState({ ...formState, role: role.value })}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      formState.role === role.value
                        ? "border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]"
                        : "border-[var(--border)] hover:border-[var(--primary)]/50"
                    }`}
                  >
                    <p className="text-sm font-medium">{role.label}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">{role.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                <Input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="John Doe"
                  className="pl-10"
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                <Input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="you@example.com"
                  className="pl-10"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formState.password}
                  onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                  placeholder="Min 8 characters"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formState.confirmPassword}
                  onChange={(e) => setFormState({ ...formState, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="pl-10"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-[var(--muted-foreground)] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--primary)] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
