import { NextResponse } from "next/server";

// Visa Requirements Checker
// Provides country-specific visa information for international students

export interface VisaRequirement {
  country: string;
  countryCode: string;
  visaType: string;
  requirements: {
    documents: string[];
    financialProof: string;
    healthInsurance: string;
    languageRequirement: string;
    processingTime: string;
    validity: string;
    workRights: string;
    applicationFee: string;
  };
  embassy: {
    website: string;
    address: string;
    phone: string;
    email: string;
  };
  tips: string[];
  commonMistakes: string[];
  timeline: {
    stage: string;
    duration: string;
    description: string;
  }[];
}

const visaDatabase: Record<string, VisaRequirement> = {
  "united-states": {
    country: "United States",
    countryCode: "US",
    visaType: "F-1 Student Visa",
    requirements: {
      documents: [
        "Valid passport (6+ months validity)",
        "Form I-20 from SEVP-certified school",
        "DS-160 confirmation page",
        "Visa application fee receipt",
        "SEVIS I-901 fee receipt",
        "Passport-sized photograph",
        "Academic transcripts",
        "English proficiency scores (TOEFL/IELTS)",
        "Financial evidence",
        "Bank statements (3-6 months)",
        "Sponsorship letters (if applicable)",
      ],
      financialProof: "Must demonstrate sufficient funds for first year of study. Typically $30,000-$70,000 depending on school and location.",
      healthInsurance: "Required by most schools. Typical cost: $1,500-$3,000/year.",
      languageRequirement: "TOEFL iBT 80+ or IELTS 6.5+ for most programs. Top universities require TOEFL 100+ or IELTS 7.0+.",
      processingTime: "3-5 weeks (varies by embassy)",
      validity: "Duration of study + 60-day grace period",
      workRights: "On-campus: 20 hours/week during classes. CPT: Related to major. OPT: 12 months post-graduation (24 months for STEM).",
      applicationFee: "$185 (MRV fee)",
    },
    embassy: {
      website: "https://travel.state.gov/content/travel/en/us-visas/study/exchange.html",
      address: "Varies by country - check local US Embassy",
      phone: "Varies by country",
      email: "Varies by country",
    },
    tips: [
      "Apply for visa as soon as you receive I-20",
      "Prepare for the visa interview in English",
      "Bring all original documents",
      "Be ready to explain your study plan clearly",
      "Show ties to your home country",
      "Demonstrate financial stability",
    ],
    commonMistakes: [
      "Applying too late before program starts",
      "Insufficient financial documentation",
      "Not preparing for the interview",
      "Bringing photocopies instead of originals",
      "Not showing clear study and career plan",
    ],
    timeline: [
      { stage: "Receive I-20", duration: "After admission", description: "School sends Form I-20" },
      { stage: "Pay SEVIS Fee", duration: "Before visa interview", description: "Pay I-901 fee online" },
      { stage: "Schedule Interview", duration: "2-4 weeks before", description: "Book at local US Embassy" },
      { stage: "Visa Interview", duration: "Day of appointment", description: "Attend interview with all documents" },
      { stage: "Receive Visa", duration: "3-5 business days", description: "Passport returned with visa" },
      { stage: "Enter US", duration: "30 days before program", description: "Can enter US up to 30 days before program starts" },
    ],
  },
  "united-kingdom": {
    country: "United Kingdom",
    countryCode: "GB",
    visaType: "Student Visa (formerly Tier 4)",
    requirements: {
      documents: [
        "Valid passport",
        "Confirmation of Acceptance for Studies (CAS) from university",
        "ATAS certificate (for certain subjects)",
        "English language proof",
        "Financial evidence",
        "Tuberculosis test results (for some countries)",
        "Passport-sized photographs",
        "Visa application form",
      ],
      financialProof: "Must show £1,334/month for London or £1,023/month outside London for up to 9 months.",
      healthInsurance: "Immigration Health Surcharge (IHS): £776/year.",
      languageRequirement: "IELTS UKVI 5.5-7.0 depending on program level.",
      processingTime: "3 weeks (standard) or 5 days (priority)",
      validity: "Duration of course + 4 months",
      workRights: "20 hours/week during term, full-time during holidays for degree-level programs.",
      applicationFee: "£490",
    },
    embassy: {
      website: "https://www.gov.uk/student-visa",
      address: "Varies by country - check local British Embassy",
      phone: "Varies by country",
      email: "Varies by country",
    },
    tips: [
      "Apply no more than 3 months before your course starts",
      "ATAS certificate can take 30+ days - apply early",
      "Use the UKVI IELTS, not regular IELTS",
      "Show funds held for 28 consecutive days",
    ],
    commonMistakes: [
      "Using wrong IELTS test type",
      "Not getting ATAS certificate on time",
      "Funds not held for required period",
      "Applying too early or too late",
    ],
    timeline: [
      { stage: "Receive CAS", duration: "After accepting offer", description: "University issues CAS" },
      { stage: "ATAS Certificate", duration: "30-60 days", description: "Apply for ATAS if required" },
      { stage: "Visa Application", duration: "3 months before course", description: "Submit online application" },
      { stage: "Biometrics", duration: "Within 2 weeks", description: "Attend appointment" },
      { stage: "Decision", duration: "3 weeks", description: "Receive visa decision" },
    ],
  },
  germany: {
    country: "Germany",
    countryCode: "DE",
    visaType: "National Visa for Study Purposes",
    requirements: {
      documents: [
        "Valid passport (12+ months validity)",
        "University admission letter",
        "APS certificate (for some countries)",
        "Blocked account proof (€11,904/year)",
        "Health insurance",
        "Language certificate",
        "CV in tabular form",
        "Motivation letter",
        "Academic transcripts",
      ],
      financialProof: "€11,904/year in blocked account (Sperrkonto) or scholarship proof.",
      healthInsurance: "Required before visa. Public insurance ~€110/month for students.",
      languageRequirement: "German-taught: TestDaF 4x4 or DSH-2. English-taught: IELTS 6.0+ or TOEFL 80+.",
      processingTime: "4-12 weeks",
      validity: "1-2 years (renewable)",
      workRights: "120 full days or 240 half days per year.",
      applicationFee: "€75",
    },
    embassy: {
      website: "https://www.auswaertiges-amt.de/en/visa-service",
      address: "Varies by country",
      phone: "Varies by country",
      email: "Varies by country",
    },
    tips: [
      "Apply early - appointments can be hard to get",
      "APS certificate takes 4-8 weeks for some countries",
      "Blocked account can be opened at Deutsche Bank, Expatrio, or Fintiba",
      "Bring all documents as certified translations",
    ],
    commonMistakes: [
      "Not opening blocked account early enough",
      "Missing APS certificate deadline",
      "Insufficient document translations",
      "Wrong health insurance type",
    ],
    timeline: [
      { stage: "University Admission", duration: "Varies", description: "Receive admission letter" },
      { stage: "APS Certificate", duration: "4-8 weeks", description: "If required, apply for APS" },
      { stage: "Blocked Account", duration: "1-2 weeks", description: "Open and fund blocked account" },
      { stage: "Health Insurance", duration: "1 week", description: "Arrange health insurance" },
      { stage: "Visa Appointment", duration: "2-12 weeks", description: "Book and attend appointment" },
      { stage: "Visa Decision", duration: "4-12 weeks", description: "Receive visa" },
    ],
  },
  canada: {
    country: "Canada",
    countryCode: "CA",
    visaType: "Study Permit",
    requirements: {
      documents: [
        "Valid passport",
        "Letter of Acceptance from DLI",
        "Proof of financial support",
        "Police clearance certificate",
        "Medical exam results",
        "Passport-sized photographs",
        "Study permit application form",
        "Digital photo",
      ],
      financialProof: "CAD 20,635/year (outside Quebec) plus tuition and travel costs.",
      healthInsurance: "Provincial health coverage varies. Some provinces offer coverage to international students.",
      languageRequirement: "IELTS 6.0+ (no band below 5.5) for most programs.",
      processingTime: "8-16 weeks",
      validity: "Duration of study + 90 days",
      workRights: "On-campus: unlimited. Off-campus: 20 hours/week during classes, full-time during breaks.",
      applicationFee: "CAD 150",
    },
    embassy: {
      website: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
      address: "Varies by country",
      phone: "Varies by country",
      email: "Varies by country",
    },
    tips: [
      "Apply at least 6 months before program starts",
      "Get a PAL (Provincial Attestation Letter) if required",
      "Show strong ties to home country",
      "Consider SDS (Student Direct Stream) for faster processing",
    ],
    commonMistakes: [
      "Not showing enough funds",
      "Missing PAL requirement",
      "Applying too late",
      "Weak study plan explanation",
    ],
    timeline: [
      { stage: "Receive Acceptance", duration: "After application", description: "Get Letter of Acceptance" },
      { stage: "PAL (if required)", duration: "Varies by province", description: "Get Provincial Attestation Letter" },
      { stage: "Gather Documents", duration: "2-4 weeks", description: "Collect all required documents" },
      { stage: "Medical Exam", duration: "1-2 weeks", description: "Complete medical examination" },
      { stage: "Submit Application", duration: "Day of", description: "Apply online" },
      { stage: "Biometrics", duration: "Within 30 days", description: "Give biometrics" },
      { stage: "Decision", duration: "8-16 weeks", description: "Receive study permit" },
    ],
  },
  australia: {
    country: "Australia",
    countryCode: "AU",
    visaType: "Student Visa (Subclass 500)",
    requirements: {
      documents: [
        "Valid passport",
        "Confirmation of Enrolment (CoE)",
        "GTE statement",
        "Financial evidence",
        "Health insurance (OSHC)",
        "English proficiency scores",
        "Police clearance",
        "Medical examination",
      ],
      financialProof: "AUD 24,505/year plus tuition and travel.",
      healthInsurance: "Overseas Student Health Cover (OSHC): AUD 450-700/year.",
      languageRequirement: "IELTS 5.5+ (overall) or equivalent.",
      processingTime: "4-12 weeks",
      validity: "Duration of course + 2 months",
      workRights: "48 hours per fortnight during classes, unlimited during scheduled breaks.",
      applicationFee: "AUD 710",
    },
    embassy: {
      website: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
      address: "Varies by country",
      phone: "Varies by country",
      email: "Varies by country",
    },
    tips: [
      "Write a strong GTE (Genuine Temporary Entrant) statement",
      "Apply at least 6 months before course starts",
      "Arrange OSHC before applying",
      "Provide clear evidence of funds",
    ],
    commonMistakes: [
      "Weak GTE statement",
      "Insufficient financial evidence",
      "Not meeting health requirements",
      "Applying too close to course start",
    ],
    timeline: [
      { stage: "Receive CoE", duration: "After accepting offer", description: "University issues CoE" },
      { stage: "OSHC", duration: "Before application", description: "Purchase health insurance" },
      { stage: "Medical Exam", duration: "2-4 weeks", description: "Complete health check" },
      { stage: "Visa Application", duration: "6+ months before", description: "Submit online application" },
      { stage: "Decision", duration: "4-12 weeks", description: "Receive visa decision" },
    ],
  },
};

// GET /api/visa - List all supported countries
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const country = url.searchParams.get("country");

    if (country) {
      const visaInfo = visaDatabase[country.toLowerCase()];
      if (!visaInfo) {
        return NextResponse.json(
          { success: false, error: `Visa information not available for ${country}. Available: ${Object.keys(visaDatabase).join(", ")}` },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: visaInfo });
    }

    // Return summary of all countries
    const countries = Object.entries(visaDatabase).map(([key, value]) => ({
      id: key,
      country: value.country,
      countryCode: value.countryCode,
      visaType: value.visaType,
      processingTime: value.requirements.processingTime,
      applicationFee: value.requirements.applicationFee,
      workRights: value.requirements.workRights,
    }));

    return NextResponse.json({
      success: true,
      data: countries,
      total: countries.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch visa information" },
      { status: 500 }
    );
  }
}
