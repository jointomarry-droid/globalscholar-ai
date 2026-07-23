"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  DollarSign,
  Globe,
  Clock,
  Calendar,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  BookOpen,
  Users,
} from "lucide-react";

interface Scholarship {
  id: string;
  name: string;
  slug: string;
  description: string;
  amount: string;
  deadline: string;
  country: string;
  university: string;
  field: string;
  degree_level: string;
  requirements: string[];
  eligibility: string[];
  application_url: string;
  fully_funded: boolean;
  ielts_required: boolean;
  gre_required: boolean;
}

export default function ScholarshipDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const response = await fetch(`/api/scholarships/${slug}`);
        const data = await response.json();
        if (data.success && data.data) {
          setScholarship(data.data);
        } else {
          setError("Scholarship not found");
        }
      } catch {
        setError("Failed to load scholarship");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchScholarship();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (error || !scholarship) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h1 className="text-2xl font-bold">{error || "Scholarship not found"}</h1>
        <Link href="/scholarships">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scholarships
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link href="/scholarships" className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Scholarships
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {scholarship.fully_funded && (
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Fully Funded</Badge>
            )}
            <Badge variant="outline">{scholarship.degree_level}</Badge>
            <Badge variant="outline">{scholarship.field}</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{scholarship.name}</h1>
          <p className="text-lg text-[var(--muted-foreground)]">{scholarship.description}</p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-[var(--primary)] mx-auto mb-2" />
              <p className="text-xs text-[var(--muted-foreground)]">Amount</p>
              <p className="font-semibold text-sm">{scholarship.amount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <p className="text-xs text-[var(--muted-foreground)]">Deadline</p>
              <p className="font-semibold text-sm">{scholarship.deadline}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Globe className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-xs text-[var(--muted-foreground)]">Country</p>
              <p className="font-semibold text-sm">{scholarship.country}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <GraduationCap className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <p className="text-xs text-[var(--muted-foreground)]">University</p>
              <p className="font-semibold text-sm">{scholarship.university}</p>
            </CardContent>
          </Card>
        </div>

        {/* Requirements */}
        {scholarship.requirements && scholarship.requirements.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Requirements
              </h2>
              <ul className="space-y-2">
                {scholarship.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Eligibility */}
        {scholarship.eligibility && scholarship.eligibility.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Eligibility
              </h2>
              <ul className="space-y-2">
                {scholarship.eligibility.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {scholarship.ielts_required && <Badge variant="outline">IELTS Required</Badge>}
          {scholarship.gre_required && <Badge variant="outline">GRE Required</Badge>}
          {!scholarship.ielts_required && <Badge variant="outline" className="bg-green-500/10 text-green-600">No IELTS</Badge>}
          {!scholarship.gre_required && <Badge variant="outline" className="bg-green-500/10 text-green-600">No GRE</Badge>}
        </div>

        {/* Apply Button */}
        {scholarship.application_url && (
          <a href={scholarship.application_url} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full gradient-btn">
              <ExternalLink className="h-5 w-5 mr-2" />
              Apply Now
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
