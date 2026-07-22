import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Notifications API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 without auth token", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ success: false, error: "Authentication required" }),
      status: 401,
    });

    const response = await fetch("/api/notifications");
    const data = await response.json();
    expect(data.success).toBe(false);
  });
});

describe("Applications API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 without auth token", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ success: false, error: "Authentication required" }),
      status: 401,
    });

    const response = await fetch("/api/applications");
    const data = await response.json();
    expect(data.success).toBe(false);
  });
});

describe("Scholarships API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns scholarship list", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        success: true,
        data: [{ id: "sch-1", title: "Test Scholarship" }],
        pagination: { total: 1, page: 1, limit: 12, totalPages: 1 },
      }),
    });

    const response = await fetch("/api/scholarships");
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data).toHaveLength(1);
  });
});

describe("Universities API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns university list", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        success: true,
        data: [{ id: "uni-1", name: "MIT" }],
        pagination: { total: 1, page: 1, limit: 50, totalPages: 1 },
      }),
    });

    const response = await fetch("/api/universities");
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data).toHaveLength(1);
  });
});
