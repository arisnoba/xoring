# Roadmap: XORing Motion Enhancement

## Overview

이 로드맵은 기존 XORing 정적 랜딩 페이지의 구조, Hero scrub, 정적 export 배포 방식을 유지한 채 공통 reveal 기반을 도입하고, 위험도에 따라 섹션별 모션을 순차 적용한 뒤 Hero 초기 진입 모션과 릴리스 검증까지 마무리하는 brownfield 개선 경로를 정의한다.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Motion Foundation** - 공통 reveal 유틸리티와 접근성/서버 컴포넌트 경계를 확정한다
- [ ] **Phase 2: Static Section Reveal** - 저위험 및 블록형 섹션에 일관된 reveal 모션을 적용한다
- [ ] **Phase 3: Interactive Section Safeguards** - sticky, carousel, O/X 모드 전환이 있는 섹션에 안전하게 reveal을 적용한다
- [ ] **Phase 4: Hero Intro & Release Readiness** - Hero 초기 진입 모션을 추가하고 릴리스 검증을 완료한다

## Phase Details

### Phase 1: Motion Foundation
**Goal**: 기존 랜딩 구조를 깨지 않고 재사용 가능한 reveal 기반과 접근성 대응을 도입한다
**Depends on**: Nothing (first phase)
**Requirements**: MOTN-01, MOTN-02, MOTN-03, QUAL-01
**Success Criteria** (what must be TRUE):
  1. 개발자는 `RevealOnScroll` 래퍼 하나로 섹션 내부 reveal을 재사용할 수 있다.
  2. 개발자는 공통 모션 프리셋을 import해 섹션마다 같은 리듬의 reveal을 적용할 수 있다.
  3. reduced motion 환경에서는 reveal 대상 콘텐츠가 애니메이션 없이 즉시 보인다.
  4. 기존 서버 컴포넌트 섹션은 reveal 추가만으로 불필요하게 클라이언트 컴포넌트로 바뀌지 않는다.
**Plans**: 1 plan
Plans:
- [ ] 01-01-PLAN.md — 공통 reveal preset, `RevealOnScroll`, 서버 경계 guardrail을 구현한다
**UI hint**: yes

### Phase 2: Static Section Reveal
**Goal**: 정적 구조와 블록 단위 구성이 명확한 섹션들에 일관된 reveal 경험을 적용한다
**Depends on**: Phase 1
**Requirements**: SECT-01, SECT-03
**Success Criteria** (what must be TRUE):
  1. 사용자는 `BeyondScreen`, `Web3`, `Pioneer` 섹션 진입 시 동일한 계열의 reveal 모션을 본다.
  2. 사용자는 `AIAgent`, `Application`, `Poc` 섹션에서 계획 문서에 맞는 블록 단위 reveal 흐름을 본다.
  3. `Poc` 섹션의 상단, 중단, 하단 블록은 각 블록이 뷰포트에 들어올 때 독립적으로 reveal 된다.
**Plans**: 4 plans
Plans:
- [ ] 02-01-PLAN.md — BeyondScreen, Web3, Pioneer에 SECT-01 reveal 적용
- [ ] 02-02-PLAN.md — AIAgent, Application에 블록형 SECT-03 reveal 적용
- [ ] 02-03-PLAN.md — Poc 3블록 reveal 구조와 brownfield 경계 검증
- [ ] 02-04-PLAN.md — Phase 2 lint/build 및 데스크톱·모바일 수동 검증
**UI hint**: yes

### Phase 3: Interactive Section Safeguards
**Goal**: 상호작용 의존성이 있는 모드 섹션들에 reveal을 추가하면서 기존 인터랙션을 유지한다
**Depends on**: Phase 2
**Requirements**: SECT-02, SECT-04
**Success Criteria** (what must be TRUE):
  1. 사용자는 `SocialMode`와 `PrivateMode` 섹션에서 sticky 레이아웃이 유지된 상태로 reveal 모션을 본다.
  2. 사용자는 `SocialMode`와 `PrivateMode` 섹션에서 reveal 이후에도 캐러셀을 정상적으로 넘길 수 있다.
  3. 사용자는 `TwoModes` 섹션에서 초기 reveal 이후에도 O/X 모드 전환을 정상적으로 사용할 수 있다.
**Plans**: 2 plans
Plans:
- [ ] 03-01-PLAN.md — SocialMode/PrivateMode에 sticky-safe reveal wrapper를 추가하고 ModeCardCarousel 보호 규칙을 고정한다
- [ ] 03-02-PLAN.md — TwoModes에 초기 reveal을 추가하면서 O/X 모드 토글과 버튼 시맨틱을 유지한다
**UI hint**: yes

### Phase 4: Hero Intro & Release Readiness
**Goal**: Hero 첫인상 모션을 추가하고 전체 랜딩을 릴리스 가능한 상태로 검증한다
**Depends on**: Phase 3
**Requirements**: HERO-01, HERO-02, QUAL-02, QUAL-03
**Success Criteria** (what must be TRUE):
  1. 사용자는 첫 진입 시 Hero 로고, 링, 다운로드 버튼의 초기 등장 모션을 본다.
  2. Hero 초기 등장 모션이 기존 GSAP scrub, overlay 전환, header theme sync와 충돌하지 않는다.
  3. 프로젝트는 모션 변경 후에도 `npm run lint`와 `npm run build`를 모두 통과한다.
  4. 개발자는 데스크톱과 모바일에서 모든 reveal 구간을 수동으로 검증할 수 있다.
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Motion Foundation | 0/1 | Not started | - |
| 2. Static Section Reveal | 0/TBD | Not started | - |
| 3. Interactive Section Safeguards | 0/TBD | Not started | - |
| 4. Hero Intro & Release Readiness | 0/TBD | Not started | - |
