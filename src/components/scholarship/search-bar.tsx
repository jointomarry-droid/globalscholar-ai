"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { Search, Sparkles, MapPin, GraduationCap, Banknote } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  variant?: "default" | "hero" | "compact";
  showFilters?: boolean;
  onSearch?: (query: string) => void;
}

export function SearchBar({
  placeholder,
  variant = "default",
  showFilters = false,
  onSearch,
}: SearchBarProps) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const router = useRouter();

  const defaultPlaceholder = t("scholarships.filters.search") || "Search scholarships...";
  const searchPlaceholder = placeholder || defaultPlaceholder;

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    } else {
      router.push(`/scholarships?search=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  if (variant === "hero") {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="relative">
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-[var(--background)] border border-[var(--border)] shadow-lg">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted-foreground)]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={searchPlaceholder}
                className="h-14 pl-12 pr-4 text-base border-0 focus-visible:ring-0 bg-transparent"
              />
            </div>
            <Button onClick={handleSearch} size="lg" className="h-12 px-6 rounded-xl">
              <Search className="h-5 w-5 mr-2" />
              {t("nav.search") || "Search"}
            </Button>
          </div>

          {/* Quick Filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {[
                { icon: MapPin, label: t("scholarships.filters.country") || "By Country" },
                { icon: GraduationCap, label: t("scholarships.filters.degree") || "By Degree" },
                { icon: Banknote, label: t("scholarships.funding.fully_funded") || "Fully Funded" },
                { icon: Sparkles, label: t("nav.aiSearch") || "AI Match" },
              ].map((filter) => (
                <button
                  key={filter.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--accent)] transition-colors"
                >
                  <filter.icon className="h-3.5 w-3.5" />
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          {t("nav.search") || "Search"}
        </Button>
      </div>
    </div>
  );
}
