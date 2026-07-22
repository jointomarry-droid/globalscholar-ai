"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Home,
  Utensils,
  Bus,
  Wifi,
  Heart,
  Music,
  MoreHorizontal,
  TrendingUp,
  Shield,
  Users,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
} from "lucide-react";

interface CityCost {
  city: string;
  country: string;
  countryCode: string;
  currency: string;
  averageMonthlyRent: number;
  sharedAccommodation: number;
  utilities: number;
  food: number;
  transportation: number;
  internet: number;
  healthInsurance: number;
  entertainment: number;
  miscellaneous: number;
  totalMonthly: number;
  tuitionRange: string;
  avgTuitionUSD: number;
  qualityOfLife: number;
  safetyIndex: number;
  studentFriendliness: number;
  climate: string;
  language: string;
  pros: string[];
  cons: string[];
  universities: string[];
}

const sortOptions = [
  { value: "totalMonthly", label: "Total Cost" },
  { value: "qualityOfLife", label: "Quality of Life" },
  { value: "safetyIndex", label: "Safety" },
  { value: "studentFriendliness", label: "Student Friendly" },
] as const;

function RatingBar({ value, max = 10 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-[var(--accent)]">
        <div
          className="h-full rounded-full bg-[var(--primary)]"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      <span className="text-xs font-medium w-6 text-right">{value}</span>
    </div>
  );
}

export default function CostOfLivingPage() {
  const [cities, setCities] = useState<CityCost[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>("totalMonthly");
  const [expandedCity, setExpandedCity] = useState<string | null>(null);
  const [maxBudget, setMaxBudget] = useState<string>("");

  useEffect(() => {
    fetchCities();
  }, [sortBy, maxBudget]);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sortBy });
      if (maxBudget) params.set("maxBudget", maxBudget);
      const res = await fetch(`/api/cost-of-living?${params.toString()}`);
      const data = await res.json();
      if (data.success) setCities(data.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      EUR: "\u20AC", GBP: "\u00A3", USD: "$", AUD: "A$", SGD: "S$", CHF: "CHF", CAD: "CAD $",
    };
    return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
  };

  const costBreakdown = (city: CityCost) => [
    { label: "Rent (Private)", value: city.averageMonthlyRent, icon: Home },
    { label: "Shared Accommodation", value: city.sharedAccommodation, icon: Users },
    { label: "Utilities", value: city.utilities, icon: Bus },
    { label: "Food", value: city.food, icon: Utensils },
    { label: "Transportation", value: city.transportation, icon: Bus },
    { label: "Internet", value: city.internet, icon: Wifi },
    { label: "Health Insurance", value: city.healthInsurance, icon: Heart },
    { label: "Entertainment", value: city.entertainment, icon: Music },
    { label: "Miscellaneous", value: city.miscellaneous, icon: MoreHorizontal },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge variant="info" className="mb-4">
            <DollarSign className="h-3 w-3 mr-1" />
            Cost of Living Calculator
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Living <span className="gradient-text">Costs</span> Worldwide
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Compare monthly expenses, tuition ranges, and quality of life across top student cities.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex gap-2">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  sortBy === opt.value
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--accent)] text-[var(--muted-foreground)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--muted-foreground)]">Max budget:</span>
            <input
              type="number"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              placeholder="e.g. 2000"
              className="w-32 px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
            />
          </div>
        </div>

        {/* City Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6 h-64" />
              </Card>
            ))
          ) : (
            cities.map((city) => (
              <Card key={city.city} className="hover:shadow-lg transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{city.city}</CardTitle>
                      <p className="text-sm text-[var(--muted-foreground)]">{city.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[var(--primary)]">
                        {formatCurrency(city.totalMonthly, city.currency)}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)]">/month total</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-2 rounded-lg bg-[var(--accent)]">
                      <TrendingUp className="h-4 w-4 mx-auto mb-1 text-[var(--primary)]" />
                      <p className="text-xs text-[var(--muted-foreground)]">Quality</p>
                      <RatingBar value={city.qualityOfLife} />
                    </div>
                    <div className="text-center p-2 rounded-lg bg-[var(--accent)]">
                      <Shield className="h-4 w-4 mx-auto mb-1 text-[var(--primary)]" />
                      <p className="text-xs text-[var(--muted-foreground)]">Safety</p>
                      <RatingBar value={city.safetyIndex} />
                    </div>
                    <div className="text-center p-2 rounded-lg bg-[var(--accent)]">
                      <Users className="h-4 w-4 mx-auto mb-1 text-[var(--primary)]" />
                      <p className="text-xs text-[var(--muted-foreground)]">Student</p>
                      <RatingBar value={city.studentFriendliness} />
                    </div>
                  </div>

                  {/* Tuition */}
                  <div className="p-3 rounded-lg bg-[var(--accent)]">
                    <p className="text-xs font-medium text-[var(--muted-foreground)]">Tuition Range</p>
                    <p className="font-semibold">{city.tuitionRange}</p>
                  </div>

                  {/* Key Costs */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--muted-foreground)]">Rent (Private)</span>
                      <span className="font-medium">{formatCurrency(city.averageMonthlyRent, city.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--muted-foreground)]">Shared</span>
                      <span className="font-medium">{formatCurrency(city.sharedAccommodation, city.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--muted-foreground)]">Food</span>
                      <span className="font-medium">{formatCurrency(city.food, city.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--muted-foreground)]">Transport</span>
                      <span className="font-medium">{formatCurrency(city.transportation, city.currency)}</span>
                    </div>
                  </div>

                  {/* Expand Details */}
                  <button
                    onClick={() => setExpandedCity(expandedCity === city.city ? null : city.city)}
                    className="w-full flex items-center justify-center gap-1 text-sm text-[var(--primary)] hover:underline"
                  >
                    {expandedCity === city.city ? "Hide Details" : "Show Details"}
                    {expandedCity === city.city ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  {expandedCity === city.city && (
                    <div className="space-y-4 pt-2 border-t border-[var(--border)]">
                      {/* Full Breakdown */}
                      <div>
                        <p className="text-sm font-medium mb-2">Full Cost Breakdown</p>
                        <div className="space-y-1">
                          {costBreakdown(city).map((item) => (
                            <div key={item.label} className="flex items-center justify-between text-sm">
                              <span className="text-[var(--muted-foreground)] flex items-center gap-1">
                                <item.icon className="h-3 w-3" />
                                {item.label}
                              </span>
                              <span className="font-medium">{formatCurrency(item.value, city.currency)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Climate & Language */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-2 rounded-lg bg-[var(--accent)]">
                          <p className="text-xs text-[var(--muted-foreground)]">Climate</p>
                          <p className="text-sm font-medium">{city.climate}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-[var(--accent)]">
                          <p className="text-xs text-[var(--muted-foreground)]">Language</p>
                          <p className="text-sm font-medium">{city.language}</p>
                        </div>
                      </div>

                      {/* Pros & Cons */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-sm font-medium text-[var(--success)] mb-1">Pros</p>
                          <ul className="space-y-0.5">
                            {city.pros.map((pro, i) => (
                              <li key={i} className="text-xs text-[var(--muted-foreground)]">+ {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--destructive)] mb-1">Cons</p>
                          <ul className="space-y-0.5">
                            {city.cons.map((con, i) => (
                              <li key={i} className="text-xs text-[var(--muted-foreground)]">- {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Universities */}
                      <div>
                        <p className="text-sm font-medium mb-1">Top Universities</p>
                        <div className="flex flex-wrap gap-1">
                          {city.universities.map((uni) => (
                            <Badge key={uni} variant="outline" className="text-xs">{uni}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
