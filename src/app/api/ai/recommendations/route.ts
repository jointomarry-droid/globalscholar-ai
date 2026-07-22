import { NextResponse } from "next/server";

// AI Recommendation Engine
// Matches students with universities and scholarships based on their profile

export interface StudentProfile {
  name: string;
  degree: string;
  field: string;
  gpa: number;
  gpaScale?: number;
  country: string;
  nationality: string;
  budget: number;
  preferredCountries: string[];
  preferredFields: string[];
  ieltsScore?: number;
  toeflScore?: number;
  greScore?: number;
  workExperience?: number;
  researchInterests?: string[];
  careerGoals?: string[];
  languagePreferences?: string[];
}

export interface RecommendationResult {
  type: "university" | "scholarship";
  id: string;
  name: string;
  country: string;
  matchScore: number;
  matchReasons: string[];
  missingRequirements: string[];
  estimatedCost: string;
  deadline: string;
  applicationUrl: string;
}

// Comprehensive university database for matching
const universityDatabase: RecommendationResult[] = [
  {
    type: "university",
    id: "uni-mit",
    name: "Massachusetts Institute of Technology",
    country: "United States",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "$55,000 - $75,000/year",
    deadline: "December 15",
    applicationUrl: "https://www.mit.edu/admissions",
  },
  {
    type: "university",
    id: "uni-stanford",
    name: "Stanford University",
    country: "United States",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "$56,000 - $78,000/year",
    deadline: "December 1",
    applicationUrl: "https://www.stanford.edu/admissions",
  },
  {
    type: "university",
    id: "uni-oxford",
    name: "University of Oxford",
    country: "United Kingdom",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "£28,000 - £45,000/year",
    deadline: "January 15",
    applicationUrl: "https://www.ox.ac.uk/admissions",
  },
  {
    type: "university",
    id: "uni-tum",
    name: "Technical University of Munich",
    country: "Germany",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "€0 - €3,000/year (mostly free)",
    deadline: "July 15 (Winter) / January 15 (Summer)",
    applicationUrl: "https://www.tum.de/en/studies",
  },
  {
    type: "university",
    id: "uni-tokyo",
    name: "University of Tokyo",
    country: "Japan",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "¥535,800/year (~$4,800)",
    deadline: "December 25 (Fall) / September 30 (Spring)",
    applicationUrl: "https://www.u-tokyo.ac.jp/en/",
  },
  {
    type: "university",
    id: "uni-nus",
    name: "National University of Singapore",
    country: "Singapore",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "S$38,000 - S$50,000/year",
    deadline: "March 31",
    applicationUrl: "https://www.nus.edu.sg/admissions",
  },
  {
    type: "university",
    id: "uni-eth",
    name: "ETH Zurich",
    country: "Switzerland",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "CHF 1,460/year (~$1,600)",
    deadline: "December 15",
    applicationUrl: "https://ethz.ch/en/studies.html",
  },
  {
    type: "university",
    id: "uni-melbourne",
    name: "University of Melbourne",
    country: "Australia",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "A$40,000 - A$55,000/year",
    deadline: "October 31 (Semester 1) / April 30 (Semester 2)",
    applicationUrl: "https://study.unimelb.edu.au/",
  },
  {
    type: "university",
    id: "uni-snu",
    name: "Seoul National University",
    country: "South Korea",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "₩4,000,000 - ₩8,000,000/year (~$3,000-$6,000)",
    deadline: "September 30 (Spring) / March 31 (Fall)",
    applicationUrl: "https://www.snu.ac.kr/en/admission",
  },
  {
    type: "university",
    id: "uni-tsinghua",
    name: "Tsinghua University",
    country: "China",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "¥28,000 - ¥40,000/year (~$4,000-$5,500)",
    deadline: "March 1 (Fall)",
    applicationUrl: "https://www.tsinghua.edu.cn/en/",
  },
];

// Scholarship database for matching
const scholarshipDatabase: RecommendationResult[] = [
  {
    type: "scholarship",
    id: "sch-fulbright",
    name: "Fulbright Foreign Student Program",
    country: "United States",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "Fully Funded",
    deadline: "February 1 - October 1 (varies by country)",
    applicationUrl: "https://foreign.fulbrightonline.org/",
  },
  {
    type: "scholarship",
    id: "sch-daad",
    name: "DAAD German Academic Exchange Service",
    country: "Germany",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "€850 - €1,200/month stipend + tuition",
    deadline: "Varies by program",
    applicationUrl: "https://www.daad.de/en/",
  },
  {
    type: "scholarship",
    id: "sch-chevening",
    name: "Chevening Scholarship",
    country: "United Kingdom",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "Fully Funded",
    deadline: "November 1",
    applicationUrl: "https://www.chevening.org/",
  },
  {
    type: "scholarship",
    id: "sch-erasmus",
    name: "Erasmus Mundus Joint Master Degree",
    country: "European Union",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "€1,400/month + tuition + travel",
    deadline: "January 15 - March 15 (varies)",
    applicationUrl: "https://erasmus-plus.ec.europa.eu/",
  },
  {
    type: "scholarship",
    id: "sch-csc",
    name: "Chinese Government Scholarship (CSC)",
    country: "China",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "Fully Funded",
    deadline: "April 15",
    applicationUrl: "https://www.campuschina.org/",
  },
  {
    type: "scholarship",
    id: "sch-mext",
    name: "MEXT Japanese Government Scholarship",
    country: "Japan",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "Fully Funded",
    deadline: "April 15 (Embassy) / varies (University)",
    applicationUrl: "https://www.studyinjapan.go.jp/en/smap-stopj-applications-scholarship.html",
  },
  {
    type: "scholarship",
    id: "sch-rhodes",
    name: "Rhodes Scholarship",
    country: "United Kingdom",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "Fully Funded",
    deadline: "October 1",
    applicationUrl: "https://www.rhodeshouse.ox.ac.uk/",
  },
  {
    type: "scholarship",
    id: "sch-gates",
    name: "Gates Cambridge Scholarship",
    country: "United Kingdom",
    matchScore: 0,
    matchReasons: [],
    missingRequirements: [],
    estimatedCost: "Fully Funded",
    deadline: "October 14 (US) / December 3 (International)",
    applicationUrl: "https://www.gatescambridge.org/",
  },
];

function calculateMatchScore(
  profile: StudentProfile,
  item: RecommendationResult
): { score: number; reasons: string[]; missing: string[] } {
  let score = 0;
  const reasons: string[] = [];
  const missing: string[] = [];

  // Country preference (30 points)
  if (profile.preferredCountries.some((c) => item.country.toLowerCase().includes(c.toLowerCase()))) {
    score += 30;
    reasons.push(`Located in your preferred country: ${item.country}`);
  } else if (profile.preferredCountries.length === 0) {
    score += 15;
  }

  // Budget consideration (25 points)
  const isFreeOrLowCost = item.estimatedCost.toLowerCase().includes("free") ||
    item.estimatedCost.toLowerCase().includes("€0") ||
    item.estimatedCost.toLowerCase().includes("low cost");

  if (isFreeOrLowCost) {
    score += 25;
    reasons.push("Low or no tuition fees");
  } else if (item.estimatedCost.toLowerCase().includes("fully funded")) {
    score += 25;
    reasons.push("Fully funded opportunity");
  } else {
    score += 10;
    reasons.push("Review tuition costs carefully");
  }

  // GPA consideration (20 points)
  if (profile.gpa >= 3.5) {
    score += 20;
    reasons.push("Strong academic record");
  } else if (profile.gpa >= 3.0) {
    score += 15;
    reasons.push("Good academic standing");
  } else {
    score += 8;
    missing.push("Consider strengthening your application with research or work experience");
  }

  // Language proficiency (15 points)
  if (profile.ieltsScore && profile.ieltsScore >= 7.0) {
    score += 15;
    reasons.push("Strong English proficiency (IELTS 7.0+)");
  } else if (profile.toeflScore && profile.toeflScore >= 100) {
    score += 15;
    reasons.push("Strong English proficiency (TOEFL 100+)");
  } else {
    score += 5;
    missing.push("Consider improving English test scores");
  }

  // Work experience bonus (10 points)
  if (profile.workExperience && profile.workExperience >= 2) {
    score += 10;
    reasons.push(`${profile.workExperience} years of relevant work experience`);
  }

  // Cap score at 100
  score = Math.min(score, 100);

  return { score, reasons, missing };
}

// POST /api/ai/recommendations - Get personalized recommendations
export async function POST(request: Request) {
  try {
    const profile: StudentProfile = await request.json();

    if (!profile.name || !profile.degree || !profile.field) {
      return NextResponse.json(
        { success: false, error: "name, degree, and field are required" },
        { status: 400 }
      );
    }

    // Score universities
    const universityMatches = universityDatabase.map((uni) => {
      const { score, reasons, missing } = calculateMatchScore(profile, uni);
      return { ...uni, matchScore: score, matchReasons: reasons, missingRequirements: missing };
    });

    // Score scholarships
    const scholarshipMatches = scholarshipDatabase.map((sch) => {
      const { score, reasons, missing } = calculateMatchScore(profile, sch);
      return { ...sch, matchScore: score, matchReasons: reasons, missingRequirements: missing };
    });

    // Sort by match score
    universityMatches.sort((a, b) => b.matchScore - a.matchScore);
    scholarshipMatches.sort((a, b) => b.matchScore - a.matchScore);

    // Generate AI summary
    const topUni = universityMatches[0];
    const topSch = scholarshipMatches[0];

    let summary = `Based on your profile, here are personalized recommendations for ${profile.name}:\n\n`;

    if (topUni) {
      summary += `Top University Match: ${topUni.name} (${topUni.matchScore}% match) - ${topUni.country}\n`;
      summary += `Key reasons: ${topUni.matchReasons[0]}\n\n`;
    }

    if (topSch) {
      summary += `Top Scholarship Match: ${topSch.name} (${topSch.matchScore}% match) - ${topSch.country}\n`;
      summary += `Funding: ${topSch.estimatedCost}\n\n`;
    }

    summary += `We found ${universityMatches.filter((u) => u.matchScore >= 60).length} universities and ${scholarshipMatches.filter((s) => s.matchScore >= 60).length} scholarships that match your profile well.`;

    return NextResponse.json({
      success: true,
      data: {
        profile,
        universities: universityMatches.slice(0, 10),
        scholarships: scholarshipMatches.slice(0, 10),
        summary,
        totalMatches: {
          universities: universityMatches.filter((u) => u.matchScore >= 50).length,
          scholarships: scholarshipMatches.filter((s) => s.matchScore >= 50).length,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Recommendation failed" },
      { status: 500 }
    );
  }
}
