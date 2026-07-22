"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/store/auth-store";
import type { Scholarship, ScholarshipFilters, PaginatedResponse, ApiResponse, User, University, Application, Notification } from "@/types";

// Generic fetcher with error handling
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// ============================================
// AUTH HOOKS
// ============================================

export function useAuth() {
  const { user, token, isLoading, fetchUser, login, register, logout, error, clearError } = useAuthStore();
  return { user, token, isLoading, fetchUser, login, register, logout, error, clearError };
}

// ============================================
// SCHOLARSHIP HOOKS
// ============================================

export function useScholarshipList(filters?: ScholarshipFilters) {
  const [data, setData] = useState<PaginatedResponse<Scholarship> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScholarships = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.set(key, String(value));
          }
        });
      }
      const result = await apiFetch<{ success: boolean; data: Scholarship[]; pagination: { total: number; page: number; limit: number; totalPages: number } }>(
        `/api/scholarships?${params.toString()}`
      );
      if (result.success) {
        setData({
          data: result.data,
          total: result.pagination.total,
          page: result.pagination.page,
          limit: result.pagination.limit,
          totalPages: result.pagination.totalPages,
        });
      } else {
        setError("Failed to fetch scholarships");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchScholarships();
  }, [fetchScholarships]);

  return { data, loading, error, refetch: fetchScholarships };
}

export function useScholarshipDetail(slug: string) {
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScholarship = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const result = await apiFetch<{ success: boolean; data: Scholarship }>(
        `/api/scholarships/${encodeURIComponent(slug)}`
      );
      if (result.success && result.data) {
        setScholarship(result.data);
      } else {
        setError("Scholarship not found");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchScholarship();
  }, [fetchScholarship]);

  return { scholarship, loading, error, refetch: fetchScholarship };
}

// ============================================
// APPLICATION HOOKS
// ============================================

export function useApplications(token: string | null) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const result = await apiFetch<{ success: boolean; data: Application[] }>("/api/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.success) {
        setApplications(result.data);
      }
    } catch {
      setError("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return { applications, loading, error, refetch: fetchApplications };
}

// ============================================
// UNIVERSITIES HOOKS
// ============================================

export function useUniversityList() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const result = await apiFetch<{ success: boolean; data: University[] }>("/api/universities");
        if (result.success) {
          setUniversities(result.data);
        }
      } catch {
        setError("Failed to fetch universities");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return { universities, loading, error };
}

export function useUniversityDetail(slug: string) {
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUniversity = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const result = await apiFetch<{ success: boolean; data: University }>(
        `/api/universities/${encodeURIComponent(slug)}`
      );
      if (result.success && result.data) {
        setUniversity(result.data);
      } else {
        setError("University not found");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchUniversity();
  }, [fetchUniversity]);

  return { university, loading, error, refetch: fetchUniversity };
}

// ============================================
// NOTIFICATIONS HOOK
// ============================================

export function useNotifications(token: string | null) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const unreadCount = notifications.filter((n) => n.read === false).length;

  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const result = await apiFetch<{ success: boolean; data: Notification[] }>("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.success) {
        setNotifications(result.data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [token]);

  const markAsRead = useCallback(async (id: string) => {
    if (!token) return;
    try {
      await fetch(`/api/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: "markRead", id }),
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch {
      // silently fail
    }
  }, [token]);

  const markAllAsRead = useCallback(async () => {
    if (!token) return;
    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: "markAllRead" }),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {
      // silently fail
    }
  }, [token]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return { notifications, loading, unreadCount, refetch: fetchNotifications, markAsRead, markAllAsRead };
}
