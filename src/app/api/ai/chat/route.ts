import { NextRequest, NextResponse } from "next/server";
import { getAIService } from "@/services/ai.service";

// Import the comprehensive scholarship database directly
const comprehensiveScholarships = [
  { id: "fulbright", title: "Fulbright Foreign Student Program", country: "USA", degree: "Masters/PhD", funding: "fully_funded", field: "All Fields", deadline: "February", ieltsRequired: true, description: "The Fulbright Program provides grants for individually designed study/research projects. Students design their own academic program and arrange affiliation with a U.S. university.", eligibility: "US citizens with bachelor's degree, strong academic record, English proficiency" },
  { id: "daad", title: "DAAD Scholarship for Development", country: "Germany", degree: "Masters/PhD", funding: "fully_funded", field: "Development Studies", deadline: "October", ieltsRequired: false, description: "DAAD scholarships for students from developing countries pursuing development-related postgraduate studies at German universities.", eligibility: "Students from developing countries, 2+ years work experience, bachelor's degree" },
  { id: "chevening", title: "Chevening Scholarship", country: "UK", degree: "Masters", funding: "fully_funded", field: "All Fields", deadline: "November", ieltsRequired: true, description: "UK government global scholarship programme offering awards to outstanding professionals with leadership potential.", eligibility: "2+ years work experience, strong leadership qualities, return to home country" },
  { id: "erasmus-mundus", title: "Erasmus Mundus Joint Masters", country: "Europe", degree: "Masters", funding: "fully_funded", field: "All Fields", deadline: "January", ieltsRequired: true, description: "EU-funded program offering fully funded joint master degrees at multiple European universities.", eligibility: "Bachelor's degree, English proficiency, not previously received Erasmus Mundus" },
  { id: "commonwealth", title: "Commonwealth Scholarship", country: "UK", degree: "Masters/PhD", funding: "fully_funded", field: "All Fields", deadline: "December", ieltsRequired: true, description: "UK scholarship for students from Commonwealth countries to study at UK universities.", eligibility: "Commonwealth citizen, bachelor's degree, unable to afford study in UK" },
  { id: "mext", title: "MEXT Scholarship (Japan)", country: "Japan", degree: "Masters/PhD", funding: "fully_funded", field: "All Fields", deadline: "April", ieltsRequired: false, description: "Japanese government scholarship for international students to study at Japanese universities.", eligibility: "Under 35, bachelor's degree, Japanese language proficiency preferred" },
  { id: "csc", title: "Chinese Government Scholarship", country: "China", degree: "Masters/PhD", funding: "fully_funded", field: "All Fields", deadline: "April", ieltsRequired: false, description: "Full scholarship from Chinese government for international students at Chinese universities.", eligibility: "Good health, bachelor's degree for masters, non-Chinese citizen" },
  { id: "stipendium", title: "Stipendium Hungaricum", country: "Hungary", degree: "Masters/PhD", funding: "fully_funded", field: "All Fields", deadline: "January", ieltsRequired: false, description: "Hungarian government scholarship program for international students.", eligibility: "Citizens of partner countries, bachelor's degree" },
  { id: "gates-cambridge", title: "Gates Cambridge Scholarship", country: "UK", degree: "PhD/Masters", funding: "fully_funded", field: "All Fields", deadline: "December", ieltsRequired: true, description: "Full-cost award for outstanding postgraduate study at the University of Cambridge.", eligibility: "Outstanding intellectual ability, leadership, commitment to improving lives of others" },
  { id: "rhodes", title: "Rhodes Scholarship", country: "UK", degree: "Masters/PhD", funding: "fully_funded", field: "All Fields", deadline: "October", ieltsRequired: true, description: "Oldest and most prestigious international scholarship, enabling outstanding students to study at Oxford.", eligibility: "Ages 19-27, bachelor's degree, academic excellence, leadership" },
  { id: "horizon-europe", title: "Horizon Europe MSCA", country: "Europe", degree: "PhD/Postdoc", funding: "fully_funded", field: "Research", deadline: "March", ieltsRequired: false, description: "EU research and innovation program funding doctoral networks and postdoctoral fellowships.", eligibility: "Researchers of any nationality, PhD or experienced researcher" },
  { id: "swedish-institute", title: "Swedish Institute Scholarships", country: "Sweden", degree: "Masters", funding: "fully_funded", field: "All Fields", deadline: "February", ieltsRequired: true, description: "Full scholarships for students from eligible countries to study at Swedish universities.", eligibility: "Citizens of eligible countries, work experience, leadership experience" },
  { id: "holland-scholarship", title: "Holland Scholarship", country: "Netherlands", degree: "Bachelors/Masters", funding: "partial", field: "All Fields", deadline: "February", ieltsRequired: true, description: "Dutch scholarship for international students outside the EU/EEA studying in the Netherlands.", eligibility: "Non-EU/EEA citizen, applying to Dutch university, first-time study in Netherlands" },
  { id: "eth-zurich", title: "ETH Zurich Excellence Scholarship", country: "Switzerland", degree: "Masters", funding: "fully_funded", field: "Engineering/Science", deadline: "December", ieltsRequired: true, description: "Merit-based scholarship covering tuition and living expenses at ETH Zurich.", eligibility: "Outstanding academic record, bachelor's degree from recognized university" },
  { id: "epfl-excellence", title: "EPFL Excellence Fellowships", country: "Switzerland", degree: "Masters", funding: "fully_funded", field: "Engineering/Science", deadline: "December", ieltsRequired: true, description: "Merit-based fellowships at EPFL covering tuition and living expenses.", eligibility: "Outstanding academic record, EPFL master's program applicant" },
  { id: "turkiye-burslari", title: "Turkiye Burslari", country: "Turkey", degree: "Masters/PhD", funding: "fully_funded", field: "All Fields", deadline: "February", ieltsRequired: false, description: "Turkish government scholarship for international students.", eligibility: "Under 30 for masters, under 35 for PhD, bachelor's degree" },
  { id: "korean-scholarship", title: "Korean Government Scholarship", country: "South Korea", degree: "Masters/PhD", funding: "fully_funded", field: "All Fields", deadline: "March", ieltsRequired: false, description: "Korean government scholarship for international students at Korean universities.", eligibility: "Under 40, bachelor's degree, GPA above 80%" },
  { id: "australia-award", title: "Australia Awards Scholarships", country: "Australia", degree: "Masters/PhD", funding: "fully_funded", field: "Development", deadline: "April", ieltsRequired: true, description: "Australian government scholarships for students from developing countries.", eligibility: "Citizens of participating countries, 2+ years work experience" },
  { id: "vanaderbilt", title: "Vanderbilt University Scholarships", country: "USA", degree: "Masters/PhD", funding: "fully_funded", field: "All Fields", deadline: "December", ieltsRequired: true, description: "Merit-based and need-based scholarships at Vanderbilt University.", eligibility: "Outstanding academic record, demonstrated leadership" },
  { id: "msca-pofd", title: "MSCA Postdoctoral Fellowships", country: "Europe", degree: "Postdoc", funding: "fully_funded", field: "Research", deadline: "September", ieltsRequired: false, description: "EU funding for experienced researchers to conduct postdoctoral research in Europe.", eligibility: "PhD holder, max 8 years research experience, mobility requirement" },
  { id: "ada-masters", title: "Aga Khan Foundation Scholarship", country: "Multiple", degree: "Masters", funding: "partial", field: "All Fields", deadline: "March", ieltsRequired: true, description: "Need-based scholarship for students from developing countries.", eligibility: "Accepted to reputable postgraduate program, financial need demonstrated" },
  { id: "erasmusmundus-phd", title: "Erasmus Mundus Joint Doctorate", country: "Europe", degree: "PhD", funding: "fully_funded", field: "Research", deadline: "January", ieltsRequired: true, description: "EU-funded doctoral programs offered by consortia of European universities.", eligibility: "Master's degree, research proposal, supervisor agreement" },
];

function generateRuleBasedResponse(query: string, matchedIds: string[]): { answer: string; scholarships: typeof comprehensiveScholarships } {
  const q = query.toLowerCase();
  const matched = comprehensiveScholarships.filter((s) => matchedIds.includes(s.id));

  const parts: string[] = [];
  parts.push("Here's what I found for your query:\n");

  if (matched.length > 0) {
    parts.push(`I found **${matched.length} scholarship(s)** that match your criteria:\n`);
    for (const s of matched) {
      parts.push(`- **${s.title}** — ${s.country}, ${s.funding.replace("_", " ")}, ${s.degree} level`);
      parts.push(`  ${s.description}\n`);
    }
  } else {
    parts.push("I found several scholarships that may interest you:\n");
    const top = comprehensiveScholarships.slice(0, 3);
    for (const s of top) {
      parts.push(`- **${s.title}** — ${s.country}, ${s.funding.replace("_", " ")}`);
    }
  }

  parts.push("\n**Next steps:**");
  parts.push("- Visit the [Scholarships page](/scholarships) to browse all available opportunities");
  parts.push("- Use the [AI Matcher](/ai/matcher) for personalized recommendations");
  parts.push("- Check individual scholarship pages for exact deadlines and requirements");

  return { answer: parts.join("\n"), scholarships: matched.length > 0 ? matched : comprehensiveScholarships.slice(0, 3) };
}

function matchScholarshipsRuleBased(query: string): string[] {
  const q = query.toLowerCase();
  const scored: Array<{ id: string; score: number }> = [];

  for (const s of comprehensiveScholarships) {
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
    if (q.includes("postdoc") && degree.includes("postdoc")) score += 25;

    // Funding match
    if ((q.includes("fully funded") || q.includes("full funding")) && funding.includes("fully_funded")) score += 20;
    if (q.includes("no ielts") && !s.ieltsRequired) score += 15;
    if (q.includes("ielts") && s.ieltsRequired) score += 10;

    // Field match
    const fields = ["computer science", "engineering", "business", "medicine", "arts", "science", "environmental", "research", "development"];
    for (const f of fields) {
      if (q.includes(f) && (field.toLowerCase().includes(f) || title.toLowerCase().includes(f))) score += 15;
    }

    // General keyword match
    const words = q.split(/\s+/).filter((w) => w.length > 3);
    for (const w of words) {
      if (title.includes(w)) score += 5;
      if (field.includes(w)) score += 5;
      if (country.includes(w)) score += 5;
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

    // Format scholarship data for AI context
    const scholarshipData = comprehensiveScholarships.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      eligibility: `${s.country}, ${s.degree}, ${s.funding}, ${s.field}, ${s.ieltsRequired ? "IELTS required" : "No IELTS"}`,
    }));

    let answer: string;
    let matchedScholarships: Array<{ id: string; score: number; reasons: string[] }> = [];
    let matchedFullData: typeof comprehensiveScholarships = [];

    // Build comprehensive scholarship context for AI
    const scholarshipContext = comprehensiveScholarships.map((s) =>
      `[${s.id}] ${s.title} | ${s.country} | ${s.degree} | ${s.funding} | ${s.field} | Deadline: ${s.deadline} | IELTS: ${s.ieltsRequired ? "Required" : "Not required"} | ${s.description}`
    ).join("\n");

    // Try AI-powered response
    if (aiService.hasProviders()) {
      try {
        const systemPrompt = `You are GlobalScholar AI, the world's most intelligent scholarship advisor.
You have access to a comprehensive database of 22 real scholarships from around the world.
Use this data to provide personalized, accurate recommendations.

AVAILABLE SCHOLARSHIPS:
${scholarshipContext}

RULES:
1. Be warm, professional, and encouraging
2. Provide specific scholarship recommendations from the database above
3. Always mention the scholarship name, country, funding type, and deadline
4. Suggest actionable next steps
5. Be honest about eligibility
6. Use markdown formatting for readability
7. If the user's profile matches specific scholarships, highlight those first

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
        } catch {
          const matchedIds = matchScholarshipsRuleBased(message);
          matchedScholarships = matchedIds.map((id) => ({ id, score: 70, reasons: ["Rule-based match"] }));
        }
      } catch {
        // Fall back to rule-based
        const matchedIds = matchScholarshipsRuleBased(message);
        const fallback = generateRuleBasedResponse(message, matchedIds);
        answer = fallback.answer;
        matchedFullData = fallback.scholarships;
        matchedScholarships = matchedFullData.map((s) => ({ id: s.id, score: 70, reasons: ["Rule-based match"] }));
      }
    } else {
      // No AI providers available — use rule-based matching
      const matchedIds = matchScholarshipsRuleBased(message);
      const fallback = generateRuleBasedResponse(message, matchedIds);
      answer = fallback.answer;
      matchedFullData = fallback.scholarships;
      matchedScholarships = matchedFullData.map((s) => ({ id: s.id, score: 70, reasons: ["Rule-based match"] }));
    }

    // Get full data for matched results
    if (matchedFullData.length === 0) {
      const matchedIds = matchedScholarships
        .filter((m) => m.score >= 60)
        .map((m) => m.id)
        .slice(0, 5);

      matchedFullData = comprehensiveScholarships.filter((s) => matchedIds.includes(s.id));
      if (matchedFullData.length === 0) {
        matchedFullData = comprehensiveScholarships.slice(0, 3);
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
