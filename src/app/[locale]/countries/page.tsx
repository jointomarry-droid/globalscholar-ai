"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Globe,
  GraduationCap,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const regions = [
  {
    name: "North America",
    countries: [
      { name: "United States", code: "US", scholarships: 45000, universities: 4000 },
      { name: "Canada", code: "CA", scholarships: 12000, universities: 200 },
    ],
  },
  {
    name: "Europe",
    countries: [
      { name: "United Kingdom", code: "GB", scholarships: 18000, universities: 150 },
      { name: "Germany", code: "DE", scholarships: 15000, universities: 400 },
      { name: "France", code: "FR", scholarships: 10000, universities: 350 },
      { name: "Netherlands", code: "NL", scholarships: 8000, universities: 50 },
      { name: "Sweden", code: "SE", scholarships: 5000, universities: 50 },
      { name: "Switzerland", code: "CH", scholarships: 4000, universities: 30 },
    ],
  },
  {
    name: "Asia Pacific",
    countries: [
      { name: "Japan", code: "JP", scholarships: 12000, universities: 800 },
      { name: "South Korea", code: "KR", scholarships: 8000, universities: 400 },
      { name: "Australia", code: "AU", scholarships: 10000, universities: 50 },
      { name: "Singapore", code: "SG", scholarships: 3000, universities: 10 },
      { name: "China", code: "CN", scholarships: 20000, universities: 3000 },
    ],
  },
  {
    name: "Middle East & Africa",
    countries: [
      { name: "Turkey", code: "TR", scholarships: 5000, universities: 200 },
      { name: "UAE", code: "AE", scholarships: 3000, universities: 50 },
      { name: "South Africa", code: "ZA", scholarships: 4000, universities: 30 },
      { name: "Egypt", code: "EG", scholarships: 3000, universities: 50 },
    ],
  },
  {
    name: "Latin America",
    countries: [
      { name: "Brazil", code: "BR", scholarships: 8000, universities: 200 },
      { name: "Mexico", code: "MX", scholarships: 5000, universities: 200 },
      { name: "Argentina", code: "AR", scholarships: 3000, universities: 100 },
    ],
  },
];

export default function CountriesPage() {
  const [search, setSearch] = useState("");

  const allCountries = regions.flatMap((r) =>
    r.countries.map((c) => ({ ...c, region: r.name }))
  );

  const filtered = search
    ? allCountries.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.region.toLowerCase().includes(search.toLowerCase())
      )
    : allCountries;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <Globe className="h-12 w-12 text-[var(--primary)] mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Explore by Country</h1>
            <p className="text-[var(--muted-foreground)] mb-8">
              Discover scholarship opportunities from {allCountries.length}+ countries worldwide
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search countries..."
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {search ? (
          /* Search Results */
          <div>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">
              {filtered.length} countries found
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((country) => (
                <Link key={country.code} href={`/countries/${country.code.toLowerCase()}`}>
                  <Card className="hover:shadow-md transition-all cursor-pointer group h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold group-hover:text-[var(--primary)] transition-colors">
                            {country.name}
                          </h3>
                          <p className="text-xs text-[var(--muted-foreground)]">{country.region}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors" />
                      </div>
                      <div className="flex gap-3 text-xs text-[var(--muted-foreground)]">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {country.scholarships.toLocaleString()} scholarships
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" />
                          {country.universities.toLocaleString()} universities
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* Regions */
          <div className="space-y-12">
            {regions.map((region) => (
              <div key={region.name}>
                <h2 className="text-2xl font-bold mb-6">{region.name}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {region.countries.map((country) => (
                    <Link key={country.code} href={`/countries/${country.code.toLowerCase()}`}>
                      <Card className="hover:shadow-md transition-all cursor-pointer group h-full">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold group-hover:text-[var(--primary)] transition-colors">
                                {country.name}
                              </h3>
                            </div>
                            <ArrowRight className="h-4 w-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors" />
                          </div>
                          <div className="flex gap-4 text-xs text-[var(--muted-foreground)]">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {country.scholarships.toLocaleString()} scholarships
                            </span>
                            <span className="flex items-center gap-1">
                              <GraduationCap className="h-3 w-3" />
                              {country.universities.toLocaleString()} universities
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
