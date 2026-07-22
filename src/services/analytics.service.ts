export interface AnalyticsEvent {
  event: string;
  userId?: string;
  properties?: Record<string, unknown>;
  timestamp: string;
  source: "web" | "mobile" | "api";
}

export interface AnalyticsService {
  track(event: string, properties?: Record<string, unknown>, userId?: string): Promise<void>;
  pageView(path: string, userId?: string): Promise<void>;
  getMetrics(dateRange: { start: string; end: string }): Promise<AnalyticsMetrics>;
  getUserMetrics(userId: string): Promise<UserMetrics>;
  getScholarshipMetrics(scholarshipId: string): Promise<ScholarshipMetrics>;
}

export interface AnalyticsMetrics {
  totalUsers: number;
  activeUsers: number;
  totalScholarships: number;
  totalApplications: number;
  totalSearches: number;
  averageMatchScore: number;
  conversionRate: number;
  topCountries: Array<{ country: string; count: number }>;
  topSearches: Array<{ query: string; count: number }>;
  growth: {
    users: number;
    applications: number;
    searches: number;
  };
}

export interface UserMetrics {
  profileCompleteness: number;
  scholarshipsViewed: number;
  applicationsSubmitted: number;
  savedScholarships: number;
  averageMatchScore: number;
  activityStreak: number;
}

export interface ScholarshipMetrics {
  views: number;
  saves: number;
  applications: number;
  averageMatchScore: number;
  conversionRate: number;
  topCountries: Array<{ country: string; count: number }>;
}

// In-memory analytics (for development)
export class InMemoryAnalyticsService implements AnalyticsService {
  private events: AnalyticsEvent[] = [];

  async track(event: string, properties?: Record<string, unknown>, userId?: string): Promise<void> {
    this.events.push({
      event,
      userId,
      properties,
      timestamp: new Date().toISOString(),
      source: "web",
    });
  }

  async pageView(path: string, userId?: string): Promise<void> {
    await this.track("page_view", { path }, userId);
  }

  async getMetrics(_dateRange: { start: string; end: string }): Promise<AnalyticsMetrics> {
    const userEvents = this.events.filter((e) => e.event === "user_register");
    const searchEvents = this.events.filter((e) => e.event === "scholarship_search");
    const applicationEvents = this.events.filter((e) => e.event === "application_submit");

    return {
      totalUsers: userEvents.length,
      activeUsers: userEvents.length,
      totalScholarships: 0,
      totalApplications: applicationEvents.length,
      totalSearches: searchEvents.length,
      averageMatchScore: 75,
      conversionRate: applicationEvents.length / Math.max(userEvents.length, 1),
      topCountries: [],
      topSearches: [],
      growth: { users: 0, applications: 0, searches: 0 },
    };
  }

  async getUserMetrics(userId: string): Promise<UserMetrics> {
    const userEvents = this.events.filter((e) => e.userId === userId);
    return {
      profileCompleteness: 60,
      scholarshipsViewed: userEvents.filter((e) => e.event === "scholarship_view").length,
      applicationsSubmitted: userEvents.filter((e) => e.event === "application_submit").length,
      savedScholarships: userEvents.filter((e) => e.event === "scholarship_save").length,
      averageMatchScore: 72,
      activityStreak: 0,
    };
  }

  async getScholarshipMetrics(scholarshipId: string): Promise<ScholarshipMetrics> {
    const events = this.events.filter(
      (e) => e.properties?.scholarshipId === scholarshipId
    );
    return {
      views: events.filter((e) => e.event === "scholarship_view").length,
      saves: events.filter((e) => e.event === "scholarship_save").length,
      applications: events.filter((e) => e.event === "application_submit").length,
      averageMatchScore: 78,
      conversionRate: 0.15,
      topCountries: [],
    };
  }
}

// PostHog analytics (production)
export class PostHogAnalyticsService implements AnalyticsService {
  private apiKey: string;
  private host: string;

  constructor(apiKey: string, host = "https://app.posthog.com") {
    this.apiKey = apiKey;
    this.host = host;
  }

  async track(event: string, properties?: Record<string, unknown>, userId?: string): Promise<void> {
    await fetch(`${this.host}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: this.apiKey,
        event,
        properties,
        distinct_id: userId || "anonymous",
        timestamp: new Date().toISOString(),
      }),
    });
  }

  async pageView(path: string, userId?: string): Promise<void> {
    await this.track("$pageview", { $current_url: path }, userId);
  }

  async getMetrics(): Promise<AnalyticsMetrics> {
    // PostHog uses their own API for queries
    return {
      totalUsers: 0,
      activeUsers: 0,
      totalScholarships: 0,
      totalApplications: 0,
      totalSearches: 0,
      averageMatchScore: 0,
      conversionRate: 0,
      topCountries: [],
      topSearches: [],
      growth: { users: 0, applications: 0, searches: 0 },
    };
  }

  async getUserMetrics(): Promise<UserMetrics> {
    return {
      profileCompleteness: 0,
      scholarshipsViewed: 0,
      applicationsSubmitted: 0,
      savedScholarships: 0,
      averageMatchScore: 0,
      activityStreak: 0,
    };
  }

  async getScholarshipMetrics(): Promise<ScholarshipMetrics> {
    return {
      views: 0,
      saves: 0,
      applications: 0,
      averageMatchScore: 0,
      conversionRate: 0,
      topCountries: [],
    };
  }
}

// Factory
let analyticsInstance: AnalyticsService | null = null;

export function getAnalyticsService(): AnalyticsService {
  if (!analyticsInstance) {
    const apiKey = process.env.POSTHOG_API_KEY;
    if (apiKey) {
      analyticsInstance = new PostHogAnalyticsService(apiKey);
    } else {
      analyticsInstance = new InMemoryAnalyticsService();
    }
  }
  return analyticsInstance;
}
