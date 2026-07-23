"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  GraduationCap,
  DollarSign,
  Users,
  BookOpen,
  ExternalLink,
  ArrowLeft,
  Loader2,
  AlertCircle,
  MapPin,
  Briefcase,
  Home,
} from "lucide-react";

interface CountryInfo {
  name: string;
  slug: string;
  description: string;
  capital: string;
  language: string;
  currency: string;
  population: string;
  international_students: string;
  top_universities: string[];
  popular_fields: string[];
  average_tuition: string;
  cost_of_living: string;
  work_opportunities: string;
  visa_info: string;
}

export default function CountryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [country, setCountry] = useState<CountryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`/api/countries?slug=${slug}`);
        const data = await response.json();
        if (data.success && data.data && data.data.length > 0) {
          setCountry(data.data[0]);
        } else {
          setError("Country not found");
        }
      } catch {
        setError("Failed to load country information");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCountry();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h1 className="text-2xl font-bold">{error || "Country not found"}</h1>
        <Link href="/countries">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Countries
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/countries" className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Countries
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{country.name}</h1>
          <p className="text-lg text-[var(--muted-foreground)]">{country.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <MapPin className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="text-xs text-[var(--muted-foreground)]">Capital</p>
              <p className="font-semibold">{country.capital}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Globe className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-xs text-[var(--muted-foreground)]">Language</p>
              <p className="font-semibold">{country.language}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-xs text-[var(--muted-foreground)]">Currency</p>
              <p className="font-semibold">{country.currency}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <p className="text-xs text-[var(--muted-foreground)]">International Students</p>
              <p className="font-semibold">{country.international_students}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Costs
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Average Tuition</p>
                  <p className="font-medium">{country.average_tuition}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Cost of Living</p>
                  <p className="font-medium">{country.cost_of_living}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-500" />
                Work & Visa
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Work Opportunities</p>
                  <p className="font-medium">{country.work_opportunities || "Check university policy"}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Visa Information</p>
                  <p className="font-medium">{country.visa_info || "Contact embassy"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {country.top_universities && country.top_universities.length > 0 && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-[var(--primary)]" />
                Top Universities
              </h2>
              <div className="flex flex-wrap gap-2">
                {country.top_universities.map((uni, i) => (
                  <Badge key={i} variant="outline">{uni}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {country.popular_fields && country.popular_fields.length > 0 && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-500" />
                Popular Fields of Study
              </h2>
              <div className="flex flex-wrap gap-2">
                {country.popular_fields.map((field, i) => (
                  <Badge key={i} variant="outline">{field}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Link href={`/scholarships?country=${slug}`}>
          <Button size="lg" className="w-full gradient-btn">
            <GraduationCap className="h-5 w-5 mr-2" />
            Find Scholarships in {country.name}
          </Button>
        </Link>
      </div>
    </div>
  );
}
