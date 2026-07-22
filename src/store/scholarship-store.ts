import { create } from "zustand";
import type { Scholarship, ScholarshipFilters, PaginatedResponse, SavedScholarship } from "@/types";

interface ScholarshipState {
  scholarships: PaginatedResponse<Scholarship> | null;
  currentScholarship: Scholarship | null;
  savedScholarships: SavedScholarship[];
  filters: ScholarshipFilters;
  isLoading: boolean;
  error: string | null;
  fetchScholarships: (filters?: ScholarshipFilters) => Promise<void>;
  fetchScholarshipBySlug: (slug: string) => Promise<void>;
  saveScholarship: (scholarshipId: string) => Promise<void>;
  unsaveScholarship: (scholarshipId: string) => Promise<void>;
  fetchSavedScholarships: () => Promise<void>;
  setFilters: (filters: Partial<ScholarshipFilters>) => void;
  clearFilters: () => void;
  clearError: () => void;
}

const defaultFilters: ScholarshipFilters = {
  page: 1,
  limit: 12,
  sortBy: "createdAt",
  sortOrder: "desc",
};

export const useScholarshipStore = create<ScholarshipState>()((set, get) => ({
  scholarships: null,
  currentScholarship: null,
  savedScholarships: [],
  filters: { ...defaultFilters },
  isLoading: false,
  error: null,

  fetchScholarships: async (filters) => {
    const activeFilters = filters || get().filters;
    set({ isLoading: true, error: null });
    try {
      const params = new URLSearchParams();
      Object.entries(activeFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.set(key, String(value));
        }
      });
      const response = await fetch(`/api/scholarships?${params.toString()}`);
      const result = await response.json();
      if (result.success) {
        set({
          scholarships: {
            data: result.data,
            total: result.pagination.total,
            page: result.pagination.page,
            limit: result.pagination.limit,
            totalPages: result.pagination.totalPages,
          },
          isLoading: false,
        });
      } else {
        set({ error: result.error || "Failed to fetch", isLoading: false });
      }
    } catch {
      set({ error: "Network error", isLoading: false });
    }
  },

  fetchScholarshipBySlug: async (slug) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/scholarships?search=${slug}&limit=1`);
      const result = await response.json();
      if (result.success && result.data.length > 0) {
        set({ currentScholarship: result.data[0], isLoading: false });
      } else {
        set({ error: "Scholarship not found", isLoading: false });
      }
    } catch {
      set({ error: "Network error", isLoading: false });
    }
  },

  saveScholarship: async (scholarshipId) => {
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ error: "Please sign in to save scholarships" });
      return;
    }
    try {
      const response = await fetch("/api/scholarships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: "save", scholarshipId }),
      });
      const result = await response.json();
      if (result.success) {
        set((state) => ({
          savedScholarships: [...state.savedScholarships, result.data],
        }));
      }
    } catch {
      set({ error: "Failed to save scholarship" });
    }
  },

  unsaveScholarship: async (scholarshipId) => {
    const token = useAuthStore.getState().token;
    if (!token) return;
    try {
      await fetch("/api/scholarships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: "unsave", scholarshipId }),
      });
      set((state) => ({
        savedScholarships: state.savedScholarships.filter((s) => s.scholarshipId !== scholarshipId),
      }));
    } catch {
      set({ error: "Failed to unsave scholarship" });
    }
  },

  fetchSavedScholarships: async () => {
    const token = useAuthStore.getState().token;
    if (!token) return;
    try {
      const response = await fetch("/api/scholarships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: "listSaved" }),
      });
      const result = await response.json();
      if (result.success) {
        set({ savedScholarships: result.data });
      }
    } catch {
      // silently fail
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters, page: newFilters.page ?? 1 },
    }));
  },

  clearFilters: () => set({ filters: { ...defaultFilters } }),
  clearError: () => set({ error: null }),
}));

// Import auth store for token access
import { useAuthStore } from "./auth-store";
