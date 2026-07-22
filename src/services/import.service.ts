import type { Scholarship, ImportJob, ScholarshipSource } from "@/types";

export interface ImportConfig {
  source: string;
  format: "csv" | "excel" | "json" | "xml" | "rss" | "api";
  url?: string;
  headers?: Record<string, string>;
  mapping?: Record<string, string>;
}

export interface ImportResult {
  job: ImportJob;
  scholarships: Scholarship[];
  errors: string[];
}

export interface ImportEngine {
  importFromCSV(file: File, config?: Partial<ImportConfig>): Promise<ImportResult>;
  importFromJSON(data: string, config?: Partial<ImportConfig>): Promise<ImportResult>;
  importFromAPI(url: string, config?: Partial<ImportConfig>): Promise<ImportResult>;
  importFromRSS(url: string): Promise<ImportResult>;
  validateAndNormalize(data: Record<string, unknown>[], config?: ImportConfig): Scholarship[];
  detectDuplicates(scholarships: Scholarship[]): Promise<Scholarship[]>;
}

// CSV Parser
function parseCSV(text: string): Record<string, string>[] {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i] || "";
    });
    return row;
  });
}

// Field mapping (flexible CSV column names → standard fields)
const defaultFieldMapping: Record<string, string> = {
  title: "title",
  name: "title",
  scholarship_name: "title",
  university: "universityName",
  university_name: "universityName",
  institution: "universityName",
  country: "country",
  nation: "country",
  city: "city",
  location: "city",
  degree: "degree",
  degree_level: "degree",
  level: "degree",
  field: "field",
  field_of_study: "field",
  subject: "field",
  funding: "funding",
  funding_type: "funding",
  type: "funding",
  amount: "fundingAmount",
  funding_amount: "fundingAmount",
  stipend: "fundingAmount",
  deadline: "deadline",
  closing_date: "deadline",
  application_deadline: "deadline",
  url: "applicationUrl",
  link: "applicationUrl",
  application_url: "applicationUrl",
  website: "applicationUrl",
  description: "description",
  summary: "description",
  benefits: "benefits",
  perks: "benefits",
  documents: "documentsRequired",
  requirements: "documentsRequired",
  ielts: "ieltsRequired",
  toefl: "toeflRequired",
  gre: "greRequired",
  international: "internationalStudents",
  verified: "verified",
  source: "source",
  tags: "tags",
};

// Normalize raw data to Scholarship format
function normalizeRecord(
  raw: Record<string, string>,
  source: ScholarshipSource
): Partial<Scholarship> {
  const mapped: Record<string, string> = {};

  for (const [rawKey, value] of Object.entries(raw)) {
    const stdKey = defaultFieldMapping[rawKey.toLowerCase().replace(/\s+/g, "_")];
    if (stdKey && value) {
      mapped[stdKey] = value;
    }
  }

  const title = mapped.title || "Untitled Scholarship";
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    title,
    slug,
    description: mapped.description || "",
    aiSummary: "",
    universityId: "",
    universityName: mapped.universityName || "Unknown University",
    country: mapped.country || "Unknown",
    countryCode: "",
    city: mapped.city || "",
    degree: (mapped.degree as Scholarship["degree"]) || "masters",
    field: mapped.field || "All Fields",
    funding: (mapped.funding as Scholarship["funding"]) || "partial",
    fundingAmount: mapped.fundingAmount || undefined,
    deadline: mapped.deadline || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    eligibility: [],
    benefits: mapped.benefits ? mapped.benefits.split(";").map((b) => b.trim()) : [],
    documentsRequired: mapped.documentsRequired
      ? mapped.documentsRequired.split(";").map((d) => d.trim())
      : [],
    applicationUrl: mapped.applicationUrl || "",
    languageRequirements: [],
    ieltsRequired: mapped.ieltsRequired === "true" || mapped.ieltsRequired === "yes",
    toeflRequired: mapped.toeflRequired === "true" || mapped.toeflRequired === "yes",
    greRequired: mapped.greRequired === "true" || mapped.greRequired === "yes",
    internationalStudents: mapped.internationalStudents !== "false",
    renewable: false,
    verified: source === "university" || source === "government",
    source,
    tags: mapped.tags ? mapped.tags.split(",").map((t) => t.trim()) : [],
    seoTitle: title,
    seoDescription: mapped.description || title,
    seoKeywords: [title, mapped.universityName, mapped.country].filter(Boolean),
    expiresAt: mapped.deadline || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

export class DefaultImportEngine implements ImportEngine {
  async importFromCSV(file: File, config?: Partial<ImportConfig>): Promise<ImportResult> {
    const text = await file.text();
    const rows = parseCSV(text);
    const scholarships = this.validateAndNormalize(rows, {
      source: config?.source || "import",
      format: "csv",
      ...config,
    });

    return {
      job: this.createJob(config?.source || "csv-import", "csv", rows.length, scholarships.length),
      scholarships,
      errors: [],
    };
  }

  async importFromJSON(data: string, config?: Partial<ImportConfig>): Promise<ImportResult> {
    try {
      const parsed = JSON.parse(data);
      const rows = Array.isArray(parsed) ? parsed : [parsed];
      const scholarships = this.validateAndNormalize(rows, {
        source: config?.source || "import",
        format: "json",
        ...config,
      });

      return {
        job: this.createJob(config?.source || "json-import", "json", rows.length, scholarships.length),
        scholarships,
        errors: [],
      };
    } catch (e) {
      return {
        job: this.createJob(config?.source || "json-import", "json", 0, 0),
        scholarships: [],
        errors: [`JSON parse error: ${e}`],
      };
    }
  }

  async importFromAPI(url: string, config?: Partial<ImportConfig>): Promise<ImportResult> {
    try {
      const response = await fetch(url, {
        headers: config?.headers || {},
      });
      if (!response.ok) throw new Error(`API returned ${response.status}`);

      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("json")) {
        const data = await response.json();
        return this.importFromJSON(JSON.stringify(data), config);
      } else {
        const text = await response.text();
        const rows = parseCSV(text);
        const scholarships = this.validateAndNormalize(rows, {
          source: config?.source || "api",
          format: "api",
          ...config,
        });
        return {
          job: this.createJob(url, "api", rows.length, scholarships.length),
          scholarships,
          errors: [],
        };
      }
    } catch (e) {
      return {
        job: this.createJob(url, "api", 0, 0),
        scholarships: [],
        errors: [`API fetch error: ${e}`],
      };
    }
  }

  async importFromRSS(url: string): Promise<ImportResult> {
    try {
      const response = await fetch(url);
      const text = await response.text();

      // Simple RSS XML parsing
      const items = text.match(/<item>([\s\S]*?)<\/item>/g) || [];
      const scholarships: Scholarship[] = [];

      for (const item of items) {
        const title = item.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "";
        const link = item.match(/<link>([\s\S]*?)<\/link>/)?.[1] || "";
        const description = item.match(/<description>([\s\S]*?)<\/description>/)?.[1] || "";

        if (title) {
          const normalized = normalizeRecord(
            { title, description, url: link },
            "import"
          );
          scholarships.push(normalized as Scholarship);
        }
      }

      return {
        job: this.createJob(url, "rss", items.length, scholarships.length),
        scholarships,
        errors: [],
      };
    } catch (e) {
      return {
        job: this.createJob(url, "rss", 0, 0),
        scholarships: [],
        errors: [`RSS fetch error: ${e}`],
      };
    }
  }

  validateAndNormalize(data: Record<string, unknown>[], config?: ImportConfig): Scholarship[] {
    const source = (config?.source as ScholarshipSource) || "import";
    const scholarships: Scholarship[] = [];

    for (const row of data) {
      try {
        const normalized = normalizeRecord(row as Record<string, string>, source);
        if (normalized.title && normalized.title !== "Untitled Scholarship") {
          scholarships.push(normalized as Scholarship);
        }
      } catch {
        // Skip invalid records
      }
    }

    return scholarships;
  }

  async detectDuplicates(scholarships: Scholarship[]): Promise<Scholarship[]> {
    const seen = new Map<string, Scholarship>();
    const duplicates: Scholarship[] = [];

    for (const s of scholarships) {
      const key = `${s.title.toLowerCase()}-${s.universityName.toLowerCase()}-${s.country.toLowerCase()}`;
      if (seen.has(key)) {
        duplicates.push(s);
      } else {
        seen.set(key, s);
      }
    }

    return duplicates;
  }

  private createJob(
    source: string,
    format: ImportConfig["format"],
    total: number,
    success: number
  ): ImportJob {
    return {
      id: `import-${Date.now()}`,
      source,
      format,
      status: "completed",
      totalRecords: total,
      processedRecords: total,
      successRecords: success,
      errorRecords: total - success,
      errors: [],
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
  }
}

// Factory
let importEngineInstance: ImportEngine | null = null;

export function getImportEngine(): ImportEngine {
  if (!importEngineInstance) {
    importEngineInstance = new DefaultImportEngine();
  }
  return importEngineInstance;
}
