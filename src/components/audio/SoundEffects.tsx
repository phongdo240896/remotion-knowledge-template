import React from "react";
import { Audio, staticFile } from "remotion";

interface SoundEffectsProps {
  type?: "whoosh" | "pop" | "click" | "thud";
  volume?: number;
}

export const SoundEffects: React.FC<SoundEffectsProps> = ({
  type = "whoosh",
  volume = 0.5,
}) => {
  if (!type) return null;

  return (
    <Audio
      src={staticFile(`sfx/${type}.wav`)}
      volume={volume}
    />
  );
};
