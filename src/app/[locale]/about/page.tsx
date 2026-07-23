import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  GraduationCap,
  Globe,
  Sparkles,
  Users,
  Target,
  Shield,
  Heart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const values = [
  {
    icon: Globe,
    title: "Global Access",
    description: "Connecting students with scholarships from 200+ countries across 50,000+ universities worldwide.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Matching",
    description: "Our intelligent algorithms match you with the best opportunities based on your unique profile.",
  },
  {
    icon: Shield,
    title: "Verified & Trusted",
    description: "Every scholarship is verified by our team to ensure authenticity and up-to-date information.",
  },
  {
    icon: Heart,
    title: "Student-First",
    description: "Built by educators and technologists who understand the challenges of financing education.",
  },
];

const stats = [
  { value: "500K+", label: "Scholarships" },
  { value: "50K+", label: "Universities" },
  { value: "200+", label: "Countries" },
  { value: "2M+", label: "Students Helped" },
];

const team = [
  { name: "Dr. Sarah Chen", role: "CEO & Co-Founder", bio: "Former education policy advisor with 15 years in international education." },
  { name: "James Okonkwo", role: "CTO & Co-Founder", bio: "AI researcher passionate about using technology to democratize education." },
  { name: "Maria Rodriguez", role: "Head of Scholarships", bio: "Former Fulbright scholar with expertise in global scholarship programs." },
  { name: "Alex Kim", role: "Head of Engineering", bio: "Full-stack engineer building scalable platforms for education access." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-btn mx-auto mb-6">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Making Global Education{" "}
              <span className="gradient-text">Accessible to Everyone</span>
            </h1>
            <p className="text-lg text-[var(--muted-foreground)]">
              GlobalScholar AI is on a mission to bridge the information gap in international
              education funding. We believe every student deserves access to the best
              scholarship opportunities, regardless of their background.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-[var(--muted-foreground)] mb-4">
              Every year, millions of scholarships go unfilled simply because students
              don&apos;t know they exist. The scholarship discovery process is fragmented,
              outdated, and often biased toward well-connected students.
            </p>
            <p className="text-[var(--muted-foreground)] mb-6">
              We&apos;re changing that with AI-powered matching that connects students with
              opportunities they never knew existed. Our platform aggregates data from
              governments, universities, and organizations worldwide, then uses intelligent
              algorithms to surface the most relevant scholarships for each student.
            </p>
            <div className="space-y-3">
              {[
                "Aggregate scholarships from 200+ countries",
                "AI-powered personalized matching",
                "Real-time deadline tracking and alerts",
                "Free essay assistance and application guidance",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[var(--success)]" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl gradient-btn/10 flex items-center justify-center">
              <Globe className="h-48 w-48 text-[var(--primary)] opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--card)] border-y border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Everything we build is guided by our commitment to making education accessible
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-btn mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            A diverse team of educators, engineers, and scholarship experts
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <Card key={member.name}>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full gradient-btn mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-[var(--primary)] mb-2">{member.role}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-indigo-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Scholarship?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join over 2 million students who have discovered their perfect scholarship through
            GlobalScholar AI
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-[var(--primary)] hover:bg-white/90">
              <Link href="/register">
                Get Started Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/scholarships">Browse Scholarships</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
