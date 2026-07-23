"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Plus,
  Search,
  TrendingUp,
  DollarSign,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Calendar,
  StickyNote,
  ChevronDown,
  ChevronUp,
  Trash2,
  Edit2,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  degree: string;
  field: string;
  budget?: number;
  preferredCountries: string[];
  status: string;
  source: string;
  notes: string[];
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  totalLeads: number;
  activeLeads: number;
  admitted: number;
  enrolled: number;
  conversionRate: number;
  totalCommission: number;
  pendingCommission: number;
  monthlyLeads: number;
  monthlyAdmissions: number;
}

const statusColors: Record<string, "default" | "info" | "success" | "warning" | "destructive" | "secondary" | "accent"> = {
  new: "info",
  contacted: "secondary",
  qualified: "accent",
  application_started: "warning",
  admitted: "success",
  enrolled: "default",
  lost: "destructive",
};

const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  application_started: "App Started",
  admitted: "Admitted",
  enrolled: "Enrolled",
  lost: "Lost",
};

const pipelineStages = ["new", "contacted", "qualified", "application_started", "admitted", "enrolled"];

export default function ConsultantPage() {
  const { user } = useAuthStore();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [newLead, setNewLead] = useState({
    name: "", email: "", phone: "", country: "", degree: "", field: "",
    preferredCountries: [] as string[], source: "website", notes: "",
  });

  useEffect(() => {
    if (user) fetchLeads();
  }, [user, statusFilter]);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (search) params.set("search", search);
      const res = await fetch(`/api/consultant/leads?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
        setStats(data.stats);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const createLead = async () => {
    if (!newLead.name || !newLead.email) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/consultant/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: "create", ...newLead }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads([data.data, ...leads]);
        setShowCreate(false);
        setNewLead({ name: "", email: "", phone: "", country: "", degree: "", field: "", preferredCountries: [], source: "website", notes: "" });
      }
    } catch {}
  };

  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/consultant/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: "update", leadId, status }),
      });
      const data = await res.json();
      if (data.success) setLeads(leads.map((l) => (l.id === leadId ? data.data : l)));
    } catch {}
  };

  const deleteLead = async (leadId: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch("/api/consultant/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: "delete", leadId }),
      });
      setLeads(leads.filter((l) => l.id !== leadId));
      if (expandedLead === leadId) setExpandedLead(null);
    } catch {}
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-[var(--primary)]" />
            <h2 className="text-xl font-bold mb-2">Sign In Required</h2>
            <p className="text-[var(--muted-foreground)] mb-4">Sign in to access your consultant dashboard.</p>
            <Button asChild className="gradient-btn"><a href="/login">Sign In</a></Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Badge variant="info" className="mb-2">
              <Users className="h-3 w-3 mr-1" />
              Consultant CRM
            </Badge>
            <h1 className="text-3xl font-bold">
              Lead <span className="gradient-text">Management</span>
            </h1>
          </div>
          <Button onClick={() => setShowCreate(true)} className="gradient-btn">
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Total Leads", value: stats.totalLeads, icon: Users, color: "text-[var(--primary)]" },
              { label: "Active", value: stats.activeLeads, icon: TrendingUp, color: "text-[var(--info)]" },
              { label: "Admitted", value: stats.admitted, icon: UserCheck, color: "text-[var(--success)]" },
              { label: "Enrolled", value: stats.enrolled, icon: UserCheck, color: "text-[var(--success)]" },
              { label: "Conversion", value: `${stats.conversionRate}%`, icon: DollarSign, color: "text-[var(--warning)]" },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-[var(--accent)]`}>
                      <s.icon className={`h-4 w-4 ${s.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{s.value}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pipeline View */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base">Pipeline Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {pipelineStages.map((stage) => {
                const count = leads.filter((l) => l.status === stage).length;
                return (
                  <button
                    key={stage}
                    onClick={() => setStatusFilter(statusFilter === stage ? "" : stage)}
                    className={`flex-shrink-0 p-3 rounded-lg border text-center min-w-[120px] transition-all ${
                      statusFilter === stage
                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                        : "border-[var(--border)] hover:border-[var(--primary)]/50"
                    }`}
                  >
                    <Badge variant={statusColors[stage]} className="mb-1">{count}</Badge>
                    <p className="text-xs font-medium mt-1">{statusLabels[stage]}</p>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Create Form */}
        {showCreate && (
          <Card className="mb-8 border-[var(--primary)]">
            <CardHeader><CardTitle className="text-base">Add New Lead</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input placeholder="Name *" value={newLead.name} onChange={(e) => setNewLead({ ...newLead, name: e.target.value })} className="px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm" />
                <input placeholder="Email *" type="email" value={newLead.email} onChange={(e) => setNewLead({ ...newLead, email: e.target.value })} className="px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm" />
                <input placeholder="Phone" value={newLead.phone} onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })} className="px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm" />
                <input placeholder="Country" value={newLead.country} onChange={(e) => setNewLead({ ...newLead, country: e.target.value })} className="px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm" />
                <input placeholder="Degree" value={newLead.degree} onChange={(e) => setNewLead({ ...newLead, degree: e.target.value })} className="px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm" />
                <input placeholder="Field of Study" value={newLead.field} onChange={(e) => setNewLead({ ...newLead, field: e.target.value })} className="px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm" />
                <select value={newLead.source} onChange={(e) => setNewLead({ ...newLead, source: e.target.value })} className="px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm">
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="social_media">Social Media</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="partner">Partner</option>
                </select>
                <input placeholder="Notes" value={newLead.notes} onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })} className="px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm" />
              </div>
              <div className="flex gap-2">
                <Button onClick={createLead} className="gradient-btn">Create Lead</Button>
                <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leads List */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchLeads()}
                placeholder="Search leads..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
              />
            </div>
            <Button variant="outline" size="sm" onClick={fetchLeads}>Search</Button>
          </div>

          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse"><CardContent className="p-6 h-24" /></Card>
            ))
          ) : leads.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-[var(--muted-foreground)]">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No leads found. Add your first lead to get started.</p>
              </CardContent>
            </Card>
          ) : (
            leads.map((lead) => (
              <Card key={lead.id} className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full gradient-btn flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{lead.name.charAt(0)}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{lead.name}</p>
                          <Badge variant={statusColors[lead.status]}>{statusLabels[lead.status]}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-[var(--muted-foreground)]">
                          <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{lead.email}</span>
                          {lead.country && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{lead.country}</span>}
                          {lead.degree && <span className="flex items-center gap-1">{lead.degree} in {lead.field}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className="px-2 py-1 rounded border border-[var(--input)] bg-[var(--background)] text-xs"
                      >
                        {pipelineStages.map((s) => (
                          <option key={s} value={s}>{statusLabels[s]}</option>
                        ))}
                        <option value="lost">Lost</option>
                      </select>
                      <button
                        onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                        className="p-1 rounded hover:bg-[var(--accent)]"
                      >
                        {expandedLead === lead.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="p-1 rounded hover:bg-[var(--destructive)]/10 text-[var(--destructive)]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {expandedLead === lead.id && (
                    <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        {lead.phone && (
                          <div className="flex items-center gap-2"><Phone className="h-3 w-3 text-[var(--muted-foreground)]" /><span>{lead.phone}</span></div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="text-[var(--muted-foreground)]">Source:</span>
                          <Badge variant="outline" className="text-xs">{lead.source.replace("_", " ")}</Badge>
                        </div>
                        {lead.preferredCountries.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--muted-foreground)]">Preferred:</span>
                            {lead.preferredCountries.map((c) => <Badge key={c} variant="outline" className="text-xs">{c}</Badge>)}
                          </div>
                        )}
                        {lead.followUpDate && (
                          <div className="flex items-center gap-2"><Calendar className="h-3 w-3 text-[var(--muted-foreground)]" /><span>Follow up: {new Date(lead.followUpDate).toLocaleDateString()}</span></div>
                        )}
                      </div>
                      {lead.notes.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-[var(--muted-foreground)] mb-1 flex items-center gap-1">
                            <StickyNote className="h-3 w-3" /> Notes
                          </p>
                          <div className="space-y-1">
                            {lead.notes.map((note, i) => (
                              <p key={i} className="text-xs text-[var(--muted-foreground)] bg-[var(--accent)] p-2 rounded">{note}</p>
                            ))}
                          </div>
                        </div>
                      )}
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