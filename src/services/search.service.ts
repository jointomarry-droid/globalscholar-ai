import type { Scholarship, ScholarshipFilters, PaginatedResponse } from "@/types";

export interface SearchService {
  indexScholarship(scholarship: Scholarship): Promise<void>;
  indexScholarships(scholarships: Scholarship[]): Promise<void>;
  search(query: string, filters?: ScholarshipFilters): Promise<PaginatedResponse<Scholarship>>;
  deleteIndex(id: string): Promise<void>;
  rebuildIndex(): Promise<void>;
}

// Meilisearch implementation
export class MeilisearchService implements SearchService {
  private client: MeilisearchClient;
  private indexName = "scholarships";

  constructor(host: string, apiKey: string) {
    this.client = new MeilisearchClient(host, apiKey);
  }

  async indexScholarship(scholarship: Scholarship): Promise<void> {
    await this.client.index(this.indexName).addDocuments([scholarship]);
  }

  async indexScholarships(scholarships: Scholarship[]): Promise<void> {
    await this.client.index(this.indexName).addDocuments(scholarships);
  }

  async search(query: string, filters?: ScholarshipFilters): Promise<PaginatedResponse<Scholarship>> {
    const searchParams: Record<string, unknown> = {
      q: query,
      limit: filters?.limit || 12,
      offset: ((filters?.page || 1) - 1) * (filters?.limit || 12),
    };

    // Build filter string
    const filterParts: string[] = [];
    if (filters?.country) filterParts.push(`country = "${filters.country}"`);
    if (filters?.degree) filterParts.push(`degree = "${filters.degree}"`);
    if (filters?.funding) filterParts.push(`funding = "${filters.funding}"`);
    if (filters?.field) filterParts.push(`field = "${filters.field}"`);

    if (filterParts.length > 0) {
      searchParams.filter = filterParts.join(" AND ");
    }

    const result = await this.client.index(this.indexName).search(searchParams);

    return {
      data: result.hits as Scholarship[],
      total: result.estimatedTotalHits || result.hits.length,
      page: filters?.page || 1,
      limit: filters?.limit || 12,
      totalPages: Math.ceil((result.estimatedTotalHits || result.hits.length) / (filters?.limit || 12)),
    };
  }

  async deleteIndex(id: string): Promise<void> {
    await this.client.index(this.indexName).deleteDocument(id);
  }

  async rebuildIndex(): Promise<void> {
    await this.client.index(this.indexName).deleteAllDocuments();
  }
}

// Lightweight Meilisearch client
class MeilisearchClient {
  private host: string;
  private apiKey: string;

  constructor(host: string, apiKey: string) {
    this.host = host;
    this.apiKey = apiKey;
  }

  index(name: string) {
    const host = this.host;
    const apiKey = this.apiKey;
    return {
      async addDocuments(documents: unknown[]) {
        const res = await fetch(`${host}/indexes/${name}/documents`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(documents),
        });
        if (!res.ok) throw new Error(`Meilisearch: ${res.statusText}`);
        return res.json();
      },

      async search(params: Record<string, unknown>) {
        const res = await fetch(`${host}/indexes/${name}/search`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });
        if (!res.ok) throw new Error(`Meilisearch: ${res.statusText}`);
        return res.json();
      },

      async deleteDocument(id: string) {
        const res = await fetch(`${host}/indexes/${name}/documents/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${apiKey}` },
        });
        if (!res.ok) throw new Error(`Meilisearch: ${res.statusText}`);
      },

      async deleteAllDocuments() {
        const res = await fetch(`${host}/indexes/${name}/documents`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${apiKey}` },
        });
        if (!res.ok) throw new Error(`Meilisearch: ${res.statusText}`);
      },

      async updateSettings(settings: Record<string, unknown>) {
        const res = await fetch(`${host}/indexes/${name}/settings`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settings),
        });
        if (!res.ok) throw new Error(`Meilisearch: ${res.statusText}`);
        return res.json();
      },
    };
  }
}

// In-memory search fallback for development
export class InMemorySearchService implements SearchService {
  private scholarships: Scholarship[] = [];

  async indexScholarship(scholarship: Scholarship): Promise<void> {
    const idx = this.scholarships.findIndex((s) => s.id === scholarship.id);
    if (idx >= 0) this.scholarships[idx] = scholarship;
    else this.scholarships.push(scholarship);
  }

  async indexScholarships(scholarships: Scholarship[]): Promise<void> {
    for (const s of scholarships) {
      await this.indexScholarship(s);
    }
  }

  async search(query: string, filters?: ScholarshipFilters): Promise<PaginatedResponse<Scholarship>> {
    let results = [...this.scholarships];

    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.universityName.toLowerCase().includes(q) ||
          s.country.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    if (filters?.country) results = results.filter((s) => s.country === filters.country);
    if (filters?.degree) results = results.filter((s) => s.degree === filters.degree);
    if (filters?.funding) results = results.filter((s) => s.funding === filters.funding);
    if (filters?.field) results = results.filter((s) => s.field === filters.field);

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const start = (page - 1) * limit;

    return {
      data: results.slice(start, start + limit),
      total: results.length,
      page,
      limit,
      totalPages: Math.ceil(results.length / limit),
    };
  }

  async deleteIndex(id: string): Promise<void> {
    this.scholarships = this.scholarships.filter((s) => s.id !== id);
  }

  async rebuildIndex(): Promise<void> {
    this.scholarships = [];
  }
}

// Factory
let searchInstance: SearchService | null = null;

export function getSearchService(): SearchService {
  if (!searchInstance) {
    const host = process.env.MEILISEARCH_HOST;
    const apiKey = process.env.MEILISEARCH_API_KEY;

    if (host && apiKey) {
      searchInstance = new MeilisearchService(host, apiKey);
    } else {
      searchInstance = new InMemorySearchService();
    }
  }
  return searchInstance;
}
