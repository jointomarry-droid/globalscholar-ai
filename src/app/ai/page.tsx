"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  FileText,
  Loader2,
  Copy,
  Download,
  RefreshCw,
  Lightbulb,
  PenTool,
  GraduationCap,
  Briefcase,
  BookOpen,
} from "lucide-react";

type EssayType = "sop" | "cover_letter" | "personal_statement" | "scholarship_essay" | "resume";

const essayTypes: Array<{ id: EssayType; label: string; icon: typeof FileText; description: string }> = [
  { id: "sop", label: "Statement of Purpose", icon: FileText, description: "For graduate school applications" },
  { id: "cover_letter", label: "Cover Letter", icon: Briefcase, description: "For job or internship applications" },
  { id: "personal_statement", label: "Personal Statement", icon: PenTool, description: "For university admissions" },
  { id: "scholarship_essay", label: "Scholarship Essay", icon: GraduationCap, description: "For scholarship applications" },
  { id: "resume", label: "Resume/CV", icon: BookOpen, description: "Build or review your resume" },
];

export default function AIEssayPage() {
  const [selectedType, setSelectedType] = useState<EssayType>("sop");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Write a ${essayTypes.find((t) => t.id === selectedType)?.label} based on the following information. Make it professional, compelling, and personalized.\n\n${prompt}`,
          context: { type: "essay" },
        }),
      });

      const result = await response.json();

      if (result.success && result.data?.answer) {
        setOutput(result.data.answer);
        setWordCount(result.data.answer.split(/\s+/).length);
      } else {
        throw new Error(result.error || "Generation failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate essay");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedType}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-btn">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Essay Assistant</h1>
              <p className="text-sm text-[var(--muted-foreground)]">
                Generate professional essays, SOPs, cover letters, and resumes with AI
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            {/* Essay Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">What do you need help with?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {essayTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                        selectedType === type.id
                          ? "border-[var(--primary)] bg-[var(--accent)]"
                          : "border-[var(--border)] hover:border-[var(--primary)]/50"
                      }`}
                    >
                      <type.icon className={`h-5 w-5 ${
                        selectedType === type.id ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"
                      }`} />
                      <div>
                        <p className="text-sm font-medium">{type.label}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{type.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tell me about yourself</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Describe your background, achievements, and goals for your ${essayTypes.find((t) => t.id === selectedType)?.label.toLowerCase()}...`}
                  className="min-h-[200px]"
                />
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                  <Lightbulb className="h-4 w-4" />
                  Include: your field, achievements, goals, and any specific details you want included
                </div>
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <Button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} className="w-full">
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Output */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Generated Output</CardTitle>
                  {output && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{wordCount} words</Badge>
                      <Button variant="ghost" size="sm" onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleDownload}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleGenerate}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {output ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed font-mono bg-[var(--secondary)] p-4 rounded-lg">
                      {output}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <FileText className="h-12 w-12 text-[var(--muted-foreground)] mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Your essay will appear here</h3>
                    <p className="text-sm text-[var(--muted-foreground)] max-w-md">
                      Describe your background and goals, then click Generate to create a professional
                      {essayTypes.find((t) => t.id === selectedType)?.label.toLowerCase()}.
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
