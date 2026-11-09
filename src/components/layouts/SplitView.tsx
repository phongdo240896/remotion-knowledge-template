import React from "react";
import { OffthreadVideo, staticFile, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { PromptCard } from "../ui/PromptCard";

interface SplitViewProps {
  speakerVideoSrc: string;
  startFrom?: number;
  promptText?: string;
  promptHighlight?: string[];
  mediaSrc?: string;
}

export const SplitView: React.FC<SplitViewProps> = ({
  speakerVideoSrc,
  startFrom = 0,
  promptText,
  promptHighlight,
  mediaSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Thẻ người nói dưới nảy nhẹ vào vị trí
  const bottomCardScale = spring({
    frame,
    fps,
    from: 0.94,
    to: 1,
    config: { damping: 14 },
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, #d8dee3 0%, #f4f6f8 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "120px",
        paddingBottom: "140px",
        overflow: "hidden",
      }}
    >
      {/* Nửa trên: Thẻ Prompt Code + Ảnh đối chiếu */}
      <PromptCard
        promptText={promptText}
        highlightWords={promptHighlight}
        mediaSrc={mediaSrc ? staticFile(mediaSrc) : undefined}
      />

      {/* Nửa dưới: Thẻ người nói bo góc */}
      <div
        style={{
          width: "560px",
          height: "420px",
          borderRadius: "44px",
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.22)",
          backgroundColor: "#111",
          transform: `scale(${bottomCardScale})`,
          zIndex: 5,
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
