"use client";

import { cn } from "@/lib/utils/cn";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        size === "sm" && "h-4 w-4",
        size === "md" && "h-6 w-6",
        size === "lg" && "h-10 w-10",
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <LoadingSpinner size="lg" className="text-[var(--primary)] mx-auto" />
        <p className="mt-4 text-sm text-[var(--muted-foreground)]">Loading...</p>
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-[var(--accent)] rounded w-3/4" />
        <div className="h-3 bg-[var(--accent)] rounded w-1/2" />
        <div className="h-3 bg-[var(--accent)] rounded w-full" />
        <div className="h-3 bg-[var(--accent)] rounded w-2/3" />
      </div>
    </div>
  );
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}
