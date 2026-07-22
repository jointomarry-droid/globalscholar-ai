"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "./theme-provider";
import { useAuthStore, useUIStore } from "@/store";
import { cn } from "@/lib/utils/cn";
import { NotificationBell } from "@/features/notifications";
import { LanguageSelector } from "@/components/language-selector";
import {
  GraduationCap,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogIn,
  Globe,
  Sparkles,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  { label: "Scholarships", href: "/scholarships" },
  { label: "Universities", href: "/universities" },
  { label: "AI Tools", href: "/ai/tools" },
  { label: "Research", href: "/research" },
  { label: "FAQs", href: "/faqs" },
];

const universityLinks = [
  { label: "Vanderbilt University", href: "/universities/vanderbilt" },
];

const toolLinks = [
  { label: "AI Scholarship Matcher", href: "/ai/matcher" },
  { label: "AI Document Analyzer", href: "/ai/documents" },
  { label: "AI Career Predictor", href: "/ai/career" },
  { label: "AI Success Calculator", href: "/ai/calculator" },
  { label: "AI Research Matcher", href: "/ai/research" },
  { label: "Visa Guide", href: "/visa" },
  { label: "Cost of Living", href: "/cost-of-living" },
  { label: "Rankings", href: "/rankings" },
  { label: "Courses", href: "/courses" },
  { label: "IELTS/TOEFL", href: "/ielts-toefl" },
  { label: "Tuition Fees", href: "/tuition" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { user, logout } = useAuthStore();
  const { addToast } = useUIStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    addToast({ type: "success", title: "Signed out successfully" });
    router.push("/");
    setUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-[var(--glass-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-btn">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:block">
              GlobalScholar AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] rounded-lg transition-colors"
              >
                Tools
                <ChevronDown className="h-3 w-3" />
              </button>
              {toolsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setToolsOpen(false)} />
                  <div className="absolute left-0 top-full mt-1 w-48 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-lg z-50 animate-fade-in p-1">
                    {toolLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setToolsOpen(false)}
                        className="block px-3 py-2 text-sm rounded-lg hover:bg-[var(--accent)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* AI Search Toggle */}
            <Link
              href="/ai-search"
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--primary)] bg-[var(--accent)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden lg:inline">AI Search</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[var(--accent)] transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4 text-[var(--muted-foreground)]" />
              ) : (
                <Moon className="h-4 w-4 text-[var(--muted-foreground)]" />
              )}
            </button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Notifications */}
            {user && <NotificationBell />}

            {/* Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-[var(--accent)] transition-colors"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full gradient-btn">
                    <span className="text-xs font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:inline">{user.name}</span>
                  <ChevronDown className="h-3 w-3 text-[var(--muted-foreground)]" />
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-lg z-50 animate-fade-in">
                      <div className="p-3 border-b border-[var(--border)]">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{user.email}</p>
                      </div>
                      <div className="p-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-[var(--accent)] transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                        {(user.role === "admin" || user.role === "super_admin") && (
                          <Link
                            href="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-[var(--accent)] transition-colors"
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-[var(--accent)] text-red-600 transition-colors w-full"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent)] rounded-lg transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white gradient-btn rounded-lg"
                >
                  <User className="h-4 w-4" />
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg hover:bg-[var(--accent)] transition-colors"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--background)] animate-fade-in">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-[var(--accent)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-[var(--border)] pt-2 mt-2">
              <p className="px-3 py-1 text-xs font-medium text-[var(--muted-foreground)]">Tools</p>
              {toolLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-[var(--accent)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-[var(--border)] pt-2 mt-2">
              {user ? (
                <>
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-[var(--accent)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-[var(--accent)] text-red-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-[var(--accent)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 text-sm font-medium text-white gradient-btn rounded-lg text-center mt-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
