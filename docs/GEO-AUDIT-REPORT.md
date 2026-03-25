# GEO Audit Report: XORing

**감사 일자:** 2026-03-25
**URL:** https://xoring.ai
**비즈니스 유형:** 스마트링 웨어러블 하드웨어 (POC/얼리런치 단계), B2C + Web3/AI
**분석 페이지 수:** 1 (단일 랜딩 페이지)

---

## 요약

**종합 GEO 점수: 26/100 (Critical)**

xoring.ai는 시각적 임팩트와 브랜드 감성 전달에는 성공했지만, AI 시스템이 이 사이트를 발견·이해·인용하기 위해 필요한 거의 모든 요소가 부재한다. 가장 심각한 문제는 두 가지다: **Next.js RSC Flight 직렬화로 인해 본문 콘텐츠 전체가 AI 크롤러에 비가시 상태**이며, **schema.org 구조화 데이터가 전무**하다. 브랜드 자체도 AI 모델의 학습 데이터에 등재되지 않아 ChatGPT, Gemini, Perplexity 등 어떤 AI 시스템도 XORing을 독립 엔티티로 인식하지 못한다.

### 점수 분석

| 카테고리 | 점수 | 가중치 | 가중 점수 |
|---|---|---|---|
| AI 인용 가능성 | 38/100 | 25% | 9.5 |
| 브랜드 권위 | 8/100 | 20% | 1.6 |
| 콘텐츠 E-E-A-T | 27/100 | 20% | 5.4 |
| 기술 GEO 인프라 | 58/100 | 15% | 8.7 |
| 스키마 & 구조화 데이터 | 3/100 | 10% | 0.3 |
| 플랫폼 최적화 | 5/100 | 10% | 0.5 |
| **종합 GEO 점수** | | | **26/100** |

| 점수 범위 | 등급 | 해석 |
|---|---|---|
| 90-100 | Excellent | AI 인용 최상위 |
| 75-89 | Good | 견고한 GEO 기반 |
| 60-74 | Fair | 중간 수준, 개선 여지 있음 |
| 40-59 | Poor | 약한 GEO 신호 |
| **0-39** | **Critical** | **AI 시스템에 거의 비가시 상태** |

---

## Critical 이슈 (즉시 수정)

### 1. RSC Flight 직렬화 — 본문 콘텐츠 AI 크롤러 비가시 ⚠️
**페이지:** https://xoring.ai
**문제:** Next.js `output: "export"` 모드에서 모든 섹션 콘텐츠(`<h1>`, `<h2>`, `<p>`, 기능 설명 등)가 `self.__next_f.push()` JavaScript 페이로드 안에만 존재한다. GPTBot, ClaudeBot, PerplexityBot은 JavaScript를 실행하지 않으므로 제품 가치 제안, 기능 설명, 가격($499) 등 모든 본문 내용이 완전히 비가시 상태다.

**수정 방법:** 빌드 후 `out/index.html`을 열어 `grep "Beyond myself" out/index.html`이 스크립트 태그 외부에서 매칭되는지 확인한다. 매칭되지 않으면 Next.js SSG 출력이 텍스트 노드로 실제 HTML을 생성하는지 검토 필요.

### 2. 구조화 데이터(Schema.org) 완전 부재
**점수:** 3/100
**문제:** `<script type="application/ld+json">` 블록이 단 하나도 없다. Organization, Product, WebSite 스키마 모두 없음. AI 모델이 XORing을 알려진 엔티티로 해석할 수 있는 기계 판독 가능 정보가 전혀 없다.

**수정 방법:** `src/lib/schema.ts` 생성 후 `layout.tsx`의 `<head>`에 JSON-LD 주입 (아래 빠른 실행 항목 참고).

### 3. llms.txt 없음
**URL:** https://xoring.ai/llms.txt → 404
**문제:** AI 언어 모델에 사이트 콘텐츠 요약을 제공하는 신흥 표준 파일이 없다. RSC Flight로 본문이 비가시인 상황에서 이 파일이 AI 크롤러의 유일한 대안 정보원이 될 수 있으나 존재하지 않는다.

**수정 방법:** `/public/llms.txt` 파일 생성 (내용 예시는 30일 실행 계획 참고).

### 4. 개인정보 처리방침 없음
**문제:** 심박수, 혈중 산소, 수면, 위치 데이터 등 생체인식 정보를 수집하는 제품이 개인정보 처리방침 없이 $499 선주문을 받고 있다. GDPR, CCPA 위반 소지가 있으며 신뢰도를 크게 떨어뜨린다.

---

## High Priority 이슈 (1주일 내 수정)

### 5. 메타 설명 부실 (70자, 권장 150-160자)
현재: `"A wearable POC device where behavior becomes value and AI comes alive."` (70자)
AI 크롤러가 신뢰할 수 있는 몇 안 되는 콘텐츠 중 하나인데 사용 가능한 공간의 절반도 활용하지 못하고 있다.

### 6. 브랜드 엔티티 존재 없음
Wikipedia, Wikidata, Crunchbase, ProductHunt, LinkedIn 회사 페이지 — 어느 플랫폼에도 XORing이 등재되어 있지 않다. AI 모델은 "XORing"을 XOR 비트 연산자로 해석할 가능성이 높다.

### 7. 팀/창업자 정보 없음
회사 소개, 팀 페이지, 개인 프로필이 없다. 생체인식·AI·블록체인 세 도메인에서 기술적 주장을 하면서 그 주장을 뒷받침할 사람이 나와 있지 않다.

### 8. 기술 사양 없음
배터리 수명, 센서 정확도, BLE 버전, 방수 등급, 링 사이즈, 지원 OS — 구체적 스펙이 없어 AI가 제품 관련 질문에 답변할 근거 데이터가 없다.

---

## Medium Priority 이슈 (1개월 내 수정)

### 9. sitemap.xml의 `lastmod` 동적 생성
`src/app/sitemap.ts`에서 `new Date()`를 사용해 매 빌드마다 수정일이 갱신된다. 실제 콘텐츠 변경이 없어도 크롤 예산을 낭비한다.

### 10. 보안 헤더 부재
openresty 정적 호스팅에서 HSTS, CSP, X-Frame-Options, X-Content-Type-Options 헤더가 설정되지 않은 것으로 추정된다. 기존 `.htaccess`에 추가 가능.

### 11. 가격 $499의 선주문 여부 불명확
"Coming Soon" 상태와 $499 Pioneer 가격이 있지만 출하일, 선주문 조건, 환불 정책에 대한 설명이 없다.

### 12. 소셜 미디어 링크 플레이스홀더
Footer에 Twitter, Instagram, Discord, Telegram 아이콘이 있지만 모두 `href='#'` 플레이스홀더다. 실제 URL이 없으면 `sameAs` 링크를 만들 수 없다.

---

## Low Priority 이슈

- `<h1>`이 브랜드 태그라인("Beyond myself, Connecting us.")이며 제품 설명 키워드가 없음
- 비디오 2개(`hero-ring.mp4`, `hero-ring-loop.mp4`)가 `<head>`에 preload되어 LCP 리소스와 대역폭을 경쟁함
- Open Graph 이미지가 단 하나로 모든 공유 컨텍스트에서 동일하게 사용됨
- `keywords` 메타 태그가 있지만 AI 시스템과 현대 검색엔진에서 사실상 무의미

---

## 카테고리별 상세 분석

### AI 인용 가능성 (38/100)

XORing의 랜딩 페이지는 시각적 임팩트와 감성 공명을 위해 설계되었고, 기계 판독 가능성은 부차적이다. 카피는 열망적·은유적이어서 AI 인용 소재로는 빈약하다.

**인용 가능한 구절 (약함):**
- "XORing is limited to 500 units globally, priced at $499." — 구체적, 검증 가능
- "Private Mode pauses data sharing. Advanced encryption ensures biometrics and activity data are never shared without explicit consent." — 명확한 행동 클레임
- "XO Ring can be used as a secure key and payment device — tap to unlock, tap to pay." — 기능적 진술

**인용 불가능한 구절:**
- "Beyond myself, Connecting us." — 명제적 내용 없음
- "The world's first social smart ring." — 출처 없는 슈퍼레이티브
- "Real human biometric data is the scarcest, most valuable resource in AI training." — 인용 없는 주장

전체 페이지에 구체적이고 검증 가능한 팩트가 3가지뿐이다: 가격($499), 한정 수량(500개), 센서 종류(심박수·혈중산소·수면·HRV). FAQ 콘텐츠와 구조화 데이터가 전혀 없다.

### 브랜드 권위 (8/100)

**플랫폼 존재 현황:**

| 플랫폼 | 상태 | 비고 |
|---|---|---|
| xoring.ai (자체 사이트) | 존재 | 랜딩 페이지만 |
| Wikipedia | 없음 | POC 단계에서 없음 |
| Wikidata | 없음 | 엔티티 등재 없음 |
| Reddit | 없음 | 커뮤니티 시딩 없음 |
| YouTube | 없음 | 채널 링크 없음 |
| ProductHunt | 미확인 | 뱃지/링크 없음 |
| LinkedIn | 미확인 | 회사 페이지 링크 없음 |
| 언론 보도 | 없음 | POC 단계 |
| AI 모델 엔티티 인식 | 없음 | 학습 데이터에 없음 |

**핵심 리스크:** "XORing"이라는 브랜드명이 XOR 비트 연산자와 이름이 겹쳐 AI 모델이 지속적으로 혼동할 수 있다. 모든 소유 콘텐츠에서 "XORing smart ring" 또는 "XORing wearable"을 첫 문장에 사용해 검색 컨텍스트를 교육해야 한다.

### 콘텐츠 E-E-A-T (27/100)

| 차원 | 점수 | 핵심 문제 |
|---|---|---|
| Experience (경험) | 4/25 | 사용 사례·테스티모니얼·실사용 데이터 없음 |
| Expertise (전문성) | 5/25 | 팀 정보·자격증명·기술 출처 없음 |
| Authoritativeness (권위) | 4/25 | 회사 소개 없음, 외부 검증 없음 |
| Trustworthiness (신뢰) | 9/25 | HTTPS만 있음; 개인정보 처리방침·연락처·이용약관 없음 |

생체인식 데이터 수집, 암호화폐 토큰 획득, $499 선주문을 결합한 YMYL(Your Money or Your Life) 범주의 제품에서 법적 공시가 전혀 없는 것은 중대한 신뢰 문제다.

### 기술 GEO 인프라 (58/100)

**강점:**
- robots.txt: 모든 크롤러 허용 (`User-agent: * Allow: /`)
- Meta 태그: title, canonical, robots, OG, Twitter Card 완비
- HTTPS 적용
- 모바일 최적화 양호 (`viewport-fit=cover`)
- 정적 내보내기로 JS 없이도 meta 태그는 크롤러에 노출

**약점:**
- RSC Flight 직렬화: 본문 콘텐츠가 `self.__next_f.push()` 내부에만 존재 — AI 크롤러 비가시
- llms.txt 없음
- 보안 헤더 미설정 (추정)
- 비디오 2개 preload로 LCP 경쟁

### 스키마 & 구조화 데이터 (3/100)

`https://xoring.ai`에 JSON-LD, Microdata, RDFa — 어떤 형식의 구조화 데이터도 없다. 3점은 deprecated 스키마가 없다는 소극적 점수다.

**누락된 핵심 스키마:**

| 스키마 | 우선순위 | GEO 영향 |
|---|---|---|
| Organization + sameAs | Critical | AI 엔티티 인식의 기반 |
| Product | Critical | 가격·가용성·제품 설명 |
| WebSite | High | 사이트 엔티티 확립 |
| SoftwareApplication | High | 앱 다운로드 CTA 지원 |
| FAQPage | High | AI 답변 블록 |
| speakable | Medium | 음성 검색 최적화 |

**긍정 신호:** 사이트가 `output: "export"` 정적 배포를 사용하므로 `layout.tsx`에 추가되는 모든 JSON-LD는 빌드 시점에 HTML에 포함되어 JS 실행 없이 모든 크롤러가 즉시 읽을 수 있다. 스키마 구현의 기술적 장벽이 낮다.

### 플랫폼 최적화 (5/100)

AI 모델이 학습하고 인용하는 플랫폼(YouTube, Reddit, Wikipedia, LinkedIn, ProductHunt)에 XORing 존재가 없음. 5점은 `.ai` 도메인이 기술 제품임을 시사하는 미미한 신호다.

---

## 즉시 실행 항목 (이번 주)

### 1. llms.txt 생성 (`/public/llms.txt`)

```
# XORing

> XORing is the world's first social smart ring — a wearable device that converts physical activity into social connection and verifiable value on the AIOS Network.

XORing operates in two modes:
- **Social Mode**: Connects wearers through shared physical activity. Features Partner Matching, Social Community, Couple Mode, and Location Sharing.
- **Private Mode**: Pauses all social data sharing. Focuses on personal health optimization with Solo Training, Focus Mode, Secure Key & Payment features.

## AI Agent System
XORing includes four built-in AI agents:
- AI Health Agent: Monitors heart rate, blood oxygen, sleep, and HRV for real-time fatigue prediction
- AI Emotional Agent: Detects stress and emotional states from biometric patterns
- AI Social Agent: Suggests social activities and connections based on activity data
- AI Behavior Agent: Tracks habits and provides behavioral coaching

## Proof of Contribution (PoC)
XORing uses a Proof of Contribution protocol: physical activity generates verifiable biometric data, which earns AIOS tokens on the AIOS Network. This is analogous to Proof of Work but with human movement as the computational work.

## Web3 Identity
The ring serves as a hardware wallet and physical key. Tap to unlock devices, tap to pay. Biometric data is cryptographically owned by the user.

## Availability
- Price: $499 (Pioneer tier, limited to 500 units globally)
- Status: Coming Soon
- Platform: iOS and Android companion app

## Official Site
https://xoring.ai
```

### 2. Organization + Product JSON-LD 추가 (`src/lib/schema.ts` → `src/app/layout.tsx`)

```typescript
// src/lib/schema.ts
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "XORing",
  "url": "https://xoring.ai",
  "logo": {
    "@type": "ImageObject",
    "url": "https://xoring.ai/assets/favicon/android-chrome-512x512.png",
    "width": 512,
    "height": 512
  },
  "description": "XORing is the world's first social smart ring — a wearable device that converts physical activity into social connection and verifiable value.",
  "sameAs": [
    // 실제 소셜 URL로 교체
  ]
}

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "XO Ring",
  "alternateName": "XORing Smart Ring",
  "description": "A social smart ring with dual Social and Private modes, AI agent system, and Proof of Contribution protocol for earning AIOS tokens.",
  "brand": { "@type": "Brand", "name": "XORing" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "499",
    "availability": "https://schema.org/PreOrder"
  }
}
```

`src/app/layout.tsx`의 `<head>` 블록에:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
/>
```

### 3. 메타 설명 확장

현재 (70자):
```
"A wearable POC device where behavior becomes value and AI comes alive."
```

권장 (155자):
```
"XORing is a social smart ring with AI agents, Web3 identity, and Proof of Contribution. Switch between Social Mode and Private Mode. 500 Pioneer units at $499."
```

### 4. Wikidata 엔티티 등재
https://www.wikidata.org 에서 XORing 엔티티 생성. 이것이 AI 모델의 엔티티 인식을 위한 가장 직접적인 경로다.

### 5. 개인정보 처리방침 페이지 생성
`src/app/privacy/page.tsx` 생성 후 footer에 링크 추가. 최소한 수집 데이터 종류, 사용 목적, 보관 기간, 사용자 권리를 명시.

---

## 30일 실행 계획

### 1주차: AI 가시성 기반 구축
- [ ] `/public/llms.txt` 생성 및 배포
- [ ] `src/lib/schema.ts` 생성 (Organization + Product + WebSite JSON-LD)
- [ ] `layout.tsx`에 JSON-LD 주입
- [ ] `layout.tsx` 메타 설명 155자로 확장
- [ ] 빌드 후 `out/index.html`에서 텍스트 노드 가시성 검증

### 2주차: 신뢰 신호 구축
- [ ] 개인정보 처리방침 페이지 생성 (`/privacy`)
- [ ] 이용약관 페이지 생성 (`/terms`)
- [ ] Footer에 실제 소셜 미디어 URL 적용 (Twitter/X, Instagram, Discord)
- [ ] 연락처 정보 추가 (이메일 주소 최소)
- [ ] `.htaccess`에 보안 헤더 추가

### 3주차: 엔티티 권위 확립
- [ ] Wikidata 엔티티 등재 (https://www.wikidata.org)
- [ ] LinkedIn 회사 페이지 생성
- [ ] Crunchbase 또는 AngelList 프로필 생성
- [ ] ProductHunt 출시 준비 (출시 예정 페이지라도 등록)
- [ ] Organization JSON-LD의 `sameAs`에 실제 URL 반영

### 4주차: 콘텐츠 깊이 강화
- [ ] 기술 사양 섹션 추가 (센서, 배터리, 연결, 사이즈)
- [ ] FAQ 섹션 추가 (6-8개 질문) + FAQPage 스키마
- [ ] 창업자/팀 소개 (이름, 배경, LinkedIn 링크)
- [ ] AIOS 토크노믹스 문서 초안
- [ ] Reddit r/smartrings, r/wearables에 POC 소개 포스트

---

## 부록: 분석 페이지

| URL | 제목 | 상태 | GEO 이슈 |
|---|---|---|---|
| https://xoring.ai | XORing — Wear Contribution. Create Connection. | 200 OK | 본문 AI 비가시, 스키마 없음, E-E-A-T 미흡 |
| https://xoring.ai/robots.txt | — | 200 OK | 이상 없음 |
| https://xoring.ai/sitemap.xml | — | 200 OK | lastmod 동적 생성 |
| https://xoring.ai/llms.txt | — | 404 | 미존재 |

---

*GEO (Generative Engine Optimization) 감사 — AI 검색 가시성 최적화 분석*
*분석 도구: 직접 크롤링, 소스코드 분석, 기술 인프라 검토*
