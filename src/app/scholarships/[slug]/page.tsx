"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  GraduationCap,
  Banknote,
  Clock,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  FileText,
  Globe,
  Users,
  ArrowLeft,
  Bookmark,
  Share2,
  AlertTriangle,
  Info,
  ChevronRight,
} from "lucide-react";

const mockScholarship = {
  id: "1",
  title: "Erasmus Mundus Joint Master Degree",
  slug: "erasus-mundus-joint-master",
  description:
    "The Erasmus Mundus Joint Master Degree (EMJMD) is a prestigious, integrated, international study programme, jointly delivered by an international consortium of higher education institutions. The EMJMD Study programme is a full-degree scholarship opportunity for students worldwide to pursue a Master's degree in Europe.",
  aiSummary:
    "This is one of the most competitive and prestigious scholarship programs in the world. It covers full tuition, monthly living allowance of €1,400, travel costs, and insurance. The program involves studying at 2-3 European universities, giving you a truly international education experience.",
  universityId: "eu",
  universityName: "European University Consortium",
  country: "Germany",
  countryCode: "DE",
  city: "Berlin",
  degree: "masters" as const,
  field: "Computer Science",
  funding: "fully_funded" as const,
  fundingAmount: "€1,400/month living allowance + full tuition + travel",
  deadline: "2026-03-15",
  eligibility: [
    { field: "nationality", operator: "in" as const, value: ["all"] },
    { field: "degree", operator: "eq" as const, value: "bachelors" },
    { field: "gpa", operator: "gte" as const, value: 3.0 },
  ],
  benefits: [
    "Full tuition coverage at partner universities",
    "Monthly living allowance of €1,400",
    "Travel and installation costs coverage",
    "Health insurance for the entire program",
    "Study at 2-3 European universities",
    "International networking opportunities",
    "Cultural immersion experience",
  ],
  documentsRequired: [
    "Bachelor's degree certificate",
    "Academic transcripts",
    "CV / Resume (Europass format recommended)",
    "Motivation letter (2 pages)",
    "Two recommendation letters",
    "English proficiency proof (IELTS/TOEFL or medium of instruction letter)",
    "Copy of passport",
    "Portfolio (for design/architecture programs)",
  ],
  applicationUrl: "https://erasmus-plus.europa.eu",
  languageRequirements: ["English B2 (IELTS 6.0 / TOEFL 80)"],
  ieltsRequired: false,
  toeflRequired: false,
  greRequired: false,
  internationalStudents: true,
  renewable: false,
  matchScore: 95,
  verified: true,
  source: "university" as const,
  tags: ["europe", "fully funded", "masters", "international"],
  seoTitle: "Erasmus Mundus Joint Master Degree 2026 | Fully Funded",
  seoDescription:
    "Apply for the prestigious Erasmus Mundus scholarship. Full tuition, €1,400/month stipend, travel costs covered.",
  seoKeywords: ["erasus mundus", "europe scholarship", "fully funded masters"],
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
  expiresAt: "2026-03-15",
  applicationProcess: [
    "Research eligible programs on the EMJMD catalog",
    "Check specific consortium requirements",
    "Prepare all required documents",
    "Submit application through the consortium website",
    "Wait for consortium pre-selection",
    "If selected, confirm through the EU portal",
    "Receive final decision",
  ],
  faqs: [
    {
      q: "Can I apply to multiple EMJMD programs?",
      a: "Yes, you can apply to up to 3 different EMJMD programs in one application cycle.",
    },
    {
      q: "Is there an age limit?",
      a: "There is no formal age limit, but the scholarship targets recent graduates and young professionals.",
    },
    {
      q: "Do I need IELTS?",
      a: "Not always. Some programs accept a Medium of Instruction (MOI) letter instead of IELTS/TOEFL.",
    },
    {
      q: "When will I know the result?",
      a: "Results are typically announced between April and June, depending on the consortium.",
    },
  ],
};

export default function ScholarshipDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [now] = useState(() => Date.now());

  const s = mockScholarship;
  const daysLeft = Math.ceil(
    (new Date(s.deadline).getTime() - now) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Link href="/scholarships" className="hover:text-[var(--primary)]">
              Scholarships
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--foreground)]">{s.title}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="success">Fully Funded</Badge>
                <Badge variant="outline">{s.degree}</Badge>
                {s.verified && (
                  <Badge variant="accent" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
                {s.matchScore !== undefined && (
                  <Badge variant="default" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    {s.matchScore}% Match
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{s.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  {s.universityName}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {s.city}, {s.country}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  International Students
                </span>
              </div>
            </div>

            {/* AI Summary */}
            <Card className="border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/5 to-transparent">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-btn shrink-0">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">AI Summary</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">{s.aiSummary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About This Scholarship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {s.description}
                </p>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {s.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-[var(--success)] mt-0.5 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Documents Required */}
            <Card>
              <CardHeader>
                <CardTitle>Documents Required</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {s.documentsRequired.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <FileText className="h-4 w-4 text-[var(--primary)] mt-0.5 shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card>
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {s.applicationProcess.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primary)] text-white text-xs font-bold shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* FAQs */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {s.faqs.map((faq, i) => (
                    <div key={i} className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0">
                      <h4 className="text-sm font-semibold mb-1">{faq.q}</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                {/* Deadline Warning */}
                {daysLeft <= 30 && daysLeft > 0 ? (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-50 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 shrink-0" />
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                      {daysLeft} days left to apply!
                    </span>
                  </div>
                ) : daysLeft <= 0 ? (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
                    <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 shrink-0" />
                    <span className="text-sm font-medium text-red-700 dark:text-red-300">
                      This deadline has passed
                    </span>
                  </div>
                ) : null}

                <Button className="w-full" size="lg" asChild>
                  <a href={s.applicationUrl} target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-semibold">Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted-foreground)]">Deadline</span>
                      <span className="font-medium">
                        {new Date(s.deadline).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted-foreground)]">Degree</span>
                      <span className="font-medium capitalize">{s.degree}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted-foreground)]">Funding</span>
                      <Badge variant="success">Fully Funded</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted-foreground)]">Amount</span>
                      <span className="font-medium text-right">{s.fundingAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted-foreground)]">IELTS</span>
                      <span>{s.ieltsRequired ? "Required" : "Not required"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted-foreground)]">GRE</span>
                      <span>{s.greRequired ? "Required" : "Not required"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Scholarships */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Scholarships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "Chevening Scholarship", country: "UK", score: 88 },
                    { title: "DAAD Development", country: "Germany", score: 82 },
                    { title: "Australia Awards", country: "Australia", score: 71 },
                  ].map((item) => (
                    <Link
                      key={item.title}
                      href={`/scholarships/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--accent)] transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{item.country}</p>
                      </div>
                      <span className="text-sm font-bold text-[var(--primary)]">{item.score}%</span>
                    </Link>
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
