import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, ChevronRight } from "lucide-react";

const blogPosts: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}> = {
  "ultimate-guide-international-scholarships-2026": {
    title: "The Ultimate Guide to International Scholarships in 2026",
    category: "Guides",
    date: "2026-01-15",
    readTime: "12 min read",
    content: `## Getting Started with International Scholarships

The world of international scholarships can seem overwhelming, but with the right approach, you can significantly increase your chances of success. This guide covers everything you need to know about finding, applying for, and winning scholarships in 2026.

### Step 1: Start Early

One of the most common mistakes students make is waiting too long to start their scholarship search. Many scholarship deadlines are 6-12 months before the program begins. Create a timeline and work backwards from your target program start date.

### Step 2: Research Thoroughly

Use platforms like GlobalScholar AI to discover opportunities you might not find elsewhere. Look beyond the obvious choices - smaller, less-known scholarships often have fewer applicants and higher success rates.

### Step 3: Tailor Your Applications

Never submit a generic application. Research each scholarship's values, mission, and past recipients. Customize your essays, recommendations, and overall narrative to align with what the selection committee is looking for.

### Step 4: Write Compelling Essays

Your essay is often the most important part of your application. Focus on:
- A strong opening hook that grabs attention
- Specific examples and stories that illustrate your qualities
- Clear connections between your goals and the scholarship's mission
- A memorable conclusion that leaves a lasting impression

### Step 5: Get Strong Recommendations

Choose recommenders who know you well and can speak specifically to your qualifications. Give them plenty of time (at least 4-6 weeks) and provide them with your resume, transcript, and a summary of the scholarship.

### Step 6: Follow Up

After submitting your application, follow up to confirm receipt. If you're invited for an interview, prepare thoroughly and practice your responses.

## Common Mistakes to Avoid

- Missing deadlines
- Not following instructions
- Submitting generic applications
- Ignoring eligibility requirements
- Not proofreading carefully

## Conclusion

Winning an international scholarship requires dedication, research, and persistence. Start early, stay organized, and don't be discouraged by rejections. Every application is a learning opportunity that brings you closer to your goal.`,
  },
  "top-fully-funded-scholarships-african-students": {
    title: "Top 10 Fully Funded Scholarships for African Students",
    category: "Scholarships",
    date: "2026-01-10",
    readTime: "8 min read",
    content: `## Fully Funded Opportunities for African Students

Africa has some of the most talented students in the world, and many organizations and governments are investing in their education. Here are the top fully funded scholarships available to African students in 2026.

### 1. Mastercard Foundation Scholars Program
- **Coverage:** Full tuition, books, stipend, accommodation
- **Eligibility:** Students from Sub-Saharan Africa
- **Partner Universities:** McGill, University of Edinburgh, and more

### 2. Mo Ibrahim Foundation Scholarship
- **Coverage:** Full tuition, living expenses, travel
- **Eligibility:** African nationals under 30
- **Focus:** Governance and public leadership

### 3. Chevening Scholarships (UK)
- **Coverage:** Full tuition, monthly stipend, travel
- **Eligibility:** Students from Chevening-eligible countries
- **Duration:** 1 year Master's

### 4. DAAD Scholarships (Germany)
- **Coverage:** Monthly stipend, health insurance
- **Eligibility:** Graduates from developing countries
- **Focus:** Development-related studies

### 5. Fulbright Foreign Student Program (USA)
- **Coverage:** Full tuition, living allowance, airfare
- **Eligibility:** Students from eligible countries
- **Duration:** Graduate study/research

### 6. Australia Awards
- **Coverage:** Full tuition, living allowance, airfare
- **Eligibility:** Students from developing countries
- **Focus:** Development-related fields

### 7. Erasmus Mundus Joint Master Degrees
- **Coverage:** Full tuition, monthly allowance, travel
- **Eligibility:** Students worldwide
- **Duration:** 2-year joint Master's

### 8. Swedish Institute Scholarships
- **Coverage:** Full tuition, living allowance, travel
- **Eligibility:** Students from eligible countries
- **Duration:** 1-2 year Master's

### 9. Gates Cambridge Scholarship
- **Coverage:** Full cost of study, living allowance, travel
- **Eligibility:** Students outside UK
- **Duration:** Postgraduate study at Cambridge

### 10. Aga Khan Foundation International Scholarship
- **Coverage:** 50% grant, 50% loan
- **Eligibility:** Students from developing countries
- **Focus:** Postgraduate study

## Tips for African Applicants

1. Start preparing at least 12 months in advance
2. Take English proficiency tests early
3. Build a strong research profile
4. Network with alumni of these programs
5. Apply to multiple scholarships simultaneously`,
  },
  "writing-winning-statement-of-purpose": {
    title: "How to Write a Winning Statement of Purpose",
    category: "Essay Tips",
    date: "2026-01-08",
    readTime: "10 min read",
    content: `## What is a Statement of Purpose?

A Statement of Purpose (SOP) is your opportunity to tell the admissions committee who you are, what you've accomplished, and why you're the right fit for their program. It's one of the most critical components of your application.

### Structure of a Great SOP

#### 1. Opening Hook (1 paragraph)
Start with a compelling story or insight that draws the reader in. Avoid generic openings like "I have always been passionate about..."

#### 2. Academic Background (2-3 paragraphs)
Discuss your relevant academic experiences, research projects, and how they prepared you for graduate study.

#### 3. Research Interests (1-2 paragraphs)
Clearly articulate your research interests and how they align with the program's strengths.

#### 4. Why This Program (1 paragraph)
Explain specifically why you chose this program, mentioning particular faculty, labs, or resources.

#### 5. Career Goals (1 paragraph)
Describe your long-term career aspirations and how this program will help you achieve them.

#### 6. Conclusion (1 paragraph)
Summarize your fit and express enthusiasm for the program.

### Common SOP Mistakes

1. Being too generic
2. Repeating your resume
3. Not addressing weaknesses
4. Using inappropriate humor
5. Exceeding the word limit
6. Not proofreading

### Revision Tips

- Write multiple drafts
- Get feedback from mentors
- Read it aloud
- Check for grammar and spelling
- Ensure it tells a coherent story`,
  },
  "erasus-mundus-vs-chevening": {
    title: "Erasmus Mundus vs Chevening: Which is Right for You?",
    category: "Comparisons",
    date: "2026-01-05",
    readTime: "7 min read",
    content: `## Two Prestigious Scholarships Compared

Both Erasmus Mundus and Chevening are world-renowned scholarship programs, but they serve different purposes and have distinct selection criteria. Here's how to decide which is right for you.

### Erasmus Mundus Joint Master Degrees

**Overview:** Integrated international study programs delivered by consortia of European universities.

**Key Features:**
- Study at 2-3 European universities
- Joint degree from multiple institutions
- Strong emphasis on international mobility
- Research-oriented programs

**Ideal For:**
- Students seeking truly international experience
- Those interested in research-based Master's
- Applicants with strong academic records

### Chevening Scholarships

**Overview:** UK government's global scholarship program for future leaders.

**Key Features:**
- Study at any UK university
- Focus on leadership and networking
- Professional development opportunities
- Alumni network of 50,000+

**Ideal For:**
- Mid-career professionals
- Those with leadership potential
- Students interested in UK education

### Comparison Table

| Aspect | Erasmus Mundus | Chevening |
|--------|---------------|-----------|
| Location | Multiple European countries | UK only |
| Degree | Joint Master's | Any postgraduate |
| Focus | Academic excellence | Leadership potential |
| Duration | 1-2 years | 1 year |
| Work Experience | Not required | 2+ years required |
| Age Limit | None | None |

### Decision Framework

Choose **Erasmus Mundus** if:
- You want international exposure
- You're research-focused
- You have strong academic record

Choose **Chevening** if:
- You want UK connections
- You have leadership experience
- You're mid-career`,
  },
  "ielts-requirements-scholarships": {
    title: "Understanding IELTS Requirements for Scholarships",
    category: "Test Prep",
    date: "2026-01-03",
    readTime: "6 min read",
    content: `## IELTS Score Requirements Explained

Understanding IELTS requirements is crucial for scholarship applications. Here's what you need to know about score requirements and alternatives.

### Typical IELTS Requirements by Country

**United Kingdom:**
- Undergraduate: 6.0 - 6.5
- Postgraduate: 6.5 - 7.0
- Competitive scholarships: 7.0+

**United States:**
- Most programs: 6.5 - 7.0
- Top universities: 7.0 - 7.5
- Some programs accept TOEFL

**Canada:**
- Undergraduate: 6.0 - 6.5
- Postgraduate: 6.5 - 7.0

**Australia:**
- Undergraduate: 6.0 - 6.5
- Postgraduate: 6.5 - 7.0

**Germany:**
- English-taught programs: 6.0 - 6.5
- Some accept Medium of Instruction letter

### Alternatives to IELTS

1. **TOEFL iBT:** Widely accepted, especially in US
2. **Duolingo English Test:** Accepted by growing number of institutions
3. **Medium of Instruction (MOI) Letter:** Some scholarships accept this instead
4. **PTE Academic:** Accepted by many universities

### Tips for IELTS Preparation

1. Start preparation at least 3 months before test date
2. Take practice tests regularly
3. Focus on weak areas
4. Use official IELTS preparation materials
5. Consider taking the test multiple times

### What to Do If Your Score Is Below Requirements

1. Retake the test after more preparation
2. Apply to programs with lower requirements
3. Look for scholarships that don't require IELTS
4. Consider pathway programs
5. Apply for MOI letter from previous institution`,
  },
  "common-mistakes-scholarship-applications": {
    title: "5 Common Mistakes in Scholarship Applications",
    category: "Tips",
    date: "2026-01-01",
    readTime: "5 min read",
    content: `## Avoid These Costly Mistakes

Every year, thousands of qualified students miss out on scholarships due to preventable mistakes. Here are the five most common errors and how to avoid them.

### Mistake #1: Missing Deadlines

**The Problem:** Many students underestimate how early they need to start. Scholarship deadlines are often 6-12 months before the program begins.

**The Solution:** Create a master calendar of all deadlines. Work backwards from each deadline to create preparation timelines. Set reminders at least 2 weeks before each deadline.

### Mistake #2: Not Following Instructions

**The Problem:** Selection committees receive thousands of applications. Not following instructions signals carelessness and gets your application rejected.

**The Solution:** Read every instruction carefully. Create a checklist of requirements. Have someone else review your application before submitting.

### Mistake #3: Submitting Generic Applications

**The Problem:** Using the same application for every scholarship wastes your opportunity to make a strong case for each specific program.

**The Solution:** Research each scholarship's values and mission. Customize your essays and narrative for each application. Show how you align with their specific criteria.

### Mistake #4: Ignoring Eligibility Requirements

**The Problem:** Applying to scholarships you're not eligible for wastes time and resources.

**The Solution:** Read eligibility requirements carefully before applying. Don't assume you qualify. When in doubt, contact the scholarship provider.

### Mistake #5: Not Proofreading

**The Problem:** Typos, grammatical errors, and factual mistakes make you look unprofessional and careless.

**The Solution:** Proofread multiple times. Use grammar checking tools. Have someone else read your application. Take a break before doing a final review.

### Bonus Tips

- Start your applications early
- Get strong recommendation letters
- Quantify your achievements
- Show, don't tell
- Keep copies of everything`,
  },
  "scholarship-deadlines-q1-2026": {
    title: "Scholarship Deadlines to Watch in Q1 2026",
    category: "Deadlines",
    date: "2025-12-28",
    readTime: "4 min read",
    content: `## Important Deadlines Coming Up

Don't miss these scholarship deadlines in the first quarter of 2026. Mark your calendar and start preparing now.

### January 2026

- **Fulbright Foreign Student Program** - Varies by country
- **Chevening Scholarships** - November deadline, but prepare now

### February 2026

- **Erasmus Mundus Joint Master Degrees** - Typically February-March
- **Gates Cambridge Scholarship** - Early December, but check

### March 2026

- **DAAD Scholarships** - October-November, but prepare now
- **Australia Awards** - April deadline, start early

### April 2026

- **MEXT Japanese Government Scholarship** - April deadline
- **Swedish Institute Scholarships** - February deadline

### How to Prepare

1. Create a spreadsheet of all deadlines
2. Start applications 2-3 months before deadline
3. Request recommendation letters early
4. Take English proficiency tests early
5. Gather all required documents

### Last-Minute Tips

- Submit applications at least 2-3 days before the deadline
- Keep copies of everything you submit
- Follow up to confirm receipt
- Don't panic if you miss one deadline - there are many others`,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.content.substring(0, 160),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Link href="/blog" className="hover:text-[var(--primary)]">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--foreground)]">{post.title}</span>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-3">{post.category}</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.content.split("\n\n").map((section, i) => {
            if (section.startsWith("## ")) {
              return <h2 key={i}>{section.replace("## ", "")}</h2>;
            }
            if (section.startsWith("### ")) {
              return <h3 key={i}>{section.replace("### ", "")}</h3>;
            }
            if (section.startsWith("- ")) {
              const items = section.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={i}>
                  {items.map((item, j) => (
                    <li key={j}>{item.replace("- ", "").replace(/\*\*/g, "")}</li>
                  ))}
                </ul>
              );
            }
            if (section.startsWith("| ")) {
              const rows = section.split("\n").filter((r) => r.startsWith("|"));
              return (
                <div key={i} className="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        {rows[0].split("|").filter(Boolean).map((h, j) => (
                          <th key={j}>{h.trim()}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.slice(2).map((row, j) => (
                        <tr key={j}>
                          {row.split("|").filter(Boolean).map((cell, k) => (
                            <td key={k}>{cell.trim()}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            return <p key={i}>{section}</p>;
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 rounded-xl bg-[var(--accent)] text-center">
          <h3 className="text-lg font-semibold mb-2">Ready to find your scholarship?</h3>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">
            Use our AI-powered search to discover opportunities that match your profile.
          </p>
          <Button asChild>
            <Link href="/scholarships">
              Browse Scholarships
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
