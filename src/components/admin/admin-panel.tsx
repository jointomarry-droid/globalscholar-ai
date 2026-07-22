"use client";

import { useState, useEffect } from "react";
import { useAuthStore, useUIStore } from "@/store";
import {
  Shield,
  X,
  Users,
  GraduationCap,
  Building2,
  BarChart3,
  Download,
  Settings,
  LogOut,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = "overview" | "users" | "scholarships" | "universities" | "analytics" | "import" | "settings";

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { user, login, logout } = useAuthStore();
  const { addToast } = useUIStore();

  useEffect(() => {
    if (user && (user.role === "admin" || user.role === "super_admin")) {
      setIsAuthenticated(true);
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter both email and password");
      return;
    }

    try {
      await login(loginEmail, loginPassword);

      const currentUser = useAuthStore.getState().user;
      if (currentUser && (currentUser.role === "admin" || currentUser.role === "super_admin")) {
        setIsAuthenticated(true);
        addToast({ type: "success", title: "Admin access granted" });
      } else {
        setLoginError("You do not have admin privileges");
      }
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginEmail("");
    setLoginPassword("");
    setActiveTab("overview");
  };

  if (!isOpen) return null;

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "users", label: "Users", icon: <Users className="h-4 w-4" /> },
    { id: "scholarships", label: "Scholarships", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "universities", label: "Universities", icon: <Building2 className="h-4 w-4" /> },
    { id: "analytics", label: "Analytics", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "import", label: "Import", icon: <Download className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl bg-background border-l shadow-2xl animate-slide-in-right">
        {!isAuthenticated ? (
          /* Login Form */
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Admin Access</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-8">
              <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Admin Login</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter your admin credentials
                  </p>
                </div>

                {loginError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
                    {loginError}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@globalscholar.ai"
                    className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg gradient-btn text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Sign In
                </button>

                <p className="text-xs text-center text-muted-foreground">
                  Demo: admin@globalscholar.ai / admin123
                </p>
              </form>
            </div>
          </div>
        ) : (
          /* Admin Dashboard */
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Admin Dashboard</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "overview" && <OverviewTab />}
              {activeTab === "users" && <UsersTab />}
              {activeTab === "scholarships" && <ScholarshipsTab />}
              {activeTab === "universities" && <UniversitiesTab />}
              {activeTab === "analytics" && <AnalyticsTab />}
              {activeTab === "import" && <ImportTab />}
              {activeTab === "settings" && <SettingsTab />}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function OverviewTab() {
  const stats = [
    { label: "Total Users", value: "12,458", change: "+12%", icon: <Users className="h-5 w-5" /> },
    { label: "Scholarships", value: "2,847", change: "+5%", icon: <GraduationCap className="h-5 w-5" /> },
    { label: "Universities", value: "156", change: "+3%", icon: <Building2 className="h-5 w-5" /> },
    { label: "Applications", value: "8,923", change: "+18%", icon: <CheckCircle className="h-5 w-5" /> },
  ];

  const recentActivity = [
    { user: "John Smith", action: "Applied to MIT Scholarship", time: "2 min ago" },
    { user: "Maria Garcia", action: "Registered for account", time: "5 min ago" },
    { user: "Ahmed Khan", action: "Updated profile", time: "10 min ago" },
    { user: "Yuki Tanaka", action: "Submitted application", time: "15 min ago" },
    { user: "Sophie Martin", action: "Downloaded guide", time: "20 min ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border bg-card">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{stat.icon}</span>
              <span className="text-xs text-green-500 font-medium">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-3">Recent Activity</h3>
        <div className="space-y-2">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {activity.user.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.user}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsersTab() {
  const users = [
    { id: 1, name: "John Smith", email: "john@example.com", role: "student", status: "active" },
    { id: 2, name: "Maria Garcia", email: "maria@example.com", role: "student", status: "active" },
    { id: 3, name: "Ahmed Khan", email: "ahmed@example.com", role: "consultant", status: "active" },
    { id: 4, name: "Admin User", email: "admin@globalscholar.ai", role: "super_admin", status: "active" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">User Management</h3>
        <button className="px-3 py-1.5 rounded-lg text-sm gradient-btn text-white">
          Add User
        </button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Email</th>
              <th className="text-left p-3 font-medium">Role</th>
              <th className="text-left p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3 text-muted-foreground">{user.email}</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                    {user.role}
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScholarshipsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Scholarship Management</h3>
        <button className="px-3 py-1.5 rounded-lg text-sm gradient-btn text-white">
          Add Scholarship
        </button>
      </div>
      <div className="p-8 text-center text-muted-foreground">
        <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>Manage scholarships from the Scholarships section</p>
      </div>
    </div>
  );
}

function UniversitiesTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">University Management</h3>
        <button className="px-3 py-1.5 rounded-lg text-sm gradient-btn text-white">
          Add University
        </button>
      </div>
      <div className="p-8 text-center text-muted-foreground">
        <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>Manage universities from the Universities section</p>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Analytics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border bg-card">
          <p className="text-sm text-muted-foreground">Page Views</p>
          <p className="text-2xl font-bold">45,230</p>
        </div>
        <div className="p-4 rounded-xl border bg-card">
          <p className="text-sm text-muted-foreground">Unique Visitors</p>
          <p className="text-2xl font-bold">12,450</p>
        </div>
        <div className="p-4 rounded-xl border bg-card">
          <p className="text-sm text-muted-foreground">Avg. Session</p>
          <p className="text-2xl font-bold">4:32</p>
        </div>
        <div className="p-4 rounded-xl border bg-card">
          <p className="text-sm text-muted-foreground">Bounce Rate</p>
          <p className="text-2xl font-bold">32%</p>
        </div>
      </div>
    </div>
  );
}

function ImportTab() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Data Import</h3>
      <div className="border-2 border-dashed rounded-xl p-8 text-center">
        <Download className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop files here or click to browse
        </p>
        <button className="px-4 py-2 rounded-lg text-sm gradient-btn text-white">
          Select Files
        </button>
      </div>
      <div className="text-sm text-muted-foreground">
        <p className="font-medium mb-2">Supported formats:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>CSV - Scholarship data</li>
          <li>JSON - University data</li>
          <li>XLSX - User data</li>
        </ul>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl border">
          <div>
            <p className="font-medium">Maintenance Mode</p>
            <p className="text-sm text-muted-foreground">Enable site maintenance mode</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl border">
          <div>
            <p className="font-medium">Email Notifications</p>
            <p className="text-sm text-muted-foreground">Send email notifications to users</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl border">
          <div>
            <p className="font-medium">Auto-approve Scholarships</p>
            <p className="text-sm text-muted-foreground">Automatically approve new scholarship submissions</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
