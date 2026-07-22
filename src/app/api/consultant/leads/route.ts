import { NextResponse } from "next/server";

// Consultant CRM API
// Manage leads, students, applications, and commission tracking

export interface Lead {
  id: string;
  consultantId: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  degree: string;
  field: string;
  budget?: number;
  preferredCountries: string[];
  status: "new" | "contacted" | "qualified" | "application_started" | "admitted" | "enrolled" | "lost";
  source: "website" | "referral" | "social_media" | "advertisement" | "partner";
  notes: string[];
  followUpDate?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConsultantStats {
  totalLeads: number;
  activeLeads: number;
  admitted: number;
  enrolled: number;
  conversionRate: number;
  totalCommission: number;
  pendingCommission: number;
  monthlyLeads: number;
  monthlyAdmissions: number;
}

// In-memory store
const leads: Map<string, Lead> = new Map();

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

// GET /api/consultant/leads - List leads for consultant
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }

    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");

    let userLeads = Array.from(leads.values())
      .filter((l) => l.consultantId === payload.userId);

    if (status) {
      userLeads = userLeads.filter((l) => l.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      userLeads = userLeads.filter(
        (l) => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q)
      );
    }

    userLeads.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    // Calculate stats
    const stats: ConsultantStats = {
      totalLeads: userLeads.length,
      activeLeads: userLeads.filter((l) => !["enrolled", "lost"].includes(l.status)).length,
      admitted: userLeads.filter((l) => l.status === "admitted").length,
      enrolled: userLeads.filter((l) => l.status === "enrolled").length,
      conversionRate: userLeads.length > 0 ? Math.round((userLeads.filter((l) => l.status === "enrolled").length / userLeads.length) * 100) : 0,
      totalCommission: userLeads.filter((l) => l.status === "enrolled").length * 500,
      pendingCommission: userLeads.filter((l) => l.status === "admitted").length * 500,
      monthlyLeads: userLeads.filter((l) => {
        const created = new Date(l.createdAt);
        const now = new Date();
        return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
      }).length,
      monthlyAdmissions: userLeads.filter((l) => {
        if (l.status !== "admitted" && l.status !== "enrolled") return false;
        const updated = new Date(l.updatedAt);
        const now = new Date();
        return updated.getMonth() === now.getMonth() && updated.getFullYear() === now.getFullYear();
      }).length,
    };

    return NextResponse.json({
      success: true,
      data: userLeads,
      stats,
      total: userLeads.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

// POST /api/consultant/leads - Create or update leads
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const { action, leadId, name, email, phone, country, degree, field, budget, preferredCountries, source, notes, status, followUpDate } = body;

    switch (action) {
      case "create": {
        if (!name || !email) {
          return NextResponse.json({ success: false, error: "name and email are required" }, { status: 400 });
        }

        const id = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const now = new Date().toISOString();

        const lead: Lead = {
          id,
          consultantId: payload.userId as string,
          name,
          email,
          phone,
          country: country || "",
          degree: degree || "",
          field: field || "",
          budget,
          preferredCountries: preferredCountries || [],
          status: "new",
          source: source || "website",
          notes: notes ? [notes] : [],
          followUpDate,
          createdAt: now,
          updatedAt: now,
        };

        leads.set(id, lead);
        return NextResponse.json({ success: true, data: lead }, { status: 201 });
      }

      case "update": {
        if (!leadId) {
          return NextResponse.json({ success: false, error: "leadId is required" }, { status: 400 });
        }

        const lead = leads.get(leadId);
        if (!lead || lead.consultantId !== payload.userId) {
          return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
        }

        const now = new Date().toISOString();
        const updated: Lead = {
          ...lead,
          name: name || lead.name,
          email: email || lead.email,
          phone: phone || lead.phone,
          country: country || lead.country,
          degree: degree || lead.degree,
          field: field || lead.field,
          budget: budget || lead.budget,
          preferredCountries: preferredCountries || lead.preferredCountries,
          status: status || lead.status,
          followUpDate: followUpDate || lead.followUpDate,
          notes: notes ? [...lead.notes, notes] : lead.notes,
          updatedAt: now,
        };

        leads.set(leadId, updated);
        return NextResponse.json({ success: true, data: updated });
      }

      case "addNote": {
        if (!leadId || !notes) {
          return NextResponse.json({ success: false, error: "leadId and notes are required" }, { status: 400 });
        }

        const lead = leads.get(leadId);
        if (!lead || lead.consultantId !== payload.userId) {
          return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
        }

        lead.notes.push(notes);
        lead.updatedAt = new Date().toISOString();
        leads.set(leadId, lead);
        return NextResponse.json({ success: true, data: lead });
      }

      case "delete": {
        if (!leadId) {
          return NextResponse.json({ success: false, error: "leadId is required" }, { status: 400 });
        }

        const lead = leads.get(leadId);
        if (!lead || lead.consultantId !== payload.userId) {
          return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
        }

        leads.delete(leadId);
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Lead operation failed" },
      { status: 500 }
    );
  }
}
