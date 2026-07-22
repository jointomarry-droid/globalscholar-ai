"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Languages,
  Search,
  ArrowRightLeft,
  CheckCircle2,
  XCircle,
  Globe,
  AlertCircle,
} from "lucide-react";

interface LanguageReq {
  university: string;
  country: string;
  program: string;
  degree: string;
  ielts: { overall: number; minPerBand: number };
  toefl: { ibt: number; pbt?: number };
  pte: number;
  duolingo: number;
  cambridge: string;
  waivesFor: string[];
  notes: string;
}

interface ScoreConversion {
  ielts: number;
  toefl: number;
  pte: number;
  duolingo: number;
  cambridge: string;
}

export default function IeltsToeflPage() {
  const [requirements, setRequirements] = useState<LanguageReq[]>([]);
  const [conversions, setConversions] = useState<ScoreConversion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [activeTab, setActiveTab] = useState<"checker" | "converter">("checker");

  // Converter state
  const [inputScore, setInputScore] = useState("");
  const [inputType, setInputType] = useState<"ielts" | "toefl" | "pte">("ielts");

  useEffect(() => {
    fetchData();
  }, [countryFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (countryFilter) params.set("country", countryFilter);
      const res = await fetch(`/api/ielts-toefl?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setRequirements(data.data);
        setConversions(data.scoreConversions || []);
      }
    } catch {
      setError("Failed to load language requirements. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = requirements.filter(
    (r) =>
      r.university.toLowerCase().includes(search.toLowerCase()) ||
      r.program.toLowerCase().includes(search.toLowerCase())
  );

  const convertedScore = () => {
    const score = parseFloat(inputScore);
    if (isNaN(score)) return null;
    if (inputType === "ielts") {
      const match = conversions.find((c) => Math.abs(c.ielts - score) < 0.01);
      if (match) {
        return { ielts: match.ielts, toefl: match.toefl, pte: match.pte, duolingo: match.duolingo };
      }
      const lower = conversions.filter((c) => c.ielts <= score).pop();
      const upper = conversions.find((c) => c.ielts >= score);
      if (lower && upper) {
        const ratio = (score - lower.ielts) / (upper.ielts - lower.ielts);
        return {
          ielts: score,
          toefl: Math.round(lower.toefl + ratio * (upper.toefl - lower.toefl)),
          pte: Math.round(lower.pte + ratio * (upper.pte - lower.pte)),
          duolingo: Math.round(lower.duolingo + ratio * (upper.duolingo - lower.duolingo)),
        };
      }
    } else if (inputType === "toefl") {
      const match = conversions.find((c) => c.toefl === Math.round(score));
      if (match) {
        return { ielts: match.ielts, toefl: match.toefl, pte: match.pte, duolingo: match.duolingo };
      }
    } else if (inputType === "pte") {
      const match = conversions.find((c) => Math.abs(c.pte - score) < 1);
      if (match) {
        return { ielts: match.ielts, toefl: match.toefl, pte: match.pte, duolingo: match.duolingo };
      }
    }
    return null;
  };

  const checkRequirement = (req: LanguageReq, userScore: number, type: string) => {
    if (type === "ielts") return userScore >= req.ielts.overall;
    if (type === "toefl") return userScore >= req.toefl.ibt;
    if (type === "pte") return userScore >= req.pte;
    return false;
  };

  const converted = convertedScore();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge variant="info" className="mb-4">
            <Languages className="h-3 w-3 mr-1" />
            Language Requirements
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            IELTS / TOEFL <span className="gradient-text">Requirement Checker</span>
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Check language requirements for top universities and convert between IELTS, TOEFL, PTE, and Duolingo scores.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 justify-center mb-8">
          <button
            onClick={() => setActiveTab("checker")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "checker"
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--accent)] text-[var(--muted-foreground)]"
            }`}
          >
            <Languages className="h-4 w-4 inline mr-2" />
            Requirement Checker
          </button>
          <button
            onClick={() => setActiveTab("converter")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "converter"
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--accent)] text-[var(--muted-foreground)]"
            }`}
          >
            <ArrowRightLeft className="h-4 w-4 inline mr-2" />
            Score Converter
          </button>
        </div>

        {activeTab === "checker" ? (
          <>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search universities or programs..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
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
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Singapore">Singapore</option>
                <option value="Switzerland">Switzerland</option>
                <option value="South Korea">South Korea</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
              </select>
            </div>

            {/* Requirements Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6 h-48" />
                  </Card>
                ))
              ) : filtered.length === 0 ? (
                <Card className="md:col-span-2">
                  <CardContent className="p-8 text-center text-[var(--muted-foreground)]">
                    <Languages className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No requirements found matching your search.</p>
                  </CardContent>
                </Card>
              ) : (
                filtered.map((req) => (
                  <Card key={`${req.university}-${req.program}`} className="hover:shadow-lg transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{req.university}</CardTitle>
                          <p className="text-sm text-[var(--muted-foreground)]">{req.country}</p>
                        </div>
                        <Badge variant="outline">{req.degree}</Badge>
                      </div>
                      <p className="text-sm text-[var(--primary)]">{req.program}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 rounded-lg bg-[var(--accent)]">
                          <p className="text-xs text-[var(--muted-foreground)]">IELTS</p>
                          <p className="font-bold">{req.ielts.overall} <span className="text-xs font-normal">(min {req.ielts.minPerBand} per band)</span></p>
                        </div>
                        <div className="p-2 rounded-lg bg-[var(--accent)]">
                          <p className="text-xs text-[var(--muted-foreground)]">TOEFL iBT</p>
                          <p className="font-bold">{req.toefl.ibt}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-[var(--accent)]">
                          <p className="text-xs text-[var(--muted-foreground)]">PTE</p>
                          <p className="font-bold">{req.pte}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-[var(--accent)]">
                          <p className="text-xs text-[var(--muted-foreground)]">Duolingo</p>
                          <p className="font-bold">{req.duolingo}</p>
                        </div>
                      </div>
                      {req.notes && (
                        <p className="text-xs text-[var(--muted-foreground)] italic">{req.notes}</p>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
              {error && !loading && (
                <Card className="md:col-span-2 border-[var(--destructive)]/20">
                  <CardContent className="p-8 text-center">
                    <AlertCircle className="h-8 w-8 text-[var(--destructive)] mx-auto mb-2" />
                    <p className="text-sm text-[var(--destructive)]">{error}</p>
                    <Button variant="outline" size="sm" className="mt-4" onClick={() => { setError(null); fetchData(); }}>
                      Retry
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        ) : (
          /* Score Converter */
          <div className="max-w-2xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ArrowRightLeft className="h-4 w-4 text-[var(--primary)]" />
                  Convert Your Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Your Score</label>
                    <input
                      type="number"
                      value={inputScore}
                      onChange={(e) => setInputScore(e.target.value)}
                      placeholder="Enter your score"
                      className="w-full px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
                      step={inputType === "ielts" ? "0.5" : "1"}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Test Type</label>
                    <select
                      value={inputType}
                      onChange={(e) => setInputType(e.target.value as "ielts" | "toefl" | "pte")}
                      className="px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
                    >
                      <option value="ielts">IELTS</option>
                      <option value="toefl">TOEFL iBT</option>
                      <option value="pte">PTE</option>
                    </select>
                  </div>
                </div>

                {converted && (
                  <div className="p-4 rounded-xl bg-[var(--primary)]/5 border border-[var(--primary)]/20">
                    <p className="text-sm font-medium text-[var(--primary)] mb-3">Equivalent Scores</p>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="text-center">
                        <p className="text-xs text-[var(--muted-foreground)]">IELTS</p>
                        <p className="text-xl font-bold">{converted.ielts}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-[var(--muted-foreground)]">TOEFL iBT</p>
                        <p className="text-xl font-bold">{converted.toefl}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-[var(--muted-foreground)]">PTE</p>
                        <p className="text-xl font-bold">{converted.pte}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-[var(--muted-foreground)]">Duolingo</p>
                        <p className="text-xl font-bold">{converted.duolingo}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Reference Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Reference Table</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)]">
                        <th className="text-left p-2 font-medium">IELTS</th>
                        <th className="text-left p-2 font-medium">TOEFL iBT</th>
                        <th className="text-left p-2 font-medium">PTE</th>
                        <th className="text-left p-2 font-medium">Duolingo</th>
                        <th className="text-left p-2 font-medium">CEFR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conversions.map((row) => (
                        <tr key={row.ielts} className="border-b border-[var(--border)] hover:bg-[var(--accent)]">
                          <td className="p-2 font-medium">{row.ielts}</td>
                          <td className="p-2">{row.toefl}</td>
                          <td className="p-2">{row.pte}</td>
                          <td className="p-2">{row.duolingo}</td>
                          <td className="p-2">
                            <Badge variant="outline" className="text-xs">{row.cambridge}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
