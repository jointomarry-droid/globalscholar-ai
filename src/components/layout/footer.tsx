"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, GitBranch, MessageCircle, Link2, Mail, Heart, Shield } from "lucide-react";
import { AdminPanel } from "@/components/admin/admin-panel";
import { useI18n } from "@/lib/i18n/context";

export function Footer() {
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const { t } = useI18n();

  const footerLinks = {
    platform: [
      { label: t("footer.platform.scholarshipSearch"), href: "/scholarships" },
      { label: t("footer.platform.universityDirectory"), href: "/universities" },
      { label: t("footer.platform.aiTools"), href: "/ai/tools" },
      { label: t("footer.platform.researchHub"), href: "/research" },
      { label: t("footer.platform.rankings"), href: "/rankings" },
    ],
    resources: [
      { label: t("footer.resources.aiMatcher"), href: "/ai/matcher" },
      { label: t("footer.resources.aiDocuments"), href: "/ai/documents" },
      { label: t("footer.resources.aiCareer"), href: "/ai/career" },
      { label: t("footer.resources.visaGuide"), href: "/visa" },
      { label: t("footer.resources.faqs"), href: "/faqs" },
    ],
    countries: [
      { label: t("footer.countries.us"), href: "/countries/united-states" },
      { label: t("footer.countries.uk"), href: "/countries/united-kingdom" },
      { label: t("footer.countries.germany"), href: "/countries/germany" },
      { label: t("footer.countries.canada"), href: "/countries/canada" },
      { label: t("footer.countries.australia"), href: "/countries/australia" },
    ],
    company: [
      { label: t("footer.company.about"), href: "/about" },
      { label: t("footer.company.vision"), href: "/vision" },
      { label: t("footer.company.contact"), href: "/contact" },
      { label: t("footer.company.privacy"), href: "/privacy" },
      { label: t("footer.company.terms"), href: "/terms" },
    ],
  };

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
                {t("footer.aboutText")}
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
              {t("footer.copyright")}
            </p>
            <div className="flex items-center gap-4">
              <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                {t("footer.madeWith")} <Heart className="h-3 w-3 text-red-500 fill-red-500" /> {t("footer.forStudents")}
              </p>
              <button
                onClick={() => setAdminPanelOpen(true)}
                className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                title={t("footer.admin")}
              >
                <Shield className="h-3 w-3" />
                {t("footer.admin")}
              </button>
            </div>
          </div>
        </div>
      </footer>

      <AdminPanel isOpen={adminPanelOpen} onClose={() => setAdminPanelOpen(false)} />
    </>
  );
}
