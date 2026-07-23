"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  GraduationCap,
  DollarSign,
  Globe,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Recommendation {
  type: string;
  id: string;
  name: string;
  country: string;
  matchScore: number;
  matchReasons: string[];
  missingRequirements: string[];
  estimatedCost: string;
  deadline: string;
}

export default function RecommendationsPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ universities: Recommendation[]; scholarships: Recommendation[]; summary: string } | null>(null);
  const [form, setForm] = useState({
    name: "",
    degree: "bachelors",
    field: "",
    gpa: "",
    country: "",
    nationality: "",
    budget: "",
    preferredCountries: "",
    ieltsScore: "",
    workExperience: "",
    researchInterests: "",
  });

  const handleSearch = async () => {
    if (!form.name || !form.field) return;
    setLoading(true);

    try {
      const response = await fetch("/api/ai/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          degree: form.degree,
          field: form.field,
          gpa: form.gpa ? parseFloat(form.gpa) : 3.0,
          country: form.country,
          nationality: form.nationality || form.country,
          budget: form.budget ? parseFloat(form.budget) : 50000,
          preferredCountries: form.preferredCountries ? form.preferredCountries.split(",").map((s) => s.trim()) : [],
          ieltsScore: form.ieltsScore ? parseFloat(form.ieltsScore) : undefined,
          workExperience: form.workExperience ? parseInt(form.workExperience) : undefined,
          researchInterests: form.researchInterests ? form.researchInterests.split(",").map((s) => s.trim()) : [],
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResults(data.data);
      }
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge variant="info" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Matching
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Smart <span className="gradient-text">Recommendations</span>
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Get personalized university and scholarship recommendations based on your profile,
            goals, and preferences.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Panel - Profile Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name *</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Field of Study *</label>
                  <Input value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} placeholder="e.g. Computer Science" />
                </div>
                <div>
                  <label className="text-sm font-medium">GPA (out of 4.0)</label>
                  <Input value={form.gpa} onChange={(e) => setForm({ ...form, gpa: e.target.value })} placeholder="e.g. 3.5" />
                </div>
                <div>
                  <label className="text-sm font-medium">IELTS Score</label>
                  <Input value={form.ieltsScore} onChange={(e) => setForm({ ...form, ieltsScore: e.target.value })} placeholder="e.g. 7.0" />
                </div>
                <div>
                  <label className="text-sm font-medium">Budget (USD/year)</label>
                  <Input value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="e.g. 30000" />
                </div>
                <div>
                  <label className="text-sm font-medium">Preferred Countries</label>
                  <Input value={form.preferredCountries} onChange={(e) => setForm({ ...form, preferredCountries: e.target.value })} placeholder="e.g. Germany, Canada" />
                </div>
                <div>
                  <label className="text-sm font-medium">Work Experience (years)</label>
                  <Input value={form.workExperience} onChange={(e) => setForm({ ...form, workExperience: e.target.value })} placeholder="e.g. 2" />
                </div>
                <Button onClick={handleSearch} disabled={!form.name || !form.field || loading} className="w-full">
                  {loading ? (
                    <><Sparkles className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</>
                  ) : (
                    <><Sparkles className="h-4 w-4 mr-2" /> Get Recommendations</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-3 space-y-8">
            {!results ? (
              <Card className="min-h-[400px]">
                <CardContent className="flex flex-col items-center justify-center h-full">
                  <GraduationCap className="h-16 w-16 text-[var(--muted-foreground)] mb-4" />
                  <p className="text-[var(--muted-foreground)] text-center">
                    Fill in your profile to get personalized recommendations
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Summary */}
                <Card className="border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/5 to-transparent">
                  <CardContent className="p-6">
                    <p className="text-sm whitespace-pre-line">{results.summary}</p>
                  </CardContent>
                </Card>

                {/* Universities */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-[var(--primary)]" />
                    Recommended Universities
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {results.universities.map((uni) => (
                      <Card key={uni.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold">{uni.name}</h3>
                              <p className="text-sm text-[var(--muted-foreground)]">{uni.country}</p>
                            </div>
                            <Badge variant={uni.matchScore >= 70 ? "success" : uni.matchScore >= 50 ? "warning" : "outline"}>
                              {uni.matchScore}%
                            </Badge>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="h-3 w-3 text-[var(--muted-foreground)]" />
                              {uni.estimatedCost}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Globe className="h-3 w-3 text-[var(--muted-foreground)]" />
                              Deadline: {uni.deadline}
                            </div>
                          </div>
                          {uni.matchReasons.length > 0 && (
                            <div className="space-y-1">
                              {uni.matchReasons.slice(0, 2).map((reason, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-green-600">
                                  <CheckCircle2 className="h-3 w-3" />
                                  {reason}
                                </div>
                              ))}
                            </div>
                          )}
                          {uni.missingRequirements.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {uni.missingRequirements.slice(0, 1).map((req, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-orange-600">
                                  <AlertCircle className="h-3 w-3" />
                                  {req}
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Scholarships */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-[var(--success)]" />
                    Recommended Scholarships
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {results.scholarships.map((sch) => (
                      <Card key={sch.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold">{sch.name}</h3>
                              <p className="text-sm text-[var(--muted-foreground)]">{sch.country}</p>
                            </div>
                            <Badge variant={sch.matchScore >= 70 ? "success" : sch.matchScore >= 50 ? "warning" : "outline"}>
                              {sch.matchScore}%
                            </Badge>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <TrendingUp className="h-3 w-3 text-[var(--success)]" />
                              {sch.estimatedCost}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Globe className="h-3 w-3 text-[var(--muted-foreground)]" />
                              Deadline: {sch.deadline}
                            </div>
                          </div>
                          {sch.matchReasons.length > 0 && (
                            <div className="space-y-1">
                              {sch.matchReasons.slice(0, 2).map((reason, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-green-600">
                                  <CheckCircle2 className="h-3 w-3" />
                                  {reason}
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
