"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useScholarshipStore } from "@/store";
import { Scholarship, ScholarshipFilters } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingGrid } from "@/components/shared";
import { Pagination } from "@/components/shared";
import { ScholarshipFiltersPanel } from "./scholarship-filters-panel";
import { ScholarshipCard } from "./scholarship-card";
import { SearchInput } from "@/components/shared";
import {
  SlidersHorizontal,
  Grid3X3,
  List,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";

export function ScholarshipList() {
  const {
    scholarships,
    filters,
    isLoading,
    error,
    fetchScholarships,
    setFilters,
    clearFilters,
  } = useScholarshipStore();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = useCallback(
    (query: string) => {
      setFilters({ search: query });
      fetchScholarships({ ...filters, search: query });
    },
    [setFilters, fetchScholarships, filters]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setFilters({ page });
      fetchScholarships({ ...filters, page });
    },
    [setFilters, fetchScholarships, filters]
  );

  const handleFilterChange = useCallback(
    (newFilters: Partial<ScholarshipFilters>) => {
      setFilters(newFilters);
      fetchScholarships({ ...filters, ...newFilters });
    },
    [setFilters, fetchScholarships, filters]
  );

  return (
    <div className="space-y-6">
      {/* Search & Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput
          placeholder="Search scholarships..."
          onSearch={handleSearch}
          className="flex-1"
        />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-[var(--accent)]" : ""}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <div className="flex border border-[var(--input)] rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-[var(--accent)]" : ""}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-[var(--accent)]" : ""}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <ScholarshipFiltersPanel
          filters={filters}
          onChange={handleFilterChange}
          onClear={clearFilters}
        />
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--muted-foreground)]">
          {scholarships
            ? `${scholarships.total} scholarship${scholarships.total !== 1 ? "s" : ""} found`
            : "Loading scholarships..."}
        </p>
        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split("-");
            handleFilterChange({
              sortBy: sortBy as ScholarshipFilters["sortBy"],
              sortOrder: sortOrder as ScholarshipFilters["sortOrder"],
            });
          }}
          className="text-sm border border-[var(--input)] rounded-lg px-3 py-1.5 bg-[var(--background)]"
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="deadline-asc">Deadline (Soonest)</option>
          <option value="deadline-desc">Deadline (Latest)</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="matchScore-desc">Best Match</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {isLoading && <LoadingGrid count={6} />}

      {/* Results */}
      {!isLoading && scholarships && (
        <>
          {scholarships.data.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="h-12 w-12 text-[var(--muted-foreground)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No scholarships found</h3>
              <p className="text-[var(--muted-foreground)] mb-4">
                Try adjusting your filters or search query
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {scholarships.data.map((scholarship) => (
                <ScholarshipCard
                  key={scholarship.id}
                  scholarship={scholarship}
                  variant={viewMode}
                />
              ))}
            </div>
          )}

          <Pagination
            currentPage={scholarships.page}
            totalPages={scholarships.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
