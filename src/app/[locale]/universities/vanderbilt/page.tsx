"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  MapPin,
  Globe,
  Award,
  DollarSign,
  Calendar,
  FileText,
  Users,
  BookOpen,
  TrendingUp,
  ExternalLink,
  CheckCircle2,
  Clock,
  Mail,
  ChevronDown,
  ChevronUp,
  Star,
  Building2,
  Brain,
  Heart,
  Lightbulb,
} from "lucide-react";

const scholarships = [
  {
    id: "cornelius",
    name: "Cornelius Vanderbilt Scholarship",
    amount: "Full Tuition (~$62,000/year)",
    deadline: "December 1",
    renewable: true,
    competitive: true,
    successRate: "Top 1% of applicants",
    description: "Vanderbilt's most prestigious merit scholarship for outstanding academic achievement, leadership, and extracurricular accomplishment.",
    eligibility: [
      "First-year undergraduate applicant",
      "Outstanding academic record",
      "Demonstrated leadership",
      "Meaningful extracurricular involvement",
      "Strong personal essays",
    ],
    benefits: [
      "Full tuition coverage for 4 years",
      "Summer stipends for study abroad/research/service",
      "Leadership development opportunities",
      "Scholar communities and mentorship",
      "Priority course registration",
    ],
    tips: [
      "Apply by December 1 deadline",
      "Demonstrate leadership and community impact",
      "Write compelling supplemental essays",
      "Show intellectual curiosity beyond classroom",
      "Highlight unique personal experiences",
    ],
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "ingram",
    name: "Ingram Scholars Program",
    amount: "Full Tuition (~$62,000/year)",
    deadline: "December 1",
    renewable: true,
    competitive: true,
    successRate: "Top 1% of applicants",
    description: "Supports students who demonstrate leadership, entrepreneurship, and a strong commitment to community service and social impact.",
    eligibility: [
      "First-year undergraduate applicant",
      "Strong leadership experience",
      "Commitment to community service",
      "Entrepreneurial mindset",
      "Social impact focus",
    ],
    benefits: [
      "Full tuition coverage for 4 years",
      "Summer stipends for service projects",
      "Leadership and entrepreneurship training",
      "Community service project funding",
      "Scholar cohort experience",
    ],
    tips: [
      "Show genuine passion for community service",
      "Demonstrate entrepreneurial thinking",
      "Provide evidence of leadership impact",
      "Write authentic essays about service experiences",
      "Highlight specific social impact projects",
    ],
    color: "from-green-500 to-green-700",
  },
  {
    id: "chancellor",
    name: "Chancellor's Scholarship",
    amount: "Full Tuition (~$62,000/year)",
    deadline: "December 1",
    renewable: true,
    competitive: true,
    successRate: "Top 1% of applicants",
    description: "Recognizes exceptional leadership, academic excellence, and contributions to diversity and inclusion.",
    eligibility: [
      "First-year undergraduate applicant",
      "Exceptional leadership record",
      "Commitment to diversity and inclusion",
      "Academic excellence",
      "Community contributions",
    ],
    benefits: [
      "Full tuition coverage for 4 years",
      "Summer stipends",
      "Leadership development programs",
      "Access to scholar communities",
      "Mentorship from alumni network",
    ],
    tips: [
      "Demonstrate commitment to diversity and inclusion",
      "Show leadership in creating positive change",
      "Write impactful essays about your journey",
      "Highlight community contributions",
      "Show how you will contribute to Vanderbilt",
    ],
    color: "from-purple-500 to-purple-700",
  },
];

const quickFacts = [
  { icon: Building2, label: "Type", value: "Private Research University" },
  { icon: MapPin, label: "Location", value: "Nashville, Tennessee, USA" },
  { icon: Users, label: "Students", value: "~7,111 undergrad + 6,861 graduate" },
  { icon: Globe, label: "International", value: "~12% of student body" },
  { icon: TrendingUp, label: "Acceptance Rate", value: "~6.7% (Highly Selective)" },
  { icon: DollarSign, label: "Tuition", value: "~$62,000/year" },
  { icon: BookOpen, label: "Schools", value: "10 schools and colleges" },
  { icon: Award, label: "Ranking", value: "#18 National (US News)" },
];

const academicSchools = [
  "College of Arts and Science",
  "Blair School of Music",
  "Divinity School",
  "Law School",
  "School of Engineering",
  "Graduate School",
  "School of Medicine",
  "School of Nursing",
  "Owen Graduate School of Management",
  "Peabody College of Education and Human Development",
];

const campusHighlights = [
  { icon: Heart, title: "Student Life", desc: "Vibrant campus with 500+ student organizations, Division I athletics, and a thriving music scene in Nashville." },
  { icon: Lightbulb, title: "Research", desc: "R1 research university with $1B+ in annual research expenditures across medicine, engineering, and sciences." },
  { icon: Globe, title: "Global Network", desc: "Study abroad programs in 40+ countries and partnerships with leading institutions worldwide." },
  { icon: Brain, title: "Academic Excellence", desc: "Top-ranked programs in medicine, law, business, engineering, education, and liberal arts." },
];

export default function VanderbiltPage() {
  const [expandedScholarship, setExpandedScholarship] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "scholarships" | "admissions" | "campus">("overview");

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#B3A369] via-[#8B7D3C] to-[#5C4A1E] text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-white/20 text-white border-white/30">
              <GraduationCap className="h-3 w-3 mr-1" />
              Private Research University
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30">
              <MapPin className="h-3 w-3 mr-1" />
              Nashville, Tennessee
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vanderbilt University
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mb-6">
            A private research university in Nashville, Tennessee, offering both merit-based scholarships
            and need-based financial aid for undergraduate students, including eligible international applicants.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-white text-[#5C4A1E] hover:bg-white/90">
              <a href="https://www.vanderbilt.edu/scholarships/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Official Scholarship Page
              </a>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <a href="https://admissions.vanderbilt.edu/" target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {([
            { id: "overview", label: "Overview" },
            { id: "scholarships", label: "Scholarships" },
            { id: "admissions", label: "Admissions" },
            { id: "campus", label: "Campus Life" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-[#5C4A1E] text-white"
                  : "bg-[var(--accent)] text-[var(--muted-foreground)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#B3A369]" />
                  Quick Facts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickFacts.map((fact) => (
                    <div key={fact.label} className="p-3 rounded-lg bg-[var(--accent)]">
                      <div className="flex items-center gap-2 mb-1">
                        <fact.icon className="h-4 w-4 text-[var(--primary)]" />
                        <span className="text-xs text-[var(--muted-foreground)]">{fact.label}</span>
                      </div>
                      <p className="font-semibold text-sm">{fact.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About Vanderbilt</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-[var(--foreground)]">
                <p className="text-[var(--muted-foreground)]">
                  Vanderbilt University is a private research university located in Nashville, Tennessee. Founded in 1873,
                  the university offers both merit-based scholarships and need-based financial aid for undergraduate students,
                  including eligible international applicants. Vanderbilt is committed to fostering a diverse and inclusive
                  community while providing world-class education and research opportunities.
                </p>
                <p className="text-[var(--muted-foreground)] mt-3">
                  The university&apos;s signature merit scholarships — the Cornelius Vanderbilt Scholarship, Ingram Scholars Program,
                  and Chancellor&apos;s Scholarship — cover full tuition and are awarded to the top 1% of applicants. These
                  scholarships are highly competitive and consider academic excellence, leadership, extracurricular
                  accomplishments, and contributions to diversity and inclusion.
                </p>
              </CardContent>
            </Card>

            {/* Academic Schools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#B3A369]" />
                  Schools and Colleges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-2">
                  {academicSchools.map((school) => (
                    <div key={school} className="flex items-center gap-2 p-2 rounded-lg bg-[var(--accent)]">
                      <CheckCircle2 className="h-4 w-4 text-[var(--primary)] flex-shrink-0" />
                      <span className="text-sm">{school}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Scholarships Tab */}
        {activeTab === "scholarships" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                Merit <span className="gradient-text">Scholarships</span>
              </h2>
              <p className="text-[var(--muted-foreground)]">
                Vanderbilt offers three signature merit scholarships covering full tuition for outstanding first-year students.
              </p>
            </div>

            {/* Important Notice */}
            <Card className="border-[var(--warning)] bg-[var(--warning)]/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[var(--warning)] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Application Deadline: December 1</p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      All three merit scholarships have the same deadline. Submit your application and scholarship materials by December 1 for consideration.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scholarship Cards */}
            {scholarships.map((scholarship) => (
              <Card key={scholarship.id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className={`h-2 bg-gradient-to-r ${scholarship.color}`} />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{scholarship.name}</CardTitle>
                      <p className="text-[var(--muted-foreground)] mt-1">{scholarship.description}</p>
                    </div>
                    <Badge variant="success" className="flex-shrink-0">
                      <Award className="h-3 w-3 mr-1" />
                      Full Tuition
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Quick Info */}
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-[var(--accent)]">
                      <p className="text-xs text-[var(--muted-foreground)]">Award</p>
                      <p className="font-semibold text-sm">{scholarship.amount}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[var(--accent)]">
                      <p className="text-xs text-[var(--muted-foreground)]">Deadline</p>
                      <p className="font-semibold text-sm flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {scholarship.deadline}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-[var(--accent)]">
                      <p className="text-xs text-[var(--muted-foreground)]">Renewable</p>
                      <p className="font-semibold text-sm">Yes, for 4 years</p>
                    </div>
                  </div>

                  {/* Expand/Collapse */}
                  <button
                    onClick={() => setExpandedScholarship(expandedScholarship === scholarship.id ? null : scholarship.id)}
                    className="w-full flex items-center justify-center gap-1 text-sm text-[var(--primary)] hover:underline"
                  >
                    {expandedScholarship === scholarship.id ? "Show Less" : "Show Details"}
                    {expandedScholarship === scholarship.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  {expandedScholarship === scholarship.id && (
                    <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                      {/* Eligibility */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-[var(--primary)]" />
                          Eligibility Requirements
                        </h4>
                        <ul className="space-y-1">
                          {scholarship.eligibility.map((req, i) => (
                            <li key={i} className="text-sm flex items-start gap-2 text-[var(--muted-foreground)]">
                              <CheckCircle2 className="h-3 w-3 text-[var(--success)] mt-1 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Award className="h-4 w-4 text-[var(--primary)]" />
                          Benefits
                        </h4>
                        <ul className="space-y-1">
                          {scholarship.benefits.map((benefit, i) => (
                            <li key={i} className="text-sm flex items-start gap-2 text-[var(--muted-foreground)]">
                              <Star className="h-3 w-3 text-[var(--warning)] mt-1 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tips */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-[var(--primary)]" />
                          Application Tips
                        </h4>
                        <ul className="space-y-1">
                          {scholarship.tips.map((tip, i) => (
                            <li key={i} className="text-sm flex items-start gap-2 text-[var(--muted-foreground)]">
                              <Lightbulb className="h-3 w-3 text-[var(--warning)] mt-1 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Competition Level */}
                      <div className="p-3 rounded-lg bg-[var(--primary)]/5 border border-[var(--primary)]/20">
                        <p className="text-sm font-medium text-[var(--primary)]">
                          Competition Level: {scholarship.successRate}
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">
                          These scholarships are extremely competitive. Academic excellence alone is usually not enough —
                          Vanderbilt also considers leadership, impact, essays, recommendations, and extracurricular
                          achievements through a holistic review.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Need-Based Aid */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[var(--primary)]" />
                  Need-Based Financial Aid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    In addition to merit scholarships, Vanderbilt offers limited need-based financial aid for
                    international students. The admissions process is need-aware for international applicants
                    requesting financial aid.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-[var(--accent)]">
                      <p className="text-xs font-medium text-[var(--muted-foreground)]">For International Students</p>
                      <p className="text-sm">Submit CSS Profile and required financial aid documents if applying for need-based aid.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[var(--accent)]">
                      <p className="text-xs font-medium text-[var(--muted-foreground)]">Application Process</p>
                      <p className="text-sm">Apply for financial aid simultaneously with admission for maximum consideration.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Admissions Tab */}
        {activeTab === "admissions" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[var(--primary)]" />
                  How to Apply
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { step: 1, title: "Submit Admission Application", desc: "Complete the Common Application or Coalition Application by the deadline." },
                    { step: 2, title: "Create MyAppVU Portal", desc: "After applying, create and access your MyAppVU portal to track your application." },
                    { step: 3, title: "Complete Scholarship Application", desc: "Complete the scholarship application(s) for the merit scholarships you're interested in." },
                    { step: 4, title: "Submit Required Documents", desc: "Upload all required essays, transcripts, and supporting documents before the deadline." },
                    { step: 5, title: "Interview (Optional)", desc: "Participate in an optional interview if offered by the admissions office." },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full gradient-btn flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{item.step}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[var(--primary)]" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Completed admission application",
                    "High school transcripts",
                    "Personal statement",
                    "Supplemental essays (for scholarship)",
                    "Two teacher recommendations",
                    "Counselor recommendation",
                    "SAT/ACT scores (optional)",
                    "English proficiency test (if required)",
                    "Financial aid documents (if applying for need-based aid)",
                  ].map((doc) => (
                    <div key={doc} className="flex items-center gap-2 p-2 rounded-lg bg-[var(--accent)]">
                      <CheckCircle2 className="h-4 w-4 text-[var(--success)] flex-shrink-0" />
                      <span className="text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[var(--primary)]" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--accent)]">
                    <span className="text-sm font-medium">Early Decision Deadline</span>
                    <Badge variant="info">November 1</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--accent)]">
                    <span className="text-sm font-medium">Merit Scholarship Deadline</span>
                    <Badge variant="destructive">December 1</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--accent)]">
                    <span className="text-sm font-medium">Regular Decision Deadline</span>
                    <Badge variant="info">January 1</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--accent)]">
                    <span className="text-sm font-medium">Financial Aid Deadline</span>
                    <Badge variant="info">February 15</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Campus Life Tab */}
        {activeTab === "campus" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {campusHighlights.map((highlight) => (
                <Card key={highlight.title} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 rounded-xl bg-[var(--primary)]/10">
                        <highlight.icon className="h-6 w-6 text-[var(--primary)]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{highlight.title}</h3>
                        <p className="text-sm text-[var(--muted-foreground)]">{highlight.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Nashville: Music City</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                  Vanderbilt&apos;s campus is located in the heart of Nashville, Tennessee — known as &quot;Music City.&quot;
                  Students enjoy a vibrant cultural scene with live music, diverse dining, professional sports,
                  and a growing tech industry. The campus is just 1.5 miles from downtown Nashville, offering
                  easy access to internships, networking, and entertainment.
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-[var(--accent)] text-center">
                    <p className="text-2xl font-bold text-[var(--primary)]">500+</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Student Organizations</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--accent)] text-center">
                    <p className="text-2xl font-bold text-[var(--primary)]">16</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Division I Sports</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--accent)] text-center">
                    <p className="text-2xl font-bold text-[var(--primary)]">40+</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Study Abroad Countries</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contact Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">Ready to Apply?</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Contact Vanderbilt Financial Aid or visit the official website for more information.
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <a href="mailto:vufinaid@vanderbilt.edu">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Financial Aid
                  </a>
                </Button>
                <Button asChild className="gradient-btn">
                  <a href="https://www.vanderbilt.edu/scholarships/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
