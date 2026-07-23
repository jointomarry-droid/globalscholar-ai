"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Globe,
  Search,
  ExternalLink,
  Users,
  BookOpen,
  Building2,
  GraduationCap,
  AlertCircle,
} from "lucide-react";

interface Ranking {
  rank: number;
  name: string;
  country: string;
  region: string;
  worldRankings: { qs: number | null; the: number | null; shanghai: number | null };
  scores: { academic: number; employer: number; internationalStudents: number };
  studentCount: number;
  internationalPercentage: number;
  tuitionRange: string;
  strengths: string[];
}

export default function RankingsPage() {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [sortBy, setSortBy] = useState<"rank" | "qs" | "the" | "shanghai">("rank");
  const [selectedUni, setSelectedUni] = useState<Ranking | null>(null);

  useEffect(() => {
    fetchRankings();
  }, [countryFilter, sortBy]);

  const fetchRankings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (countryFilter) params.set("country", countryFilter);
      params.set("sortBy", sortBy);
      params.set("limit", "30");

      const res = await fetch(`/api/rankings?${params.toString()}`);
      const data = await res.json();
      if (data.success) setRankings(data.data);
    } catch {
      setError("Failed to load rankings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = rankings.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge variant="info" className="mb-4">
            <Trophy className="h-3 w-3 mr-1" />
            QS + THE + Shanghai Rankings
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            University <span className="gradient-text">Rankings</span>
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Compare world-class universities using QS, Times Higher Education, and Shanghai
            Academic Ranking of World Universities data.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search universities..."
                className="pl-10"
              />
            </div>
          </div>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
          >
            <option value="">All Countries</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Germany">Germany</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Japan">Japan</option>
            <option value="Singapore">Singapore</option>
            <option value="Australia">Australia</option>
            <option value="China">China</option>
            <option value="South Korea">South Korea</option>
            <option value="Canada">Canada</option>
          </select>
          <div className="flex gap-2">
            {(["rank", "qs", "the", "shanghai"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  sortBy === s
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--accent)] text-[var(--muted-foreground)]"
                }`}
              >
                {s === "rank" ? "Overall" : s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Rankings Table */}
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6 h-24" />
              </Card>
            ))
          ) : (
            filtered.map((uni) => (
              <Card
                key={uni.rank}
                className="hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedUni(selectedUni?.rank === uni.rank ? null : uni)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[var(--primary)]">#{uni.rank}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-lg truncate">{uni.name}</h3>
                        <Badge variant="outline">{uni.country}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {uni.region}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {uni.studentCount.toLocaleString()} students
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {uni.internationalPercentage}% international
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {uni.tuitionRange}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-6 text-center">
                      <div>
                        <p className="text-xs text-[var(--muted-foreground)]">QS</p>
                        <p className="font-bold">{uni.worldRankings.qs || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--muted-foreground)]">THE</p>
                        <p className="font-bold">{uni.worldRankings.the || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--muted-foreground)]">Shanghai</p>
                        <p className="font-bold">{uni.worldRankings.shanghai || "-"}</p>
                      </div>
                    </div>
                  </div>
                  {selectedUni?.rank === uni.rank && (
                    <div className="mt-4 pt-4 border-t border-[var(--border)]">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs font-medium text-[var(--muted-foreground)] mb-1">Scores</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between"><span>Academic</span><span>{uni.scores.academic}/100</span></div>
                            <div className="flex justify-between"><span>Employer</span><span>{uni.scores.employer}/100</span></div>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[var(--muted-foreground)] mb-1">Strengths</p>
                          <div className="flex flex-wrap gap-1">
                            {uni.strengths.map((s) => (
                              <Badge key={s} variant="success" className="text-xs">{s}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-end">
                          <Button variant="outline" size="sm" asChild>
                            <a href="#" onClick={(e) => e.stopPropagation()}>
                              View Details <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
          {error && !loading && (
            <Card className="border-[var(--destructive)]/20">
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-8 w-8 text-[var(--destructive)] mx-auto mb-2" />
                <p className="text-sm text-[var(--destructive)]">{error}</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => { setError(null); fetchRankings(); }}>
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
