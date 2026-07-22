import { NextResponse } from "next/server";

// Admission Pipeline Tracker API
// Track application stages from university selection to enrollment

export interface AdmissionStage {
  id: string;
  name: string;
  description: string;
  order: number;
  status: "pending" | "in_progress" | "completed" | "skipped";
  startedAt?: string;
  completedAt?: string;
  notes?: string;
  documents?: string[];
  deadline?: string;
}

export interface AdmissionPipeline {
  id: string;
  studentId: string;
  scholarshipId?: string;
  universityName: string;
  program: string;
  country: string;
  degree: string;
  stages: AdmissionStage[];
  currentStage: string;
  overallProgress: number;
  createdAt: string;
  updatedAt: string;
}

const defaultStages: Omit<AdmissionStage, "status">[] = [
  { id: "research", name: "Research & Selection", description: "Research universities, programs, and requirements", order: 1 },
  { id: "requirements", name: "Check Requirements", description: "Verify eligibility and required documents", order: 2 },
  { id: "documents", name: "Prepare Documents", description: "Gather transcripts, test scores, recommendations", order: 3 },
  { id: "sop", name: "Write SOP/Motivation Letter", description: "Draft and refine statement of purpose", order: 4 },
  { id: "lor", name: "Request LORs", description: "Request letters of recommendation from professors", order: 5 },
  { id: "application", name: "Submit Application", description: "Complete and submit application forms", order: 6 },
  { id: "fee", name: "Pay Application Fee", description: "Submit application payment", order: 7 },
  { id: "interview", name: "Interview Preparation", description: "Prepare for and attend interviews", order: 8 },
  { id: "decision", name: "Await Decision", description: "Wait for university decision", order: 9 },
  { id: "offer", name: "Accept Offer", description: "Review and accept offer letter", order: 10 },
  { id: "visa", name: "Visa Application", description: "Apply for student visa", order: 11 },
  { id: "financials", name: "Arrange Finances", description: "Secure funding, scholarships, or loans", order: 12 },
  { id: "accommodation", name: "Find Accommodation", description: "Arrange housing near university", order: 13 },
  { id: "travel", name: "Travel Planning", description: "Book flights and plan arrival", order: 14 },
  { id: "enrollment", name: "University Enrollment", description: "Complete enrollment and orientation", order: 15 },
];

// In-memory store
const pipelines: Map<string, AdmissionPipeline> = new Map();

function createPipeline(studentId: string, universityName: string, program: string, country: string, degree: string): AdmissionPipeline {
  const id = `pipeline-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();

  const stages: AdmissionStage[] = defaultStages.map((stage) => ({
    ...stage,
    status: "pending" as const,
  }));

  return {
    id,
    studentId,
    universityName,
    program,
    country,
    degree,
    stages,
    currentStage: "research",
    overallProgress: 0,
    createdAt: now,
    updatedAt: now,
  };
}

function calculateProgress(stages: AdmissionStage[]): number {
  const completed = stages.filter((s) => s.status === "completed").length;
  return Math.round((completed / stages.length) * 100);
}

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

// GET /api/admissions/pipeline - List all pipelines for user
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
    const pipelineId = url.searchParams.get("id");

    if (pipelineId) {
      const pipeline = pipelines.get(pipelineId);
      if (!pipeline || pipeline.studentId !== payload.userId) {
        return NextResponse.json({ success: false, error: "Pipeline not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: pipeline });
    }

    const userPipelines = Array.from(pipelines.values())
      .filter((p) => p.studentId === payload.userId)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return NextResponse.json({
      success: true,
      data: userPipelines,
      total: userPipelines.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch pipelines" },
      { status: 500 }
    );
  }
}

// POST /api/admissions/pipeline - Create or update pipeline
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
    const { action, universityName, program, country, degree, pipelineId, stageId, stageStatus, notes } = body;

    switch (action) {
      case "create": {
        if (!universityName || !program) {
          return NextResponse.json({ success: false, error: "universityName and program are required" }, { status: 400 });
        }

        const pipeline = createPipeline(payload.userId as string, universityName, program, country || "", degree || "");
        pipelines.set(pipeline.id, pipeline);
        return NextResponse.json({ success: true, data: pipeline }, { status: 201 });
      }

      case "updateStage": {
        if (!pipelineId || !stageId || !stageStatus) {
          return NextResponse.json({ success: false, error: "pipelineId, stageId, and stageStatus are required" }, { status: 400 });
        }

        const pipeline = pipelines.get(pipelineId);
        if (!pipeline || pipeline.studentId !== payload.userId) {
          return NextResponse.json({ success: false, error: "Pipeline not found" }, { status: 404 });
        }

        const now = new Date().toISOString();
        pipeline.stages = pipeline.stages.map((stage) => {
          if (stage.id === stageId) {
            return {
              ...stage,
              status: stageStatus,
              startedAt: stageStatus === "in_progress" ? now : stage.startedAt,
              completedAt: stageStatus === "completed" ? now : stage.completedAt,
              notes: notes || stage.notes,
            };
          }
          return stage;
        });

        pipeline.overallProgress = calculateProgress(pipeline.stages);
        const lastCompleted = [...pipeline.stages].filter((s) => s.status === "completed").pop();
        pipeline.currentStage = lastCompleted ? lastCompleted.id : "research";
        pipeline.updatedAt = now;

        pipelines.set(pipelineId, pipeline);
        return NextResponse.json({ success: true, data: pipeline });
      }

      case "delete": {
        if (!pipelineId) {
          return NextResponse.json({ success: false, error: "pipelineId is required" }, { status: 400 });
        }

        const pipeline = pipelines.get(pipelineId);
        if (!pipeline || pipeline.studentId !== payload.userId) {
          return NextResponse.json({ success: false, error: "Pipeline not found" }, { status: 404 });
        }

        pipelines.delete(pipelineId);
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Pipeline operation failed" },
      { status: 500 }
    );
  }
}
