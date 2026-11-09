import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";

interface BigNumberCalloutProps {
  number: string;
  title: string;
  subtitle?: string;
  top?: string | number;
  left?: string | number;
}

export const BigNumberCallout: React.FC<BigNumberCalloutProps> = ({
  number,
  title,
  subtitle,
  top = "20%",
  left = "18%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Số to nảy vào mạnh mẽ với độ bật nảy (Elastic Overshoot)
  const numberScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 8,
      stiffness: 130,
      mass: 0.9,
    },
  });

  // 2. Text tiêu đề bay từ trái sang với độ trễ (Staggered Animation)
  const textTranslateX = spring({
    frame: frame - 4,
    fps,
    from: -40,
    to: 0,
    config: {
      damping: 12,
      stiffness: 150,
    },
  });

  const textOpacity = interpolate(frame - 4, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        display: "flex",
        alignItems: "center",
        gap: "20px",
        zIndex: 40,
      }}
    >
      {/* Vòng sáng vàng neon mờ ảo phía sau số */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "20%",
          transform: "translate(-50%, -50%)",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,229,0,0.3) 0%, transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      {/* Số đếm to bản màu vàng chanh 3D phát sáng */}
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Display", Impact, sans-serif',
          fontSize: "175px",
          fontWeight: 900,
          color: "#FFE500",
          fontStyle: "italic",
          lineHeight: 0.85,
          transform: `scale(${numberScale})`,
          transformOrigin: "center center",
          textShadow:
            "0 15px 35px rgba(255, 229, 0, 0.45), 0 4px 10px rgba(0, 0, 0, 0.6)",
          userSelect: "none",
        }}
      >
        {number}
      </div>

      {/* Cụm văn bản đi kèm nảy vào sau */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          transform: `translateX(${textTranslateX}px)`,
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            fontSize: "44px",
            fontWeight: 800,
            color: "#ffffff",
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </span>
        {subtitle && (
          <span
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontSize: "34px",
              fontWeight: 700,
              color: "#FFE500",
              textShadow: "0 2px 10px rgba(0,0,0,0.9)",
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
