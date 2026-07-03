import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "x1voice — the phone agent that picks up when your staff can't"

const BARS = [
  { h: 60, c: "#635bff" },
  { h: 130, c: "#635bff" },
  { h: 220, c: "#ffffff" },
  { h: 110, c: "#635bff" },
  { h: 50, c: "#635bff" },
]

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a2540",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {BARS.map((bar, i) => (
            <div
              key={i}
              style={{
                width: 22,
                height: bar.h,
                borderRadius: 11,
                background: bar.c,
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Your phone is ringing.
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#8f9dad",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Nobody can get to it.
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 34,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span style={{ fontWeight: 700 }}>x1voice</span>
            <span style={{ color: "#8f9dad" }}>
              answers, takes the order, sends it to your POS.
            </span>
          </div>
        </div>
      </div>
    ),
    size
  )
}
