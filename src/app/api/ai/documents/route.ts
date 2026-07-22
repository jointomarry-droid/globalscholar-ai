import { NextResponse } from "next/server";

// AI Document Generation Hub
// Generates SOP, LOR, CV, Motivation Letters, Research Proposals

export interface DocumentRequest {
  type: "sop" | "lor" | "cv" | "motivation_letter" | "research_proposal" | "cover_letter" | "email_to_professor";
  studentProfile: {
    name: string;
    degree: string;
    field: string;
    university?: string;
    gpa?: number;
    workExperience?: number;
    researchInterests?: string[];
    achievements?: string[];
    targetUniversity?: string;
    targetProgram?: string;
    targetCountry?: string;
  };
  additionalContext?: string;
  language?: string;
  tone?: "formal" | "professional" | "academic" | "personal";
}

const documentTemplates: Record<string, {
  systemPrompt: string;
  structure: string;
  tips: string[];
}> = {
  sop: {
    systemPrompt: "You are an expert academic writer specializing in Statements of Purpose for university admissions. Write compelling, personalized SOPs that highlight the student's journey, motivations, and future goals.",
    structure: `
1. Opening Hook - A compelling personal anecdote or moment that sparked your interest
2. Academic Background - Your educational journey and key learnings
3. Research/Professional Experience - Relevant work or research
4. Why This Program - Specific reasons for choosing this program/university
5. Career Goals - Short-term and long-term objectives
6. Conclusion - Strong closing that ties everything together
    `,
    tips: [
      "Be specific about your research interests",
      "Mention specific professors or labs you want to work with",
      "Show, don't tell - use concrete examples",
      "Keep it between 800-1200 words",
      "Avoid generic statements",
    ],
  },
  lor: {
    systemPrompt: "You are an expert academic advisor who writes strong Letters of Recommendation. Create persuasive LORs that highlight the student's strengths with specific examples.",
    structure: `
1. Introduction - Your relationship with the student and duration
2. Academic Performance - Grades, class standing, intellectual abilities
3. Research/Work Quality - Specific projects and contributions
4. Personal Qualities - Leadership, teamwork, initiative
5. Comparison - How the student ranks among peers
6. Recommendation - Strong endorsement with specific program fit
    `,
    tips: [
      "Use specific examples and anecdotes",
      "Compare the student to peers",
      "Address the program's specific requirements",
      "Keep it between 500-800 words",
      "Be enthusiastic but credible",
    ],
  },
  cv: {
    systemPrompt: "You are a professional CV writer specializing in academic and research positions. Create a comprehensive, ATS-friendly CV that highlights achievements.",
    structure: `
1. Contact Information - Name, email, phone, LinkedIn, website
2. Education - Degrees, institutions, GPA, relevant coursework
3. Research Experience - Labs, projects, publications
4. Work Experience - Relevant positions with achievements
5. Skills - Technical skills, languages, tools
6. Publications - Papers, articles, presentations
7. Awards & Honors - Scholarships, fellowships, awards
8. References - Available upon request
    `,
    tips: [
      "Quantify achievements where possible",
      "Use action verbs",
      "Tailor to the specific position",
      "Keep to 2-3 pages for academic CVs",
      "Include relevant keywords",
    ],
  },
  motivation_letter: {
    systemPrompt: "You are an expert in writing motivation letters for university applications. Create compelling letters that show genuine passion and clear goals.",
    structure: `
1. Introduction - Why you are writing and your enthusiasm
2. Academic Background - Relevant education and achievements
3. Why This Program - Specific fit with the program
4. Your Contributions - What you bring to the program
5. Future Goals - How this program aligns with your career
6. Closing - Strong ending with call to action
    `,
    tips: [
      "Show genuine enthusiasm",
      "Be specific about the program",
      "Highlight what makes you unique",
      "Keep it between 500-1000 words",
      "Proofread carefully",
    ],
  },
  research_proposal: {
    systemPrompt: "You are an expert academic researcher who helps students write research proposals. Create clear, compelling proposals with strong methodology.",
    structure: `
1. Title - Clear and descriptive
2. Introduction - Background and context
3. Problem Statement - What you aim to solve
4. Literature Review - Existing research and gaps
5. Research Questions/Hypotheses - Clear objectives
6. Methodology - How you will conduct the research
7. Expected Outcomes - What you hope to achieve
8. Timeline - Research schedule
9. References - Key sources
    `,
    tips: [
      "Be specific about methodology",
      "Show awareness of existing literature",
      "Make research questions focused and answerable",
      "Include a realistic timeline",
      "Cite relevant prior work",
    ],
  },
  cover_letter: {
    systemPrompt: "You are a professional cover letter writer. Create compelling cover letters that connect the student's skills to the position requirements.",
    structure: `
1. Opening - Position applied for and enthusiasm
2. Qualifications - Key skills and experiences
3. Value Proposition - What you bring to the role
4. Cultural Fit - Why this organization
5. Closing - Call to action and availability
    `,
    tips: [
      "Address the hiring manager by name if possible",
      "Mirror the job description language",
      "Keep it to one page",
      "Show, don't tell with examples",
      "Express enthusiasm genuinely",
    ],
  },
  email_to_professor: {
    systemPrompt: "You are an expert in academic communication. Write professional, respectful emails to professors for research opportunities, collaboration, or academic inquiries.",
    structure: `
1. Subject Line - Clear and specific
2. Greeting - Formal and respectful
3. Introduction - Who you are and why you're writing
4. Purpose - Specific request or inquiry
5. Your Background - Brief relevant qualifications
6. Call to Action - What you're asking for
7. Closing - Professional sign-off
    `,
    tips: [
      "Keep it concise (under 200 words)",
      "Be specific about your interest in their work",
      "Show you've read their papers",
      "Include your CV as attachment",
      "Follow up after 1-2 weeks if no response",
    ],
  },
};

function generateDocumentPrompt(request: DocumentRequest): string {
  const template = documentTemplates[request.type];
  if (!template) throw new Error(`Unknown document type: ${request.type}`);

  const { studentProfile } = request;
  const language = request.language || "English";
  const tone = request.tone || "formal";

  return `
${template.systemPrompt}

## Student Profile
- Name: ${studentProfile.name}
- Current Degree: ${studentProfile.degree}
- Field of Study: ${studentProfile.field}
- Current/Previous University: ${studentProfile.university || "Not specified"}
- GPA: ${studentProfile.gpa || "Not specified"}
- Work Experience: ${studentProfile.workExperience || 0} years
- Research Interests: ${studentProfile.researchInterests?.join(", ") || "Not specified"}
- Achievements: ${studentProfile.achievements?.join(", ") || "Not specified"}

## Target Program
- University: ${studentProfile.targetUniversity || "Not specified"}
- Program: ${studentProfile.targetProgram || "Not specified"}
- Country: ${studentProfile.targetCountry || "Not specified"}

## Document Structure
${template.structure}

## Guidelines
- Language: ${language}
- Tone: ${tone}
- Additional Context: ${request.additionalContext || "None"}

## Tips
${template.tips.map((tip) => `- ${tip}`).join("\n")}

Please generate a compelling, personalized ${request.type.toUpperCase().replace("_", " ")} based on this information.
`;
}

// POST /api/ai/documents - Generate AI documents
export async function POST(request: Request) {
  try {
    const body: DocumentRequest = await request.json();

    const { type, studentProfile } = body;

    if (!type || !studentProfile?.name) {
      return NextResponse.json(
        { success: false, error: "type and studentProfile.name are required" },
        { status: 400 }
      );
    }

    const template = documentTemplates[type];
    if (!template) {
      return NextResponse.json(
        { success: false, error: `Unknown document type: ${type}. Valid types: ${Object.keys(documentTemplates).join(", ")}` },
        { status: 400 }
      );
    }

    const prompt = generateDocumentPrompt(body);

    // Try OpenRouter first, then fallback to a template-based generation
    let content: string;

    if (process.env.OPENROUTER_API_KEY) {
      try {
        const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://globalscholar.ai",
          },
          body: JSON.stringify({
            model: "anthropic/claude-sonnet-4",
            messages: [
              { role: "system", content: template.systemPrompt },
              { role: "user", content: prompt },
            ],
            max_tokens: 4000,
            temperature: 0.7,
          }),
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          content = aiData.choices[0]?.message?.content || generateFallbackDocument(body);
        } else {
          content = generateFallbackDocument(body);
        }
      } catch {
        content = generateFallbackDocument(body);
      }
    } else {
      content = generateFallbackDocument(body);
    }

    return NextResponse.json({
      success: true,
      data: {
        type,
        content,
        wordCount: content.split(/\s+/).length,
        characterCount: content.length,
        generatedAt: new Date().toISOString(),
        template: template.structure,
        tips: template.tips,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Document generation failed" },
      { status: 500 }
    );
  }
}

function generateFallbackDocument(request: DocumentRequest): string {
  const { type, studentProfile } = request;
  const name = studentProfile.name;
  const field = studentProfile.field;
  const degree = studentProfile.degree;
  const targetUni = studentProfile.targetUniversity || "your esteemed university";
  const targetProgram = studentProfile.targetProgram || "graduate program";

  switch (type) {
    case "sop":
      return `STATEMENT OF PURPOSE

Dear Admissions Committee,

I am writing to express my strong interest in the ${targetProgram} program at ${targetUni}. My journey in ${field} began during my ${degree} studies, where I discovered a passion for [specific area of interest].

Academic Background
Throughout my academic career at ${studentProfile.university || "my university"}, I have maintained a strong academic record${studentProfile.gpa ? ` with a GPA of ${studentProfile.gpa}` : ""}. My coursework in ${field} has provided me with a solid foundation in [key concepts and skills].

Research and Professional Experience
${studentProfile.workExperience ? `With ${studentProfile.workExperience} years of professional experience, I have developed practical skills in [specific skills].` : "Through various academic projects and internships, I have gained hands-on experience in [specific areas]."}
${studentProfile.researchInterests?.length ? `\n\nMy research interests lie in ${studentProfile.researchInterests.join(", ")}, areas that align perfectly with the research being conducted at ${targetUni}.` : ""}

Why This Program
I am particularly drawn to ${targetUni} because of its outstanding reputation in ${field} and the opportunity to work with distinguished faculty members whose research in [specific area] aligns with my interests.

Career Goals
In the short term, I aim to [short-term goal]. Long term, I aspire to [long-term goal], contributing to the advancement of ${field}.

I am confident that the ${targetProgram} at ${targetUni} will provide me with the knowledge, skills, and network necessary to achieve these goals. I look forward to contributing to your academic community.

Sincerely,
${name}`;

    case "lor":
      return `LETTER OF RECOMMENDATION

To Whom It May Concern,

I am pleased to write this letter of recommendation for ${name}, who I have known for [duration] in my capacity as [your position] at [institution].

Academic Performance
${name} has consistently demonstrated exceptional academic abilities in ${field}. During their time in my [course/program], they ranked among the top students in their cohort${studentProfile.gpa ? ` with a GPA of ${studentProfile.gpa}` : ""}.

Research and Professional Qualities
${name} has shown remarkable skills in [specific area]. Their work on [specific project] demonstrated strong analytical abilities, attention to detail, and the capacity to work independently${studentProfile.workExperience ? `. With ${studentProfile.workExperience} years of experience, they bring practical insights to academic discussions.` : ""}.

Personal Qualities
Beyond academic achievements, ${name} is a [positive trait] individual who [specific example]. They have demonstrated leadership through [specific example] and work well in collaborative environments.

Comparison and Recommendation
I would rank ${name} in the top [X]% of students I have taught/supervised in my [X] years of academic career. I strongly recommend them for the ${studentProfile.targetProgram || "graduate program"} at ${targetUni} without reservation.

Please feel free to contact me if you require any further information.

Sincerely,
[Recommender Name]
[Position]
[Institution]`;

    case "cv":
      return `${name.toUpperCase()}
CV / RESUME

Contact Information
Email: [your.email@example.com]
Phone: [+1-XXX-XXX-XXXX]
LinkedIn: [linkedin.com/in/yourprofile]
Website: [yourwebsite.com]

Education
${studentProfile.degree || "Degree"} in ${field}
${studentProfile.university || "University Name"} | [Year] | GPA: ${studentProfile.gpa || "X.XX/4.00"}

Work Experience
${studentProfile.workExperience ? `${studentProfile.workExperience} years of professional experience in ${field}` : "[Position Title] | [Company] | [Duration]"}
- [Achievement with quantifiable result]
- [Key responsibility and impact]
- [Technical skill demonstrated]

Research Experience
- [Research project title] | [Lab/Institution] | [Duration]
- [Description of research and findings]

Skills
- Technical: [Programming languages, tools, software]
- Languages: English, [Other languages]
- Soft Skills: [Leadership, Communication, Teamwork]

Publications
- [Paper title] | [Journal/Conference] | [Year]

Awards & Honors
${studentProfile.achievements?.map((a) => `- ${a}`).join("\n") || "- [Award Name] | [Year]"}

References
Available upon request`;

    case "motivation_letter":
      return `MOTIVATION LETTER

Dear Admissions Committee,

I am writing to express my strong motivation for applying to the ${targetProgram} at ${targetUni}. My passion for ${field} drives me to pursue advanced studies at your prestigious institution.

Why This Program
${targetUni}'s program stands out for its [specific aspect - curriculum, faculty, research opportunities]. I am particularly interested in [specific course or research area] that aligns with my academic background and career aspirations.

My Background
During my ${degree} in ${field}${studentProfile.university ? ` at ${studentProfile.university}` : ""}, I developed a strong foundation in [relevant skills]${studentProfile.gpa ? ` and achieved a GPA of ${studentProfile.gpa}` : ""}. ${studentProfile.researchInterests?.length ? `\n\nMy research interests in ${studentProfile.researchInterests.join(", ")} have been shaped by [specific experiences].` : ""}

What I Bring
Beyond academics, I bring [specific qualities]. ${studentProfile.workExperience ? `My ${studentProfile.workExperience} years of professional experience have taught me [specific lesson].` : "My involvement in [activities] has developed my [skills]."} I am eager to contribute to the diverse academic community at ${targetUni}.

Future Goals
Upon completing this program, I plan to [career goal]. The knowledge and network gained from ${targetUni} will be instrumental in achieving this vision.

I am enthusiastic about the opportunity to join your program and contribute to the academic excellence at ${targetUni}.

Sincerely,
${name}`;

    case "research_proposal":
      return `RESEARCH PROPOSAL

Title: [Research Title]

1. Introduction
This research proposal outlines a study in ${field} that aims to [research objective]. The proposed research addresses a significant gap in current understanding of [topic].

2. Background and Literature Review
Current research in ${field} has established [key findings]. However, [gap in knowledge]. This study builds upon the work of [researchers] while addressing the identified limitations.

3. Research Questions
- Primary: [Main research question]
- Secondary: [Supporting questions]

4. Methodology
This study will employ [research methodology] to investigate [research questions]. Data will be collected through [methods] and analyzed using [analysis techniques].

5. Expected Outcomes
This research is expected to contribute to the field by [expected contribution]. The findings will have implications for [practical applications].

6. Timeline
- Phase 1 (Months 1-3): Literature review and methodology design
- Phase 2 (Months 4-8): Data collection
- Phase 3 (Months 9-11): Data analysis
- Phase 4 (Month 12): Writing and submission

7. References
[List key references]

Researcher: ${name}
Institution: ${studentProfile.university || "[Institution]"}`;

    case "cover_letter":
      return `COVER LETTER

Dear Hiring Manager,

I am writing to express my interest in the [Position] at [Organization]. With my background in ${field}${studentProfile.workExperience ? ` and ${studentProfile.workExperience} years of experience` : ""}, I am confident in my ability to contribute meaningfully to your team.

In my previous role, I [specific achievement]. My expertise in [relevant skills] aligns well with the requirements of this position.

What draws me to [Organization] is [specific reason - mission, projects, culture]. I am particularly excited about [specific aspect of the role].

I would welcome the opportunity to discuss how my skills and experience can contribute to your team's success. Thank you for considering my application.

Sincerely,
${name}`;

    case "email_to_professor":
      return `Subject: Prospective Graduate Student - ${field} Research Inquiry

Dear Professor [Last Name],

I hope this email finds you well. My name is ${name}, and I am a ${degree} student in ${field}${studentProfile.university ? ` at ${studentProfile.university}` : ""}. I am writing to express my interest in potential research opportunities in your lab/group.

I have been following your work on [specific research topic/paper], and I am particularly interested in [specific aspect]. My own research experience in ${studentProfile.researchInterests?.[0] || "[area]"} has prepared me to contribute to your ongoing projects.

${studentProfile.gpa ? `I have maintained a GPA of ${studentProfile.gpa}` : "My academic background"} and${studentProfile.workExperience ? ` ${studentProfile.workExperience} years of professional experience` : " relevant project experience"} have developed my skills in [relevant skills].

I have attached my CV for your review. I would be grateful for the opportunity to discuss potential research positions in your group.

Thank you for your time and consideration.

Best regards,
${name}
[Email] | [Phone]`;

    default:
      return `Document type "${type}" is not yet implemented. Please use sop, lor, cv, motivation_letter, research_proposal, cover_letter, or email_to_professor.`;
  }
}

// GET /api/ai/documents/types - List available document types
export async function GET() {
  const types = Object.entries(documentTemplates).map(([key, value]) => ({
    type: key,
    name: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: value.systemPrompt.substring(0, 100) + "...",
    tips: value.tips,
  }));

  return NextResponse.json({
    success: true,
    data: types,
  });
}
