# Coding Conventions

**Analysis Date:** 2026-03-24

## Naming Patterns

**Files:**
- React 컴포넌트 파일은 PascalCase를 사용한다. 예: `src/components/layout/Header.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/shared/ModeCardCarousel.tsx`
- Next App Router 엔트리 파일은 프레임워크 예약 이름을 그대로 사용한다. 예: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`
- 공용 라이브러리와 정적 데이터 파일은 소문자 파일명을 사용한다. 예: `src/lib/utils.ts`, `src/lib/site.ts`, `src/lib/constants.ts`
- SCSS partial은 `_` 접두사 + lowercase 또는 kebab-case를 사용한다. 예: `src/styles/_variables.scss`, `src/styles/_typography.scss`, `src/styles/components/_section-overrides.scss`

**Functions:**
- 기본 export React 컴포넌트는 PascalCase 함수명으로 선언한다. 예: `Header`, `HeroSection`, `SectionBackground`
- 내부 유틸 함수와 이벤트 핸들러는 camelCase 동사형 이름을 사용한다. 예: `scrollTo` in `src/components/layout/Header.tsx`, `syncHeaderState` in `src/components/layout/Header.tsx`, `makeStyle` in `src/components/shared/SectionBackground.tsx`
- DOM/animation 관련 helper는 역할 중심으로 짧게 짓는다. 예: `extend` in `src/components/shared/ModeCardCarousel.tsx`, `update` in `src/components/providers/SmoothScrollProvider.tsx`

**Variables:**
- 지역 상태와 일반 상수는 camelCase를 사용한다. 예: `menuOpen`, `activeTheme`, `shouldLoad`, `orderedStores`
- 페이지 전반에 공유되는 정적 카피/설정은 UPPER_SNAKE_CASE 상수 객체로 선언한다. 예: `MANIFESTO`, `SOCIAL_MODE`, `PRIVATE_MODE` in `src/lib/constants.ts`
- 컴포넌트 내부의 임계값과 className 조합용 상수도 UPPER_SNAKE_CASE 또는 설명형 camelCase를 사용한다. 예: `HERO_DARK_THEME_THRESHOLD` in `src/components/sections/HeroSection.tsx`, `themeTransitionClassName` in `src/components/layout/Header.tsx`

**Types:**
- `interface`와 `type` 이름은 PascalCase를 사용한다. 예: `SectionBadgeProps`, `ModeCardCarouselProps`, `HeaderTheme`
- variant 성격의 값은 string union으로 좁힌다. 예: `'light' | 'dark'` in `src/components/layout/Header.tsx`, `src/components/shared/StoreButtons.tsx`, `src/components/shared/ModeCardCarousel.tsx`

## Code Style

**Formatting:**
- 자동 포맷터 설정은 감지되지 않는다. `.prettierrc*`, `biome.json`은 없고, 포맷 규칙은 파일별 관성에 의존한다.
- 들여쓰기와 따옴표 스타일은 파일별로 다르다. 예: `src/components/layout/Header.tsx`는 탭 + single quote, `src/components/ui/ripple-button.tsx`는 공백 2칸 + double quote, `src/lib/utils.ts`는 semicolon 없이 작성된다.
- 새 코드는 저장소 전역 스타일을 강제로 통일하지 말고, 수정하는 파일의 기존 스타일을 그대로 따른다.
- Tailwind 유틸리티가 1차 스타일링 수단이고, 반복되는 유동 spacing/typography만 SCSS partial로 추출한다. 예: `src/app/globals.css`, `src/app/globals.scss`, `src/styles/_typography.scss`, `src/styles/components/_section-overrides.scss`

**Linting:**
- ESLint는 `eslint.config.mjs`에서 `eslint-config-next/core-web-vitals`와 `eslint-config-next/typescript`를 그대로 사용한다.
- 무시 경로는 `.next/**`, `out/**`, `build/**`, `next-env.d.ts`로 제한된다. 문서나 설계 이미지 디렉터리는 lint 대상이 아니다.
- 규칙 위반이 필요한 경우 국소적으로 disable 주석을 쓴다. 예: raw `<img>` 사용을 위해 `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/sections/HeroSection.tsx`에 `@next/next/no-img-element` disable 주석이 있다.
- 타입 검사는 `tsconfig.json`의 `"strict": true`와 `next build` 단계의 TypeScript 실행에 의존한다.

## Import Organization

**Order:**
1. React/Next/서드파티 패키지 import. 예: `src/components/sections/HeroSection.tsx`, `src/components/layout/Header.tsx`
2. 전역 CSS 또는 패키지 CSS import. 예: `src/app/layout.tsx`, `src/components/shared/ModeCardCarousel.tsx`
3. 내부 alias import (`@/components`, `@/lib`) 순서로 가져온다. 예: `src/app/page.tsx`, `src/components/shared/StoreButtons.tsx`

**Path Aliases:**
- 내부 TypeScript 경로 alias는 `@/* -> ./src/*` 하나만 사용한다. 정의 위치: `tsconfig.json`
- 컴포넌트, lib, provider 참조는 상대경로보다 alias import를 우선한다. 예: `@/components/shared/SectionContainer`, `@/lib/utils`
- 스타일 파일 import는 alias 대신 상대경로를 사용한다. 예: `src/app/layout.tsx`

## UI Patterns

**Section Composition:**
- 랜딩 페이지는 `src/app/page.tsx`에서 섹션 컴포넌트를 순서대로 조립한다.
- 새 섹션은 `src/components/sections/`에 PascalCase 파일로 추가하고, `src/app/page.tsx`에 배치 순서대로 import 및 렌더링한다.
- 헤더/푸터는 별도 layout 컴포넌트로 유지한다. 위치: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`

**Shared Building Blocks:**
- 섹션 공통 폭/패딩은 `SectionContainer`를 사용한다. 구현 위치: `src/components/shared/SectionContainer.tsx`
- 배지 UI는 `SectionBadge`로 통일한다. 구현 위치: `src/components/shared/SectionBadge.tsx`
- 배경 이미지는 `SectionBackground`로 lazy load한다. 구현 위치: `src/components/shared/SectionBackground.tsx`
- 앱스토어/플레이스토어 CTA는 `StoreButtons`로 재사용한다. 구현 위치: `src/components/shared/StoreButtons.tsx`

**Typography and Layout:**
- 타이틀/본문 크기는 인라인 Tailwind arbitrary value보다 SCSS 클래스 조합을 우선한다. 예: `.section-title`, `.section-copy` in `src/styles/_typography.scss`
- 공통 컨테이너 크기와 섹션 패딩은 SCSS 변수와 fluid mixin으로 제어한다. 위치: `src/styles/_variables.scss`, `src/styles/_fluid.scss`, `src/styles/components/_section-overrides.scss`
- 실제 레이아웃 구성은 Tailwind 클래스에서 해결한다. 예: `grid`, `sticky`, `max-w-[1680px]`, `text-balance` usage in `src/components/sections/SocialModeSection.tsx`, `src/components/sections/HeroSection.tsx`

**Client Boundary:**
- 브라우저 API, animation, resize observer, scroll state가 필요한 컴포넌트만 `'use client'`를 선언한다.
- 현재 클라이언트 컴포넌트는 `src/components/layout/Header.tsx`, `src/components/providers/SmoothScrollProvider.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/sections/TwoModesSection.tsx`, `src/components/shared/ModeCardCarousel.tsx`, `src/components/shared/SectionBackground.tsx`, `src/components/ui/ripple-button.tsx`에 한정된다.
- 단순 프레젠테이션 섹션은 server component 상태를 유지한다. 예: `src/components/sections/SocialModeSection.tsx`, `src/components/sections/ApplicationSection.tsx`, `src/components/layout/Footer.tsx`

## Error Handling

**Patterns:**
- 현재 코드베이스에는 `try/catch`, `throw new Error`, `console.error` 기반의 런타임 에러 처리 패턴이 사실상 없다. 확인 범위: `src/**/*.ts`, `src/**/*.tsx`
- 대신 브라우저 의존 로직은 조기 반환으로 방어한다. 예: `if (!section || !overlay || !overlayText || !introLeft || !introRing) return;` in `src/components/sections/HeroSection.tsx`
- observer, event listener, GSAP ticker는 반드시 cleanup을 함께 작성한다. 예: `src/components/layout/Header.tsx`, `src/components/providers/SmoothScrollProvider.tsx`, `src/components/shared/ModeCardCarousel.tsx`, `src/components/shared/SectionBackground.tsx`
- 조건부 fallback UI보다는 noop fallback을 선호한다. 예: `Header`의 `lenis` 미존재 시 `scrollIntoView`/`window.scrollTo` 사용, `SectionBackground`의 `shouldLoad` 전에는 `backgroundImage`를 비워 둔다.

## Logging

**Framework:** Not detected

**Patterns:**
- 앱 코드에는 로깅 호출이 없다. `src/**/*.ts`, `src/**/*.tsx`에서 `console.` 패턴이 감지되지 않는다.
- 디버깅이 필요해도 영구 로그를 남기지 않는 구조이므로, 새 로그를 추가할 경우 개발용 임시 확인 후 제거하는 방향을 따른다.

## Comments

**When to Comment:**
- 복잡한 브라우저 측 계산이나 플랫폼 제약이 있는 부분에만 짧게 설명을 단다. 예: scrollbar 폭 설명 in `src/components/shared/ModeCardCarousel.tsx`
- ESLint 우회나 접근성 목적의 예외에도 이유를 주석으로 남긴다. 예: `@next/next/no-img-element` disable in `src/components/layout/Header.tsx`

**JSDoc/TSDoc:**
- 함수/컴포넌트에 대한 JSDoc/TSDoc 사용은 감지되지 않는다.
- 타입 의도는 prop interface와 literal union으로 표현한다. 예: `StoreButtonsProps`, `SectionBackgroundProps`

## Function Design

**Size:** 중간 크기 단일 책임 컴포넌트 함수가 기본이다. 페이지 조립은 `src/app/page.tsx`, 섹션 단위 렌더링은 `src/components/sections/*.tsx`, 인터랙션은 `src/components/layout/Header.tsx`나 `src/components/shared/ModeCardCarousel.tsx`에 한정한다.

**Parameters:** React props interface로 명시하고, 선택적 값에는 기본값을 넣는다. 예:

```tsx
interface StoreButtonsProps {
	className?: string;
	variant?: 'dark' | 'light';
	googleFirst?: boolean;
	buttonClassName?: string;
}

export default function StoreButtons({
	className,
	variant = 'dark',
	googleFirst = false,
	buttonClassName,
}: StoreButtonsProps) {
```

**Return Values:** 대부분 JSX 반환이며, side effect helper는 값을 반환하지 않는다. 유틸 함수 `cn()`만 문자열을 반환한다. 위치: `src/lib/utils.ts`

## Module Design

**Exports:**
- 컴포넌트 모듈은 기본 export를 사용한다. 예: `src/components/layout/Header.tsx`, `src/components/sections/HeroSection.tsx`
- 유틸과 정적 데이터는 named export를 사용한다. 예: `cn` in `src/lib/utils.ts`, `SITE_URL` and `PLACEHOLDER_LINKS` in `src/lib/site.ts`, 상수 객체들 in `src/lib/constants.ts`

**Barrel Files:** 감지되지 않는다. 각 import는 실제 파일을 직접 가리킨다.

## Lint / Build Verification

**Available Commands:**

```bash
npm run lint
npm run build
```

**Current Status:**
- `npm run lint` 성공
- `npm run build` 성공
- `next build`는 정적 export와 TypeScript 검사를 함께 수행한다. 설정 위치: `next.config.ts`, `tsconfig.json`

**Practical Guidance:**
- UI/카피/animation을 수정한 뒤 최소 `npm run lint`와 `npm run build`를 모두 실행한다.
- `next.config.ts`가 `output: "export"`와 `images.unoptimized: true`를 강제하므로, 새 이미지 컴포넌트는 `next/image` 사용 시 `unoptimized` 요구사항을 깨지 않도록 맞춘다.
- formatting 도구가 없으므로, 대규모 재포맷보다는 기능 수정 범위만 변경하고 기존 파일 스타일을 유지한다.

---

*Convention analysis: 2026-03-24*
