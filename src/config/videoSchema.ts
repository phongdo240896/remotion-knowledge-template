export type SceneMode =
  | "full_speaker"
  | "card_speaker"
  | "split_view"
  | "pip_circle"
  | "big_number";

export interface SubtitleItem {
  id: string;
  text: string;
  highlightWords?: string[];
  startFrame: number;
  endFrame: number;
  textColor?: string;
}

export interface SceneItem {
  id: string;
  mode: SceneMode;
  durationInFrames: number;
  sfx?: "whoosh" | "pop" | "click" | "thud";
  
  // Tuỳ chọn zoom punch-in cho người nói (ví dụ 1.0 = chuẩn, 1.16 = cận cảnh punch-in)
  zoom?: number;
  kenBurns?: boolean;

  // Tuỳ chọn mũi tên vẽ tay vàng (Doodle Arrow)
  doodleArrow?: {
    top?: string | number;
    left?: string | number;
    right?: string | number;
    bottom?: string | number;
    rotation?: number;
    scale?: number;
    flipX?: boolean;
    color?: string;
  };

  // Tuỳ chọn cho mode full_speaker (ví dụ Hook mở đầu)
  hookTitle?: {
    prefixText: string;
    highlightWord: string;
    suffixText?: string;
  };

  // Tuỳ chọn cho mode split_view
  splitView?: {
    promptText?: string;
    promptHighlight?: string[];
    mediaSrc?: string;
  };

  // Tuỳ chọn cho mode pip_circle
  pipBroll?: {
    brollSrc: string;
    kenBurns?: boolean;
    circleSize?: number;
    circleBottom?: number;
    calloutBadge?: {
      title: string;
      subtitle?: string;
    };
  };

  // Tuỳ chọn cho mode big_number
  bigNumber?: {
    number: string;
    title: string;
    subtitle?: string;
    top?: string | number;
    left?: string | number;
  };

  // Tuỳ chọn ngắt nhịp Meme
  memeOverlay?: {
    imageSrc: string;
    startOffsetFrame?: number;
    durationFrames?: number;
  };

  // Tuỳ chọn Outro cuối
  outro?: {
    brandTitle: string;
    authorTag: string;
    ctaText: string;
  };
}

export interface HeadlineCalloutItem {
  id: string;
  topText: string;
  highlightText: string;
  highlightColor?: string;
  topPosition?: string;
  startFrame: number;
  endFrame: number;
}

export interface VideoConfig {
  fps: number;
  width: number;
  height: number;
  speakerVideoSrc: string;
  bgm?: {
    src: string;
    volume: number;
  };
  headlineCallouts?: HeadlineCalloutItem[];
  scenes: SceneItem[];
  subtitles: SubtitleItem[];
}
