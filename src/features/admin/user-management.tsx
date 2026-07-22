"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/shared";
import {
  Users,
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  XCircle,
  Mail,
  MoreHorizontal,
} from "lucide-react";

const mockUsers = [
  { id: "1", name: "Amara Okafor", email: "amara@example.com", role: "student", country: "Nigeria", joined: "2025-12-01", status: "active", applications: 3 },
  { id: "2", name: "Hans Mueller", email: "hans@example.com", role: "student", country: "Germany", joined: "2025-11-15", status: "active", applications: 5 },
  { id: "3", name: "Priya Sharma", email: "priya@example.com", role: "student", country: "India", joined: "2025-12-10", status: "active", applications: 2 },
  { id: "4", name: "Juan Garcia", email: "juan@example.com", role: "university", country: "Spain", joined: "2025-10-20", status: "active", applications: 0 },
  { id: "5", name: "Fatima Al-Rashid", email: "fatima@example.com", role: "student", country: "Jordan", joined: "2025-12-05", status: "pending", applications: 1 },
  { id: "6", name: "Chen Wei", email: "chen@example.com", role: "organization", country: "China", joined: "2025-11-01", status: "active", applications: 0 },
];

const roleColors = {
  student: "info",
  university: "accent",
  organization: "warning",
  admin: "destructive",
  super_admin: "destructive",
} as const;

export function UserManagement() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">User Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Users className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <SearchInput
          placeholder="Search users..."
          onSearch={setSearch}
          className="flex-1 max-w-sm"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="text-sm border border-[var(--input)] rounded-lg px-3 py-2 bg-[var(--background)]"
        >
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="university">Universities</option>
          <option value="organization">Organizations</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{mockUsers.length}</p>
            <p className="text-xs text-[var(--muted-foreground)]">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[var(--primary)]">{mockUsers.filter((u) => u.role === "student").length}</p>
            <p className="text-xs text-[var(--muted-foreground)]">Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[var(--success)]">{mockUsers.filter((u) => u.role === "university").length}</p>
            <p className="text-xs text-[var(--muted-foreground)]">Universities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[var(--warning)]">{mockUsers.filter((u) => u.status === "pending").length}</p>
            <p className="text-xs text-[var(--muted-foreground)]">Pending</p>
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
                  <th className="text-left p-4 text-sm font-medium text-[var(--muted-foreground)]">User</th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--muted-foreground)]">Role</th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--muted-foreground)]">Country</th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--muted-foreground)]">Joined</th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--muted-foreground)]">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-[var(--muted-foreground)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--accent)]">
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{user.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={roleColors[user.role as keyof typeof roleColors] || "outline"}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm">{user.country}</td>
                    <td className="p-4 text-sm text-[var(--muted-foreground)]">
                      {new Date(user.joined).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Badge variant={user.status === "active" ? "success" : "warning"}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4" />
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
