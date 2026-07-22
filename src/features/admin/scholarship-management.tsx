"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/shared";
import {
  BookOpen,
  Plus,
  Upload,
  Download,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

const mockScholarships = [
  { id: "1", title: "Erasmus Mundus Joint Master", country: "Germany", funding: "fully_funded", deadline: "2026-03-15", status: "verified", applications: 245 },
  { id: "2", title: "Chevening Scholarship", country: "UK", funding: "fully_funded", deadline: "2026-02-01", status: "verified", applications: 892 },
  { id: "3", title: "DAAD Development Scholarship", country: "Germany", funding: "fully_funded", deadline: "2026-04-30", status: "verified", applications: 156 },
  { id: "4", title: "Fulbright Foreign Student", country: "USA", funding: "fully_funded", deadline: "2026-02-15", status: "verified", applications: 1200 },
  { id: "5", title: "Australia Awards", country: "Australia", funding: "fully_funded", deadline: "2026-04-30", status: "pending", applications: 0 },
  { id: "6", title: "MEXT Scholarship", country: "Japan", funding: "fully_funded", deadline: "2026-04-15", status: "verified", applications: 340 },
];

const fundingColors = {
  fully_funded: "success",
  partial: "info",
  tuition_only: "warning",
  stipend: "accent",
  none: "outline",
} as const;

export function ScholarshipManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockScholarships.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.country.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Scholarship Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Scholarship
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <SearchInput
          placeholder="Search scholarships..."
          onSearch={setSearch}
          className="flex-1 max-w-sm"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-[var(--input)] rounded-lg px-3 py-2 bg-[var(--background)]"
        >
          <option value="all">All Status</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{mockScholarships.length}</p>
            <p className="text-xs text-[var(--muted-foreground)]">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[var(--success)]">{mockScholarships.filter((s) => s.status === "verified").length}</p>
            <p className="text-xs text-[var(--muted-foreground)]">Verified</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[var(--warning)]">{mockScholarships.filter((s) => s.status === "pending").length}</p>
            <p className="text-xs text-[var(--muted-foreground)]">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[var(--info)]">{mockScholarships.reduce((acc, s) => acc + s.applications, 0).toLocaleString()}</p>
            <p className="text-xs text-[var(--muted-foreground)]">Applications</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-4 text-sm font-medium text-[var(--muted-foreground)]">Scholarship</th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--muted-foreground)]">Country</th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--muted-foreground)]">Funding</th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--muted-foreground)]">Deadline</th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--muted-foreground)]">Applications</th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--muted-foreground)]">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-[var(--muted-foreground)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--accent)]">
                    <td className="p-4">
                      <p className="text-sm font-medium">{s.title}</p>
                    </td>
                    <td className="p-4 text-sm">{s.country}</td>
                    <td className="p-4">
                      <Badge variant={fundingColors[s.funding as keyof typeof fundingColors] || "outline"}>
                        {s.funding.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-[var(--muted-foreground)]">
                      {new Date(s.deadline).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm font-medium">{s.applications.toLocaleString()}</td>
                    <td className="p-4">
                      <Badge variant={s.status === "verified" ? "success" : "warning"}>
                        {s.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <Link href={`/scholarships/${s.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
