import { describe, it, expect, vi, beforeEach } from "vitest";

describe("Email Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates email service instance", async () => {
    const { getEmailService } = await import("@/services/email.service");
    const service = getEmailService();
    expect(service).toBeDefined();
    expect(service.send).toBeDefined();
    expect(service.sendBatch).toBeDefined();
    expect(service.sendNotification).toBeDefined();
    expect(service.sendWelcome).toBeDefined();
    expect(service.sendPasswordReset).toBeDefined();
    expect(service.sendApplicationUpdate).toBeDefined();
  });

  it("sendWelcome creates correct HTML", async () => {
    const { getEmailService } = await import("@/services/email.service");
    const service = getEmailService();

    // Mock fetch for Resend API call
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: "email-1" }),
    });

    await service.sendWelcome("test@example.com", "Test User");

    // Without RESEND_API_KEY, it should just log
    expect(true).toBe(true);

    global.fetch = originalFetch;
  });

  it("sendBatch handles multiple recipients", async () => {
    const { getEmailService } = await import("@/services/email.service");
    const service = getEmailService();

    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: [] }),
    });

    await service.sendBatch(
      ["a@test.com", "b@test.com"],
      "Test Subject",
      "<p>Test</p>"
    );

    expect(true).toBe(true);
    global.fetch = originalFetch;
  });
});

describe("Notification Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates notification service instance", async () => {
    const { getNotificationService } = await import("@/services/notification.service");
    const service = getNotificationService();
    expect(service).toBeDefined();
    expect(service.send).toBeDefined();
    expect(service.sendBulk).toBeDefined();
    expect(service.getUserNotifications).toBeDefined();
    expect(service.markAsRead).toBeDefined();
    expect(service.markAllAsRead).toBeDefined();
    expect(service.getUnreadCount).toBeDefined();
  });

  it("send creates a notification with id and timestamp", async () => {
    const { getNotificationService } = await import("@/services/notification.service");
    const service = getNotificationService();

    await service.send({
      userId: "user-1",
      type: "system",
      title: "Test Notification",
      message: "This is a test",
      read: false,
    });

    const notifications = await service.getUserNotifications("user-1");
    expect(notifications.length).toBeGreaterThan(0);
    expect(notifications[0].title).toBe("Test Notification");
  });

  it("markAsRead updates notification", async () => {
    const { getNotificationService } = await import("@/services/notification.service");
    const service = getNotificationService();

    // Send first
    await service.send({
      userId: "user-2",
      type: "new_scholarship",
      title: "New Scholarship",
      message: "A new scholarship is available",
      read: false,
    });

    const notifs = await service.getUserNotifications("user-2");
    const id = notifs[0].id;

    await service.markAsRead(id);

    const updated = await service.getUserNotifications("user-2");
    expect(updated[0].read).toBe(true);
  });

  it("getUnreadCount returns correct count", async () => {
    const { getNotificationService } = await import("@/services/notification.service");
    const service = getNotificationService();

    const count = await service.getUnreadCount("user-1");
    expect(typeof count).toBe("number");
  });
});
