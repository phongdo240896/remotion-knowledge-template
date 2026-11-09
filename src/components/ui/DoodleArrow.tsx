import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";

export interface DoodleArrowProps {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  rotation?: number; // degrees
  scale?: number;
  color?: string;
  flipX?: boolean;
}

export const DoodleArrow: React.FC<DoodleArrowProps> = ({
  top,
  left,
  right,
  bottom,
  rotation = 0,
  scale = 1,
  color = "#FFE500",
  flipX = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring pop-in with a lively bounce
  const springScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 10,
      stiffness: 160,
    },
  });

  // Stroke draw-in animation
  const drawProgress = interpolate(frame, [0, 8], [1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        zIndex: 50,
        pointerEvents: "none",
        transform: `rotate(${rotation}deg) scale(${scale * springScale}) ${
          flipX ? "scaleX(-1)" : ""
        }`,
        transformOrigin: "center center",
      }}
    >
      <svg
        width="110"
        height="70"
        viewBox="0 0 110 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))",
        }}
      >
        {/* Curved hand-drawn arrow shaft */}
        <path
          d="M 12 58 C 30 18, 70 8, 96 16"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="140"
          strokeDashoffset={140 * drawProgress}
        />
        {/* Arrowhead top barb */}
        <path
          d="M 76 10 C 86 12, 94 15, 98 17"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="40"
          strokeDashoffset={40 * drawProgress}
        />
        {/* Arrowhead bottom barb */}
        <path
          d="M 90 32 C 94 24, 96 18, 98 17"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="40"
          strokeDashoffset={40 * drawProgress}
        />
      </svg>
    </div>
  );
};
