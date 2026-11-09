import React from "react";
import { OffthreadVideo, staticFile, useCurrentFrame, interpolate, useVideoConfig } from "remotion";

interface FullSpeakerProps {
  speakerVideoSrc: string;
  startFrom?: number;
  zoom?: number; // e.g. 1.0 (wide) or 1.16 (punch-in)
  panY?: number;  // optional vertical pan shift (in percentage or px)
  kenBurns?: boolean; // slow dramatic drift
  hookTitle?: {
    prefixText: string;
    highlightWord: string;
    suffixText?: string;
  };
}

export const FullSpeaker: React.FC<FullSpeakerProps> = ({
  speakerVideoSrc,
  startFrom = 0,
  zoom = 1,
  panY = 0,
  kenBurns = false,
  hookTitle,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const dynamicScale = kenBurns
    ? interpolate(frame, [0, durationInFrames], [zoom, zoom * 1.05], {
        extrapolateRight: "clamp",
      })
    : zoom;

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
      {/* Video chính tràn viền - Muted vì Audio tổng phát ở root */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${dynamicScale}) translateY(${panY}%)`,
          transformOrigin: "center 42%",
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

      {/* Hook Text lớn mở đầu nếu có */}
      {hookTitle && (
        <div
          style={{
            position: "absolute",
            top: "22%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "88%",
            zIndex: 40,
          }}
        >
          <div
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontSize: "44px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.25,
              textShadow: "0 3px 15px rgba(0,0,0,0.8)",
            }}
          >
            {hookTitle.prefixText}{" "}
            <span
              style={{
                color: "#FFE500",
                fontSize: "56px",
                fontWeight: 900,
                textShadow: "0 0 25px rgba(255, 229, 0, 0.6)",
              }}
            >
              {hookTitle.highlightWord}
            </span>{" "}
            {hookTitle.suffixText}
          </div>
        </div>
      )}
    </div>
  );
};
