# Architecture

**Analysis Date:** 2026-03-24

## Pattern Overview

**Overall:** Next.js App Router 기반의 정적 단일 페이지 조립형 아키텍처

**Key Characteristics:**
- 단일 라우트인 `src/app/page.tsx`가 랜딩 섹션을 순서대로 조립한다.
- 섹션별 화면 책임은 `src/components/sections/`에 분리하고, 반복 UI는 `src/components/shared/`로 끌어올린다.
- 카피와 링크 상수는 `src/lib/constants.ts`, `src/lib/site.ts`에 모아 두고 섹션은 이를 소비만 한다.

## Layers

**App Router / Document Layer:**
- Purpose: HTML 문서 셸, SEO 메타데이터, 정적 산출물 엔드포인트를 제공한다.
- Location: `src/app/`
- Contains: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/manifest.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`
- Depends on: `src/components/providers/SmoothScrollProvider.tsx`, `src/components/layout/*`, `src/components/sections/*`, `src/lib/site.ts`, 전역 스타일 파일
- Used by: Next.js App Router 런타임

**Layout Composition Layer:**
- Purpose: 페이지 공통 내비게이션과 푸터를 제공하고 섹션 헤더 테마 전환과 스크롤 이동을 처리한다.
- Location: `src/components/layout/`
- Contains: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- Depends on: `lenis`, `lucide-react`, `src/lib/site.ts`, `src/lib/utils.ts`
- Used by: `src/app/page.tsx`

**Section Layer:**
- Purpose: 제품 랜딩의 개별 스토리 블록을 독립 컴포넌트로 캡슐화한다.
- Location: `src/components/sections/`
- Contains: `Hero`, `BeyondScreen`, `TwoModes`, `SocialMode`, `PrivateMode`, `AIAgent`, `Application`, `Poc`, `Web3`, `Pioneer` 섹션 파일
- Depends on: `src/components/shared/*`, `src/lib/constants.ts`, `src/lib/site.ts`, `next/image`, `gsap`, `swiper`, `lucide-react`
- Used by: `src/app/page.tsx`

**Shared UI Layer:**
- Purpose: 여러 섹션에서 반복되는 컨테이너, 배지, 배경, 캐러셀, CTA, 아트워크를 재사용 가능하게 제공한다.
- Location: `src/components/shared/` 및 `src/components/ui/`
- Contains: `src/components/shared/SectionContainer.tsx`, `src/components/shared/SectionBackground.tsx`, `src/components/shared/ModeCardCarousel.tsx`, `src/components/shared/StoreButtons.tsx`, `src/components/shared/RingArtwork.tsx`, `src/components/ui/ripple-button.tsx`
- Depends on: `src/lib/utils.ts`, `next/image`, `swiper/react`
- Used by: `src/components/sections/*`, 일부 `src/components/layout/*`

**Provider / Interaction Layer:**
- Purpose: 전역 스크롤 시스템과 애니메이션 브리지를 초기화한다.
- Location: `src/components/providers/`
- Contains: `src/components/providers/SmoothScrollProvider.tsx`
- Depends on: `lenis/react`, `gsap`, `gsap/ScrollTrigger`
- Used by: `src/app/layout.tsx`, `src/components/layout/Header.tsx`, `src/components/sections/HeroSection.tsx`

**Content / Configuration Layer:**
- Purpose: UI에서 쓰는 텍스트, 카드 데이터, 외부 링크, 사이트 URL, 클래스 병합 유틸리티를 중앙 관리한다.
- Location: `src/lib/`
- Contains: `src/lib/constants.ts`, `src/lib/site.ts`, `src/lib/utils.ts`
- Depends on: `clsx`, `tailwind-merge`
- Used by: `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/components/layout/Header.tsx`, `src/components/sections/*`, `src/components/shared/*`

**Styling Layer:**
- Purpose: Tailwind 토큰과 SCSS 기반 타이포/간격/섹션 규칙을 함께 정의한다.
- Location: `src/app/globals.css`, `src/app/globals.scss`, `src/styles/`, `src/styles/components/`
- Contains: Tailwind import, `@theme` 변수, 폰트 선언, fluid mixin, 디자인 토큰, 섹션 공통 클래스
- Depends on: `tailwindcss`, `sass`
- Used by: `src/app/layout.tsx`에서 전역 import

## Data Flow

**Landing Page Render Flow:**

1. Next.js가 `src/app/layout.tsx`를 통해 문서 메타데이터와 전역 스타일, `SmoothScrollProvider`를 로드한다.
2. `src/app/page.tsx`가 `Header`, 10개 섹션, `Footer`를 고정 순서로 렌더한다.
3. 각 섹션은 `src/lib/constants.ts` 또는 내부 배열에서 텍스트와 카드 데이터를 가져오고, `src/components/shared/*`를 조합해 마크업을 만든다.
4. 이미지와 아이콘은 `public/assets/images/` 및 `public/fonts/`에서 정적으로 제공되며, 정적 export 설정(`next.config.ts`)에 따라 최종 결과가 `out/`으로 출력된다.

**Header Theme Flow:**

1. `src/components/sections/HeroSection.tsx`가 GSAP `ScrollTrigger` 진행률에 따라 `document.documentElement.dataset.heroHeaderTheme`를 갱신한다.
2. 같은 섹션이 `window`에 `xoring:hero-header-theme-change` 이벤트를 발행한다.
3. `src/components/layout/Header.tsx`가 현재 뷰포트 상단에 걸친 `section[data-header-theme]` 또는 `footer[data-header-theme]`를 읽어 헤더 색상과 배경을 계산한다.

**Smooth Scroll Flow:**

1. `src/components/providers/SmoothScrollProvider.tsx`가 `ReactLenis` 루트를 생성한다.
2. 내부 `LenisGsapBridge`가 Lenis 스크롤 이벤트와 GSAP ticker를 연결해 `ScrollTrigger.update`를 동기화한다.
3. `src/components/layout/Header.tsx`는 `useLenis()`를 이용해 내비게이션 버튼 클릭 시 섹션 앵커로 스크롤한다.

**State Management:**
- 전역 상태 저장소는 없다.
- 상호작용 상태는 각 클라이언트 컴포넌트 내부 `useState`로 국소 관리한다. 예시는 `src/components/layout/Header.tsx`의 `menuOpen`, `activeTheme`, `scrolled`와 `src/components/sections/TwoModesSection.tsx`의 `mode`다.

## Key Abstractions

**Section Container:**
- Purpose: 모든 섹션에 동일한 최대 너비와 유동 패딩, 최소 높이를 준다.
- Examples: `src/components/shared/SectionContainer.tsx`, `.section-container` in `src/styles/components/_section-overrides.scss`
- Pattern: 섹션 루트 안에서 `SectionContainer`를 첫 번째 레이아웃 래퍼로 사용한다.

**Section Background:**
- Purpose: 섹션별 배경 이미지를 lazy-load하고 모바일/데스크톱 소스를 분기한다.
- Examples: `src/components/shared/SectionBackground.tsx`, 사용처 `src/components/sections/BeyondScreenSection.tsx`, `src/components/sections/SocialModeSection.tsx`, `src/components/sections/PocSection.tsx`
- Pattern: 배경이 필요한 섹션은 루트 `<section>` 바로 아래에 `SectionBackground`를 두고, 본문은 `relative` 컨테이너로 올린다.

**Static Content Registry:**
- Purpose: 카피와 카드 데이터, 플레이스홀더 링크를 UI와 분리한다.
- Examples: `src/lib/constants.ts`, `src/lib/site.ts`
- Pattern: 섹션 내부에 하드코딩하지 말고 먼저 `src/lib/`에 추가한 뒤 import한다.

**Interactive Section Components:**
- Purpose: 브라우저 API 의존 애니메이션이나 상태를 섹션 단위로 격리한다.
- Examples: `src/components/sections/HeroSection.tsx`, `src/components/sections/TwoModesSection.tsx`, `src/components/shared/ModeCardCarousel.tsx`
- Pattern: 상호작용이 필요한 파일만 `'use client'`를 선언하고, 정적 섹션은 서버 컴포넌트 상태를 유지한다.

**Static Metadata Endpoints:**
- Purpose: 정적 배포에서도 SEO 파일을 코드로 생성한다.
- Examples: `src/app/manifest.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`
- Pattern: 외부 URL은 `src/lib/site.ts`의 `SITE_URL`을 재사용한다.

## Entry Points

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: 모든 요청과 정적 export 빌드
- Responsibilities: 메타데이터 선언, 폰트/전역 스타일 import, `SmoothScrollProvider` 적용, skip link 제공

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: `/` 라우트 접근
- Responsibilities: `Header`-섹션-`Footer` 조립, 섹션 순서 정의

**Static Manifest:**
- Location: `src/app/manifest.ts`
- Triggers: `/manifest.webmanifest` 생성
- Responsibilities: PWA 메타데이터 반환, `dynamic = 'force-static'` 적용

**Robots:**
- Location: `src/app/robots.ts`
- Triggers: `/robots.txt` 생성
- Responsibilities: 크롤러 규칙과 sitemap URL 반환

**Sitemap:**
- Location: `src/app/sitemap.ts`
- Triggers: `/sitemap.xml` 생성
- Responsibilities: 사이트 URL과 변경 주기 반환

## Error Handling

**Strategy:** 방어적 조기 반환과 브라우저 API 가용성 체크 중심의 최소 오류 처리

**Patterns:**
- `useEffect` 내부에서 DOM ref 또는 Lenis 인스턴스가 없으면 즉시 반환한다. 예시는 `src/components/providers/SmoothScrollProvider.tsx`, `src/components/sections/HeroSection.tsx`다.
- 상호작용 실패 시 대체 경로를 제공한다. 예시는 `src/components/layout/Header.tsx`에서 Lenis가 없으면 `scrollIntoView` 또는 `window.scrollTo`로 폴백한다.

## Cross-Cutting Concerns

**Logging:** 런타임 로깅 계층은 없다.
**Validation:** 폼/입력 검증 계층은 없다. 이 프로젝트는 표시용 랜딩 페이지 구조다.
**Authentication:** 인증 계층은 없다.

---

*Architecture analysis: 2026-03-24*
