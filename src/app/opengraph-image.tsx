import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: "radial-gradient(circle at 20% 30%, #6366f1 0%, transparent 40%), radial-gradient(circle at 80% 70%, #8b5cf6 0%, transparent 40%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            padding: "60px",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 32,
              boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)",
            }}
          >
            <span style={{ fontSize: 40, color: "white" }}>🎓</span>
          </div>

          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              textAlign: "center",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Global
            <span style={{ color: "#a78bfa" }}>Scholar</span>
            AI
          </h1>

          <p
            style={{
              fontSize: 28,
              color: "#94a3b8",
              textAlign: "center",
              margin: 0,
              marginTop: 16,
            }}
          >
            Your Intelligent Gateway to Global Education
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 40,
            }}
          >
            {["45,000+ Scholarships", "AI-Powered Search", "190+ Countries"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "12px 24px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#e2e8f0",
                    fontSize: 18,
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>

          <p
            style={{
              fontSize: 18,
              color: "#64748b",
              marginTop: 48,
              fontWeight: 500,
            }}
          >
            globalscholar.ai
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

export default GET;
