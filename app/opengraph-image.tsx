import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DueVisa — Immigration Deadline Tracker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050E0B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "#0a5c4a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="4" width="12" height="1.5" rx="0.75" fill="#C8F562" />
              <rect x="2" y="7.25" width="9" height="1.5" rx="0.75" fill="#C8F562" opacity="0.7" />
              <rect x="2" y="10.5" width="12" height="1.5" rx="0.75" fill="#C8F562" />
            </svg>
          </div>
          <span style={{ fontSize: "28px", fontWeight: 700, color: "#eef5f0", letterSpacing: "-0.5px" }}>
            Due<span style={{ color: "#C8F562" }}>Visa</span>
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#eef5f0",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            marginBottom: "28px",
            maxWidth: "900px",
          }}
        >
          Never miss an immigration deadline again.
        </div>

        {/* Subtext */}
        <div style={{ fontSize: "26px", color: "rgba(238,245,240,0.6)", marginBottom: "52px", maxWidth: "750px", lineHeight: 1.4 }}>
          Track H-1B, EAD, green card, and passport deadlines — automatically.
        </div>

        {/* Pill badges */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["H-1B", "EAD", "F-1 OPT", "Green Card", "Passport"].map((label) => (
            <div
              key={label}
              style={{
                padding: "10px 20px",
                borderRadius: "999px",
                background: "rgba(200,245,98,0.12)",
                border: "1px solid rgba(200,245,98,0.3)",
                color: "#C8F562",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Bottom right URL */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "80px",
            fontSize: "20px",
            color: "rgba(238,245,240,0.35)",
            fontWeight: 500,
          }}
        >
          duevisa.com
        </div>
      </div>
    ),
    { ...size }
  );
}
