import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, GraduationCap, BookOpen, Globe, ArrowRight } from "lucide-react";

const countryData: Record<string, {
  name: string;
  code: string;
  description: string;
  scholarships: number;
  universities: number;
  topScholarships: Array<{ title: string; university: string; funding: string; deadline: string }>;
  highlights: string[];
}> = {
  us: {
    name: "United States",
    code: "us",
    description: "Home to the world's top universities and a vast array of scholarship opportunities for international students.",
    scholarships: 45000,
    universities: 4000,
    topScholarships: [
      { title: "Fulbright Foreign Student Program", university: "US Government", funding: "Fully Funded", deadline: "Feb 15, 2026" },
      { title: "Hubert Humphrey Fellowship", university: "US Government", funding: "Fully Funded", deadline: "Oct 1, 2026" },
      { title: "MIT Scholarships", university: "MIT", funding: "Need-Based", deadline: "Jan 1, 2026" },
    ],
    highlights: ["4,000+ universities", "Research opportunities", "OPT work authorization", "Diverse programs"],
  },
  uk: {
    name: "United Kingdom",
    code: "uk",
    description: "World-class education with generous scholarship programs from the UK government and universities.",
    scholarships: 18000,
    universities: 150,
    topScholarships: [
      { title: "Chevening Scholarship", university: "UK Government", funding: "Fully Funded", deadline: "Nov 5, 2025" },
      { title: "Gates Cambridge Scholarship", university: "University of Cambridge", funding: "Fully Funded", deadline: "Dec 3, 2025" },
      { title: "Rhodes Scholarship", university: "University of Oxford", funding: "Fully Funded", deadline: "Oct 10, 2025" },
    ],
    highlights: ["1-year Master's programs", "Strong alumni network", "Research excellence", "Global recognition"],
  },
  de: {
    name: "Germany",
    code: "de",
    description: "Tuition-free education at public universities with numerous scholarship opportunities for international students.",
    scholarships: 15000,
    universities: 400,
    topScholarships: [
      { title: "DAAD Scholarship", university: "DAAD", funding: "Fully Funded", deadline: "Oct 15, 2025" },
      { title: "Deutschlandstipendium", university: "German Universities", funding: "300/month", deadline: "Varies" },
      { title: "Heinrich Boll Foundation", university: "Boll Foundation", funding: "Fully Funded", deadline: "Mar 1, 2026" },
    ],
    highlights: ["Tuition-free public universities", "Strong engineering programs", "Central European location", "Post-study work visa"],
  },
  ca: {
    name: "Canada",
    code: "ca",
    description: "High-quality education with excellent post-graduation immigration pathways and scholarship opportunities.",
    scholarships: 12000,
    universities: 200,
    topScholarships: [
      { title: "Vanier Canada Graduate Scholarships", university: "Canadian Government", funding: "50,000/year", deadline: "Nov 1, 2025" },
      { title: "Trudeau Foundation Scholarships", university: "Trudeau Foundation", funding: "60,000/year", deadline: "Dec 1, 2025" },
      { title: "Lester B. Pearson Scholarship", university: "University of Toronto", funding: "Fully Funded", deadline: "Nov 7, 2025" },
    ],
    highlights: ["Post-graduation work permit", "Multicultural society", "High quality of life", "Immigration pathways"],
  },
  au: {
    name: "Australia",
    code: "au",
    description: "World-ranked universities with generous scholarships and a vibrant international student community.",
    scholarships: 10000,
    universities: 50,
    topScholarships: [
      { title: "Australia Awards", university: "Australian Government", funding: "Fully Funded", deadline: "Apr 30, 2026" },
      { title: "Research Training Program", university: "Australian Government", funding: "Fully Funded", deadline: "Varies" },
      { title: "Melbourne Graduate Scholarship", university: "University of Melbourne", funding: "Fully Funded", deadline: "Oct 31, 2025" },
    ],
    highlights: ["Group of Eight universities", "Research excellence", "Post-study work rights", "Quality of life"],
  },
  jp: {
    name: "Japan",
    code: "jp",
    description: "Cutting-edge research facilities and generous government scholarships for international students.",
    scholarships: 12000,
    universities: 800,
    topScholarships: [
      { title: "MEXT Scholarship", university: "Japanese Government", funding: "Fully Funded", deadline: "Apr 15, 2026" },
      { title: "JASSO Scholarship", university: "JASSO", funding: "48,000/month", deadline: "Varies" },
      { title: "ADB-Japan Scholarship", university: "ADB", funding: "Fully Funded", deadline: "Varies" },
    ],
    highlights: ["Technology leadership", "Cultural experience", "Safety", "Research opportunities"],
  },
  fr: {
    name: "France",
    code: "fr",
    description: "Excellent education system with low tuition fees and numerous scholarship programs for international students.",
    scholarships: 10000,
    universities: 350,
    topScholarships: [
      { title: "Eiffel Excellence Scholarship", university: "French Government", funding: "Fully Funded", deadline: "Jan 10, 2026" },
      { title: "Erasmus Mundus", university: "EU", funding: "Fully Funded", deadline: "Varies" },
      { title: "Campus France Scholarship", university: "Campus France", funding: "Varies", deadline: "Varies" },
    ],
    highlights: ["Low tuition at public universities", "Cultural richness", "Central European location", "Strong research"],
  },
  nl: {
    name: "Netherlands",
    code: "nl",
    description: "Innovative education system with English-taught programs and generous scholarship opportunities.",
    scholarships: 8000,
    universities: 50,
    topScholarships: [
      { title: "Holland Scholarship", university: "Dutch Government", funding: "5,000", deadline: "Feb 1, 2026" },
      { title: "Orange Knowledge Programme", university: "Dutch Government", funding: "Fully Funded", deadline: "Mar 1, 2026" },
      { title: "Erasmus Mundus", university: "EU", funding: "Fully Funded", deadline: "Varies" },
    ],
    highlights: ["English-taught programs", "Innovation hub", "High quality of life", "Central European location"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const country = countryData[slug];
  if (!country) return { title: "Country Not Found" };

  return {
    title: `Scholarships in ${country.name}`,
    description: country.description,
  };
}

export default async function CountryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = countryData[slug];

  if (!country) notFound();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Link href="/countries" className="hover:text-[var(--primary)]">Countries</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--foreground)]">{country.name}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Scholarships in {country.name}</h1>
          <p className="text-lg text-[var(--muted-foreground)] max-w-3xl">{country.description}</p>
          <div className="flex gap-6 mt-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[var(--primary)]" />
              <span className="font-semibold">{country.scholarships.toLocaleString()}</span>
              <span className="text-sm text-[var(--muted-foreground)]">scholarships</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[var(--primary)]" />
              <span className="font-semibold">{country.universities.toLocaleString()}</span>
              <span className="text-sm text-[var(--muted-foreground)]">universities</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Top Scholarships */}
            <Card>
              <CardHeader>
                <CardTitle>Top Scholarships in {country.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {country.topScholarships.map((s, i) => (
                    <div key={i} className="p-4 rounded-lg border border-[var(--border)] hover:bg-[var(--accent)] transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{s.title}</h3>
                          <p className="text-sm text-[var(--muted-foreground)]">{s.university}</p>
                        </div>
                        <Badge variant="success">{s.funding}</Badge>
                      </div>
                      <div className="mt-2 text-xs text-[var(--muted-foreground)]">
                        Deadline: {s.deadline}
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild className="w-full mt-4" variant="outline">
                  <Link href={`/scholarships?country=${country.name}`}>
                    View All {country.name} Scholarships
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Study in {country.name}?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {country.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-[var(--primary)] shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[var(--primary)]/5 to-transparent border-[var(--primary)]/20">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                  Our AI advisor can help you find the best scholarships in {country.name} for your profile.
                </p>
                <Button asChild className="w-full" size="sm">
                  <Link href="/ai-search">
                    Ask AI Advisor
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
