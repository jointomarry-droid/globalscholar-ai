import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import React from "react";

describe("useAuth hook", () => {
  it("returns auth properties from store", async () => {
    const { useAuth } = await import("@/hooks");
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => React.createElement(React.Fragment, null, children),
    });

    expect(result.current).toHaveProperty("user");
    expect(result.current).toHaveProperty("token");
    expect(result.current).toHaveProperty("isLoading");
    expect(result.current).toHaveProperty("login");
    expect(result.current).toHaveProperty("register");
    expect(result.current).toHaveProperty("logout");
    expect(result.current).toHaveProperty("clearError");
  });

  it("starts with null user and token", async () => {
    const { useAuth } = await import("@/hooks");
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => React.createElement(React.Fragment, null, children),
    });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });
});
