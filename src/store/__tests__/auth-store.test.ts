import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/firebase/auth", () => ({
  firebaseSignIn: vi.fn(),
  firebaseSignUp: vi.fn(),
  firebaseSignOut: vi.fn(),
  firebaseResetPassword: vi.fn(),
  onFirebaseAuthChange: vi.fn(() => vi.fn()),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Auth Store", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    import("@/store/auth-store").then(({ useAuthStore }) => {
      useAuthStore.setState({
        user: null,
        firebaseUser: null,
        token: null,
        refreshToken: null,
        isLoading: false,
        error: null,
        authProvider: null,
      });
    });
  });

  it("initializes with null user and token", async () => {
    const { useAuthStore } = await import("@/store/auth-store");
    useAuthStore.setState({ user: null, token: null, isLoading: false, error: null });

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("login calls API and sets user on success", async () => {
    const { firebaseSignIn } = await import("@/lib/firebase/auth");
    vi.mocked(firebaseSignIn).mockRejectedValue(new Error("Firebase unavailable"));

    const { useAuthStore } = await import("@/store/auth-store");
    useAuthStore.setState({ user: null, token: null, error: null });

    const mockUser = {
      id: "user-1",
      email: "test@example.com",
      name: "Test User",
      role: "student" as const,
      emailVerified: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        success: true,
        data: {
          user: mockUser,
          token: "mock-token-123",
          refreshToken: "mock-refresh-token-123",
        },
      }),
    });

    await useAuthStore.getState().login("test@example.com", "password123");
    const state = useAuthStore.getState();

    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe("mock-token-123");
    expect(state.refreshToken).toBe("mock-refresh-token-123");
    expect(state.error).toBeNull();
  });

  it("login sets error on API failure", async () => {
    const { firebaseSignIn } = await import("@/lib/firebase/auth");
    vi.mocked(firebaseSignIn).mockRejectedValue(new Error("Firebase unavailable"));

    const { useAuthStore } = await import("@/store/auth-store");
    useAuthStore.setState({ user: null, token: null, error: null });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        success: false,
        error: "Invalid credentials",
      }),
    });

    try {
      await useAuthStore.getState().login("wrong@example.com", "wrongpass");
    } catch {
      // expected to throw
    }

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.error).toBe("Invalid credentials");
  });

  it("register calls API and sets user on success", async () => {
    const { firebaseSignUp } = await import("@/lib/firebase/auth");
    vi.mocked(firebaseSignUp).mockRejectedValue(new Error("Firebase unavailable"));

    const { useAuthStore } = await import("@/store/auth-store");
    useAuthStore.setState({ user: null, token: null, error: null });

    const mockUser = {
      id: "user-2",
      email: "new@example.com",
      name: "New User",
      role: "student" as const,
      emailVerified: false,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        success: true,
        data: {
          user: mockUser,
          token: "mock-token-456",
          refreshToken: "mock-refresh-token-456",
        },
      }),
    });

    await useAuthStore.getState().register({
      email: "new@example.com",
      password: "Password123",
      name: "New User",
    });

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe("mock-token-456");
  });

  it("logout clears user and tokens", async () => {
    const { firebaseSignOut } = await import("@/lib/firebase/auth");
    vi.mocked(firebaseSignOut).mockResolvedValue(undefined);

    const { useAuthStore } = await import("@/store/auth-store");

    useAuthStore.setState({
      user: { id: "user-1", email: "test@example.com", name: "Test", role: "student", emailVerified: true, createdAt: "", updatedAt: "" },
      token: "some-token",
      refreshToken: "some-refresh",
      authProvider: "api",
    });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    });

    await useAuthStore.getState().logout();
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.refreshToken).toBeNull();
  });

  it("fetchUser clears token if API returns failure", async () => {
    const { useAuthStore } = await import("@/store/auth-store");
    useAuthStore.setState({ token: "invalid-token", user: null, authProvider: "api" });

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ success: false, error: "Invalid token" }),
    });

    await useAuthStore.getState().fetchUser();
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it("clearError resets error state", async () => {
    const { useAuthStore } = await import("@/store/auth-store");
    useAuthStore.setState({ error: "Some error" });

    useAuthStore.getState().clearError();
    expect(useAuthStore.getState().error).toBeNull();
  });
});
