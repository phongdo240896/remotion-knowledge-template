import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";

interface PromptCardProps {
  promptText?: string;
  highlightWords?: string[];
  mediaSrc?: string;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  promptText = "Face lock: @Image 1's dark-brown eyes with soft lids, @Image 1's straight soft dark brows sitting just under the fringe, natural skin texture...",
  highlightWords = ["@Image", "1's", "Face", "lock:", "texture"],
  mediaSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hiệu ứng trượt xuống có độ đàn hồi tự nhiên (Spring Physics)
  const translateY = spring({
    frame,
    fps,
    from: -80,
    to: 0,
    config: { damping: 13, stiffness: 110 },
  });

  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Hiệu ứng vẽ highlight màu vàng nảy nhẹ sau 6 frames
  const highlightScale = spring({
    frame: frame - 6,
    fps,
    from: 0.85,
    to: 1,
    config: { damping: 10 },
  });

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "650px",
        height: "430px",
        display: "flex",
        gap: "16px",
        opacity,
        transform: `translateY(${translateY}px)`,
        zIndex: 10,
      }}
    >
      {/* Khung Prompt Dark Mode phong cách Code Editor */}
      <div
        style={{
          flex: 1,
          backgroundColor: "rgba(28, 30, 34, 0.96)",
          borderRadius: "32px",
          padding: "22px",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.28)",
          border: "1.5px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          overflow: "hidden",
        }}
      >
        {/* Header với 3 chấm MacOS + label preset */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ff5f56" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#27c93f" }} />
          </div>
          <span
            style={{
              color: "#8892b0",
              fontSize: "13px",
              fontFamily: 'monospace',
              letterSpacing: "0.05em",
            }}
          >
            ACTIVE REFERENCES
          </span>
        </div>

        {/* Nội dung Prompt có Highlight nảy */}
        <div
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Mono", Menlo, Consolas, monospace',
            fontSize: "14.5px",
            lineHeight: 1.55,
            color: "#c5c9d6",
            overflow: "hidden",
          }}
        >
          {promptText.split(" ").map((w, idx) => {
            const isHighlight = highlightWords.some((h) =>
              w.toLowerCase().includes(h.toLowerCase())
            );
            return (
              <span
                key={idx}
                style={{
                  backgroundColor: isHighlight
                    ? "rgba(255, 229, 0, 0.28)"
                    : "transparent",
                  color: isHighlight ? "#FFE500" : "#c5c9d6",
                  fontWeight: isHighlight ? 800 : 400,
                  padding: isHighlight ? "1px 5px" : "0",
                  borderRadius: "5px",
                  marginRight: "4px",
                  display: "inline-block",
                  transform: isHighlight ? `scale(${highlightScale})` : "none",
                  border: isHighlight ? "1px solid rgba(255, 229, 0, 0.4)" : "none",
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
      </div>

      {/* Ảnh mẫu đối chiếu bên phải */}
      {mediaSrc && (
        <div
          style={{
            width: "42%",
            borderRadius: "32px",
            overflow: "hidden",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.28)",
            border: "1.5px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "#181a1f",
          }}
        >
          <img
            src={mediaSrc}
            alt="prompt reference"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
};
