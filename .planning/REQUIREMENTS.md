# Requirements: XORing Frontier Launch Surface

**Defined:** 2026-04-06
**Core Value:** 운영자가 신청 정보를 안전하게 처리하고 공개 랜딩 경험을 해치지 않는다.

## v1 Requirements

### Admin Access

- [ ] **ADMN-01**: 운영자는 관리자 전용 경로에 접근해 Frontier 신청 운영 화면을 열 수 있다
- [ ] **ADMN-02**: 공개 사용자는 로그인과 allowlist 없이 관리자 경로에서 운영 데이터와 기능을 사용할 수 없다

### Application List

- [ ] **APPL-01**: 운영자는 신청 목록을 `submitted_at` 최신순으로 볼 수 있다
- [ ] **APPL-02**: 운영자는 신청 목록을 상태값 기준으로 필터링할 수 있다
- [ ] **APPL-03**: 운영자는 이메일 또는 지갑 주소 기준으로 신청을 검색할 수 있다

### Application Review

- [ ] **APPL-04**: 운영자는 개별 신청의 이메일, 지갑 주소, 선택 토큰, 동의 버전, 상태 변경 시각을 확인할 수 있다
- [ ] **APPL-05**: 운영자는 신청 상태를 `submitted`, `awaiting_payment`, `payment_confirmed`, `approved`, `rejected` 중 하나로 변경할 수 있다
- [ ] **APPL-06**: 운영자는 신청 검토 시 내부 메모를 저장할 수 있다

### Data & Integration

- [ ] **DATA-01**: 관리자 페이지는 `Supabase Auth` 세션과 `admin_users` allowlist 기반 RLS를 통해 `frontier_applications`를 조회/수정한다
- [ ] **DATA-02**: 관리자 데이터 접근은 공개 사용자에게 닫혀 있어야 하고, 허용된 관리자에게만 필요한 범위의 읽기/수정 권한을 준다

### Delivery Quality

- [ ] **QUAL-04**: 관리자 페이지 변경 후 `npm run lint`와 `npm run build`가 모두 통과한다
- [ ] **QUAL-05**: 개발자는 목록 조회, 검색/필터, 상세 확인, 상태 변경 흐름을 수동으로 검증할 수 있다

## v2 Requirements

### Operations

- **OPER-01**: 운영자는 승인/반려/입금 확인 시 자동 이메일을 발송할 수 있다
- **OPER-02**: 운영자는 배송 정보 수집 단계를 신청 레코드와 연결해 관리할 수 있다
- **OPER-03**: 운영자는 다건 선택 후 일괄 상태 변경을 수행할 수 있다

### Payment Automation

- **PAYM-01**: 시스템은 토큰 입금 여부를 외부 데이터와 대조해 자동으로 판별할 수 있다
- **PAYM-02**: 시스템은 입금 확인 이력을 별도 감사 로그로 남길 수 있다

## Out of Scope

| Feature | Reason |
|---------|--------|
| 자동 이메일 발송 | 운영 상태 관리가 먼저이며 메일 템플릿/전송 정책은 후속 결정이 필요하다 |
| 배송 정보 입력/관리 | 초기 신청 단계 범위를 넘어서는 추가 운영 플로우다 |
| 온체인 입금 자동 검증 | 외부 연동과 검증 규칙 정의가 더 필요하다 |
| 일괄 처리/대시보드 통계 | 초기 운영 규모에서는 단건 검토 UX가 우선이다 |
| 공개 신청 폼 리디자인 | 이번 마일스톤은 관리자 페이지와 운영 경계에 집중한다 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ADMN-01 | Phase 5 | Pending |
| ADMN-02 | Phase 5 | Pending |
| APPL-01 | Phase 6 | Pending |
| APPL-02 | Phase 6 | Pending |
| APPL-03 | Phase 6 | Pending |
| APPL-04 | Phase 6 | Pending |
| APPL-05 | Phase 7 | Pending |
| APPL-06 | Phase 7 | Pending |
| DATA-01 | Phase 5 | Pending |
| DATA-02 | Phase 5 | Pending |
| QUAL-04 | Phase 7 | Pending |
| QUAL-05 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 12 total
- Mapped to phases: 12
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-06*
*Last updated: 2026-04-06 after milestone v1.1 requirements definition*
