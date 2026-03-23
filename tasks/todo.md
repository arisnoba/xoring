# XORing 유동 타이포 시스템 적용 — Todo

## 목표

CSS `clamp()` 기반의 공통 타이포 시스템을 도입해 전 섹션 `h2`를 공통 규칙으로 정리하고, 필요 시 섹션별 SCSS에서만 예외 조정한다.

## 수락 기준

- [x] Sass `fluid-clamp` 함수 또는 동등한 공통 계산 유틸리티 추가
- [x] 공통 `h2` 클래스 추가
- [x] 전 섹션 `h2`가 공통 클래스 기반으로 동작
- [x] 예외 섹션만 별도 SCSS override 사용
- [x] `npm run lint` 성공
- [x] `npm run build` 성공
- [ ] 375 / 768 / 1440 뷰포트에서 헤딩 리듬 확인

---

## Phase 1: 설계 기반 정리

- [x] CSS-Tricks 선형 보간 공식을 Sass 함수 형태로 정리
- [x] 기준 viewport `375px ~ 1640px` 확정
- [x] 입력 단위를 px로 통일
- [x] 출력 형식을 `clamp(rem, rem + vw, rem)`으로 통일

---

## Phase 2: 공통 Sass 유틸리티 추가

- [x] `src/styles/`에 fluid typography partial 추가
- [x] `fluid-clamp` 함수 추가
- [x] `fluid-type` mixin 추가
- [x] spacing 확장용 mixin 설계 추가

---

## Phase 3: 공통 헤딩 클래스 도입

- [x] `globals.scss`에 공통 `h2` 클래스 추가
- [x] 공통 `font-weight`, `tracking`, `leading` 기준 정리
- [x] modifier 클래스 추가
- [x] 전역에서 재사용 가능한 naming 확정

---

## Phase 4: 섹션 적용

- [x] `HeroSection`의 `h2`를 공통 클래스 기반으로 변경
- [x] `BeyondScreenSection`의 `h2`를 공통 클래스 기반으로 변경
- [x] `SocialModeSection`의 `h2`를 공통 클래스 기반으로 변경
- [x] `PrivateModeSection`의 `h2`를 공통 클래스 기반으로 변경
- [x] `AIAgentSection`의 `h2`를 공통 클래스 기반으로 변경
- [x] `ApplicationSection`의 `h2`를 공통 클래스 기반으로 변경
- [x] `PocSection`의 `h2`를 공통 클래스 기반으로 변경
- [x] `Web3Section`의 `h2`를 공통 클래스 기반으로 변경
- [x] `PioneerSection`의 `h2`를 공통 클래스 기반으로 변경
- [x] `Footer`의 `h2`를 공통 클래스 기반으로 변경

---

## Phase 5: 예외 섹션 보정

- [x] 공통값으로 어색한 섹션 식별
- [x] `src/styles/components/`에 override 파일 추가
- [x] `Hero` copy 스케일 보정
- [x] `Poc` title 스케일 보정
- [x] `Pioneer` title 스케일 보정
- [x] `Footer` title 보정

---

## Phase 6: 정리 및 검증

- [x] `h2`에 남아 있는 인라인 `text-[clamp(...)]` 검색
- [x] `npm run lint`
- [x] `npm run build`
- [ ] 375px 확인
- [ ] 768px 확인
- [ ] 1440px 확인
- [ ] 필요 시 후속 작업으로 `h3`/본문/spacing 확장 범위 정리

---

## 메모

기본 정책:
- 공통 클래스 우선
- 예외는 섹션 SCSS에서만 조정
- Tailwind 인라인 임의값은 점진적으로 제거

후속 후보:
- `padding`
- `margin`
- `gap`
- `h3`
- 본문 타이포 스케일
