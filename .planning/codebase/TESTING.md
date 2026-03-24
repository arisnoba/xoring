# Testing Patterns

**Analysis Date:** 2026-03-24

## Test Framework

**Runner:**
- Not detected
- Config: Not detected (`jest.config.*`, `vitest.config.*`, `playwright.config.*`, `cypress.config.*` 없음)

**Assertion Library:**
- Not detected

**Run Commands:**
```bash
npm run lint        # 정적 규칙 검증
npm run build       # Next build + TypeScript + static export 검증
# npm test / npm run test / npm run coverage 는 정의되지 않음
```

## Test File Organization

**Location:**
- 테스트 파일 위치 패턴은 감지되지 않는다. `*.test.*`, `*.spec.*`, `tests/`, `__tests__/`가 없다.

**Naming:**
- Not applicable

**Structure:**
```text
테스트 디렉터리/파일 미구성
```

## Current Verification Strategy

**Build-Centric Verification:**
- 현재 품질 검증은 테스트 러너 대신 `npm run lint`와 `npm run build`에 집중되어 있다. 정의 위치: `package.json`
- `npm run build`는 Next.js production compile, TypeScript 검사, 정적 페이지 생성까지 실행한다.
- 확인된 정적 라우트는 `/`, `/_not-found`, `/manifest.webmanifest`, `/robots.txt`, `/sitemap.xml` 이다. 관련 파일: `src/app/page.tsx`, `src/app/manifest.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`

**Manual UI Verification:**
- 저장소 문서들은 뷰포트 수동 확인을 반복적으로 요구한다. 예: `docs/`와 `tasks/` 내 설계 문서에서 375px, 768px, 1440px 뷰포트 검증을 명시한다.
- 실제 인터랙션 검증 대상은 헤더 스크롤 상태, Hero scroll animation, Swiper 카드 노출, lazy background loading, Lenis smooth scroll이다. 구현 위치: `src/components/layout/Header.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/shared/ModeCardCarousel.tsx`, `src/components/shared/SectionBackground.tsx`, `src/components/providers/SmoothScrollProvider.tsx`

## Test Structure

**Suite Organization:**
```typescript
// 현재 저장소에는 describe/it/test 스위트가 없다.
// 검증은 npm 스크립트와 브라우저 수동 확인으로 대체된다.
```

**Patterns:**
- Setup pattern: 없음
- Teardown pattern: 없음
- Assertion pattern: 없음

## Mocking

**Framework:** Not detected

**Patterns:**
```typescript
// mocking infrastructure not detected
```

**What to Mock:**
- 새 테스트를 추가한다면 브라우저 API 의존부를 mock 대상으로 본다. 예: `window.addEventListener`, `document.elementsFromPoint`, `IntersectionObserver`, `window.scrollTo` in `src/components/layout/Header.tsx`, `src/components/shared/SectionBackground.tsx`
- animation 라이브러리는 완전한 DOM animation 재현보다 호출 여부와 cleanup 여부를 검증하는 수준으로 제한한다. 대상: `gsap`, `ScrollTrigger`, `lenis/react`, `swiper/react`

**What NOT to Mock:**
- 정적 카피/설정 데이터는 mock보다 실제 상수를 그대로 사용한다. 대상: `src/lib/constants.ts`, `src/lib/site.ts`
- 단순 프레젠테이션 섹션은 snapshot보다 실제 텍스트/aria/query 기반 렌더 검증이 더 적합하다. 대상: `src/components/sections/*.tsx`

## Fixtures and Factories

**Test Data:**
```typescript
// 전용 fixture/factory 없음
// 실제 구현은 상수 객체를 직접 소비한다.
import { SOCIAL_MODE } from '@/lib/constants';
```

**Location:**
- 별도 fixture 디렉터리는 없다.
- UI 콘텐츠 소스는 `src/lib/constants.ts`에 집중되어 있어, 테스트 도입 시 가장 먼저 재사용할 데이터 원천은 이 파일이다.

## Coverage

**Requirements:** None enforced

**View Coverage:**
```bash
# coverage command not configured
```

## Test Types

**Unit Tests:**
- Not used
- 우선순위가 높은 첫 단위 테스트 후보:
  - `cn()` merge 동작 in `src/lib/utils.ts`
  - 헤더 theme 결정/스크롤 fallback 로직 in `src/components/layout/Header.tsx`
  - `SectionBackground` lazy load state transition in `src/components/shared/SectionBackground.tsx`
  - `ModeCardCarousel` width extension 계산 로직 in `src/components/shared/ModeCardCarousel.tsx`

**Integration Tests:**
- Not used
- 첫 통합 테스트 후보:
  - `src/app/page.tsx`가 섹션 순서를 보존하는지
  - `src/app/layout.tsx`가 `SmoothScrollProvider`와 skip link를 포함하는지
  - `src/components/sections/HeroSection.tsx`가 manifesto headline과 CTA를 렌더링하는지

**E2E Tests:**
- Not used
- 브라우저 자동화가 도입되면 우선 검증할 시나리오:
  - 헤더 메뉴 클릭 시 Lenis 또는 기본 scroll fallback으로 해당 section으로 이동
  - 모바일 메뉴 토글 동작
  - Hero 스크롤 진행 시 헤더 테마가 바뀌는지
  - Social/Private carousel의 breakpoint별 슬라이드 노출
  - 정적 export 결과에서 `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` 응답 여부

## Suggested Baseline for New Tests

**Minimal Stack to Add:**
- 러너: Vitest 또는 Jest 중 하나를 선택해 `package.json`에 `test`, `test:watch`, `test:coverage` 스크립트를 추가한다.
- React 렌더 테스트: `@testing-library/react` + `@testing-library/jest-dom`
- E2E: Playwright 한 가지로 고정하고, 정적 export 산출물 또는 `next dev` 위에서 구동한다.

**Recommended File Placement:**
- 컴포넌트 테스트는 구현 옆 colocated 방식이 가장 자연스럽다. 예: `src/components/layout/Header.test.tsx`, `src/components/shared/SectionBackground.test.tsx`
- 앱 엔트리 테스트는 `src/app/` 바로 아래에 둔다. 예: `src/app/page.test.tsx`, `src/app/layout.test.tsx`
- 브라우저 E2E는 저장소 루트의 `tests/e2e/` 또는 `e2e/`에 분리한다.

## Common Patterns

**Async Testing:**
```typescript
// 현재 패턴 없음
// 비동기 로직은 observer/animation/event cleanup 중심으로 기다림이 필요하다.
```

**Error Testing:**
```typescript
// 현재 패턴 없음
// 에러 throw보다 guard-return 중심이므로 "안 터진다"와 cleanup 동작을 확인하는 테스트가 더 중요하다.
```

## Gaps and Risks

**No Automated Regression Net:**
- `src/components/layout/Header.tsx`와 `src/components/sections/HeroSection.tsx`는 스크롤 위치와 DOM 측정에 의존하지만 자동 회귀 테스트가 없다.
- `src/components/shared/ModeCardCarousel.tsx`는 레이아웃 계산이 JS에 들어가 있어 breakpoint regressions를 잡을 장치가 없다.
- `src/components/shared/SectionBackground.tsx`는 `IntersectionObserver` 기반 lazy loading을 사용하지만, observer 미지원 환경이나 중복 mount에 대한 검증이 없다.

**Verification Blind Spots:**
- 접근성 관련 자동 검증이 없다. 현재 존재하는 접근성 배려는 skip link in `src/app/layout.tsx`, `aria-label`/`aria-expanded` in `src/components/layout/Header.tsx` 정도다.
- placeholder URL이 실제로 외부 링크 요구사항을 만족하는지 확인하는 테스트가 없다. 관련 파일: `src/lib/site.ts`, `src/components/shared/StoreButtons.tsx`, `src/components/layout/Header.tsx`, `src/components/sections/PioneerSection.tsx`
- 시각 회귀 테스트가 없어 Tailwind/SCSS 조합 변경 시 랜딩 페이지 전체 리듬이 쉽게 깨질 수 있다.

## Practical Guidance

**Before Shipping Any Change:**
```bash
npm run lint
npm run build
```

**When Adding Tests:**
- 가장 먼저 `src/lib/utils.ts`, `src/app/page.tsx`, `src/components/layout/Header.tsx`, `src/components/shared/SectionBackground.tsx`를 대상으로 얇은 회귀 테스트를 만든다.
- 브라우저 API 의존부는 helper 함수로 분리해 pure calculation을 먼저 테스트 가능하게 만든다.
- motion/scroll 계열 컴포넌트는 CSS snapshot보다 DOM 존재 여부, aria 상태, cleanup 호출 여부를 우선 검증한다.

---

*Testing analysis: 2026-03-24*
