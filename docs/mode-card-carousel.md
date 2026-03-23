# ModeCardCarousel — 구현 가이드

> 작성일: 2026-03-23
> 커밋: `d4e7ce5`
> 관련 파일: `src/components/shared/ModeCardCarousel.tsx`, `src/components/sections/SocialModeSection.tsx`, `src/components/sections/PrivateModeSection.tsx`, `src/styles/components/_section-overrides.scss`, `src/app/globals.scss`

---

## 1. 목표 동작

| 뷰포트 | 동작 |
|--------|------|
| < 640px | 1.2장 표시 |
| 640–1023px | 1.8장 |
| 1024–1279px | 2.3장 |
| 1280–1699px | 3장 (컨테이너 안에 정확히 맞음) |
| ≥ 1700px | 3.3장 — 4번째 카드가 컨테이너(max-w-[1680px]) 오른쪽 여백으로 부분 노출 |

- **좌측**: Swiper 기본 `overflow: hidden` 으로 자동 클리핑
- **우측**: 뷰포트 끝까지 확장, 단 스크롤바 + 20px 여백 확보
- **가로 스크롤 없음**: `body { overflow-x: hidden }`

---

## 2. 핵심 구현 — 뷰포트 확장 (useEffect)

```ts
useEffect(() => {
  const extend = () => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.width = "";                              // 1. 기준 너비(100%)로 리셋
    const right = el.getBoundingClientRect().right;   // 2. 컨테이너 오른쪽 끝 측정
    const clientWidth = document.documentElement.clientWidth; // 3. 스크롤바 제외 뷰포트 너비
    const extension = Math.max(0, clientWidth - right - 20);  // 4. 확장량 계산 (20px 여백)
    el.style.width = extension > 0 ? `calc(100% + ${extension}px)` : "";
  };
  extend();
  window.addEventListener("resize", extend);
  return () => window.removeEventListener("resize", extend);
}, []);
```

### 왜 CSS calc()를 쓰지 않는가

`width: calc(100% + max(..., (100vw - 1680px)/2 + 20px))` 방식을 시도했으나 실패.

**원인**: CSS Grid에서 `grid-template-columns`가 없으면 컬럼이 `auto` 크기로 설정됨.
`auto` 컬럼은 콘텐츠의 `min-content` 기준으로 팽창 → `width: calc(100% + X)` 에서 `100%`가 순환 참조 → 컬럼이 16,777,216px(CSS max)로 폭발.

**해결**: 렌더 후 실제 DOM 위치를 측정하는 JS 방식으로 순환 의존성 제거.

### 왜 window.innerWidth 대신 clientWidth인가

`window.innerWidth`는 스크롤바를 포함한 너비.
`document.documentElement.clientWidth`는 스크롤바를 제외한 실제 콘텐츠 영역 너비.
→ Windows/Linux 등 visible scrollbar 환경에서 마지막 슬라이드가 스크롤바에 가려지는 문제 방지.

---

## 3. CSS Grid 순환 의존성 방지 — grid-cols-1

```html
<!-- SocialModeSection, PrivateModeSection -->
<div class="grid grid-cols-1 items-start gap-10
            lg:grid-cols-[340px_minmax(0,1fr)]
            xl:grid-cols-[360px_minmax(0,1fr)]">
```

`grid-cols-1`이 없으면 모바일(< 1024px)에서 그리드 컬럼이 `auto`가 되어 Swiper 내부 콘텐츠를 따라 팽창. `grid-cols-1` = `repeat(1, minmax(0, 1fr))`로 컬럼에 명시적 너비 부여.

---

## 4. Swiper breakpointsBase="window"

```tsx
<Swiper
  breakpointsBase="window"   // ← 중요: 기본값은 swiper 컨테이너 너비 기준
  breakpoints={{
    1280: { slidesPerView: 3 },
    1700: { slidesPerView: 3.3 },
  }}
>
```

Swiper 기본값: 컨테이너 너비 기준으로 breakpoints 적용.
`breakpointsBase="window"` 설정 시: 뷰포트(window) 너비 기준으로 전환.
→ 1700px 뷰포트일 때 3.3 slides가 정확히 활성화되도록 보장.

---

## 5. overflow 전략

```scss
// globals.scss
body {
  overflow-x: hidden; // 가로 스크롤 방지
}
```

```tsx
// SocialModeSection, PrivateModeSection
<section className="relative isolate bg-white text-[#111]">
// overflow-hidden 제거 — Swiper 오른쪽 확장이 section 경계 밖으로 나올 수 있게
```

Swiper 자체는 `overflow: hidden` 유지 (기본값) → 좌측 클리핑 자동 처리.

### 시도했다 실패한 방법들

| 방법 | 문제 |
|------|------|
| `.swiper { overflow: visible }` | Swiper wrapper가 모든 슬라이드를 레이아웃에 펼쳐 16MB 폭발 |
| `clip-path: inset(0 -9999px 0 0)` on `.swiper` | clip-path는 레이아웃 scrollWidth에 영향 없음 → 여전히 overflow |
| `width: calc(100% + max(..., 50vw - 820px))` | CSS Grid auto 컬럼 순환 의존성으로 16MB 폭발 |

---

## 6. variant 시스템

```tsx
<ModeCardCarousel
  cards={SOCIAL_MODE.cards}
  images={socialSlides}
  variant="light"   // Social: 흰 배경, 다크 텍스트
/>

<ModeCardCarousel
  cards={PRIVATE_MODE.cards}
  images={privateSlides}
  variant="dark"    // Private: 반투명 다크, 흰 텍스트
/>
```

---

## 7. 수정 시 주의사항

### 슬라이드 수를 바꾸고 싶을 때
`breakpoints` 의 `slidesPerView` 값을 조정. `breakpointsBase="window"` 가 있으므로 값은 뷰포트 px 기준.

### 여백을 조정하고 싶을 때
`useEffect` 내 `-20` 상수를 변경. 값이 클수록 마지막 슬라이드와 뷰포트 오른쪽 끝의 간격이 넓어짐.

### "4번째 카드 노출" 기준 뷰포트를 바꾸고 싶을 때
`breakpoints`의 `1700` 키를 원하는 뷰포트 px로 변경.

### 새 섹션에 이 캐로셀을 추가할 때
1. `images` 배열 정의 (슬라이드 이미지 경로)
2. `cards` 데이터 배열 정의 (title, description)
3. 부모 그리드에 반드시 `grid-cols-1` 포함할 것 (순환 의존성 방지)
4. 부모 `<section>`에 `overflow-hidden` 없어야 함
