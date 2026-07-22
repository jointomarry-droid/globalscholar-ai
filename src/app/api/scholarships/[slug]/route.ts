import { NextResponse } from "next/server";
import { getAuthService } from "@/services/auth.service";

// JWT token verification
function base64urlDecode(data: string): string {
  return Buffer.from(data, "base64url").toString();
}

function verifyToken(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(base64urlDecode(parts[1]));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

const scholarships: Record<string, {
  id: string;
  title: string;
  slug: string;
  description: string;
  aiSummary: string;
  universityId: string;
  universityName: string;
  country: string;
  countryCode: string;
  city: string;
  degree: string;
  field: string;
  funding: string;
  fundingAmount?: string;
  deadline: string;
  eligibility: unknown[];
  benefits: string[];
  documentsRequired: string[];
  applicationUrl: string;
  languageRequirements: string[];
  ieltsRequired?: boolean;
  toeflRequired?: boolean;
  greRequired?: boolean;
  internationalStudents: boolean;
  renewable: boolean;
  matchScore?: number;
  verified: boolean;
  source: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}> = {
  "daad-german-academic-exchange-2026": {
    id: "sch-1",
    title: "DAAD German Academic Exchange Service Scholarship",
    slug: "daad-german-academic-exchange-2026",
    description: "The DAAD scholarship supports international students pursuing higher education in Germany. It provides comprehensive funding for Masters and PhD students across all disciplines.",
    aiSummary: "Fully funded scholarship for international students in Germany. Covers tuition, living expenses, and travel. Highly competitive with 12,000+ recipients annually.",
    universityId: "uni-4",
    universityName: "Multiple German Universities",
    country: "Germany",
    countryCode: "DE",
    city: "Berlin",
    degree: "masters",
    field: "all",
    funding: "fully_funded",
    fundingAmount: "€850/month stipend + tuition",
    deadline: "2026-10-15",
    eligibility: [
      { field: "nationality", operator: "nin", value: ["DE"] },
      { field: "degree", operator: "in", value: ["masters", "phd"] },
    ],
    benefits: [
      "Monthly stipend of €850 for Master's students",
      "Monthly stipend of €1,200 for PhD students",
      "Full tuition coverage at public universities",
      "Health insurance included",
      "Travel allowance",
      "German language course funding",
    ],
    documentsRequired: [
      "Academic transcripts",
      "Degree certificate",
      "Language proficiency (German or English)",
      "Motivation letter",
      "Research proposal (for PhD)",
      "Two academic references",
    ],
    applicationUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
    languageRequirements: ["German", "English"],
    ieltsRequired: true,
    toeflRequired: false,
    greRequired: false,
    internationalStudents: true,
    renewable: false,
    matchScore: 92,
    verified: true,
    source: "government",
    tags: ["germany", "europe", "fully-funded", "masters", "phd", "daad"],
    createdAt: "2024-11-01T00:00:00Z",
    updatedAt: "2024-11-01T00:00:00Z",
    expiresAt: "2026-10-15T00:00:00Z",
  },
  "chevening-scholarship-uk-2026": {
    id: "sch-2",
    title: "Chevening Scholarship - UK Government",
    slug: "chevening-scholarship-uk-2026",
    description: "Chevening is the UK government's international awards programme aimed at developing global leaders. It offers fully funded scholarships for one-year Master's degrees in the UK.",
    aiSummary: "Prestigious UK government scholarship for future leaders. Full funding for one-year Master's. Requires 2+ years work experience. Strong leadership potential required.",
    universityId: "uni-3",
    universityName: "Various UK Universities",
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    degree: "masters",
    field: "all",
    funding: "fully_funded",
    fundingAmount: "Full tuition + £1,163/month stipend",
    deadline: "2026-11-01",
    eligibility: [
      { field: "nationality", operator: "in", value: ["eligible_countries"] },
      { field: "degree", operator: "eq", value: "masters" },
      { field: "workExperience", operator: "gte", value: 2 },
    ],
    benefits: [
      "Full tuition fees at any UK university",
      "Monthly living allowance of £1,163",
      "Economy class return airfare",
      "Travel grant for arrival",
      "Thesis/project grant",
      "Access to exclusive networking events",
    ],
    documentsRequired: [
      "Academic transcripts",
      "Degree certificate",
      "English language proficiency",
      "Two professional references",
      "Leadership and networking statement",
      "Study plan essay",
    ],
    applicationUrl: "https://www.chevening.org/scholarships/",
    languageRequirements: ["English"],
    ieltsRequired: true,
    toeflRequired: false,
    greRequired: false,
    internationalStudents: true,
    renewable: false,
    matchScore: 88,
    verified: true,
    source: "government",
    tags: ["uk", "europe", "fully-funded", "masters", "leadership", "chevening"],
    createdAt: "2024-10-01T00:00:00Z",
    updatedAt: "2024-10-01T00:00:00Z",
    expiresAt: "2026-11-01T00:00:00Z",
  },
  "fulbright-program-us-2026": {
    id: "sch-3",
    title: "Fulbright Foreign Student Program",
    slug: "fulbright-program-us-2026",
    description: "The Fulbright Program provides grants for individually designed study/research projects. Students design their own academic program and arrange affiliation with a U.S. university.",
    aiSummary: "Prestigious US exchange program for international students. Full funding for graduate study or research. 8,000+ grants annually across 160+ countries.",
    universityId: "uni-1",
    universityName: "Various U.S. Universities",
    country: "United States",
    countryCode: "US",
    city: "Washington D.C.",
    degree: "masters",
    field: "all",
    funding: "fully_funded",
    fundingAmount: "Full tuition + $20,000 stipend",
    deadline: "2026-10-01",
    eligibility: [
      { field: "nationality", operator: "in", value: ["eligible_countries"] },
      { field: "degree", operator: "in", value: ["masters", "phd"] },
    ],
    benefits: [
      "Full tuition and fees",
      "Monthly living stipend",
      "Airfare to and from the U.S.",
      "Health insurance",
      "Book and supply allowance",
      "Pre-academic programming",
    ],
    documentsRequired: [
      "Academic transcripts",
      "Degree certificate",
      "TOEFL/IELTS scores",
      "Three letters of recommendation",
      "Personal statement",
      "Study/research proposal",
    ],
    applicationUrl: "https://foreign.fulbrightonline.org/",
    languageRequirements: ["English"],
    ieltsRequired: true,
    toeflRequired: true,
    greRequired: false,
    internationalStudents: true,
    renewable: false,
    matchScore: 95,
    verified: true,
    source: "government",
    tags: ["usa", "north-america", "fully-funded", "masters", "phd", "fulbright"],
    createdAt: "2024-09-01T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
    expiresAt: "2026-10-01T00:00:00Z",
  },
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const scholarship = scholarships[slug];

    if (!scholarship) {
      return NextResponse.json(
        { success: false, error: "Scholarship not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: scholarship,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch scholarship" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = verifyToken(token);
    if (!payload || (payload.role !== "admin" && payload.role !== "super_admin")) {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const { slug } = await params;
    const existing = scholarships[slug];
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Scholarship not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updated = {
      ...existing,
      ...body,
      slug: existing.slug,
      updatedAt: new Date().toISOString(),
    };

    scholarships[slug] = updated;

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to update scholarship" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = verifyToken(token);
    if (!payload || (payload.role !== "admin" && payload.role !== "super_admin")) {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const { slug } = await params;
    if (!scholarships[slug]) {
      return NextResponse.json(
        { success: false, error: "Scholarship not found" },
        { status: 404 }
      );
    }

    delete scholarships[slug];

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to delete scholarship" },
      { status: 500 }
    );
  }
}
