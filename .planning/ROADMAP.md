# Roadmap: XORing Frontier Launch Surface

## Overview

이 로드맵은 기존 XORing 정적 랜딩 사이트 위에 `Frontier Edition` 신청 운영 관리자 페이지를 추가하는 경로를 정의한다. 이미 적용된 Supabase 신청 스키마와 RLS 기본 차단 정책을 존중하면서, 먼저 관리자 접근 경계와 서버 데이터 계층을 세우고, 그 위에 목록/상세 UI를 만들고, 마지막으로 상태 변경과 검증까지 마무리한다.

## Phases

**Phase Numbering:**
- Integer phases (5, 6, 7): Planned milestone work continuing from previous milestone numbering
- Decimal phases (5.1, 5.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 5: Admin Access & Server Boundary** - 관리자 전용 접근 구조와 신청 데이터 서버 경계를 만든다
- [ ] **Phase 6: Application Review Workspace** - 신청 목록, 검색/필터, 상세 확인 UI를 만든다
- [ ] **Phase 7: Status Mutation & Release Verification** - 상태 변경, 메모 저장, 검증을 마무리한다

## Phase Details

### Phase 5: Admin Access & Server Boundary
**Goal**: 공개 랜딩과 분리된 관리자 접근 구조와 안전한 서버 데이터 경계를 마련한다
**Depends on**: Nothing (first phase in this milestone)
**Requirements**: ADMN-01, ADMN-02, DATA-01, DATA-02
**Success Criteria** (what must be TRUE):
  1. 운영자는 관리자 전용 경로로 진입할 수 있고 공개 사용자에게는 해당 경로가 열리지 않는다.
  2. 관리자 페이지는 브라우저 직접 테이블 접근이 아니라 서버 경계를 통해 신청 데이터를 조회한다.
  3. 검색/상태 파라미터와 수정 payload는 서버 경계에서 검증된다.
  4. 현재 `frontier_applications` RLS 정책을 깨지 않고 관리자 기능을 연결할 수 있다.
**Plans**: 2 plans
Plans:
- [ ] 05-01-PLAN.md — 관리자 접근 전략과 경로 구조를 확정한다
- [ ] 05-02-PLAN.md — 신청 목록/상세 조회용 서버 데이터 경계를 구현한다
**UI hint**: yes

### Phase 6: Application Review Workspace
**Goal**: 운영자가 신청을 탐색하고 검토할 수 있는 목록/상세 작업 화면을 제공한다
**Depends on**: Phase 5
**Requirements**: APPL-01, APPL-02, APPL-03, APPL-04
**Success Criteria** (what must be TRUE):
  1. 운영자는 신청 목록을 최신순으로 볼 수 있다.
  2. 운영자는 상태 필터와 이메일/지갑 주소 검색으로 원하는 신청을 좁힐 수 있다.
  3. 운영자는 선택한 신청의 핵심 필드와 동의/상태 타임스탬프를 상세 화면에서 확인할 수 있다.
  4. 목록과 상세 화면은 초기 운영 규모에서 무리 없이 사용할 수 있는 단순한 관리자 UX를 제공한다.
**Plans**: 2 plans
Plans:
- [ ] 06-01-PLAN.md — 신청 목록, 검색, 상태 필터 UI를 구현한다
- [ ] 06-02-PLAN.md — 신청 상세 패널과 데이터 바인딩을 구현한다
**UI hint**: yes

### Phase 7: Status Mutation & Release Verification
**Goal**: 운영자가 상태와 메모를 변경하고, 릴리스 가능한 수준으로 검증을 완료한다
**Depends on**: Phase 6
**Requirements**: APPL-05, APPL-06, QUAL-04, QUAL-05
**Success Criteria** (what must be TRUE):
  1. 운영자는 신청 상태를 허용된 상태값으로 변경할 수 있다.
  2. 운영자는 상태 변경과 함께 내부 메모를 저장할 수 있다.
  3. 상태 변경 후 목록과 상세 화면에 최신 값이 일관되게 반영된다.
  4. 프로젝트는 관리자 기능 추가 후에도 `npm run lint`와 `npm run build`를 통과하고, 핵심 운영 시나리오를 수동 검증할 수 있다.
**Plans**: 2 plans
Plans:
- [ ] 07-01-PLAN.md — 상태 변경/메모 저장 mutation 흐름을 구현한다
- [ ] 07-02-PLAN.md — lint/build 및 운영 시나리오 수동 검증을 완료한다
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 5. Admin Access & Server Boundary | 0/2 | Not started | - |
| 6. Application Review Workspace | 0/2 | Not started | - |
| 7. Status Mutation & Release Verification | 0/2 | Not started | - |
