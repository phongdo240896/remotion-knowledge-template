import React from "react";
import {
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
  useVideoConfig,
} from "remotion";

interface CardSpeakerProps {
  speakerVideoSrc: string;
  startFrom?: number;
}

export const CardSpeaker: React.FC<CardSpeakerProps> = ({
  speakerVideoSrc,
  startFrom = 0,
}) => {
  const frame = useCurrentFrame();
  const { width: screenWidth, height: screenHeight } = useVideoConfig();

  // THỜI LƯỢNG CHUYỂN CẢNH TỪ TOÀN MÀN HÌNH CO VÀO THẺ (16 frames ~ 0.5s)
  const transitionFrames = 18;

  // 1. Độ bo góc: 0px (tràn viền) -> 44px (thẻ mềm mại)
  const borderRadius = interpolate(frame, [0, transitionFrames], [0, 44], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // 2. Chiều rộng: 720px -> 560px
  const cardWidth = interpolate(frame, [0, transitionFrames], [screenWidth, 560], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // 3. Chiều cao: 1280px -> 440px
  const cardHeight = interpolate(frame, [0, transitionFrames], [screenHeight, 440], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // 4. Khoảng cách đáy: 0px -> 160px
  const paddingBottom = interpolate(frame, [0, transitionFrames], [0, 160], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // 5. Nền gradient xám sáng hiện dần lên
  const bgOpacity = interpolate(frame, [0, transitionFrames], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 6. Đổ bóng thẻ mềm dần khi co nhỏ
  const shadowOpacity = interpolate(frame, [0, transitionFrames], [0, 0.22], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: `${paddingBottom}px`,
        overflow: "hidden",
      }}
    >
      {/* Nền gradient xám sáng nhẹ hiện lên phía sau */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(180deg, #d8dee3 0%, #f4f6f8 100%)",
          opacity: bgOpacity,
          zIndex: 1,
        }}
      />

      {/* Thẻ người nói: Tự động co nhỏ mượt mà từ full màn hình thành Card bo góc */}
      <div
        style={{
          position: "relative",
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
          borderRadius: `${borderRadius}px`,
          overflow: "hidden",
          boxShadow: `0 30px 60px rgba(0, 0, 0, ${shadowOpacity})`,
          backgroundColor: "#111",
          zIndex: 2,
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
