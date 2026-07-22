"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  debounceMs?: number;
}

export function SearchInput({ placeholder = "Search...", onSearch, className, debounceMs = 300 }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value);
      if (timer) clearTimeout(timer);
      const newTimer = setTimeout(() => onSearch(value), debounceMs);
      setTimer(newTimer);
    },
    [timer, onSearch, debounceMs]
  );

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
      <Input
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-8"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
