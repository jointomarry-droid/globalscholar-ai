"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchBar } from "@/components/scholarship/search-bar";
import { useI18n } from "@/lib/i18n/context";
import {
  GraduationCap,
  Search,
  Sparkles,
  Globe,
  Users,
  Building2,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Shield,
  Star,
  Brain,
  FileText,
  Calendar,
  Lightbulb,
  Rocket,
  Target,
  Award,
  Globe2,
  FlaskConical,
  LineChart,
  Briefcase,
} from "lucide-react";

export default function HomePage() {
  const { t } = useI18n();

  const stats = [
    { label: t("home.stats.scholarships"), value: "500,000+", icon: BookOpen },
    { label: t("home.stats.universities"), value: "50,000+", icon: Building2 },
    { label: t("home.stats.countries"), value: "200+", icon: Globe },
    { label: t("home.stats.students"), value: "2M+", icon: Users },
  ];

  const features = [
    {
      icon: Sparkles,
      title: t("home.features.scholarshipMatch.title"),
      description: t("home.features.scholarshipMatch.description"),
    },
    {
      icon: Search,
      title: t("home.features.universitySearch.title"),
      description: t("home.features.universitySearch.description"),
    },
    {
      icon: Brain,
      title: t("ai.search.title"),
      description: t("ai.search.description"),
    },
    {
      icon: Calendar,
      title: t("home.features.deadlineTracker.title"),
      description: t("home.features.deadlineTracker.description"),
    },
    {
      icon: Shield,
      title: t("home.features.verifiedListings.title"),
      description: t("home.features.verifiedListings.description"),
    },
    {
      icon: FileText,
      title: t("home.features.documentBuilder.title"),
      description: t("home.features.documentBuilder.description"),
    },
  ];

  const aiTools = [
    {
      icon: Brain,
      title: t("nav.ai.matcher"),
      description: t("ai.matcher.subtitle"),
      href: "/ai/matcher",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: FileText,
      title: t("ai.documents.title"),
      description: t("ai.documents.description"),
      href: "/ai/documents",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: Target,
      title: t("ai.career.title"),
      description: t("ai.career.description"),
      href: "/ai/career",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: LineChart,
      title: t("ai.calculator.title"),
      description: t("ai.calculator.description"),
      href: "/ai/calculator",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: FlaskConical,
      title: t("ai.research.title"),
      description: t("ai.research.description"),
      href: "/ai/research",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Globe2,
      title: t("ai.universityPredictor.title"),
      description: t("ai.universityPredictor.description"),
      href: "/ai/university-predictor",
      color: "from-indigo-500 to-violet-600",
    },
  ];

  const testimonials = [
    {
      name: "Amara Okafor",
      country: "Nigeria",
      university: "MIT, USA",
      quote: "GlobalScholar AI found me a fully funded PhD position I never knew existed!",
      avatar: "AO",
    },
    {
      name: "Rahul Sharma",
      country: "India",
      university: "University of Berlin, Germany",
      quote: "I asked the AI assistant about scholarships without IELTS and it found 15 perfect matches!",
      avatar: "RS",
    },
    {
      name: "Fatima Al-Hassan",
      country: "Pakistan",
      university: "University of Toronto, Canada",
      quote: "The deadline tracker saved me from missing two application deadlines.",
      avatar: "FA",
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: t("home.howItWorks.step1.title"),
      description: t("home.howItWorks.step1.description"),
      icon: Users,
    },
    {
      step: 2,
      title: t("home.howItWorks.step2.title"),
      description: t("home.howItWorks.step2.description"),
      icon: Sparkles,
    },
    {
      step: 3,
      title: t("home.howItWorks.step3.title"),
      description: t("home.howItWorks.step3.description"),
      icon: FileText,
    },
    {
      step: 4,
      title: t("home.howItWorks.step4.title"),
      description: t("home.howItWorks.step4.description"),
      icon: TrendingUp,
    },
  ];

  const ecosystem = [
    { icon: GraduationCap, title: t("home.ecosystem.items.search.title"), description: t("home.ecosystem.items.search.description") },
    { icon: FileText, title: t("home.ecosystem.items.apply.title"), description: t("home.ecosystem.items.apply.description") },
    { icon: Globe2, title: t("home.ecosystem.items.visa.title"), description: t("home.ecosystem.items.visa.description") },
    { icon: Briefcase, title: t("home.ecosystem.items.career.title"), description: t("home.ecosystem.items.career.description") },
    { icon: FlaskConical, title: t("home.ecosystem.items.research.title"), description: t("home.ecosystem.items.research.description") },
    { icon: Building2, title: t("home.ecosystem.items.crm.title"), description: t("home.ecosystem.items.crm.description") },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--background)] py-16 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] sm:w-[800px] sm:h-[600px] bg-[var(--primary)]/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] text-sm font-medium mb-6 sm:mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            {t("nav.search")} {t("nav.scholarships")}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 animate-slide-up leading-tight">
            <span className="gradient-text">{t("home.hero.title")}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8 sm:mb-10 animate-slide-up leading-relaxed px-4">
            {t("home.hero.subtitle")}
          </p>

          <div className="animate-slide-up max-w-3xl mx-auto px-4">
            <SearchBar variant="hero" showFilters />
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mt-10 sm:mt-12 animate-fade-in">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-sm">
                <stat.icon className="h-4 w-4 text-[var(--primary)]" />
                <span className="font-semibold text-[var(--foreground)]">{stat.value}</span>
                <span className="text-[var(--muted-foreground)]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tagline Banner */}
      <section className="py-6 sm:py-8 bg-gradient-to-r from-[var(--primary)] to-[var(--gradient-end)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white tracking-wide">
            {t("home.hero.cta")}
          </p>
          <p className="text-sm sm:text-base text-white/80 mt-2">
            {t("home.hero.secondary")}
          </p>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
              <Lightbulb className="h-4 w-4" />
              {t("home.aiToolsBadge")}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              {t("home.features.title")}
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              {t("home.features.scholarshipMatch.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {aiTools.map((tool) => (
              <Link key={tool.title} href={tool.href}>
                <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-5 sm:p-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} mb-4 group-hover:scale-110 transition-transform`}>
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">{tool.title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{tool.description}</p>
                    <div className="flex items-center gap-1 mt-4 text-[var(--primary)] text-sm font-medium">
                      {t("scholarships.details.apply")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{t("home.features.title")}</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              {t("home.features.scholarshipMatch.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="group hover:shadow-lg transition-all">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-btn mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{t("home.howItWorks.title")}</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[var(--accent)] mx-auto mb-4">
                  <step.icon className="h-7 w-7 sm:h-8 sm:w-8 text-[var(--primary)]" />
                </div>
                <div className="text-xs font-bold text-[var(--primary)] mb-2">{step.step}</div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-16 sm:py-20 bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
              <Rocket className="h-4 w-4" />
              {t("home.ecosystem.title")}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{t("home.ecosystem.title")}</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ecosystem.map((item) => (
              <div key={item.title} className="text-center p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-btn mx-auto mb-3">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{t("nav.universities")}</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { name: "United States", flag: "🇺🇸", count: "45,000+" },
              { name: "United Kingdom", flag: "🇬🇧", count: "32,000+" },
              { name: "Germany", flag: "🇩🇪", count: "28,000+" },
              { name: "Canada", flag: "🇨🇦", count: "25,000+" },
              { name: "Australia", flag: "🇦🇺", count: "22,000+" },
              { name: "France", flag: "🇫🇷", count: "18,000+" },
              { name: "Netherlands", flag: "🇳🇱", count: "15,000+" },
              { name: "Japan", flag: "🇯🇵", count: "14,000+" },
              { name: "South Korea", flag: "🇰🇷", count: "12,000+" },
              { name: "Turkey", flag: "🇹🇷", count: "10,000+" },
              { name: "China", flag: "🇨🇳", count: "20,000+" },
              { name: "India", flag: "🇮🇳", count: "16,000+" },
            ].map((country) => (
              <Link
                key={country.name}
                href={`/countries/${country.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md transition-all group"
              >
                <span className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">{country.flag}</span>
                <span className="text-xs sm:text-sm font-medium text-center leading-tight">{country.name}</span>
                <span className="text-xs text-[var(--muted-foreground)]">{country.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{t("home.testimonials.title")}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="relative">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] mb-6 italic leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-btn text-white text-sm font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{testimonial.country} → {testimonial.university}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[var(--primary)] to-[var(--gradient-end)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {t("home.hero.title")}
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[var(--primary)] hover:bg-white/90">
              <Link href="/register">
                {t("nav.register")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/scholarships">
                {t("nav.scholarships")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
