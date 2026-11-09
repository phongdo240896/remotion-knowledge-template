import React from "react";
import { Audio, staticFile, useCurrentFrame, interpolate } from "remotion";

interface BackgroundMusicProps {
  src?: string;
  volume?: number;
  totalDurationInFrames?: number;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  src = "audio/bgm-ambient.wav",
  volume = 0.12,
  totalDurationInFrames = 300,
}) => {
  const frame = useCurrentFrame();

  // Fade in first 15 frames, fade out last 30 frames
  const fadeVolume = interpolate(
    frame,
    [0, 15, totalDurationInFrames - 30, totalDurationInFrames],
    [0, volume, volume, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <Audio
      src={staticFile(src)}
      volume={fadeVolume}
      loop
    />
  );
};
