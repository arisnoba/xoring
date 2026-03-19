# XORing — Landing Page

World's first social smart ring. Product landing page built with Next.js + Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Static Export)
- **UI**: React 19 + Tailwind CSS v4
- **Animation**: GSAP 3 + ScrollTrigger
- **Carousel**: Swiper 12
- **Styling**: Tailwind utilities (반응형) + SCSS (커스텀)
- **Font**: Pretendard
- **Deploy**: 정적 호스팅 (`out/`) / 테스트 Vercel

## Getting Started

```bash
npm install
npm run dev       # localhost:3000
```

## Build & Deploy

```bash
npm run build     # Generates out/ for static hosting
```

`out/` 디렉토리를 웹 호스팅 서버에 업로드하거나 Vercel로 배포.

## Project Structure

```text
src/
├── app/
│   ├── page.tsx          # Section assembly
│   ├── layout.tsx        # Root layout + font
│   └── globals.scss      # Tailwind import + global styles
├── components/           # One file per section
├── styles/
│   ├── _variables.scss   # CSS/SCSS variables
│   └── components/       # Component-specific SCSS
└── lib/
    └── utils.ts          # cn() utility
design/                   # Design reference images (not deployed)
public/
└── images/               # Section assets
```

## Design Reference

디자인 스틸 컷은 `design/` 폴더 참고.

- `section - hero 1.jpg` / `section - hero 2.jpg` — Hero
- `section - 01.jpg` ~ `section - 09.jpg` — Body sections
- `footer.jpg` — Footer
- `XORING_full.jpg` — Full page overview
