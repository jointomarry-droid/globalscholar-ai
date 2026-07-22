"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  BookOpen,
  Mail,
  Globe,
  Award,
  Users,
  ExternalLink,
  GraduationCap,
  DollarSign,
  Languages,
} from "lucide-react";

interface Supervisor {
  id: string;
  name: string;
  title: string;
  university: string;
  country: string;
  department: string;
  email: string;
  website: string;
  researchAreas: string[];
  hIndex: number;
  citations: number;
  publications: number;
  phdPositions: boolean;
  fundingAvailable: boolean;
  acceptInternational: boolean;
  languages: string[];
}

export default function ResearchSupervisorsPage() {
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [fundingOnly, setFundingOnly] = useState(false);
  const [positionsOnly, setPositionsOnly] = useState(false);

  const fetchSupervisors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (areaFilter) params.set("area", areaFilter);
      if (countryFilter) params.set("country", countryFilter);
      if (fundingOnly) params.set("funding", "true");
      if (positionsOnly) params.set("positions", "true");
      const res = await fetch(`/api/research-supervisors?${params.toString()}`);
      const data = await res.json();
      if (data.success) setSupervisors(data.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupervisors();
  }, [fetchSupervisors, fundingOnly, positionsOnly, countryFilter]);

  const filtered = supervisors.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.university.toLowerCase().includes(search.toLowerCase()) ||
      s.researchAreas.some((a) => a.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge variant="info" className="mb-4">
            <BookOpen className="h-3 w-3 mr-1" />
            Research Supervisor Finder
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Find Your <span className="gradient-text">PhD Supervisor</span>
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Discover leading researchers and potential PhD supervisors across top universities worldwide.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, university, or research area..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
              />
            </div>
          </div>
          <div className="relative">
            <input
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              onBlur={fetchSupervisors}
              onKeyDown={(e) => e.key === "Enter" && fetchSupervisors()}
              placeholder="Research area (e.g. Machine Learning)"
              className="px-4 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm w-48"
            />
          </div>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
          >
            <option value="">All Countries</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Germany">Germany</option>
            <option value="South Korea">South Korea</option>
            <option value="China">China</option>
          </select>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={fundingOnly}
              onChange={(e) => setFundingOnly(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Funding Available</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={positionsOnly}
              onChange={(e) => setPositionsOnly(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Open Positions</span>
          </label>
        </div>

        {/* Supervisors Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6 h-64" />
              </Card>
            ))
          ) : filtered.length === 0 ? (
            <Card className="md:col-span-2">
              <CardContent className="p-8 text-center text-[var(--muted-foreground)]">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No supervisors found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((sup) => (
              <Card key={sup.id} className="hover:shadow-lg transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{sup.name}</CardTitle>
                      <p className="text-sm text-[var(--muted-foreground)]">{sup.title}</p>
                    </div>
                    <div className="flex gap-1">
                      {sup.phdPositions && (
                        <Badge variant="success" className="text-xs">
                          <GraduationCap className="h-3 w-3 mr-1" />
                          PhD Open
                        </Badge>
                      )}
                      {sup.fundingAvailable && (
                        <Badge variant="info" className="text-xs">
                          <DollarSign className="h-3 w-3 mr-1" />
                          Funded
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-[var(--muted-foreground)]">
                      <Globe className="h-3 w-3" />
                      {sup.university}, {sup.country}
                    </span>
                    <span className="flex items-center gap-1 text-[var(--muted-foreground)]">
                      <BookOpen className="h-3 w-3" />
                      {sup.department}
                    </span>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-[var(--accent)]">
                      <p className="text-lg font-bold text-[var(--primary)]">{sup.hIndex}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">H-Index</p>
                    </div>
                    <div className="p-2 rounded-lg bg-[var(--accent)]">
                      <p className="text-lg font-bold text-[var(--primary)]">{(sup.citations / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-[var(--muted-foreground)]">Citations</p>
                    </div>
                    <div className="p-2 rounded-lg bg-[var(--accent)]">
                      <p className="text-lg font-bold text-[var(--primary)]">{sup.publications}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">Publications</p>
                    </div>
                  </div>

                  {/* Research Areas */}
                  <div>
                    <p className="text-xs font-medium text-[var(--muted-foreground)] mb-1">Research Areas</p>
                    <div className="flex flex-wrap gap-1">
                      {sup.researchAreas.map((area) => (
                        <Badge key={area} variant="outline" className="text-xs">{area}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <Languages className="h-3 w-3" />
                    {sup.languages.join(", ")}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-[var(--border)]">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={`mailto:${sup.email}`}>
                        <Mail className="h-3 w-3 mr-1" />
                        Contact
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={sup.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Website
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
