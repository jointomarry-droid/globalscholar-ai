import { NextResponse } from "next/server";

// IELTS/TOEFL Requirement Checker API
// Check language requirements for universities worldwide

export interface LanguageRequirement {
  university: string;
  country: string;
  program: string;
  degree: string;
  ielts: { overall: number; minPerBand: number };
  toefl: { ibt: number; pbt?: number };
  pte: number;
  duolingo: number;
  cambridge: string;
  waivesFor: string[];
  notes: string;
}

const requirementsDatabase: LanguageRequirement[] = [
  {
    university: "MIT",
    country: "United States",
    program: "Computer Science",
    degree: "MS/PhD",
    ielts: { overall: 7.0, minPerBand: 6.5 },
    toefl: { ibt: 100 },
    pte: 68,
    duolingo: 120,
    cambridge: "C1 Advanced",
    waivesFor: ["English-speaking countries", "English-taught programs in UK/Australia"],
    notes: "Strongly recommended to have TOEFL 105+ for competitive programs.",
  },
  {
    university: "Stanford University",
    country: "United States",
    program: "All Programs",
    degree: "MS/PhD",
    ielts: { overall: 7.0, minPerBand: 6.0 },
    toefl: { ibt: 100 },
    pte: 68,
    duolingo: 120,
    cambridge: "C1 Advanced",
    waivesFor: ["US citizens", "Permanent residents", "4+ years at English-medium university"],
    notes: "Department requirements may be higher.",
  },
  {
    university: "Harvard University",
    country: "United States",
    program: "All Graduate Programs",
    degree: "MS/PhD",
    ielts: { overall: 7.5, minPerBand: 7.0 },
    toefl: { ibt: 100 },
    pte: 68,
    duolingo: 125,
    cambridge: "C1 Advanced",
    waivesFor: ["English-speaking country passport holders"],
    notes: "Some programs require higher scores.",
  },
  {
    university: "University of Oxford",
    country: "United Kingdom",
    program: "All Programs",
    degree: "Masters/DPhil",
    ielts: { overall: 7.5, minPerBand: 7.0 },
    toefl: { ibt: 110, pbt: 600 },
    pte: 76,
    duolingo: 130,
    cambridge: "C1 Advanced",
    waivesFor: ["UK/Ireland passport holders", "2+ years at English-medium university in majority English-speaking country"],
    notes: "Standard level: IELTS 7.0. Higher level: IELTS 7.5. Computer Science requires 7.5.",
  },
  {
    university: "University of Cambridge",
    country: "United Kingdom",
    program: "All Programs",
    degree: "Masters/PhD",
    ielts: { overall: 7.5, minPerBand: 7.0 },
    toefl: { ibt: 110, pbt: 600 },
    pte: 76,
    duolingo: 130,
    cambridge: "C1 Advanced",
    waivesFor: ["UK/Ireland passport holders"],
    notes: "Computer Science: IELTS 7.0 overall with 7.0 in each component.",
  },
  {
    university: "TU Munich",
    country: "Germany",
    program: "Computer Science (English-taught)",
    degree: "MS",
    ielts: { overall: 6.5, minPerBand: 5.5 },
    toefl: { ibt: 88 },
    pte: 59,
    duolingo: 110,
    cambridge: "B2 First",
    waivesFor: ["Native English speakers", "English-taught bachelor's degree"],
    notes: "German-taught programs require TestDaF 4x4 or DSH-2.",
  },
  {
    university: "LMU Munich",
    country: "Germany",
    program: "Data Science",
    degree: "MS",
    ielts: { overall: 6.5, minPerBand: 5.5 },
    toefl: { ibt: 80 },
    pte: 55,
    duolingo: 105,
    cambridge: "B2 First",
    waivesFor: ["English-taught bachelor's degree"],
    notes: "Some programs may require higher scores.",
  },
  {
    university: "University of Toronto",
    country: "Canada",
    program: "Computer Science",
    degree: "MS/PhD",
    ielts: { overall: 7.0, minPerBand: 6.5 },
    toefl: { ibt: 93 },
    pte: 65,
    duolingo: 115,
    cambridge: "C1 Advanced",
    waivesFor: ["Canadian citizens", "4+ years at English-medium Canadian university"],
    notes: "Minimum requirements; competitive programs may need higher.",
  },
  {
    university: "University of Melbourne",
    country: "Australia",
    program: "All Graduate Programs",
    degree: "Masters/PhD",
    ielts: { overall: 7.0, minPerBand: 6.5 },
    toefl: { ibt: 94 },
    pte: 65,
    duolingo: 115,
    cambridge: "C1 Advanced",
    waivesFor: ["Australian/NZ citizens", "3+ years at English-medium university in English-speaking country"],
    notes: "Some faculties require higher IELTS scores.",
  },
  {
    university: "National University of Singapore",
    country: "Singapore",
    program: "Computer Science",
    degree: "MS/PhD",
    ielts: { overall: 6.0, minPerBand: 5.5 },
    toefl: { ibt: 85 },
    pte: 55,
    duolingo: 105,
    cambridge: "B2 First",
    waivesFor: ["English-medium bachelor's degree from recognized university"],
    notes: "NUS accepts a wide range of English proficiency tests.",
  },
  {
    university: "ETH Zurich",
    country: "Switzerland",
    program: "Computer Science",
    degree: "MS",
    ielts: { overall: 7.0, minPerBand: 6.0 },
    toefl: { ibt: 100 },
    pte: 64,
    duolingo: 115,
    cambridge: "C1 Advanced",
    waivesFor: ["English-medium bachelor's degree"],
    notes: "German-taught programs require different qualifications.",
  },
  {
    university: "KAIST",
    country: "South Korea",
    program: "All Programs",
    degree: "MS/PhD",
    ielts: { overall: 6.5, minPerBand: 5.5 },
    toefl: { ibt: 83 },
    pte: 57,
    duolingo: 105,
    cambridge: "B2 First",
    waivesFor: ["Native English speakers", "English-taught bachelor's degree"],
    notes: "GRE may be required for some programs.",
  },
  {
    university: "University of Tokyo",
    country: "Japan",
    program: "International Programs",
    degree: "MS/PhD",
    ielts: { overall: 6.5, minPerBand: 5.5 },
    toefl: { ibt: 80 },
    pte: 55,
    duolingo: 100,
    cambridge: "B2 First",
    waivesFor: ["English-speaking country nationals", "English-medium degree holders"],
    notes: "Japanese proficiency helpful for daily life and some research groups.",
  },
  {
    university: "Tsinghua University",
    country: "China",
    program: "International Programs",
    degree: "MS/PhD",
    ielts: { overall: 6.0, minPerBand: 5.5 },
    toefl: { ibt: 80 },
    pte: 55,
    duolingo: 100,
    cambridge: "B2 First",
    waivesFor: ["English-speaking country nationals"],
    notes: "Chinese-taught programs require HSK 5+.",
  },
  {
    university: "Seoul National University",
    country: "South Korea",
    program: "All Graduate Programs",
    degree: "MS/PhD",
    ielts: { overall: 6.0, minPerBand: 5.5 },
    toefl: { ibt: 80 },
    pte: 55,
    duolingo: 105,
    cambridge: "B2 First",
    waivesFor: ["Native English speakers", "English-medium bachelor's degree"],
    notes: "Some departments have higher requirements.",
  },
];

const scoreConversions = [
  { ielts: 5.0, toefl: 40, pte: 30, duolingo: 75, cambridge: "B1 Preliminary" },
  { ielts: 5.5, toefl: 50, pte: 36, duolingo: 85, cambridge: "B1 Preliminary" },
  { ielts: 6.0, toefl: 60, pte: 42, duolingo: 95, cambridge: "B2 First" },
  { ielts: 6.5, toefl: 75, pte: 50, duolingo: 105, cambridge: "B2 First" },
  { ielts: 7.0, toefl: 90, pte: 60, duolingo: 115, cambridge: "C1 Advanced" },
  { ielts: 7.5, toefl: 100, pte: 68, duolingo: 125, cambridge: "C1 Advanced" },
  { ielts: 8.0, toefl: 110, pte: 76, duolingo: 130, cambridge: "C1 Advanced" },
  { ielts: 8.5, toefl: 115, pte: 82, duolingo: 135, cambridge: "C2 Proficiency" },
  { ielts: 9.0, toefl: 120, pte: 86, duolingo: 140, cambridge: "C2 Proficiency" },
];

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const university = url.searchParams.get("university");
    const country = url.searchParams.get("country");
    const convert = url.searchParams.get("convert");

    if (convert) {
      const score = parseFloat(convert);
      const testType = url.searchParams.get("type") || "ielts";
      let match = null;

      if (testType === "ielts") {
        match = scoreConversions.find((c) => Math.abs(c.ielts - score) < 0.01);
      } else if (testType === "toefl") {
        match = scoreConversions.find((c) => c.toefl === Math.round(score));
      } else if (testType === "pte") {
        match = scoreConversions.find((c) => Math.abs(c.pte - score) < 1);
      }

      return NextResponse.json({ success: true, data: match || scoreConversions });
    }

    let results = [...requirementsDatabase];

    if (university) {
      results = results.filter((r) =>
        r.university.toLowerCase().includes(university.toLowerCase())
      );
    }
    if (country) {
      results = results.filter((r) =>
        r.country.toLowerCase().includes(country.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
      scoreConversions,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed" },
      { status: 500 }
    );
  }
}
