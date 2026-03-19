# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

XORing is a static product landing page for a social smart ring.

Stack: `next@16.2.0`, `react@19`, `tailwindcss@4`, `gsap@3`, `swiper@12`, `lucide-react`, `clsx`, `tailwind-merge`, `sass`

## Commands

```bash
npm run dev      # Dev server on localhost:3000
npm run build    # Static export build (out/)
npm run lint     # ESLint
```

## Architecture

Single-page landing site. All sections live in `src/components/` as individual Client Components. `src/app/page.tsx` assembles them in order.

### Section Order (per `design/`)

| File | Section |
|------|---------|
| `design/section - hero 1.jpg` | Nav + Hero: XO RING logo + ring 3D product image |
| `design/section - hero 2.jpg` | "Beyond myself, Connecting us." |
| `design/section - 01.jpg` | "Beyond the Screen" |
| `design/section - 02.jpg` | "One ring, Two Modes." |
| `design/section - 03.jpg` | Social Mode: "A connected world at your fingertips" |
| `design/section - 04.jpg` | Private Mode: "Solely focused on you" |
| `design/section - 05.jpg` | "Lifestyle Pacemaker" AI Agent |
| `design/section - 06.jpg` | "Every experience in your hand" |
| `design/section - 07.jpg` | "The Value of Sweat" AIOS/PoC |
| `design/section - 08.jpg` | "A New Identity for the Web3.0 Era" |
| `design/section - 09.jpg` | "The 500 Pioneers" $499 CTA |
| `design/footer.jpg` | Policy & Community Guidelines |

## Rules (Non-Negotiable)

### Layout & Responsive

- **반응형은 Tailwind 유틸리티 클래스로만 제어한다.** 미디어 쿼리를 SCSS에 직접 작성하지 않는다.
- 콘텐츠 컨테이너 최대 너비: `max-w-[1680px] mx-auto`
- 브레이크포인트: `sm(640)` `md(768)` `lg(1024)` `xl(1280)` `2xl(1536)`

### CSS / Styling

- Tailwind 유틸리티로 해결 불가한 커스텀 스타일은 **SCSS**로 작성한다.
- SCSS 파일은 `src/styles/` 에 위치. 컴포넌트별 스타일은 `src/styles/components/`
- `globals.css` → `globals.scss` 로 관리 (Tailwind import 포함)
- CSS 변수는 `src/styles/_variables.scss` 에 정의

### Font

- **Pretendard** 사용. `@fontsource/pretendard` 또는 CDN import.
- Geist 폰트 제거.

### Deployment

- **정적 배포** (`output: 'export'` in `next.config.ts`)
- `npm run build` 결과물: `out/` 디렉토리 → 저가형 웹 호스팅 업로드
- 테스트: Vercel (`vercel --prod`)
- `next/image`의 Image Optimization은 정적 배포에서 미지원 → `unoptimized: true` 설정

## Design System

**Color palette:**

- Dark bg: `#0a0a0a` / `#111` / `#1d1d1f`
- Light bg: `#f5f5f7` / `#e5e5e5`
- Accent blue (Social Mode): `#3d3df5`
- Text on dark: white
- Text on light: `#111`
- Subtext: `#555` / `#8a8a8a`

**Typography:**

- Font: Pretendard
- Display headings: `font-black` (900), `tracking-tight`, `5xl`–`8xl`
- Section badges: uppercase, `tracking-[0.2em]`, `text-xs`–`sm`, `font-bold`

**Component patterns:**

- Section badge: small icon circle + uppercase label (e.g. "SOCIAL MODE")
- Feature cards: `rounded-[24px]`, image top + text bottom, hover shadow
- Carousel: Swiper with `grabCursor`, partial next-slide peek (`slidesPerView: 2.5`)

## GSAP / ScrollTrigger

- Register at module level: `gsap.registerPlugin(ScrollTrigger)`
- All animations in `useEffect` with cleanup (`trigger.kill()`)
- All animation components require `"use client"`

## Key Conventions

- `cn()` utility: `src/lib/utils.ts` — `clsx` + `tailwind-merge`
- Next.js Image: always set `unoptimized` prop (static export requirement)
- No server components with browser APIs (GSAP, Swiper, useRef, useEffect → `"use client"`)
