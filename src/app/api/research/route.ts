import { NextResponse } from "next/server";

// OpenAlex Research API Integration
// https://openalex.org - Free academic research data

const OPENALEX_API = "https://api.openalex.org";

export interface ResearchInstitution {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  type: string;
  homepageUrl: string;
  logoUrl: string;
  worksCount: number;
  citedByCount: number;
  studentsCount: number | null;
  facultiesCount: number | null;
  internationalStudents: number | null;
  ranking: number | null;
  summary: string;
}

export interface ResearchWork {
  id: string;
  title: string;
  publicationYear: number;
  journal: string;
  authors: string[];
  citedByCount: number;
  abstract: string;
  openAccess: boolean;
  concepts: string[];
}

export interface ResearchAuthor {
  id: string;
  name: string;
  institution: string;
  country: string;
  worksCount: number;
  citedByCount: number;
  hIndex: number;
  i10Index: number;
  summary: string;
}

// GET /api/research/institutions - Search institutions
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "institutions";
    const search = url.searchParams.get("search");
    const country = url.searchParams.get("country");
    const limit = parseInt(url.searchParams.get("limit") || "25");

    let apiUrl = `${OPENALEX_API}/${type}`;
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (country) params.set("filter", `country_code:${country}`);
    params.set("per_page", String(limit));

    const queryString = params.toString();
    if (queryString) apiUrl += `?${queryString}`;

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "GlobalScholarAI/1.0 (mailto:info@globalscholar.ai)",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`OpenAlex API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform OpenAlex data to our format
    const results = data.results?.map((item: Record<string, unknown>) => ({
      id: item.id as string,
      name: item.display_name as string,
      country: (item.country as string) || "Unknown",
      countryCode: (item.country_code as string) || "",
      type: (item.type as string) || "institution",
      homepageUrl: item.homepage_url as string,
      logoUrl: item.logo_url as string,
      worksCount: (item.works_count as number) || 0,
      citedByCount: (item.cited_by_count as number) || 0,
      studentsCount: (item.students_count as number) || null,
      facultiesCount: (item.faculties_count as number) || null,
      internationalStudents: (item.international_students as number) || null,
      ranking: (item.rank as number) || null,
      summary: `${item.display_name} is a research institution with ${(item.works_count as number || 0).toLocaleString()} publications.`,
    })) || [];

    return NextResponse.json({
      success: true,
      data: results,
      meta: {
        source: "OpenAlex",
        totalResults: data.meta?.count || 0,
        perPage: limit,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch research data" },
      { status: 500 }
    );
  }
}
