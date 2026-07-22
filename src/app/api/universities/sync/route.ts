import { NextResponse } from "next/server";

// HipoLabs University Domains List API integration
const HIPO_API_BASE = "https://universities.hipolabs.com";

export interface ExternalUniversity {
  name: string;
  country: string;
  domains: string[];
  web_pages: string[];
  "alpha-two_code": string;
  "state-province": string | null;
}

export interface EnrichedUniversity extends ExternalUniversity {
  id: string;
  slug: string;
  logo: string;
  description: string;
  ranking: number | null;
  accreditation: string[];
  verified: boolean;
  scholarshipCount: number;
  studentCount: number | null;
  foundedYear: number | null;
  type: "public" | "private" | "community" | "research";
  specialties: string[];
  tuitionRange: string;
  acceptanceRate: number | null;
  internationalStudentPercentage: number | null;
  languageRequirements: string[];
  applicationDeadline: string | null;
  createdAt: string;
  updatedAt: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferUniversityType(name: string): "public" | "private" | "community" | "research" {
  const lower = name.toLowerCase();
  if (lower.includes("institute of technology") || lower.includes("research") || lower.includes("national laboratory")) return "research";
  if (lower.includes("university of") || lower.includes("national") || lower.includes("state")) return "public";
  if (lower.includes("community") || lower.includes("college")) return "community";
  return "private";
}

function inferSpecialties(name: string): string[] {
  const lower = name.toLowerCase();
  const specialties: string[] = [];

  if (lower.includes("tech") || lower.includes("engineering")) specialties.push("Engineering", "Technology");
  if (lower.includes("medical") || lower.includes("health")) specialties.push("Medicine", "Health Sciences");
  if (lower.includes("business") || lower.includes("management")) specialties.push("Business", "Management");
  if (lower.includes("arts") || lower.includes("liberal")) specialties.push("Arts", "Humanities");
  if (lower.includes("science")) specialties.push("Sciences");
  if (lower.includes("law")) specialties.push("Law");
  if (lower.includes("education")) specialties.push("Education");
  if (lower.includes("agriculture")) specialties.push("Agriculture");

  if (specialties.length === 0) specialties.push("General Studies");
  return specialties;
}

// GET /api/universities/sync - Fetch and enrich universities from HipoLabs
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const country = url.searchParams.get("country");
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const search = url.searchParams.get("search");

    let apiUrl = `${HIPO_API_BASE}/search`;
    const params = new URLSearchParams();
    if (country) params.set("country", country);
    if (search) params.set("name", search);
    if (params.toString()) apiUrl += `?${params.toString()}`;

    const response = await fetch(apiUrl, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`HipoLabs API error: ${response.status}`);
    }

    const data: ExternalUniversity[] = await response.json();

    // Enrich and transform the data
    const enriched: EnrichedUniversity[] = data.slice(0, limit).map((uni, index) => ({
      ...uni,
      id: `hipo-${index}-${slugify(uni.name)}`,
      slug: slugify(uni.name),
      logo: uni.web_pages[0] ? `https://logo.clearbit.com/${uni.domains[0] || "example.com"}` : "",
      description: `${uni.name} is a higher education institution located in ${uni["state-province"] || uni.country}.`,
      ranking: null,
      accreditation: [],
      verified: false,
      scholarshipCount: 0,
      studentCount: null,
      foundedYear: null,
      type: inferUniversityType(uni.name),
      specialties: inferSpecialties(uni.name),
      tuitionRange: "Contact for details",
      acceptanceRate: null,
      internationalStudentPercentage: null,
      languageRequirements: ["English"],
      applicationDeadline: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: enriched,
      source: "HipoLabs University Domains List",
      pagination: {
        total: data.length,
        returned: enriched.length,
        limit,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch universities" },
      { status: 500 }
    );
  }
}
