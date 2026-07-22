import { NextResponse } from "next/server";

// Cost of Living Calculator API
// Compare living costs across different student cities worldwide

export interface CityCostData {
  city: string;
  country: string;
  countryCode: string;
  currency: string;
  averageMonthlyRent: number;
  sharedAccommodation: number;
  utilities: number;
  food: number;
  transportation: number;
  internet: number;
  healthInsurance: number;
  entertainment: number;
  miscellaneous: number;
  totalMonthly: number;
  tuitionRange: string;
  avgTuitionUSD: number;
  qualityOfLife: number; // 1-10
  safetyIndex: number; // 1-10
  studentFriendliness: number; // 1-10
  climate: string;
  language: string;
  pros: string[];
  cons: string[];
  universities: string[];
}

const costDatabase: CityCostData[] = [
  {
    city: "Munich",
    country: "Germany",
    countryCode: "DE",
    currency: "EUR",
    averageMonthlyRent: 850,
    sharedAccommodation: 450,
    utilities: 150,
    food: 300,
    transportation: 60,
    internet: 35,
    healthInsurance: 110,
    entertainment: 150,
    miscellaneous: 100,
    totalMonthly: 1255,
    tuitionRange: "€0 - €3,000/year",
    avgTuitionUSD: 500,
    qualityOfLife: 9,
    safetyIndex: 9,
    studentFriendliness: 8,
    climate: "Continental - Cold winters, warm summers",
    language: "German (English widely spoken)",
    pros: ["No tuition at public universities", "Excellent public transport", "Strong economy", "Central European location", "High quality of life"],
    cons: ["High rent in city center", "Bureaucracy can be slow", "German language helpful for daily life", "Competitive housing market"],
    universities: ["TU Munich", "LMU Munich", "Munich Business School"],
  },
  {
    city: "Tokyo",
    country: "Japan",
    countryCode: "JP",
    currency: "JPY",
    averageMonthlyRent: 70000,
    sharedAccommodation: 40000,
    utilities: 10000,
    food: 35000,
    transportation: 10000,
    internet: 5000,
    healthInsurance: 2000,
    entertainment: 15000,
    miscellaneous: 10000,
    totalMonthly: 127000,
    tuitionRange: "¥535,800 - ¥900,000/year",
    avgTuitionUSD: 5000,
    qualityOfLife: 8,
    safetyIndex: 10,
    studentFriendliness: 7,
    climate: "Humid subtropical - Hot summers, mild winters",
    language: "Japanese (English limited outside universities)",
    pros: ["Extremely safe", "World-class universities", "Rich culture", "Excellent public transport", "Delicious food"],
    cons: ["Expensive housing in central areas", "Language barrier", "Dense and crowded", "Earthquake risk", "Work culture can be demanding"],
    universities: ["University of Tokyo", "Keio University", "Waseda University"],
  },
  {
    city: "London",
    country: "United Kingdom",
    countryCode: "GB",
    currency: "GBP",
    averageMonthlyRent: 1500,
    sharedAccommodation: 800,
    utilities: 150,
    food: 400,
    transportation: 180,
    internet: 35,
    healthInsurance: 0,
    entertainment: 250,
    miscellaneous: 150,
    totalMonthly: 2265,
    tuitionRange: "£9,250 - £38,000/year",
    avgTuitionUSD: 35000,
    qualityOfLife: 8,
    safetyIndex: 7,
    studentFriendliness: 8,
    climate: "Oceanic - Mild year-round, rainy",
    language: "English",
    pros: ["World-leading universities", "Diverse and multicultural", "Global career opportunities", "Rich history and culture", "Excellent public transport"],
    cons: ["Very expensive", "High rent", "Rainy weather", "Competitive job market", "Long commutes"],
    universities: ["UCL", "Imperial College", "King's College London", "LSE"],
  },
  {
    city: "Melbourne",
    country: "Australia",
    countryCode: "AU",
    currency: "AUD",
    averageMonthlyRent: 1800,
    sharedAccommodation: 1000,
    utilities: 150,
    food: 500,
    transportation: 150,
    internet: 70,
    healthInsurance: 60,
    entertainment: 300,
    miscellaneous: 200,
    totalMonthly: 2730,
    tuitionRange: "A$20,000 - A$55,000/year",
    avgTuitionUSD: 30000,
    qualityOfLife: 9,
    safetyIndex: 8,
    studentFriendliness: 9,
    climate: "Oceanic - Mild year-round",
    language: "English",
    pros: ["Excellent quality of life", "Multicultural city", "Good public transport", "Beautiful weather", "Strong student community"],
    cons: ["Expensive", "Far from other countries", "Limited public holidays", "Housing market tight"],
    universities: ["University of Melbourne", "Monash University", "RMIT University"],
  },
  {
    city: "Singapore",
    country: "Singapore",
    countryCode: "SG",
    currency: "SGD",
    averageMonthlyRent: 2000,
    sharedAccommodation: 1000,
    utilities: 100,
    food: 400,
    transportation: 100,
    internet: 50,
    healthInsurance: 50,
    entertainment: 300,
    miscellaneous: 200,
    totalMonthly: 2700,
    tuitionRange: "S$20,000 - S$50,000/year",
    avgTuitionUSD: 32000,
    qualityOfLife: 9,
    safetyIndex: 10,
    studentFriendliness: 8,
    climate: "Tropical - Hot and humid year-round",
    language: "English (official), Mandarin, Malay, Tamil",
    pros: ["Extremely safe", "World-class education", "Global business hub", "Excellent infrastructure", "Diverse culture"],
    cons: ["Very expensive housing", "Hot and humid", "Small city-state", "Strict laws", "Limited social life for some"],
    universities: ["NUS", "NTU", "SMU"],
  },
  {
    city: "Zurich",
    country: "Switzerland",
    countryCode: "CH",
    currency: "CHF",
    averageMonthlyRent: 1500,
    sharedAccommodation: 800,
    utilities: 150,
    food: 500,
    transportation: 85,
    internet: 50,
    healthInsurance: 350,
    entertainment: 300,
    miscellaneous: 200,
    totalMonthly: 2935,
    tuitionRange: "CHF 730 - CHF 1,500/semester",
    avgTuitionUSD: 2000,
    qualityOfLife: 10,
    safetyIndex: 10,
    studentFriendliness: 7,
    climate: "Continental - Cold winters, mild summers",
    language: "German (English widely spoken in academia)",
    pros: ["Highest quality of life", "Very safe", "Low tuition", "Beautiful scenery", "Central European location"],
    cons: ["Extremely expensive", "Hard to find housing", "Social life can be reserved", "High cost of everything"],
    universities: ["ETH Zurich", "University of Zurich", "ZHAW"],
  },
  {
    city: "Seoul",
    country: "South Korea",
    countryCode: "KR",
    currency: "KRW",
    averageMonthlyRent: 600000,
    sharedAccommodation: 350000,
    utilities: 50000,
    food: 300000,
    transportation: 55000,
    internet: 20000,
    healthInsurance: 30000,
    entertainment: 200000,
    miscellaneous: 100000,
    totalMonthly: 1105000,
    tuitionRange: "₩4,000,000 - ₩12,000,000/year",
    avgTuitionUSD: 6000,
    qualityOfLife: 8,
    safetyIndex: 9,
    studentFriendliness: 8,
    climate: "Continental - Hot summers, cold winters",
    language: "Korean (English limited)",
    pros: ["Affordable tuition", "Excellent public transport", "K-culture", "Safe", "Strong tech industry"],
    cons: ["Language barrier", "Competitive academic culture", "Air pollution", "Social hierarchy"],
    universities: ["Seoul National University", "KAIST", "Yonsei University"],
  },
  {
    city: "Toronto",
    country: "Canada",
    countryCode: "CA",
    currency: "CAD",
    averageMonthlyRent: 1800,
    sharedAccommodation: 1000,
    utilities: 150,
    food: 450,
    transportation: 156,
    internet: 65,
    healthInsurance: 75,
    entertainment: 300,
    miscellaneous: 200,
    totalMonthly: 2896,
    tuitionRange: "CAD 20,000 - CAD 55,000/year",
    avgTuitionUSD: 28000,
    qualityOfLife: 8,
    safetyIndex: 8,
    studentFriendliness: 9,
    climate: "Continental - Cold winters, warm summers",
    language: "English (and French)",
    pros: ["Multicultural", "Safe", "Good universities", "Path to PR", "Quality healthcare"],
    cons: ["Expensive housing", "Cold winters", "High tuition", "Competitive job market"],
    universities: ["University of Toronto", "McGill University", "UBC"],
  },
];

// GET /api/cost-of-living - List all cities or filter by country
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const country = url.searchParams.get("country");
    const maxBudget = url.searchParams.get("maxBudget");
    const sortBy = url.searchParams.get("sortBy") || "totalMonthly";

    let results = [...costDatabase];

    if (country) {
      results = results.filter(
        (city) => city.country.toLowerCase().includes(country.toLowerCase())
      );
    }

    if (maxBudget) {
      const budget = parseFloat(maxBudget);
      results = results.filter((city) => city.totalMonthly <= budget);
    }

    // Sort
    if (sortBy === "totalMonthly") results.sort((a, b) => a.totalMonthly - b.totalMonthly);
    else if (sortBy === "qualityOfLife") results.sort((a, b) => b.qualityOfLife - a.qualityOfLife);
    else if (sortBy === "safetyIndex") results.sort((a, b) => b.safetyIndex - a.safetyIndex);
    else if (sortBy === "studentFriendliness") results.sort((a, b) => b.studentFriendliness - a.studentFriendliness);

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
      filters: { country, maxBudget, sortBy },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch cost data" },
      { status: 500 }
    );
  }
}
