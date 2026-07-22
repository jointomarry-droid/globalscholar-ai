"use client";

import { useEffect, useCallback, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useScholarshipStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingPage } from "@/components/shared";
import { cn } from "@/lib/utils/cn";
import {
  MapPin,
  GraduationCap,
  Clock,
  DollarSign,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building2,
  Globe,
  ArrowLeft,
  Share2,
  Sparkles,
} from "lucide-react";

export function ScholarshipDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { currentScholarship, isLoading, error, fetchScholarshipBySlug } = useScholarshipStore();

  useEffect(() => {
    if (slug) fetchScholarshipBySlug(slug);
  }, [slug, fetchScholarshipBySlug]);

  if (isLoading) return <LoadingPage />;
  if (error || !currentScholarship) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="h-12 w-12 text-[var(--muted-foreground)] mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Scholarship Not Found</h2>
        <p className="text-[var(--muted-foreground)] mb-4">{error || "This scholarship doesn't exist."}</p>
        <Button asChild>
          <Link href="/scholarships">Browse Scholarships</Link>
        </Button>
      </div>
    );
  }

  const s = currentScholarship;
  const [now] = useState(() => Date.now());
  const daysLeft = Math.ceil((new Date(s.deadline).getTime() - now) / (1000 * 60 * 60 * 24));

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back */}
      <Link href="/scholarships" className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Scholarships
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="secondary">{s.degree.replace("_", " ")}</Badge>
              <Badge variant="success">{s.funding.replace("_", " ")}</Badge>
              {s.verified && <Badge variant="info">Verified</Badge>}
            </div>
            <h1 className="text-2xl font-bold mb-2">{s.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)]">
              <span className="flex items-center gap-1"><Building2 className="h-4 w-4" />{s.universityName}</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{s.city}, {s.country}</span>
              <span className="flex items-center gap-1"><Globe className="h-4 w-4" />{s.field}</span>
            </div>
          </div>

          {/* AI Summary */}
          {s.aiSummary && (
            <Card className="border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/5 to-transparent">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-[var(--primary)] mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold mb-1">AI Summary</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">{s.aiSummary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          <Card>
            <CardHeader><CardTitle>About This Scholarship</CardTitle></CardHeader>
            <CardContent>
              <p className="text-[var(--muted-foreground)] whitespace-pre-line">{s.description}</p>
            </CardContent>
          </Card>

          {/* Benefits */}
          {s.benefits.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Benefits</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {s.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-[var(--success)] mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Documents Required */}
          {s.documentsRequired.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Documents Required</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {s.documentsRequired.map((d, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-[var(--muted-foreground)]" />
                      {d}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Eligibility */}
          {s.eligibility.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Eligibility Criteria</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {s.eligibility.map((rule, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-[var(--primary)] shrink-0" />
                      {rule.field} {rule.operator} {String(rule.value)}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="sticky top-24">
            <CardContent className="p-5 space-y-4">
              {/* Deadline */}
              <div className={cn(
                "p-4 rounded-lg text-center",
                daysLeft <= 30 ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"
              )}>
                <Clock className={cn("h-6 w-6 mx-auto mb-2", daysLeft <= 30 ? "text-red-500" : "text-green-600")} />
                <p className="text-sm font-medium">
                  {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Deadline: {new Date(s.deadline).toLocaleDateString()}
                </p>
              </div>

              {/* Actions */}
              <Button className="w-full" size="lg" disabled={daysLeft <= 0}>
                Apply Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" className="w-full">
                <Bookmark className="h-4 w-4 mr-2" />
                Save Scholarship
              </Button>
              <Button variant="ghost" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>

              {/* Quick Info */}
              <div className="border-t border-[var(--border)] pt-4 space-y-3">
                {s.fundingAmount && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">Funding Amount</span>
                    <span className="font-medium">{s.fundingAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Degree Level</span>
                  <span className="font-medium capitalize">{s.degree.replace("_", " ")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Field</span>
                  <span className="font-medium">{s.field}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Renewable</span>
                  <span className="font-medium">{s.renewable ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">International</span>
                  <span className="font-medium">{s.internationalStudents ? "Yes" : "No"}</span>
                </div>
              </div>

              {/* Tags */}
              {s.tags.length > 0 && (
                <div className="border-t border-[var(--border)] pt-4">
                  <p className="text-xs font-medium text-[var(--muted-foreground)] mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {s.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
