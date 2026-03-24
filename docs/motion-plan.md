# XORing 랜딩 페이지 — 섹션 등장 모션 계획

## 기술 스택 검토 및 추천

### 현재 프로젝트에 설치된 애니메이션 라이브러리

| 라이브러리 | 버전 | 현재 사용처 | 비고 |
|---|---|---|---|
| **GSAP + ScrollTrigger** | ^3.14.2 | `HeroSection` (스크롤 연동 오버레이 전환) | 스크롤 기반 scrub 애니메이션에 최적 |
| **motion** (Framer Motion) | ^12.38.0 | 미사용 (설치만 됨) | 선언적 React 애니메이션에 최적 |
| **Swiper** | ^12.1.2 | `ModeCardCarousel` | 캐러셀 전용 |

### 추천: `motion` (Framer Motion) 기반 통합

| 기준 | GSAP ScrollTrigger | motion (Framer Motion) |
|---|---|---|
| **구현 복잡도** | `useRef` + `useEffect` + cleanup 필수 | `<motion.div>` 선언적 래핑만으로 완료 |
| **Server Component 호환** | ❌ 반드시 `'use client'` 전환 필요 | ❌ 동일하게 `'use client'` 필요 |
| **번들 사이즈** | GSAP 이미 로드됨, 추가 없음 | motion 이미 `package.json`에 있음, 추가 없음 |
| **스크롤 연동 정밀도** | ⭐⭐⭐ scrub 타임라인 최강 | ⭐⭐ `whileInView`로 충분 (등장 모션에는 과잉 정밀도 불필요) |
| **코드 변경량** | 많음 (모든 섹션에 ref + effect 추가) | **적음** (JSX 태그만 교체) |

> [!IMPORTANT]
> **결론: 등장(reveal) 모션에는 `motion`(Framer Motion)을 사용하고, 기존 `HeroSection`의 스크롤 scrub 애니메이션은 GSAP을 그대로 유지합니다.**

---

## 공통 유틸리티 설계

### `src/components/shared/RevealOnScroll.tsx` (신규)

모든 섹션에서 재사용할 래퍼 컴포넌트를 하나 만듭니다.

```tsx
'use client';
import { motion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

interface Props {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;         // 초 단위
  duration?: number;      // 기본 0.7s
  once?: boolean;         // 기본 true (한 번만 재생)
  amount?: number;        // viewport 진입 비율 (0~1), 기본 0.15
  as?: 'div' | 'section' | 'article' | 'span'; // 렌더링 태그
}

export default function RevealOnScroll({
  children, className, delay = 0, duration = 0.7,
  variants = defaultVariants, once = true, amount = 0.15, as = 'div',
}: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Tag>
  );
}
```

### 모션 프리셋 상수 — `src/lib/motion.ts` (신규)

```ts
import type { Variants } from 'motion/react';

// 아래에서 위로 올라오며 나타남 (기본)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

// 제자리에서 서서히 나타남
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// 좌 → 우 슬라이드
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

// 아래에서 스케일과 함께 올라옴 (제품 이미지용)
export const scaleUp: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1 },
};
```

---

## 섹션별 모션 상세 계획

### 1. HeroSection

> 기존 GSAP ScrollTrigger 스크롤 scrub 애니메이션을 **그대로 유지**합니다.

| 요소 | 현재 | 추가할 모션 |
|---|---|---|
| 로고 | 정적 | `fadeUp` — 페이지 최초 로드 시 (delay: 0) |
| 제품 (RingArtwork) | 정적 | `scaleUp` — 페이지 최초 로드 시 (delay: 0.15) |
| 다운로드 버튼 | 정적 | `fadeUp` — (delay: 0.3) |
| 오버레이 타이틀 | GSAP scrub으로 등장 | **변경 없음** |
| 오버레이 서브카피 | GSAP scrub으로 등장 | **변경 없음** |

> [!NOTE]
> Hero 초기 등장 모션은 `motion`의 `initial` + `animate` (viewport 무관, 마운트 즉시)를 사용합니다. 스크롤 오버레이는 기존 GSAP 유지.

---

### 2. BeyondScreenSection

| 요소 | 모션 | delay |
|---|---|---|
| 타이틀 (`h2`) | `fadeUp` | 0 |
| 서브카피 (각 `<p>` 문단) | `fadeUp` | 0.1 × index |

---

### 3. TwoModesSection

| 요소 | 모션 | delay |
|---|---|---|
| 타이틀 | `fadeUp` | 0 |
| 제품 (링 이미지 + 원형 배경) | `scaleUp` | 0.15 |
| 모드 스위치 버튼 그룹 | `fadeUp` | 0.3 |

---

### 4. SocialModeSection / PrivateModeSection

| 요소 | 모션 | delay |
|---|---|---|
| SectionBadge | `fadeUp` | 0 |
| 링 이미지 (`mode-ring`) | `scaleUp` | 0.1 |
| 타이틀 (`h2`) | `fadeUp` | 0.15 |
| 서브카피 (`p`) | `fadeUp` | 0.2 |
| 캐러셀 (`ModeCardCarousel`) | `fadeUp` | 0.3 |

---

### 5. AIAgentSection

| 요소 | 모션 | delay |
|---|---|---|
| 뱃지 (`AI AGENT`) | `fadeUp` | 0 |
| 타이틀 | `fadeUp` | 0.1 |
| 서브카피 | `fadeUp` | 0.15 |
| 에이전트 카드 (4장) | `scaleUp` | 0.1 × index (0, 0.1, 0.2, 0.3) |

> [!TIP]
> 에이전트 카드에 순차 딜레이를 줘서 왼쪽→오른쪽으로 차례대로 올라오는 "웨이브" 효과를 연출합니다.

---

### 6. ApplicationSection

| 요소 | 모션 | delay |
|---|---|---|
| 폰 이미지 | `scaleUp` | 0 |
| 뱃지 (`APPLICATION`) | `fadeUp` | 0.1 |
| 타이틀 | `fadeUp` | 0.15 |
| 서브카피 | `fadeUp` | 0.2 |
| 다운로드 버튼 | `fadeUp` | 0.3 |
| 안내문 (하단 `*`) | `fadeIn` | 0.35 |

---

### 7. PocSection

PocSection은 3개의 독립 블록으로 구성되어 있으므로, 각 블록이 뷰포트에 진입할 때 개별적으로 트리거됩니다.

**블록 1 — 상단 (타이틀 + 이미지)**

| 요소 | 모션 | delay |
|---|---|---|
| 뱃지 + 타이틀 + 서브카피 | `fadeUp` | 0, 0.1, 0.15 |
| 대시보드 이미지 | `scaleUp` | 0.2 |

**블록 2 — 중간 (PoC 프로세스)**

| 요소 | 모션 | delay |
|---|---|---|
| 카피 (`If a computer…`) | `fadeUp` | 0 |
| Steps (4개 아이콘) | `fadeUp` | 0.1 × index |
| 하단 카드 3장 | `fadeUp` | 0.1 × index |

**블록 3 — 하단 (앱 안내 + 폰 이미지)**

| 요소 | 모션 | delay |
|---|---|---|
| 카피 (`Prove your value…`) | `fadeUp` | 0 |
| 폰 이미지 | `scaleUp` | 0.15 |

---

### 8. Web3Section

| 요소 | 모션 | delay |
|---|---|---|
| 타이틀 | `fadeUp` | 0 |
| 서브카피 (각 `<p>` 문단) | `fadeUp` | 0.12 × index |

---

### 9. PioneerSection

| 요소 | 모션 | delay |
|---|---|---|
| 제품 (RingArtwork) | `scaleUp` | 0 |
| 로고 | `fadeIn` | 0.15 |
| 타이틀 | `fadeUp` | 0.1 |
| 서브카피 | `fadeUp` | 0.2 |
| 가격 (`$499`) | `fadeUp` | 0.25 |
| CTA 버튼 | `fadeUp` | 0.3 |

---

## 구현 시 주의사항

### `'use client'` 전환 필요 목록

현재 Server Component인 섹션들에 `RevealOnScroll`을 도입하면 **해당 섹션 파일에 `'use client'`를 추가**해야 합니다.

| 파일 | 현재 | 변경 |
|---|---|---|
| `BeyondScreenSection.tsx` | Server | → Client |
| `SocialModeSection.tsx` | Server | → Client |
| `PrivateModeSection.tsx` | Server | → Client |
| `AIAgentSection.tsx` | Server | → Client |
| `ApplicationSection.tsx` | Server | → Client |
| `PocSection.tsx` | Server | → Client |
| `Web3Section.tsx` | Server | → Client |
| `PioneerSection.tsx` | Server | → Client |

> [!WARNING]
> 이 프로젝트는 `output: "export"` (정적 배포)이므로, 모든 컴포넌트가 결국 클라이언트에서 실행됩니다. Server Component → Client Component 전환에 따른 SEO/성능 손실은 **없습니다**.

### 성능 가이드라인

- `once: true` 를 기본으로 사용하여 한 번 등장한 요소는 다시 애니메이션하지 않음
- `amount: 0.15` (요소의 15%가 뷰포트에 들어오면 트리거)
- `duration: 0.7s` 통일 (일관된 리듬감)
- 지나치게 긴 delay 체인은 피함 (최대 delay ≤ 0.4s)
- `will-change` 는 motion 라이브러리가 자동 관리하므로 수동 지정 불필요

### 접근성

- `prefers-reduced-motion` 미디어 쿼리 대응: motion 라이브러리에 `reducedMotion="user"` prop 전역 세팅
- 모션이 콘텐츠 가독성을 방해하지 않도록 opacity 값의 초기값은 0 (완전 투명)에서 시작

---

## 구현 순서 (권장)

1. `RevealOnScroll.tsx` + `motion.ts` 유틸리티 생성
2. 간단한 섹션부터 적용 (BeyondScreen → Web3 → Pioneer)
3. 복잡한 섹션 적용 (AIAgent → Application → Poc)
4. Mode 섹션 적용 (Social → Private)
5. TwoModes 섹션 적용
6. Hero 초기 로드 모션 추가 (기존 GSAP과 공존)
7. 전체 테스트 및 타이밍 조정
