"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GitBranch,
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  Trash2,
  GraduationCap,
  MapPin,
  BookOpen,
} from "lucide-react";

interface AdmissionStage {
  id: string;
  name: string;
  description: string;
  order: number;
  status: "pending" | "in_progress" | "completed" | "skipped";
  startedAt?: string;
  completedAt?: string;
  notes?: string;
  deadline?: string;
}

interface Pipeline {
  id: string;
  universityName: string;
  program: string;
  country: string;
  degree: string;
  stages: AdmissionStage[];
  currentStage: string;
  overallProgress: number;
  createdAt: string;
  updatedAt: string;
}

const statusColors: Record<string, string> = {
  completed: "bg-[var(--success)]",
  in_progress: "bg-[var(--primary)]",
  pending: "bg-[var(--accent)]",
  skipped: "bg-[var(--muted-foreground)]",
};

const statusBadge: Record<string, "success" | "info" | "secondary" | "warning"> = {
  completed: "success",
  in_progress: "info",
  pending: "secondary",
  skipped: "warning",
};

export default function AdmissionsPage() {
  const { user } = useAuthStore();
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [newPipeline, setNewPipeline] = useState({ universityName: "", program: "", country: "", degree: "" });

  useEffect(() => {
    if (user) fetchPipelines();
  }, [user]);

  const fetchPipelines = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admissions/pipeline", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setPipelines(data.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const createPipeline = async () => {
    if (!newPipeline.universityName || !newPipeline.program) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admissions/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: "create", ...newPipeline }),
      });
      const data = await res.json();
      if (data.success) {
        setPipelines([data.data, ...pipelines]);
        setShowCreate(false);
        setNewPipeline({ universityName: "", program: "", country: "", degree: "" });
      }
    } catch {}
  };

  const updateStage = async (pipelineId: string, stageId: string, status: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admissions/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: "updateStage", pipelineId, stageId, stageStatus: status }),
      });
      const data = await res.json();
      if (data.success) {
        setPipelines(pipelines.map((p) => (p.id === pipelineId ? data.data : p)));
        if (selectedPipeline?.id === pipelineId) setSelectedPipeline(data.data);
      }
    } catch {}
  };

  const deletePipeline = async (pipelineId: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch("/api/admissions/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: "delete", pipelineId }),
      });
      setPipelines(pipelines.filter((p) => p.id !== pipelineId));
      if (selectedPipeline?.id === pipelineId) setSelectedPipeline(null);
    } catch {}
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 text-[var(--primary)]" />
            <h2 className="text-xl font-bold mb-2">Sign In Required</h2>
            <p className="text-[var(--muted-foreground)] mb-4">
              Sign in to track your admission pipeline.
            </p>
            <Button asChild className="gradient-btn">
              <a href="/login">Sign In</a>
            </Button>
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
              <GitBranch className="h-3 w-3 mr-1" />
              Admission Tracker
            </Badge>
            <h1 className="text-3xl font-bold">
              Application <span className="gradient-text">Pipeline</span>
            </h1>
            <p className="text-[var(--muted-foreground)] mt-1">
              Track your university applications from research to enrollment.
            </p>
          </div>
          <Button onClick={() => setShowCreate(true)} className="gradient-btn">
            <Plus className="h-4 w-4 mr-2" />
            New Pipeline
          </Button>
        </div>

        {/* Create Form */}
        {showCreate && (
          <Card className="mb-8 border-[var(--primary)]">
            <CardHeader>
              <CardTitle className="text-base">Create New Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="University Name"
                  value={newPipeline.universityName}
                  onChange={(e) => setNewPipeline({ ...newPipeline, universityName: e.target.value })}
                  className="px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
                />
                <input
                  type="text"
                  placeholder="Program"
                  value={newPipeline.program}
                  onChange={(e) => setNewPipeline({ ...newPipeline, program: e.target.value })}
                  className="px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={newPipeline.country}
                  onChange={(e) => setNewPipeline({ ...newPipeline, country: e.target.value })}
                  className="px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
                />
                <input
                  type="text"
                  placeholder="Degree (e.g. MS, PhD)"
                  value={newPipeline.degree}
                  onChange={(e) => setNewPipeline({ ...newPipeline, degree: e.target.value })}
                  className="px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={createPipeline} className="gradient-btn">
                  Create Pipeline
                </Button>
                <Button variant="outline" onClick={() => setShowCreate(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pipeline List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-sm font-medium text-[var(--muted-foreground)] mb-2">
              Your Pipelines ({pipelines.length})
            </h2>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4 h-24" />
                </Card>
              ))
            ) : pipelines.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-[var(--muted-foreground)]">
                  <GitBranch className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No pipelines yet. Create one to start tracking.</p>
                </CardContent>
              </Card>
            ) : (
              pipelines.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPipeline(p)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedPipeline?.id === p.id
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-[var(--border)] hover:border-[var(--primary)]/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{p.universityName}</p>
                      <p className="text-xs text-[var(--muted-foreground)] truncate">{p.program}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" /> {p.country}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <BookOpen className="h-3 w-3 mr-1" /> {p.degree}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="relative w-10 h-10">
                        <svg className="w-10 h-10 -rotate-90">
                          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" className="text-[var(--accent)]" strokeWidth="3" />
                          <circle
                            cx="20" cy="20" r="16" fill="none" stroke="currentColor" className="text-[var(--primary)]"
                            strokeWidth="3" strokeDasharray={`${p.overallProgress} 100`}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                          {p.overallProgress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Pipeline Detail */}
          <div className="lg:col-span-2">
            {selectedPipeline ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedPipeline.universityName}</CardTitle>
                      <p className="text-[var(--muted-foreground)]">{selectedPipeline.program} &middot; {selectedPipeline.degree}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deletePipeline(selectedPipeline.id)}
                      className="text-[var(--destructive)] hover:text-[var(--destructive)]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-[var(--muted-foreground)]">Overall Progress</span>
                      <span className="font-bold">{selectedPipeline.overallProgress}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-[var(--accent)]">
                      <div
                        className="h-full rounded-full gradient-btn transition-all"
                        style={{ width: `${selectedPipeline.overallProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stages */}
                  <div className="space-y-3">
                    {selectedPipeline.stages.map((stage, i) => (
                      <div key={stage.id} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusColors[stage.status]}`}>
                            {stage.status === "completed" ? (
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            ) : stage.status === "in_progress" ? (
                              <Clock className="h-4 w-4 text-white" />
                            ) : (
                              <Circle className="h-4 w-4 text-[var(--muted-foreground)]" />
                            )}
                          </div>
                          {i < selectedPipeline.stages.length - 1 && (
                            <div className="w-0.5 h-6 bg-[var(--border)] mt-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{stage.name}</p>
                              <p className="text-xs text-[var(--muted-foreground)]">{stage.description}</p>
                              {stage.completedAt && (
                                <p className="text-xs text-[var(--success)] mt-0.5">
                                  Completed {new Date(stage.completedAt).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-1">
                              {stage.status !== "completed" && (
                                <button
                                  onClick={() => updateStage(selectedPipeline.id, stage.id, "completed")}
                                  className="p-1 rounded hover:bg-[var(--success)]/10 text-[var(--success)]"
                                  title="Mark Complete"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </button>
                              )}
                              {stage.status === "pending" && (
                                <button
                                  onClick={() => updateStage(selectedPipeline.id, stage.id, "in_progress")}
                                  className="p-1 rounded hover:bg-[var(--primary)]/10 text-[var(--primary)]"
                                  title="Start"
                                >
                                  <ArrowRight className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="flex items-center justify-center h-96">
                <div className="text-center text-[var(--muted-foreground)]">
                  <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Select a pipeline</p>
                  <p className="text-sm">Choose an application to view its progress</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}