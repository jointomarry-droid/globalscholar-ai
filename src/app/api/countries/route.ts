import { NextRequest, NextResponse } from "next/server";

const countries = [
  { name: "United States", slug: "united-states", flag: "🇺🇸", scholarshipCount: 45000 },
  { name: "United Kingdom", slug: "united-kingdom", flag: "🇬🇧", scholarshipCount: 32000 },
  { name: "Germany", slug: "germany", flag: "🇩🇪", scholarshipCount: 28000 },
  { name: "Canada", slug: "canada", flag: "🇨🇦", scholarshipCount: 25000 },
  { name: "Australia", slug: "australia", flag: "🇦🇺", scholarshipCount: 22000 },
  { name: "France", slug: "france", flag: "🇫🇷", scholarshipCount: 18000 },
  { name: "Netherlands", slug: "netherlands", flag: "🇳🇱", scholarshipCount: 15000 },
  { name: "Japan", slug: "japan", flag: "🇯🇵", scholarshipCount: 14000 },
  { name: "South Korea", slug: "south-korea", flag: "🇰🇷", scholarshipCount: 12000 },
  { name: "Turkey", slug: "turkey", flag: "🇹🇷", scholarshipCount: 10000 },
  { name: "China", slug: "china", flag: "🇨🇳", scholarshipCount: 20000 },
  { name: "India", slug: "india", flag: "🇮🇳", scholarshipCount: 16000 },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    let results = [...countries];

    if (search) {
      const q = search.toLowerCase();
      results = results.filter((c) => c.name.toLowerCase().includes(q));
    }

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
}
