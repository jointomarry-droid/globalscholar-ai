"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  GraduationCap,
  TrendingUp,
  Loader2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe,
  DollarSign,
  BarChart3,
} from "lucide-react";

interface CareerResult {
  career: string;
  matchScore: number;
  salary_range: string;
  growth_rate: string;
  required_skills: string[];
  recommended_courses: string[];
  top_countries: string[];
  description: string;
}

export default function AICareerPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CareerResult[]>([]);
  const [form, setForm] = useState({
    field: "",
    degree: "",
    interests: "",
    skills: "",
    preferred_countries: "",
  });

  const handleAnalyze = async () => {
    if (!form.field) return;
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setResults([
      {
        career: "Software Engineer",
        matchScore: 95,
        salary_range: "$80,000 - $150,000",
        growth_rate: "25% (Much faster than average)",
        required_skills: ["Programming", "Data Structures", "System Design", "Problem Solving"],
        recommended_courses: ["M.Sc. Computer Science", "M.Sc. Software Engineering", "M.Sc. Data Science"],
        top_countries: ["United States", "Canada", "Germany", "United Kingdom"],
        description: "Design, develop, and maintain software systems. Work with cutting-edge technologies and collaborate with global teams.",
      },
      {
        career: "Data Scientist",
        matchScore: 88,
        salary_range: "$70,000 - $130,000",
        growth_rate: "36% (Much faster than average)",
        required_skills: ["Machine Learning", "Statistics", "Python", "Data Visualization"],
        recommended_courses: ["M.Sc. Data Science", "M.Sc. Machine Learning", "M.Sc. Statistics"],
        top_countries: ["United States", "United Kingdom", "Canada", "Singapore"],
        description: "Analyze complex data sets to help organizations make data-driven decisions using statistical methods and AI.",
      },
      {
        career: "Research Scientist",
        matchScore: 82,
        salary_range: "$60,000 - $120,000",
        growth_rate: "8% (Faster than average)",
        required_skills: ["Research Methodology", "Critical Thinking", "Technical Writing", "Domain Expertise"],
        recommended_courses: ["PhD in relevant field", "M.Sc. Research Methods", "Postdoctoral Research"],
        top_countries: ["Germany", "United States", "Switzerland", "Japan"],
        description: "Conduct original research, publish papers, and advance knowledge in your field of expertise.",
      },
      {
        career: "Product Manager",
        matchScore: 78,
        salary_range: "$90,000 - $160,000",
        growth_rate: "12% (Faster than average)",
        required_skills: ["Strategic Thinking", "Communication", "Data Analysis", "Leadership"],
        recommended_courses: ["MBA", "M.Sc. Product Management", "M.Sc. Business Analytics"],
        top_countries: ["United States", "United Kingdom", "Canada", "Australia"],
        description: "Lead product development from conception to launch, working cross-functionally with engineering, design, and business teams.",
      },
    ]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-600/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
            <Briefcase className="h-4 w-4" />
            AI Career Predictor
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            AI Career <span className="gradient-text">Predictor</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
            Discover career paths that match your education, skills, and interests.
            Get personalized recommendations for courses and countries.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Form */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Tell us about yourself
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Field of Study *</label>
                  <Input
                    value={form.field}
                    onChange={(e) => setForm({ ...form, field: e.target.value })}
                    placeholder="e.g. Computer Science"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Degree Level</label>
                  <select
                    value={form.degree}
                    onChange={(e) => setForm({ ...form, degree: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select degree</option>
                    <option value="bachelors">Bachelor's</option>
                    <option value="masters">Master's</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">Career Interests</label>
                  <input
                    type="text"
                    placeholder="e.g. AI, renewable energy, healthcare"
                    value={form.interests}
                    onChange={(e) => setForm({ ...form, interests: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">Skills</label>
                  <input
                    type="text"
                    placeholder="e.g. Python, research, communication"
                    value={form.skills}
                    onChange={(e) => setForm({ ...form, skills: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!form.field || loading}
                className="w-full mt-6 gradient-btn"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing your profile...
                  </>
                ) : (
                  <>
                    <Briefcase className="h-5 w-5 mr-2" />
                    Predict My Career Path
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Your Career Matches
              </h2>

              {results.map((career, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{career.career}</h3>
                        <p className="text-sm text-[var(--muted-foreground)]">{career.description}</p>
                      </div>
                      <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-lg shrink-0">
                        <TrendingUp className="h-5 w-5" />
                        {career.matchScore}%
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-xs text-[var(--muted-foreground)]">Salary Range</p>
                          <p className="font-medium">{career.salary_range}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <BarChart3 className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-xs text-[var(--muted-foreground)]">Job Growth</p>
                          <p className="font-medium">{career.growth_rate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="text-xs text-[var(--muted-foreground)]">Top Countries</p>
                          <p className="font-medium">{career.top_countries.slice(0, 2).join(", ")}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-[var(--muted-foreground)] mb-2">Required Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {career.required_skills.map((skill, i) => (
                            <Badge key={i} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[var(--muted-foreground)] mb-2">Recommended Courses</p>
                        <div className="flex flex-wrap gap-2">
                          {career.recommended_courses.map((course, i) => (
                            <Badge key={i} className="bg-primary/10 text-primary">{course}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <a href={`/scholarships?field=${encodeURIComponent(form.field)}`}>
                        <Button size="sm" variant="outline">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          Find Scholarships
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </a>
                      <a href={`/ai/matcher`}>
                        <Button size="sm" className="gradient-btn">
                          <Sparkles className="h-4 w-4 mr-2" />
                          AI Matcher
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
