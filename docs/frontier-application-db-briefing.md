# Frontier Edition 신청 DB 구성 브리핑

작성일: 2026-04-06

## 개요

XO RING 랜딩 페이지의 `Frontier Edition` 신청 모달에서 수집하는 고객 정보를 안전하게 저장하기 위해 Supabase 무료 티어 기준의 신청 DB 구조를 설계하고 적용했습니다.

이번 구성은 신청 접수와 운영 검토를 위한 최소 범위에 집중했습니다. 배송 정보와 자동 이메일 발송은 제외했고, 관리자 페이지는 별도 서버 없이 정적 호스팅 안에서 붙이는 방향으로 확장합니다.

## 이번에 확정한 운영 기준

- 신청 시 수집 정보는 이메일, 지갑 주소, 선택 토큰, 약관/개인정보 동의 이력입니다.
- 배송 정보는 초기 신청 단계에서는 받지 않습니다.
- 중복 신청은 허용하지 않습니다.
- 이메일 1건, 지갑 주소 1건만 허용합니다.
- 사용자는 공개 신청 폼으로 신청만 가능하고, 읽기/수정은 관리자만 처리합니다.
- 관리자는 초기에는 Supabase 대시보드와 정적 `/admin` 페이지를 병행 운영합니다.
- 자동 이메일 발송은 이번 범위에서 제외합니다.
- 공개 폼 악용 방지를 위해 Cloudflare Turnstile 도입을 전제로 합니다.

## 적용 완료 항목

Supabase에 아래 구성을 실제 반영했습니다.

- 신청 테이블 `public.frontier_applications` 생성
- 중복 신청 방지를 위한 이메일/지갑 주소 unique 인덱스 생성
- 신청 상태 관리용 enum 및 타임스탬프 자동 갱신 트리거 추가
- Row Level Security 활성화
- `anon`, `authenticated` 역할의 직접 조회/삽입/수정/삭제 차단 정책 적용
- 보안 advisor 경고 0건 확인

## 저장되는 데이터

### 기본 신청 정보

- `email`
- `wallet_address`
- `payment_token`

### 운영 상태 정보

- `status`
- `status_note`
- `submitted_at`
- `status_changed_at`
- `payment_confirmed_at`
- `reviewed_at`

### 동의 이력

- `terms_version`
- `privacy_version`
- `consented_at`

## 신청 상태 정의

- `submitted` : 신청 접수
- `awaiting_payment` : 입금 대기
- `payment_confirmed` : 입금 확인
- `approved` : 최종 승인
- `rejected` : 반려

## 보안 설계 요약

이번 사이트는 정적 export 기반 랜딩 페이지이므로, 브라우저에서 DB 테이블로 직접 쓰는 구조는 사용하지 않기로 했습니다.

권장 처리 흐름은 아래와 같습니다.

1. 사용자가 랜딩 페이지 신청 폼 작성
2. Cloudflare Turnstile 검증
3. Supabase Edge Function 호출
4. Edge Function이 서버 권한으로 DB 저장

즉, 공개 클라이언트는 테이블에 직접 접근하지 못하고, 서버 역할을 가진 Edge Function만 신청 데이터를 저장하는 구조입니다.

## 현재 제외한 범위

- 배송지 정보 수집
- 자동 이메일 발송
- 별도 서버 runtime 기반 관리자 웹 UI
- 신청자 본인 조회 기능
- 결제/온체인 검증 자동화

## 다음 단계 제안

### 1. 신청 API 연결

- Supabase Edge Function 생성
- 입력값 검증 추가
- 중복 신청 에러 메시지 정리
- Turnstile 검증 연결

### 2. 프론트 연결

- `FrontierEditionModalFlow.tsx`에서 실제 제출 처리
- 제출 성공/실패 UX 정리
- 약관/개인정보 버전값 함께 전송

### 3. 관리자 접근 확장

- `admin_users` allowlist와 RLS 정책 추가
- 정적 `/admin` 로그인 페이지 연결
- 최신 신청 조회용 최소 관리자 셸 구성

## 참고 파일

- `supabase/migrations/20260406_frontier_application_intake.sql`
- `supabase/migrations/20260406_frontier_application_security_hardening.sql`
