"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  GraduationCap,
  Globe,
  FileText,
  CreditCard,
  Clock,
  Shield,
  Users,
  Brain,
  Sparkles,
} from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // General
  {
    question: "What is GlobalScholar AI?",
    answer: "GlobalScholar AI is an AI-powered global education ecosystem that helps students discover scholarships, universities, and courses worldwide. Our platform uses advanced artificial intelligence to match students with the best opportunities based on their unique profiles, academic records, and career goals. We cover 500,000+ scholarships from 50,000+ universities across 200+ countries.",
    category: "general",
  },
  {
    question: "How does GlobalScholar AI work?",
    answer: "GlobalScholar AI works by analyzing your academic profile, preferences, and goals using our advanced AI algorithms. We scan our database of 500,000+ scholarships and rank them by compatibility with your profile. Our AI considers factors like your GPA, field of study, nationality, preferred countries, and career goals to provide personalized scholarship recommendations with up to 95% accuracy.",
    category: "general",
  },
  {
    question: "Is GlobalScholar AI free to use?",
    answer: "Yes! GlobalScholar AI offers a comprehensive free tier that includes AI-powered scholarship matching, basic document analysis, deadline tracking, and access to our scholarship database. We also offer premium features like advanced AI essay writing, unlimited document analysis, and priority support for students who need additional assistance.",
    category: "general",
  },
  {
    question: "Who can use GlobalScholar AI?",
    answer: "GlobalScholar AI is designed for students at all levels — from high school students looking for undergraduate scholarships to PhD candidates seeking research funding. We also serve educational consultants, university admissions offices, and anyone involved in international education. Our platform supports students from 200+ countries worldwide.",
    category: "general",
  },
  // Scholarships
  {
    question: "How many scholarships are available on GlobalScholar AI?",
    answer: "GlobalScholar AI has access to over 500,000 scholarships from more than 50,000 universities across 200+ countries. Our database is constantly updated with new opportunities, and our AI system verifies each scholarship to ensure accuracy and legitimacy. We cover all types of scholarships including merit-based, need-based, research, athletic, government, and university-specific awards.",
    category: "scholarships",
  },
  {
    question: "How accurate is the AI scholarship matching?",
    answer: "Our AI scholarship matching system has a 95% accuracy rate in finding relevant scholarships for students. The system uses machine learning algorithms that analyze your academic profile, preferences, and goals against our comprehensive database. It considers factors like GPA, field of study, nationality, language proficiency, and career objectives to provide highly personalized recommendations.",
    category: "scholarships",
  },
  {
    question: "Can I apply for scholarships directly through GlobalScholar AI?",
    answer: "Yes! Many scholarships on our platform allow direct application through GlobalScholar AI. For scholarships that require external application, we provide direct links to the official application portals along with step-by-step guides, document checklists, and AI assistance to help you prepare a competitive application.",
    category: "scholarships",
  },
  {
    question: "How often is the scholarship database updated?",
    answer: "Our scholarship database is updated daily with new opportunities and changes to existing ones. Our AI system automatically scans official university and government websites to ensure our data is current. We also have a team of human verifiers who manually check scholarship listings for accuracy.",
    category: "scholarships",
  },
  // AI Tools
  {
    question: "What AI tools does GlobalScholar AI offer?",
    answer: "GlobalScholar AI offers a comprehensive suite of AI-powered tools including: AI Scholarship Matcher (finds and ranks scholarships by compatibility), AI Document Analyzer (reviews your SOP, CV, and essays), AI Essay Writer (generates personalized application documents), AI Career Predictor (predicts career outcomes), AI Success Calculator (estimates your chances), AI Research Matcher (finds supervisors and funding), and AI Visa Assistant (helps with visa applications).",
    category: "ai-tools",
  },
  {
    question: "How does the AI Document Analyzer work?",
    answer: "Our AI Document Analyzer uses natural language processing to review your application documents. Simply upload your SOP, CV, or essays, and our AI will provide instant feedback on content quality, structure, grammar, tone, and alignment with specific scholarship requirements. It scores your document and suggests improvements to make your application more competitive.",
    category: "ai-tools",
  },
  {
    question: "Can the AI Essay Writer generate plagiarism-free content?",
    answer: "Yes! Our AI Essay Writer generates 100% original, plagiarism-free content tailored to each scholarship's requirements. The AI understands your unique profile, goals, and experiences to create personalized essays that reflect your voice. Each essay is unique and customized based on the specific scholarship's values, requirements, and selection criteria.",
    category: "ai-tools",
  },
  {
    question: "How accurate is the AI Success Calculator?",
    answer: "Our AI Success Calculator provides probability estimates based on historical data, competitor analysis, and application trends. While no prediction can guarantee outcomes, our calculator uses machine learning trained on millions of successful and unsuccessful applications to provide realistic estimates. It considers factors like your GPA, test scores, experience, and the scholarship's competitiveness.",
    category: "ai-tools",
  },
  // Application Process
  {
    question: "How do I create a profile on GlobalScholar AI?",
    answer: "Creating a profile is simple and free. Visit globalscholarai.com, click 'Get Started,' and fill in your basic information including your name, email, and password. Then complete your academic profile with details about your education, GPA, field of study, preferred countries, and career goals. Our AI will use this information to find the best scholarship matches for you.",
    category: "application",
  },
  {
    question: "What documents do I need for scholarship applications?",
    answer: "Common documents required for scholarship applications include: Academic transcripts, Degree certificates, Language proficiency certificates (IELTS/TOEFL), CV/Resume, Statement of Purpose (SOP), Letters of Recommendation (2-3), Research proposal (for PhD/Research scholarships), Passport copy, and Portfolio (for arts/design programs). Our AI provides specific document checklists for each scholarship.",
    category: "application",
  },
  {
    question: "How do I track my scholarship applications?",
    answer: "GlobalScholar AI provides a comprehensive application tracker that monitors all your scholarship applications in one place. You can track application status, deadlines, required documents, and next steps. Our AI sends smart reminders for upcoming deadlines and suggests actions to improve your chances. You can also visualize your application progress on a calendar view.",
    category: "application",
  },
  {
    question: "Can I apply to multiple scholarships simultaneously?",
    answer: "Absolutely! In fact, we recommend applying to multiple scholarships to maximize your chances. GlobalScholar AI helps you manage multiple applications by tracking deadlines, requirements, and progress for each. Our AI also identifies scholarships with similar requirements so you can efficiently reuse and adapt your application materials.",
    category: "application",
  },
  // Countries & Universities
  {
    question: "Which countries can I find scholarships for?",
    answer: "GlobalScholar AI covers scholarships in 200+ countries and territories. Popular destinations include the United States, United Kingdom, Germany, Canada, Australia, France, Netherlands, Japan, South Korea, China, Turkey, and many more. Our AI can help you find scholarships in both English-speaking and non-English-speaking countries.",
    category: "countries",
  },
  {
    question: "Are there scholarships available without IELTS/TOEFL?",
    answer: "Yes! Many universities and scholarship programs accept alternative English proficiency证明 or waive the requirement entirely. Our AI filters specifically for scholarships that don't require IELTS/TOEFL. Some alternatives include: Duolingo English Test, PTE Academic, Cambridge English, Medium of Instruction letters, and country-specific English tests.",
    category: "countries",
  },
  {
    question: "How do I choose the right university for my studies?",
    answer: "Consider these factors when choosing a university: Academic reputation and rankings, Program quality and specialization, Scholarship availability, Location and culture, Cost of living and tuition, Language requirements, Career prospects after graduation, Research opportunities, and Student support services. Our AI University Predictor can help you evaluate universities based on your profile and preferences.",
    category: "countries",
  },
  // Financial
  {
    question: "What does 'fully funded' scholarship mean?",
    answer: "A fully funded scholarship covers all major expenses associated with your studies, typically including: Full tuition fees, Living allowance/stipend, Health insurance, Travel expenses (airfare), Research supplies (for research programs), and sometimes installation costs. The exact coverage varies by scholarship, but fully funded means you don't need additional financial support.",
    category: "financial",
  },
  {
    question: "How much money do I need for studying abroad?",
    answer: "Costs vary significantly by country and program. Here are approximate annual costs: USA ($30,000-$70,000), UK (£10,000-£38,000), Germany (€0-€3,000 tuition + €10,000 living), Canada (CAD 20,000-40,000), Australia (AUD 20,000-45,000). Our AI Cost Calculator can provide detailed estimates for your specific destination and program.",
    category: "financial",
  },
  {
    question: "Can I work while studying abroad?",
    answer: "Most countries allow international students to work part-time during studies (typically 20 hours/week) and full-time during breaks. Some countries have specific work restrictions. Our platform provides country-specific information about student work permits, average wages, and job opportunities. Many students use part-time work to supplement their scholarship income.",
    category: "financial",
  },
  // Technical
  {
    question: "Is my personal information safe on GlobalScholar AI?",
    answer: "Absolutely! We take data privacy very seriously. All personal information is encrypted using industry-standard encryption protocols. We never share your data with third parties without your explicit consent. Our platform complies with GDPR, CCPA, and other international data protection regulations. You can delete your account and data at any time.",
    category: "technical",
  },
  {
    question: "Does GlobalScholar AI have a mobile app?",
    answer: "Yes! GlobalScholar AI is available on both iOS and Android platforms. Our mobile app offers all the features of the web platform including AI scholarship matching, document analysis, deadline tracking, and application management. You can download the app from the App Store or Google Play Store.",
    category: "technical",
  },
  {
    question: "How do I contact GlobalScholar AI support?",
    answer: "You can reach our support team through multiple channels: Email: support@globalscholarai.com, Live Chat: Available 24/7 on our website, Phone: +1-800-GLOBAL-AI, Social Media: @GlobalScholarAI on Twitter, Facebook, and Instagram. Our AI chatbot can also help with common questions instantly.",
    category: "technical",
  },
];

const categories = [
  { id: "all", label: "All FAQs", icon: HelpCircle },
  { id: "general", label: "General", icon: Globe },
  { id: "scholarships", label: "Scholarships", icon: GraduationCap },
  { id: "ai-tools", label: "AI Tools", icon: Brain },
  { id: "application", label: "Application", icon: FileText },
  { id: "countries", label: "Countries", icon: Globe },
  { id: "financial", label: "Financial", icon: CreditCard },
  { id: "technical", label: "Technical", icon: Shield },
];

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
            <HelpCircle className="h-4 w-4" />
            Frequently Asked Questions
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Everything You Need to
            <span className="gradient-text"> Know</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8 leading-relaxed">
            Find answers to common questions about GlobalScholar AI, our AI tools,
            scholarship applications, and studying abroad.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQs */}
          <div className="space-y-3">
            {filteredFAQs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-sm sm:text-base">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-5 pb-5 text-sm text-[var(--muted-foreground)] leading-relaxed border-t">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No questions found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or category filter.
              </p>
            </div>
          )}

          {/* Contact */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Can't find what you're looking for?
            </p>
            <button className="px-6 py-3 rounded-xl gradient-btn text-white font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
