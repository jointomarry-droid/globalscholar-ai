import { NextRequest, NextResponse } from "next/server";
import { getAIService } from "@/services/ai.service";
import { getScholarshipRepository } from "@/repositories/scholarship.repository";

function generateRuleBasedResponse(
  query: string,
  scholarships: Array<{ id: string; title: string; country: string; degree: string; funding: string; field: string; deadline: string; ieltsRequired: boolean }>,
  matchedIds: string[]
): { answer: string; scholarships: typeof scholarships } {
  const q = query.toLowerCase();
  const matched = scholarships.filter((s) => matchedIds.includes(s.id));

  const parts: string[] = [];
  parts.push("Here's what I found for your query:\n");

  if (matched.length > 0) {
    parts.push(`I found **${matched.length} scholarship(s)** that match your criteria:\n`);
    for (const s of matched) {
      parts.push(`- **${s.title}** — ${s.country}, ${s.funding.replace("_", " ")}, ${s.degree} level`);
    }
    parts.push("");
  } else {
    parts.push("I found several scholarships that may interest you:\n");
    const top = scholarships.slice(0, 3);
    for (const s of top) {
      parts.push(`- **${s.title}** — ${s.country}, ${s.funding.replace("_", " ")}`);
    }
    parts.push("");
  }

  parts.push("**Next steps:**");
  parts.push("- Visit the [Scholarships page](/scholarships) to browse all available opportunities");
  parts.push("- Use the [AI Matcher](/ai/matcher) for personalized recommendations");
  parts.push("- Check individual scholarship pages for exact deadlines and requirements");

  return { answer: parts.join("\n"), scholarships: matched.length > 0 ? matched : scholarships.slice(0, 3) };
}

function matchScholarshipsRuleBased(
  query: string,
  scholarships: Array<{ id: string; title: string; country: string; degree: string; funding: string; field: string; ieltsRequired: boolean }>
): string[] {
  const q = query.toLowerCase();
  const scored: Array<{ id: string; score: number }> = [];

  for (const s of scholarships) {
    let score = 0;
    const title = s.title.toLowerCase();
    const country = s.country.toLowerCase();
    const degree = s.degree.toLowerCase();
    const funding = s.funding.toLowerCase();
    const field = s.field.toLowerCase();

    // Country match
    if (q.includes(country) || q.includes(country.split(" ")[0])) score += 30;

    // Degree match
    if (q.includes("phd") && degree.includes("phd")) score += 25;
    if (q.includes("master") && degree.includes("master")) score += 25;
    if (q.includes("bachelor") && degree.includes("bachelor")) score += 25;

    // Funding match
    if ((q.includes("fully funded") || q.includes("full funding")) && funding.includes("fully_funded")) score += 20;
    if (q.includes("no ielts") && !s.ieltsRequired) score += 15;
    if (q.includes("ielts") && s.ieltsRequired) score += 10;

    // Field match
    const fields = ["computer science", "engineering", "business", "medicine", "arts", "science", "environmental"];
    for (const f of fields) {
      if (q.includes(f) && field.toLowerCase().includes(f)) score += 15;
    }

    // General keyword match
    const words = q.split(/\s+/).filter((w) => w.length > 3);
    for (const w of words) {
      if (title.includes(w)) score += 5;
      if (field.includes(w)) score += 5;
    }

    if (score > 0) scored.push({ id: s.id, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5).map((s) => s.id);
}

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

    // Full scholarship data for rule-based fallback
    const fullScholarshipData = allScholarships.data.map((s) => ({
      id: s.id,
      title: s.title,
      country: s.country,
      degree: s.degree,
      funding: s.funding,
      field: s.field,
      deadline: s.deadline,
      ieltsRequired: s.ieltsRequired ?? false,
    })) as Array<{ id: string; title: string; country: string; degree: string; funding: string; field: string; deadline: string; ieltsRequired: boolean }>;

    let answer: string;
    let matchedScholarships: Array<{ id: string; score: number; reasons: string[] }> = [];
    let matchedFullData: typeof fullScholarshipData = [];

    // Try AI-powered response
    if (aiService.hasProviders()) {
      try {
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

        answer = response.text;

        // Try AI-powered matching
        try {
          matchedScholarships = await aiService.matchScholarships(message, scholarshipData);
        } catch (e) {
          console.error("AI matching failed, using rule-based:", e);
          const matchedIds = matchScholarshipsRuleBased(message, fullScholarshipData);
          matchedScholarships = matchedIds.map((id) => ({ id, score: 70, reasons: ["Rule-based match"] }));
        }
      } catch (e) {
        console.error("AI generation failed, using rule-based response:", e);
        // Fall back to rule-based
        const matchedIds = matchScholarshipsRuleBased(message, fullScholarshipData);
        const fallback = generateRuleBasedResponse(message, fullScholarshipData, matchedIds);
        answer = fallback.answer;
        matchedFullData = fallback.scholarships;
        matchedScholarships = matchedFullData.map((s) => ({ id: s.id, score: 70, reasons: ["Rule-based match"] }));
      }
    } else {
      // No AI providers available — use rule-based matching
      console.log("No AI providers available, using rule-based matching");
      const matchedIds = matchScholarshipsRuleBased(message, fullScholarshipData);
      const fallback = generateRuleBasedResponse(message, fullScholarshipData, matchedIds);
      answer = fallback.answer;
      matchedFullData = fallback.scholarships;
      matchedScholarships = matchedFullData.map((s) => ({ id: s.id, score: 70, reasons: ["Rule-based match"] }));
    }

    // Get full scholarship data for AI-matched results (if not already populated from fallback)
    if (matchedFullData.length === 0) {
      const matchedIds = matchedScholarships
        .filter((m) => m.score >= 60)
        .map((m) => m.id)
        .slice(0, 5);

      if (matchedIds.length > 0) {
        const repoResults = await repo.findByIds(matchedIds);
        matchedFullData = repoResults.map((s) => ({
          id: s.id,
          title: s.title,
          country: s.country,
          degree: s.degree,
          funding: s.funding,
          field: s.field,
          deadline: s.deadline,
          ieltsRequired: s.ieltsRequired ?? false,
        }));
      }
    }

    // Generate suggestions based on the query
    const q = message.toLowerCase();
    const suggestions: string[] = [];
    if (!q.includes("fully funded")) suggestions.push("Find fully funded scholarships");
    if (!q.includes("ielts")) suggestions.push("What scholarships don't require IELTS?");
    if (!q.includes("germany") && !q.includes("uk") && !q.includes("usa")) suggestions.push("Show me scholarships in Europe");
    if (!q.includes("phd")) suggestions.push("Find PhD scholarships");
    if (!q.includes("master")) suggestions.push("Show me Master's scholarships");
    if (suggestions.length === 0) suggestions.push("Tell me more about your background");
    suggestions.push("How do I apply?");

    return NextResponse.json({
      success: true,
      data: {
        answer,
        scholarships: matchedFullData.map((s, i) => ({
          ...s,
          matchScore: matchedScholarships.find((m) => m.id === s.id)?.score || 70,
        })),
        suggestions: suggestions.slice(0, 4),
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
