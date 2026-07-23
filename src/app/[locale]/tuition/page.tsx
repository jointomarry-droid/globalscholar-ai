"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Search,
  TrendingDown,
  GraduationCap,
  Building2,
  Clock,
  Award,
  ArrowUpDown,
  AlertCircle,
} from "lucide-react";

interface TuitionData {
  university: string;
  country: string;
  program: string;
  degree: string;
  tuitionAnnual: number;
  currency: string;
  tuitionUSD: number;
  duration: string;
  totalCost: number;
  livingCostUSD: number;
  totalProgramCost: number;
  ranking: number;
  type: "public" | "private";
  scholarshipsAvailable: boolean;
  workWhileStudying: string;
}

const sortOptions = [
  { value: "totalProgramCost", label: "Total Cost" },
  { value: "tuitionUSD", label: "Tuition Only" },
  { value: "ranking", label: "Ranking" },
  { value: "livingCostUSD", label: "Living Cost" },
] as const;

export default function TuitionPage() {
  const [data, setData] = useState<TuitionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>("totalProgramCost");
  const [maxBudget, setMaxBudget] = useState("");

  const fetchTuition = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sortBy });
      if (maxBudget) params.set("maxBudget", maxBudget);
      const res = await fetch(`/api/tuition?${params.toString()}`);
      const data = await res.json();
      if (data.success) setData(data.data);
    } catch {
      setError("Failed to load tuition data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTuition();
  }, [fetchTuition, sortBy, maxBudget]);

  const filtered = data.filter(
    (d) =>
      d.university.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase()) ||
      d.program.toLowerCase().includes(search.toLowerCase())
  );

  const formatUSD = (n: number) => `$${n.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge variant="info" className="mb-4">
            <DollarSign className="h-3 w-3 mr-1" />
            Tuition Fee Comparison
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Tuition <span className="gradient-text">Comparison</span> Tool
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Compare tuition fees, living costs, and total program costs across top universities worldwide.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[var(--primary)]">
                {formatUSD(Math.min(...data.map((d) => d.totalProgramCost)))}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">Lowest Total Cost</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[var(--primary)]">
                {formatUSD(Math.max(...data.map((d) => d.totalProgramCost)))}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">Highest Total Cost</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[var(--success)]">
                {data.filter((d) => d.scholarshipsAvailable).length}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">With Scholarships</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[var(--info)]">{data.length}</p>
              <p className="text-xs text-[var(--muted-foreground)]">Universities</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search universities, countries, or programs..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  sortBy === opt.value
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--accent)] text-[var(--muted-foreground)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--muted-foreground)]">Max budget:</span>
            <input
              type="number"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              placeholder="e.g. 100000"
              className="w-32 px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
            />
          </div>
        </div>

        {/* Tuition Cards */}
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6 h-32" />
              </Card>
            ))
          ) : filtered.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-[var(--muted-foreground)]">
                <DollarSign className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No results found. Try adjusting your filters.</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((item) => (
              <Card key={`${item.university}-${item.program}`} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* University Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                          <span className="text-lg font-bold text-[var(--primary)]">#{item.ranking}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{item.university}</h3>
                          <p className="text-sm text-[var(--muted-foreground)]">{item.country}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{item.degree}</Badge>
                        <Badge variant={item.type === "public" ? "success" : "secondary"}>
                          {item.type === "public" ? "Public" : "Private"}
                        </Badge>
                        {item.scholarshipsAvailable && (
                          <Badge variant="info">
                            <Award className="h-3 w-3 mr-1" />
                            Scholarships Available
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="flex flex-wrap gap-6 lg:gap-8">
                      <div className="text-center">
                        <p className="text-xs text-[var(--muted-foreground)]">Tuition/Year</p>
                        <p className="text-lg font-bold">{formatUSD(item.tuitionUSD)}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {item.tuitionAnnual.toLocaleString()} {item.currency}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-[var(--muted-foreground)]">Living/Year</p>
                        <p className="text-lg font-bold">{formatUSD(item.livingCostUSD)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-[var(--muted-foreground)]">Duration</p>
                        <p className="text-lg font-bold flex items-center gap-1 justify-center">
                          <Clock className="h-4 w-4" />
                          {item.duration}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-[var(--muted-foreground)]">Total Program Cost</p>
                        <p className="text-2xl font-bold text-[var(--primary)]">{formatUSD(item.totalProgramCost)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[var(--border)] text-sm text-[var(--muted-foreground)]">
                    <span className="font-medium">Work rights:</span> {item.workWhileStudying}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
          {error && !loading && (
            <Card className="border-[var(--destructive)]/20">
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-8 w-8 text-[var(--destructive)] mx-auto mb-2" />
                <p className="text-sm text-[var(--destructive)]">{error}</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => { setError(null); fetchTuition(); }}>
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
