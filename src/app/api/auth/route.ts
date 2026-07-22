import { NextRequest, NextResponse } from "next/server";
import { getAuthService } from "@/services/auth.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, name, role } = body;

    const authService = getAuthService();

    switch (action) {
      case "login": {
        if (!email || !password) {
          return NextResponse.json(
            { success: false, error: "Email and password are required" },
            { status: 400 }
          );
        }
        const result = await authService.login(email, password);
        return NextResponse.json({ success: true, data: result });
      }

      case "register": {
        if (!email || !password || !name) {
          return NextResponse.json(
            { success: false, error: "Email, password, and name are required" },
            { status: 400 }
          );
        }
        const result = await authService.register({ email, password, name, role });
        return NextResponse.json({ success: true, data: result });
      }

      case "logout": {
        const token = request.headers.get("authorization")?.replace("Bearer ", "");
        if (token) {
          await authService.logout(token);
        }
        return NextResponse.json({ success: true });
      }

      case "refresh": {
        const token = request.headers.get("authorization")?.replace("Bearer ", "");
        if (!token) {
          return NextResponse.json(
            { success: false, error: "Token required" },
            { status: 400 }
          );
        }
        const newToken = await authService.refreshToken(token);
        return NextResponse.json({ success: true, data: { token: newToken } });
      }

      case "me": {
        const token = request.headers.get("authorization")?.replace("Bearer ", "");
        if (!token) {
          return NextResponse.json(
            { success: false, error: "Token required" },
            { status: 401 }
          );
        }
        const user = await authService.getUser(token);
        if (!user) {
          return NextResponse.json(
            { success: false, error: "Invalid token" },
            { status: 401 }
          );
        }
        return NextResponse.json({ success: true, data: user });
      }

      case "reset-password": {
        if (!email) {
          return NextResponse.json(
            { success: false, error: "Email is required" },
            { status: 400 }
          );
        }
        await authService.resetPassword(email);
        return NextResponse.json({ success: true, message: "Password reset email sent" });
      }

      default:
        return NextResponse.json(
          { success: false, error: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Auth API error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Auth failed" },
      { status: 500 }
    );
  }
}
