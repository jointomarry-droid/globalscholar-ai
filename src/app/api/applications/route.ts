import { NextResponse } from "next/server";
import { getAuthService } from "@/services/auth.service";

// JWT token verification
function base64urlDecode(data: string): string {
  return Buffer.from(data, "base64url").toString();
}

function verifyToken(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(base64urlDecode(parts[1]));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

const applications: Map<string, {
  id: string;
  studentId: string;
  scholarshipId: string;
  status: string;
  submittedAt?: string;
  notes?: string;
  documents: string[];
  createdAt: string;
  updatedAt: string;
}> = new Map();

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const statusFilter = url.searchParams.get("status");
    const scholarshipId = url.searchParams.get("scholarshipId");

    const userApps = Array.from(applications.values()).filter(
      (app) => app.studentId === payload.userId
    );

    const filtered = userApps.filter((app) => {
      if (statusFilter && app.status !== statusFilter) return false;
      if (scholarshipId && app.scholarshipId !== scholarshipId) return false;
      return true;
    });

    return NextResponse.json({
      success: true,
      data: filtered,
      pagination: {
        total: filtered.length,
        page: 1,
        limit: 50,
        totalPages: 1,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, scholarshipId, id, status: newStatus, notes, documents } = body;

    switch (action) {
      case "create": {
        if (!scholarshipId) {
          return NextResponse.json(
            { success: false, error: "scholarshipId is required" },
            { status: 400 }
          );
        }

        const appId = `app-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const now = new Date().toISOString();

        const application = {
          id: appId,
          studentId: payload.userId as string,
          scholarshipId,
          status: "draft",
          documents: documents || [],
          createdAt: now,
          updatedAt: now,
        };

        applications.set(appId, application);
        return NextResponse.json({ success: true, data: application }, { status: 201 });
      }

      case "submit": {
        if (!id) {
          return NextResponse.json(
            { success: false, error: "id is required" },
            { status: 400 }
          );
        }

        const existing = applications.get(id);
        if (!existing || existing.studentId !== payload.userId) {
          return NextResponse.json(
            { success: false, error: "Application not found" },
            { status: 404 }
          );
        }

        const updated = {
          ...existing,
          status: "submitted",
          submittedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        applications.set(id, updated);
        return NextResponse.json({ success: true, data: updated });
      }

      case "update": {
        if (!id) {
          return NextResponse.json(
            { success: false, error: "id is required" },
            { status: 400 }
          );
        }

        const existing = applications.get(id);
        if (!existing) {
          return NextResponse.json(
            { success: false, error: "Application not found" },
            { status: 404 }
          );
        }

        const updated = {
          ...existing,
          status: newStatus || existing.status,
          notes: notes || existing.notes,
          documents: documents || existing.documents,
          updatedAt: new Date().toISOString(),
        };

        applications.set(id, updated);
        return NextResponse.json({ success: true, data: updated });
      }

      case "delete": {
        if (!id) {
          return NextResponse.json(
            { success: false, error: "id is required" },
            { status: 400 }
          );
        }

        const existing = applications.get(id);
        if (!existing || existing.studentId !== payload.userId) {
          return NextResponse.json(
            { success: false, error: "Application not found" },
            { status: 404 }
          );
        }

        applications.delete(id);
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json(
          { success: false, error: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Application operation failed" },
      { status: 500 }
    );
  }
}
