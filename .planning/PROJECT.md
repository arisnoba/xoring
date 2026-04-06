# XORing Frontier Launch Surface

## What This Is

`XORing`은 XO RING의 공개 랜딩 페이지와 `Frontier Edition` 신청 흐름, 그리고 그 신청을 운영자가 처리하는 운영 도구를 함께 다루는 brownfield 프로젝트다. 기존 정적 랜딩 경험과 브랜드 흐름은 유지하면서, 신청 접수부터 관리자 검토까지 이어지는 런치 운영 surface를 안전하게 구축하는 것이 목표다.

## Core Value

운영자가 신청 정보를 안전하게 처리하고 공개 랜딩 경험을 해치지 않는다.

## Current Milestone: v1.1 Frontier 신청 관리자 페이지

**Goal:** `frontier_applications` 스키마를 기준으로 운영자가 신청 목록을 조회하고 상태를 관리할 수 있는 관리자 페이지를 만든다.

**Target features:**
- 신청 목록 조회와 최신순 정렬
- 이메일, 지갑 주소, 상태 기준 검색/필터
- 신청 상세 확인
- 상태 변경과 관리자 메모 저장
- 공개 신청 폼과 분리된 관리자 전용 접근 구조

## Requirements

### Validated

- ✓ 단일 페이지 랜딩 구조와 섹션 순서가 `src/app/page.tsx`에 구현되어 있다 — existing
- ✓ `FrontierEditionModalFlow`에서 토큰 선택, 이메일, 지갑 주소, 동의 체크를 받는 신청 UX가 존재한다 — existing
- ✓ 정적 export 배포(`next.config.ts`)와 `next/image` 비최적화 전략이 이미 적용되어 있다 — existing
- ✓ Supabase `public.frontier_applications` 테이블과 상태 enum, unique 인덱스, RLS 기본 차단 정책이 적용되어 있다 — 2026-04-06
- ✓ 공개 신청 DB는 브라우저 직접 접근이 아니라 Edge Function 경계를 통해 처리해야 한다는 운영 방향이 확정되었다 — 2026-04-06

### Active

- [ ] 운영자는 관리자 전용 경로에서 신청 목록을 최신순으로 조회할 수 있어야 한다
- [ ] 운영자는 이메일, 지갑 주소, 상태 기준으로 신청을 검색하거나 필터링할 수 있어야 한다
- [ ] 운영자는 신청 상세 정보와 동의/상태 타임스탬프를 확인할 수 있어야 한다
- [ ] 운영자는 신청 상태를 변경하고 내부 메모를 저장할 수 있어야 한다
- [ ] 관리자 화면과 데이터 API는 공개 신청 폼과 분리된 인증/서버 경계를 사용해야 한다

### Out of Scope

- 자동 이메일 발송 — 이번 범위는 운영 화면과 상태 관리에 집중하며 알림 자동화는 후속 단계로 미룬다
- 배송 정보 수집 — 현재 신청 단계에서는 필요하지 않고 별도 운영 프로세스로 다룬다
- 온체인 결제/입금 자동 검증 — 외부 연동과 운영 규칙이 추가로 필요해 범위가 커진다
- 대량 일괄 처리 기능 — 초기 운영 규모에서는 단건 검토 플로우가 더 단순하고 안전하다
- 기존 모션 개선 phase 실행 — 이번 마일스톤은 운영 도구 구축에 집중하며 motion polish는 별도 재개가 필요하다

## Context

- 저장소는 Next.js App Router 기반의 정적 단일 페이지 랜딩 사이트다. 핵심 섹션은 `src/components/sections/`, 반복 UI는 `src/components/shared/`, 카피/링크는 `src/lib/`에 분리되어 있다.
- 코드베이스 맵은 `.planning/codebase/`에 생성되어 있으며, 현재 사이트는 `output: "export"` 제약 때문에 일반적인 서버 렌더링 관리자 페이지 패턴을 그대로 쓰기 어렵다.
- `supabase/migrations/20260406_frontier_application_intake.sql`와 `supabase/migrations/20260406_frontier_application_security_hardening.sql`가 적용되어 있어 관리자 기능은 이 스키마를 그대로 사용해야 한다.
- `frontier_applications` 테이블은 `email`, `wallet_address`, `payment_token`, `status`, `status_note`, 동의 버전/시각, 상태 변경 시각을 저장한다.
- 현재 보안 기본값은 `anon`, `authenticated` 역할의 직접 테이블 접근 차단이며, 관리자 기능은 별도 서버 경계를 설계해야 한다.
- 자동 테스트 프레임워크는 없고, 검증 수단은 `npm run lint`, `npm run build`, 수동 운영 시나리오 확인이다.

## Constraints

- **Tech stack**: Next.js 16 + React 19 + Tailwind 4 + Supabase를 유지한다 — 기존 코드와 이미 적용된 DB 구성을 존중해야 한다
- **Deployment**: `output: "export"` 정적 배포를 유지한다 — 관리자 기능도 이 제약 안에서 동작 가능한 구조가 필요하다
- **Security**: 공개 클라이언트가 `frontier_applications`에 직접 접근하면 안 된다 — 현재 RLS와 운영 합의가 이 전제를 가진다
- **Operations**: 관리자는 초기에는 Supabase 대시보드와 새 관리자 페이지를 병행 사용할 수 있어야 한다 — 운영 전환 리스크를 줄여야 한다
- **Scope**: 이번 마일스톤은 신청 검토 화면과 상태 관리에 집중한다 — 자동 메일, 배송, 결제 자동화까지 확장하지 않는다

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 신청 테이블은 `frontier_applications` 단일 테이블로 유지 | 초기 운영 흐름이 단순하고, 상태/메모 중심 검토에는 별도 이벤트 테이블 없이도 충분하다 | ✓ Good |
| 공개 신청 저장은 Edge Function 경계로 제한 | 정적 export 사이트에서 브라우저 직접 DB 쓰기를 열면 보안상 불필요한 위험이 커진다 | ✓ Good |
| 중복 신청은 이메일 1건, 지갑 주소 1건으로 제한 | 운영자가 수동 검토할 때 중복 레코드보다 차단 규칙이 더 단순하고 안전하다 | ✓ Good |
| 관리자 기능은 별도 milestone로 분리 | 기존 motion enhancement와 요구사항 축이 달라 같은 roadmap에 섞으면 추적이 무너진다 | ✓ Good |
| 자동 이메일과 배송 정보는 이번 범위에서 제외 | 우선순위는 운영 검토 화면이며, 후속 의사결정이 필요한 기능을 지금 넣으면 범위가 커진다 | ✓ Good |

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
*Last updated: 2026-04-06 after milestone v1.1 start*
