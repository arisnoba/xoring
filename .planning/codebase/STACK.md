# Technology Stack

**Analysis Date:** 2026-03-24

## Languages

**Primary:**
- TypeScript 5 - application code in `src/app/*.ts`, `src/app/*.tsx`, `src/components/**/*.tsx`, `src/lib/*.ts`, configured by `tsconfig.json`

**Secondary:**
- SCSS - global theme, typography, and component overrides in `src/app/globals.scss` and `src/styles/**/*.scss`
- CSS - Tailwind import layer and theme tokens in `src/app/globals.css`

## Runtime

**Environment:**
- Node.js v23.6.1 - current local runtime observed via `node -v`; repository-level version pinning was not detected in `.nvmrc` or `.tool-versions`

**Package Manager:**
- npm 11.10.0 - current local package manager observed via `npm -v`
- Lockfile: present in `package-lock.json`

## Frameworks

**Core:**
- Next.js 16.2.1 - App Router application and static export build in `package.json`, `src/app/layout.tsx`, `src/app/page.tsx`, `next.config.ts`
- React 19.2.4 - component runtime for all UI modules in `package.json` and `src/components/**/*.tsx`
- Tailwind CSS 4 - utility styling pipeline imported from `src/app/globals.css` and processed by `postcss.config.mjs`

**Testing:**
- Not detected - no `jest.config.*`, `vitest.config.*`, `playwright.config.*`, or test files were found in the repository

**Build/Dev:**
- TypeScript 5 - type checking and editor tooling configured in `tsconfig.json`
- ESLint 9 with `eslint-config-next` - linting configured in `eslint.config.mjs`
- PostCSS with `@tailwindcss/postcss` - Tailwind build integration in `postcss.config.mjs`
- Sass 1.98.0 - SCSS compilation used by `src/app/globals.scss` and `src/styles/_fluid.scss`

## Key Dependencies

**Critical:**
- `next` 16.2.1 - application framework, metadata routes, static export, and image handling in `package.json` and `next.config.ts`
- `react` 19.2.4 and `react-dom` 19.2.4 - rendering runtime for `src/app/layout.tsx` and `src/components/**/*.tsx`
- `gsap` 3.14.2 - animation and scroll-trigger orchestration in `src/components/providers/SmoothScrollProvider.tsx` and `src/components/sections/HeroSection.tsx`
- `lenis` 1.3.19 - smooth scrolling integration in `src/components/providers/SmoothScrollProvider.tsx` and `src/components/layout/Header.tsx`
- `swiper` 12.1.2 - carousel UI in `src/components/shared/ModeCardCarousel.tsx`

**Infrastructure:**
- `clsx` 2.1.1 and `tailwind-merge` 3.5.0 - class composition helper in `src/lib/utils.ts`
- `lucide-react` 0.577.0 - icon set in `src/components/layout/Header.tsx` and `src/components/sections/PocSection.tsx`
- `sass` 1.98.0 - SCSS language support for `src/app/globals.scss` and `src/styles/**/*.scss`
- `tw-animate-css` 1.4.0 - animation utility import in `src/app/globals.css`
- `shadcn` 4.1.0 - component registry tooling configured by `components.json`; runtime import is limited to `@import "shadcn/tailwind.css"` in `src/app/globals.css`

**Installed but no runtime usage detected in `src/`:**
- `@base-ui/react` 1.3.0 - present in `package.json`, no import found in `src/**/*.ts` or `src/**/*.tsx`
- `@gsap/react` 2.1.2 - present in `package.json`, no import found in `src/**/*.ts` or `src/**/*.tsx`
- `class-variance-authority` 0.7.1 - present in `package.json`, no import found in `src/**/*.ts` or `src/**/*.tsx`
- `motion` 12.38.0 - present in `package.json`, no import found in `src/**/*.ts` or `src/**/*.tsx`
- `pretendard` 1.3.9 - present in `package.json`, while the actual font file is served from `public/fonts/PretendardVariable.woff2` and loaded in `src/app/globals.scss`

## Configuration

**Environment:**
- No environment variable access was detected in `src/**/*.ts`, `src/**/*.tsx`, `README.md`, `docs/**`, or `tasks/**`
- No `.env`, `.env.*`, `.nvmrc`, or `.tool-versions` files were detected at the repository root or one level below

**Build:**
- `next.config.ts` - enables `output: "export"` and `images.unoptimized: true`
- `tsconfig.json` - enables strict TypeScript settings and the `@/*` path alias to `./src/*`
- `postcss.config.mjs` - wires Tailwind through PostCSS
- `eslint.config.mjs` - applies Next.js core-web-vitals and TypeScript lint rules
- `components.json` - stores shadcn registry and alias configuration

## Platform Requirements

**Development:**
- Node.js and npm are required to run scripts from `package.json`
- Static assets must exist under `public/`, including `public/assets/images/**` and `public/fonts/PretendardVariable.woff2`

**Production:**
- Static hosting target - `next.config.ts` exports a fully static build to `out/`
- `README.md` documents deployment by uploading `out/` to static hosting or using Vercel for testing

---

*Stack analysis: 2026-03-24*
