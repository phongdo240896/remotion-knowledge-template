---
name: remotion-short-editor
description: >-
  Chuyên gia dựng video ngắn (TikTok, Reels, YouTube Shorts) dạng Aesthetic Knowledge-Sharing / AI Tech Tutorial
  bằng Remotion. Áp dụng chuẩn phong cách: cắt nhịp nhanh (jump-cut / punch-in zoom mỗi 2-3s), phụ đề font mỏng
  hiện đại highlight vàng neon, layout chuyển cảnh đa dạng (Full Speaker, Card Speaker, Split View Prompt,
  B-Roll với bong bóng tròn PiP, số đếm 3D khổng lồ, Doodle Arrow vẽ tay) và âm thanh sống động (SFX whoosh/pop/thud).
---

# Remotion Short Video Editor Skill (Aesthetic Knowledge & Tech Style)

Skill này hướng dẫn chi tiết quy trình dựng video ngắn định dạng dọc (9:16) theo phong cách **Aesthetic Knowledge-Sharing / AI Tutorial** chuyên nghiệp như các kênh công nghệ cao cấp (nhân vật chia sẻ kiến thức, prompt AI, B-Roll phóng to vi mô, layout thẻ hiện đại).

---

## 1. Bản sắc thị giác & Ngôn ngữ dựng (Design System & Editing DNA)

### 1.1. Cắt cảnh & Nhịp độ (Pacing & Cutting)
* **Quy tắc 2 - 3 giây:** Cứ sau mỗi 2.0 đến 3.5 giây phải có một thay đổi thị giác (Zoom cut, chuyển layout, hoặc xuất hiện đồ họa/chữ mới) để giữ chân người xem tối đa.
* **Cắt gọt khoảng lặng:** Loại bỏ hoàn toàn tạp âm, tiếng ngập ngừng ("ờ", "à"), các đoạn thở dài giữa các câu nói để nhịp video dồn dập, thông tin liên tục.
* **Cắt nhảy góc quay (Jump-cut / Zoom Punch-In):** Xen kẽ giữa góc trung (scale 1.0x) và góc cận cận cảnh (punch-in zoom 1.15x - 1.20x) giữa các câu nói của người nói để tạo năng lượng thị giác mà không cần 2 máy quay.

### 1.2. Hệ thống Layout linh hoạt (Multi-Scene Layouts)
| Mode Layout | Ý nghĩa & Thời điểm dùng | Hiệu ứng thị giác đi kèm |
| :--- | :--- | :--- |
| `full_speaker` | Mở đầu (Hook) hoặc kết luận (CTA) | Video tràn viền, hỗ trợ Hook Title lớn và Zoom Punch-In |
| `card_speaker` | Chuyển tiếp mượt mà từ toàn màn hình sang thẻ | Toàn màn hình co nhỏ mượt mà thành thẻ bo góc (`44px`) trên nền sáng gradient |
| `split_view` | Giảng giải tài liệu, prompt AI, code | Nửa trên: Thẻ Code/Prompt Dark Mode bo tròn; Nửa dưới: Thẻ người nói bo góc |
| `pip_circle` | B-Roll minh họa chi tiết (da, tóc, ánh sáng, mắt) | B-Roll toàn màn hình chuyển động Ken Burns chậm; Người nói thu vào **bong bóng tròn PiP** ở góc dưới |
| `big_number` | Liệt kê các luận điểm chính (Số 1, 2, 3...) | Chữ số 3D khổng lồ màu vàng chanh nghiêng nảy vào (Elastic spring) + Tiêu đề phụ |

### 1.3. Phụ đề & Typography (Subtitles & Fonts)
* **Font chữ:** Sans-serif hình học, hiện đại, sắc nét (SF Pro Display, Montserrat, Lexend, hoặc Be Vietnam Pro).
* **Màu sắc nhận diện:**
  * Chữ thân bài: Trắng tinh (`#FFFFFF`) có đổ bóng mềm (`textShadow: 0 3px 12px rgba(0,0,0,0.85)`).
  * Từ khóa nhấn mạnh (Highlight Keywords): Vàng neon (`#FFE500` hoặc `#FFDD00`), in đậm (`fontWeight: 900`), kích thước nở nhẹ (`scale: 1.05`), phát sáng nhẹ (`0 0 18px rgba(255,229,0,0.7)`).
* **Định vị thông minh theo Safe Zones:**
  * Khi ở `full_speaker`: Nằm ở 1/3 trên (ngang ngực/cổ người nói, `bottom: 140px` hoặc `top: 25%`).
  * Khi ở `split_view`: Nằm chính xác vào khe hở trống giữa thẻ trên và thẻ dưới (`bottom: 590px`), chữ đổi sang màu tối (`#1a2a30`).
  * Khi ở `pip_circle`: Nằm ở khoảng trống phía trên bong bóng tròn PiP (`bottom: 470px`), không đè lên mặt người nói hay chi tiết B-Roll.

### 1.4. Đồ họa & Chuyển động (Motion & Overlays)
* **Doodle Arrow:** Mũi tên vẽ tay vàng hoạt họa (vẽ stroke nét tay) chỉ thẳng vào đối tượng cần nhấn mạnh.
* **Spring Physics:** Tất cả phần tử xuất hiện đều dùng lò xo vật lý (`spring` của Remotion) với độ bật nảy nhẹ (`damping: 10 - 14`, `stiffness: 120 - 160`), không dùng linear đơn điệu.
* **Ken Burns B-Roll:** Ảnh hoặc video B-roll luôn zoom từ từ (`1.0x -> 1.09x`) tạo cảm giác điện ảnh.

### 1.5. Thiết kế âm thanh (Sound Design)
* **Audio Master:** Tiếng nói của diễn giả chạy xuyên suốt, không bị ngắt vụn hay lệch pha hình/tiếng.
* **SFX đúng nhịp:**
  * `whoosh`: Khi chuyển scene hoặc xuất hiện thẻ mới.
  * `pop`: Khi bong bóng tròn PiP hoặc sticker nảy lên.
  * `click`: Khi tráo tài liệu hoặc prompt card trượt xuống.
  * `thud`: Khi số đếm 3D khổng lồ dậm xuống màn hình.

---

## 2. Cấu trúc Dự án Remotion chuẩn

```text
knowledge-video-template/
├── public/
│   ├── assets/               # Chứa video diễn giả, B-roll, ảnh minh họa
│   │   ├── sample_speaker.mp4
│   │   ├── broll1.jpg
│   │   └── broll2.jpg
│   ├── audio/                # Nhạc nền (BGM)
│   └── sfx/                  # Âm thanh chuyển cảnh (whoosh, pop, click, thud)
├── src/
│   ├── components/
│   │   ├── layouts/
│   │   │   ├── FullSpeaker.tsx       # Người nói full viền + Punch-in Zoom
│   │   │   ├── CardSpeaker.tsx       # Co nhỏ thành card bo góc 44px
│   │   │   ├── SplitView.tsx         # Chia nửa: Prompt Card + Speaker Card
│   │   │   └── PipCircle.tsx         # B-Roll nền + Bong bóng tròn PiP
│   │   ├── ui/
│   │   │   ├── SubtitleTrack.tsx     # Phụ đề pop-up tự canh safe zone + highlight vàng
│   │   │   ├── HeadlineCallout.tsx   # Hook tiêu đề lớn 2 dòng
│   │   │   ├── BigNumberCallout.tsx  # Số đếm 3D khổng lồ
│   │   │   ├── DoodleArrow.tsx       # Mũi tên vẽ tay hoạt họa vàng
│   │   │   ├── PromptCard.tsx        # Thẻ Dark Mode Prompt Code
│   │   │   ├── MemeOverlay.tsx       # Sticker meme ngắt nhịp
│   │   │   └── OutroBranding.tsx     # Thẻ thương hiệu kết thúc & CTA
│   │   └── audio/
│   │       ├── BackgroundMusic.tsx   # Nhạc nền tự hạ âm
│   │       └── SoundEffects.tsx      # Tự phát SFX theo scene
│   ├── config/
│   │   ├── videoSchema.ts            # Định nghĩa kiểu dữ liệu TypeScript
│   │   └── sampleVideoData.ts        # Kịch bản dòng thời gian và phụ đề
│   ├── compositions/
│   │   └── KnowledgeShortVideo.tsx   # Composition chính kết nối các cảnh
│   ├── Root.tsx                      # Khai báo Composition với Remotion
│   └── index.ts                      # Entry point
```

---

## 3. Quy trình từng bước tạo video mới (Step-by-Step Workflow)

### Bước 1: Chuẩn bị tài nguyên
1. Quay video người nói (tỉ lệ 9:16, 720x1280 hoặc 1080x1920, 30fps).
2. Đặt file video vào `public/assets/` (ví dụ: `my_video.mp4`).
3. Chuẩn bị 2 - 4 ảnh hoặc video B-roll minh họa cho các luận điểm, đặt vào `public/assets/`.

### Bước 2: Cấu hình Kịch bản (`videoData.ts`)
Tạo hoặc sửa file cấu hình kế thừa từ `VideoConfig`:
```typescript
import { VideoConfig } from "./videoSchema";

export const myVideoData: VideoConfig = {
  fps: 30,
  width: 720,
  height: 1280,
  speakerVideoSrc: "assets/my_video.mp4",

  // 1. Phụ đề Hook lớn mở đầu
  headlineCallouts: [
    {
      id: "hook-1",
      topText: "bí mật tạo",
      highlightText: "AI CLONE",
      startFrame: 0,
      endFrame: 45,
    },
  ],

  // 2. Phân chia Scene theo nhịp 2-3s
  scenes: [
    // 0s - 2.5s: Hook toàn màn hình
    {
      id: "sc-1",
      mode: "full_speaker",
      durationInFrames: 75,
      zoom: 1.0,
      sfx: "whoosh",
    },
    // 2.5s - 5.0s: Punch-in zoom cận cảnh + Mũi tên Doodle chỉ vào mặt
    {
      id: "sc-2",
      mode: "full_speaker",
      durationInFrames: 75,
      zoom: 1.18,
      doodleArrow: {
        top: "18%",
        right: "22%",
        rotation: 15,
      },
    },
    // 5.0s - 8.0s: Chuyển sang Split View hiển thị prompt
    {
      id: "sc-3",
      mode: "split_view",
      durationInFrames: 90,
      sfx: "click",
      splitView: {
        promptText: "Face lock: 8k resolution, raw skin pores, hyperrealistic lighting...",
        promptHighlight: ["Face", "lock:", "raw", "skin"],
        mediaSrc: "assets/broll1.jpg",
      },
    },
    // 8.0s - 14.0s: B-Roll vi mô + Bong bóng tròn PiP diễn giả
    {
      id: "sc-4",
      mode: "pip_circle",
      durationInFrames: 180,
      sfx: "pop",
      pipBroll: {
        brollSrc: "assets/broll1.jpg",
        kenBurns: true,
        circleSize: 240,
        circleBottom: 190,
        calloutBadge: {
          title: "làn da thật",
          subtitle: "(skin texture)",
        },
      },
    },
    // 14.0s - 18.0s: Số 3D khổng lồ
    {
      id: "sc-5",
      mode: "big_number",
      durationInFrames: 120,
      sfx: "thud",
      bigNumber: {
        number: "2",
        title: "đôi mắt",
        subtitle: "(eye reflection)",
      },
    },
    // Kết thúc: Outro CTA
    {
      id: "sc-6",
      mode: "full_speaker",
      durationInFrames: 120,
      sfx: "whoosh",
      outro: {
        brandTitle: "AI STUDIO",
        authorTag: "BY PHONG DO",
        ctaText: "nhấp vào link bên dưới",
      },
    },
  ],

  // 3. Phụ đề đồng bộ chính xác từng câu & highlight từ khóa
  subtitles: [
    {
      id: "s-1",
      text: "bạn muốn tạo nhân vật AI thật như người?",
      highlightWords: ["AI", "thật"],
      startFrame: 0,
      endFrame: 75,
    },
    // ...
  ],
};
```

### Bước 3: Xem trước tương tác bằng Remotion Studio
Mở giao diện xem trước trực tiếp trên trình duyệt, kéo tua timeline từng frame:
```bash
cd knowledge-video-template
npm start
# Trình duyệt tự mở http://localhost:3000
```

### Bước 4: Xuất Video chất lượng cao (Render MP4)
Xuất video hoàn chỉnh với GPU acceleration:
```bash
cd knowledge-video-template
npm run build
# Video xuất ra tại: out/video.mp4
```

Hoặc xuất thử nhanh 1 frame bất kỳ để kiểm tra màu sắc & bố cục:
```bash
npx remotion still src/index.ts KnowledgeShort out/frame_test.png --frame=85
```

---

## 4. Bảng thông số kỹ thuật chuẩn (Cheatsheet)

| Yếu tố | Thông số khuyến nghị | Ghi chú |
| :--- | :--- | :--- |
| **Độ phân giải** | `720 x 1280` (nhẹ, render siêu nhanh) hoặc `1080 x 1920` (Full HD) | Tỉ lệ 9:16 dọc |
| **Tốc độ khung hình (FPS)** | `30 fps` | Chuẩn mượt mà trên TikTok / Reels / Shorts |
| **Punch-in Zoom** | `1.15x` đến `1.22x` | Đặt `transformOrigin: "center 42%"` để giữ mặt trung tâm |
| **Màu Highlight** | `#FFE500` (Vàng chanh neon) | Tương phản tốt nhất trên cả nền đen lẫn nền sáng |
| **Độ bo góc thẻ (Border Radius)** | `40px - 48px` | Tạo độ mềm mại hiện đại phong cách Apple / iOS UI |
| **Vật lý lò xo (Spring)** | `damping: 12, stiffness: 140, mass: 0.8` | Độ nảy snappy tự nhiên, không bị giật rung |
