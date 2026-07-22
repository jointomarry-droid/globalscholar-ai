"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FlaskConical,
  Search,
  Users,
  Globe,
  BookOpen,
  ArrowRight,
  Target,
  Sparkles,
  TrendingUp,
  GraduationCap,
  FileText,
  Award,
  Lightbulb,
  Brain,
  BarChart3,
  Building2,
  MapPin,
  Calendar,
} from "lucide-react";

const researchAreas = [
  { name: "Artificial Intelligence", count: "12,500+", icon: Brain },
  { name: "Climate Change", count: "8,200+", icon: Globe },
  { name: "Healthcare", count: "15,300+", icon: Award },
  { name: "Sustainability", count: "9,800+", icon: Lightbulb },
  { name: "Data Science", count: "11,200+", icon: BarChart3 },
  { name: "Biotechnology", count: "7,600+", icon: FlaskConical },
  { name: "Renewable Energy", count: "6,400+", icon: Lightbulb },
  { name: "Quantum Computing", count: "3,200+", icon: Target },
];

const topSupervisors = [
  {
    name: "Prof. Sarah Chen",
    university: "MIT",
    field: "Artificial Intelligence",
    publications: 156,
    citations: 12400,
    country: "USA",
  },
  {
    name: "Prof. Hans Mueller",
    university: "ETH Zurich",
    field: "Renewable Energy",
    publications: 134,
    citations: 9800,
    country: "Switzerland",
  },
  {
    name: "Prof. Yuki Tanaka",
    university: "University of Tokyo",
    field: "Robotics",
    publications: 128,
    citations: 8900,
    country: "Japan",
  },
  {
    name: "Prof. Priya Sharma",
    university: "IISc Bangalore",
    field: "Biotechnology",
    publications: 112,
    citations: 7600,
    country: "India",
  },
];

const researchFunding = [
  {
    name: "Horizon Europe",
    amount: "€2-3.5M",
    deadline: "Rolling",
    field: "All Fields",
    type: "EU Grant",
  },
  {
    name: "Marie Skłodowska-Curie Actions",
    amount: "€3,400-5,000/month",
    deadline: "September 2025",
    field: "All Fields",
    type: "Mobility Grant",
  },
  {
    name: "ERC Starting Grant",
    amount: "€1.5M over 5 years",
    deadline: "October 2025",
    field: "All Fields",
    type: "Research Grant",
  },
  {
    name: "Newton Fund",
    amount: "Varies",
    deadline: "Rolling",
    field: "Development Research",
    type: "Bilateral Grant",
  },
];

export default function ResearchHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState("all");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-500 text-sm font-medium mb-4">
            <FlaskConical className="h-4 w-4" />
            Research Hub
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Discover Research
            <span className="gradient-text"> Opportunities Worldwide</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8 leading-relaxed">
            Find research supervisors, funding opportunities, and collaboration partners
            across 200+ countries. Powered by AI to match your research interests.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search research areas, supervisors, or funding..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button className="gradient-btn" size="lg">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Popular Research Areas</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Explore research opportunities across the most in-demand fields worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {researchAreas.map((area) => (
              <Card key={area.name} className="group hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-5 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-btn mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <area.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{area.name}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{area.count} opportunities</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Supervisors */}
      <section className="py-16 sm:py-20 bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Top Research Supervisors</h2>
              <p className="text-[var(--muted-foreground)]">
                Connect with leading researchers in your field.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/research/supervisors">
                View All <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topSupervisors.map((supervisor) => (
              <Card key={supervisor.name} className="hover:shadow-lg transition-all">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-btn text-white font-bold">
                      {supervisor.name.split(" ").slice(1).map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{supervisor.name}</h3>
                      <p className="text-xs text-[var(--muted-foreground)]">{supervisor.university}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {supervisor.country}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <FlaskConical className="h-3 w-3 text-muted-foreground" />
                      {supervisor.field}
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span>{supervisor.publications} publications</span>
                      <span>{supervisor.citations.toLocaleString()} citations</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-4">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Funding */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Research Funding Opportunities</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Discover grants, fellowships, and funding for your research projects.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {researchFunding.map((funding) => (
              <Card key={funding.name} className="hover:shadow-lg transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{funding.name}</h3>
                      <p className="text-sm text-[var(--muted-foreground)]">{funding.type}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {funding.field}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="text-sm font-semibold">{funding.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                      <p className="text-sm font-semibold">{funding.deadline}</p>
                    </div>
                  </div>
                  <Button size="sm" className="w-full gradient-btn">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Tools */}
      <section className="py-16 sm:py-20 bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">AI Research Tools</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Leverage our AI tools to accelerate your research journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Brain,
                title: "AI Research Matcher",
                description: "Find supervisors and labs that match your research interests",
                href: "/ai/research",
              },
              {
                icon: FileText,
                title: "Grant Proposal Writer",
                description: "AI-assisted writing for research grant proposals",
                href: "/ai/grant-writer",
              },
              {
                icon: BarChart3,
                title: "Publication Analyzer",
                description: "Analyze publication trends and find collaboration opportunities",
                href: "/ai/publications",
              },
            ].map((tool) => (
              <Link key={tool.title} href={tool.href}>
                <Card className="group hover:shadow-lg transition-all h-full">
                  <CardContent className="p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-btn mb-4 group-hover:scale-110 transition-transform">
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{tool.title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-4">{tool.description}</p>
                    <div className="flex items-center gap-1 text-[var(--primary)] text-sm font-medium">
                      Try Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
