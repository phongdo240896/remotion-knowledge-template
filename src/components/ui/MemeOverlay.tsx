import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";

interface MemeOverlayProps {
  imageSrc: string;
}

export const MemeOverlay: React.FC<MemeOverlayProps> = ({ imageSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 160,
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "58%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        overflow: "hidden",
        boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
        border: "3px solid #ffffff",
        zIndex: 60,
      }}
    >
      <img
        src={imageSrc}
        alt="meme"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};
