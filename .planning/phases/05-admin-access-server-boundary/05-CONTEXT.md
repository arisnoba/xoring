# Phase 5: Admin Access & Server Boundary - Context

**Gathered:** 2026-04-06
**Status:** Ready for planning

<domain>
## Phase Boundary

공개 랜딩과 분리된 관리자 접근 구조와 안전한 서버 데이터 경계를 마련한다. 이 phase의 범위는 관리자 로그인 방식, `/admin` 경로 배치, 서버 경계를 통한 `frontier_applications` 조회/수정 구조 확정까지이며, 실제 목록/상세 UI 완성과 상태 변경 UX 자체는 다음 phase에서 다룬다.

</domain>

<decisions>
## Implementation Decisions

### 관리자 인증 방식
- **D-01:** 관리자 로그인은 `Supabase Auth`의 이메일 로그인으로 처리한다.
- **D-02:** 로그인 후 접근 가능한 사용자는 허용된 관리자 이메일 allowlist로 제한한다.
- **D-03:** 공유 비밀번호 방식이나 별도 외부 인증 서비스는 Phase 5 범위에서 도입하지 않는다.

### 관리자 페이지 배치
- **D-04:** 관리자 기능은 현재 Next.js 저장소 안의 `/admin` 경로로 구현한다.
- **D-05:** 공개 랜딩과 운영 도구는 같은 코드베이스를 공유하되, 관리자 기능이 필요한 구간만 별도 서버/동적 경계로 분리한다.
- **D-06:** Supabase 대시보드만으로 운영을 대체하지 않고, 이번 milestone 목표대로 별도 관리자 페이지를 만든다.

### 데이터 처리 경계
- **D-07:** 브라우저는 `frontier_applications` 테이블에 직접 접근하지 않고 Next.js 서버 경계만 호출한다.
- **D-08:** 관리자용 조회/수정은 Next.js 서버 경계(route handler 또는 server action)에서 `Supabase service role`을 사용해 처리한다.
- **D-09:** RLS 기본 차단 정책은 유지하고, service role은 서버 전용 환경 변수로만 사용한다.

### the agent's Discretion
- Next.js 서버 경계의 구체 형태는 `route handler`와 `server action` 중 현재 코드 구조와 배포 제약에 더 적합한 쪽으로 planner와 implementer가 결정한다.
- 관리자 allowlist 저장 위치는 환경 변수, 별도 설정 테이블, 서버 상수 중 보안과 운영성을 만족하는 최소 구현으로 선택할 수 있다.
- `/admin` 레이아웃의 세부 정보 구조, 로딩 상태, 오류 메시지 형태는 이후 phase UI 구현에서 표준 운영 도구 스타일로 정한다.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Milestone scope and requirements
- `.planning/PROJECT.md` — 현재 milestone 목표, 핵심 제약, 보안/운영 범위를 정의한다.
- `.planning/REQUIREMENTS.md` — `ADMN-01`, `ADMN-02`, `DATA-01`, `DATA-02`의 범위를 고정한다.
- `.planning/ROADMAP.md` — Phase 5 목표, requirement 매핑, success criteria를 정의한다.

### Database and intake constraints
- `supabase/migrations/20260406_frontier_application_intake.sql` — `frontier_applications` 스키마, 상태 enum, unique 인덱스, timestamp trigger를 정의한다.
- `supabase/migrations/20260406_frontier_application_security_hardening.sql` — RLS 기본 차단 정책과 trigger function hardening을 정의한다.
- `docs/frontier-application-db-briefing.md` — 신청 운영 기준, 이번 범위에 포함/제외된 항목, 권장 서버 경계를 요약한다.

### Existing product flow
- `src/components/sections/FrontierEditionModalFlow.tsx` — 현재 공개 신청 UX가 어떤 필드를 받고 어떤 상태 흐름을 전제하는지 보여준다.
- `next.config.ts` — `output: "export"` 정적 배포 제약을 정의한다.
- `.planning/codebase/INTEGRATIONS.md` — 현재 저장소에 인증/외부 API/서버 경계가 없다는 baseline을 정리한다.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/button.tsx`, `src/components/ui/input.tsx`, `src/components/ui/dialog.tsx`, `src/components/ui/checkbox.tsx`: 이미 도입된 shadcn 계열 UI를 관리자 화면에도 재사용할 수 있다.
- `src/lib/utils.ts`: `cn()` 유틸이 있어 `/admin` 화면의 조건부 스타일 조합에 그대로 사용할 수 있다.
- `src/components/layout/Header.tsx`: 현재 공개 랜딩 헤더 패턴이 있으나 관리자 페이지는 이 헤더를 그대로 재사용하지 않는 편이 더 자연스럽다.

### Established Patterns
- 현재 저장소에는 auth/session/middleware 패턴이 전혀 없다. 관리자 인증은 새 경계를 처음 도입하는 작업이다.
- 현재 앱은 정적 export를 전제로 설계되어 있어, 관리자 기능은 공개 랜딩과 다른 실행 경로를 의식해야 한다.
- UI는 Tailwind와 기존 shadcn 기반 primitive 위에 조립하는 방식이 자연스럽다.

### Integration Points
- `/admin` 경로는 `src/app/admin/` 아래에 새로 추가하는 구성이 가장 자연스럽다.
- 관리자 데이터 경계는 Next.js 서버 경계에서 Supabase service role을 사용하도록 `src/app/api/admin/...` 또는 동등한 서버 전용 모듈로 연결할 수 있다.
- Phase 6 목록/상세 UI는 Phase 5에서 확정한 인증/데이터 경계 위에 얹히므로, 이 phase에서 데이터 shape와 접근 흐름을 먼저 고정해야 한다.

</code_context>

<specifics>
## Specific Ideas

- 로그인은 새 외부 서비스 없이 `Supabase Auth 이메일 로그인 + 관리자 이메일 allowlist`로 최소 구성한다.
- 관리자 도구는 별도 앱으로 찢지 않고 현재 저장소 안 `/admin`에서 운영한다.
- 클라이언트가 직접 Supabase를 치지 않고, Next.js 서버 경계가 관리자 데이터 접근의 단일 진입점이 된다.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-admin-access-server-boundary*
*Context gathered: 2026-04-06*
