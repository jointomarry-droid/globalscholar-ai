"use client";

import { useState, useEffect } from "react";
import { useAuthStore, useUIStore } from "@/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Sparkles,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Notification } from "@/types";

const typeIcons = {
  deadline_reminder: Clock,
  application_update: CheckCircle2,
  new_scholarship: Sparkles,
  system: Info,
  marketing: Bell,
};

const typeColors = {
  deadline_reminder: "text-orange-500",
  application_update: "text-blue-500",
  new_scholarship: "text-green-500",
  system: "text-[var(--primary)]",
  marketing: "text-[var(--muted-foreground)]",
};

export function NotificationBell() {
  const { token } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const fetchNotifications = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        setNotifications(result.data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [fetchNotifications, token]);

  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[var(--accent)] transition-colors"
      >
        <Bell className="h-4 w-4 text-[var(--muted-foreground)]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--destructive)] text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-lg z-50 animate-fade-in">
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <h3 className="font-semibold text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-[var(--primary)] hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-8 w-8 text-[var(--muted-foreground)] mx-auto mb-2" />
                  <p className="text-sm text-[var(--muted-foreground)]">No notifications yet</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const Icon = typeIcons[n.type];
                  return (
                    <button
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={cn(
                        "w-full flex items-start gap-3 p-4 text-left hover:bg-[var(--accent)] transition-colors border-b border-[var(--border)] last:border-0",
                        !n.read && "bg-[var(--primary)]/5"
                      )}
                    >
                      <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", typeColors[n.type])} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">{n.message}</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {!n.read && (
                        <div className="h-2 w-2 rounded-full bg-[var(--primary)] shrink-0 mt-1" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function NotificationList() {
  const { token } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        setNotifications(result.data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [fetchNotifications, token]);

  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-[var(--muted-foreground)] mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Notifications</h3>
          <p className="text-[var(--muted-foreground)]">
            You&apos;re all caught up! Check back later for updates.
          </p>
        </div>
      ) : (
        notifications.map((n) => {
          const Icon = typeIcons[n.type];
          return (
            <Card key={n.id} className={!n.read ? "border-[var(--primary)]/20" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] shrink-0")}>
                    <Icon className={cn("h-4 w-4", typeColors[n.type])} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">{n.title}</h4>
                      {!n.read && <Badge variant="info" className="text-xs">New</Badge>}
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">{n.message}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-2">
                      {new Date(n.createdAt).toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric",
                      })}
                    </p>
                  </div>
                  {!n.read && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="text-xs text-[var(--primary)] hover:underline shrink-0"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
