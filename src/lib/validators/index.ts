import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  role: z.enum(["student", "university", "organization"]).default("student"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  phone: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  countryCode: z.string().optional(),
  city: z.string().min(1, "City is required"),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  nationality: z.string().min(1, "Nationality is required"),
  educationLevel: z.enum(["bachelors", "masters", "phd", "diploma", "certificate"]),
  field: z.string().min(1, "Field of study is required"),
  gpa: z.number().min(0).max(4).optional(),
  gpaScale: z.number().optional(),
  university: z.string().optional(),
  graduationYear: z.number().min(1900).max(2100).optional(),
  workExperience: z.number().min(0).optional(),
  languages: z.array(z.string()).default([]),
  ieltsScore: z.number().min(0).max(9).optional(),
  toeflScore: z.number().min(0).max(120).optional(),
  greScore: z.number().min(260).max(340).optional(),
  interests: z.array(z.string()).default([]),
  preferredCountries: z.array(z.string()).default([]),
  preferredFields: z.array(z.string()).default([]),
  budget: z.string().optional(),
});

export const scholarshipFilterSchema = z.object({
  country: z.string().optional(),
  degree: z.enum(["bachelors", "masters", "phd", "diploma", "certificate"]).optional(),
  funding: z.enum(["fully_funded", "partial", "tuition_only", "stipend", "none"]).optional(),
  field: z.string().optional(),
  deadline: z.string().optional(),
  ieltsRequired: z.boolean().optional(),
  toeflRequired: z.boolean().optional(),
  greRequired: z.boolean().optional(),
  internationalStudents: z.boolean().optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(12),
  sortBy: z.enum(["deadline", "matchScore", "createdAt", "title"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const aiChatSchema = z.object({
  message: z.string().min(1, "Message is required").max(2000),
  context: z.object({
    scholarshipId: z.string().optional(),
    type: z.enum(["search", "essay", "general"]).default("general"),
  }).optional(),
});

export const essaySchema = z.object({
  type: z.enum(["sop", "cover_letter", "personal_statement", "scholarship_essay", "resume"]),
  scholarshipName: z.string().optional(),
  universityName: z.string().optional(),
  field: z.string().optional(),
  tone: z.enum(["professional", "academic", "personal", "creative"]).default("professional"),
  wordCount: z.number().min(100).max(5000).default(1000),
  additionalInfo: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters").max(5000),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ScholarshipFilterInput = z.infer<typeof scholarshipFilterSchema>;
export type AIChatInput = z.infer<typeof aiChatSchema>;
export type EssayInput = z.infer<typeof essaySchema>;
export type ContactInput = z.infer<typeof contactSchema>;
