import { NextRequest, NextResponse } from "next/server";
import { getScholarshipRepository } from "@/repositories/scholarship.repository";
import { getSearchService } from "@/services/search.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = {
      search: searchParams.get("search") || undefined,
      country: searchParams.get("country") || undefined,
      degree: searchParams.get("degree") as "bachelors" | "masters" | "phd" | "diploma" | undefined,
      funding: searchParams.get("funding") as "fully_funded" | "partial" | "tuition_only" | undefined,
      field: searchParams.get("field") || undefined,
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "12"),
      sortBy: (searchParams.get("sortBy") || "matchScore") as "matchScore" | "deadline" | "title",
      sortOrder: (searchParams.get("sortOrder") || "desc") as "asc" | "desc",
    };

    // Use search service if query exists, otherwise use repository
    let result;
    if (filters.search) {
      const searchService = getSearchService();
      result = await searchService.search(filters.search, filters);
    } else {
      const repo = getScholarshipRepository();
      result = await repo.search(filters);
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error("Scholarships API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch scholarships" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const repo = getScholarshipRepository();

    const scholarship = await repo.create({
      title: body.title,
      slug: body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      description: body.description || "",
      aiSummary: body.aiSummary || "",
      universityId: body.universityId || "",
      universityName: body.universityName || "",
      country: body.country || "",
      countryCode: body.countryCode || "",
      city: body.city || "",
      degree: body.degree || "masters",
      field: body.field || "All Fields",
      funding: body.funding || "partial",
      fundingAmount: body.fundingAmount,
      deadline: body.deadline,
      eligibility: body.eligibility || [],
      benefits: body.benefits || [],
      documentsRequired: body.documentsRequired || [],
      applicationUrl: body.applicationUrl || "",
      languageRequirements: body.languageRequirements || [],
      ieltsRequired: body.ieltsRequired || false,
      toeflRequired: body.toeflRequired || false,
      greRequired: body.greRequired || false,
      internationalStudents: body.internationalStudents ?? true,
      renewable: body.renewable ?? false,
      verified: false,
      source: body.source || "user_submitted",
      tags: body.tags || [],
      seoTitle: body.title,
      seoDescription: body.description || "",
      seoKeywords: [],
      expiresAt: body.deadline,
    });

    // Index in search engine
    try {
      const searchService = getSearchService();
      await searchService.indexScholarship(scholarship);
    } catch (e) {
      console.error("Search indexing failed:", e);
    }

    return NextResponse.json({
      success: true,
      data: scholarship,
    }, { status: 201 });
  } catch (error) {
    console.error("Scholarship create error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create scholarship" },
      { status: 500 }
    );
  }
}
