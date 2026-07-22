import { describe, it, expect, beforeEach } from "vitest";
import { scholarshipFilterSchema, loginSchema, registerSchema, contactSchema } from "../index";

describe("Validators", () => {
  describe("loginSchema", () => {
    it("validates correct login data", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "password123",
      });
      expect(result.success).toBe(true);
    });

    it("rejects invalid email", () => {
      const result = loginSchema.safeParse({
        email: "not-an-email",
        password: "password123",
      });
      expect(result.success).toBe(false);
    });

    it("rejects short password", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "12345",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("registerSchema", () => {
    it("validates correct registration data", () => {
      const result = registerSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        password: "Password123",
        confirmPassword: "Password123",
        role: "student",
      });
      expect(result.success).toBe(true);
    });

    it("rejects mismatched passwords", () => {
      const result = registerSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        password: "Password123",
        confirmPassword: "Password456",
        role: "student",
      });
      expect(result.success).toBe(false);
    });

    it("rejects password without uppercase", () => {
      const result = registerSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
        role: "student",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("scholarshipFilterSchema", () => {
    it("validates empty filters", () => {
      const result = scholarshipFilterSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it("validates filters with values", () => {
      const result = scholarshipFilterSchema.safeParse({
        country: "Germany",
        degree: "masters",
        funding: "fully_funded",
        page: 1,
        limit: 12,
      });
      expect(result.success).toBe(true);
    });

    it("applies default values", () => {
      const result = scholarshipFilterSchema.safeParse({});
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(12);
        expect(result.data.sortBy).toBe("createdAt");
        expect(result.data.sortOrder).toBe("desc");
      }
    });
  });

  describe("contactSchema", () => {
    it("validates correct contact data", () => {
      const result = contactSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        subject: "Question about scholarships",
        message: "I would like to know more about available scholarships for international students.",
      });
      expect(result.success).toBe(true);
    });

    it("rejects short message", () => {
      const result = contactSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        subject: "Question",
        message: "Hi",
      });
      expect(result.success).toBe(false);
    });
  });
});
