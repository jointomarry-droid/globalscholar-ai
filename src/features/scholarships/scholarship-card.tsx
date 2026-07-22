"use client";

import Link from "next/link";
import { Scholarship } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import {
  MapPin,
  GraduationCap,
  Clock,
  DollarSign,
  Bookmark,
  ExternalLink,
  Sparkles,
  Building2,
} from "lucide-react";

interface ScholarshipCardProps {
  scholarship: Scholarship;
  variant?: "grid" | "list";
}

function getFundingBadge(funding: string) {
  switch (funding) {
    case "fully_funded":
      return <Badge variant="success">Fully Funded</Badge>;
    case "partial":
      return <Badge variant="info">Partial Funding</Badge>;
    case "tuition_only":
      return <Badge variant="warning">Tuition Only</Badge>;
    case "stipend":
      return <Badge variant="accent">Stipend</Badge>;
    default:
      return <Badge variant="outline">{funding}</Badge>;
  }
}

function getDaysUntilDeadline(deadline: string) {
  const days = Math.ceil(
    (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  return days;
}

export function ScholarshipCard({ scholarship, variant = "grid" }: ScholarshipCardProps) {
  const daysLeft = getDaysUntilDeadline(scholarship.deadline);
  const isUrgent = daysLeft <= 30 && daysLeft > 0;
  const isExpired = daysLeft <= 0;

  return (
    <Card
      className={cn(
        "group relative",
        variant === "list" && "flex flex-col md:flex-row",
        isExpired && "opacity-60"
      )}
    >
      <CardContent className={cn("p-5", variant === "list" && "flex-1")}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-xs">
                {scholarship.degree.replace("_", " ")}
              </Badge>
              {getFundingBadge(scholarship.funding)}
              {scholarship.matchScore && (
                <Badge variant="default" className="text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {scholarship.matchScore}%
                </Badge>
              )}
            </div>
            <Link
              href={`/scholarships/${scholarship.slug}`}
              className="text-base font-semibold hover:text-[var(--primary)] transition-colors line-clamp-2"
            >
              {scholarship.title}
            </Link>
          </div>
          <button className="shrink-0 p-1.5 rounded-lg hover:bg-[var(--accent)] transition-colors">
            <Bookmark className="h-4 w-4 text-[var(--muted-foreground)]" />
          </button>
        </div>

        <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-3">
          {scholarship.aiSummary || scholarship.description}
        </p>

        <div className="flex flex-wrap gap-3 text-xs text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            {scholarship.universityName}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {scholarship.city}, {scholarship.country}
          </span>
          {scholarship.fundingAmount && (
            <span className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {scholarship.fundingAmount}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {isExpired ? (
              <span className="text-red-500">Expired</span>
            ) : isUrgent ? (
              <span className="text-orange-500">{daysLeft} days left</span>
            ) : (
              <span>{daysLeft} days left</span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/scholarships/${scholarship.slug}`}>
              View Details
            </Link>
          </Button>
          {scholarship.applicationUrl && (
            <Button asChild variant="outline" size="sm">
              <a
                href={scholarship.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
