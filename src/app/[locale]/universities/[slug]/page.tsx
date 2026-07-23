"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Globe,
  DollarSign,
  Users,
  BookOpen,
  ExternalLink,
  ArrowLeft,
  Loader2,
  AlertCircle,
  MapPin,
  Building,
  Trophy,
} from "lucide-react";

interface University {
  id: string;
  name: string;
  slug: string;
  country: string;
  city: string;
  description: string;
  ranking: number;
  website: string;
  founded: number;
  students: string;
  programs: string[];
  scholarships_available: boolean;
  acceptance_rate: string;
  tuition_range: string;
}

export default function UniversityDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await fetch(`/api/universities/${slug}`);
        const data = await response.json();
        if (data.success && data.data) {
          setUniversity(data.data);
        } else {
          setError("University not found");
        }
      } catch {
        setError("Failed to load university");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchUniversity();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h1 className="text-2xl font-bold">{error || "University not found"}</h1>
        <Link href="/universities">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Universities
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link href="/universities" className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Universities
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {university.ranking && (
              <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                <Trophy className="h-3 w-3 mr-1" />
                #{university.ranking} Ranked
              </Badge>
            )}
            {university.scholarships_available && (
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Scholarships Available</Badge>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{university.name}</h1>
          <p className="flex items-center gap-2 text-[var(--muted-foreground)]">
            <MapPin className="h-4 w-4" />
            {university.city}, {university.country}
          </p>
        </div>

        {/* Quick Info */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-xs text-[var(--muted-foreground)]">Ranking</p>
              <p className="font-semibold">#{university.ranking || "N/A"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-xs text-[var(--muted-foreground)]">Students</p>
              <p className="font-semibold">{university.students || "N/A"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Building className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <p className="text-xs text-[var(--muted-foreground)]">Founded</p>
              <p className="font-semibold">{university.founded || "N/A"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-xs text-[var(--muted-foreground)]">Tuition</p>
              <p className="font-semibold text-sm">{university.tuition_range || "N/A"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              {university.description}
            </p>
          </CardContent>
        </Card>

        {/* Programs */}
        {university.programs && university.programs.length > 0 && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[var(--primary)]" />
                Programs
              </h2>
              <div className="flex flex-wrap gap-2">
                {university.programs.map((program, i) => (
                  <Badge key={i} variant="outline">{program}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Website */}
        {university.website && (
          <a href={university.website} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full gradient-btn">
              <ExternalLink className="h-5 w-5 mr-2" />
              Visit University Website
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
