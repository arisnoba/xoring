# XORing 유동 타이포 시스템 적용 계획

> 최종 수정: 2026-03-23
> 담당: AI 구현 + 사용자 검토

---

## 1. 목적

CSS `clamp()` 기반의 선형 스케일 타이포 시스템을 도입해 전 섹션의 헤딩 리듬을 공통화하고 유지보수 비용을 줄인다.

이번 작업의 1차 목표:

- 모든 섹션 `h2`에 공통 기본 타이포 스케일 부여
- 필요 시 각 섹션 SCSS에서만 예외 조정
- Tailwind 인라인 `text-[clamp(...)]` 의존도 축소
- 이후 `padding`, `margin`, `gap`까지 확장 가능한 Sass 유틸리티 기반 마련

---

## 2. 기준 문서와 적용 원칙

참고 문서:
- CSS-Tricks
- `Linearly Scale font-size with CSS clamp() Based on the Viewport`

핵심 원칙:
- `clamp(min, preferred, max)`의 preferred는 선형 보간식으로 계산한다.
- viewport 기준 범위는 `375px` ~ `1640px`
- 입력 단위는 px로 통일하고 내부 계산에서 rem + vw 조합으로 변환한다.
- 1차 적용 범위는 헤딩 전체이며, 우선순위는 `h2`
- 공통 타이포는 SCSS 공통 클래스에서 부여한다.
- 섹션별 보정은 공통 클래스를 대체하지 않고 추가 클래스에서만 수행한다.

---

## 3. 현재 상태

현재 각 섹션은 대부분 JSX 내부에서 Tailwind 임의값으로 직접 `clamp()`를 선언하고 있다.

주요 대상:
- `HeroSection.tsx`
- `BeyondScreenSection.tsx`
- `SocialModeSection.tsx`
- `PrivateModeSection.tsx`
- `AIAgentSection.tsx`
- `ApplicationSection.tsx`
- `PocSection.tsx`
- `Web3Section.tsx`
- `PioneerSection.tsx`
- `Footer.tsx`

문제점:
- 공통 헤딩 시스템 부재
- 섹션마다 수치 기준이 달라 조정 비용이 큼
- 공통 리듬을 만들기 어렵고 예외 관리가 비효율적임

---

## 4. 목표 구조

### 4.1 Sass 유틸리티

`src/styles/`에 fluid typography용 partial 추가

예상 인터페이스:
- `@function fluid-clamp($min-size, $max-size, $min-vw: 375, $max-vw: 1640, $base-font-size: 16)`
- `@mixin fluid-type($min-size, $max-size, $min-vw: 375, $max-vw: 1640)`
- `@mixin fluid-space($property, $min-size, $max-size, ...)`

### 4.2 공통 클래스

`src/app/globals.scss` 또는 공통 partial에서 공통 헤딩 클래스 선언

예상 규칙:
- `.section-title`: 전 섹션 `h2` 기본값
- `.section-title--tight`: 줄간격이 더 조여야 하는 섹션
- `.section-title--compact`: 폭이 좁은 레이아웃용
- `.section-title--hero`: Hero용 큰 비율
- `.section-title--footer`: Footer 전용 크기
- `.section-copy`: 섹션 intro/body 공통 스케일

### 4.3 섹션별 override

공통값으로 해결되지 않는 섹션만 `src/styles/components/`에 별도 SCSS 생성

후보:
- `Hero`
- `Poc`
- `Pioneer`
- `Footer`

---

## 5. `h2` 공통 전략

기본 정책:
- 모든 섹션 `h2`는 공통 클래스 사용
- 기본 헤딩은 동일한 최소/최대 크기 범위를 공유
- 굵기, tracking, leading도 공통 기본값을 가진다
- 예외 섹션만 추가 클래스로 조정한다

의도:
- 전체 페이지에서 섹션 헤딩의 리듬을 통일
- 개별 섹션의 시각적 개성은 override로만 제한적 허용
- 이후 `h3`, 카드 타이틀, 서브카피에도 확장 가능하도록 구조 정리

---

## 6. 향후 확장 범위

이번 1차에서는 직접 적용하지 않지만, 동일한 수학식을 다음 속성으로 확장할 수 있도록 설계한다.

- `padding-top`
- `padding-bottom`
- `margin-top`
- `margin-bottom`
- `gap`

단, spacing은 후속 작업에서 별도 검증 후 적용한다.

---

## 7. 검증 기준

정적 검증:
- `h2`의 인라인 `text-[clamp(...)]` 제거 여부 확인
- 공통 클래스 적용 여부 확인

실행 검증:
- `npm run lint`
- `npm run build`

뷰포트 검증:
- 375px
- 768px
- 1440px

시각 검증:
- 줄바꿈 리듬
- 섹션별 과도한 확대/축소 여부
- 공통화 이후 필요한 override 포인트 식별

접근성 주의:
- `vw` 의존이 과도하지 않도록 최대/최소값을 보수적으로 설정
- 본문보다 헤딩 중심으로 먼저 적용
