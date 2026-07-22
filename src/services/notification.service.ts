import type { Notification } from "@/types";

export interface NotificationService {
  send(notification: Omit<Notification, "id" | "createdAt">): Promise<void>;
  sendBulk(notifications: Omit<Notification, "id" | "createdAt">[]): Promise<void>;
  getUserNotifications(userId: string, unreadOnly?: boolean): Promise<Notification[]>;
  markAsRead(id: string): Promise<void>;
  markAllAsRead(userId: string): Promise<void>;
  getUnreadCount(userId: string): Promise<number>;
}

export class DefaultNotificationService implements NotificationService {
  private notifications: Map<string, Notification> = new Map();

  async send(notification: Omit<Notification, "id" | "createdAt">): Promise<void> {
    const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const full: Notification = {
      ...notification,
      id,
      createdAt: new Date().toISOString(),
    };
    this.notifications.set(id, full);

    // In production: send email, push notification, etc.
    console.log(`[Notification] ${notification.type}: ${notification.title}`);
  }

  async sendBulk(notifications: Omit<Notification, "id" | "createdAt">[]): Promise<void> {
    for (const n of notifications) {
      await this.send(n);
    }
  }

  async getUserNotifications(userId: string, unreadOnly = false): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter((n) => n.userId === userId && (!unreadOnly || !n.read))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async markAsRead(id: string): Promise<void> {
    const notif = this.notifications.get(id);
    if (notif) {
      this.notifications.set(id, { ...notif, read: true });
    }
  }

  async markAllAsRead(userId: string): Promise<void> {
    for (const [id, notif] of this.notifications) {
      if (notif.userId === userId && !notif.read) {
        this.notifications.set(id, { ...notif, read: true });
      }
    }
  }

  async getUnreadCount(userId: string): Promise<number> {
    return Array.from(this.notifications.values()).filter(
      (n) => n.userId === userId && !n.read
    ).length;
  }
}

// Email service (for actual email delivery)
export interface EmailService {
  send(to: string, subject: string, html: string): Promise<void>;
  sendBulk(recipients: string[], subject: string, html: string): Promise<void>;
}

export class ResendEmailService implements EmailService {
  private apiKey: string;
  private from: string;

  constructor(apiKey: string, from = "GlobalScholar AI <noreply@globalscholar.ai>") {
    this.apiKey = apiKey;
    this.from = from;
  }

  async send(to: string, subject: string, html: string): Promise<void> {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: this.from, to, subject, html }),
    });

    if (!response.ok) {
      throw new Error(`Email send failed: ${response.statusText}`);
    }
  }

  async sendBulk(recipients: string[], subject: string, html: string): Promise<void> {
    const response = await fetch("https://api.resend.com/emails/batch", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        recipients.map((to) => ({ from: this.from, to, subject, html }))
      ),
    });

    if (!response.ok) {
      throw new Error(`Bulk email send failed: ${response.statusText}`);
    }
  }
}

// Factory
let notificationInstance: NotificationService | null = null;

export function getNotificationService(): NotificationService {
  if (!notificationInstance) {
    notificationInstance = new DefaultNotificationService();
  }
  return notificationInstance;
}
