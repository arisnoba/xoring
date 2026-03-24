# Phase 1: Motion Foundation - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

기존 XORing 랜딩 페이지 구조를 유지한 채, 이후 phase들이 재사용할 수 있는 공통 reveal 기반을 도입한다. 이 phase의 범위는 `RevealOnScroll` 래퍼, 공통 모션 프리셋, reduced motion 대응, 서버 컴포넌트 경계 원칙 확정까지이며, 개별 섹션 적용과 Hero 초기 진입 모션 자체 구현은 다음 phase에서 다룬다.

</domain>

<decisions>
## Implementation Decisions

### Reduced Motion Strategy
- **D-01:** reduced motion 대응은 전역 `MotionConfig`가 아니라 `RevealOnScroll` 내부에서 처리한다.
- **D-02:** 개별 섹션별 예외 처리로 흩어지지 않도록, reveal 계층에서 즉시 표시 fallback을 중앙집중식으로 제공한다.

### Wrapper API Surface
- **D-03:** `RevealOnScroll`은 최소 API만 제공한다. 기본 `div` 래퍼와 `as`, `className`, `variants`, `delay`, `duration`, `once`, `amount` 정도까지만 지원한다.
- **D-04:** Phase 1에서는 stagger orchestration, children sequencing, 복합 timeline 추상화는 추가하지 않는다.

### Motion Tone
- **D-05:** 기본 reveal 톤은 절제된 제품 사이트 스타일로 고정한다. 짧고 가벼운 이동/투명도 변화만 사용하고, 과한 스케일 변화나 긴 딜레이 체인은 피한다.
- **D-06:** 공통 프리셋은 이후 phase 전반에서 같은 리듬으로 재사용될 수 있어야 하며, 섹션별 모션 톤 분화는 Phase 1의 목표가 아니다.

### the agent's Discretion
- reduced motion 내부 구현은 `motion`의 current API와 현재 코드 구조에 가장 잘 맞는 방식으로 정한다. 단, 사용자 결정인 "RevealOnScroll 내부 처리"를 깨면 안 된다.
- 기본 easing, offset 수치, duration의 세부 값은 절제된 reveal 톤을 유지하는 범위에서 planner와 implementer가 결정한다.
- `RevealOnScroll` 내부 타입 설계와 태그 매핑 방식은 TypeScript 오류 없이 최소 API를 제공하는 방향이면 자유다.

</decisions>

<specifics>
## Specific Ideas

- 이 phase는 “기준 잠금”이 목적이다. 이후 섹션 적용 phase에서 다시 reduced motion 방식이나 래퍼 추상화 범위를 흔들지 않도록 먼저 고정한다.
- 사용자는 공통 모션 톤에 대해 “존재감보다 절제”를 명시적으로 선택했다.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope and requirement docs
- `.planning/ROADMAP.md` — Phase 1 목표, requirement 매핑, success criteria를 정의한다.
- `.planning/REQUIREMENTS.md` — `MOTN-01`, `MOTN-02`, `MOTN-03`, `QUAL-01`의 범위를 고정한다.
- `.planning/PROJECT.md` — 이번 마일스톤의 core value, 제약, brownfield 범위를 정의한다.

### Motion specification
- `docs/motion-plan.md` — motion/GSAP 역할 분리, 래퍼 설계 방향, 섹션별 적용 원칙, Hero 예외 사항의 기준 문서다.

### Existing code constraints
- `src/components/sections/HeroSection.tsx` — 기존 GSAP scrub, header theme sync, intro 영역 ref 구조를 보여준다.
- `src/components/shared/SectionBackground.tsx` — 현재 코드베이스의 클라이언트 경계, observer cleanup, prop 설계 패턴을 보여준다.
- `src/components/shared/SectionContainer.tsx` — 단순 프레젠테이션 래퍼가 서버 컴포넌트로 유지되는 구조를 보여준다.
- `.planning/codebase/CONVENTIONS.md` — 클라이언트 경계 원칙, 파일 스타일 유지, lint/build 검증 규칙을 요약한다.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/shared/SectionContainer.tsx`: 섹션 내부 공통 래퍼로 이미 사용 중이며, reveal 래퍼가 들어가도 바깥 레이아웃 기준점은 그대로 유지할 수 있다.
- `src/components/shared/SectionBackground.tsx`: `'use client'` + `useEffect` + cleanup 패턴이 이미 있으며, Phase 1에서 새 클라이언트 래퍼를 설계할 때 참고할 수 있다.
- `src/lib/utils.ts`: 클래스 병합 유틸 `cn()`이 있어 reveal 래퍼의 className 합성에 재사용할 수 있다.

### Established Patterns
- 클라이언트 경계는 최소화한다. 현재 `HeroSection`, `TwoModesSection`, `ModeCardCarousel`, `SectionBackground` 같은 브라우저 API 의존 파일만 `'use client'`를 사용한다.
- 공용 UI는 `src/components/shared/`에 두고, 섹션은 `src/components/sections/`에서 조합하는 구조다.
- 검증은 `npm run lint`와 `npm run build` 중심이며, 별도 테스트 프레임워크는 없다.

### Integration Points
- 새 reveal 래퍼는 `src/components/shared/RevealOnScroll.tsx`에 추가하는 것이 구조상 자연스럽다.
- 공통 프리셋은 `src/lib/motion.ts`에 두고 각 섹션이 import하게 만드는 것이 현재 `src/lib/` 사용 패턴과 맞는다.
- Hero는 GSAP가 이미 `introLeftRef`, `introRingRef`, `overlayTextRef`를 제어하므로, planner는 Phase 4에서 이 제약을 전제로 intro 모션을 분리 설계해야 한다.

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-motion-foundation*
*Context gathered: 2026-03-24*
