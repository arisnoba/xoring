# Codebase Concerns

**Analysis Date:** 2026-03-24

## Tech Debt

**콘텐츠 단일 소스 부재:**

- Issue: 카피와 카드 데이터가 `src/lib/constants.ts`에 모여 있지만 실제 렌더링 데이터는 여러 섹션에서 다시 하드코딩된다. `src/components/sections/AIAgentSection.tsx`, `src/components/sections/PocSection.tsx`, `src/components/sections/Web3Section.tsx`, `src/components/sections/BeyondScreenSection.tsx`는 자체 배열을 선언해 `src/lib/constants.ts`와 병행 관리한다.
- Files: `src/lib/constants.ts`, `src/components/sections/AIAgentSection.tsx`, `src/components/sections/PocSection.tsx`, `src/components/sections/Web3Section.tsx`, `src/components/sections/BeyondScreenSection.tsx`
- Impact: 문구 수정, 번역, CMS 연동 시 수정 지점이 분산되고 카피 불일치가 쉽게 발생한다.
- Fix approach: 섹션 데이터의 소유권을 `src/lib/constants.ts` 같은 한 위치로 통일하고, 섹션 컴포넌트는 표시 로직만 담당하게 분리한다.

**스타일 계층 혼합과 토큰 중복:**

- Issue: 전역 스타일이 `src/app/globals.css`, `src/app/globals.scss`, `src/styles/_variables.scss`, `src/styles/components/_section-overrides.scss`로 나뉘어 있고 Tailwind `@theme` 변수와 SCSS 변수/루트 변수가 함께 존재한다.
- Files: `src/app/globals.css`, `src/app/globals.scss`, `src/styles/_variables.scss`, `src/styles/components/_section-overrides.scss`
- Impact: 색상과 간격 토큰을 바꿀 때 실제 소스가 어디인지 즉시 파악하기 어렵고, 스타일 회귀가 발생해도 탐지 지점이 분산된다.
- Fix approach: 디자인 토큰의 기준 계층을 하나로 정하고, Tailwind 테마와 SCSS 변수 중 한쪽을 파생 결과물로 제한한다.

**미사용 의존성과 고아 코드 잔존:**

- Issue: 앱 코드에서 사용 흔적이 없는 패키지가 `package.json`에 남아 있다. `@base-ui/react`, `@gsap/react`, `class-variance-authority`, `motion`, `pretendard`, `shadcn`은 실제 `src/` import가 거의 없고, `src/components/ui/ripple-button.tsx`도 참조되지 않는다.
- Files: `package.json`, `src/components/ui/ripple-button.tsx`, `src/app/globals.css`, `components.json`, `docs/motion-plan.md`
- Impact: 설치 크기와 보안 패치 범위가 불필요하게 커지고, 현재 디자인 시스템이 무엇인지 새 작업자가 혼동한다.
- Fix approach: 실제 사용 중인 UI/애니메이션 스택만 남기고 미사용 패키지와 고아 컴포넌트를 제거한다. 남겨둘 계획이 있다면 진입 지점과 사용 정책을 문서화한다.

**정적 자산 위생 미흡:**

- Issue: macOS 메타파일이 `public/` 아래에 남아 있다.
- Files: `public/.DS_Store`, `public/assets/.DS_Store`, `public/assets/images/.DS_Store`, `public/assets/images/aiagent/.DS_Store`, `public/assets/images/beyondscreen/.DS_Store`, `public/assets/images/poc/.DS_Store`, `public/assets/images/private/.DS_Store`, `public/assets/images/social/.DS_Store`, `public/assets/images/web3/.DS_Store`
- Impact: 배포 산출물에 불필요한 파일이 섞이고, 정적 호스팅 캐시와 리뷰 diff가 지저분해진다.
- Fix approach: 자산 정리 스크립트나 pre-commit 규칙으로 `.DS_Store`를 제거하고, `public/`에 대한 아티팩트 검사를 추가한다.

## Known Bugs

**실서비스 링크와 메타데이터가 플레이스홀더를 가리킴:**

- Symptoms: CTA 버튼, 앱 스토어 링크, canonical/OG URL, `robots.txt`, `sitemap.xml`이 모두 `https://xoring.ai` 및 `/mock/*`를 가리킨다.
- Files: `src/lib/site.ts`, `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/components/layout/Header.tsx`, `src/components/shared/StoreButtons.tsx`, `src/components/sections/PioneerSection.tsx`
- Trigger: 정적 배포 후 사용자가 구매/대기열/스토어 버튼을 클릭하거나 검색엔진이 메타데이터를 수집할 때 즉시 드러난다.
- Workaround: 현재 코드베이스 안에는 없다. 배포 전에 실제 도메인과 실제 목적지 URL로 교체해야 한다.

## Security Considerations

**보안 헤더/CSP 구성이 애플리케이션 코드에 없음:**

- Risk: 정적 배포 대상이지만 `next.config.ts`에는 `output: "export"`와 이미지 설정만 있고, CSP·HSTS·X-Frame-Options 같은 방어선이 정의돼 있지 않다.
- Files: `next.config.ts`, `README.md`
- Current mitigation: `target="_blank"` 링크에는 `rel="noreferrer"`가 들어가 있어 탭 납치 위험은 낮다.
- Recommendations: 최종 호스팅 계층에서 CSP, HSTS, Referrer-Policy, X-Content-Type-Options를 강제하고, 필요하면 문서에 필수 헤더 세트를 명시한다.

## Performance Bottlenecks

**스크롤 시점마다 레이아웃 측정을 수행하는 헤더 상태 계산:**

- Problem: 헤더가 `scroll` 이벤트마다 `document.elementsFromPoint()`와 `window.scrollY`를 호출해 현재 테마를 판별한다.
- Files: `src/components/layout/Header.tsx`
- Cause: `resolveSectionTheme()`가 DOM hit-testing에 의존하고, 이를 `scroll`/`resize`/커스텀 이벤트마다 실행한다.
- Improvement path: 섹션 진입 상태를 `IntersectionObserver`나 ScrollTrigger 콜백으로 계산해 헤더에 전달하고, 스크롤 시 DOM 측정은 제거한다.

**단일 페이지에 무거운 시각 자산과 애니메이션이 집중됨:**

- Problem: 정적 결과물 `out/`이 약 40MB, `public/` 자산이 약 30MB이며, 여러 섹션이 풀스크린 배경 이미지와 대형 PNG/WEBP를 한 페이지에 싣는다.
- Files: `public/assets/images/**`, `src/components/sections/HeroSection.tsx`, `src/components/sections/PocSection.tsx`, `src/components/sections/ApplicationSection.tsx`, `src/components/shared/SectionBackground.tsx`, `src/components/shared/RingArtwork.tsx`
- Cause: 고해상도 비주얼이 많은 데 비해 이미지 예산, 품질 정책, 지연 로딩 기준이 없다. Hero는 `priority`와 `fetchPriority="high"`를 강제하고, 각 섹션은 개별 배경 이미지를 사용한다.
- Improvement path: 이미지 용량 예산을 정하고, LCP 후보만 우선 로딩하며, 나머지는 크기별 변형과 더 공격적인 lazy 전략으로 정리한다.

**애니메이션 접근성 폴백 부재:**

- Problem: GSAP, Lenis, Swiper 기반 모션이 많지만 `prefers-reduced-motion` 대응 코드가 없다.
- Files: `src/components/providers/SmoothScrollProvider.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/shared/ModeCardCarousel.tsx`, `docs/motion-plan.md`
- Cause: 스크롤/스크럽 애니메이션은 도입됐지만 접근성 제어 분기는 구현되지 않았다.
- Improvement path: `prefers-reduced-motion`이 활성화된 환경에서 Lenis/GSAP/Swiper 동작을 축소하거나 끄는 공통 가드를 둔다.

## Fragile Areas

**헤더와 히어로 섹션의 비공식 이벤트 결합:**

- Files: `src/components/layout/Header.tsx`, `src/components/sections/HeroSection.tsx`
- Why fragile: `document.documentElement.dataset.heroHeaderTheme`와 `xoring:hero-header-theme-change` 커스텀 이벤트가 두 컴포넌트를 느슨하게 연결한다. 한쪽만 수정하면 헤더 색상 전환이 깨지기 쉽다.
- Safe modification: 헤더 테마 상태를 상위 컨텍스트나 명시적 prop/state로 관리하고, DOM dataset 기반 프로토콜은 제거한다.
- Test coverage: 관련 동작을 검증하는 테스트가 없다.

**캐러셀 폭 보정이 DOM 너비 계산과 인라인 스타일에 의존:**

- Files: `src/components/shared/ModeCardCarousel.tsx`, `src/components/sections/SocialModeSection.tsx`, `src/components/sections/PrivateModeSection.tsx`
- Why fragile: 렌더 후 `getBoundingClientRect()` 결과로 래퍼 폭을 재계산하는 방식이라 브레이크포인트 변경이나 부모 레이아웃 수정 시 쉽게 깨진다.
- Safe modification: 레이아웃 요구를 CSS 컨테이너 규칙으로 환원하고, JS 폭 보정은 제거하거나 최소화한다.
- Test coverage: 브레이크포인트별 레이아웃 검증이 없다.

## Scaling Limits

**페이지 구성 확장이 수동 조립에 의존함:**

- Current capacity: 단일 랜딩 페이지 1개를 `src/app/page.tsx`에서 직접 조합한다.
- Limit: 섹션 수가 늘어나거나 다른 랜딩 페이지가 추가되면 순서 변경, 재사용, 실험 배너 주입, A/B 테스트가 모두 수동 수정으로 바뀐다.
- Scaling path: 섹션 메타데이터 배열과 렌더 레지스트리를 두고, 콘텐츠와 레이아웃을 선언적으로 조립하는 구조로 바꾼다.

## Dependencies at Risk

**스캐폴드 의존성 유지 비용:**

- Risk: 현재 페이지가 실제로 쓰지 않는 라이브러리까지 업그레이드·보안 점검 범위에 포함된다.
- Impact: 작은 랜딩 페이지에 비해 의존성 표면적이 넓고, 업데이트 시 회귀 가능성이 커진다.
- Migration plan: `src/` import 기준으로 패키지 사용 여부를 재검토하고, 남는 패키지만 `package.json`에 유지한다.

## Missing Critical Features

**CI와 배포 전 자동 검증 파이프라인 부재:**

- Problem: 실행 가능한 스크립트가 `npm run lint`와 `npm run build` 정도이며, 저장소 안에서 GitHub Actions나 다른 CI 설정이 보이지 않는다.
- Blocks: 변경마다 정적 export 안정성, 링크 무결성, 접근성 회귀를 자동으로 막을 수 없다.

**실제 접근성 검증 장치 부족:**

- Problem: 헤더 메뉴, Two Modes 토글, Swiper 캐러셀에는 기본 마크업이 있지만 포커스 흐름, 키보드 사용성, reduced motion, 명시적 carousel a11y 설정이 없다.
- Blocks: WCAG 기준을 만족하는지 자동/수동으로 확신하기 어렵고, 시각/전정 민감 사용자의 이탈 위험이 높다.

## Test Coverage Gaps

**인터랙션 로직 전반 미검증:**

- What's not tested: 스크롤 헤더 테마 전환, Lenis와 ScrollTrigger 연동, Two Modes 토글, 캐러셀 반응형 폭 보정, 모바일 메뉴 열림/닫힘.
- Files: `src/components/layout/Header.tsx`, `src/components/providers/SmoothScrollProvider.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/sections/TwoModesSection.tsx`, `src/components/shared/ModeCardCarousel.tsx`
- Risk: 디자인 변경이나 라이브러리 업그레이드 후 핵심 인터랙션이 깨져도 `npm run build`만으로는 감지되지 않는다.
- Priority: High

**정적 메타데이터와 배포 산출물 검증 부재:**

- What's not tested: `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, canonical URL, CTA 목적지 링크, 이미지 경로의 실제 존재 여부.
- Files: `src/app/layout.tsx`, `src/app/manifest.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/lib/site.ts`
- Risk: 배포는 성공해도 검색엔진 색인, OG 공유, 실제 전환 링크가 잘못된 상태로 운영될 수 있다.
- Priority: High

---

_Concerns audit: 2026-03-24_
