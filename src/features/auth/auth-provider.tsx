"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { LoadingPage } from "@/components/shared";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { token, user, fetchUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token, user, fetchUser]);

  return <>{children}</>;
}
