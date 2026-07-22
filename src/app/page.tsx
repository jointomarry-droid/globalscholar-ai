"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchBar } from "@/components/scholarship/search-bar";
import {
  GraduationCap,
  Search,
  Sparkles,
  Globe,
  Users,
  Building2,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Shield,
  Zap,
  Heart,
  Star,
  MapPin,
  GraduationCap as Cap,
  Brain,
  FileText,
  Calendar,
  Bell,
  BarChart3,
  Lightbulb,
  Rocket,
  Target,
  Award,
  Globe2,
  BookMarked,
  FlaskConical,
  LineChart,
  Briefcase,
  Compass,
} from "lucide-react";

const stats = [
  { label: "Scholarships", value: "500,000+", icon: BookOpen },
  { label: "Universities", value: "50,000+", icon: Building2 },
  { label: "Countries", value: "200+", icon: Globe },
  { label: "Students Helped", value: "2M+", icon: Users },
];

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Matching",
    description: "Our AI analyzes your profile and finds scholarships that match your unique qualifications with up to 95% accuracy.",
  },
  {
    icon: Search,
    title: "Natural Language Search",
    description: "Ask in plain English: 'I'm from Pakistan with 3.6 CGPA, want fully funded Master's in Germany without IELTS.'",
  },
  {
    icon: Brain,
    title: "AI Essay Assistant",
    description: "Get help writing SOPs, cover letters, and essays tailored to each scholarship application.",
  },
  {
    icon: Calendar,
    title: "Smart Deadline Tracker",
    description: "Never miss a deadline with intelligent reminders and a visual calendar of all your applications.",
  },
  {
    icon: Shield,
    title: "Verified Listings",
    description: "Every scholarship is verified by our team and AI system to ensure accuracy and legitimacy.",
  },
  {
    icon: FileText,
    title: "Document Builder",
    description: "AI-powered resume builder and document checklist generator for each scholarship application.",
  },
];

const aiTools = [
  {
    icon: Brain,
    title: "AI Scholarship Matcher",
    description: "Our AI scans 500,000+ scholarships and ranks them by compatibility with your profile, academic record, and career goals.",
    href: "/ai/matcher",
    color: "from-blue-500 to-purple-600",
  },
  {
    icon: FileText,
    title: "AI Document Analyzer",
    description: "Upload your SOP, CV, or essays and get instant AI feedback on content, structure, grammar, and scholarship alignment.",
    href: "/ai/documents",
    color: "from-green-500 to-teal-600",
  },
  {
    icon: Target,
    title: "AI Career Predictor",
    description: "Based on your field of study and scholarship choices, predict your career trajectory and earning potential worldwide.",
    href: "/ai/career",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: LineChart,
    title: "AI Success Calculator",
    description: "Calculate your chances of getting selected for specific scholarships based on historical data and competitor analysis.",
    href: "/ai/calculator",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: FlaskConical,
    title: "AI Research Matcher",
    description: "Find research supervisors, labs, and funding opportunities that align with your research interests and methodology.",
    href: "/ai/research",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Globe2,
    title: "AI University Predictor",
    description: "Get AI-predicted acceptance rates, program rankings, and scholarship availability for universities worldwide.",
    href: "/ai/university-predictor",
    color: "from-indigo-500 to-violet-600",
  },
];

const testimonials = [
  {
    name: "Amara Okafor",
    country: "Nigeria",
    university: "MIT, USA",
    quote: "GlobalScholar AI found me a fully funded PhD position I never knew existed. The AI matching was incredibly accurate!",
    avatar: "AO",
  },
  {
    name: "Rahul Sharma",
    country: "India",
    university: "University of Berlin, Germany",
    quote: "I asked the AI assistant about scholarships without IELTS and it found 15 perfect matches. Now I'm studying in Berlin!",
    avatar: "RS",
  },
  {
    name: "Fatima Al-Hassan",
    country: "Pakistan",
    university: "University of Toronto, Canada",
    quote: "The deadline tracker saved me from missing two application deadlines. This platform is a game-changer.",
    avatar: "FA",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Create Your Profile",
    description: "Tell us about your education, goals, and preferences. Our AI uses this to find the best matches.",
    icon: Users,
  },
  {
    step: 2,
    title: "AI Finds Matches",
    description: "Our algorithm scans 500,000+ scholarships and ranks them by compatibility with your profile.",
    icon: Sparkles,
  },
  {
    step: 3,
    title: "Apply with Confidence",
    description: "Use our AI tools to write essays, build resumes, and submit applications — all in one place.",
    icon: FileText,
  },
  {
    step: 4,
    title: "Track & Succeed",
    description: "Monitor your applications, get deadline reminders, and celebrate when you receive offers.",
    icon: TrendingUp,
  },
];

const ecosystem = [
  {
    icon: GraduationCap,
    title: "GlobalScholar Search",
    description: "AI-powered scholarship discovery across 200+ countries",
  },
  {
    icon: FileText,
    title: "GlobalScholar Apply",
    description: "Streamlined application portal with AI document builder",
  },
  {
    icon: Globe2,
    title: "GlobalScholar Visa",
    description: "Visa guidance and document preparation assistance",
  },
  {
    icon: Briefcase,
    title: "GlobalScholar Career",
    description: "Career counseling and job placement support",
  },
  {
    icon: FlaskConical,
    title: "GlobalScholar Research",
    description: "Research collaboration and funding opportunities",
  },
  {
    icon: Building2,
    title: "GlobalScholar CRM",
    description: "University and consultant management platform",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--background)] py-16 sm:py-20 lg:py-28">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] sm:w-[800px] sm:h-[600px] bg-[var(--primary)]/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] text-sm font-medium mb-6 sm:mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            AI-Powered Scholarship Discovery
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 animate-slide-up leading-tight">
            <span className="gradient-text">Your Intelligent Gateway</span>
            <br className="hidden sm:block" />
            <span className="text-[var(--foreground)]"> to Global Education</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8 sm:mb-10 animate-slide-up leading-relaxed px-4">
            Discover 500,000+ scholarships from 50,000+ universities across 200+ countries.
            Our AI finds the perfect match for your unique profile.
          </p>

          {/* Search Bar */}
          <div className="animate-slide-up max-w-3xl mx-auto px-4">
            <SearchBar variant="hero" showFilters />
          </div>

          {/* Quick Stats */}
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
            From Admission to Global Career
          </p>
          <p className="text-sm sm:text-base text-white/80 mt-2">
            Your Global Education Journey, Powered by AI
          </p>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
              <Lightbulb className="h-4 w-4" />
              AI-Powered Tools
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Intelligent Tools for Your Success
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Our AI doesn't just find scholarships — it analyzes, predicts, and guides you
              through every step of your education journey.
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
                      Try Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              From discovering scholarships to submitting applications, our AI-powered platform
              handles every step of your educational journey.
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">How GlobalScholar AI Works</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Four simple steps to find and apply for your dream scholarship.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[var(--accent)] mx-auto mb-4">
                  <step.icon className="h-7 w-7 sm:h-8 sm:w-8 text-[var(--primary)]" />
                </div>
                <div className="text-xs font-bold text-[var(--primary)] mb-2">
                  STEP {step.step}
                </div>
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
              Complete Ecosystem
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              The AI-Powered Global Education Ecosystem
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              From first discovery to lifelong career success — one platform for every stage
              of your global education journey.
            </p>
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Study in Your Dream Country</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Explore scholarships from over 200 countries and territories worldwide.
            </p>
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
                <span className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {country.flag}
                </span>
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Join thousands of students who found their dream scholarships through GlobalScholar AI.
            </p>
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
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {testimonial.country} → {testimonial.university}
                      </p>
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
            Ready to Find Your Dream Scholarship?
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join 2M+ students who are already using GlobalScholar AI to discover
            and apply for scholarships worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[var(--primary)] hover:bg-white/90">
              <Link href="/register">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/scholarships">
                Browse Scholarships
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
