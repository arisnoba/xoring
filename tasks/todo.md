# XORing 랜딩 페이지 구현 — Todo

## 목표
design/ 스틸컷 기준으로 13개 섹션을 가진 XORing 랜딩 페이지 완성

## 수락 기준
- [ ] 13개 섹션 전부 구현 (design/ 폴더 기준)
- [ ] `npm run build` 정적 빌드 성공
- [ ] `npm run lint` 오류 없음
- [ ] 모바일(375px) / 태블릿(768px) / 데스크탑(1440px) 3개 뷰포트 정상 동작
- [ ] `next/image`에 `unoptimized` 적용 확인

---

## Phase 0: 기반 작업 ✅ (부분 완료)

- [x] 디렉토리 구조: `layout/`, `sections/`, `shared/`
- [x] `src/lib/constants.ts` — 전체 섹션 텍스트 + 카드 데이터
- [x] `src/components/shared/SectionContainer.tsx`
- [x] `src/components/shared/SectionBadge.tsx`
- [x] `src/components/shared/StoreButtons.tsx`
- [x] `src/components/shared/PhoneMockup.tsx`
- [x] `src/components/shared/FeatureCard.tsx`
- [x] `src/components/sections/SocialModeSection.tsx` (새 경로)
- [x] `src/components/layout/Header.tsx` (생성, 미검증)
- [x] `src/app/page.tsx` — 현재 섹션 전체 조립 완료
- [ ] 보일러플레이트 SVG 정리 (`public/file.svg` 등 삭제)

---

## Phase 1: 단순 텍스트 섹션

- [x] `HeroSection.tsx` — `hero 1` + `hero 2` 통합, 스크롤 시 다크 오버레이 전환
- [ ] `ManifestoSection.tsx` — 보류, `hero 2` 오버레이로 흡수 여부 검토
- [x] `BeyondScreenSection.tsx` — 다크 bg + 좌측 텍스트
- [x] `Web3Section.tsx` — 다크 그린 bg + 중앙 텍스트
- [x] `Footer.tsx` — 정책 카피 + 로고

---

## Phase 2: Mode 섹션

- [x] `SocialModeSection.tsx` — 리팩토링 완료
- [x] `PrivateModeSection.tsx` — Figma 기준으로 업데이트
- [ ] GSAP 핀 애니메이션 검증

---

## Phase 3: 중간 복잡도 섹션

- [x] `TwoModesSection.tsx` — O/X 심볼 + 블루 원
- [x] `PioneerSection.tsx` — $499 CTA 섹션
- [x] `ApplicationSection.tsx` — 폰 목업 3개 + 스토어 버튼

---

## Phase 4: 고복잡도 섹션

- [x] `AIAgentSection.tsx` — 4컬럼 AI 에이전트 그리드
- [x] `PocSection.tsx` — 플로우 다이어그램 + 4단계 아이콘 + 카드

---

## Phase 5: 빌드 + 검증

- [ ] `npm run dev` 전체 스크롤 테스트
- [x] `npm run build` 정적 빌드 확인
- [x] `npm run lint` 코드 품질
- [ ] 3개 뷰포트 반응형 테스트

---

## Working Notes

### 현재 상태 (2026-03-20)
- **완료된 파일**: `layout/` 2개, `sections/` 10개, `shared/` 6개, `page.tsx`, `lib/constants.ts`
- **남은 작업**: `ManifestoSection` 분리 여부 검토, `public/file.svg` 등 보일러플레이트 정리, 반응형/스크롤 디테일 보정
- **디자인 메모**: Figma 기준 `section - hero 1`과 `section - hero 2`는 분리 섹션이 아니라 하나의 sticky hero 내부에서 오버레이 전환되는 구조로 구현

### 핵심 제약
- 정적 배포: `next/image`에 항상 `unoptimized` prop
- `"use client"` 필수: GSAP, Swiper, useRef, useEffect 사용 컴포넌트
- 최대 너비: `max-w-[1680px] mx-auto`
- 반응형: Tailwind 유틸리티만 (SCSS에 미디어 쿼리 금지)
- 이미지 없음 → 그라디언트 placeholder 사용

### 색상 팔레트
- 다크 bg: `#0a0a0a` / `#111` / `#1d1d1f`
- 라이트 bg: `#f5f5f7` / `#e5e5e5`
- 액센트 블루: `#3d3df5`
- 서브텍스트: `#555` / `#8a8a8a`

### 이미지 전략 (placeholder)
| 유형 | 클래스 |
|------|--------|
| 다크 배경 | `bg-gradient-to-br from-[#1a1a1a] via-[#2c2c2e] to-[#111]` |
| 라이트 배경 | `from-[#d1d1d6] to-[#e5e5ea]` |
| 그린 배경 | `from-[#0a1a0a] to-[#1a2a1a]` |
| 링 제품 | CSS-only 원형 border + gradient |

---

## Results
- 구현 완료 섹션: `Hero`, `BeyondScreen`, `TwoModes`, `SocialMode`, `PrivateMode`, `AIAgent`, `Application`, `Poc`, `Web3`, `Pioneer`, `Footer`
- 보류 항목: `ManifestoSection` 독립 분리 여부
- 검증 완료: `npm run build`, `npm run lint`
