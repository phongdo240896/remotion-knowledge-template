import React from "react";
import {
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  interpolate,
  useVideoConfig,
  spring,
} from "remotion";

interface PipCircleProps {
  speakerVideoSrc: string;
  startFrom?: number;
  brollSrc: string;
  kenBurns?: boolean;
  circleSize?: number;
  circleBottom?: number;
  calloutBadge?: {
    title: string;
    subtitle?: string;
  };
}

export const PipCircle: React.FC<PipCircleProps> = ({
  speakerVideoSrc,
  startFrom = 0,
  brollSrc,
  kenBurns = true,
  circleSize = 240,
  circleBottom = 190,
  calloutBadge,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 1. Hiệu ứng Ken Burns: Camera từ từ zoom sâu vào ảnh B-Roll (1.0 -> 1.09)
  const brollScale = kenBurns
    ? interpolate(frame, [0, durationInFrames], [1, 1.09], {
        extrapolateRight: "clamp",
      })
    : 1;

  // 2. Hiệu ứng Pop-in nảy nổ (Elastic Bounce) cho bong bóng tròn PiP
  const pipScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 10,
      stiffness: 140,
      mass: 0.8,
    },
  });

  // 3. Hiệu ứng viền phát sáng thở nhẹ (Breathing glow)
  const glowOpacity = interpolate(
    Math.sin((frame / 15) * Math.PI),
    [-1, 1],
    [0.25, 0.55]
  );

  const isVideo = brollSrc.endsWith(".mp4") || brollSrc.endsWith(".webm");

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        overflow: "hidden",
      }}
    >
      {/* Lớp nền B-Roll chất lượng cao có chuyển động Ken Burns */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${brollScale})`,
          transformOrigin: "center 40%",
        }}
      >
        {isVideo ? (
          <OffthreadVideo
            src={staticFile(brollSrc)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <img
            src={staticFile(brollSrc)}
            alt="broll"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      {/* Lớp tối viền nhẹ (Vignette) để tôn bong bóng tròn và chữ */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Badge tiêu đề chủ đề (ví dụ: khuôn mặt (face), làn da...) */}
      {calloutBadge && (
        <div
          style={{
            position: "absolute",
            bottom: `${circleBottom + circleSize + 55}px`,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 229, 0, 0.4)",
            borderRadius: "20px",
            padding: "6px 18px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            zIndex: 44,
          }}
        >
          <span
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontSize: "22px",
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            {calloutBadge.title}
          </span>
          {calloutBadge.subtitle && (
            <span
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontSize: "20px",
                fontWeight: 700,
                color: "#FFE500",
              }}
            >
              {calloutBadge.subtitle}
            </span>
          )}
        </div>
      )}

      {/* Bong bóng tròn PiP người nói - Viền vàng phát sáng sang trọng */}
      <div
        style={{
          position: "absolute",
          bottom: `${circleBottom}px`,
          left: "50%",
          transform: `translateX(-50%) scale(${pipScale})`,
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          borderRadius: "50%",
          overflow: "hidden",
          border: "3.5px solid rgba(255, 255, 255, 0.7)",
          boxShadow: `0 20px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 229, 0, ${glowOpacity})`,
          backgroundColor: "#111",
          zIndex: 45,
        }}
      >
        <OffthreadVideo
          src={
            speakerVideoSrc.startsWith("http")
              ? speakerVideoSrc
              : staticFile(speakerVideoSrc)
          }
          startFrom={startFrom}
          volume={0}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};
