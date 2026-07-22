"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import {
  Rocket,
  Target,
  Globe,
  Brain,
  GraduationCap,
  Users,
  Building2,
  Briefcase,
  Award,
  TrendingUp,
  Shield,
  Zap,
  Lightbulb,
  Heart,
  Globe2,
  BookOpen,
  FileText,
  FlaskConical,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const milestones = [
  {
    year: "2024-2025",
    title: "Foundation & Launch",
    items: [
      "Launch core platform with 500,000+ scholarships",
      "AI Scholarship Matcher with 95% accuracy",
      "Document Analyzer and Essay Writer",
      "12-language i18n support",
      "Mobile app launch (iOS & Android)",
    ],
    icon: Rocket,
    status: "in-progress",
  },
  {
    year: "2025-2026",
    title: "Scale & Intelligence",
    items: [
      "AI Career Predictor and Success Calculator",
      "University Predictor with acceptance rates",
      "Research Hub for researchers",
      "1M+ student users milestone",
      "Partnerships with 500+ universities",
    ],
    icon: TrendingUp,
    status: "upcoming",
  },
  {
    year: "2026-2027",
    title: "Global Expansion",
    items: [
      "Visa Assistant with country-specific guides",
      "Cost Calculator and Budget Planner",
      "Alumni Network and Career Services",
      "2M+ student users milestone",
      "Partnerships with 2,000+ universities",
    ],
    icon: Globe,
    status: "planned",
  },
  {
    year: "2027-2028",
    title: "Enterprise & AI",
    items: [
      "University CRM and Consultant Portal",
      "AI-powered admission counseling",
      "Research collaboration platform",
      "5M+ student users milestone",
      "Enterprise partnerships with governments",
    ],
    icon: Building2,
    status: "planned",
  },
  {
    year: "2028-2030",
    title: "Ecosystem Complete",
    items: [
      "Full education ecosystem launch",
      "AI tutoring and course recommendations",
      "Job placement and internship matching",
      "10M+ student users milestone",
      "Global education infrastructure",
    ],
    icon: Target,
    status: "planned",
  },
  {
    year: "2030-2040",
    title: "Lifelong Learning Platform",
    items: [
      "Continuing education and upskilling",
      "Professional certification programs",
      "Global alumni network (50M+)",
      "AI-powered career coaching",
      "The definitive global education platform",
    ],
    icon: Award,
    status: "vision",
  },
];

export default function VisionPage() {
  const { t } = useI18n();

  const competitiveAdvantages = [
    {
      title: t("vision.competitiveAdvantages"),
      description: "Every feature is built with AI at its core, not as an add-on. This gives us a fundamental advantage in personalization and accuracy.",
      icon: Brain,
    },
    {
      title: t("vision.competitiveAdvantages"),
      description: "From discovery to career — we cover every stage of the education journey. No competitor offers this comprehensive approach.",
      icon: Globe2,
    },
    {
      title: t("vision.competitiveAdvantages"),
      description: "More users → more data → better AI → more users. This flywheel creates an ever-widening moat that competitors cannot replicate.",
      icon: TrendingUp,
    },
    {
      title: t("vision.competitiveAdvantages"),
      description: "200+ countries, 50,000+ universities, 500,000+ scholarships. Our database scale is unmatched and growing daily.",
      icon: Globe,
    },
    {
      title: t("vision.competitiveAdvantages"),
      description: "12 languages with RTL support. We serve students in their native language, breaking down barriers to global education.",
      icon: Heart,
    },
    {
      title: t("vision.competitiveAdvantages"),
      description: "Every scholarship is verified by AI and human reviewers. Our verification system builds trust that competitors lack.",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
            <Rocket className="h-4 w-4" />
            {t("vision.title")}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {t("vision.subtitle")}
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8 leading-relaxed">
            {t("vision.joinJourneyDesc")}
          </p>
        </div>
      </section>

      {/* Tagline */}
      <section className="py-8 bg-gradient-to-r from-[var(--primary)] to-[var(--gradient-end)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-lg sm:text-xl lg:text-2xl font-semibold text-white">
            {t("vision.roadmap")}
          </p>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("vision.milestones")}</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              {t("vision.subtitle")}
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col sm:flex-row ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  } items-start gap-8`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full gradient-btn flex items-center justify-center z-10">
                    <milestone.icon className="h-4 w-4 text-white" />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pl-12 sm:pl-0 ${index % 2 === 0 ? "sm:pr-12" : "sm:pl-12"}`}>
                    <Card className="hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
                            {milestone.year}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            milestone.status === "in-progress"
                              ? "bg-green-500/10 text-green-500"
                              : milestone.status === "upcoming"
                              ? "bg-blue-500/10 text-blue-500"
                              : milestone.status === "vision"
                              ? "bg-purple-500/10 text-purple-500"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {milestone.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-3">{milestone.title}</h3>
                        <ul className="space-y-2">
                          {milestone.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-16 sm:py-20 bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("vision.competitiveAdvantages")}</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              {t("vision.joinJourneyDesc")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {competitiveAdvantages.map((advantage) => (
              <Card key={advantage.title} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-btn mb-4">
                    <advantage.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{advantage.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Target Users by 2030", value: "10M+", icon: Users },
              { label: "University Partners", value: "10,000+", icon: Building2 },
              { label: "Scholarship Database", value: "2M+", icon: BookOpen },
              { label: "Countries Covered", value: "200+", icon: Globe },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-xl bg-[var(--card)] border">
                <stat.icon className="h-8 w-8 text-[var(--primary)] mx-auto mb-3" />
                <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-[var(--muted-foreground)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[var(--primary)] to-[var(--gradient-end)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Join the Future of Education
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Be part of the revolution that's transforming how students worldwide
            discover, apply, and succeed in global education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-xl bg-white text-[var(--primary)] font-semibold hover:bg-white/90 transition-colors">
              {t("vision.joinJourney")}
            </button>
            <button className="px-8 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
              {t("vision.joinJourneyDesc")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
