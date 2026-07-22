"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/scholarship/search-bar";
import type { University } from "@/types";
import { MapPin, GraduationCap, ExternalLink, CheckCircle2, Globe, Users } from "lucide-react";

const mockUniversities: University[] = [
  {
    id: "1",
    name: "Technical University of Munich",
    slug: "technical-university-munich",
    country: "Germany",
    countryCode: "DE",
    city: "Munich",
    website: "https://tum.de",
    logo: "",
    description: "One of Europe's leading technical universities, known for engineering and computer science.",
    ranking: 50,
    accreditation: ["WASC", "German Accreditation Council"],
    verified: true,
    scholarshipCount: 45,
    foundedYear: 1868,
    type: "public",
    specialties: ["Engineering", "Computer Science", "Natural Sciences"],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "2",
    name: "University of Oxford",
    slug: "university-of-oxford",
    country: "United Kingdom",
    countryCode: "GB",
    city: "Oxford",
    website: "https://ox.ac.uk",
    logo: "",
    description: "The oldest university in the English-speaking world, with a world-class reputation.",
    ranking: 1,
    accreditation: ["QAA"],
    verified: true,
    scholarshipCount: 120,
    foundedYear: 1096,
    type: "public",
    specialties: ["All Fields"],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "3",
    name: "Massachusetts Institute of Technology",
    slug: "mit",
    country: "United States",
    countryCode: "US",
    city: "Cambridge",
    website: "https://mit.edu",
    logo: "",
    description: "World-renowned research university for science, engineering, and technology.",
    ranking: 2,
    accreditation: ["NEASC"],
    verified: true,
    scholarshipCount: 85,
    foundedYear: 1861,
    type: "private",
    specialties: ["STEM", "Business", "Architecture"],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "4",
    name: "University of Toronto",
    slug: "university-of-toronto",
    country: "Canada",
    countryCode: "CA",
    city: "Toronto",
    website: "https://utoronto.ca",
    logo: "",
    description: "Canada's top university with a strong focus on research and innovation.",
    ranking: 25,
    accreditation: ["U of T Accreditation"],
    verified: true,
    scholarshipCount: 65,
    foundedYear: 1827,
    type: "public",
    specialties: ["Medicine", "Engineering", "Arts"],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "5",
    name: "University of Melbourne",
    slug: "university-of-melbourne",
    country: "Australia",
    countryCode: "AU",
    city: "Melbourne",
    website: "https://unimelb.edu.au",
    logo: "",
    description: "Australia's leading university, consistently ranked in the top 50 worldwide.",
    ranking: 35,
    accreditation: ["TEQSA"],
    verified: true,
    scholarshipCount: 55,
    foundedYear: 1853,
    type: "public",
    specialties: ["Medicine", "Law", "Business"],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "6",
    name: "University of Tokyo",
    slug: "university-of-tokyo",
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    website: "https://u-tokyo.ac.jp",
    logo: "",
    description: "Japan's most prestigious university, leading in research and innovation.",
    ranking: 30,
    accreditation: ["Japanese University Accreditation Association"],
    verified: true,
    scholarshipCount: 40,
    foundedYear: 1877,
    type: "public",
    specialties: ["Sciences", "Engineering", "Medicine"],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
];

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-4">Universities</h1>
          <p className="text-[var(--muted-foreground)] mb-6">
            Explore {mockUniversities.length} verified universities worldwide
          </p>
          <SearchBar placeholder="Search universities..." />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Universities", value: "50,000+", icon: GraduationCap },
            { label: "Countries", value: "200+", icon: Globe },
            { label: "Verified", value: "10,000+", icon: CheckCircle2 },
            { label: "Active Students", value: "2M+", icon: Users },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <stat.icon className="h-8 w-8 text-[var(--primary)]" />
                <div>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* University Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockUniversities.map((uni) => (
            <Card key={uni.id} className="group hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/universities/${uni.slug}`}
                      className="text-base font-semibold hover:text-[var(--primary)] transition-colors line-clamp-2"
                    >
                      {uni.name}
                    </Link>
                    <div className="flex items-center gap-1 mt-1 text-sm text-[var(--muted-foreground)]">
                      <MapPin className="h-3.5 w-3.5" />
                      {uni.city}, {uni.country}
                    </div>
                  </div>
                  {uni.verified && (
                    <Badge variant="accent" className="gap-1 shrink-0">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-4">
                  {uni.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {uni.specialties.slice(0, 3).map((s) => (
                    <Badge key={s} variant="outline" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-[var(--muted-foreground)]">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {uni.scholarshipCount} scholarships
                    </span>
                    {uni.ranking && (
                      <span>#{uni.ranking} globally</span>
                    )}
                  </div>
                  <Button asChild size="sm" variant="ghost">
                    <a href={uni.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
