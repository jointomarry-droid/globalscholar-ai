import type { Scholarship, ScholarshipFilters, PaginatedResponse, ApiResponse } from "@/types";

export interface ScholarshipRepository {
  findById(id: string): Promise<Scholarship | null>;
  findBySlug(slug: string): Promise<Scholarship | null>;
  search(filters: ScholarshipFilters): Promise<PaginatedResponse<Scholarship>>;
  create(data: Omit<Scholarship, "id" | "createdAt" | "updatedAt">): Promise<Scholarship>;
  update(id: string, data: Partial<Scholarship>): Promise<Scholarship>;
  delete(id: string): Promise<void>;
  count(filters?: Partial<ScholarshipFilters>): Promise<number>;
  findByIds(ids: string[]): Promise<Scholarship[]>;
}

// Mock repository for development
export class MockScholarshipRepository implements ScholarshipRepository {
  private data: Map<string, Scholarship> = new Map();

  constructor() {
    // Seed with mock data
    const mockData = this.getMockData();
    mockData.forEach((s) => this.data.set(s.id, s));
  }

  async findById(id: string): Promise<Scholarship | null> {
    return this.data.get(id) ?? null;
  }

  async findBySlug(slug: string): Promise<Scholarship | null> {
    return Array.from(this.data.values()).find((s) => s.slug === slug) ?? null;
  }

  async search(filters: ScholarshipFilters): Promise<PaginatedResponse<Scholarship>> {
    let results = Array.from(this.data.values());

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.universityName.toLowerCase().includes(q) ||
          s.country.toLowerCase().includes(q)
      );
    }

    if (filters.country) {
      results = results.filter((s) => s.country === filters.country);
    }

    if (filters.degree) {
      results = results.filter((s) => s.degree === filters.degree);
    }

    if (filters.funding) {
      results = results.filter((s) => s.funding === filters.funding);
    }

    if (filters.field) {
      results = results.filter((s) => s.field === filters.field);
    }

    // Sort
    const sortBy = filters.sortBy || "matchScore";
    const sortOrder = filters.sortOrder || "desc";
    results.sort((a, b) => {
      const aVal = a[sortBy] ?? "";
      const bVal = b[sortBy] ?? "";
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortOrder === "asc" ? cmp : -cmp;
    });

    const page = filters.page || 1;
    const limit = filters.limit || 12;
    const start = (page - 1) * limit;
    const paginatedResults = results.slice(start, start + limit);

    return {
      data: paginatedResults,
      total: results.length,
      page,
      limit,
      totalPages: Math.ceil(results.length / limit),
    };
  }

  async create(data: Omit<Scholarship, "id" | "createdAt" | "updatedAt">): Promise<Scholarship> {
    const id = `scholarship-${Date.now()}`;
    const now = new Date().toISOString();
    const scholarship: Scholarship = { ...data, id, createdAt: now, updatedAt: now };
    this.data.set(id, scholarship);
    return scholarship;
  }

  async update(id: string, data: Partial<Scholarship>): Promise<Scholarship> {
    const existing = this.data.get(id);
    if (!existing) throw new Error(`Scholarship ${id} not found`);
    const updated = { ...existing, ...data, updatedAt: new Date().toISOString() };
    this.data.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.data.delete(id);
  }

  async count(filters?: Partial<ScholarshipFilters>): Promise<number> {
    if (!filters) return this.data.size;
    const result = await this.search({ ...filters, limit: 1, page: 1 });
    return result.total;
  }

  async findByIds(ids: string[]): Promise<Scholarship[]> {
    return ids.map((id) => this.data.get(id)).filter(Boolean) as Scholarship[];
  }

  private getMockData(): Scholarship[] {
    return [
      {
        id: "1",
        title: "Erasmus Mundus Joint Master Degree",
        slug: "erasus-mundus-joint-master",
        description: "Full scholarship for international students to study in Europe.",
        aiSummary: "Prestigious EU-funded program covering tuition, living costs, and travel.",
        universityId: "eu",
        universityName: "European University Consortium",
        country: "Germany",
        countryCode: "DE",
        city: "Berlin",
        degree: "masters",
        field: "Computer Science",
        funding: "fully_funded",
        fundingAmount: "€1,400/month",
        deadline: "2026-03-15",
        eligibility: [],
        benefits: ["Full tuition", "Monthly stipend"],
        documentsRequired: ["Transcript", "CV"],
        applicationUrl: "https://erasmus-plus.europa.eu",
        languageRequirements: ["English B2"],
        internationalStudents: true,
        renewable: false,
        matchScore: 95,
        verified: true,
        source: "university",
        tags: ["europe", "fully funded"],
        seoTitle: "Erasmus Mundus 2026",
        seoDescription: "Erasmus Mundus scholarship",
        seoKeywords: ["erasus mundus"],
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
        expiresAt: "2026-03-15",
      },
    ];
  }
}

// Factory
let repoInstance: ScholarshipRepository | null = null;

export function getScholarshipRepository(): ScholarshipRepository {
  if (!repoInstance) {
    repoInstance = new MockScholarshipRepository();
  }
  return repoInstance;
}
