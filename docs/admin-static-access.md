# Admin Access on Static Hosting

## Decision

현재 호스팅이 정적 업로드만 가능하므로, 관리자 기능도 같은 Next.js 정적 앱 안의 `/admin` 경로로 유지한다.

- 별도 Node runtime 없음
- 별도 `/api/admin` 서버 경계 없음
- 로그인은 Supabase Auth 이메일 magic link
- 관리자 권한은 `admin_users` 테이블과 RLS로 판정
- 신청 데이터 읽기는 브라우저에서 직접 하되, `authenticated` + 관리자 allowlist 조건을 통과한 세션만 허용

## Required Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

이 두 값은 공개 클라이언트에서 사용되므로 `NEXT_PUBLIC_` prefix를 유지한다.

## Required Database Setup

새 migration `supabase/migrations/20260406_frontier_admin_static_access.sql`를 적용한다.

이 migration은 아래를 수행한다.

1. `public.admin_users` allowlist 테이블 생성
2. 로그인한 사용자가 자기 allowlist row만 읽을 수 있는 RLS 정책 추가
3. `frontier_applications`에 대해 관리자만 `select` 가능한 정책 추가
4. 이후 상태/메모 변경을 위해 관리자 `update(status, status_note)` 권한까지 미리 열어 둠

## Admin Allowlist Operation

관리자 권한은 환경 변수나 프런트 코드가 아니라 `public.admin_users` 테이블에서 관리한다.

예시:

```sql
insert into public.admin_users (email, full_name)
values ('admin@example.com', 'XO Ring Ops');
```

권한 중지:

```sql
update public.admin_users
set is_active = false
where email = 'admin@example.com';
```

## Route Flow

1. 운영자가 `/admin/login` 접속
2. 이메일 입력 후 magic link 요청
3. 이메일 링크가 `/admin/auth/callback`으로 복귀
4. 브라우저가 세션을 확정
5. `/admin`에서 `admin_users`와 `frontier_applications`를 직접 조회

## What This Solves

- 정적 호스팅만으로도 언제든 `/admin` 접근 가능
- 별도 서버 비용/운영 없이 로그인과 최소 관리자 읽기 흐름 확보
- 공개 사용자는 anon 상태라 `frontier_applications`에 접근 불가
- 로그인했더라도 `admin_users` allowlist에 없으면 데이터 조회 불가

## Tradeoffs

- 서버에서 숨기는 관리자 URL 자체는 없다. `/admin` 페이지 셸은 누구나 열 수 있지만 데이터는 보호된다.
- service role 기반 서버 검증보다 보안 경계가 얇다. 대신 현재 제약에서는 RLS가 핵심 방어선이다.
- 상태 변경/메모 저장 UI를 추가할 때도 모든 변경은 RLS와 제한된 column grant 전제 위에서 설계해야 한다.

## Verification

- `npm run lint`
- `npm run build`
- allowlist에 없는 이메일 로그인 후 `/admin`에서 데이터가 보이지 않는지 확인
- allowlist에 있는 이메일 로그인 후 최신 신청 목록이 보이는지 확인
- 정적 배포 산출물 `out/`에 `/admin`, `/admin/login`, `/admin/auth/callback` 페이지가 포함되는지 확인
