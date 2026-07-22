"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store";

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const initFirebaseAuth = useAuthStore((s) => s.initFirebaseAuth);

  useEffect(() => {
    try {
      const unsubscribe = initFirebaseAuth();
      return () => unsubscribe();
    } catch (err) {
      console.warn("[FirebaseProvider] Auth init failed:", err);
      return () => {};
    }
  }, [initFirebaseAuth]);

  return <>{children}</>;
}
