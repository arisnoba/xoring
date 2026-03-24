# Quick Task 260324-oex: Summary

## What Changed

**src/components/sections/TwoModesSection.tsx**
- `useState` 제거, `useRef` 5개 추가 (sectionRef, videoRef, colorCircleRef, oIndicatorRef, xIndicatorRef)
- 정적 ring-0.png / ring-x.png 이미지 → `<video src="change-ring_optim.mp4">` 로 교체 (muted, playsInline, preload="auto", poster)
- 섹션 높이 `h-[250vh]` + sticky wrapper `sticky top-0 h-[100dvh]` 패턴 적용
- `gsap.registerPlugin(ScrollTrigger)` 모듈 레벨 등록
- `useEffect`에 `gsap.context()` + `ScrollTrigger.create({ scrub: true, onUpdate })` 추가
  - onUpdate: `video.currentTime = progress * duration` 스크럽
  - progress 0.5 기준으로 mode 파생, `updateModeVisuals()` 호출
  - updateModeVisuals: gsap.to로 색상 원 backgroundColor, 아이콘 filter, 텍스트 opacity 전환
- 버튼 3개 → div로 변경, onClick/aria-pressed/cursor-pointer 제거
- 링 영역 RevealOnScroll 제거 (GSAP 제어), 타이틀 RevealOnScroll 유지
- prefers-reduced-motion: ScrollTrigger 생성 안 함

**src/styles/components/_section-overrides.scss**
- `@media (prefers-reduced-motion: reduce)` 블록 추가: `.two-modes-section` height: auto, sticky position: relative

## Verification

- `npm run lint` — 에러 없음
- `npm run build` — static export 성공 (7/7 pages)
