"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Search,
  Star,
  Users,
  ExternalLink,
  GraduationCap,
  Clock,
  Filter,
  AlertCircle,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  provider: string;
  university: string;
  country: string;
  field: string;
  level: string;
  duration: string;
  price: string;
  rating: number;
  enrolledStudents: number;
  certificate: boolean;
  description: string;
  url: string;
  skills: string[];
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [providerFilter, setProviderFilter] = useState("");
  const [fieldFilter, setFieldFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  useEffect(() => {
    fetchCourses();
  }, [providerFilter, fieldFilter, levelFilter]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (providerFilter) params.set("provider", providerFilter);
      if (fieldFilter) params.set("field", fieldFilter);
      if (levelFilter) params.set("level", levelFilter);
      params.set("limit", "50");

      const res = await fetch(`/api/courses?${params.toString()}`);
      const data = await res.json();
      if (data.success) setCourses(data.data);
    } catch {
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.university.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const formatStudents = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return String(n);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge variant="info" className="mb-4">
            <BookOpen className="h-3 w-3 mr-1" />
            Coursera + edX + FutureLearn
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Online <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Browse courses from the world&apos;s top universities on Coursera, edX, and FutureLearn.
            Upskill with certificates from Harvard, Stanford, MIT, and more.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses, skills, universities..."
                className="pl-10"
              />
            </div>
          </div>
          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
          >
            <option value="">All Platforms</option>
            <option value="coursera">Coursera</option>
            <option value="edx">edX</option>
            <option value="futurelearn">FutureLearn</option>
          </select>
          <select
            value={fieldFilter}
            onChange={(e) => setFieldFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
          >
            <option value="">All Fields</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Data Science">Data Science</option>
            <option value="Business">Business</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { name: "Coursera", count: courses.filter((c) => c.provider === "coursera").length, color: "bg-blue-500" },
            { name: "edX", count: courses.filter((c) => c.provider === "edx").length, color: "bg-red-500" },
            { name: "FutureLearn", count: courses.filter((c) => c.provider === "futurelearn").length, color: "bg-green-500" },
          ].map((p) => (
            <Card key={p.name}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${p.color}`} />
                <div>
                  <p className="font-medium text-sm">{p.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{p.count} courses</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6 h-64" />
                </Card>
              ))
            : filtered.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-all group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge
                        variant={
                          course.provider === "coursera"
                            ? "info"
                            : course.provider === "edx"
                            ? "warning"
                            : "success"
                        }
                      >
                        {course.provider}
                      </Badge>
                      {course.certificate && (
                        <Badge variant="outline">
                          <GraduationCap className="h-3 w-3 mr-1" />
                          Certificate
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-3">{course.university}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mb-4 line-clamp-2">{course.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-yellow-600">
                          <Star className="h-3 w-3" />
                          {course.rating}
                        </span>
                        <span className="flex items-center gap-1 text-[var(--muted-foreground)]">
                          <Users className="h-3 w-3" />
                          {formatStudents(course.enrolledStudents)}
                        </span>
                        <span className="flex items-center gap-1 text-[var(--muted-foreground)]">
                          <Clock className="h-3 w-3" />
                          {course.duration}
                        </span>
                      </div>
                      <span className="font-medium text-sm">{course.price}</span>
                    </div>

                    <Button asChild className="w-full mt-4" variant="outline" size="sm">
                      <a href={course.url} target="_blank" rel="noopener noreferrer">
                        View Course <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          {error && !loading && (
            <Card className="md:col-span-2 lg:col-span-3 border-[var(--destructive)]/20">
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-8 w-8 text-[var(--destructive)] mx-auto mb-2" />
                <p className="text-sm text-[var(--destructive)]">{error}</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => { setError(null); fetchCourses(); }}>
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
