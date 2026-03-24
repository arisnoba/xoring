# Quick Task 260324-oex: TwoModesSection 링 체인지를 비디오+GSAP 스크롤로 교체

## Task 1: 레이아웃 재구조 + 비디오 교체
- files: src/components/sections/TwoModesSection.tsx
- action: h-[250vh] + sticky top-0 h-[100dvh] 레이아웃, <video> 요소로 링 이미지 교체, useState 제거
- done: ✅

## Task 2: GSAP ScrollTrigger 스크럽 연결
- files: src/components/sections/TwoModesSection.tsx
- action: gsap.context + ScrollTrigger.create로 video.currentTime 스크럽, updateModeVisuals로 색상/아이콘/텍스트 전환
- done: ✅

## Task 3: Reduced motion + cleanup
- files: src/components/sections/TwoModesSection.tsx, src/styles/components/_section-overrides.scss
- action: prefers-reduced-motion 가드, SCSS에 reduced motion 오버라이드 추가, 미사용 import 제거
- done: ✅
