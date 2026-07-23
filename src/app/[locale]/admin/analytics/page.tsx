"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import {
  Users,
  BookOpen,
  Building2,
  FileText,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Search,
  Download,
} from "lucide-react";

const overviewStats = [
  { label: "Total Users", value: "12,450", change: "+12.5%", positive: true, icon: Users },
  { label: "Scholarships", value: "45,230", change: "+8.2%", positive: true, icon: BookOpen },
  { label: "Applications", value: "8,900", change: "+22.1%", positive: true, icon: FileText },
  { label: "Universities", value: "1,250", change: "+15.3%", positive: true, icon: Building2 },
];

const topScholarships = [
  { title: "Erasmus Mundus", views: 12500, applications: 890, country: "Germany" },
  { title: "Chevening Scholarship", views: 9800, applications: 720, country: "UK" },
  { title: "Fulbright Program", views: 8200, applications: 650, country: "USA" },
  { title: "DAAD Scholarship", views: 7100, applications: 540, country: "Germany" },
  { title: "Australia Awards", views: 5600, applications: 420, country: "Australia" },
];

const topCountries = [
  { name: "Pakistan", flag: "🇵🇰", users: 3200, applications: 1800 },
  { name: "India", flag: "🇮🇳", users: 2800, applications: 1500 },
  { name: "Nigeria", flag: "🇳🇬", users: 2100, applications: 1200 },
  { name: "Bangladesh", flag: "🇧🇩", users: 1800, applications: 950 },
  { name: "Turkey", flag: "🇹🇷", users: 1200, applications: 780 },
];

const recentActivity = [
  { type: "user", message: "New university verified: Seoul National University", time: "5 min ago" },
  { type: "import", message: "Batch import completed: 250 scholarships", time: "1 hour ago" },
  { type: "scholarship", message: "New scholarship: Gates Cambridge 2026", time: "2 hours ago" },
  { type: "alert", message: "8 scholarships expiring this week", time: "3 hours ago" },
];

export default function AdminAnalyticsPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-lg font-bold">Analytics Dashboard</h1>
          <p className="text-xs text-[var(--muted-foreground)]">Platform performance and insights</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {overviewStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-[var(--muted-foreground)]" />
                  <span className={`flex items-center gap-1 text-xs font-medium ${
                    stat.positive ? "text-[var(--success)]" : "text-[var(--destructive)]"
                  }`}>
                    {stat.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top Scholarships */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Scholarships by Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topScholarships.map((s, i) => (
                  <div key={s.title} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primary)] text-white text-xs font-bold">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{s.title}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{s.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{s.views.toLocaleString()}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">views</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Countries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Countries by Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCountries.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <span className="text-lg">{c.flag}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{c.users.toLocaleString()} users</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{c.applications.toLocaleString()}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">applications</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Placeholder */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-[var(--secondary)] rounded-lg">
                <p className="text-sm text-[var(--muted-foreground)]">Chart: User growth over time</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Application Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-[var(--secondary)] rounded-lg">
                <p className="text-sm text-[var(--muted-foreground)]">Chart: Applications over time</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--accent)] transition-colors">
                  <div className={`h-2 w-2 rounded-full ${
                    activity.type === "user" ? "bg-blue-500" :
                    activity.type === "import" ? "bg-green-500" :
                    activity.type === "scholarship" ? "bg-purple-500" :
                    "bg-orange-500"
                  }`} />
                  <p className="text-sm flex-1">{activity.message}</p>
                  <span className="text-xs text-[var(--muted-foreground)]">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
