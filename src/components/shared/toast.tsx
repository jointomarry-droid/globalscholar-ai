"use client";

import { useUIStore } from "@/store";
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: "border-[var(--success)]/30 bg-[var(--success)]/5",
  error: "border-[var(--destructive)]/30 bg-[var(--destructive)]/5",
  warning: "border-[var(--warning)]/30 bg-[var(--warning)]/5",
  info: "border-[var(--info)]/30 bg-[var(--info)]/5",
};

const iconStyles = {
  success: "text-[var(--success)]",
  error: "text-[var(--destructive)]",
  warning: "text-[var(--warning)]",
  info: "text-[var(--info)]",
};

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={cn(
              "flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-slide-in",
              styles[toast.type]
            )}
            role="alert"
          >
            <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", iconStyles[toast.type])} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-[var(--muted-foreground)] mt-1">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
