import { VideoConfig } from "./videoSchema";

export const sampleVideoData: VideoConfig = {
  fps: 30,
  width: 720,
  height: 1280,
  speakerVideoSrc: "assets/sample_speaker.mp4",
  // Cụm chữ Hook Tiêu đề lớn (như trong video gốc: "những yếu tố quyết định")
  headlineCallouts: [
    {
      id: "headline-1",
      topText: "những yếu tố",
      highlightText: "quyết định",
      startFrame: 0,
      endFrame: 38, // 0.0s - 1.25s
      topPosition: "28%",
    },
  ],
  scenes: [
    // Scene 1 (0.0s - 2.5s | 75 frames): Hook mở đầu toàn màn hình
    {
      id: "scene-1-hook",
      mode: "full_speaker",
      durationInFrames: 75,
      zoom: 1.0,
      sfx: "whoosh",
    },

    // Scene 2 (2.5s - 5.0s | 75 frames): Zoom Punch-in + Doodle Arrow vàng chỉ vào AI
    {
      id: "scene-2-ai-arrow",
      mode: "full_speaker",
      durationInFrames: 75,
      zoom: 1.16,
      doodleArrow: {
        top: "17%",
        right: "22%",
        rotation: 18,
        scale: 1.15,
      },
    },

    // Scene 3 (5.0s - 7.5s | 75 frames): Giới thiệu người nói (Full Speaker góc rộng chuẩn)
    {
      id: "scene-3-intro",
      mode: "full_speaker",
      durationInFrames: 75,
      zoom: 1.0,
    },

    // Scene 4 (7.5s - 8.8s | 40 frames): Bắt đầu thu nhỏ vào Thẻ bo góc trên nền gradient sáng
    {
      id: "scene-4-card",
      mode: "card_speaker",
      durationInFrames: 40,
      sfx: "whoosh",
    },

    // Scene 4 (8.8s - 12.8s | 120 frames): Chia màn hình (Split View): Thẻ Prompt trên + Thẻ người nói dưới
    {
      id: "scene-4-split",
      mode: "split_view",
      durationInFrames: 120,
      sfx: "click",
      splitView: {
        promptText:
          "Face lock: @Image 1's dark-brown eyes with soft lids, @Image 1's straight soft dark brows sitting just under the fringe, natural skin texture...",
        promptHighlight: ["@Image", "Face", "lock:", "texture"],
        mediaSrc: "assets/broll1.jpg",
      },
    },

    // Scene 5 (12.8s - 25.5s | 380 frames): B-Roll toàn màn hình (Mặt & Làn da) + Bong bóng tròn PiP
    {
      id: "scene-5-pip-face-skin",
      mode: "pip_circle",
      durationInFrames: 380,
      sfx: "pop",
      pipBroll: {
        brollSrc: "assets/broll1.jpg",
        kenBurns: true,
        circleSize: 230,
        circleBottom: 190,
        calloutBadge: {
          title: "khuôn mặt",
          subtitle: "(face)",
        },
      },
    },

    // Scene 6 (25.5s - 32.5s | 210 frames): B-Roll Mái tóc + Bong bóng tròn PiP
    {
      id: "scene-6-pip-hair",
      mode: "pip_circle",
      durationInFrames: 210,
      pipBroll: {
        brollSrc: "assets/broll2.jpg",
        kenBurns: true,
        circleSize: 230,
        circleBottom: 190,
        calloutBadge: {
          title: "mái tóc",
          subtitle: "(hair)",
        },
      },
    },

    // Scene 7 (32.5s - 42.0s | 285 frames): Nhấn mạnh số to 3D ở góc trên bên trái
    {
      id: "scene-7-bignumber",
      mode: "big_number",
      durationInFrames: 285,
      sfx: "thud",
      bigNumber: {
        number: "4",
        title: "đôi mắt",
        subtitle: "(eyes)",
      },
    },

    // Scene 8 (42.0s - 55.94s | 418 frames): Outro Branding & Kêu gọi hành động (CTA)
    {
      id: "scene-8-outro",
      mode: "full_speaker",
      durationInFrames: 418,
      sfx: "whoosh",
      outro: {
        brandTitle: "AI MEDIA MASTERY",
        authorTag: "BY iamhhieu",
        ctaText: "nhấp vào link bên dưới",
      },
    },
  ],

  // DANH SÁCH PHỤ ĐỀ ĐỒNG BỘ 100% THEO NHỊP VOICE CỦA VIDEO GỐC:
  subtitles: [
    // 0.0s - 2.5s
    {
      id: "sub-1",
      text: "nhân vật của bạn AI nhìn thật",
      highlightWords: ["AI", "nhìn", "thật"],
      startFrame: 0,
      endFrame: 75,
    },
    // 2.5s - 5.0s
    {
      id: "sub-2",
      text: "hay nhìn là biết AI liền?!",
      highlightWords: ["AI", "liền?!"],
      startFrame: 75,
      endFrame: 150,
    },
    // 5.0s - 7.5s
    {
      id: "sub-3",
      text: "mình là Trâm đến từ Magent",
      highlightWords: ["Trâm", "Magent"],
      startFrame: 150,
      endFrame: 225,
    },
    // 7.5s - 8.8s (Đúng đoạn co vào Thẻ - Nằm chính xác vùng trống phía trên thẻ)
    {
      id: "sub-4",
      text: "có bao giờ bạn tự hỏi",
      highlightWords: ["tự", "hỏi"],
      startFrame: 225,
      endFrame: 265,
    },
    // 8.8s - 10.5s (Split View - Nằm ở khoảng giữa 2 thẻ)
    {
      id: "sub-5",
      text: "AI cần đọc được những gì trong prompt",
      highlightWords: ["AI", "prompt"],
      startFrame: 265,
      endFrame: 315,
    },
    // 10.5s - 12.8s (Split View)
    {
      id: "sub-6",
      text: "để tạo ra được nhân vật chân thật như thế này hông?",
      highlightWords: ["nhân", "vật", "chân", "thật"],
      startFrame: 315,
      endFrame: 385,
    },
    // 12.8s - 18.5s (B-Roll mặt - Nằm ngay phía trên bong bóng tròn)
    {
      id: "sub-7",
      text: "khuôn mặt sẽ không đối xứng hay là quá hoàn hảo, đẹp quá nhìn ra AI liền á",
      highlightWords: ["khuôn", "mặt", "AI", "hoàn", "hảo"],
      startFrame: 385,
      endFrame: 555,
    },
    // 18.5s - 25.5s (B-Roll làn da)
    {
      id: "sub-8",
      text: "làn da phải có một chút khuyết điểm và vân da, chứ mịn như sáp là nhìn giả lắm",
      highlightWords: ["làn", "da", "vân", "da", "giả", "lắm"],
      startFrame: 555,
      endFrame: 765,
    },
    // 25.5s - 32.5s (B-Roll mái tóc)
    {
      id: "sub-9",
      text: "mấy sợi tóc con độ dày mỏng và rơi tự nhiên, dính một mảng là sai rồi",
      highlightWords: ["tóc", "con", "tự", "nhiên", "sai"],
      startFrame: 765,
      endFrame: 975,
    },
    // 32.5s - 39.5s (Big Number 4 - Nằm ở dưới, không đè lên số 4)
    {
      id: "sub-10",
      text: "đôi mắt phải có ánh sáng phản chiếu, độ sâu và hướng nhìn hợp lý",
      highlightWords: ["đôi", "mắt", "ánh", "sáng", "hợp", "lý"],
      startFrame: 975,
      endFrame: 1185,
    },
    // 39.5s - 42.0s
    {
      id: "sub-11",
      text: "chứ không nhìn là thấy lé đóoo",
      highlightWords: ["lé", "đóoo"],
      startFrame: 1185,
      endFrame: 1260,
    },
    // 42.0s - 47.0s
    {
      id: "sub-12",
      text: "thật ra còn rất nhiều yếu tố sẽ được chia sẻ kỹ hơn",
      highlightWords: ["yếu", "tố", "kỹ", "hơn"],
      startFrame: 1260,
      endFrame: 1410,
    },
    // 47.0s - 51.0s
    {
      id: "sub-13",
      text: "muốn tìm hiểu kỹ hơn nhắn tin cho tụi mình",
      highlightWords: ["nhắn", "tin"],
      startFrame: 1410,
      endFrame: 1530,
    },
    // 51.0s - 55.94s (CTA cuối cùng)
    {
      id: "sub-14",
      text: "nhấp vào link bên dưới để biết thêm thông tin nhóooo",
      highlightWords: ["bên", "dưới", "link"],
      startFrame: 1530,
      endFrame: 1678,
    },
  ],
};
