import { NextResponse } from "next/server";

// Research Supervisor Finder API
// Find potential PhD supervisors based on research interests

export interface ResearchSupervisor {
  id: string;
  name: string;
  title: string;
  university: string;
  country: string;
  department: string;
  email: string;
  website: string;
  researchAreas: string[];
  hIndex: number;
  citations: number;
  publications: number;
  phdPositions: boolean;
  fundingAvailable: boolean;
  acceptInternational: boolean;
  languages: string[];
  lastUpdated: string;
}

const supervisorsDatabase: ResearchSupervisor[] = [
  {
    id: "sup-001",
    name: "Dr. Fei-Fei Li",
    title: "Professor of Computer Science",
    university: "Stanford University",
    country: "United States",
    department: "Computer Science",
    email: "feifei@cs.stanford.edu",
    website: "https://profiles.stanford.edu/fei-fei-li",
    researchAreas: ["Computer Vision", "Machine Learning", "AI", "Deep Learning", "Image Recognition"],
    hIndex: 172,
    citations: 200000,
    publications: 300,
    phdPositions: true,
    fundingAvailable: true,
    acceptInternational: true,
    languages: ["English", "Mandarin"],
    lastUpdated: "2025-01-15",
  },
  {
    id: "sup-002",
    name: "Prof. Andrew Ng",
    title: "Adjunct Professor",
    university: "Stanford University",
    country: "United States",
    department: "Computer Science",
    email: "ang@cs.stanford.edu",
    website: "https://profiles.stanford.edu/andrew-ng",
    researchAreas: ["Machine Learning", "Deep Learning", "AI", "NLP", "Education AI"],
    hIndex: 180,
    citations: 250000,
    publications: 400,
    phdPositions: false,
    fundingAvailable: true,
    acceptInternational: true,
    languages: ["English"],
    lastUpdated: "2025-01-10",
  },
  {
    id: "sup-003",
    name: "Dr. Yoshua Bengio",
    title: "Professor and Scientific Director",
    university: "Université de Montréal",
    country: "Canada",
    department: "Mila - Quebec AI Institute",
    email: "yoshua.bengio@mila.quebec",
    website: "https://mila.quebec/en/yoshua-bengio",
    researchAreas: ["Deep Learning", "AI", "Machine Learning", "NLP", "AI Safety"],
    hIndex: 250,
    citations: 400000,
    publications: 500,
    phdPositions: true,
    fundingAvailable: true,
    acceptInternational: true,
    languages: ["English", "French"],
    lastUpdated: "2025-02-01",
  },
  {
    id: "sup-004",
    name: "Prof. Geoffrey Hinton",
    title: "Professor Emeritus",
    university: "University of Toronto",
    country: "Canada",
    department: "Computer Science",
    email: "hinton@cs.toronto.edu",
    website: "https://www.cs.toronto.edu/~hinton/",
    researchAreas: ["Neural Networks", "Deep Learning", "Machine Learning", "AI"],
    hIndex: 200,
    citations: 600000,
    publications: 350,
    phdPositions: false,
    fundingAvailable: true,
    acceptInternational: true,
    languages: ["English"],
    lastUpdated: "2024-12-20",
  },
  {
    id: "sup-005",
    name: "Dr. Demis Hassabis",
    title: "CEO and Co-Founder",
    university: "DeepMind / UCL",
    country: "United Kingdom",
    department: "Gatsby Computational Neuroscience Unit",
    email: "d.hassabis@ucl.ac.uk",
    website: "https://www.gatsby.ucl.ac.uk/people/hassabis",
    researchAreas: ["AI", "Neuroscience", "Reinforcement Learning", "Game Playing AI"],
    hIndex: 80,
    citations: 30000,
    publications: 150,
    phdPositions: true,
    fundingAvailable: true,
    acceptInternational: true,
    languages: ["English"],
    lastUpdated: "2025-01-20",
  },
  {
    id: "sup-006",
    name: "Prof. Jürgen Schmidhuber",
    title: "Co-Director",
    university: "KAIST",
    country: "South Korea",
    department: "AI Lab",
    email: "juergen@idsia.ch",
    website: "https://schmidhuber.net/",
    researchAreas: ["Deep Learning", "Reinforcement Learning", "LSTMs", "AI", "Curiosity"],
    hIndex: 150,
    citations: 120000,
    publications: 500,
    phdPositions: true,
    fundingAvailable: true,
    acceptInternational: true,
    languages: ["English", "German"],
    lastUpdated: "2025-02-10",
  },
  {
    id: "sup-007",
    name: "Dr. Kaiming He",
    title: "Assistant Professor",
    university: "MIT",
    country: "United States",
    department: "Computer Science and Artificial Intelligence Laboratory (CSAIL)",
    email: "kaiming@mit.edu",
    website: "https://people.csail.mit.edu/kaiming/",
    researchAreas: ["Computer Vision", "Deep Learning", "Object Detection", "Image Segmentation"],
    hIndex: 120,
    citations: 200000,
    publications: 100,
    phdPositions: true,
    fundingAvailable: true,
    acceptInternational: true,
    languages: ["English", "Mandarin"],
    lastUpdated: "2025-01-25",
  },
  {
    id: "sup-008",
    name: "Prof. Ian Goodfellow",
    title: "Research Scientist",
    university: "Google DeepMind",
    country: "United States",
    department: "Machine Learning",
    email: "goodfellow@google.com",
    website: "https://www.deeplearninggoodfellow.com/",
    researchAreas: ["Generative Adversarial Networks", "Deep Learning", "Machine Learning", "AI"],
    hIndex: 100,
    citations: 150000,
    publications: 120,
    phdPositions: false,
    fundingAvailable: true,
    acceptInternational: true,
    languages: ["English"],
    lastUpdated: "2025-01-30",
  },
  {
    id: "sup-009",
    name: "Dr. Li Fei-Fei",
    title: "Professor",
    university: "Tsinghua University",
    country: "China",
    department: "Computer Science",
    email: "fei-fei@tsinghua.edu.cn",
    website: "https://www.cs.tsinghua.edu.cn/",
    researchAreas: ["AI", "Machine Learning", "NLP", "Computer Vision"],
    hIndex: 90,
    citations: 60000,
    publications: 200,
    phdPositions: true,
    fundingAvailable: true,
    acceptInternational: true,
    languages: ["English", "Mandarin"],
    lastUpdated: "2025-02-05",
  },
  {
    id: "sup-010",
    name: "Prof. Sepp Hochreiter",
    title: "Professor",
    university: "TU Munich",
    country: "Germany",
    department: "Informatics",
    email: "sepp.hochreiter@tum.de",
    website: "https://www.in.tum.de/en/hochreiter",
    researchAreas: ["LSTMs", "Machine Learning", "Deep Learning", "Bioinformatics", "AI"],
    hIndex: 80,
    citations: 50000,
    publications: 300,
    phdPositions: true,
    fundingAvailable: true,
    acceptInternational: true,
    languages: ["English", "German"],
    lastUpdated: "2025-01-18",
  },
  {
    id: "sup-011",
    name: "Dr. Yann LeCun",
    title: "VP & Chief AI Scientist",
    university: "Meta AI / NYU",
    country: "United States",
    department: "Center for Data Science",
    email: "yann@cs.nyu.edu",
    website: "https://yann.lecun.com/",
    researchAreas: ["Deep Learning", "Computer Vision", "Energy-Based Models", "Self-Supervised Learning"],
    hIndex: 180,
    citations: 300000,
    publications: 350,
    phdPositions: true,
    fundingAvailable: true,
    acceptInternational: true,
    languages: ["English", "French"],
    lastUpdated: "2025-02-08",
  },
  {
    id: "sup-012",
    name: "Prof. Pieter Abbeel",
    title: "Professor",
    university: "UC Berkeley",
    country: "United States",
    department: "EECS",
    email: "pabbeel@berkeley.edu",
    website: "https://people.eecs.berkeley.edu/~pabbeel/",
    researchAreas: ["Robotics", "Deep Learning", "Reinforcement Learning", "Computer Vision"],
    hIndex: 100,
    citations: 80000,
    publications: 250,
    phdPositions: true,
    fundingAvailable: true,
    acceptInternational: true,
    languages: ["English"],
    lastUpdated: "2025-01-22",
  },
];

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const researchArea = url.searchParams.get("area");
    const university = url.searchParams.get("university");
    const country = url.searchParams.get("country");
    const funding = url.searchParams.get("funding");
    const positions = url.searchParams.get("positions");

    let results = [...supervisorsDatabase];

    if (researchArea) {
      results = results.filter((r) =>
        r.researchAreas.some((a) =>
          a.toLowerCase().includes(researchArea.toLowerCase())
        )
      );
    }
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
    if (funding === "true") {
      results = results.filter((r) => r.fundingAvailable);
    }
    if (positions === "true") {
      results = results.filter((r) => r.phdPositions);
    }

    results.sort((a, b) => b.hIndex - a.hIndex);

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
