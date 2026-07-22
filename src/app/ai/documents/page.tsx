"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  GraduationCap,
  Briefcase,
  Mail,
  BookOpen,
  PenTool,
  Download,
  Copy,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const documentTypes = [
  { id: "sop", name: "Statement of Purpose", icon: FileText, description: "Compelling personal statement for university admissions", color: "text-blue-600" },
  { id: "lor", name: "Letter of Recommendation", icon: BookOpen, description: "Strong recommendation letter template", color: "text-green-600" },
  { id: "cv", name: "Academic CV", icon: Briefcase, description: "Professional academic resume/CV", color: "text-purple-600" },
  { id: "motivation_letter", name: "Motivation Letter", icon: PenTool, description: "Show your passion and goals", color: "text-orange-600" },
  { id: "research_proposal", name: "Research Proposal", icon: GraduationCap, description: "Academic research proposal", color: "text-red-600" },
  { id: "cover_letter", name: "Cover Letter", icon: Mail, description: "Professional cover letter", color: "text-indigo-600" },
  { id: "email_to_professor", name: "Email to Professor", icon: Mail, description: "Professional academic inquiry email", color: "text-teal-600" },
];

export default function DocumentsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [generatedDoc, setGeneratedDoc] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    degree: "",
    field: "",
    university: "",
    gpa: "",
    workExperience: "",
    targetUniversity: "",
    targetProgram: "",
    targetCountry: "",
    researchInterests: "",
    achievements: "",
    additionalContext: "",
    tone: "formal",
  });

  const handleGenerate = async () => {
    if (!selectedType || !form.name) return;

    setGenerating(true);
    setGeneratedDoc(null);

    try {
      const response = await fetch("/api/ai/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedType,
          studentProfile: {
            name: form.name,
            degree: form.degree,
            field: form.field,
            university: form.university || undefined,
            gpa: form.gpa ? parseFloat(form.gpa) : undefined,
            workExperience: form.workExperience ? parseInt(form.workExperience) : undefined,
            researchInterests: form.researchInterests ? form.researchInterests.split(",").map((s) => s.trim()) : undefined,
            achievements: form.achievements ? form.achievements.split(",").map((s) => s.trim()) : undefined,
            targetUniversity: form.targetUniversity || undefined,
            targetProgram: form.targetProgram || undefined,
            targetCountry: form.targetCountry || undefined,
          },
          additionalContext: form.additionalContext || undefined,
          tone: form.tone,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedDoc(data.data.content);
      }
    } catch {
      setGeneratedDoc("Error generating document. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedDoc) {
      navigator.clipboard.writeText(generatedDoc);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="info" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            AI Document <span className="gradient-text">Assistant</span>
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Generate compelling academic documents with AI. Create SOPs, LORs, CVs,
            motivation letters, and more in minutes.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Document Type Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Select Document Type</h2>
            {documentTypes.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedType(doc.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  selectedType === doc.id
                    ? "border-[var(--primary)] bg-[var(--primary)]/5"
                    : "border-[var(--border)] hover:border-[var(--primary)]/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <doc.icon className={`h-5 w-5 mt-0.5 ${doc.color}`} />
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">{doc.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Middle Panel - Form */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Your Information</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name *</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Current Degree</label>
                    <Input
                      value={form.degree}
                      onChange={(e) => setForm({ ...form, degree: e.target.value })}
                      placeholder="e.g. B.Sc. Computer Science"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Field of Study</label>
                    <Input
                      value={form.field}
                      onChange={(e) => setForm({ ...form, field: e.target.value })}
                      placeholder="e.g. Computer Science"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">University</label>
                    <Input
                      value={form.university}
                      onChange={(e) => setForm({ ...form, university: e.target.value })}
                      placeholder="Your university"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">GPA</label>
                    <Input
                      value={form.gpa}
                      onChange={(e) => setForm({ ...form, gpa: e.target.value })}
                      placeholder="e.g. 3.8"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Target University</label>
                    <Input
                      value={form.targetUniversity}
                      onChange={(e) => setForm({ ...form, targetUniversity: e.target.value })}
                      placeholder="University you're applying to"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Target Program</label>
                    <Input
                      value={form.targetProgram}
                      onChange={(e) => setForm({ ...form, targetProgram: e.target.value })}
                      placeholder="e.g. M.Sc. Data Science"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Research Interests (comma separated)</label>
                  <Input
                    value={form.researchInterests}
                    onChange={(e) => setForm({ ...form, researchInterests: e.target.value })}
                    placeholder="e.g. Machine Learning, NLP, Computer Vision"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Additional Context</label>
                  <textarea
                    value={form.additionalContext}
                    onChange={(e) => setForm({ ...form, additionalContext: e.target.value })}
                    placeholder="Any additional information you want to include..."
                    className="w-full px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tone</label>
                  <div className="flex gap-2 mt-2">
                    {["formal", "professional", "academic", "personal"].map((tone) => (
                      <button
                        key={tone}
                        onClick={() => setForm({ ...form, tone })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          form.tone === tone
                            ? "bg-[var(--primary)] text-white"
                            : "bg-[var(--accent)] text-[var(--muted-foreground)] hover:bg-[var(--primary)]/10"
                        }`}
                      >
                        {tone.charAt(0).toUpperCase() + tone.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={!selectedType || !form.name || generating}
                  className="w-full"
                >
                  {generating ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Document
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Generated Document */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Generated Document</h2>
              {generatedDoc && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <Card className="min-h-[500px]">
              <CardContent className="p-6">
                {generatedDoc ? (
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {generatedDoc}
                    </pre>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <FileText className="h-12 w-12 text-[var(--muted-foreground)] mb-4" />
                    <p className="text-[var(--muted-foreground)]">
                      Select a document type and fill in your information to generate
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
