"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Loader2,
  BookOpen,
  Target,
} from "lucide-react";

interface Application {
  id: string;
  scholarship_name: string;
  status: string;
  deadline: string;
  submitted_at: string;
}

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/applications");
        const data = await response.json();
        if (data.success && data.data) {
          setApplications(data.data);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Applications",
      value: applications.length,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Pending Review",
      value: applications.filter((a) => a.status === "pending").length,
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      title: "Accepted",
      value: applications.filter((a) => a.status === "accepted").length,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      title: "Upcoming Deadlines",
      value: applications.filter((a) => {
        const deadline = new Date(a.deadline);
        const now = new Date();
        const diff = deadline.getTime() - now.getTime();
        return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
      }).length,
      icon: AlertCircle,
      color: "text-orange-500",
    },
  ];

  const quickActions = [
    { title: "Find Scholarships", description: "Browse thousands of scholarships", href: "/scholarships", icon: GraduationCap },
    { title: "AI Scholarship Matcher", description: "Get personalized matches", href: "/ai/matcher", icon: Sparkles },
    { title: "AI Document Assistant", description: "Generate SOPs, LORs, CVs", href: "/ai/documents", icon: FileText },
    { title: "AI Search", description: "Ask our AI advisor anything", href: "/ai-search", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-[var(--muted-foreground)]">
            Track your scholarship applications and progress.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--muted-foreground)]">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <Card className="hover:shadow-lg transition-all h-full cursor-pointer group">
                  <CardContent className="p-5">
                    <action.icon className="h-8 w-8 text-[var(--primary)] mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-1">{action.title}</h3>
                    <p className="text-xs text-[var(--muted-foreground)]">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Applications</CardTitle>
              {applications.length > 0 && (
                <Link href="/scholarships">
                  <Button variant="ghost" size="sm">
                    Browse More <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-[var(--primary)]" />
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-[var(--muted-foreground)] mx-auto mb-4" />
                <p className="text-[var(--muted-foreground)] mb-4">No applications yet</p>
                <Link href="/scholarships">
                  <Button className="gradient-btn">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Find Scholarships
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.slice(0, 5).map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">{app.scholarship_name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        Deadline: {new Date(app.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={
                        app.status === "accepted" ? "success" :
                        app.status === "rejected" ? "destructive" :
                        app.status === "submitted" ? "info" : "outline"
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}