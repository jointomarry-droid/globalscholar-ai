export type ScholarshipDegree = "bachelors" | "masters" | "phd" | "diploma" | "certificate";

export type ScholarshipFunding = "fully_funded" | "partial" | "tuition_only" | "stipend" | "none";

export type ScholarshipSource = "university" | "government" | "organization" | "import" | "user_submitted";

export interface EligibilityRule {
  field: string;
  operator: "eq" | "neq" | "gt" | "lt" | "gte" | "lte" | "in" | "nin" | "contains";
  value: string | number | string[];
}

export interface Scholarship {
  id: string;
  title: string;
  slug: string;
  description: string;
  aiSummary: string;
  universityId: string;
  universityName: string;
  country: string;
  countryCode: string;
  city: string;
  degree: ScholarshipDegree;
  field: string;
  funding: ScholarshipFunding;
  fundingAmount?: string;
  deadline: string;
  eligibility: EligibilityRule[];
  benefits: string[];
  documentsRequired: string[];
  applicationUrl: string;
  languageRequirements: string[];
  ieltsRequired?: boolean;
  toeflRequired?: boolean;
  greRequired?: boolean;
  workExperienceRequired?: boolean;
  ageLimit?: number;
  gender?: string;
  disability?: boolean;
  minority?: boolean;
  refugee?: boolean;
  internationalStudents: boolean;
  renewable: boolean;
  matchScore?: number;
  verified: boolean;
  source: ScholarshipSource;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

export interface ScholarshipFilters {
  country?: string;
  degree?: ScholarshipDegree;
  funding?: ScholarshipFunding;
  field?: string;
  deadline?: string;
  ieltsRequired?: boolean;
  toeflRequired?: boolean;
  greRequired?: boolean;
  internationalStudents?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "deadline" | "matchScore" | "createdAt" | "title";
  sortOrder?: "asc" | "desc";
}

export interface ScholarshipMatchResult {
  scholarship: Scholarship;
  matchScore: number;
  matchReasons: string[];
  missingRequirements: string[];
}

export interface University {
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
}

export interface StudentProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  countryCode: string;
  city: string;
  dateOfBirth?: string;
  gender?: string;
  nationality: string;
  educationLevel: ScholarshipDegree;
  field: string;
  gpa?: number;
  gpaScale?: number;
  university?: string;
  graduationYear?: number;
  workExperience?: number;
  languages: string[];
  ieltsScore?: number;
  toeflScore?: number;
  greScore?: number;
  interests: string[];
  preferredCountries: string[];
  preferredFields: string[];
  budget?: string;
  resumeUrl?: string;
  transcriptUrl?: string;
  profileCompleteness: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "student" | "university" | "organization" | "admin" | "super_admin";
  emailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  studentId: string;
  scholarshipId: string;
  status: "draft" | "submitted" | "under_review" | "accepted" | "rejected" | "waitlisted";
  submittedAt?: string;
  reviewedAt?: string;
  decisionAt?: string;
  notes?: string;
  documents: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SavedScholarship {
  id: string;
  studentId: string;
  scholarshipId: string;
  notes?: string;
  savedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: "deadline_reminder" | "application_update" | "new_scholarship" | "system" | "marketing";
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface ImportJob {
  id: string;
  source: string;
  format: "csv" | "excel" | "json" | "xml" | "rss" | "api";
  status: "pending" | "processing" | "completed" | "failed";
  totalRecords: number;
  processedRecords: number;
  successRecords: number;
  errorRecords: number;
  errors: string[];
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

export interface AIChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface AISearchQuery {
  query: string;
  profile?: StudentProfile;
  filters?: ScholarshipFilters;
}

export interface AISearchResult {
  answer: string;
  scholarships: ScholarshipMatchResult[];
  suggestions: string[];
  followUpQuestions: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
