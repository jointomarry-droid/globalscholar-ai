"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Globe,
  FileText,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface VisaCountry {
  id: string;
  country: string;
  countryCode: string;
  visaType: string;
  processingTime: string;
  applicationFee: string;
  workRights: string;
}

interface VisaDetail {
  country: string;
  countryCode: string;
  visaType: string;
  requirements: {
    documents: string[];
    financialProof: string;
    healthInsurance: string;
    languageRequirement: string;
    processingTime: string;
    validity: string;
    workRights: string;
    applicationFee: string;
  };
  embassy: { website: string; address: string; phone: string; email: string };
  tips: string[];
  commonMistakes: string[];
  timeline: { stage: string; duration: string; description: string }[];
}

const countryFlags: Record<string, string> = {
  US: "🇺🇸",
  GB: "🇬🇧",
  DE: "🇩🇪",
  CA: "🇨🇦",
  AU: "🇦🇺",
};

export default function VisaPage() {
  const [countries, setCountries] = useState<VisaCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<VisaDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("documents");

  const fetchCountries = async () => {
    try {
      const res = await fetch("/api/visa");
      const data = await res.json();
      if (data.success) setCountries(data.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const fetchDetail = async (countryId: string) => {
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/visa?country=${countryId}`);
      const data = await res.json();
      if (data.success) setSelected(data.data);
    } catch {
    } finally {
      setDetailLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge variant="info" className="mb-4">
            <Shield className="h-3 w-3 mr-1" />
            Visa Requirements Checker
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Student <span className="gradient-text">Visa Guide</span>
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Comprehensive visa requirements, timelines, and tips for studying in top
            destinations worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Country List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-[var(--primary)]" />
              Select Destination
            </h2>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4 h-20" />
                </Card>
              ))
            ) : (
              countries.map((c) => (
                <button
                  key={c.id}
                  onClick={() => fetchDetail(c.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selected?.countryCode === c.countryCode
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--accent)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{countryFlags[c.countryCode] || "🌍"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{c.country}</p>
                      <p className="text-xs text-[var(--muted-foreground)] truncate">{c.visaType}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {c.processingTime}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {c.applicationFee}
                    </Badge>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-2">
            {detailLoading ? (
              <Card className="animate-pulse">
                <CardContent className="p-8 h-96" />
              </Card>
            ) : selected ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{countryFlags[selected.countryCode] || "🌍"}</span>
                      <div>
                        <CardTitle className="text-2xl">{selected.country}</CardTitle>
                        <p className="text-[var(--muted-foreground)]">{selected.visaType}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-[var(--accent)]">
                        <p className="text-xs font-medium text-[var(--muted-foreground)]">Processing Time</p>
                        <p className="font-semibold">{selected.requirements.processingTime}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[var(--accent)]">
                        <p className="text-xs font-medium text-[var(--muted-foreground)]">Application Fee</p>
                        <p className="font-semibold">{selected.requirements.applicationFee}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[var(--accent)]">
                        <p className="text-xs font-medium text-[var(--muted-foreground)]">Visa Validity</p>
                        <p className="font-semibold">{selected.requirements.validity}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[var(--accent)]">
                        <p className="text-xs font-medium text-[var(--muted-foreground)]">Work Rights</p>
                        <p className="font-semibold text-sm">{selected.requirements.workRights}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Documents */}
                <Card>
                  <button
                    onClick={() => toggleSection("documents")}
                    className="w-full flex items-center justify-between p-4"
                  >
                    <CardTitle className="flex items-center gap-2 text-base">
                      <FileText className="h-4 w-4 text-[var(--primary)]" />
                      Required Documents
                    </CardTitle>
                    {expandedSection === "documents" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {expandedSection === "documents" && (
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {selected.requirements.documents.map((doc, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  )}
                </Card>

                {/* Financial & Language */}
                <Card>
                  <button
                    onClick={() => toggleSection("requirements")}
                    className="w-full flex items-center justify-between p-4"
                  >
                    <CardTitle className="flex items-center gap-2 text-base">
                      <DollarSign className="h-4 w-4 text-[var(--primary)]" />
                      Financial & Language Requirements
                    </CardTitle>
                    {expandedSection === "requirements" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {expandedSection === "requirements" && (
                    <CardContent className="pt-0 space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Financial Proof</p>
                        <p className="text-sm text-[var(--muted-foreground)]">{selected.requirements.financialProof}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Health Insurance</p>
                        <p className="text-sm text-[var(--muted-foreground)]">{selected.requirements.healthInsurance}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Language Requirement</p>
                        <p className="text-sm text-[var(--muted-foreground)]">{selected.requirements.languageRequirement}</p>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Timeline */}
                <Card>
                  <button
                    onClick={() => toggleSection("timeline")}
                    className="w-full flex items-center justify-between p-4"
                  >
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Clock className="h-4 w-4 text-[var(--primary)]" />
                      Application Timeline
                    </CardTitle>
                    {expandedSection === "timeline" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {expandedSection === "timeline" && (
                    <CardContent className="pt-0">
                      <div className="relative ml-4">
                        <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-[var(--border)]" />
                        <div className="space-y-6">
                          {selected.timeline.map((step, i) => (
                            <div key={i} className="relative pl-6">
                              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[var(--primary)] border-2 border-[var(--background)]" />
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-sm">{step.stage}</p>
                                  <Badge variant="info" className="text-xs">{step.duration}</Badge>
                                </div>
                                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{step.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Tips */}
                <Card>
                  <button
                    onClick={() => toggleSection("tips")}
                    className="w-full flex items-center justify-between p-4"
                  >
                    <CardTitle className="flex items-center gap-2 text-base">
                      <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />
                      Tips & Common Mistakes
                    </CardTitle>
                    {expandedSection === "tips" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {expandedSection === "tips" && (
                    <CardContent className="pt-0 space-y-4">
                      <div>
                        <p className="text-sm font-medium text-[var(--success)] mb-2">Pro Tips</p>
                        <ul className="space-y-1">
                          {selected.tips.map((tip, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <CheckCircle2 className="h-3 w-3 text-[var(--success)] mt-1 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--destructive)] mb-2">Common Mistakes</p>
                        <ul className="space-y-1">
                          {selected.commonMistakes.map((mistake, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <AlertTriangle className="h-3 w-3 text-[var(--destructive)] mt-1 flex-shrink-0" />
                              {mistake}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Embassy */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-[var(--primary)]" />
                      Embassy Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={selected.embassy.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[var(--primary)] hover:underline text-sm"
                    >
                      Official Website <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="flex items-center justify-center h-96">
                <div className="text-center text-[var(--muted-foreground)]">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Select a country</p>
                  <p className="text-sm">Choose a destination to view visa requirements</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
