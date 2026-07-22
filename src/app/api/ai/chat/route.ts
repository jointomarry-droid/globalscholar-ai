import { NextRequest, NextResponse } from "next/server";
import { getAIService } from "@/services/ai.service";
import { getScholarshipRepository } from "@/repositories/scholarship.repository";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, profile } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    const aiService = getAIService();
    const repo = getScholarshipRepository();

    // Get all scholarships for matching
    const allScholarships = await repo.search({ limit: 100, page: 1 });
    const scholarshipData = allScholarships.data.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description || s.aiSummary,
      eligibility: [
        s.country,
        s.degree,
        s.funding,
        s.field,
        s.ieltsRequired ? "IELTS required" : "No IELTS",
        s.greRequired ? "GRE required" : "No GRE",
      ].join(", "),
    }));

    // Use AI to match and respond
    const systemPrompt = `You are GlobalScholar AI, the world's most intelligent scholarship advisor.
You help students find scholarships based on their profile and goals.

RULES:
1. Be warm, professional, and encouraging
2. Provide specific scholarship recommendations when possible
3. Always suggest actionable next steps
4. If you find matching scholarships, mention them by name
5. Be honest about eligibility
6. Use markdown formatting for readability

${profile ? `Student Profile:
- Country: ${profile.country || "Unknown"}
- Degree Level: ${profile.educationLevel || "Unknown"}
- GPA: ${profile.gpa || "Unknown"}
- Field: ${profile.field || "Unknown"}
- Languages: ${profile.languages?.join(", ") || "Unknown"}` : ""}`;

    const response = await aiService.generate(message, {
      systemPrompt,
      temperature: 0.7,
      maxTokens: 2048,
    });

    // Try to find matching scholarships
    let matchingScholarships: Array<{ id: string; score: number; reasons: string[] }> = [];
    try {
      matchingScholarships = await aiService.matchScholarships(message, scholarshipData);
    } catch (e) {
      console.error("AI matching failed:", e);
    }

    // Get full scholarship data for matches
    const matchedIds = matchingScholarships
      .filter((m) => m.score >= 60)
      .map((m) => m.id)
      .slice(0, 5);

    const matchedScholarships = matchedIds.length > 0
      ? await repo.findByIds(matchedIds)
      : [];

    // Generate suggestions
    const suggestions = [
      "Tell me more about your background",
      "Find fully funded scholarships",
      "What scholarships don't require IELTS?",
      "Show me scholarships in Europe",
    ];

    return NextResponse.json({
      success: true,
      data: {
        answer: response.text,
        scholarships: matchedScholarships.map((s, i) => ({
          ...s,
          matchScore: matchingScholarships.find((m) => m.id === s.id)?.score || 70,
        })),
        suggestions,
        followUpQuestions: [
          "How do I apply for these?",
          "What documents do I need?",
          "What are the deadlines?",
        ],
      },
    });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { success: false, error: "AI service is temporarily unavailable" },
      { status: 500 }
    );
  }
}
