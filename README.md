# Knowledge Short Video Template (Remotion)

Template dựng video ngắn (TikTok / Reels / YouTube Shorts) chuẩn phong cách **Aesthetic Knowledge-Sharing / AI Tutorial** bằng [Remotion](https://www.remotion.dev/).

---

## 📁 Cấu trúc thư mục

```text
knowledge-video-template/
├── public/                       # Nơi chứa tài nguyên tĩnh
│   ├── assets/                   # Video người nói, ảnh minh họa, B-Roll
│   │   ├── sample_speaker.mp4
│   │   ├── broll1.jpg
│   │   └── broll2.jpg
│   ├── audio/                    # Nhạc nền (BGM)
│   └── sfx/                      # Hiệu ứng âm thanh (whoosh, pop, click, thud)
├── src/
│   ├── compositions/
│   │   └── KnowledgeShortVideo.tsx   # Composition kết hợp các Scene
│   ├── components/
│   │   ├── layouts/
│   │   │   ├── FullSpeaker.tsx       # Người nói toàn màn hình + Hook Text
│   │   │   ├── CardSpeaker.tsx       # Người nói co vào Card vuông bo góc
│   │   │   ├── SplitView.tsx         # Nửa trên Prompt/Tài liệu - Nửa dưới Card
│   │   │   └── PipCircle.tsx         # B-Roll nền + Bong bóng tròn PiP
│   │   ├── ui/
│   │   │   ├── SubtitleTrack.tsx     # Phụ đề chữ nét mỏng + highlight vàng
│   │   │   ├── BigNumberCallout.tsx  # Số đếm 3D to bản
│   │   │   ├── PromptCard.tsx        # Thẻ Dark Mode Prompt Code
│   │   │   ├── MemeOverlay.tsx       # Sticker Meme ngắt nhịp
│   │   │   └── OutroBranding.tsx     # Header thương hiệu & CTA cuối
│   │   └── audio/
│   │       ├── BackgroundMusic.tsx   # Nhạc nền tự hạ âm khi nói
│   │       └── SoundEffects.tsx      # Tự phát SFX chuyển cảnh
│   ├── config/
│   │   ├── videoSchema.ts            # Định dạng dữ liệu (TypeScript)
│   │   └── sampleVideoData.ts        # Kịch bản mẫu (Timeline & Subtitles)
│   ├── Root.tsx
│   └── index.ts
└── package.json
```

---

## 🚀 Cách sử dụng

### 1. Xem trước trực quan (Remotion Studio)
Để mở giao diện kéo tua timeline trực quan trên trình duyệt:
```bash
npm start
# hoặc: npx remotion preview
```

### 2. Xuất video hoàn chỉnh (Render MP4)
```bash
npm run build
# Video xuất ra tại: out/video.mp4
```

### 3. Dựng video mới của bạn
Mỗi khi cần làm video mới:
1. Thả video quay của bạn vào `public/assets/` (ví dụ `my_video.mp4`).
2. Mở file `src/config/sampleVideoData.ts` (hoặc tạo file config mới):
   - Đổi `speakerVideoSrc: "assets/my_video.mp4"`.
   - Điều chỉnh danh sách `scenes` với kiểu layout mong muốn (`full_speaker`, `card_speaker`, `split_view`, `pip_circle`, `big_number`).
   - Cập nhật phụ đề `subtitles` và các từ khóa bôi vàng trong `highlightWords`.
3. Chạy `npm run build` để xuất video!
