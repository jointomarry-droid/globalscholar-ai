import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import {
  firebaseSignIn,
  firebaseSignUp,
  firebaseSignOut,
  onFirebaseAuthChange,
  type FirebaseAuthUser,
} from "@/lib/firebase/auth";

interface AuthState {
  user: User | null;
  firebaseUser: FirebaseAuthUser | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  authProvider: "firebase" | "api" | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; name: string; role?: string }) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  setFirebaseUser: (user: FirebaseAuthUser | null) => void;
  setTokens: (token: string, refreshToken: string) => void;
  clearError: () => void;
  initFirebaseAuth: () => () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      firebaseUser: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      error: null,
      authProvider: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const firebaseUser = await firebaseSignIn(email, password);
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || email,
            name: firebaseUser.displayName || email.split("@")[0],
            role: "student",
            emailVerified: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set({
            user,
            firebaseUser,
            authProvider: "firebase",
            isLoading: false,
          });
        } catch {
          try {
            const response = await fetch("/api/auth", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "login", email, password }),
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.error);
            set({
              user: result.data.user,
              token: result.data.token,
              refreshToken: result.data.refreshToken,
              authProvider: "api",
              isLoading: false,
            });
          } catch (apiErr) {
            const message = apiErr instanceof Error ? apiErr.message : "Login failed";
            set({ error: message, isLoading: false });
            throw new Error(message);
          }
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const firebaseUser = await firebaseSignUp(data.email, data.password, data.name);
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || data.email,
            name: data.name,
            role: (data.role as "student" | "admin") || "student",
            emailVerified: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set({
            user,
            firebaseUser,
            authProvider: "firebase",
            isLoading: false,
          });
        } catch {
          try {
            const response = await fetch("/api/auth", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "register", ...data }),
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.error);
            set({
              user: result.data.user,
              token: result.data.token,
              refreshToken: result.data.refreshToken,
              authProvider: "api",
              isLoading: false,
            });
          } catch (apiErr) {
            const message = apiErr instanceof Error ? apiErr.message : "Registration failed";
            set({ error: message, isLoading: false });
            throw new Error(message);
          }
        }
      },

      logout: async () => {
        const { authProvider } = get();
        try {
          if (authProvider === "firebase") {
            await firebaseSignOut();
          } else {
            const { token } = get();
            await fetch("/api/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ action: "logout" }),
            });
          }
        } finally {
          set({ user: null, firebaseUser: null, token: null, refreshToken: null, authProvider: null });
        }
      },

      fetchUser: async () => {
        const { token, authProvider } = get();
        if (authProvider === "firebase" && get().firebaseUser) return;
        if (!token) return;
        set({ isLoading: true });
        try {
          const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ action: "me" }),
          });
          const result = await response.json();
          if (result.success) {
            set({ user: result.data, isLoading: false });
          } else {
            set({ user: null, token: null, refreshToken: null, isLoading: false });
          }
        } catch {
          set({ user: null, token: null, refreshToken: null, isLoading: false });
        }
      },

      setUser: (user) => set({ user }),
      setFirebaseUser: (firebaseUser) => set({ firebaseUser }),
      setTokens: (token, refreshToken) => set({ token, refreshToken }),
      clearError: () => set({ error: null }),

      initFirebaseAuth: () => {
        const unsubscribe = onFirebaseAuthChange((firebaseUser) => {
          if (firebaseUser) {
            const user: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || "",
              name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
              role: "student",
              emailVerified: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            set({ firebaseUser, user, authProvider: "firebase" });
          } else if (get().authProvider === "firebase") {
            set({ firebaseUser: null, user: null, authProvider: null });
          }
        });
        return unsubscribe;
      },
    }),
    {
      name: "globalscholar-auth",
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        authProvider: state.authProvider,
      }),
    }
  )
);
