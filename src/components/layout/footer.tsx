"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, GitBranch, MessageCircle, Link2, Mail, Heart, Shield } from "lucide-react";
import { AdminPanel } from "@/components/admin/admin-panel";

const footerLinks = {
  platform: [
    { label: "Scholarship Search", href: "/scholarships" },
    { label: "University Directory", href: "/universities" },
    { label: "AI Tools", href: "/ai/tools" },
    { label: "Research Hub", href: "/research" },
    { label: "Rankings", href: "/rankings" },
  ],
  resources: [
    { label: "AI Scholarship Matcher", href: "/ai/matcher" },
    { label: "AI Document Analyzer", href: "/ai/documents" },
    { label: "AI Career Predictor", href: "/ai/career" },
    { label: "Visa Guide", href: "/visa" },
    { label: "FAQs", href: "/faqs" },
  ],
  countries: [
    { label: "United States", href: "/countries/united-states" },
    { label: "United Kingdom", href: "/countries/united-kingdom" },
    { label: "Germany", href: "/countries/germany" },
    { label: "Canada", href: "/countries/canada" },
    { label: "Australia", href: "/countries/australia" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Vision", href: "/vision" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Top Section */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-btn">
                  <GraduationCap className="h-4 w-4 text-white" />
                </div>
                <span className="text-base font-bold gradient-text">GlobalScholar AI</span>
              </Link>
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                Empowering the next generation of global learners through artificial intelligence.
              </p>
              <div className="flex gap-3">
                {[GitBranch, MessageCircle, Link2, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[var(--accent)] transition-colors"
                  >
                    <Icon className="h-4 w-4 text-[var(--muted-foreground)]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 capitalize">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[var(--muted-foreground)]">
              &copy; {new Date().getFullYear()} GlobalScholar AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for students worldwide
              </p>
              <button
                onClick={() => setAdminPanelOpen(true)}
                className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                title="Admin Panel"
              >
                <Shield className="h-3 w-3" />
                Admin
              </button>
            </div>
          </div>
        </div>
      </footer>

      <AdminPanel isOpen={adminPanelOpen} onClose={() => setAdminPanelOpen(false)} />
    </>
  );
}
