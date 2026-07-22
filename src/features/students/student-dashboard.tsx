"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore, useUIStore } from "@/store";
import { AuthGuard } from "@/features/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import {
  User,
  BookOpen,
  Bookmark,
  FileText,
  Calendar,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Settings,
  LogOut,
  BarChart3,
} from "lucide-react";

const dashboardStats = [
  { label: "Profile Strength", value: "72%", icon: User, color: "text-[var(--primary)]" },
  { label: "Saved Scholarships", value: "12", icon: Bookmark, color: "text-[var(--success)]" },
  { label: "Applications", value: "5", icon: FileText, color: "text-[var(--info)]" },
  { label: "Match Score Avg", value: "85%", icon: TrendingUp, color: "text-[var(--warning)]" },
];

const recentApplications = [
  {
    id: "1",
    title: "Erasmus Mundus Joint Master",
    university: "European University Consortium",
    status: "submitted",
    submittedAt: "2025-12-15",
    matchScore: 95,
  },
  {
    id: "2",
    title: "Chevening Scholarship",
    university: "UK Government",
    status: "draft",
    matchScore: 88,
  },
  {
    id: "3",
    title: "DAAD Development Scholarship",
    university: "DAAD / German Universities",
    status: "under_review",
    submittedAt: "2025-12-10",
    matchScore: 82,
  },
];

const upcomingDeadlines = [
  { title: "Fulbright Foreign Student", deadline: "2026-02-15", daysLeft: 25 },
  { title: "Australia Awards", deadline: "2026-04-30", daysLeft: 99 },
  { title: "MEXT Scholarship", deadline: "2026-04-15", daysLeft: 84 },
];

const aiSuggestions = [
  "Complete your profile to improve match scores by up to 30%",
  "You haven't explored scholarships in Canada yet — 25,000+ available",
  "Consider applying to the DAAD scholarship — 82% match with your profile",
  "Upload your transcript to unlock more accurate matching",
];

function getStatusBadge(status: string) {
  switch (status) {
    case "submitted":
      return <Badge variant="info">Submitted</Badge>;
    case "under_review":
      return <Badge variant="warning">Under Review</Badge>;
    case "accepted":
      return <Badge variant="success">Accepted</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    case "draft":
      return <Badge variant="secondary">Draft</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function DashboardContent() {
  const { user, logout } = useAuthStore();
  const { addToast } = useUIStore();
  const [activeTab, setActiveTab] = useState<"overview" | "applications" | "saved" | "settings">("overview");

  const handleLogout = async () => {
    await logout();
    addToast({ type: "success", title: "Signed out" });
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user?.name || "Student"}!</h1>
              <p className="text-[var(--muted-foreground)]">
                Here&apos;s what&apos;s happening with your scholarship journey.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-[var(--border)]">
          {[
            { id: "overview" as const, label: "Overview", icon: BarChart3 },
            { id: "applications" as const, label: "Applications", icon: FileText },
            { id: "saved" as const, label: "Saved", icon: Bookmark },
            { id: "settings" as const, label: "Profile", icon: User },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardStats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[var(--muted-foreground)]">{stat.label}</p>
                        <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
                      </div>
                      <stat.icon className={cn("h-8 w-8", stat.color)} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Applications */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Recent Applications
                      <Link href="/dashboard/applications" className="text-sm text-[var(--primary)] hover:underline">
                        View all
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentApplications.map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--accent)] transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{app.title}</p>
                            <p className="text-xs text-[var(--muted-foreground)]">{app.university}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-[var(--primary)]">
                              {app.matchScore}%
                            </span>
                            {getStatusBadge(app.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Deadlines */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingDeadlines.map((dl) => (
                        <div
                          key={dl.title}
                          className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)]"
                        >
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-lg",
                              dl.daysLeft <= 30
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            )}
                          >
                            <Clock className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{dl.title}</p>
                            <p className="text-xs text-[var(--muted-foreground)]">
                              {dl.daysLeft} days left
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* AI Suggestions */}
            <Card className="border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[var(--primary)]" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]"
                    >
                      <Sparkles className="h-4 w-4 text-[var(--primary)] mt-0.5 shrink-0" />
                      <p className="text-sm">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/ai-search">
                <Card className="hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <Sparkles className="h-8 w-8 text-[var(--primary)] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-1">AI Scholarship Search</h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Ask in natural language
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/scholarships">
                <Card className="hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-8 w-8 text-[var(--primary)] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-1">Browse Scholarships</h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Explore 500,000+ opportunities
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/ai">
                <Card className="hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <FileText className="h-8 w-8 text-[var(--primary)] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-1">AI Essay Assistant</h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Write SOPs & cover letters
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Applications</h2>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                New Application
              </Button>
            </div>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <Card key={app.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{app.title}</h3>
                        <p className="text-sm text-[var(--muted-foreground)]">{app.university}</p>
                        {app.submittedAt && (
                          <p className="text-xs text-[var(--muted-foreground)] mt-1">
                            Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-[var(--primary)]">
                          {app.matchScore}%
                        </span>
                        {getStatusBadge(app.status)}
                        <Button variant="outline" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div className="text-center py-12">
            <Bookmark className="h-12 w-12 text-[var(--muted-foreground)] mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Saved Scholarships</h2>
            <p className="text-[var(--muted-foreground)] mb-6">
              Browse scholarships and save the ones you&apos;re interested in.
            </p>
            <Button asChild>
              <Link href="/scholarships">
                Browse Scholarships
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name?.split(" ")[0] || ""}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name?.split(" ")[1] || ""}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email || ""}
                      disabled
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--accent)] opacity-60"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Education Level</label>
                    <select className="w-full mt-1 px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)]">
                      <option>Bachelor&apos;s</option>
                      <option>Master&apos;s</option>
                      <option>PhD</option>
                    </select>
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export function StudentDashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
