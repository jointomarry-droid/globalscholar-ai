"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { Scholarship } from "@/types";
import {
  MapPin,
  Calendar,
  GraduationCap,
  Banknote,
  Clock,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface ScholarshipCardProps {
  scholarship: Scholarship;
  onSave?: (id: string) => void;
  saved?: boolean;
}

function getMatchColor(score: number): string {
  if (score >= 90) return "text-[var(--success)]";
  if (score >= 70) return "text-[var(--info)]";
  if (score >= 50) return "text-[var(--warning)]";
  return "text-[var(--destructive)]";
}

function getMatchLabel(score: number): string {
  if (score >= 90) return "Excellent Match";
  if (score >= 70) return "Good Match";
  if (score >= 50) return "Fair Match";
  return "Low Match";
}

function getFundingBadge(funding: string) {
  switch (funding) {
    case "fully_funded":
      return <Badge variant="success">Fully Funded</Badge>;
    case "partial":
      return <Badge variant="info">Partially Funded</Badge>;
    case "tuition_only":
      return <Badge variant="warning">Tuition Only</Badge>;
    default:
      return <Badge variant="secondary">{funding}</Badge>;
  }
}

function getDaysUntilDeadline(deadline: string): number {
  const now = new Date();
  const dl = new Date(deadline);
  const diff = Math.ceil((dl.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export function ScholarshipCard({ scholarship, onSave, saved }: ScholarshipCardProps) {
  const daysLeft = getDaysUntilDeadline(scholarship.deadline);
  const isUrgent = daysLeft <= 30 && daysLeft > 0;
  const isExpired = daysLeft <= 0;

  return (
    <Card className="group relative overflow-hidden">
      {/* Match Score Badge */}
      {scholarship.matchScore !== undefined && (
        <div className="absolute top-3 right-3 z-10">
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-[var(--background)] border border-[var(--border)] shadow-sm"
          )}>
            <Sparkles className={cn("h-3 w-3", getMatchColor(scholarship.matchScore))} />
            <span className={getMatchColor(scholarship.matchScore)}>
              {scholarship.matchScore}%
            </span>
          </div>
        </div>
      )}

      <CardContent className="p-5">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Link
              href={`/scholarships/${scholarship.slug}`}
              className="text-base font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors line-clamp-2"
            >
              {scholarship.title}
            </Link>
            <button
              onClick={() => onSave?.(scholarship.id)}
              className="shrink-0 p-1 rounded-lg hover:bg-[var(--accent)] transition-colors"
            >
              <Bookmark
                className={cn(
                  "h-4 w-4",
                  saved ? "fill-[var(--primary)] text-[var(--primary)]" : "text-[var(--muted-foreground)]"
                )}
              />
            </button>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] line-clamp-1">
            {scholarship.universityName}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {getFundingBadge(scholarship.funding)}
          <Badge variant="outline">{scholarship.degree}</Badge>
          {scholarship.verified && (
            <Badge variant="accent" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{scholarship.country}, {scholarship.city}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <GraduationCap className="h-3.5 w-3.5 shrink-0" />
            <span className="capitalize">{scholarship.field || "All Fields"}</span>
          </div>
          {scholarship.fundingAmount && (
            <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
              <Banknote className="h-3.5 w-3.5 shrink-0" />
              <span>{scholarship.fundingAmount}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-[var(--muted-foreground)]" />
            {isExpired ? (
              <span className="text-[var(--destructive)] font-medium">Expired</span>
            ) : isUrgent ? (
              <span className="text-[var(--warning)] font-medium">
                {daysLeft} days left — Urgent!
              </span>
            ) : (
              <span className="text-[var(--muted-foreground)]">
                Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* AI Summary */}
        {scholarship.aiSummary && (
          <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 mb-4 italic">
            &ldquo;{scholarship.aiSummary}&rdquo;
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/scholarships/${scholarship.slug}`}>
              View Details
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href={scholarship.applicationUrl} target="_blank" rel="noopener noreferrer">
              Apply <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
