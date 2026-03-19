<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Rules — XORing

## Mandatory Before Writing Any Code

1. Read `CLAUDE.md` fully — all rules there are non-negotiable.
2. Check `design/` folder images to understand the intended visual output before implementing a section.
3. Run `npm run build` after changes to verify static export succeeds.

## Styling Rules (Strict)

- **반응형 레이아웃은 Tailwind 유틸리티 클래스로만 제어한다.** SCSS에 미디어 쿼리 작성 금지.
- Tailwind로 해결 불가한 스타일만 SCSS로 작성한다 (`src/styles/`).
- 모든 커스텀 색상·폰트·수치는 `src/styles/_variables.scss`에 정의 후 참조.
- 컨테이너 최대 너비 `max-w-[1680px]` 엄수.

## Component Rules

- GSAP, Swiper, `useRef`, `useEffect`, `useState` 사용하는 컴포넌트는 반드시 `"use client"` 선언.
- `next/image` 사용 시 항상 `unoptimized` prop 추가 (정적 배포 필수).
- 조건부 클래스는 `cn()` (`src/lib/utils.ts`) 사용.

## Font

- Pretendard만 사용. Geist 폰트 import 금지.

## Static Export Constraints

- `next.config.ts`에 `output: 'export'` + `images: { unoptimized: true }` 유지.
- Server Actions, Route Handlers, API Routes 사용 불가 (정적 배포 비호환).
- `next/headers`, `cookies()`, `redirect()` 등 서버 전용 API 사용 불가.
