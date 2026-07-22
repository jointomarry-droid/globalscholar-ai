"use client";

import { use } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScholarshipCard } from "@/components/scholarship/scholarship-card";
import type { Scholarship } from "@/types";
import {
  MapPin,
  Globe,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Users,
  BookOpen,
  Building2,
  ChevronRight,
  Award,
  GraduationCap,
  Link2,
} from "lucide-react";

const mockUniversity = {
  id: "1",
  name: "Technical University of Munich",
  slug: "technical-university-munich",
  country: "Germany",
  countryCode: "DE",
  city: "Munich",
  website: "https://tum.de",
  logo: "",
  description:
    "The Technical University of Munich (TUM) is one of Europe's leading technical universities. With its strong focus on engineering, natural sciences, medicine, and social sciences, TUM has consistently ranked among the top universities in Germany and Europe.",
  ranking: 50,
  accreditation: ["WASC", "German Accreditation Council", "EQUIS"],
  verified: true,
  scholarshipCount: 45,
  studentCount: 47000,
  foundedYear: 1868,
  type: "public",
  specialties: ["Engineering", "Computer Science", "Natural Sciences", "Medicine", "Business"],
  statistics: {
    totalStudents: 47000,
    internationalStudents: 14000,
    facultyMembers: 5200,
    programsOffered: 178,
    researchProjects: 850,
    industryPartners: 450,
  },
  rankings: {
    qs: 50,
    timesHigher: 38,
    arwu: 55,
  },
  internationalProfile: {
    partnerUniversities: 180,
    exchangePrograms: 85,
    countriesRepresented: 126,
  },
};

const mockScholarships: Scholarship[] = [
  {
    id: "1",
    title: "TUM Graduate School Scholarship",
    slug: "tum-graduate-school",
    description: "Full scholarship for outstanding graduate students at TUM.",
    aiSummary: "Merit-based scholarship covering full tuition and living costs for exceptional graduate students.",
    universityId: "1",
    universityName: "Technical University of Munich",
    country: "Germany",
    countryCode: "DE",
    city: "Munich",
    degree: "masters",
    field: "Engineering",
    funding: "fully_funded",
    deadline: "2026-04-01",
    eligibility: [],
    benefits: ["Full tuition", "Monthly stipend"],
    documentsRequired: ["Transcript", "CV"],
    applicationUrl: "https://tum.de",
    languageRequirements: ["English B2"],
    internationalStudents: true,
    renewable: false,
    matchScore: 90,
    verified: true,
    source: "university",
    tags: ["germany", "engineering"],
    seoTitle: "TUM Scholarship",
    seoDescription: "TUM scholarship",
    seoKeywords: [],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
    expiresAt: "2026-04-01",
  },
];

export default function UniversityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const uni = mockUniversity;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Link href="/universities" className="hover:text-[var(--primary)]">
              Universities
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--foreground)]">{uni.name}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-[var(--border)] bg-gradient-to-br from-[var(--primary)]/5 via-[var(--background)] to-[var(--accent)]/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl gradient-btn text-white text-2xl font-bold shrink-0">
              {uni.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {uni.verified && (
                  <Badge variant="accent" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
                <Badge variant="outline">{uni.type}</Badge>
                {uni.ranking && <Badge variant="info">#{uni.ranking} QS World</Badge>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{uni.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {uni.city}, {uni.country}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Founded {uni.foundedYear}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {uni.internationalProfile.countriesRepresented} countries
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <a href={uni.website} target="_blank" rel="noopener noreferrer">
                  <Link2 className="h-4 w-4 mr-2" />
                  Website
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {uni.description}
                </p>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle>Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {uni.specialties.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rankings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Global Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-[var(--secondary)]">
                    <p className="text-2xl font-bold text-[var(--primary)]">#{uni.rankings.qs}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">QS World 2026</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-[var(--secondary)]">
                    <p className="text-2xl font-bold text-[var(--primary)]">#{uni.rankings.timesHigher}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Times Higher Ed</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-[var(--secondary)]">
                    <p className="text-2xl font-bold text-[var(--primary)]">#{uni.rankings.arwu}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">ARWU (Shanghai)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scholarships */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Scholarships at {uni.name} ({mockScholarships.length})
              </h2>
              <div className="space-y-4">
                {mockScholarships.map((s) => (
                  <ScholarshipCard key={s.id} scholarship={s} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Key Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { icon: Users, label: "Total Students", value: uni.statistics.totalStudents.toLocaleString() },
                    { icon: Globe, label: "International", value: uni.statistics.internationalStudents.toLocaleString() },
                    { icon: GraduationCap, label: "Programs", value: uni.statistics.programsOffered },
                    { icon: BookOpen, label: "Research Projects", value: uni.statistics.researchProjects },
                    { icon: Building2, label: "Industry Partners", value: uni.statistics.industryPartners },
                    { icon: Globe, label: "Partner Universities", value: uni.internationalProfile.partnerUniversities },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-[var(--muted-foreground)]">
                        <stat.icon className="h-4 w-4" />
                        {stat.label}
                      </span>
                      <span className="font-semibold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Accreditation */}
            <Card>
              <CardHeader>
                <CardTitle>Accreditation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {uni.accreditation.map((acc) => (
                    <div key={acc} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />
                      {acc}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
