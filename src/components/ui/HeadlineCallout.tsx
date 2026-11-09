import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";

export interface HeadlineCalloutProps {
  topText: string;             // Ví dụ: "những yếu tố"
  highlightText: string;       // Ví dụ: "quyết định"
  highlightColor?: string;     // Mặc định vàng neon: #FFE500
  topPosition?: string;        // Mặc định: "28%"
}

export const HeadlineCallout: React.FC<HeadlineCalloutProps> = ({
  topText,
  highlightText,
  highlightColor = "#FFE500",
  topPosition = "28%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Hiệu ứng nảy vào mượt mà (Elastic Spring Pop-in)
  const scale = spring({
    frame,
    fps,
    from: 0.88,
    to: 1,
    config: {
      damping: 12,
      stiffness: 140,
    },
  });

  const opacity = interpolate(frame, [0, 5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: topPosition,
        left: "48%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 45,
        opacity,
        pointerEvents: "none",
      }}
    >
      {/* Dòng chữ phụ bên trên (những yếu tố) - Canh lệch phải so với chữ quyết định */}
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
          fontSize: "40px",
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
          alignSelf: "flex-end",
          marginRight: "28px",
          marginBottom: "2px",
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.9)",
        }}
      >
        {topText}
      </div>

      {/* Dòng chữ nhấn mạnh to màu vàng phát sáng (quyết định) */}
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
          fontSize: "76px",
          fontWeight: 900,
          color: highlightColor,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          textShadow: `0 0 22px rgba(255, 229, 0, 0.6), 0 4px 15px rgba(0, 0, 0, 0.8)`,
        }}
      >
        {highlightText}
      </div>
    </div>
  );
};
