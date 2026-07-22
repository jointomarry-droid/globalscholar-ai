import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Scholarship Store", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with default state", async () => {
    const { useScholarshipStore } = await import("@/store/scholarship-store");
    useScholarshipStore.setState({
      scholarships: null,
      currentScholarship: null,
      savedScholarships: [],
      isLoading: false,
      error: null,
      filters: { page: 1, limit: 12, sortBy: "createdAt", sortOrder: "desc" },
    });

    const state = useScholarshipStore.getState();
    expect(state.scholarships).toBeNull();
    expect(state.currentScholarship).toBeNull();
    expect(state.savedScholarships).toEqual([]);
    expect(state.isLoading).toBe(false);
  });

  it("fetchScholarships loads data successfully", async () => {
    const { useScholarshipStore } = await import("@/store/scholarship-store");
    useScholarshipStore.setState({ isLoading: false, error: null });

    const mockScholarships = [
      { id: "sch-1", title: "Test Scholarship", slug: "test-scholarship" },
    ];

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        success: true,
        data: mockScholarships,
        pagination: { total: 1, page: 1, limit: 12, totalPages: 1 },
      }),
    });

    await useScholarshipStore.getState().fetchScholarships({});
    const state = useScholarshipStore.getState();

    expect(state.scholarships).not.toBeNull();
    expect(state.scholarships?.data).toHaveLength(1);
    expect(state.scholarships?.total).toBe(1);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("fetchScholarships handles network error", async () => {
    const { useScholarshipStore } = await import("@/store/scholarship-store");
    useScholarshipStore.setState({ isLoading: false, error: null });

    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    await useScholarshipStore.getState().fetchScholarships({});
    const state = useScholarshipStore.getState();

    expect(state.error).toBe("Network error");
    expect(state.isLoading).toBe(false);
  });

  it("fetchScholarships handles API error response", async () => {
    const { useScholarshipStore } = await import("@/store/scholarship-store");
    useScholarshipStore.setState({ isLoading: false, error: null });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        success: false,
        error: "Server error",
      }),
    });

    await useScholarshipStore.getState().fetchScholarships({});
    const state = useScholarshipStore.getState();

    expect(state.error).toBe("Server error");
    expect(state.isLoading).toBe(false);
  });

  it("setFilters updates filters and resets page to 1 when page not specified", async () => {
    const { useScholarshipStore } = await import("@/store/scholarship-store");
    useScholarshipStore.setState({
      filters: { page: 5, limit: 12, sortBy: "createdAt", sortOrder: "desc" },
    });

    useScholarshipStore.getState().setFilters({ country: "Germany" });
    const state = useScholarshipStore.getState();

    expect(state.filters.country).toBe("Germany");
    expect(state.filters.page).toBe(1); // reset because page was not in newFilters
  });

  it("setFilters preserves page when explicitly set", async () => {
    const { useScholarshipStore } = await import("@/store/scholarship-store");

    useScholarshipStore.getState().setFilters({ country: "Germany", page: 3 });
    const state = useScholarshipStore.getState();

    expect(state.filters.country).toBe("Germany");
    expect(state.filters.page).toBe(3);
  });

  it("clearFilters resets to defaults", async () => {
    const { useScholarshipStore } = await import("@/store/scholarship-store");

    useScholarshipStore.getState().setFilters({ country: "Germany", degree: "masters" });
    useScholarshipStore.getState().clearFilters();
    const state = useScholarshipStore.getState();

    expect(state.filters.country).toBeUndefined();
    expect(state.filters.degree).toBeUndefined();
    expect(state.filters.page).toBe(1);
    expect(state.filters.limit).toBe(12);
  });

  it("clearError resets error", async () => {
    const { useScholarshipStore } = await import("@/store/scholarship-store");
    useScholarshipStore.setState({ error: "Some error" });

    useScholarshipStore.getState().clearError();
    expect(useScholarshipStore.getState().error).toBeNull();
  });
});
