"use client";

import { useState, useMemo } from "react";
import { ScholarshipCard } from "@/components/scholarship/scholarship-card";
import { ScholarshipFilters } from "@/components/scholarship/scholarship-filters";
import { SearchBar } from "@/components/scholarship/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";
import type { Scholarship } from "@/types";
import { SlidersHorizontal, Grid3X3, List, ArrowUpDown } from "lucide-react";

// Mock data for development
const mockScholarships: Scholarship[] = [
  {
    id: "1",
    title: "Erasmus Mundus Joint Master Degree",
    slug: "erasus-mundus-joint-master",
    description: "Full scholarship for international students to study in Europe.",
    aiSummary: "Prestigious EU-funded program covering tuition, living costs, and travel for Master's students across multiple European universities.",
    universityId: "eu",
    universityName: "European University Consortium",
    country: "Germany",
    countryCode: "DE",
    city: "Berlin",
    degree: "masters",
    field: "Computer Science",
    funding: "fully_funded",
    fundingAmount: "€1,400/month living allowance",
    deadline: "2026-03-15",
    eligibility: [],
    benefits: ["Full tuition", "Monthly stipend", "Travel allowance", "Insurance"],
    documentsRequired: ["Transcript", "CV", "Motivation letter", "Recommendation letters"],
    applicationUrl: "https://erasmus-plus.europa.eu",
    languageRequirements: ["English B2"],
    ieltsRequired: false,
    internationalStudents: true,
    renewable: false,
    matchScore: 95,
    verified: true,
    source: "university",
    tags: ["europe", "fully funded", "masters"],
    seoTitle: "Erasmus Mundus Scholarship 2026",
    seoDescription: "Apply for Erasmus Mundus fully funded Master's scholarship in Europe",
    seoKeywords: ["erasus mundus", "europe scholarship", "fully funded masters"],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    expiresAt: "2026-03-15",
  },
  {
    id: "2",
    title: "Chevening Scholarship",
    slug: "chevening-scholarship",
    description: "UK government global scholarship for future leaders.",
    aiSummary: "UK's flagship scholarship program for outstanding professionals with leadership potential. Covers full tuition and living expenses for one-year Master's in the UK.",
    universityId: "uk",
    universityName: "UK Government / Partner Universities",
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    degree: "masters",
    field: "Business",
    funding: "fully_funded",
    fundingAmount: "£1,516/month",
    deadline: "2026-02-01",
    eligibility: [],
    benefits: ["Full tuition", "Monthly stipend", "Travel costs", "Arrival allowance"],
    documentsRequired: ["Degree certificate", "CV", "References", "Study plan"],
    applicationUrl: "https://chevening.org",
    languageRequirements: ["English C1"],
    ieltsRequired: true,
    internationalStudents: true,
    renewable: false,
    matchScore: 88,
    verified: true,
    source: "government",
    tags: ["uk", "fully funded", "leadership"],
    seoTitle: "Chevening Scholarship 2026",
    seoDescription: "Apply for UK Chevening Scholarship for future leaders",
    seoKeywords: ["chevening", "uk scholarship", "fully funded uk"],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    expiresAt: "2026-02-01",
  },
  {
    id: "3",
    title: "DAAD Scholarship for Development",
    slug: "daad-development-scholarship",
    description: "German academic exchange service scholarship for developing countries.",
    aiSummary: "DAAD scholarship supporting graduates from developing countries in fields related to development cooperation. Monthly stipend plus health insurance.",
    universityId: "daad",
    universityName: "DAAD / German Universities",
    country: "Germany",
    countryCode: "DE",
    city: "Bonn",
    degree: "masters",
    field: "Environmental Science",
    funding: "fully_funded",
    fundingAmount: "€934/month",
    deadline: "2026-04-30",
    eligibility: [],
    benefits: ["Monthly stipend", "Health insurance", "Travel allowance"],
    documentsRequired: ["Bachelor's degree", "CV", "Motivation letter"],
    applicationUrl: "https://daad.de",
    languageRequirements: ["German B1 or English B2"],
    ieltsRequired: false,
    internationalStudents: true,
    renewable: false,
    matchScore: 82,
    verified: true,
    source: "organization",
    tags: ["germany", "development", "fully funded"],
    seoTitle: "DAAD Scholarship 2026",
    seoDescription: "DAAD development scholarship for international students",
    seoKeywords: ["daad", "germany scholarship", "development studies"],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    expiresAt: "2026-04-30",
  },
  {
    id: "4",
    title: "Fulbright Foreign Student Program",
    slug: "fulbright-foreign-student",
    description: "US government sponsored program for international graduate students.",
    aiSummary: "Prestigious US government program enabling graduate students, young professionals, and artists from abroad to study in the US. Fully funded with monthly stipend.",
    universityId: "fulbright",
    universityName: "Fulbright Commission / US Universities",
    country: "United States",
    countryCode: "US",
    city: "Washington D.C.",
    degree: "phd",
    field: "All Fields",
    funding: "fully_funded",
    fundingAmount: "$2,500/month",
    deadline: "2026-02-15",
    eligibility: [],
    benefits: ["Full tuition", "Monthly stipend", "Airfare", "Health insurance"],
    documentsRequired: ["Transcripts", "GRE", "TOEFL", "References", "Study plan"],
    applicationUrl: "https://fulbright.org",
    languageRequirements: ["English TOEFL 80+"],
    toeflRequired: true,
    internationalStudents: true,
    renewable: false,
    matchScore: 76,
    verified: true,
    source: "government",
    tags: ["usa", "fully funded", "phd"],
    seoTitle: "Fulbright Scholarship 2026",
    seoDescription: "Apply for Fulbright Foreign Student Program",
    seoKeywords: ["fulbright", "usa scholarship", "phd funding"],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    expiresAt: "2026-02-15",
  },
  {
    id: "5",
    title: "Australia Awards Scholarships",
    slug: "australia-awards",
    description: "Australian government scholarships for students from developing countries.",
    aiSummary: "Long-term scholarships funded by the Australian Government for students from developing countries to study at Australian universities at undergraduate or postgraduate level.",
    universityId: "australia",
    universityName: "Australian Government / Partner Universities",
    country: "Australia",
    countryCode: "AU",
    city: "Canberra",
    degree: "masters",
    field: "Engineering",
    funding: "fully_funded",
    fundingAmount: "AUD 3,000/month",
    deadline: "2026-04-30",
    eligibility: [],
    benefits: ["Full tuition", "Living allowance", "Return airfare", "Health insurance"],
    documentsRequired: ["Degree", "IELTS 6.5+", "Work experience", "References"],
    applicationUrl: "https://dfat.gov.au/people-to-people/australia-awards",
    languageRequirements: ["English IELTS 6.5"],
    ieltsRequired: true,
    internationalStudents: true,
    renewable: false,
    matchScore: 71,
    verified: true,
    source: "government",
    tags: ["australia", "fully funded", "developing countries"],
    seoTitle: "Australia Awards Scholarship 2026",
    seoDescription: "Australian government scholarship for international students",
    seoKeywords: ["australia awards", "australia scholarship", "fully funded"],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    expiresAt: "2026-04-30",
  },
  {
    id: "6",
    title: "MEXT Japanese Government Scholarship",
    slug: "mext-scholarship",
    description: "Fully funded scholarship from the Japanese government for international students.",
    aiSummary: "Japan's Ministry of Education scholarship covering full tuition, monthly stipend, and round-trip airfare for international students at Japanese universities.",
    universityId: "mext",
    universityName: "Japanese Government / National Universities",
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    degree: "masters",
    field: "All Fields",
    funding: "fully_funded",
    fundingAmount: "¥144,000/month",
    deadline: "2026-04-15",
    eligibility: [],
    benefits: ["Full tuition", "Monthly stipend", "Round-trip airfare"],
    documentsRequired: ["Degree", "Transcripts", "Recommendation letter", "Research proposal"],
    applicationUrl: "https://www.jpss.jp/en/mext/",
    languageRequirements: ["Japanese or English"],
    internationalStudents: true,
    renewable: false,
    matchScore: 65,
    verified: true,
    source: "government",
    tags: ["japan", "fully funded", "mext"],
    seoTitle: "MEXT Scholarship 2026",
    seoDescription: "Japanese government MEXT scholarship for international students",
    seoKeywords: ["mext", "japan scholarship", "fully funded japan"],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    expiresAt: "2026-04-15",
  },
];

export default function ScholarshipsPage() {
  const { t } = useI18n();
  const [filters, setFilters] = useState<Record<string, string | boolean | undefined>>({});
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"matchScore" | "deadline" | "title">("matchScore");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScholarships = useMemo(() => {
    let results = [...mockScholarships];

    // Apply search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.universityName.toLowerCase().includes(q) ||
          s.country.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    // Apply filters
    if (filters.country) {
      results = results.filter((s) => s.country === filters.country);
    }
    if (filters.degree) {
      results = results.filter((s) => s.degree === filters.degree);
    }
    if (filters.funding) {
      results = results.filter((s) => s.funding === filters.funding);
    }
    if (filters.field) {
      results = results.filter((s) => s.field === filters.field);
    }

    // Sort
    results.sort((a, b) => {
      if (sortBy === "matchScore") return (b.matchScore || 0) - (a.matchScore || 0);
      if (sortBy === "deadline") return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      return a.title.localeCompare(b.title);
    });

    return results;
  }, [filters, searchQuery, sortBy]);

  const handleFilterChange = (key: string, value: string | boolean | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-4">{t("scholarships.title")}</h1>
          <p className="text-[var(--muted-foreground)] mb-6">
            {t("scholarships.subtitle")} - {filteredScholarships.length} {t("scholarships.results")}
          </p>
          <SearchBar
            placeholder={t("scholarships.filters.search")}
            onSearch={setSearchQuery}
          />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <ScholarshipFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={clearFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--muted-foreground)]">
                  {filteredScholarships.length} {t("scholarships.results")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                >
                  {viewMode === "grid" ? (
                    <List className="h-4 w-4" />
                  ) : (
                    <Grid3X3 className="h-4 w-4" />
                  )}
                </Button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="text-sm border border-[var(--input)] rounded-lg px-3 py-1.5 bg-[var(--background)]"
                >
                  <option value="matchScore">{t("scholarships.sort.bestMatch")}</option>
                  <option value="deadline">{t("scholarships.sort.deadline")}</option>
                  <option value="title">{t("scholarships.sort.name")}</option>
                </select>
              </div>
            </div>

            {/* Scholarship Grid */}
            {filteredScholarships.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredScholarships.map((scholarship) => (
                  <ScholarshipCard
                    key={scholarship.id}
                    scholarship={scholarship}
                    saved={false}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-[var(--muted-foreground)]">
                  {t("scholarships.noResults")}
                </p>
                <Button onClick={clearFilters} className="mt-4">
                  {t("scholarships.clearFilters")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
