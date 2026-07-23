"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import {
  Brain,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Globe,
  GraduationCap,
  Star,
  TrendingUp,
  Filter,
  Loader2,
} from "lucide-react";

interface ScholarshipMatch {
  id: string;
  name: string;
  university: string;
  country: string;
  matchScore: number;
  deadline: string;
  amount: string;
  type: string;
  requirements: string[];
}

export default function AIMatcherPage() {
  const t = useTranslations();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ScholarshipMatch[]>([]);
  const [profile, setProfile] = useState({
    nationality: "",
    degree: "",
    field: "",
    gpa: "",
    countries: "",
    interests: "",
    budget: "",
  });

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setResults([
      {
        id: "1",
        name: "Erasmus Mundus Joint Master Degree",
        university: "EU Consortium",
        country: "European Union",
        matchScore: 95,
        deadline: "March 15, 2026",
        amount: "€1,400/month + Full Tuition",
        type: "Fully Funded",
        requirements: ["3.0+ GPA", "English Proficiency", "2 Letters of Recommendation"],
      },
      {
        id: "2",
        name: "DAAD Scholarship for Development",
        university: "German Universities",
        country: "Germany",
        matchScore: 92,
        deadline: "October 15, 2025",
        amount: "€861/month + Tuition",
        type: "Fully Funded",
        requirements: ["2+ Years Work Experience", "German Language (B1)", "Development Background"],
      },
      {
        id: "3",
        name: "Chevening Scholarship",
        university: "UK Universities",
        country: "United Kingdom",
        matchScore: 89,
        deadline: "November 2, 2025",
        amount: "Full Tuition + Living Allowance",
        type: "Fully Funded",
        requirements: ["Leadership Experience", "4+ Years Work Experience", "UK University Offer"],
      },
      {
        id: "4",
        name: "Fulbright Foreign Student Program",
        university: "US Universities",
        country: "United States",
        matchScore: 87,
        deadline: "February 28, 2026",
        amount: "Full Tuition + Stipend + Airfare",
        type: "Fully Funded",
        requirements: ["Bachelor's Degree", "English Proficiency", "Research Proposal"],
      },
      {
        id: "5",
        name: "Swedish Institute Scholarships",
        university: "Swedish Universities",
        country: "Sweden",
        matchScore: 85,
        deadline: "February 2026",
        amount: "SEK 10,000/month + Tuition",
        type: "Fully Funded",
        requirements: ["3,000+ Hours Work Experience", "Leadership Potential", "Sustainable Development Focus"],
      },
    ]);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-600/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
            <Brain className="h-4 w-4" />
            {t("ai.matcher.title")}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            {t("ai.matcher.title")}
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
            {t("ai.matcher.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Profile Form */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                {t("ai.matcher.profileTitle")}
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("ai.matcher.nationality")}</label>
                  <select
                    value={profile.nationality}
                    onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">{t("ai.matcher.selectCountry")}</option>
                    <option value="pakistan">Pakistan</option>
                    <option value="india">India</option>
                    <option value="nigeria">Nigeria</option>
                    <option value="bangladesh">Bangladesh</option>
                    <option value="kenya">Kenya</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("ai.matcher.degreeLevel")}</label>
                  <select
                    value={profile.degree}
                    onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">{t("ai.matcher.selectDegree")}</option>
                    <option value="bachelors">Bachelor's</option>
                    <option value="masters">Master's</option>
                    <option value="phd">PhD</option>
                    <option value="postdoc">Postdoc</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("ai.matcher.fieldOfStudy")}</label>
                  <select
                    value={profile.field}
                    onChange={(e) => setProfile({ ...profile, field: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">{t("ai.matcher.selectField")}</option>
                    <option value="engineering">Engineering</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="business">Business</option>
                    <option value="medicine">Medicine</option>
                    <option value="arts">Arts & Humanities</option>
                    <option value="sciences">Sciences</option>
                    <option value="social-sciences">Social Sciences</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("ai.matcher.gpa")}</label>
                  <select
                    value={profile.gpa}
                    onChange={(e) => setProfile({ ...profile, gpa: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">{t("ai.matcher.selectGpa")}</option>
                    <option value="4.0">4.0 (Perfect)</option>
                    <option value="3.7">3.7+ (Excellent)</option>
                    <option value="3.3">3.3+ (Very Good)</option>
                    <option value="3.0">3.0+ (Good)</option>
                    <option value="2.7">2.7+ (Above Average)</option>
                    <option value="2.5">2.5+ (Average)</option>
                  </select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">{t("ai.matcher.preferredCountries")}</label>
                  <input
                    type="text"
                    placeholder={t("ai.matcher.countriesPlaceholder")}
                    value={profile.countries}
                    onChange={(e) => setProfile({ ...profile, countries: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">{t("ai.matcher.interests")}</label>
                  <textarea
                    placeholder={t("ai.matcher.interestsPlaceholder")}
                    value={profile.interests}
                    onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full mt-6 gradient-btn"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    {t("ai.matcher.analyzing")}
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5 mr-2" />
                    {t("ai.matcher.findMatches")}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                {t("ai.matcher.foundMatches").replace("{count}", results.length.toString())}
              </h2>

              {results.map((scholarship) => (
                <Card key={scholarship.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold">{scholarship.name}</h3>
                          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                            <TrendingUp className="h-4 w-4" />
                            {scholarship.matchScore}%
                          </div>
                        </div>
                        <p className="text-sm text-[var(--muted-foreground)] mb-3">
                          {scholarship.university} • {scholarship.country}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                            {scholarship.type}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-muted text-xs">
                            {scholarship.amount}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {scholarship.requirements.map((req) => (
                            <span key={req} className="px-2 py-1 rounded-full bg-muted text-xs">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
                          <Clock className="h-4 w-4" />
                          {scholarship.deadline}
                        </div>
                        <Button size="sm" className="gradient-btn">
                          {t("ai.matcher.applyNow")}
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
