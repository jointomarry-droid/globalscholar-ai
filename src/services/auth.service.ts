import type { User } from "@/types";

export interface AuthProvider {
  id: string;
  name: string;
  authenticate(credentials: Record<string, string>): Promise<AuthResult>;
  getUser(token: string): Promise<User | null>;
  refreshToken(token: string): Promise<string>;
}

export interface AuthResult {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AuthService {
  login(email: string, password: string): Promise<AuthResult>;
  register(data: RegisterData): Promise<AuthResult>;
  logout(token: string): Promise<void>;
  getUser(token: string): Promise<User | null>;
  refreshToken(token: string): Promise<string>;
  resetPassword(email: string): Promise<void>;
  verifyEmail(token: string): Promise<void>;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: "student" | "university" | "organization";
}

// JWT token utilities
function base64url(data: string): string {
  return Buffer.from(data).toString("base64url");
}

function createToken(payload: Record<string, unknown>, secret: string, expiresIn = 86400): string {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const body = base64url(
    JSON.stringify({ ...payload, iat: now, exp: now + expiresIn })
  );
  // Simple signature (in production, use proper HMAC)
  const signature = base64url(`${header}.${body}.${secret}`);
  return `${header}.${body}.${signature}`;
}

// Default auth service (PocketBase-compatible)
export class DefaultAuthService implements AuthService {
  private users: Map<string, User & { password: string }> = new Map();
  private tokens: Map<string, string> = new Map(); // token → userId
  private secret: string;

  constructor(secret = "globalscholar-dev-secret") {
    this.secret = secret;
    // Seed admin user
    this.users.set("admin@globalscholar.ai", {
      id: "admin-1",
      email: "admin@globalscholar.ai",
      name: "Admin",
      role: "super_admin",
      emailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      password: "admin123",
    });
  }

  async login(email: string, password: string): Promise<AuthResult> {
    const user = this.users.get(email);
    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
    }

    const token = createToken({ userId: user.id, email: user.email, role: user.role }, this.secret);
    const refreshToken = createToken({ userId: user.id }, this.secret, 60 * 60 * 24 * 30);

    this.tokens.set(token, user.id);

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token, refreshToken };
  }

  async register(data: RegisterData): Promise<AuthResult> {
    if (this.users.has(data.email)) {
      throw new Error("Email already registered");
    }

    const user: User & { password: string } = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role || "student",
      emailVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      password: data.password,
    };

    this.users.set(data.email, user);

    const token = createToken({ userId: user.id, email: user.email, role: user.role }, this.secret);
    const refreshToken = createToken({ userId: user.id }, this.secret, 60 * 60 * 24 * 30);

    this.tokens.set(token, user.id);

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token, refreshToken };
  }

  async logout(token: string): Promise<void> {
    this.tokens.delete(token);
  }

  async getUser(token: string): Promise<User | null> {
    const userId = this.tokens.get(token);
    if (!userId) return null;

    const user = Array.from(this.users.values()).find((u) => u.id === userId);
    if (!user) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async refreshToken(token: string): Promise<string> {
    const userId = this.tokens.get(token);
    if (!userId) throw new Error("Invalid refresh token");

    const user = Array.from(this.users.values()).find((u) => u.id === userId);
    if (!user) throw new Error("User not found");

    this.tokens.delete(token);
    const newToken = createToken({ userId: user.id, email: user.email, role: user.role }, this.secret);
    this.tokens.set(newToken, user.id);
    return newToken;
  }

  async resetPassword(email: string): Promise<void> {
    // In production: send reset email
    console.log(`Password reset requested for ${email}`);
  }

  async verifyEmail(token: string): Promise<void> {
    // In production: verify email token
    console.log(`Email verified with token ${token}`);
  }
}

// Factory
let authInstance: AuthService | null = null;

export function getAuthService(): AuthService {
  if (!authInstance) {
    authInstance = new DefaultAuthService();
  }
  return authInstance;
}
