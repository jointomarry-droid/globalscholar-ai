import { NextResponse } from "next/server";

// Online Course Platform APIs
// Coursera, edX, FutureLearn integration

export interface OnlineCourse {
  id: string;
  title: string;
  provider: "coursera" | "edx" | "futurelearn";
  university: string;
  country: string;
  field: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  language: string;
  price: string;
  rating: number;
  enrolledStudents: number;
  certificate: boolean;
  description: string;
  url: string;
  image: string;
  skills: string[];
  category: string;
}

const courseDatabase: OnlineCourse[] = [
  // Coursera courses
  {
    id: "coursera-ml-stanford",
    title: "Machine Learning Specialization",
    provider: "coursera",
    university: "Stanford University",
    country: "United States",
    field: "Artificial Intelligence",
    level: "intermediate",
    duration: "3 months",
    language: "English",
    price: "$49/month",
    rating: 4.9,
    enrolledStudents: 4500000,
    certificate: true,
    description: "Learn machine learning fundamentals from Stanford professor Andrew Ng. Build ML models with NumPy & scikit-learn.",
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    image: "https://d3njjcbhbojpi.cloudfront.net/ee/0be1e3e2fd7a6bb7f4c6d6e1a6d0d2d7.png",
    skills: ["Machine Learning", "Python", "TensorFlow", "Neural Networks"],
    category: "Computer Science",
  },
  {
    id: "coursera-data-google",
    title: "Google Data Analytics Professional Certificate",
    provider: "coursera",
    university: "Google",
    country: "United States",
    field: "Data Science",
    level: "beginner",
    duration: "6 months",
    language: "English",
    price: "$49/month",
    rating: 4.8,
    enrolledStudents: 2800000,
    certificate: true,
    description: "Gain job-ready skills: SQL, R programming, Tableau, data cleaning, and data visualization.",
    url: "https://www.coursera.org/professional-certificates/google-data-analytics",
    image: "https://d3njjcbhbojpi.cloudfront.net/0f/5b49e3e8d11a7c4c1f8c6c7b5c7b5c7b.png",
    skills: ["SQL", "R", "Tableau", "Data Analysis", "Data Visualization"],
    category: "Data Science",
  },
  {
    id: "coursera-crypto-princeton",
    title: "Bitcoin and Cryptocurrency Technologies",
    provider: "coursera",
    university: "Princeton University",
    country: "United States",
    field: "Computer Science",
    level: "intermediate",
    duration: "7 weeks",
    language: "English",
    price: "Free (Certificate $49)",
    rating: 4.7,
    enrolledStudents: 1200000,
    certificate: true,
    description: "Learn about cryptographic currencies, blockchain technology, and the future of digital money.",
    url: "https://www.coursera.org/learn/cryptocurrency",
    image: "https://d3njjcbhbojpi.cloudfront.net/btc.png",
    skills: ["Blockchain", "Cryptocurrency", "Cryptography", "Decentralization"],
    category: "Computer Science",
  },
  // edX courses
  {
    id: "edx-cs50-harvard",
    title: "CS50: Introduction to Computer Science",
    provider: "edx",
    university: "Harvard University",
    country: "United States",
    field: "Computer Science",
    level: "beginner",
    duration: "12 weeks",
    language: "English",
    price: "Free (Certificate $149)",
    rating: 4.9,
    enrolledStudents: 3500000,
    certificate: true,
    description: "Harvard's most popular course. Learn algorithmic thinking, data structures, and web development.",
    url: "https://www.edx.org/course/cs50s-introduction-to-computer-science",
    image: "https://prod-discovery.edx-cdn.org/media/course/image/cs50.png",
    skills: ["C", "Python", "SQL", "HTML/CSS", "JavaScript"],
    category: "Computer Science",
  },
  {
    id: "edx-ai-mit",
    title: "Introduction to Deep Learning with TensorFlow",
    provider: "edx",
    university: "Massachusetts Institute of Technology",
    country: "United States",
    field: "Artificial Intelligence",
    level: "intermediate",
    duration: "8 weeks",
    language: "English",
    price: "Free (Certificate $149)",
    rating: 4.8,
    enrolledStudents: 800000,
    certificate: true,
    description: "Master deep learning fundamentals using TensorFlow. Build neural networks for real-world applications.",
    url: "https://www.edx.org/course/introduction-to-deep-learning-with-tensorflow",
    image: "https://prod-discovery.edx-cdn.org/media/course/image/mit-ai.png",
    skills: ["Deep Learning", "TensorFlow", "Neural Networks", "Python"],
    category: "Artificial Intelligence",
  },
  {
    id: "edx-business-columbia",
    title: "Business Analytics Specialization",
    provider: "edx",
    university: "Columbia University",
    country: "United States",
    field: "Business",
    level: "intermediate",
    duration: "6 months",
    language: "English",
    price: "$300/month",
    rating: 4.6,
    enrolledStudents: 450000,
    certificate: true,
    description: "Learn business analytics with Excel, SQL, and Tableau. Real-world case studies.",
    url: "https://www.edx.org/professional-certificate/columbia-business-analytics",
    image: "https://prod-discovery.edx-cdn.org/media/course/image/columbia-ba.png",
    skills: ["Excel", "SQL", "Tableau", "Business Analytics", "Data Visualization"],
    category: "Business",
  },
  // FutureLearn courses
  {
    id: "futurelearn-ai-edinburgh",
    title: "Introduction to Artificial Intelligence",
    provider: "futurelearn",
    university: "University of Edinburgh",
    country: "United Kingdom",
    field: "Artificial Intelligence",
    level: "beginner",
    duration: "6 weeks",
    language: "English",
    price: "Free (Upgrade $79)",
    rating: 4.7,
    enrolledStudents: 350000,
    certificate: true,
    description: "Explore AI concepts, machine learning, and how AI is changing the world.",
    url: "https://www.futurelearn.com/courses/introduction-to-ai",
    image: "https://www.futurelearn.com/media/images/courses/intro-ai.png",
    skills: ["Artificial Intelligence", "Machine Learning", "Data Science"],
    category: "Artificial Intelligence",
  },
  {
    id: "futurelearn-data-london",
    title: "Data Science for All",
    provider: "futurelearn",
    university: "University of London",
    country: "United Kingdom",
    field: "Data Science",
    level: "beginner",
    duration: "8 weeks",
    language: "English",
    price: "Free (Certificate $79)",
    rating: 4.5,
    enrolledStudents: 280000,
    certificate: true,
    description: "Learn data science fundamentals: Python, statistics, and data visualization.",
    url: "https://www.futurelearn.com/courses/data-science-for-all",
    image: "https://www.futurelearn.com/media/images/courses/data-science.png",
    skills: ["Python", "Statistics", "Data Visualization", "Pandas"],
    category: "Data Science",
  },
  {
    id: "futurelearn-cyber-macquarie",
    title: "Cybersecurity Fundamentals",
    provider: "futurelearn",
    university: "Macquarie University",
    country: "Australia",
    field: "Cybersecurity",
    level: "beginner",
    duration: "6 weeks",
    language: "English",
    price: "Free (Upgrade $79)",
    rating: 4.6,
    enrolledStudents: 180000,
    certificate: true,
    description: "Learn cybersecurity essentials: network security, cryptography, and ethical hacking.",
    url: "https://www.futurelearn.com/courses/cybersecurity-fundamentals",
    image: "https://www.futurelearn.com/media/images/courses/cybersecurity.png",
    skills: ["Cybersecurity", "Network Security", "Cryptography", "Ethical Hacking"],
    category: "Cybersecurity",
  },
];

// GET /api/courses - List online courses
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const provider = url.searchParams.get("provider");
    const field = url.searchParams.get("field");
    const level = url.searchParams.get("level");
    const university = url.searchParams.get("university");
    const search = url.searchParams.get("search");
    const sortBy = url.searchParams.get("sortBy") || "rating";
    const limit = parseInt(url.searchParams.get("limit") || "50");

    let results = [...courseDatabase];

    if (provider) results = results.filter((c) => c.provider === provider);
    if (field) results = results.filter((c) => c.field.toLowerCase().includes(field.toLowerCase()));
    if (level) results = results.filter((c) => c.level === level);
    if (university) results = results.filter((c) => c.university.toLowerCase().includes(university.toLowerCase()));
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (sortBy === "rating") results.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "enrolled") results.sort((a, b) => b.enrolledStudents - a.enrolledStudents);
    else if (sortBy === "title") results.sort((a, b) => a.title.localeCompare(b.title));

    results = results.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: results,
      meta: {
        total: results.length,
        providers: ["Coursera", "edX", "FutureLearn"],
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
