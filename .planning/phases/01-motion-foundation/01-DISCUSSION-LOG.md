# Phase 1: Motion Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-24
**Phase:** 1-Motion Foundation
**Areas discussed:** reduced motion 처리 방식, 공통 래퍼 API 범위, 모션 강도 기준

---

## reduced motion 처리 방식

| Option | Description | Selected |
|--------|-------------|----------|
| `RevealOnScroll` 내부에서 처리 | 래퍼 하나에서 즉시 표시 fallback까지 함께 관리한다. 권장안. | ✓ |
| 전역 `MotionConfig`로 처리 | 앱 루트에 전역 모션 설정 계층을 둔다. | |
| 섹션별 개별 처리 | 각 섹션이 필요할 때 직접 reduced motion 예외를 둔다. | |

**User's choice:** `RevealOnScroll` 내부에서 처리
**Notes:** 접근성 대응이 섹션별로 흩어지지 않게 공통 reveal 계층에서 잠그는 방향으로 결정했다.

---

## 공통 래퍼 API 범위

| Option | Description | Selected |
|--------|-------------|----------|
| 최소 API만 지원 | `div` 기본 + `as`, `delay`, `duration`, `variants` 등 최소 인터페이스만 지원한다. 권장안. | ✓ |
| 처음부터 넓게 지원 | stagger, children orchestration까지 포함한 넓은 추상화를 만든다. | |
| 래퍼 없이 직접 사용 | 각 섹션이 `motion`을 직접 사용하게 둔다. | |

**User's choice:** 최소 API만 지원
**Notes:** Phase 1은 기반 확정이 목적이므로 과한 추상화는 미룬다.

---

## 모션 강도 기준

| Option | Description | Selected |
|--------|-------------|----------|
| 절제된 기본값 | 짧고 가벼운 reveal로 현재 제품 사이트 톤을 유지한다. 권장안. | ✓ |
| 존재감 있는 기본값 | 이동거리와 스케일을 더 크게 가져간다. | |
| 섹션별 가변 톤 | 공통 기준은 약하게 두고 섹션마다 강도를 다르게 한다. | |

**User's choice:** 절제된 기본값
**Notes:** 이후 phase에서도 공통 프리셋은 제품 사이트의 정제된 리듬을 해치지 않는 방향으로 유지한다.

---

## the agent's Discretion

- exact easing curve와 preset 수치
- 태그 매핑 방식과 TypeScript 타입 설계

## Deferred Ideas

None
