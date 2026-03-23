# XORing 랜딩 페이지 — 구현 계획서

> 최종 수정: 2026-03-20
> 담당: AI 구현 + 사용자 검토

---

## 1. 현황 파악

| 항목 | 상태 |
|------|------|
| 프로젝트 기반 (Pretendard, SCSS, static export) | ✅ 완료 |
| `SocialModeSection` (기존) | ✅ 완료 (신 경로로 이전됨) |
| 공유 컴포넌트 5종 | ✅ 완료 |
| `Header`, 주요 섹션 11종 | ✅ 구현 완료 |
| `ManifestoSection` | 보류 (Hero 오버레이로 흡수) |
| 세부 디테일 보정 | 진행 중 |
| `page.tsx` 조립 | ✅ 완료 |

---

## 2. 파일 구조 (목표 상태)

```
src/
  components/
    layout/
      Header.tsx        ✅ 생성됨
      Footer.tsx        ✅
    sections/
      HeroSection.tsx         ✅
      ManifestoSection.tsx    보류
      BeyondScreenSection.tsx ✅
      TwoModesSection.tsx     ✅
      SocialModeSection.tsx   ✅
      PrivateModeSection.tsx  ✅
      AIAgentSection.tsx      ✅
      ApplicationSection.tsx  ✅
      PocSection.tsx          ✅
      Web3Section.tsx         ✅
      PioneerSection.tsx      ✅
    shared/
      SectionContainer.tsx ✅
      SectionBadge.tsx     ✅
      FeatureCard.tsx      ✅
      StoreButtons.tsx     ✅
      PhoneMockup.tsx      ✅
  lib/
    constants.ts ✅
```

---

## 3. 구현 우선순위

### 우선 처리 (블로커)
1. **세부 디테일 보정** — Figma 대비 간격/타이포/배경 밀도 조정
2. **모바일/태블릿 미세 조정** — 카드 overflow와 텍스트 줄바꿈 확인
3. **ManifestoSection 분리 여부 결정** — Hero 오버레이 유지 또는 독립 섹션화

### 그 다음
4. `PocSection.tsx` 디테일 다이어그램 보강
5. `SocialModeSection.tsx` / `PrivateModeSection.tsx` 비주얼 보강
6. `ApplicationSection.tsx` 폰 화면 디테일 보강

### 마지막 (복잡)
7. 전 섹션 최종 polish

## 3.1 현재 구현 완료 목록

- `HeroSection`
- `BeyondScreenSection`
- `TwoModesSection`
- `SocialModeSection`
- `PrivateModeSection`
- `AIAgentSection`
- `ApplicationSection`
- `PocSection`
- `Web3Section`
- `PioneerSection`
- `Footer`

---

## 4. 각 섹션 상세 스펙

### 4.1 HeroSection
- Figma의 `section - hero 1`과 `section - hero 2`를 하나의 섹션으로 구현
- 전체 높이: 약 `200vh` 이상, 내부는 `sticky top-0 h-screen`
- 베이스 레이어: 라이트 `#f5f5f7`, 2컬럼 (좌 로고 + 스토어 버튼 / 우 링 비주얼)
- 스크롤 진행 시 다크 오버레이가 점진적으로 올라오며 `hero 2` 카피와 블러 링 등장
- 우측 링은 실제 에셋 또는 CSS 비주얼로 구현, 모바일에선 중앙 정렬
- 패딩 상단: `pt-20 lg:pt-24`

### 4.2 ManifestoSection
- 현재 Figma 해석상 독립 섹션이 아니라 Hero 오버레이 상태에 가까움
- 필요 시 후속 구현에서 별도 섹션으로 재분리 여부 검토

### 4.3 BeyondScreenSection
- 배경: 다크 `#111`
- 레이아웃: 좌측 텍스트 + 우측 그라디언트 이미지
- badge: "BEYOND THE SCREEN"
- 높이: `min-h-[80vh]`

### 4.4 TwoModesSection
- 배경: 화이트 또는 `#f5f5f7`
- 중앙: 블루(#3d3df5) 큰 원 위에 링 배치
- 좌우: O 심볼(Social) / X 심볼(Private)
- 높이: `min-h-screen`

### 4.5 AIAgentSection
- 배경: 다크 `#0a0a0a`
- 레이아웃: 4컬럼 그리드 (각 컬럼 = PhoneMockup + 제목 + 설명)
- badge: "O LIFESTYLE PACEMAKER"
- 모바일: 1컬럼, 태블릿: 2컬럼

### 4.6 ApplicationSection
- 배경: 라이트 `#f5f5f7`
- 레이아웃: 2컬럼 (좌: 겹친 폰 3개, 우: 텍스트 + StoreButtons)
- badge: "O APP"

### 4.7 PocSection (가장 복잡)
- 배경: 다크 `#0a0a0a`
- 5개 하위 영역:
  1. 상단 헤드라인 블록
  2. 플로우 다이어그램 (→ 화살표 연결)
  3. 인용문 텍스트
  4. 4단계 아이콘 플로우
  5. 3개 정보 카드 + 하단 폰 목업

### 4.8 Web3Section
- 배경: 다크 그린 `#0a1a0a`
- 중앙 정렬, 헤드라인 + 기능 목록

### 4.9 PioneerSection
- 배경: `#1d1d1f`
- 2컬럼: 좌(링+로고) / 우(텍스트 + $499 + Coming Soon 버튼)

### 4.10 Footer
- 배경: 검정 `#000`
- 2컬럼: 좌(브랜드+태그라인) / 우(링크들)
- 하단: copyright

---

## 5. 공통 구현 패턴

```tsx
// 모든 섹션 기본 골격
<section id="..." className="relative w-full [min-height] [bg-color] py-20 px-4 md:px-8 lg:px-16">
  <SectionContainer>
    <SectionBadge label="..." icon="o" variant="dark" />
    <h2 className="text-5xl md:text-7xl font-black tracking-tight ...">...</h2>
    ...
  </SectionContainer>
</section>
```

---

## 6. 검증 체크리스트

각 Phase 완료 시:
- [ ] `npm run dev` — 브라우저에서 전체 스크롤 확인
- [x] `npm run build` — 정적 빌드 성공
- [x] `npm run lint` — 오류 없음
- [ ] 3개 뷰포트: 375px / 768px / 1440px

---

## 7. 리스크 & 결정사항

| 리스크 | 대응 |
|--------|------|
| `next/image` 정적 배포 미지원 | `unoptimized` prop 필수 |
| Swiper SSR 오류 | `"use client"` 보장 |
| GSAP ScrollTrigger 다중 인스턴스 | 각 컴포넌트에서 `registerPlugin` |
| 이미지 없음 | 그라디언트 placeholder + `data-placeholder` 속성 |
