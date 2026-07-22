import { NextResponse } from "next/server";

// Tuition Fee Comparison API
// Compare tuition fees across universities and programs worldwide

export interface TuitionData {
  university: string;
  country: string;
  program: string;
  degree: string;
  tuitionAnnual: number;
  currency: string;
  tuitionUSD: number;
  duration: string;
  totalCost: number;
  livingCostUSD: number;
  totalProgramCost: number;
  ranking: number;
  type: "public" | "private";
  scholarshipsAvailable: boolean;
  workWhileStudying: string;
}

const tuitionDatabase: TuitionData[] = [
  {
    university: "MIT",
    country: "United States",
    program: "Computer Science (MS)",
    degree: "MS",
    tuitionAnnual: 57986,
    currency: "USD",
    tuitionUSD: 57986,
    duration: "2 years",
    totalCost: 115972,
    livingCostUSD: 25000,
    totalProgramCost: 165972,
    ranking: 1,
    type: "private",
    scholarshipsAvailable: true,
    workWhileStudying: "On-campus 20hrs/week",
  },
  {
    university: "Stanford University",
    country: "United States",
    program: "Computer Science (MS)",
    degree: "MS",
    tuitionAnnual: 58248,
    currency: "USD",
    tuitionUSD: 58248,
    duration: "2 years",
    totalCost: 116496,
    livingCostUSD: 28000,
    totalProgramCost: 172496,
    ranking: 2,
    type: "private",
    scholarshipsAvailable: true,
    workWhileStudying: "On-campus 20hrs/week",
  },
  {
    university: "Harvard University",
    country: "United States",
    program: "Computer Science (MS)",
    degree: "MS",
    tuitionAnnual: 54768,
    currency: "USD",
    tuitionUSD: 54768,
    duration: "2 years",
    totalCost: 109536,
    livingCostUSD: 26000,
    totalProgramCost: 161536,
    ranking: 3,
    type: "private",
    scholarshipsAvailable: true,
    workWhileStudying: "On-campus 20hrs/week",
  },
  {
    university: "University of Oxford",
    country: "United Kingdom",
    program: "Computer Science (MSc)",
    degree: "MSc",
    tuitionAnnual: 32000,
    currency: "GBP",
    tuitionUSD: 40000,
    duration: "1 year",
    totalCost: 40000,
    livingCostUSD: 22000,
    totalProgramCost: 62000,
    ranking: 5,
    type: "public",
    scholarshipsAvailable: true,
    workWhileStudying: "20hrs/week during term",
  },
  {
    university: "University of Cambridge",
    country: "United Kingdom",
    program: "Computer Science (MPhil)",
    degree: "MPhil",
    tuitionAnnual: 33000,
    currency: "GBP",
    tuitionUSD: 41250,
    duration: "1 year",
    totalCost: 41250,
    livingCostUSD: 20000,
    totalProgramCost: 61250,
    ranking: 4,
    type: "public",
    scholarshipsAvailable: true,
    workWhileStudying: "20hrs/week during term",
  },
  {
    university: "TU Munich",
    country: "Germany",
    program: "Computer Science (MS)",
    degree: "MS",
    tuitionAnnual: 300,
    currency: "EUR",
    tuitionUSD: 330,
    duration: "2 years",
    totalCost: 660,
    livingCostUSD: 12000,
    totalProgramCost: 24660,
    ranking: 15,
    type: "public",
    scholarshipsAvailable: true,
    workWhileStudying: "120 full days/year",
  },
  {
    university: "LMU Munich",
    country: "Germany",
    program: "Data Science (MS)",
    degree: "MS",
    tuitionAnnual: 300,
    currency: "EUR",
    tuitionUSD: 330,
    duration: "2 years",
    totalCost: 660,
    livingCostUSD: 12000,
    totalProgramCost: 24660,
    ranking: 32,
    type: "public",
    scholarshipsAvailable: true,
    workWhileStudying: "120 full days/year",
  },
  {
    university: "ETH Zurich",
    country: "Switzerland",
    program: "Computer Science (MS)",
    degree: "MS",
    tuitionAnnual: 1500,
    currency: "CHF",
    tuitionUSD: 1700,
    duration: "1.5 years",
    totalCost: 2550,
    livingCostUSD: 28000,
    totalProgramCost: 44550,
    ranking: 7,
    type: "public",
    scholarshipsAvailable: true,
    workWhileStudying: "15hrs/week",
  },
  {
    university: "University of Toronto",
    country: "Canada",
    program: "Computer Science (MS)",
    degree: "MS",
    tuitionAnnual: 58000,
    currency: "CAD",
    tuitionUSD: 42000,
    duration: "2 years",
    totalCost: 84000,
    livingCostUSD: 18000,
    totalProgramCost: 120000,
    ranking: 18,
    type: "public",
    scholarshipsAvailable: true,
    workWhileStudying: "20hrs/week",
  },
  {
    university: "University of Melbourne",
    country: "Australia",
    program: "Computer Science (MS)",
    degree: "MS",
    tuitionAnnual: 48000,
    currency: "AUD",
    tuitionUSD: 31200,
    duration: "2 years",
    totalCost: 62400,
    livingCostUSD: 20000,
    totalProgramCost: 102400,
    ranking: 25,
    type: "public",
    scholarshipsAvailable: true,
    workWhileStudying: "48hrs/fortnight",
  },
  {
    university: "National University of Singapore",
    country: "Singapore",
    program: "Computer Science (MS)",
    degree: "MS",
    tuitionAnnual: 45000,
    currency: "SGD",
    tuitionUSD: 33750,
    duration: "1.5 years",
    totalCost: 50625,
    livingCostUSD: 18000,
    totalProgramCost: 77625,
    ranking: 11,
    type: "public",
    scholarshipsAvailable: true,
    workWhileStudying: "16hrs/week",
  },
  {
    university: "KAIST",
    country: "South Korea",
    program: "Computer Science (MS)",
    degree: "MS",
    tuitionAnnual: 10000000,
    currency: "KRW",
    tuitionUSD: 7500,
    duration: "2 years",
    totalCost: 15000,
    livingCostUSD: 10000,
    totalProgramCost: 35000,
    ranking: 38,
    type: "public",
    scholarshipsAvailable: true,
    workWhileStudying: "20hrs/week",
  },
  {
    university: "University of Tokyo",
    country: "Japan",
    program: "Computer Science (MS)",
    degree: "MS",
    tuitionAnnual: 817800,
    currency: "JPY",
    tuitionUSD: 5450,
    duration: "2 years",
    totalCost: 10900,
    livingCostUSD: 14000,
    totalProgramCost: 38900,
    ranking: 23,
    type: "public",
    scholarshipsAvailable: true,
    workWhileStudying: "28hrs/week",
  },
  {
    university: "Tsinghua University",
    country: "China",
    program: "Computer Science (MS)",
    degree: "MS",
    tuitionAnnual: 40000,
    currency: "CNY",
    tuitionUSD: 5500,
    duration: "2 years",
    totalCost: 11000,
    livingCostUSD: 8000,
    totalProgramCost: 27000,
    ranking: 12,
    type: "public",
    scholarshipsAvailable: true,
    workWhileStudying: "Limited",
  },
  {
    university: "Seoul National University",
    country: "South Korea",
    program: "Computer Science (MS)",
    degree: "MS",
    tuitionAnnual: 8000000,
    currency: "KRW",
    tuitionUSD: 6000,
    duration: "2 years",
    totalCost: 12000,
    livingCostUSD: 10000,
    totalProgramCost: 32000,
    ranking: 29,
    type: "public",
    scholarshipsAvailable: true,
    workWhileStudying: "20hrs/week",
  },
];

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const country = url.searchParams.get("country");
    const maxBudget = url.searchParams.get("maxBudget");
    const sortBy = url.searchParams.get("sortBy") || "totalProgramCost";

    let results = [...tuitionDatabase];

    if (country) {
      results = results.filter((r) =>
        r.country.toLowerCase().includes(country.toLowerCase())
      );
    }
    if (maxBudget) {
      const budget = parseFloat(maxBudget);
      results = results.filter((r) => r.totalProgramCost <= budget);
    }

    if (sortBy === "totalProgramCost") results.sort((a, b) => a.totalProgramCost - b.totalProgramCost);
    else if (sortBy === "tuitionUSD") results.sort((a, b) => a.tuitionUSD - b.tuitionUSD);
    else if (sortBy === "ranking") results.sort((a, b) => a.ranking - b.ranking);
    else if (sortBy === "livingCostUSD") results.sort((a, b) => a.livingCostUSD - b.livingCostUSD);

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed" },
      { status: 500 }
    );
  }
}
