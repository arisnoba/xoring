# XORing 랜딩 페이지 — 섹션 등장 모션 계획

## 기술 스택 검토 및 추천

### 현재 프로젝트에 설치된 애니메이션 라이브러리

| 라이브러리 | 버전 | 현재 사용처 | 비고 |
|---|---|---|---|
| **GSAP + ScrollTrigger** | ^3.14.2 | `HeroSection` (스크롤 연동 오버레이 전환) | 스크롤 기반 scrub 애니메이션에 최적 |
| **motion** (Framer Motion) | ^12.38.0 | 미사용 (설치만 됨) | 선언적 React 애니메이션에 최적 |
| **Swiper** | ^12.1.2 | `ModeCardCarousel` | 캐러셀 전용 |

### 추천: motion + GSAP 역할 분업

| 역할 | 라이브러리 | 이유 |
|---|---|---|
| **등장 1회 reveal** | motion (`whileInView`) | 선언적, JSX 태그 래핑만으로 완료, cleanup 불필요 |
| **스크롤 scrub 타임라인** | GSAP ScrollTrigger | scrub 정밀도 최강, HeroSection에서 이미 사용 중 |

> [!IMPORTANT]
> **핵심 원칙: "같은 DOM 노드의 같은 CSS 속성을 두 라이브러리가 동시에 만지지 않는다."**
> 등장(reveal) 모션은 motion, 스크롤 연동 scrub은 GSAP — 역할만 나누면 공존에 문제 없습니다.
>
> [!TIP]
> **Server Component 유지가 이 설계의 핵심 장점입니다.**
> `RevealOnScroll`만 `'use client'` 래퍼 컴포넌트로 만들면, 부모 섹션(`BeyondScreenSection`, `SocialModeSection`, `PrivateModeSection` 등)은 **서버 컴포넌트를 그대로 유지**할 수 있습니다. GSAP을 등장 모션으로 쓰면 각 섹션 파일 자체에 `useRef` + `useEffect`가 필요해져 모든 섹션이 클라이언트 컴포넌트로 전환되어야 합니다.

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

// motion 객체를 string으로 인덱싱하면 TypeScript 에러가 발생하므로 명시적 맵핑 사용
const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  span: motion.span,
} as const;

export default function RevealOnScroll({
  children, className, delay = 0, duration = 0.7,
  variants = defaultVariants, once = true, amount = 0.15, as = 'div',
}: Props) {
  const Tag = motionTags[as];
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

> HeroSection은 이미 `'use client'` + GSAP 환경이므로 **초기 등장 모션도 GSAP으로 처리**합니다.
> motion 라이브러리를 추가하면 불필요한 복잡도만 늘어납니다.

| 요소 | 현재 | 추가할 모션 |
|---|---|---|
| 로고 | 정적 | GSAP `from` — 페이지 최초 로드 시 (delay: 0) |
| 제품 (RingArtwork) | 정적 | GSAP `from` — 페이지 최초 로드 시 (delay: 0.15) |
| 다운로드 버튼 | 정적 | GSAP `from` — (delay: 0.3) |
| 오버레이 타이틀 | GSAP scrub으로 등장 | **변경 없음** |
| 오버레이 서브카피 | GSAP scrub으로 등장 | **변경 없음** |

기존 `useEffect` 안에 scroll timeline과 **별도 one-shot 타임라인**을 추가합니다.

```tsx
// useEffect 내부, gsap.context 안에서 scroll timeline 생성 이전에 추가
const introTl = gsap.timeline();
introTl
  .from(introLeftRef.current.querySelector('.hero-logo'), {
    opacity: 0, y: 40, duration: 0.7, ease: 'power2.out',
  })
  .from(introRingRef.current, {
    opacity: 0, y: 60, scale: 0.92, duration: 0.7, ease: 'power2.out',
  }, 0.15)
  .from(introLeftRef.current.querySelector('.hero-store-buttons'), {
    opacity: 0, y: 40, duration: 0.7, ease: 'power2.out',
  }, 0.3);
```

> [!NOTE]
> `gsap.from()`은 지정한 상태에서 현재 상태로 애니메이션합니다 (초기값 → 자연값).
> scroll scrub timeline과 독립적으로 실행되며 서로 간섭하지 않습니다.
> 단, intro 요소에 `.hero-logo`, `.hero-store-buttons` 같은 선택자용 className을 추가해야 합니다.

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

> **래핑 구조 주의**: 원형 배경 `<div>`와 링 이미지 `<div>`는 DOM에서 sibling 관계입니다.
> 두 요소를 함께 감싸는 외부 wrapper(`relative mt-14 flex ...`)를 RevealOnScroll로 래핑하면 둘 다 함께 애니메이션됩니다.
>
> ```tsx
> <RevealOnScroll variants={scaleUp} delay={0.15}>
>   <div className="relative mt-14 flex w-full items-center justify-center md:mt-16">
>     <div className="... rounded-full" ... />   {/* 배경 원 */}
>     <div className="absolute z-10 ...">        {/* 링 이미지 */}
>       ...
>     </div>
>   </div>
> </RevealOnScroll>
> ```

---

### 4. SocialModeSection / PrivateModeSection

| 요소 | 모션 | delay |
|---|---|---|
| SectionBadge | `fadeUp` | 0 |
| 링 이미지 (`mode-ring`) | `fadeIn` | 0.1 |
| 타이틀 (`h2`) | `fadeUp` | 0.15 |
| 서브카피 (`p`) | `fadeUp` | 0.2 |
| 캐러셀 (`ModeCardCarousel`) | `fadeUp` | 0.3 |

> [!WARNING]
> **`mode-ring`에 `scaleUp` 금지 — sticky 포지션 충돌**
>
> `.mode-ring` 이미지는 `lg:sticky lg:top-28` 컨테이너 안에 위치합니다.
> `scaleUp`의 `y: 60` 초기값은 transform을 생성하며, **transform이 있는 요소는 sticky의 containing block이 변경되어 sticky 동작이 깨집니다.**
> 반드시 `fadeIn` (opacity만 변경)을 사용합니다.

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
| Steps (그룹 전체) | `fadeUp` | 0.15 |
| 하단 카드 (그룹 전체) | `fadeUp` | 0.25 |

> Steps는 desktop(1-row flex)과 mobile(2×2 grid)에서 DOM이 분리되어 있으므로, 개별 아이콘 reveal 대신 그룹 단위로 적용합니다.

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

### Server Component 유지 전략

`RevealOnScroll`은 `'use client'` 컴포넌트이지만, 이를 **자식 래퍼로** 사용하면 부모 섹션은 서버 컴포넌트를 그대로 유지할 수 있습니다.

```tsx
// BeyondScreenSection.tsx — 서버 컴포넌트 유지
import RevealOnScroll from '../shared/RevealOnScroll'; // 이것만 클라이언트

export default function BeyondScreenSection() {
  return (
    <section className="beyond-screen-section">
      <RevealOnScroll>           {/* 클라이언트 경계는 여기만 */}
        <h2>Beyond Screen</h2>
      </RevealOnScroll>
      <RevealOnScroll delay={0.1}>
        <p>...</p>
      </RevealOnScroll>
    </section>
  );
}
```

| 파일 | 현재 상태 | 모션 적용 후 |
|---|---|---|
| `RevealOnScroll.tsx` | — (신규) | ✅ `'use client'` (유일한 클라이언트 경계) |
| `BeyondScreenSection.tsx` | 서버 컴포넌트 | ❌ 서버 유지 |
| `SocialModeSection.tsx` | 서버 컴포넌트 | ❌ 서버 유지 |
| `PrivateModeSection.tsx` | 서버 컴포넌트 | ❌ 서버 유지 |
| `Web3Section.tsx` | 서버 컴포넌트 | ❌ 서버 유지 |
| `PioneerSection.tsx` | 서버 컴포넌트 | ❌ 서버 유지 |
| `AIAgentSection.tsx` | 서버 컴포넌트 | ❌ 서버 유지 |
| `ApplicationSection.tsx` | 서버 컴포넌트 | ❌ 서버 유지 |
| `PocSection.tsx` | 서버 컴포넌트 | ❌ 서버 유지 |
| `HeroSection.tsx` | ⚠️ 클라이언트 (GSAP) | 유지 |
| `TwoModesSection.tsx` | ⚠️ 클라이언트 (상호작용) | 유지 |
| `ModeCardCarousel.tsx` | ⚠️ 클라이언트 (Swiper) | 유지 (자식 경계, 부모 섹션 영향 없음) |

> [!IMPORTANT]
> **서버 컴포넌트를 유지하는 것이 이 설계의 핵심 장점입니다.** `RevealOnScroll` 래퍼만 클라이언트 경계를 만들고, 섹션 자체는 서버에서 렌더링됩니다.

### GSAP-motion 충돌 방지 원칙

> **"같은 DOM 노드의 같은 CSS 속성을 두 라이브러리가 동시에 만지지 않는다."**

- motion이 제어하는 속성: `opacity`, `y`, `scale` — 등장 reveal용
- GSAP이 제어하는 속성: `opacity`, `x/y`, `scale`, `rotate`, `filter` — HeroSection scrub용
- **두 라이브러리가 같은 노드에서 겹치면 transform 충돌 발생** → 별도 노드로 분리 필수

### 성능 가이드라인

- `once: true` 를 기본으로 사용하여 한 번 등장한 요소는 다시 애니메이션하지 않음
- `amount: 0.15` (요소의 15%가 뷰포트에 들어오면 트리거)
- `duration: 0.7s` 통일 (일관된 리듬감)
- 지나치게 긴 delay 체인은 피함 (최대 delay ≤ 0.4s)
- `will-change` 는 motion 라이브러리가 자동 관리하므로 수동 지정 불필요

### 접근성

- `prefers-reduced-motion` 대응은 `RevealOnScroll` 내부에서 `useReducedMotion()` 훅으로 처리
  - `true`일 때 `initial="visible"` 로 설정하여 모션 없이 즉시 노출
  - 구현 위치가 `RevealOnScroll` 한 곳으로 고정되므로 누락 위험 없음
- 모션이 콘텐츠 가독성을 방해하지 않도록 opacity 값의 초기값은 0 (완전 투명)에서 시작

---

## 적용 원칙

### 블록 단위 reveal 우선

- 기본 원칙은 **요소 개별이 아니라 블록 단위** reveal
- sticky, carousel, 중복 DOM이 있는 구간은 개별 요소 reveal을 최소화
- 블록 내부 스태거가 필요한 경우에만 하위 요소에 delay를 적용

---

## 구현 순서 (권장)

1. `RevealOnScroll.tsx` + `motion.ts` 유틸리티 생성
2. 간단한 섹션 적용 (BeyondScreen → Web3 → Pioneer)
3. 중간 복잡도 섹션 적용 (Application → AIAgent)
4. Mode 섹션 적용 (Social → Private)
5. Poc 섹션 적용 (블록 3개, 중복 DOM 주의)
6. TwoModes 섹션 적용
7. Hero 초기 로드 모션 추가 (GSAP ref 자식 wrapper 방식)
8. 전체 테스트 및 타이밍 조정

## 검증 항목

- `npm run lint`
- `npm run build`
- 데스크톱/모바일에서 첫 진입 reveal 타이밍 확인
- HeroSection scrub 동작과 초기 reveal이 서로 간섭하지 않는지 확인
