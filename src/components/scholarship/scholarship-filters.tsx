"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

const countries = [
  "United States", "United Kingdom", "Germany", "Canada", "Australia",
  "France", "Netherlands", "Japan", "South Korea", "China",
  "Turkey", "Saudi Arabia", "UAE", "India", "Pakistan",
  "Brazil", "Mexico", "Italy", "Spain", "Sweden",
];

const degrees = [
  { value: "bachelors", label: "Bachelor's" },
  { value: "masters", label: "Master's" },
  { value: "phd", label: "PhD" },
  { value: "diploma", label: "Diploma" },
  { value: "certificate", label: "Certificate" },
];

const fundingTypes = [
  { value: "fully_funded", label: "Fully Funded" },
  { value: "partial", label: "Partially Funded" },
  { value: "tuition_only", label: "Tuition Only" },
  { value: "stipend", label: "With Stipend" },
];

const fields = [
  "Computer Science", "Engineering", "Business", "Medicine", "Law",
  "Arts", "Science", "Education", "Social Sciences", "Environmental Science",
];

interface ScholarshipFiltersProps {
  filters: Record<string, string | boolean | undefined>;
  onFilterChange: (key: string, value: string | boolean | undefined) => void;
  onClear: () => void;
}

export function ScholarshipFilters({ filters, onFilterChange, onClear }: ScholarshipFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    country: true,
    degree: true,
    funding: true,
    field: false,
    requirements: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="text-sm font-semibold">Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="default" className="h-5 px-1.5 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="text-xs h-7">
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;
            return (
              <Badge key={key} variant="secondary" className="gap-1 text-xs">
                {String(value)}
                <button onClick={() => onFilterChange(key, undefined)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}

      {/* Country */}
      <FilterSection
        title="Country"
        expanded={expandedSections.country}
        onToggle={() => toggleSection("country")}
      >
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => onFilterChange("country", filters.country === country ? undefined : country)}
              className={cn(
                "w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors",
                filters.country === country
                  ? "bg-[var(--primary)] text-white"
                  : "hover:bg-[var(--accent)]"
              )}
            >
              {country}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Degree */}
      <FilterSection
        title="Degree Level"
        expanded={expandedSections.degree}
        onToggle={() => toggleSection("degree")}
      >
        <div className="flex flex-wrap gap-1.5">
          {degrees.map((deg) => (
            <button
              key={deg.value}
              onClick={() => onFilterChange("degree", filters.degree === deg.value ? undefined : deg.value)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-full border transition-colors",
                filters.degree === deg.value
                  ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                  : "border-[var(--border)] hover:border-[var(--primary)]"
              )}
            >
              {deg.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Funding */}
      <FilterSection
        title="Funding Type"
        expanded={expandedSections.funding}
        onToggle={() => toggleSection("funding")}
      >
        <div className="space-y-1.5">
          {fundingTypes.map((fund) => (
            <label
              key={fund.value}
              className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-[var(--accent)] cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.funding === fund.value}
                onChange={() => onFilterChange("funding", filters.funding === fund.value ? undefined : fund.value)}
                className="rounded border-[var(--input)] text-[var(--primary)] focus:ring-[var(--ring)]"
              />
              {fund.label}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Field */}
      <FilterSection
        title="Field of Study"
        expanded={expandedSections.field}
        onToggle={() => toggleSection("field")}
      >
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {fields.map((field) => (
            <button
              key={field}
              onClick={() => onFilterChange("field", filters.field === field ? undefined : field)}
              className={cn(
                "w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors",
                filters.field === field
                  ? "bg-[var(--primary)] text-white"
                  : "hover:bg-[var(--accent)]"
              )}
            >
              {field}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Requirements */}
      <FilterSection
        title="Requirements"
        expanded={expandedSections.requirements}
        onToggle={() => toggleSection("requirements")}
      >
        <div className="space-y-1.5">
          {[
            { key: "ieltsRequired", label: "No IELTS Required" },
            { key: "toeflRequired", label: "No TOEFL Required" },
            { key: "greRequired", label: "No GRE Required" },
            { key: "internationalStudents", label: "For International Students" },
          ].map((req) => (
            <label
              key={req.key}
              className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-[var(--accent)] cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={!!filters[req.key]}
                onChange={() => onFilterChange(req.key, filters[req.key] ? undefined : true)}
                className="rounded border-[var(--input)] text-[var(--primary)] focus:ring-[var(--ring)]"
              />
              {req.label}
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}

function FilterSection({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[var(--border)] pb-3">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-1 text-sm font-medium"
      >
        {title}
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-[var(--muted-foreground)]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[var(--muted-foreground)]" />
        )}
      </button>
      {expanded && <div className="mt-2">{children}</div>}
    </div>
  );
}
