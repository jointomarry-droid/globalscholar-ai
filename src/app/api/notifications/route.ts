import { NextRequest, NextResponse } from "next/server";

// In-memory notifications store
const notifications: Map<string, {
  id: string;
  userId: string;
  type: "deadline_reminder" | "application_update" | "new_scholarship" | "system" | "marketing";
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}> = new Map();

// Seed default notifications
const seedNotifications = [
  {
    id: "1",
    userId: "admin-1",
    type: "deadline_reminder" as const,
    title: "Erasmus Mundus Deadline Approaching",
    message: "The Erasmus Mundus Joint Master Degree deadline is in 15 days. Don't miss it!",
    read: false,
    actionUrl: "/scholarships/erasus-mundus",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "2",
    userId: "admin-1",
    type: "new_scholarship" as const,
    title: "New Scholarship Available",
    message: "A new fully funded scholarship for Computer Science students in Canada has been added.",
    read: false,
    actionUrl: "/scholarships",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "3",
    userId: "admin-1",
    type: "application_update" as const,
    title: "Application Status Updated",
    message: "Your application for the DAAD Scholarship has been reviewed.",
    read: true,
    actionUrl: "/dashboard",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "4",
    userId: "admin-1",
    type: "system" as const,
    title: "Welcome to GlobalScholar AI",
    message: "Complete your profile to get personalized scholarship recommendations.",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

seedNotifications.forEach((n) => notifications.set(n.id, n));

function verifyToken(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json(
      { success: false, error: "Invalid token" },
      { status: 401 }
    );
  }

  const userNotifications = Array.from(notifications.values())
    .filter((n) => n.userId === payload.userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({
    success: true,
    data: userNotifications,
  });
}

export async function POST(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json(
      { success: false, error: "Invalid token" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { action, id } = body;

  switch (action) {
    case "markRead": {
      if (!id) {
        return NextResponse.json(
          { success: false, error: "id is required" },
          { status: 400 }
        );
      }

      const notif = notifications.get(id);
      if (notif && notif.userId === payload.userId) {
        notifications.set(id, { ...notif, read: true });
      }

      return NextResponse.json({ success: true });
    }

    case "markAllRead": {
      for (const [nid, notif] of notifications) {
        if (notif.userId === payload.userId && !notif.read) {
          notifications.set(nid, { ...notif, read: true });
        }
      }
      return NextResponse.json({ success: true });
    }

    case "create": {
      const { type, title, message, actionUrl, targetUserId } = body;
      if (!type || !title || !message) {
        return NextResponse.json(
          { success: false, error: "type, title, and message are required" },
          { status: 400 }
        );
      }

      const notifId = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const notification = {
        id: notifId,
        userId: targetUserId || payload.userId,
        type,
        title,
        message,
        read: false,
        actionUrl,
        createdAt: new Date().toISOString(),
      };

      notifications.set(notifId, notification);

      // Optionally send email notification
      if (process.env.RESEND_API_KEY) {
        try {
          const { getEmailService } = await import("@/services/email.service");
          const emailService = getEmailService();
          // Would need user email lookup here for production
        } catch {
          // Email send failure shouldn't block notification creation
        }
      }

      return NextResponse.json({ success: true, data: notification }, { status: 201 });
    }

    case "delete": {
      if (!id) {
        return NextResponse.json(
          { success: false, error: "id is required" },
          { status: 400 }
        );
      }

      const notif = notifications.get(id);
      if (notif && notif.userId === payload.userId) {
        notifications.delete(id);
      }

      return NextResponse.json({ success: true });
    }

    default:
      return NextResponse.json(
        { success: false, error: "Invalid action" },
        { status: 400 }
      );
  }
}
