"use client";

import { ScholarshipFilters } from "@/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FiltersPanelProps {
  filters: ScholarshipFilters;
  onChange: (filters: Partial<ScholarshipFilters>) => void;
  onClear: () => void;
}

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "France", "Japan", "South Korea", "Netherlands", "Sweden", "Switzerland",
];

const degrees = [
  { value: "bachelors", label: "Bachelors" },
  { value: "masters", label: "Masters" },
  { value: "phd", label: "PhD" },
  { value: "diploma", label: "Diploma" },
  { value: "certificate", label: "Certificate" },
];

const fundingTypes = [
  { value: "fully_funded", label: "Fully Funded" },
  { value: "partial", label: "Partial" },
  { value: "tuition_only", label: "Tuition Only" },
  { value: "stipend", label: "Stipend" },
];

const fields = [
  "Computer Science", "Engineering", "Business", "Medicine", "Law",
  "Arts", "Science", "Social Sciences", "Education", "Agriculture",
];

export function ScholarshipFiltersPanel({ filters, onChange, onClear }: FiltersPanelProps) {
  const activeFilterCount = Object.entries(filters).filter(
    ([key, value]) =>
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !["page", "limit", "sortBy", "sortOrder"].includes(key)
  ).length;

  return (
    <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </h3>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-medium text-[var(--muted-foreground)]">Country</label>
          <select
            value={filters.country || ""}
            onChange={(e) => onChange({ country: e.target.value || undefined })}
            className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-[var(--input)] bg-[var(--background)]"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-[var(--muted-foreground)]">Degree</label>
          <select
            value={filters.degree || ""}
            onChange={(e) => onChange({ degree: (e.target.value || undefined) as ScholarshipFilters["degree"] })}
            className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-[var(--input)] bg-[var(--background)]"
          >
            <option value="">All Degrees</option>
            {degrees.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-[var(--muted-foreground)]">Funding</label>
          <select
            value={filters.funding || ""}
            onChange={(e) => onChange({ funding: (e.target.value || undefined) as ScholarshipFilters["funding"] })}
            className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-[var(--input)] bg-[var(--background)]"
          >
            <option value="">All Types</option>
            {fundingTypes.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-[var(--muted-foreground)]">Field</label>
          <select
            value={filters.field || ""}
            onChange={(e) => onChange({ field: e.target.value || undefined })}
            className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-[var(--input)] bg-[var(--background)]"
          >
            <option value="">All Fields</option>
            {fields.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.internationalStudents || false}
            onChange={(e) => onChange({ internationalStudents: e.target.checked || undefined })}
            className="rounded border-[var(--input)] text-[var(--primary)]"
          />
          International Students Welcome
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.ieltsRequired || false}
            onChange={(e) => onChange({ ieltsRequired: e.target.checked || undefined })}
            className="rounded border-[var(--input)] text-[var(--primary)]"
          />
          IELTS Accepted
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.greRequired || false}
            onChange={(e) => onChange({ greRequired: e.target.checked || undefined })}
            className="rounded border-[var(--input)] text-[var(--primary)]"
          />
          No GRE Required
        </label>
      </div>
    </div>
  );
}
