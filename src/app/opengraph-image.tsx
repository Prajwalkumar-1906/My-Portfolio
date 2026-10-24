import { ImageResponse } from "next/og";

export const alt = "PRAJWALKUMAR MADIWAL | Interactive 3D Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient red background aura */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            backgroundColor: "rgba(229, 9, 20, 0.22)",
            filter: "blur(90px)",
          }}
        />

        {/* Left Column: Branding, Title, Tags, Bio */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "680px",
            zIndex: 10,
          }}
        >
          {/* Netflix style wordmark + Open to work */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <span
              style={{
                fontSize: "36px",
                fontWeight: 900,
                letterSpacing: "4px",
                color: "#E50914",
              }}
            >
              PRAJWAL
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 14px",
                borderRadius: "999px",
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                color: "#10B981",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              OPEN TO WORK
            </div>
          </div>

          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "2px",
              lineHeight: 1.05,
              margin: "0 0 16px 0",
            }}
          >
            PRAJWALKUMAR MADIWAL
          </h1>

          <p
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "#F87171",
              margin: "0 0 20px 0",
            }}
          >
            AI/ML & Full-Stack Engineer • Public Speaker • Data Analyst
          </p>

          <p
            style={{
              fontSize: "18px",
              color: "#A1A1AA",
              margin: "0 0 28px 0",
              lineHeight: 1.4,
            }}
          >
            Final-Year CSE @ RRCE • AI Intern @ ABB • 8K+ LinkedIn Followers • PlaceWise & Chukta Architect
          </p>

          {/* Social handle row */}
          <div style={{ display: "flex", gap: "20px", color: "#71717A", fontSize: "15px", fontWeight: 600 }}>
            <span>@foreverprajwalkumar</span>
            <span>•</span>
            <span>@prajwalkumar_19</span>
            <span>•</span>
            <span>pkm.digi@gmail.com</span>
          </div>
        </div>

        {/* Right Column: Visual Accent Badge */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "300px",
            height: "300px",
            borderRadius: "28px",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            border: "2px solid rgba(229, 9, 20, 0.4)",
            padding: "24px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: "52px",
              fontWeight: 900,
              color: "#E50914",
              marginBottom: "8px",
            }}
          >
            8K+
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#E4E4E7",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            LinkedIn Audience
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#A1A1AA",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Stream my interactive 3D portfolio & AI case studies
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
