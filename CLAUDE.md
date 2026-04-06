# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## gstack

Use `/browse` from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools.

Available skills: `/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/design-consultation`, `/design-shotgun`, `/design-html`, `/review`, `/ship`, `/land-and-deploy`, `/canary`, `/benchmark`, `/browse`, `/connect-chrome`, `/qa`, `/qa-only`, `/design-review`, `/setup-browser-cookies`, `/setup-deploy`, `/retro`, `/investigate`, `/document-release`, `/codex`, `/cso`, `/autoplan`, `/plan-devex-review`, `/devex-review`, `/careful`, `/freeze`, `/guard`, `/unfreeze`, `/gstack-upgrade`, `/learn`

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

<!-- GSD:project-start source:PROJECT.md -->
## Project

**XORing Motion Enhancement**

기존 `XORing` 정적 랜딩 페이지에 일관된 섹션 등장 모션을 추가하는 brownfield 개선 프로젝트다. 현재 동작 중인 히어로 스크롤 scrub, 섹션 구성, 정적 export 배포 방식을 유지하면서, `docs/motion-plan.md`를 기준으로 랜딩 경험의 완성도를 높이는 것이 목표다.

**Core Value:** 기존 랜딩 페이지를 깨뜨리지 않고, 일관되고 세련된 등장 모션을 안전하게 추가한다.

### Constraints

- **Tech stack**: Next.js 16 + React 19 + Tailwind 4 + SCSS + GSAP + Swiper를 유지한다 — 기존 코드와 배포 방식이 이 조합에 맞춰져 있다
- **Deployment**: `output: "export"` 정적 배포를 유지한다 — 현재 호스팅 전략과 `next/image` 설정이 이 제약에 묶여 있다
- **Compatibility**: 기존 `HeroSection` scrub, `Header` 테마 동기화, `ModeCardCarousel` 동작을 깨뜨리면 안 된다 — 현재 사용자 경험의 핵심 동작이다
- **Architecture**: 가능한 한 서버 컴포넌트를 유지한다 — reveal 추가만으로 섹션 전체를 클라이언트로 승격시키는 비용을 피해야 한다
- **Accessibility**: reduced motion 사용자는 애니메이션 없이 즉시 콘텐츠를 봐야 한다 — 가독성과 접근성 저하를 막기 위한 필수 조건이다
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5 - application code in `src/app/*.ts`, `src/app/*.tsx`, `src/components/**/*.tsx`, `src/lib/*.ts`, configured by `tsconfig.json`
- SCSS - global theme, typography, and component overrides in `src/app/globals.scss` and `src/styles/**/*.scss`
- CSS - Tailwind import layer and theme tokens in `src/app/globals.css`
## Runtime
- Node.js v23.6.1 - current local runtime observed via `node -v`; repository-level version pinning was not detected in `.nvmrc` or `.tool-versions`
- npm 11.10.0 - current local package manager observed via `npm -v`
- Lockfile: present in `package-lock.json`
## Frameworks
- Next.js 16.2.1 - App Router application and static export build in `package.json`, `src/app/layout.tsx`, `src/app/page.tsx`, `next.config.ts`
- React 19.2.4 - component runtime for all UI modules in `package.json` and `src/components/**/*.tsx`
- Tailwind CSS 4 - utility styling pipeline imported from `src/app/globals.css` and processed by `postcss.config.mjs`
- Not detected - no `jest.config.*`, `vitest.config.*`, `playwright.config.*`, or test files were found in the repository
- TypeScript 5 - type checking and editor tooling configured in `tsconfig.json`
- ESLint 9 with `eslint-config-next` - linting configured in `eslint.config.mjs`
- PostCSS with `@tailwindcss/postcss` - Tailwind build integration in `postcss.config.mjs`
- Sass 1.98.0 - SCSS compilation used by `src/app/globals.scss` and `src/styles/_fluid.scss`
## Key Dependencies
- `next` 16.2.1 - application framework, metadata routes, static export, and image handling in `package.json` and `next.config.ts`
- `react` 19.2.4 and `react-dom` 19.2.4 - rendering runtime for `src/app/layout.tsx` and `src/components/**/*.tsx`
- `gsap` 3.14.2 - animation and scroll-trigger orchestration in `src/components/providers/SmoothScrollProvider.tsx` and `src/components/sections/HeroSection.tsx`
- `lenis` 1.3.19 - smooth scrolling integration in `src/components/providers/SmoothScrollProvider.tsx` and `src/components/layout/Header.tsx`
- `swiper` 12.1.2 - carousel UI in `src/components/shared/ModeCardCarousel.tsx`
- `clsx` 2.1.1 and `tailwind-merge` 3.5.0 - class composition helper in `src/lib/utils.ts`
- `lucide-react` 0.577.0 - icon set in `src/components/layout/Header.tsx` and `src/components/sections/PocSection.tsx`
- `sass` 1.98.0 - SCSS language support for `src/app/globals.scss` and `src/styles/**/*.scss`
- `tw-animate-css` 1.4.0 - animation utility import in `src/app/globals.css`
- `shadcn` 4.1.0 - component registry tooling configured by `components.json`; runtime import is limited to `@import "shadcn/tailwind.css"` in `src/app/globals.css`
- `@base-ui/react` 1.3.0 - present in `package.json`, no import found in `src/**/*.ts` or `src/**/*.tsx`
- `@gsap/react` 2.1.2 - present in `package.json`, no import found in `src/**/*.ts` or `src/**/*.tsx`
- `class-variance-authority` 0.7.1 - present in `package.json`, no import found in `src/**/*.ts` or `src/**/*.tsx`
- `motion` 12.38.0 - present in `package.json`, no import found in `src/**/*.ts` or `src/**/*.tsx`
- `pretendard` 1.3.9 - present in `package.json`, while the actual font file is served from `public/fonts/PretendardVariable.woff2` and loaded in `src/app/globals.scss`
## Configuration
- No environment variable access was detected in `src/**/*.ts`, `src/**/*.tsx`, `README.md`, `docs/**`, or `tasks/**`
- No `.env`, `.env.*`, `.nvmrc`, or `.tool-versions` files were detected at the repository root or one level below
- `next.config.ts` - enables `output: "export"` and `images.unoptimized: true`
- `tsconfig.json` - enables strict TypeScript settings and the `@/*` path alias to `./src/*`
- `postcss.config.mjs` - wires Tailwind through PostCSS
- `eslint.config.mjs` - applies Next.js core-web-vitals and TypeScript lint rules
- `components.json` - stores shadcn registry and alias configuration
## Platform Requirements
- Node.js and npm are required to run scripts from `package.json`
- Static assets must exist under `public/`, including `public/assets/images/**` and `public/fonts/PretendardVariable.woff2`
- Static hosting target - `next.config.ts` exports a fully static build to `out/`
- `README.md` documents deployment by uploading `out/` to static hosting or using Vercel for testing
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- React 컴포넌트 파일은 PascalCase를 사용한다. 예: `src/components/layout/Header.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/shared/ModeCardCarousel.tsx`
- Next App Router 엔트리 파일은 프레임워크 예약 이름을 그대로 사용한다. 예: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`
- 공용 라이브러리와 정적 데이터 파일은 소문자 파일명을 사용한다. 예: `src/lib/utils.ts`, `src/lib/site.ts`, `src/lib/constants.ts`
- SCSS partial은 `_` 접두사 + lowercase 또는 kebab-case를 사용한다. 예: `src/styles/_variables.scss`, `src/styles/_typography.scss`, `src/styles/components/_section-overrides.scss`
- 기본 export React 컴포넌트는 PascalCase 함수명으로 선언한다. 예: `Header`, `HeroSection`, `SectionBackground`
- 내부 유틸 함수와 이벤트 핸들러는 camelCase 동사형 이름을 사용한다. 예: `scrollTo` in `src/components/layout/Header.tsx`, `syncHeaderState` in `src/components/layout/Header.tsx`, `makeStyle` in `src/components/shared/SectionBackground.tsx`
- DOM/animation 관련 helper는 역할 중심으로 짧게 짓는다. 예: `extend` in `src/components/shared/ModeCardCarousel.tsx`, `update` in `src/components/providers/SmoothScrollProvider.tsx`
- 지역 상태와 일반 상수는 camelCase를 사용한다. 예: `menuOpen`, `activeTheme`, `shouldLoad`, `orderedStores`
- 페이지 전반에 공유되는 정적 카피/설정은 UPPER_SNAKE_CASE 상수 객체로 선언한다. 예: `MANIFESTO`, `SOCIAL_MODE`, `PRIVATE_MODE` in `src/lib/constants.ts`
- 컴포넌트 내부의 임계값과 className 조합용 상수도 UPPER_SNAKE_CASE 또는 설명형 camelCase를 사용한다. 예: `HERO_DARK_THEME_THRESHOLD` in `src/components/sections/HeroSection.tsx`, `themeTransitionClassName` in `src/components/layout/Header.tsx`
- `interface`와 `type` 이름은 PascalCase를 사용한다. 예: `SectionBadgeProps`, `ModeCardCarouselProps`, `HeaderTheme`
- variant 성격의 값은 string union으로 좁힌다. 예: `'light' | 'dark'` in `src/components/layout/Header.tsx`, `src/components/shared/StoreButtons.tsx`, `src/components/shared/ModeCardCarousel.tsx`
## Code Style
- 자동 포맷터 설정은 감지되지 않는다. `.prettierrc*`, `biome.json`은 없고, 포맷 규칙은 파일별 관성에 의존한다.
- 들여쓰기와 따옴표 스타일은 파일별로 다르다. 예: `src/components/layout/Header.tsx`는 탭 + single quote, `src/components/ui/ripple-button.tsx`는 공백 2칸 + double quote, `src/lib/utils.ts`는 semicolon 없이 작성된다.
- 새 코드는 저장소 전역 스타일을 강제로 통일하지 말고, 수정하는 파일의 기존 스타일을 그대로 따른다.
- Tailwind 유틸리티가 1차 스타일링 수단이고, 반복되는 유동 spacing/typography만 SCSS partial로 추출한다. 예: `src/app/globals.css`, `src/app/globals.scss`, `src/styles/_typography.scss`, `src/styles/components/_section-overrides.scss`
- ESLint는 `eslint.config.mjs`에서 `eslint-config-next/core-web-vitals`와 `eslint-config-next/typescript`를 그대로 사용한다.
- 무시 경로는 `.next/**`, `out/**`, `build/**`, `next-env.d.ts`로 제한된다. 문서나 설계 이미지 디렉터리는 lint 대상이 아니다.
- 규칙 위반이 필요한 경우 국소적으로 disable 주석을 쓴다. 예: raw `<img>` 사용을 위해 `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/sections/HeroSection.tsx`에 `@next/next/no-img-element` disable 주석이 있다.
- 타입 검사는 `tsconfig.json`의 `"strict": true`와 `next build` 단계의 TypeScript 실행에 의존한다.
## Import Organization
- 내부 TypeScript 경로 alias는 `@/* -> ./src/*` 하나만 사용한다. 정의 위치: `tsconfig.json`
- 컴포넌트, lib, provider 참조는 상대경로보다 alias import를 우선한다. 예: `@/components/shared/SectionContainer`, `@/lib/utils`
- 스타일 파일 import는 alias 대신 상대경로를 사용한다. 예: `src/app/layout.tsx`
## UI Patterns
- 랜딩 페이지는 `src/app/page.tsx`에서 섹션 컴포넌트를 순서대로 조립한다.
- 새 섹션은 `src/components/sections/`에 PascalCase 파일로 추가하고, `src/app/page.tsx`에 배치 순서대로 import 및 렌더링한다.
- 헤더/푸터는 별도 layout 컴포넌트로 유지한다. 위치: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- 섹션 공통 폭/패딩은 `SectionContainer`를 사용한다. 구현 위치: `src/components/shared/SectionContainer.tsx`
- 배지 UI는 `SectionBadge`로 통일한다. 구현 위치: `src/components/shared/SectionBadge.tsx`
- 배경 이미지는 `SectionBackground`로 lazy load한다. 구현 위치: `src/components/shared/SectionBackground.tsx`
- 앱스토어/플레이스토어 CTA는 `StoreButtons`로 재사용한다. 구현 위치: `src/components/shared/StoreButtons.tsx`
- 타이틀/본문 크기는 인라인 Tailwind arbitrary value보다 SCSS 클래스 조합을 우선한다. 예: `.section-title`, `.section-copy` in `src/styles/_typography.scss`
- 공통 컨테이너 크기와 섹션 패딩은 SCSS 변수와 fluid mixin으로 제어한다. 위치: `src/styles/_variables.scss`, `src/styles/_fluid.scss`, `src/styles/components/_section-overrides.scss`
- 실제 레이아웃 구성은 Tailwind 클래스에서 해결한다. 예: `grid`, `sticky`, `max-w-[1680px]`, `text-balance` usage in `src/components/sections/SocialModeSection.tsx`, `src/components/sections/HeroSection.tsx`
- 브라우저 API, animation, resize observer, scroll state가 필요한 컴포넌트만 `'use client'`를 선언한다.
- 현재 클라이언트 컴포넌트는 `src/components/layout/Header.tsx`, `src/components/providers/SmoothScrollProvider.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/sections/TwoModesSection.tsx`, `src/components/shared/ModeCardCarousel.tsx`, `src/components/shared/SectionBackground.tsx`, `src/components/ui/ripple-button.tsx`에 한정된다.
- 단순 프레젠테이션 섹션은 server component 상태를 유지한다. 예: `src/components/sections/SocialModeSection.tsx`, `src/components/sections/ApplicationSection.tsx`, `src/components/layout/Footer.tsx`
## Error Handling
- 현재 코드베이스에는 `try/catch`, `throw new Error`, `console.error` 기반의 런타임 에러 처리 패턴이 사실상 없다. 확인 범위: `src/**/*.ts`, `src/**/*.tsx`
- 대신 브라우저 의존 로직은 조기 반환으로 방어한다. 예: `if (!section || !overlay || !overlayText || !introLeft || !introRing) return;` in `src/components/sections/HeroSection.tsx`
- observer, event listener, GSAP ticker는 반드시 cleanup을 함께 작성한다. 예: `src/components/layout/Header.tsx`, `src/components/providers/SmoothScrollProvider.tsx`, `src/components/shared/ModeCardCarousel.tsx`, `src/components/shared/SectionBackground.tsx`
- 조건부 fallback UI보다는 noop fallback을 선호한다. 예: `Header`의 `lenis` 미존재 시 `scrollIntoView`/`window.scrollTo` 사용, `SectionBackground`의 `shouldLoad` 전에는 `backgroundImage`를 비워 둔다.
## Logging
- 앱 코드에는 로깅 호출이 없다. `src/**/*.ts`, `src/**/*.tsx`에서 `console.` 패턴이 감지되지 않는다.
- 디버깅이 필요해도 영구 로그를 남기지 않는 구조이므로, 새 로그를 추가할 경우 개발용 임시 확인 후 제거하는 방향을 따른다.
## Comments
- 복잡한 브라우저 측 계산이나 플랫폼 제약이 있는 부분에만 짧게 설명을 단다. 예: scrollbar 폭 설명 in `src/components/shared/ModeCardCarousel.tsx`
- ESLint 우회나 접근성 목적의 예외에도 이유를 주석으로 남긴다. 예: `@next/next/no-img-element` disable in `src/components/layout/Header.tsx`
- 함수/컴포넌트에 대한 JSDoc/TSDoc 사용은 감지되지 않는다.
- 타입 의도는 prop interface와 literal union으로 표현한다. 예: `StoreButtonsProps`, `SectionBackgroundProps`
## Function Design
## Module Design
- 컴포넌트 모듈은 기본 export를 사용한다. 예: `src/components/layout/Header.tsx`, `src/components/sections/HeroSection.tsx`
- 유틸과 정적 데이터는 named export를 사용한다. 예: `cn` in `src/lib/utils.ts`, `SITE_URL` and `PLACEHOLDER_LINKS` in `src/lib/site.ts`, 상수 객체들 in `src/lib/constants.ts`
## Lint / Build Verification
- `npm run lint` 성공
- `npm run build` 성공
- `next build`는 정적 export와 TypeScript 검사를 함께 수행한다. 설정 위치: `next.config.ts`, `tsconfig.json`
- UI/카피/animation을 수정한 뒤 최소 `npm run lint`와 `npm run build`를 모두 실행한다.
- `next.config.ts`가 `output: "export"`와 `images.unoptimized: true`를 강제하므로, 새 이미지 컴포넌트는 `next/image` 사용 시 `unoptimized` 요구사항을 깨지 않도록 맞춘다.
- formatting 도구가 없으므로, 대규모 재포맷보다는 기능 수정 범위만 변경하고 기존 파일 스타일을 유지한다.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- 단일 라우트인 `src/app/page.tsx`가 랜딩 섹션을 순서대로 조립한다.
- 섹션별 화면 책임은 `src/components/sections/`에 분리하고, 반복 UI는 `src/components/shared/`로 끌어올린다.
- 카피와 링크 상수는 `src/lib/constants.ts`, `src/lib/site.ts`에 모아 두고 섹션은 이를 소비만 한다.
## Layers
- Purpose: HTML 문서 셸, SEO 메타데이터, 정적 산출물 엔드포인트를 제공한다.
- Location: `src/app/`
- Contains: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/manifest.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`
- Depends on: `src/components/providers/SmoothScrollProvider.tsx`, `src/components/layout/*`, `src/components/sections/*`, `src/lib/site.ts`, 전역 스타일 파일
- Used by: Next.js App Router 런타임
- Purpose: 페이지 공통 내비게이션과 푸터를 제공하고 섹션 헤더 테마 전환과 스크롤 이동을 처리한다.
- Location: `src/components/layout/`
- Contains: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- Depends on: `lenis`, `lucide-react`, `src/lib/site.ts`, `src/lib/utils.ts`
- Used by: `src/app/page.tsx`
- Purpose: 제품 랜딩의 개별 스토리 블록을 독립 컴포넌트로 캡슐화한다.
- Location: `src/components/sections/`
- Contains: `Hero`, `BeyondScreen`, `TwoModes`, `SocialMode`, `PrivateMode`, `AIAgent`, `Application`, `Poc`, `Web3`, `Pioneer` 섹션 파일
- Depends on: `src/components/shared/*`, `src/lib/constants.ts`, `src/lib/site.ts`, `next/image`, `gsap`, `swiper`, `lucide-react`
- Used by: `src/app/page.tsx`
- Purpose: 여러 섹션에서 반복되는 컨테이너, 배지, 배경, 캐러셀, CTA, 아트워크를 재사용 가능하게 제공한다.
- Location: `src/components/shared/` 및 `src/components/ui/`
- Contains: `src/components/shared/SectionContainer.tsx`, `src/components/shared/SectionBackground.tsx`, `src/components/shared/ModeCardCarousel.tsx`, `src/components/shared/StoreButtons.tsx`, `src/components/shared/RingArtwork.tsx`, `src/components/ui/ripple-button.tsx`
- Depends on: `src/lib/utils.ts`, `next/image`, `swiper/react`
- Used by: `src/components/sections/*`, 일부 `src/components/layout/*`
- Purpose: 전역 스크롤 시스템과 애니메이션 브리지를 초기화한다.
- Location: `src/components/providers/`
- Contains: `src/components/providers/SmoothScrollProvider.tsx`
- Depends on: `lenis/react`, `gsap`, `gsap/ScrollTrigger`
- Used by: `src/app/layout.tsx`, `src/components/layout/Header.tsx`, `src/components/sections/HeroSection.tsx`
- Purpose: UI에서 쓰는 텍스트, 카드 데이터, 외부 링크, 사이트 URL, 클래스 병합 유틸리티를 중앙 관리한다.
- Location: `src/lib/`
- Contains: `src/lib/constants.ts`, `src/lib/site.ts`, `src/lib/utils.ts`
- Depends on: `clsx`, `tailwind-merge`
- Used by: `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/components/layout/Header.tsx`, `src/components/sections/*`, `src/components/shared/*`
- Purpose: Tailwind 토큰과 SCSS 기반 타이포/간격/섹션 규칙을 함께 정의한다.
- Location: `src/app/globals.css`, `src/app/globals.scss`, `src/styles/`, `src/styles/components/`
- Contains: Tailwind import, `@theme` 변수, 폰트 선언, fluid mixin, 디자인 토큰, 섹션 공통 클래스
- Depends on: `tailwindcss`, `sass`
- Used by: `src/app/layout.tsx`에서 전역 import
## Data Flow
- 전역 상태 저장소는 없다.
- 상호작용 상태는 각 클라이언트 컴포넌트 내부 `useState`로 국소 관리한다. 예시는 `src/components/layout/Header.tsx`의 `menuOpen`, `activeTheme`, `scrolled`와 `src/components/sections/TwoModesSection.tsx`의 `mode`다.
## Key Abstractions
- Purpose: 모든 섹션에 동일한 최대 너비와 유동 패딩, 최소 높이를 준다.
- Examples: `src/components/shared/SectionContainer.tsx`, `.section-container` in `src/styles/components/_section-overrides.scss`
- Pattern: 섹션 루트 안에서 `SectionContainer`를 첫 번째 레이아웃 래퍼로 사용한다.
- Purpose: 섹션별 배경 이미지를 lazy-load하고 모바일/데스크톱 소스를 분기한다.
- Examples: `src/components/shared/SectionBackground.tsx`, 사용처 `src/components/sections/BeyondScreenSection.tsx`, `src/components/sections/SocialModeSection.tsx`, `src/components/sections/PocSection.tsx`
- Pattern: 배경이 필요한 섹션은 루트 `<section>` 바로 아래에 `SectionBackground`를 두고, 본문은 `relative` 컨테이너로 올린다.
- Purpose: 카피와 카드 데이터, 플레이스홀더 링크를 UI와 분리한다.
- Examples: `src/lib/constants.ts`, `src/lib/site.ts`
- Pattern: 섹션 내부에 하드코딩하지 말고 먼저 `src/lib/`에 추가한 뒤 import한다.
- Purpose: 브라우저 API 의존 애니메이션이나 상태를 섹션 단위로 격리한다.
- Examples: `src/components/sections/HeroSection.tsx`, `src/components/sections/TwoModesSection.tsx`, `src/components/shared/ModeCardCarousel.tsx`
- Pattern: 상호작용이 필요한 파일만 `'use client'`를 선언하고, 정적 섹션은 서버 컴포넌트 상태를 유지한다.
- Purpose: 정적 배포에서도 SEO 파일을 코드로 생성한다.
- Examples: `src/app/manifest.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`
- Pattern: 외부 URL은 `src/lib/site.ts`의 `SITE_URL`을 재사용한다.
## Entry Points
- Location: `src/app/layout.tsx`
- Triggers: 모든 요청과 정적 export 빌드
- Responsibilities: 메타데이터 선언, 폰트/전역 스타일 import, `SmoothScrollProvider` 적용, skip link 제공
- Location: `src/app/page.tsx`
- Triggers: `/` 라우트 접근
- Responsibilities: `Header`-섹션-`Footer` 조립, 섹션 순서 정의
- Location: `src/app/manifest.ts`
- Triggers: `/manifest.webmanifest` 생성
- Responsibilities: PWA 메타데이터 반환, `dynamic = 'force-static'` 적용
- Location: `src/app/robots.ts`
- Triggers: `/robots.txt` 생성
- Responsibilities: 크롤러 규칙과 sitemap URL 반환
- Location: `src/app/sitemap.ts`
- Triggers: `/sitemap.xml` 생성
- Responsibilities: 사이트 URL과 변경 주기 반환
## Error Handling
- `useEffect` 내부에서 DOM ref 또는 Lenis 인스턴스가 없으면 즉시 반환한다. 예시는 `src/components/providers/SmoothScrollProvider.tsx`, `src/components/sections/HeroSection.tsx`다.
- 상호작용 실패 시 대체 경로를 제공한다. 예시는 `src/components/layout/Header.tsx`에서 Lenis가 없으면 `scrollIntoView` 또는 `window.scrollTo`로 폴백한다.
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
