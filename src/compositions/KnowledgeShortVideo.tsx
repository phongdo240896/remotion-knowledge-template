import React from "react";
import { Series, useCurrentFrame, Audio, staticFile } from "remotion";
import { VideoConfig } from "../config/videoSchema";
import { FullSpeaker } from "../components/layouts/FullSpeaker";
import { CardSpeaker } from "../components/layouts/CardSpeaker";
import { SplitView } from "../components/layouts/SplitView";
import { PipCircle } from "../components/layouts/PipCircle";
import { BigNumberCallout } from "../components/ui/BigNumberCallout";
import { MemeOverlay } from "../components/ui/MemeOverlay";
import { OutroBranding } from "../components/ui/OutroBranding";
import { SubtitleTrack } from "../components/ui/SubtitleTrack";
import { HeadlineCallout } from "../components/ui/HeadlineCallout";
import { DoodleArrow } from "../components/ui/DoodleArrow";
import { SoundEffects } from "../components/audio/SoundEffects";
import { BackgroundMusic } from "../components/audio/BackgroundMusic";

export const KnowledgeShortVideo: React.FC<VideoConfig> = ({
  speakerVideoSrc,
  bgm,
  headlineCallouts = [],
  scenes,
  subtitles,
}) => {
  const currentFrame = useCurrentFrame();

  // Tính toán thời điểm bắt đầu (startFrame) của từng scene để video chạy liên tục
  let accumulated = 0;
  const computedScenes = scenes.map((s) => {
    const start = accumulated;
    accumulated += s.durationInFrames;
    return { ...s, startFrame: start };
  });

  const totalFrames = accumulated;

  // Xác định scene đang hiển thị tại frame hiện tại
  const activeScene = computedScenes.find(
    (s) =>
      currentFrame >= s.startFrame &&
      currentFrame < s.startFrame + s.durationInFrames
  );
  const currentLayoutMode = activeScene?.mode || "full_speaker";

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
      {/* 1. Audio Master của người nói: Chạy mượt mà xuyên suốt từ đầu tới cuối, không cắt vụn */}
      <Audio
        src={
          speakerVideoSrc.startsWith("http")
            ? speakerVideoSrc
            : staticFile(speakerVideoSrc)
        }
        volume={1}
      />

      {/* 2. Nhạc nền nếu được bật (mặc định chỉ dùng khi video quay thô chưa có nhạc) */}
      {bgm && (
        <BackgroundMusic
          src={bgm.src}
          volume={bgm.volume}
          totalDurationInFrames={totalFrames}
        />
      )}

      {/* 3. Dòng thời gian các Scene hình ảnh */}
      <Series>
        {computedScenes.map((scene) => (
          <Series.Sequence
            key={scene.id}
            durationInFrames={scene.durationInFrames}
          >
            {/* Hiệu ứng âm thanh khi bắt đầu cảnh (nếu có) */}
            {scene.sfx && <SoundEffects type={scene.sfx} />}

            {/* Mũi tên vẽ tay doodle nếu có trong scene */}
            {scene.doodleArrow && (
              <DoodleArrow
                top={scene.doodleArrow.top}
                left={scene.doodleArrow.left}
                right={scene.doodleArrow.right}
                bottom={scene.doodleArrow.bottom}
                rotation={scene.doodleArrow.rotation}
                scale={scene.doodleArrow.scale}
                flipX={scene.doodleArrow.flipX}
                color={scene.doodleArrow.color}
              />
            )}

            {/* Render Layout tương ứng, video đồng bộ chính xác theo startFrame */}
            {scene.mode === "full_speaker" && (
              <FullSpeaker
                speakerVideoSrc={speakerVideoSrc}
                startFrom={scene.startFrame}
                zoom={scene.zoom}
                kenBurns={scene.kenBurns}
                hookTitle={scene.hookTitle}
              />
            )}

            {scene.mode === "card_speaker" && (
              <CardSpeaker
                speakerVideoSrc={speakerVideoSrc}
                startFrom={scene.startFrame}
              />
            )}

            {scene.mode === "split_view" && (
              <SplitView
                speakerVideoSrc={speakerVideoSrc}
                startFrom={scene.startFrame}
                promptText={scene.splitView?.promptText}
                promptHighlight={scene.splitView?.promptHighlight}
                mediaSrc={scene.splitView?.mediaSrc}
              />
            )}

            {scene.mode === "pip_circle" && scene.pipBroll && (
              <PipCircle
                speakerVideoSrc={speakerVideoSrc}
                startFrom={scene.startFrame}
                brollSrc={scene.pipBroll.brollSrc}
                kenBurns={scene.pipBroll.kenBurns}
                circleSize={scene.pipBroll.circleSize}
                circleBottom={scene.pipBroll.circleBottom}
                calloutBadge={scene.pipBroll.calloutBadge}
              />
            )}

            {scene.mode === "big_number" && (
              <>
                <FullSpeaker
                  speakerVideoSrc={speakerVideoSrc}
                  startFrom={scene.startFrame}
                />
                {scene.bigNumber && (
                  <BigNumberCallout
                    number={scene.bigNumber.number}
                    title={scene.bigNumber.title}
                    subtitle={scene.bigNumber.subtitle}
                    top={scene.bigNumber.top}
                    left={scene.bigNumber.left}
                  />
                )}
              </>
            )}

            {/* Sticker Meme ngắt nhịp (nếu có) */}
            {scene.memeOverlay && (
              <MemeOverlay imageSrc={scene.memeOverlay.imageSrc} />
            )}

            {/* Outro thương hiệu & CTA (nếu có) */}
            {scene.outro && (
              <OutroBranding
                brandTitle={scene.outro.brandTitle}
                authorTag={scene.outro.authorTag}
                ctaText={scene.outro.ctaText}
              />
            )}
          </Series.Sequence>
        ))}
      </Series>

      {/* 4. Lớp phụ đề nổi thông minh: Tự đổi vị trí theo layout để không bao giờ bị đè */}
      <SubtitleTrack
        currentFrame={currentFrame}
        subtitles={subtitles}
        layoutMode={currentLayoutMode}
      />

      {/* 5. Cụm chữ Headline / Hook chủ đề lớn (ví dụ: những yếu tố quyết định) */}
      {headlineCallouts.map((item) => {
        if (currentFrame >= item.startFrame && currentFrame < item.endFrame) {
          return (
            <HeadlineCallout
              key={item.id}
              topText={item.topText}
              highlightText={item.highlightText}
              highlightColor={item.highlightColor}
              topPosition={item.topPosition || "28%"}
            />
          );
        }
        return null;
      })}
    </div>
  );
};
