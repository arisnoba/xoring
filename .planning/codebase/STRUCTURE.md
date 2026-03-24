# Codebase Structure

**Analysis Date:** 2026-03-24

## Directory Layout

```text
xoring/
├── src/                  # Next.js 앱 코드
│   ├── app/              # App Router 엔트리포인트와 전역 스타일
│   ├── components/       # 레이아웃, 섹션, 공유 UI, provider
│   ├── lib/              # 상수, 사이트 설정, 유틸리티
│   └── styles/           # SCSS 토큰, 타이포, 섹션 공통 스타일
├── public/               # 정적 이미지와 폰트 자산
├── design/               # 디자인 레퍼런스 이미지
├── docs/                 # 구현 메모와 컴포넌트 설계 문서
├── tasks/                # 작업 계획과 TODO 메모
├── .planning/            # GSD 산출물
├── next.config.ts        # 정적 export 설정
├── package.json          # 런타임/스크립트 정의
└── tsconfig.json         # TypeScript 및 `@/*` 경로 별칭
```

## Directory Purposes

**`src/app`:**
- Purpose: 라우트 엔트리포인트, 루트 레이아웃, SEO 산출물, 글로벌 CSS 진입점이 있다.
- Contains: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/manifest.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/globals.css`, `src/app/globals.scss`
- Key files: `src/app/page.tsx`, `src/app/layout.tsx`

**`src/components/layout`:**
- Purpose: 페이지 전역에서 한 번만 쓰는 구조 컴포넌트를 둔다.
- Contains: `Header`, `Footer`
- Key files: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`

**`src/components/sections`:**
- Purpose: 랜딩의 스토리 섹션을 파일 단위로 분리한다.
- Contains: `HeroSection`, `BeyondScreenSection`, `TwoModesSection`, `SocialModeSection`, `PrivateModeSection`, `AIAgentSection`, `ApplicationSection`, `PocSection`, `Web3Section`, `PioneerSection`
- Key files: `src/components/sections/HeroSection.tsx`, `src/components/sections/SocialModeSection.tsx`, `src/components/sections/PocSection.tsx`

**`src/components/shared`:**
- Purpose: 여러 섹션에서 재사용하는 레이아웃/비주얼 조각을 둔다.
- Contains: 컨테이너, 배지, 배경, 캐러셀, CTA 버튼, 링 아트워크
- Key files: `src/components/shared/SectionContainer.tsx`, `src/components/shared/SectionBackground.tsx`, `src/components/shared/ModeCardCarousel.tsx`

**`src/components/providers`:**
- Purpose: 앱 전체를 감싸는 interaction provider를 둔다.
- Contains: `SmoothScrollProvider`
- Key files: `src/components/providers/SmoothScrollProvider.tsx`

**`src/components/ui`:**
- Purpose: 범용 UI 실험 또는 개별 인터랙션 컴포넌트를 둔다.
- Contains: `src/components/ui/ripple-button.tsx`
- Key files: `src/components/ui/ripple-button.tsx`

**`src/lib`:**
- Purpose: UI가 소비하는 데이터와 헬퍼를 중앙 관리한다.
- Contains: 카피 상수, URL 설정, `cn()` 유틸리티
- Key files: `src/lib/constants.ts`, `src/lib/site.ts`, `src/lib/utils.ts`

**`src/styles`:**
- Purpose: Tailwind로 대체하지 않는 디자인 토큰과 SCSS 유틸리티를 둔다.
- Contains: `src/styles/_variables.scss`, `src/styles/_fluid.scss`, `src/styles/_typography.scss`
- Key files: `src/styles/_variables.scss`, `src/styles/_fluid.scss`, `src/styles/_typography.scss`

**`src/styles/components`:**
- Purpose: 섹션 공통 클래스나 컴포넌트 보정용 SCSS를 둔다.
- Contains: `src/styles/components/_section-overrides.scss`
- Key files: `src/styles/components/_section-overrides.scss`

**`public`:**
- Purpose: 빌드 시 그대로 서빙할 정적 자산을 둔다.
- Contains: `public/assets/images/*`, `public/fonts/PretendardVariable.woff2`
- Key files: `public/assets/images/logo.svg`, `public/assets/images/kv.png`, `public/fonts/PretendardVariable.woff2`

**`design`:**
- Purpose: 구현 기준이 되는 디자인 스틸 컷을 보관한다.
- Contains: `design/section - hero 1.jpg`, `design/section - 01.jpg` 등
- Key files: `design/XORING_full.jpg`, `design/footer.jpg`

**`docs`:**
- Purpose: 구현 메모와 특정 컴포넌트 설계 문서를 둔다.
- Contains: `docs/motion-plan.md`, `docs/mode-card-carousel.md`
- Key files: `docs/mode-card-carousel.md`

**`tasks`:**
- Purpose: 작업 계획과 TODO를 보관한다.
- Contains: `tasks/plan.md`, `tasks/todo.md`
- Key files: `tasks/plan.md`, `tasks/todo.md`

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: 전역 메타데이터, 스타일 import, `SmoothScrollProvider` 적용
- `src/app/page.tsx`: 홈 랜딩 조립
- `src/app/manifest.ts`: 웹 앱 매니페스트 생성
- `src/app/robots.ts`: `robots.txt` 생성
- `src/app/sitemap.ts`: `sitemap.xml` 생성

**Configuration:**
- `package.json`: `dev`, `build`, `lint` 스크립트와 의존성 정의
- `next.config.ts`: `output: "export"`와 `images.unoptimized` 설정
- `tsconfig.json`: 엄격 모드와 `@/*` 경로 별칭 정의
- `eslint.config.mjs`: ESLint 설정
- `components.json`: shadcn 관련 구성 파일

**Core Logic:**
- `src/components/providers/SmoothScrollProvider.tsx`: Lenis-GSAP 스크롤 브리지
- `src/components/layout/Header.tsx`: 내비게이션, 모바일 메뉴, 헤더 테마 결정
- `src/components/sections/HeroSection.tsx`: hero 스크롤 타임라인과 헤더 이벤트 발행
- `src/components/shared/ModeCardCarousel.tsx`: Swiper 기반 카드 캐러셀
- `src/lib/constants.ts`: 섹션 텍스트와 카드 데이터 소스

**Testing:**
- 테스트 디렉터리와 테스트 파일은 현재 없다.

## Naming Conventions

**Files:**
- React 컴포넌트 파일은 PascalCase를 사용한다: `src/components/sections/HeroSection.tsx`
- 유틸리티/설정 파일은 소문자 또는 의미 기반 이름을 사용한다: `src/lib/site.ts`, `src/app/sitemap.ts`
- SCSS partial은 선행 `_`를 사용한다: `src/styles/_variables.scss`, `src/styles/components/_section-overrides.scss`

**Directories:**
- 역할 기준 복수형 디렉터리를 사용한다: `src/components/sections`, `src/components/shared`, `src/components/providers`
- 라우팅 관련 코드는 Next.js 규칙대로 `src/app/` 아래에 둔다.

## Where to Add New Code

**New Feature:**
- 페이지에 새 섹션을 추가할 때 구현 파일은 `src/components/sections/`에 만든다.
- `src/app/page.tsx`에 import 후 원하는 순서에 배치한다.
- 섹션 전용 텍스트/카드 데이터는 `src/lib/constants.ts`에 추가한다.
- 섹션 이미지 자산은 `public/assets/images/` 하위에 섹션별 폴더를 만들어 둔다.

**New Component/Module:**
- 둘 이상의 섹션에서 재사용하는 UI는 `src/components/shared/`에 둔다.
- 전체 앱을 감싸는 브리지나 컨텍스트는 `src/components/providers/`에 둔다.
- 레이아웃 전역 요소는 `src/components/layout/`에 둔다.
- 범용 UI primitive가 필요하면 `src/components/ui/`에 둔다.

**Utilities:**
- 클래스 병합, 포맷터, 상수 함수는 `src/lib/`에 둔다.
- 사이트 URL, 플레이스홀더 링크, 환경 의존 설정은 `src/lib/site.ts` 같은 설정 파일로 모은다.
- 디자인 토큰과 fluid mixin은 `src/styles/`에 두고, 컴포넌트 보정 스타일은 `src/styles/components/`에 둔다.

## Special Directories

**`public/assets/images`:**
- Purpose: 섹션 이미지, 로고, 아이콘을 저장한다.
- Generated: No
- Committed: Yes

**`design`:**
- Purpose: 구현 기준 이미지와 전체 목업을 저장한다.
- Generated: No
- Committed: Yes

**`docs`:**
- Purpose: 구현 의도와 컴포넌트 설계 메모를 저장한다.
- Generated: No
- Committed: Yes

**`out`:**
- Purpose: `npm run build` 후 생성되는 정적 export 결과물이다.
- Generated: Yes
- Committed: Yes

**`.next`:**
- Purpose: Next.js 개발/빌드 산출물이다.
- Generated: Yes
- Committed: No

**`.planning/codebase`:**
- Purpose: 코드베이스 매핑 문서를 저장한다.
- Generated: Yes
- Committed: Yes

---

*Structure analysis: 2026-03-24*
