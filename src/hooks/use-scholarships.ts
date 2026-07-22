import { useState, useCallback } from "react";
import type { Scholarship, ScholarshipFilters, PaginatedResponse } from "@/types";

interface UseScholarshipsOptions {
  initialFilters?: ScholarshipFilters;
  limit?: number;
}

export function useScholarships(options: UseScholarshipsOptions = {}) {
  const { initialFilters = {}, limit = 12 } = options;
  const [filters, setFilters] = useState<ScholarshipFilters>({
    ...initialFilters,
    limit,
    page: 1,
  });
  const [data, setData] = useState<PaginatedResponse<Scholarship> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScholarships = useCallback(async (newFilters?: Partial<ScholarshipFilters>) => {
    setLoading(true);
    setError(null);

    try {
      const params = newFilters || filters;
      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.set(key, String(value));
        }
      });

      const response = await fetch(`/api/scholarships?${searchParams.toString()}`);
      const result = await response.json();

      if (result.success) {
        setData({
          data: result.data,
          total: result.pagination.total,
          page: result.pagination.page,
          limit: result.pagination.limit,
          totalPages: result.pagination.totalPages,
        });
      } else {
        setError(result.error || "Failed to fetch scholarships");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilters = useCallback((newFilters: Partial<ScholarshipFilters>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      if (newFilters.page === undefined) updated.page = 1; // Reset page on filter change
      return updated;
    });
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ limit, page: 1 });
  }, [limit]);

  return {
    data,
    filters,
    loading,
    error,
    fetchScholarships,
    updateFilters,
    setPage,
    clearFilters,
  };
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/scholarships?search=${encodeURIComponent(searchQuery)}&limit=10`
      );
      const data = await response.json();
      if (data.success) {
        setResults(data.data);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { query, setQuery, results, loading, search };
}
