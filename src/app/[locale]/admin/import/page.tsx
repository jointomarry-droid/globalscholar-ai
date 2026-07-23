"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Download,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

type ImportStatus = "idle" | "uploading" | "processing" | "completed" | "failed";

interface ImportResult {
  totalProcessed: number;
  uniqueCount: number;
  duplicateCount: number;
  errors: string[];
}

export default function AdminImportPage() {
  const [status, setStatus] = useState<ImportStatus>("idle");
  const [result, setResult] = useState<ImportResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setStatus("uploading");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("format", selectedFile.name.endsWith(".csv") ? "csv" : "json");
      formData.append("source", "admin-import");

      const response = await fetch("/api/import", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
        setStatus("completed");
      } else {
        setStatus("failed");
      }
    } catch (error) {
      console.error("Import failed:", error);
      setStatus("failed");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setResult(null);
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold">Import Scholarships</h1>
              <p className="text-xs text-[var(--muted-foreground)]">
                Upload CSV, JSON, or Excel files to import scholarships
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {["Upload", "Review", "Complete"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  status === "idle" && i === 0
                    ? "bg-[var(--primary)] text-white"
                    : status === "completed" && i === 2
                    ? "bg-[var(--success)] text-white"
                    : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
                }`}
              >
                {i + 1}
              </div>
              <span className="text-sm font-medium">{step}</span>
              {i < 2 && <ChevronRight className="h-4 w-4 text-[var(--muted-foreground)]" />}
            </div>
          ))}
        </div>

        {/* Upload Area */}
        {status === "idle" && (
          <Card>
            <CardContent className="p-8">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                  dragActive
                    ? "border-[var(--primary)] bg-[var(--accent)]"
                    : "border-[var(--border)] hover:border-[var(--primary)]/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.json,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Upload className="h-12 w-12 text-[var(--muted-foreground)] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {selectedFile ? selectedFile.name : "Drop your file here"}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                  {selectedFile
                    ? `${(selectedFile.size / 1024).toFixed(1)} KB ready to upload`
                    : "or click to browse. Supports CSV, JSON, and Excel files."}
                </p>
                <div className="flex justify-center gap-2">
                  <Badge variant="outline">CSV</Badge>
                  <Badge variant="outline">JSON</Badge>
                  <Badge variant="outline">Excel</Badge>
                </div>
              </div>

              {selectedFile && (
                <div className="mt-6 flex justify-center gap-3">
                  <Button onClick={handleImport}>
                    <Upload className="h-4 w-4 mr-2" />
                    Start Import
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedFile(null)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove File
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Processing */}
        {status === "uploading" && (
          <Card>
            <CardContent className="p-12 text-center">
              <Loader2 className="h-12 w-12 text-[var(--primary)] mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-semibold mb-2">Importing...</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Processing your file and validating data
              </p>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {status === "completed" && result && (
          <div className="space-y-6">
            <Card className="border-[var(--success)]/20 bg-[var(--success)]/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-[var(--success)]" />
                  <h3 className="text-lg font-semibold">Import Completed!</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-[var(--background)]">
                    <p className="text-2xl font-bold">{result.totalProcessed}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Total Records</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-[var(--background)]">
                    <p className="text-2xl font-bold text-[var(--success)]">{result.uniqueCount}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Unique Added</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-[var(--background)]">
                    <p className="text-2xl font-bold text-[var(--warning)]">{result.duplicateCount}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Duplicates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {result.errors.length > 0 && (
              <Card className="border-[var(--destructive)]/20">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-[var(--destructive)]" />
                    Errors ({result.errors.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {result.errors.map((err, i) => (
                      <p key={i} className="text-xs text-[var(--destructive)]">{err}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-center gap-3">
              <Button asChild>
                <Link href="/admin">View in Dashboard</Link>
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Import More
              </Button>
            </div>
          </div>
        )}

        {/* Failed */}
        {status === "failed" && (
          <Card className="border-[var(--destructive)]/20">
            <CardContent className="p-12 text-center">
              <AlertCircle className="h-12 w-12 text-[var(--destructive)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Import Failed</h3>
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                Something went wrong during the import process.
              </p>
              <Button onClick={handleReset}>Try Again</Button>
            </CardContent>
          </Card>
        )}

        {/* Template Downloads */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-base">Download Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              Use these templates to format your data correctly before importing.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                CSV Template
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                JSON Template
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Excel Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
