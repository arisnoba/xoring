# Requirements: XORing Motion Enhancement

**Defined:** 2026-03-24
**Core Value:** 기존 랜딩 페이지를 깨뜨리지 않고, 일관되고 세련된 등장 모션을 안전하게 추가한다.

## v1 Requirements

### Motion Foundation

- [ ] **MOTN-01**: 개발자는 `src/components/shared/RevealOnScroll.tsx`에서 재사용 가능한 reveal 래퍼를 사용할 수 있다
- [ ] **MOTN-02**: 개발자는 `src/lib/motion.ts`에서 공통 프리셋(`fadeUp`, `fadeIn`, `scaleUp` 등)을 import해 일관된 모션을 적용할 수 있다
- [ ] **MOTN-03**: reduced motion 환경에서는 reveal 대상 콘텐츠가 애니메이션 없이 즉시 표시된다

### Section Reveal

- [ ] **SECT-01**: 사용자는 `BeyondScreen`, `Web3`, `Pioneer` 섹션 진입 시 일관된 reveal 모션을 본다
- [ ] **SECT-02**: 사용자는 `SocialMode`와 `PrivateMode` 섹션에서 sticky 레이아웃과 캐러셀 동작이 유지된 상태로 reveal 모션을 본다
- [ ] **SECT-03**: 사용자는 `AIAgent`, `Application`, `Poc` 섹션에서 계획 문서에 맞는 블록 단위 reveal 모션을 본다
- [ ] **SECT-04**: 사용자는 `TwoModes` 섹션에서 초기 reveal 이후에도 O/X 모드 전환 인터랙션을 정상적으로 사용할 수 있다

### Hero Motion

- [ ] **HERO-01**: 사용자는 페이지 첫 진입 시 Hero 로고, 링, 다운로드 버튼의 초기 등장 모션을 본다
- [ ] **HERO-02**: Hero의 초기 등장 모션은 기존 GSAP scrub 타임라인과 충돌하지 않고, overlay 전환과 header theme sync를 그대로 유지한다

### Delivery Quality

- [ ] **QUAL-01**: reveal 추가만으로 기존 서버 컴포넌트 섹션을 불필요하게 클라이언트 컴포넌트로 바꾸지 않는다
- [ ] **QUAL-02**: 변경 후 `npm run lint`와 `npm run build`가 모두 통과한다
- [ ] **QUAL-03**: 개발자는 데스크톱과 모바일에서 모든 reveal 구간을 수동 검증할 수 있다

## v2 Requirements

### Motion Extensions

- **MEXT-01**: 캐러셀 카드 단위의 세밀한 stagger 또는 hover 연출을 추가한다
- **MEXT-02**: 전역 `MotionConfig` 또는 테마 레벨 모션 제어 계층을 도입한다

## Out of Scope

| Feature | Reason |
|---------|--------|
| 랜딩 페이지 카피/디자인 리디자인 | 이번 범위는 motion polish이며 콘텐츠 설계 변경이 아니다 |
| GSAP 제거 및 전역 motion 통합 | 히어로 scrub은 GSAP이 더 적합하고 현재 구현도 안정적이다 |
| 신규 섹션, 신규 CTA, 신규 데이터 연동 추가 | 모션 개선과 무관한 범위 확장이다 |
| 테스트 프레임워크 도입 및 자동화 E2E 구축 | 현재 저장소 운영 방식 대비 범위가 과하다 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| MOTN-01 | Phase 1 | Pending |
| MOTN-02 | Phase 1 | Pending |
| MOTN-03 | Phase 1 | Pending |
| SECT-01 | Phase 2 | Pending |
| SECT-02 | Phase 3 | Pending |
| SECT-03 | Phase 2 | Pending |
| SECT-04 | Phase 3 | Pending |
| HERO-01 | Phase 4 | Pending |
| HERO-02 | Phase 4 | Pending |
| QUAL-01 | Phase 1 | Pending |
| QUAL-02 | Phase 4 | Pending |
| QUAL-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 12 total
- Mapped to phases: 12
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-24*
*Last updated: 2026-03-24 after roadmap creation*
