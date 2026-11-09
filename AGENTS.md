# AGENTS.md - Instructions for Codex, Copilot, & AI Coding Assistants

## Project Overview
This repository (`knowledge-video-template`) is a programmatic vertical short video (TikTok / Reels / YouTube Shorts) generator built with [Remotion](https://www.remotion.dev).

It produces aesthetic **Knowledge-Sharing & AI Tech Tutorial** videos (similar to high-end tech creator styles) with fast pacing, kinetic subtitles, multi-scene layouts, and spring physics.

---

## Remotion Short Video Editing Skill & Guidelines

### 1. Pacing & Editing DNA
- **2-3 Second Rule:** Trigger a visual cut, zoom change, or layout shift every 2.0 to 3.5 seconds.
- **Punch-in Zoom:** Alternate speaker between 1.0x wide and 1.16x-1.20x close-up (`zoom: 1.16` in `full_speaker`).
- **Sound Effects (SFX):** Sync SFX on transitions (`whoosh`), popup PiP (`pop`), code/document reveal (`click`), big number hits (`thud`).

### 2. Layout Modes (in `src/config/videoSchema.ts`)
1. `full_speaker`: Fullscreen speaker with optional `zoom` (1.0x - 1.2x), `doodleArrow` (animated yellow pointer), and `hookTitle`.
2. `card_speaker`: Smoothly shrinks fullscreen speaker into a rounded 44px card over light gradient background.
3. `split_view`: Top card = Dark mode Code/Prompt editor; Bottom card = Rounded speaker video pointing upward.
4. `pip_circle`: Fullscreen macro B-Roll with Ken Burns slow drift + bottom floating circular PiP of speaker.
5. `big_number`: Giant 3D extruded yellow numeral with title and subtitle for numbered points.

### 3. Typography & Subtitles
- Text style: Modern clean sans-serif (SF Pro Display / Montserrat / Lexend).
- Default text: White `#FFFFFF` with drop shadow.
- Highlight words: Vivid yellow `#FFE500` with glow, bold `fontWeight: 900`, scale `1.05`.
- Layout safe zones: Subtitles automatically adjust vertical position based on active scene layout.

### 4. Available Commands
```bash
# Preview in Remotion Studio (interactive browser canvas)
npm start

# Quick 5-second render (0-150 frames)
npm run render:quick

# Render single still frame for testing
npx remotion still src/index.ts KnowledgeShort out/test.png --frame=85

# Full video production render (MP4)
npm run build
```
