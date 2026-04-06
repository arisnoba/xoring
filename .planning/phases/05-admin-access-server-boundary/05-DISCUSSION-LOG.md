# Phase 5: Admin Access & Server Boundary - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-06
**Phase:** 05-admin-access-server-boundary
**Areas discussed:** 관리자 로그인 방식, 관리자 페이지 배치 방식, 관리자 데이터 처리 경계

---

## 관리자 로그인 방식

| Option | Description | Selected |
|--------|-------------|----------|
| Supabase Auth 이메일 로그인 | 허용된 관리자 이메일만 로그인 가능. 권장안. | ✓ |
| 공유 비밀번호 1개로 관리자 진입 | 가장 빠르지만 보안 수준이 낮고 운영 이력 관리가 어렵다. | |
| 외부 인증 서비스 도입 | 가장 확장성은 좋지만 이번 phase 범위엔 무겁다. | |

**User's choice:** Supabase Auth 이메일 로그인
**Notes:** 허용된 관리자 이메일 allowlist를 전제로 진행한다.

---

## 관리자 페이지 배치 방식

| Option | Description | Selected |
|--------|-------------|----------|
| 같은 저장소 안 `/admin` 경로 | 권장안. UI/스타일 재사용이 쉽다. | ✓ |
| 관리자 전용 별도 앱/프로젝트 | 분리는 깔끔하지만 지금은 범위가 커진다. | |
| Supabase 대시보드만 사용 | 이번 milestone 목표와 맞지 않는다. | |

**User's choice:** 같은 저장소 안 `/admin` 경로
**Notes:** 공개 랜딩과 운영 도구를 한 저장소에서 관리한다.

---

## 관리자 데이터 처리 경계

| Option | Description | Selected |
|--------|-------------|----------|
| Next.js 서버 경계 + service role | 권장안. 브라우저는 서버만 호출한다. | ✓ |
| Supabase Edge Function만 사용 | 가능하지만 현재 Next 앱과 연결이 한 단계 더 복잡해진다. | |
| 브라우저에서 Supabase 직접 호출 + RLS 정책 추가 | 관리자 기능엔 불필요하게 위험하다. | |

**User's choice:** Next.js 서버 경계 + service role
**Notes:** `frontier_applications`는 RLS 기본 차단 상태를 유지하고, service role은 서버 전용으로만 사용한다.

---

## the agent's Discretion

- route handler와 server action 중 어떤 형태가 더 적합한지는 planning 단계에서 결정한다.
- 관리자 allowlist 저장 방식은 보안과 운영성을 만족하는 최소 구성으로 planner가 정한다.

## Deferred Ideas

None
