# Phase 4 Release Checklist

**Phase:** 04 Hero Intro & Release Readiness  
**Updated:** 2026-03-24  
**Status:** Manual QA pending

## Automated Verification

| Command | Status | Notes |
|---|---|---|
| `npm run lint` | PASS | ESLint exited with code 0 after Hero intro changes |
| `npm run build` | PASS | Next.js static build completed successfully and generated 7 static routes |

## Desktop QA

| Area | Expected | Viewport | Status | Notes |
|---|---|---|---|---|
| `HeroSection` intro | 로고, 링, 다운로드 버튼이 순차적으로 등장한다 | Desktop | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `HeroSection` scrub | 스크롤 시 overlay 전환과 Hero fade-out이 유지된다 | Desktop | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `Header` theme sync | Hero 진행도에 따라 헤더 테마가 light/dark로 전환된다 | Desktop | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `BeyondScreenSection` | reveal 타이밍과 콘텐츠 가독성이 유지된다 | Desktop | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `TwoModesSection` | reveal 이후에도 O/X 토글이 정상 동작한다 | Desktop | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `SocialModeSection` | sticky 레이아웃과 캐러셀이 정상 유지된다 | Desktop | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `PrivateModeSection` | sticky 레이아웃과 캐러셀이 정상 유지된다 | Desktop | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `AIAgentSection` | 카드 reveal 흐름이 자연스럽다 | Desktop | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `ApplicationSection` | 기기 이미지와 CTA 흐름이 자연스럽다 | Desktop | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `PocSection` | 상단, 중단, 하단 블록 reveal이 순서대로 보인다 | Desktop | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `Web3Section` | reveal 이후 레이아웃이 깨지지 않는다 | Desktop | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `PioneerSection` | CTA와 가격 블록 표시가 정상이다 | Desktop | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |

## Mobile QA

| Area | Expected | Viewport | Status | Notes |
|---|---|---|---|---|
| `HeroSection` intro | 로고, 링, 다운로드 버튼이 순차적으로 등장한다 | Mobile | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `HeroSection` scrub | 스크롤 시 overlay 전환과 Hero fade-out이 유지된다 | Mobile | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `Header` theme sync | Hero 진행도에 따라 헤더 테마가 light/dark로 전환된다 | Mobile | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `TwoModesSection` | reveal 이후에도 O/X 토글이 정상 동작한다 | Mobile | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `SocialModeSection` | 캐러셀 스와이프가 정상 동작한다 | Mobile | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `PrivateModeSection` | 캐러셀 스와이프가 정상 동작한다 | Mobile | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `PocSection` | 블록 reveal과 모바일 레이아웃이 정상이다 | Mobile | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| `PioneerSection` | CTA 접근과 하단 배치가 정상이다 | Mobile | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |

## Reduced Motion QA

| Area | Expected | Viewport | Status | Notes |
|---|---|---|---|---|
| `HeroSection` intro | `prefers-reduced-motion: reduce`에서 intro가 재생되지 않고 로고, 링, 버튼이 즉시 보인다 | Desktop + Mobile | PENDING | 코드상 guard 추가 완료, 실제 브라우저 확인 필요 |
| Reveal sections | reduced motion 환경에서 주요 섹션 콘텐츠가 즉시 노출된다 | Desktop + Mobile | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |
| Readability | 모션 비활성화 시 텍스트와 CTA 가독성이 유지된다 | Desktop + Mobile | PENDING | 이 세션에서는 로컬 브라우저 접속 불가 |

## Release Decision

| Decision | Status | Notes |
|---|---|---|
| Release readiness | BLOCKED | 자동 검증은 통과했지만 Desktop, Mobile, Reduced Motion 수동 QA가 아직 완료되지 않음 |
