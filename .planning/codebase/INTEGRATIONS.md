# External Integrations

**Analysis Date:** 2026-03-24

## APIs & External Services

**Runtime outbound links only:**
- XORing site and mock commerce/app links - used as canonical site URL and CTA targets
  - SDK/Client: none; links are plain string constants in `src/lib/site.ts`
  - Auth: none

**Development tooling registries:**
- shadcn registry schema - configuration only in `components.json`
  - SDK/Client: `shadcn` CLI configuration in `components.json`
  - Auth: none detected in the repository
- Magic UI registry - configured as an optional registry endpoint in `components.json`
  - SDK/Client: external registry URL `https://magicui.design/r/{name}` in `components.json`
  - Auth: none detected in the repository

**Not detected in runtime source:**
- No external API client calls such as `fetch()`, `axios`, `supabase`, `firebase`, `openai`, `stripe`, or similar were found in `src/**/*.ts` or `src/**/*.tsx`

## Data Storage

**Databases:**
- None
  - Connection: not detected
  - Client: not detected

**File Storage:**
- Local filesystem only
  - Static assets live in `public/assets/images/**`
  - Local web font asset lives in `public/fonts/PretendardVariable.woff2`

**Caching:**
- None detected

## Authentication & Identity

**Auth Provider:**
- None
  - Implementation: no auth library imports or session/token handling were detected in `src/**/*.ts` or `src/**/*.tsx`

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- No dedicated logging integration detected

## CI/CD & Deployment

**Hosting:**
- Static hosting target via exported build in `out/` from `next.config.ts`
- `README.md` also references Vercel as a testing/deployment option

**CI Pipeline:**
- None detected
  - No workflow files were found under `.github/`
  - No `vercel.json`, `Dockerfile`, or `docker-compose*.yml` files were found at the repository root

## Environment Configuration

**Required env vars:**
- None detected
  - No `process.env` or `NEXT_PUBLIC_*` access was found in `src/**/*.ts`, `src/**/*.tsx`, `README.md`, `docs/**`, or `tasks/**`

**Secrets location:**
- Not detected
  - No `.env` or `.env.*` files were found at the repository root or one level below

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

---

*Integration audit: 2026-03-24*
