export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "GlobalScholar AI",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://globalscholar.ai",
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || "globalscholar-dev-secret",
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },
  ai: {
    openrouterApiKey: process.env.OPENROUTER_API_KEY || "",
    openaiApiKey: process.env.OPENAI_API_KEY || "",
    geminiApiKey: process.env.GEMINI_API_KEY || "",
    claudeApiKey: process.env.CLAUDE_API_KEY || "",
  },
  search: {
    meilisearchHost: process.env.MEILISEARCH_HOST || "http://localhost:7700",
    meilisearchApiKey: process.env.MEILISEARCH_API_KEY || "",
  },
  email: {
    resendApiKey: process.env.RESEND_API_KEY || "",
    fromEmail: process.env.RESEND_FROM_EMAIL || "GlobalScholar AI <noreply@globalscholar.ai>",
  },
  analytics: {
    posthogApiKey: process.env.POSTHOG_API_KEY || "",
    posthogHost: process.env.POSTHOG_HOST || "https://app.posthog.com",
  },
  pocketbase: {
    url: process.env.POCKETBASE_URL || "http://localhost:8090",
  },
} as const;
