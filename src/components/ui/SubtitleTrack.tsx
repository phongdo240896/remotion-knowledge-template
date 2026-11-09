import React from "react";
import { SceneMode, SubtitleItem } from "../../config/videoSchema";
import { spring, interpolate } from "remotion";

interface SubtitleTrackProps {
  currentFrame: number;
  subtitles: SubtitleItem[];
  layoutMode?: SceneMode;
  defaultTextColor?: string;
  fontSize?: number;
}

export const SubtitleTrack: React.FC<SubtitleTrackProps> = ({
  currentFrame,
  subtitles,
  layoutMode = "full_speaker",
  defaultTextColor,
  fontSize = 38,
}) => {
  const activeSub = subtitles.find(
    (s) => currentFrame >= s.startFrame && currentFrame < s.endFrame
  );

  if (!activeSub) return null;

  // Tính toán số frame đã trôi qua kể từ khi câu phụ đề này xuất hiện
  const subElapsedFrames = currentFrame - activeSub.startFrame;

  // 1. Hiệu ứng Kinetic Pop-Up: Chữ nảy nhẹ từ dưới lên mỗi khi đổi câu (Pop-in Bounce)
  const translateY = spring({
    frame: subElapsedFrames,
    fps: 30,
    from: 14,
    to: 0,
    config: { damping: 13, stiffness: 160 },
  });

  const opacity = interpolate(subElapsedFrames, [0, 5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // TÍNH TOÁN VÙNG TRỐNG (SAFE ZONES) CHUẨN XÁC THEO TỪNG BỐ CỤC:
  let computedBottom = 140;
  let autoTextColor = "#ffffff";

  switch (layoutMode) {
    case "card_speaker":
      // Nằm ở vùng trống phía trên thẻ người nói
      computedBottom = 590;
      autoTextColor = "#1a2a30";
      break;

    case "split_view":
      // Nằm chuẩn xác vào khe hở trống giữa thẻ trên và thẻ dưới
      computedBottom = 590;
      autoTextColor = "#1a2a30";
      break;

    case "pip_circle":
      // Nằm ở khoảng trống phía trên bong bóng tròn và phía dưới mặt nhân vật B-Roll
      computedBottom = 535;
      autoTextColor = "#ffffff";
      break;

    case "big_number":
      // Số 4 ở góc trên bên trái, phụ đề nằm ở 1/3 dưới
      computedBottom = 140;
      autoTextColor = "#ffffff";
      break;

    case "full_speaker":
    default:
      computedBottom = 140;
      autoTextColor = "#ffffff";
      break;
  }

  const textColor = activeSub.textColor || defaultTextColor || autoTextColor;
  const highlightWords = (activeSub.highlightWords || []).map((w) =>
    w.toLowerCase().trim()
  );

  const words = activeSub.text.split(" ");

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: `${computedBottom}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
        zIndex: 50,
        textAlign: "center",
        transform: `translateY(${translateY}px)`,
        opacity,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontSize: `${fontSize}px`,
          fontWeight: 700,
          lineHeight: 1.35,
          color: textColor,
          letterSpacing: "-0.02em",
          textShadow:
            textColor === "#ffffff"
              ? "0 3px 12px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.95)"
              : "0 1px 2px rgba(255,255,255,0.7)",
        }}
      >
        {words.map((word, idx) => {
          const cleanWord = word
            .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "")
            .toLowerCase()
            .trim();
          const isHighlighted = highlightWords.includes(cleanWord);

          return (
            <span
              key={idx}
              style={{
                color: isHighlighted ? "#FFE500" : textColor,
                fontWeight: isHighlighted ? 900 : 700,
                textShadow: isHighlighted
                  ? "0 0 18px rgba(255, 229, 0, 0.7), 0 2px 5px rgba(0,0,0,0.6)"
                  : undefined,
                marginRight: "8px",
                display: "inline-block",
                transform: isHighlighted ? "scale(1.05)" : "none",
                transition: "transform 0.15s ease",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
