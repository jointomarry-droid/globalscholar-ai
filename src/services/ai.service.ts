export interface AIProvider {
  id: string;
  name: string;
  generateText(prompt: string, options?: AIGenerateOptions): Promise<AIResponse>;
  generateEmbedding(text: string): Promise<number[]>;
  isAvailable(): Promise<boolean>;
}

export interface AIGenerateOptions {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  stream?: boolean;
}

export interface AIResponse {
  text: string;
  tokensUsed: number;
  provider: string;
  model: string;
}

export interface AISearchResult {
  answer: string;
  scholarships: string[];
  suggestions: string[];
  confidence: number;
}

// OpenRouter Provider (routes to OpenAI, Claude, Gemini, etc.)
export class OpenRouterProvider implements AIProvider {
  id = "openrouter";
  name = "OpenRouter";
  private apiKey: string;
  private baseUrl = "https://openrouter.ai/api/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateText(prompt: string, options?: AIGenerateOptions): Promise<AIResponse> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://globalscholar.ai",
        "X-Title": "GlobalScholar AI",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet",
        messages: [
          ...(options?.systemPrompt
            ? [{ role: "system", content: options.systemPrompt }]
            : []),
          { role: "user", content: prompt },
        ],
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 2048,
      }),
    });

    if (!response.ok) throw new Error(`AI request failed: ${response.statusText}`);

    const data = await response.json();
    return {
      text: data.choices[0].message.content,
      tokensUsed: data.usage?.total_tokens ?? 0,
      provider: this.id,
      model: data.model,
    };
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch(`${this.baseUrl}/embeddings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/text-embedding-3-small",
        input: text,
      }),
    });

    if (!response.ok) throw new Error(`Embedding request failed: ${response.statusText}`);

    const data = await response.json();
    return data.data[0].embedding;
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Local Ollama Provider
export class OllamaProvider implements AIProvider {
  id = "ollama";
  name = "Ollama (Local)";
  private baseUrl: string;
  private model: string;

  constructor(baseUrl = "http://localhost:11434", model = "llama3.1") {
    this.baseUrl = baseUrl;
    this.model = model;
  }

  async generateText(prompt: string, options?: AIGenerateOptions): Promise<AIResponse> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.model,
        messages: [
          ...(options?.systemPrompt
            ? [{ role: "system", content: options.systemPrompt }]
            : []),
          { role: "user", content: prompt },
        ],
        stream: false,
      }),
    });

    if (!response.ok) throw new Error(`Ollama request failed: ${response.statusText}`);

    const data = await response.json();
    return {
      text: data.message.content,
      tokensUsed: data.eval_count ?? 0,
      provider: this.id,
      model: this.model,
    };
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch(`${this.baseUrl}/api/embeddings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: this.model, prompt: text }),
    });

    if (!response.ok) throw new Error(`Ollama embedding failed: ${response.statusText}`);

    const data = await response.json();
    return data.embedding;
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// AI Service - Main Interface
export class AIService {
  private providers: Map<string, AIProvider> = new Map();
  private activeProvider: string;

  constructor(activeProvider = "openrouter") {
    this.activeProvider = activeProvider;
  }

  addProvider(provider: AIProvider) {
    this.providers.set(provider.id, provider);
  }

  setActiveProvider(id: string) {
    if (!this.providers.has(id)) throw new Error(`Provider ${id} not found`);
    this.activeProvider = id;
  }

  hasProviders(): boolean {
    return this.providers.size > 0;
  }

  private getProvider(): AIProvider | null {
    // Try active provider first
    const active = this.providers.get(this.activeProvider);
    if (active) return active;
    // Fall back to any available provider
    for (const provider of this.providers.values()) {
      return provider;
    }
    return null;
  }

  async generate(prompt: string, options?: AIGenerateOptions): Promise<AIResponse> {
    const provider = this.getProvider();
    if (!provider) {
      throw new Error("No AI providers available");
    }
    return provider.generateText(prompt, options);
  }

  async embed(text: string): Promise<number[]> {
    const provider = this.getProvider();
    if (!provider) {
      throw new Error("No AI providers available for embeddings");
    }
    return provider.generateEmbedding(text);
  }

  // Scholarship-specific AI methods
  async matchScholarships(
    query: string,
    scholarships: Array<{ id: string; title: string; description: string; eligibility: string }>
  ): Promise<Array<{ id: string; score: number; reasons: string[] }>> {
    const prompt = `You are a scholarship matching AI. Given a student query and a list of scholarships, rank them by relevance (0-100 score) and provide reasons.

Student Query: ${query}

Scholarships:
${scholarships.map((s, i) => `${i + 1}. [${s.id}] ${s.title}: ${s.description}. Eligibility: ${s.eligibility}`).join("\n")}

Return a JSON array with objects containing: id, score (0-100), reasons (array of strings). Return only valid JSON.`;

    const provider = this.getProvider();
    if (!provider) {
      return scholarships.map((s) => ({ id: s.id, score: 50, reasons: ["No AI provider available"] }));
    }

    const response = await provider.generateText(prompt, {
      temperature: 0.3,
      systemPrompt: "You are a scholarship matching AI. Return only valid JSON arrays.",
    });

    try {
      return JSON.parse(response.text);
    } catch {
      return scholarships.map((s) => ({ id: s.id, score: 50, reasons: ["Partial match"] }));
    }
  }

  async generateSummary(scholarship: Record<string, unknown>): Promise<string> {
    const prompt = `Generate a concise 2-3 sentence summary for this scholarship:
Title: ${scholarship.title}
University: ${scholarship.universityName}
Country: ${scholarship.country}
Degree: ${scholarship.degree}
Funding: ${scholarship.funding}
Benefits: ${Array.isArray(scholarship.benefits) ? scholarship.benefits.join(", ") : "N/A"}

Focus on what makes this opportunity unique and valuable.`;

    const provider = this.getProvider();
    if (!provider) {
      return `${scholarship.title} is a ${scholarship.funding} scholarship at ${scholarship.universityName} in ${scholarship.country}.`;
    }

    const response = await provider.generateText(prompt, { temperature: 0.5, maxTokens: 200 });
    return response.text;
  }

  async explainEligibility(
    requirements: string[],
    studentProfile: Record<string, unknown>
  ): Promise<string> {
    const prompt = `You are an education advisor. Explain these scholarship requirements in simple, friendly language and assess the student's eligibility.

Requirements: ${requirements.join("; ")}

Student Profile:
- Country: ${studentProfile.country}
- Degree: ${studentProfile.educationLevel}
- GPA: ${studentProfile.gpa}
- Languages: ${Array.isArray(studentProfile.languages) ? studentProfile.languages.join(", ") : "N/A"}

Provide a clear, encouraging explanation.`;

    const provider = this.getProvider();
    if (!provider) {
      return `Requirements: ${requirements.join(", ")}. Please check the scholarship page for detailed eligibility criteria.`;
    }

    const response = await provider.generateText(prompt, { temperature: 0.6 });
    return response.text;
  }
}

// Singleton instance
let aiServiceInstance: AIService | null = null;

export function getAIService(): AIService {
  if (!aiServiceInstance) {
    aiServiceInstance = new AIService();

    // Add OpenRouter if API key is available
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (apiKey) {
      aiServiceInstance.addProvider(new OpenRouterProvider(apiKey));
    }

    // Add Ollama as fallback
    aiServiceInstance.addProvider(new OllamaProvider());
  }
  return aiServiceInstance;
}
