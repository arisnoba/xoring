# XORing Motion Enhancement

## What This Is

기존 `XORing` 정적 랜딩 페이지에 일관된 섹션 등장 모션을 추가하는 brownfield 개선 프로젝트다. 현재 동작 중인 히어로 스크롤 scrub, 섹션 구성, 정적 export 배포 방식을 유지하면서, `docs/motion-plan.md`를 기준으로 랜딩 경험의 완성도를 높이는 것이 목표다.

## Core Value

기존 랜딩 페이지를 깨뜨리지 않고, 일관되고 세련된 등장 모션을 안전하게 추가한다.

## Requirements

### Validated

- ✓ 단일 페이지 랜딩 구조와 섹션 순서가 `src/app/page.tsx`에 구현되어 있다 — existing
- ✓ `HeroSection`에 GSAP `ScrollTrigger` 기반 scrub 애니메이션과 헤더 테마 연동이 구현되어 있다 — existing
- ✓ 정적 export 배포(`next.config.ts`)와 `next/image` 비최적화 전략이 이미 적용되어 있다 — existing
- ✓ `lenis`, `swiper`, `gsap` 기반 상호작용 섹션이 현재 랜딩 경험의 일부로 동작한다 — existing

### Active

- [ ] 섹션 reveal용 공통 모션 유틸리티(`RevealOnScroll`, 모션 프리셋)를 추가한다
- [ ] low-risk 섹션(BeyondScreen, Web3, Pioneer)에 일관된 reveal 모션을 적용한다
- [ ] medium/high-risk 섹션(Social, Private, AIAgent, Application, Poc, TwoModes)에 구조를 해치지 않는 모션을 적용한다
- [ ] HeroSection에 기존 scrub과 충돌하지 않는 초기 진입 모션을 추가한다
- [ ] reduced motion 대응과 빌드/린트 검증까지 포함해 릴리스 가능한 상태로 마무리한다

### Out of Scope

- 랜딩 카피, 정보 구조, 시각 디자인의 전면 리디자인 — 이번 범위는 모션 개선이며 콘텐츠 재설계가 아니다
- GSAP 제거 또는 전 섹션의 애니메이션 엔진 통일 — 히어로 scrub은 기존 GSAP 유지가 더 안전하다
- 캐러셀 동작 방식 변경, 새 인터랙션 추가, 신규 섹션 도입 — motion polish와 직접 관련 없는 범위 확장이다
- 테스트 프레임워크 신규 도입 — 현재 저장소는 빌드/린트/수동 검증 중심이며, 이번 범위에서 도구 체계까지 확장하지 않는다

## Context

- 저장소는 Next.js App Router 기반의 정적 단일 페이지 랜딩 사이트다. 핵심 섹션은 `src/components/sections/`, 반복 UI는 `src/components/shared/`, 카피/링크는 `src/lib/`에 분리되어 있다.
- 코드베이스 맵은 `.planning/codebase/`에 생성되어 있으며, 현재 구조상 대부분의 섹션은 서버 컴포넌트로 유지할 수 있다.
- 사용자는 `docs/motion-plan.md`를 이번 작업의 기준 문서로 제시했고, 그 문서는 `motion`과 `GSAP`의 역할 분리, Hero 예외 처리, sticky/carousel 제약 등을 다루고 있다.
- 현재 코드베이스에는 테스트 프레임워크가 없으며, 검증 수단은 `npm run lint`, `npm run build`, 데스크톱/모바일 수동 확인이다.

## Constraints

- **Tech stack**: Next.js 16 + React 19 + Tailwind 4 + SCSS + GSAP + Swiper를 유지한다 — 기존 코드와 배포 방식이 이 조합에 맞춰져 있다
- **Deployment**: `output: "export"` 정적 배포를 유지한다 — 현재 호스팅 전략과 `next/image` 설정이 이 제약에 묶여 있다
- **Compatibility**: 기존 `HeroSection` scrub, `Header` 테마 동기화, `ModeCardCarousel` 동작을 깨뜨리면 안 된다 — 현재 사용자 경험의 핵심 동작이다
- **Architecture**: 가능한 한 서버 컴포넌트를 유지한다 — reveal 추가만으로 섹션 전체를 클라이언트로 승격시키는 비용을 피해야 한다
- **Accessibility**: reduced motion 사용자는 애니메이션 없이 즉시 콘텐츠를 봐야 한다 — 가독성과 접근성 저하를 막기 위한 필수 조건이다

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 섹션 reveal은 `motion`, 히어로 scrub은 GSAP으로 분리 | 서로 잘하는 영역이 다르고 기존 히어로 로직을 재작성할 이유가 없다 | — Pending |
| `docs/motion-plan.md`를 구현 기준 문서로 사용 | 이미 요구사항과 위험요소가 정리되어 있어 범위를 명확히 유지할 수 있다 | — Pending |
| 대부분의 섹션은 서버 컴포넌트로 유지 | reveal 래퍼만 클라이언트 경계로 두면 구조와 성능 이점을 함께 지킬 수 있다 | — Pending |
| 이번 마일스톤은 모션 개선에만 집중 | 리디자인이나 새 기능 추가를 섞으면 검증 범위가 과도하게 커진다 | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-24 after initialization*
