import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("UI Store", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with default state", async () => {
    const { useUIStore } = await import("@/store/ui-store");
    useUIStore.setState({ toasts: [], sidebarOpen: false, modalOpen: null, searchOpen: false });

    const state = useUIStore.getState();
    expect(state.toasts).toEqual([]);
    expect(state.sidebarOpen).toBe(false);
    expect(state.modalOpen).toBeNull();
    expect(state.searchOpen).toBe(false);
  });

  it("addToast adds a toast to the list", async () => {
    const { useUIStore } = await import("@/store/ui-store");
    useUIStore.setState({ toasts: [] });

    useUIStore.getState().addToast({
      type: "success",
      title: "Test toast",
      message: "This is a test",
    });

    const state = useUIStore.getState();
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0].title).toBe("Test toast");
    expect(state.toasts[0].type).toBe("success");
    expect(state.toasts[0].id).toBeDefined();
  });

  it("removeToast removes a toast by id", async () => {
    const { useUIStore } = await import("@/store/ui-store");
    useUIStore.setState({ toasts: [] });

    useUIStore.getState().addToast({ type: "success", title: "Toast 1" });
    useUIStore.getState().addToast({ type: "error", title: "Toast 2" });

    const toasts = useUIStore.getState().toasts;
    expect(toasts).toHaveLength(2);

    const firstId = toasts[0].id;
    useUIStore.getState().removeToast(firstId);

    const state = useUIStore.getState();
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0].title).toBe("Toast 2");
  });

  it("toggleSidebar toggles sidebar state", async () => {
    const { useUIStore } = await import("@/store/ui-store");
    useUIStore.setState({ sidebarOpen: false });

    useUIStore.getState().toggleSidebar();
    expect(useUIStore.getState().sidebarOpen).toBe(true);

    useUIStore.getState().toggleSidebar();
    expect(useUIStore.getState().sidebarOpen).toBe(false);
  });

  it("openModal and closeModal set modal state", async () => {
    const { useUIStore } = await import("@/store/ui-store");
    useUIStore.setState({ modalOpen: null });

    useUIStore.getState().openModal("settings");
    expect(useUIStore.getState().modalOpen).toBe("settings");

    useUIStore.getState().closeModal();
    expect(useUIStore.getState().modalOpen).toBeNull();
  });

  it("setSearchOpen toggles search state", async () => {
    const { useUIStore } = await import("@/store/ui-store");
    useUIStore.setState({ searchOpen: false });

    useUIStore.getState().setSearchOpen(true);
    expect(useUIStore.getState().searchOpen).toBe(true);

    useUIStore.getState().setSearchOpen(false);
    expect(useUIStore.getState().searchOpen).toBe(false);
  });
});
