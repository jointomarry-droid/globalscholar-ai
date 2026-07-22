import { NextResponse } from "next/server";

const universities: Record<string, {
  id: string;
  name: string;
  slug: string;
  country: string;
  countryCode: string;
  city: string;
  website: string;
  logo: string;
  description: string;
  ranking?: number;
  accreditation: string[];
  verified: boolean;
  scholarshipCount: number;
  studentCount?: number;
  foundedYear?: number;
  type: "public" | "private" | "community" | "research";
  specialties: string[];
  createdAt: string;
  updatedAt: string;
}> = {
  "massachusetts-institute-of-technology": {
    id: "uni-1",
    name: "Massachusetts Institute of Technology",
    slug: "massachusetts-institute-of-technology",
    country: "United States",
    countryCode: "US",
    city: "Cambridge",
    website: "https://www.mit.edu",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
    description: "MIT is a world-renowned research university known for its cutting-edge programs in science, engineering, and technology. The institute has produced numerous Nobel laureates, MacArthur Fellows, and entrepreneurs who have founded companies worth trillions of dollars.",
    ranking: 1,
    accreditation: ["NEASC", "ABET"],
    verified: true,
    scholarshipCount: 45,
    studentCount: 11520,
    foundedYear: 1861,
    type: "research",
    specialties: ["Engineering", "Computer Science", "Physics", "Mathematics", "Business"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  "stanford-university": {
    id: "uni-2",
    name: "Stanford University",
    slug: "stanford-university",
    country: "United States",
    countryCode: "US",
    city: "Stanford",
    website: "https://www.stanford.edu",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Seal_of_Leland_Stanford_Junior_University.svg",
    description: "Stanford is one of the world's leading research universities, known for its entrepreneurial culture and groundbreaking discoveries. Located in the heart of Silicon Valley, Stanford has been the launching pad for many successful tech companies.",
    ranking: 2,
    accreditation: ["WSCUC"],
    verified: true,
    scholarshipCount: 38,
    studentCount: 8049,
    foundedYear: 1885,
    type: "private",
    specialties: ["Computer Science", "Business", "Engineering", "Law", "Medicine"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  "university-of-oxford": {
    id: "uni-3",
    name: "University of Oxford",
    slug: "university-of-oxford",
    country: "United Kingdom",
    countryCode: "GB",
    city: "Oxford",
    website: "https://www.ox.ac.uk",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/University_of_Oxford_logo.svg",
    description: "The University of Oxford is the oldest university in the English-speaking world, with a history spanning over 900 years. It has produced 28 British prime ministers and 60 Nobel laureates.",
    ranking: 3,
    accreditation: ["QAA"],
    verified: true,
    scholarshipCount: 52,
    studentCount: 24520,
    foundedYear: 1096,
    type: "public",
    specialties: ["Humanities", "Medicine", "Law", "Sciences", "Social Sciences"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  "technical-university-of-munich": {
    id: "uni-4",
    name: "Technical University of Munich",
    slug: "technical-university-of-munich",
    country: "Germany",
    countryCode: "DE",
    city: "Munich",
    website: "https://www.tum.de",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Logo_der_Technischen_Universit%C3%A4t_M%C3%BCnchen.svg",
    description: "TUM is one of Europe's leading technical universities, known for excellence in engineering and the natural sciences. It consistently ranks among the top universities in Germany and Europe.",
    ranking: 15,
    accreditation: ["ACQUIN"],
    verified: true,
    scholarshipCount: 35,
    studentCount: 45600,
    foundedYear: 1868,
    type: "public",
    specialties: ["Engineering", "Natural Sciences", "Medicine", "Informatics", "Management"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  "university-of-tokyo": {
    id: "uni-5",
    name: "University of Tokyo",
    slug: "university-of-tokyo",
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    website: "https://www.u-tokyo.ac.jp",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Seal_of_the_University_of_Tokyo.svg",
    description: "The University of Tokyo is Japan's most prestigious university, leading in research across all disciplines. It has produced numerous leaders in science, politics, and business.",
    ranking: 20,
    accreditation: ["JUAA"],
    verified: true,
    scholarshipCount: 28,
    studentCount: 28200,
    foundedYear: 1877,
    type: "public",
    specialties: ["Sciences", "Engineering", "Medicine", "Law", "Agriculture"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  "seoul-national-university": {
    id: "uni-6",
    name: "Seoul National University",
    slug: "seoul-national-university",
    country: "South Korea",
    countryCode: "KR",
    city: "Seoul",
    website: "https://www.snu.ac.kr",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Seoul_National_University_emblem.svg",
    description: "SNU is South Korea's flagship national university, consistently ranked as the top university in the country. It has a strong global reputation for research and education.",
    ranking: 25,
    accreditation: ["KCUE"],
    verified: true,
    scholarshipCount: 42,
    studentCount: 31500,
    foundedYear: 1946,
    type: "public",
    specialties: ["Engineering", "Business", "Medicine", "Law", "Liberal Arts"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const university = universities[slug];

    if (!university) {
      return NextResponse.json(
        { success: false, error: "University not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: university,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch university" },
      { status: 500 }
    );
  }
}
