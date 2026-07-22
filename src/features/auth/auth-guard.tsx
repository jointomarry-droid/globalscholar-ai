"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import { LoadingPage } from "@/components/shared";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const router = useRouter();
  const { user, token, isLoading, fetchUser } = useAuthStore();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    if (!user && token) {
      fetchUser();
    }
  }, [user, token, fetchUser, router]);

  useEffect(() => {
    if (!isLoading && user && requiredRole && !requiredRole.includes(user.role)) {
      router.push("/dashboard");
    }
  }, [user, isLoading, requiredRole, router]);

  if (isLoading || !user) {
    return <LoadingPage />;
  }

  if (requiredRole && !requiredRole.includes(user.role)) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
