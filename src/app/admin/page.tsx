"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthGuard } from "@/features/auth";
import { UserManagement, ScholarshipManagement } from "@/features/admin";
import {
  Users,
  BookOpen,
  Building2,
  BarChart3,
  Settings,
  FileText,
  Upload,
  Bell,
  Search,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  LayoutDashboard,
  GraduationCap,
  Globe,
  Shield,
  Sparkles,
} from "lucide-react";

const stats = [
  { label: "Total Users", value: "12,450", change: "+12%", icon: Users, color: "text-[var(--primary)]" },
  { label: "Scholarships", value: "45,230", change: "+8%", icon: BookOpen, color: "text-[var(--success)]" },
  { label: "Universities", value: "1,250", change: "+15%", icon: Building2, color: "text-[var(--info)]" },
  { label: "Applications", value: "8,900", change: "+22%", icon: FileText, color: "text-[var(--warning)]" },
];

const recentActivity = [
  { type: "user", message: "New student registered: Amara Okafor", time: "2 min ago" },
  { type: "scholarship", message: "New scholarship added: DAAD 2026", time: "15 min ago" },
  { type: "university", message: "University verified: TU Munich", time: "1 hour ago" },
  { type: "import", message: "Import completed: 150 scholarships from CSV", time: "2 hours ago" },
  { type: "alert", message: "12 scholarships expiring this week", time: "3 hours ago" },
];

const pendingApprovals = [
  { type: "University", name: "Seoul National University", country: "South Korea", status: "pending" },
  { type: "Scholarship", name: "Gates Cambridge Scholarship", country: "United Kingdom", status: "pending" },
  { type: "Organization", name: "Fulbright Commission", country: "United States", status: "pending" },
];

function AdminContent() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "scholarships" | "universities" | "settings">("overview");

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Sidebar Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-btn">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Admin Dashboard</h1>
                <p className="text-xs text-[var(--muted-foreground)]">GlobalScholar AI Management</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
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
            { id: "users" as const, label: "Users", icon: Users },
            { id: "scholarships" as const, label: "Scholarships", icon: BookOpen },
            { id: "universities" as const, label: "Universities", icon: Building2 },
            { id: "settings" as const, label: "Settings", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
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
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[var(--muted-foreground)]">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-[var(--success)] flex items-center gap-1 mt-1">
                          <TrendingUp className="h-3 w-3" />
                          {stat.change} this month
                        </p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--accent)] transition-colors">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${
                            activity.type === "user" ? "bg-blue-100 text-blue-600" :
                            activity.type === "scholarship" ? "bg-green-100 text-green-600" :
                            activity.type === "university" ? "bg-purple-100 text-purple-600" :
                            activity.type === "import" ? "bg-orange-100 text-orange-600" :
                            "bg-red-100 text-red-600"
                          }`}>
                            {activity.type === "user" ? <Users className="h-4 w-4" /> :
                             activity.type === "scholarship" ? <BookOpen className="h-4 w-4" /> :
                             activity.type === "university" ? <Building2 className="h-4 w-4" /> :
                             activity.type === "import" ? <Upload className="h-4 w-4" /> :
                             <AlertCircle className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{activity.message}</p>
                            <p className="text-xs text-[var(--muted-foreground)]">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pending Approvals */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Pending Approvals
                      <Badge variant="warning">{pendingApprovals.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pendingApprovals.map((item, i) => (
                        <div key={i} className="p-3 rounded-lg border border-[var(--border)]">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{item.type}</Badge>
                            <span className="text-xs text-[var(--muted-foreground)]">{item.country}</span>
                          </div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="success" className="h-7 text-xs">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" className="h-7 text-xs">
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights */}
                <Card className="mt-4 border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/5 to-transparent">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-[var(--primary)] mt-0.5 shrink-0" />
                      <div>
                        <h3 className="text-sm font-semibold mb-1">AI Insights</h3>
                        <ul className="text-xs text-[var(--muted-foreground)] space-y-1">
                          <li>- User growth up 12% this month</li>
                          <li>- 85% of users complete their profile</li>
                          <li>- Average match score: 78%</li>
                          <li>- 23% application conversion rate</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { label: "Add Scholarship", icon: BookOpen, href: "/admin/scholarships/new" },
                        { label: "Import Data", icon: Upload, href: "/admin/import" },
                        { label: "View Analytics", icon: BarChart3, href: "/admin/analytics" },
                      ].map((action) => (
                        <Button key={action.label} asChild variant="ghost" className="w-full justify-start">
                          <a href={action.href}>
                            <action.icon className="h-4 w-4 mr-2 text-[var(--primary)]" />
                            {action.label}
                            <ArrowUpRight className="h-3 w-3 ml-auto text-[var(--muted-foreground)]" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && <UserManagement />}
        {activeTab === "scholarships" && <ScholarshipManagement />}

        {activeTab === "universities" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">University Management</h2>
              <Button>
                <Building2 className="h-4 w-4 mr-2" />
                Add University
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-[var(--muted-foreground)]">
                  University verification, profile management, and analytics.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">System Settings</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Configure AI providers, models, and prompts.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Search Engine</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Meilisearch index settings and synonyms.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Manage notification email templates.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Global SEO configuration and sitemap.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AuthGuard requiredRole={["admin", "super_admin"]}>
      <AdminContent />
    </AuthGuard>
  );
}
