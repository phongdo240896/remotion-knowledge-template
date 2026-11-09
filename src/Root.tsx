import React from "react";
import { Composition } from "remotion";
import { KnowledgeShortVideo } from "./compositions/KnowledgeShortVideo";
import { sampleVideoData } from "./config/sampleVideoData";
import { VideoConfig } from "./config/videoSchema";

export const Root: React.FC = () => {
  const totalFrames = sampleVideoData.scenes.reduce(
    (acc, scene) => acc + scene.durationInFrames,
    0
  );

  return (
    <>
      <Composition
        id="KnowledgeShort"
        component={KnowledgeShortVideo as any}
        durationInFrames={totalFrames}
        fps={sampleVideoData.fps}
        width={sampleVideoData.width}
        height={sampleVideoData.height}
        defaultProps={sampleVideoData as any}
      />
    </>
  );
};
