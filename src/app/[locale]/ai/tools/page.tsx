"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import {
  Brain,
  FileText,
  Sparkles,
  ArrowRight,
  Zap,
  Search,
  Globe,
} from "lucide-react";

const aiTools = [
  {
    id: "matcher",
    icon: Brain,
    titleKey: "ai.tools.matcher.title",
    descKey: "ai.tools.matcher.description",
    featuresKey: "ai.tools.matcher.features",
    href: "/ai/matcher",
    color: "from-blue-500 to-purple-600",
    popular: true,
  },
  {
    id: "documents",
    icon: FileText,
    titleKey: "ai.tools.documents.title",
    descKey: "ai.tools.documents.description",
    featuresKey: "ai.tools.documents.features",
    href: "/ai/documents",
    color: "from-green-500 to-teal-600",
    popular: true,
  },
  {
    id: "search",
    icon: Sparkles,
    titleKey: "ai.search.title",
    descKey: "ai.search.description",
    featuresKey: "ai.search.title",
    href: "/ai-search",
    color: "from-purple-500 to-pink-600",
    popular: true,
  },
];

const toolDetails: Record<string, { title: string; description: string; features: string[] }> = {
  matcher: { title: "AI Scholarship Matcher", description: "Our advanced AI scans 500,000+ scholarships worldwide and ranks them by compatibility with your unique profile, academic record, and career goals.", features: ["Profile analysis", "95% match accuracy", "Real-time updates", "Personalized ranking"] },
  documents: { title: "AI Document Analyzer", description: "Upload your SOP, CV, or essays and get instant AI feedback on content, structure, grammar, and alignment with scholarship requirements.", features: ["Instant feedback", "Grammar check", "Content scoring", "Improvement suggestions"] },
  search: { title: "AI-Powered Search", description: "Ask our AI anything about scholarships, universities, and study abroad. Get personalized answers powered by DeepSeek AI.", features: ["Natural language search", "Personalized results", "Real-time answers", "Scholarship matching"] },
};

export default function AIToolsPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: t("ai.tools.categories.all") },
    { id: "matching", label: t("ai.tools.categories.matching") },
    { id: "documents", label: t("ai.tools.categories.documents") },
    { id: "analysis", label: t("ai.tools.categories.analysis") },
    { id: "planning", label: t("ai.tools.categories.planning") },
  ];

  const filteredTools = aiTools.filter((tool) => {
    const details = toolDetails[tool.id];
    const matchesSearch = details.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      details.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            {t("ai.tools.title")}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {t("ai.tools.title")}
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8 leading-relaxed">
            {t("ai.tools.subtitle")}
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("ai.tools.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredTools.map((tool) => {
              const details = toolDetails[tool.id];
              return (
                <Link key={tool.id} href={tool.href}>
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
                    {tool.popular && (
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        {t("ai.tools.popular")}
                      </div>
                    )}
                    <CardContent className="p-5 sm:p-6">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} mb-4 group-hover:scale-110 transition-transform`}>
                        <tool.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{details.title}</h3>
                      <p className="text-sm text-[var(--muted-foreground)] mb-4 leading-relaxed">{details.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {details.features.map((feature) => (
                          <span key={feature} className="px-2 py-1 rounded-full bg-muted text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-[var(--primary)] text-sm font-medium">
                        {t("ai.tools.tryNow")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How AI Works */}
      <section className="py-16 sm:py-20 bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("ai.tools.howItWorks")}</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              {t("ai.tools.howItWorksDesc")}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: "01", titleKey: "ai.tools.steps.dataCollection", descKey: "ai.tools.steps.dataCollectionDesc", icon: Search },
              { step: "02", titleKey: "ai.tools.steps.aiAnalysis", descKey: "ai.tools.steps.aiAnalysisDesc", icon: Brain },
              { step: "03", titleKey: "ai.tools.steps.smartMatching", descKey: "ai.tools.steps.smartMatchingDesc", icon: Sparkles },
            ].map((item) => (
              <div key={item.step} className="text-center p-6">
                <div className="text-3xl font-bold text-[var(--primary)] mb-3">{item.step}</div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-btn mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t(item.titleKey)}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { labelKey: "ai.tools.stats.scholarshipsAnalyzed", value: "500,000+", icon: Brain },
              { labelKey: "ai.tools.stats.successRate", value: "95%", icon: Sparkles },
              { labelKey: "ai.tools.stats.countriesCovered", value: "200+", icon: Globe },
            ].map((stat) => (
              <div key={stat.labelKey} className="text-center p-6 rounded-xl bg-[var(--card)] border">
                <stat.icon className="h-8 w-8 text-[var(--primary)] mx-auto mb-3" />
                <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-[var(--muted-foreground)]">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
