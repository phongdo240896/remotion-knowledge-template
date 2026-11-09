import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";

interface OutroBrandingProps {
  brandTitle?: string;
  authorTag?: string;
  ctaText?: string;
}

export const OutroBranding: React.FC<OutroBrandingProps> = ({
  brandTitle = "AI MEDIA MASTERY",
  authorTag = "BY iamhhieu",
  ctaText,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 12,
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "14%",
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${scale})`,
        zIndex: 50,
      }}
    >
      {/* Header Banner thương hiệu phát sáng */}
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          fontSize: "44px",
          fontWeight: 900,
          color: "#ffffff",
          letterSpacing: "0.08em",
          textAlign: "center",
          textShadow:
            "0 0 20px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.3)",
        }}
      >
        {brandTitle}
      </div>

      {/* Tag Author */}
      <div
        style={{
          marginTop: "12px",
          backgroundColor: "#ff3366",
          color: "#ffffff",
          padding: "6px 20px",
          borderRadius: "18px",
          fontSize: "20px",
          fontWeight: 800,
          letterSpacing: "0.05em",
          boxShadow: "0 4px 15px rgba(255, 51, 102, 0.4)",
        }}
      >
        {authorTag}
      </div>
    </div>
  );
};
