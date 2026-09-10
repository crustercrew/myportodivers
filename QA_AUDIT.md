# QA Audit — SES Phoenix Portfolio

> **Project:** `myportodivers` (Vite + React + TypeScript + TailwindCSS)
> **Auditor:** DevOps / Static Code Review
> **Date:** 2026-09-09
> **Build status:** ✅ `tsc --noEmit` — 0 errors

---

## Table of Contents

1. [What's Working Well](#whats-working-well)
2. [Issues Summary Table](#issues-summary-table)
3. [Critical Issues](#critical-issues)
4. [High Issues](#high-issues)
5. [Medium Issues](#medium-issues)
6. [Low / Info Issues](#low--info-issues)

---

## What's Working Well

- ✅ TypeScript compiles cleanly — zero errors
- ✅ All 6 navigation sections render correctly via `NavigationContext`
- ✅ CRT glitch entry animation applied consistently across all sections
- ✅ Audio system (global delegated click listener) is well-architected
- ✅ `SciFiCard` corner accents are reusable and visually consistent
- ✅ `ScrambleText` + `InfoCell` micro-animations add good personality
- ✅ `CV.pdf` and `ui2.mp3` are present in `/public` — downloads/sounds work
- ✅ Responsive breakpoints exist (`flex-col` mobile → `flex-row` desktop)
- ✅ `CopyButton` component for email/phone is a nice UX detail
- ✅ AI Terminal local commands (`help`, `skills`, `status`, `sudo hire bernov`, etc.) all work correctly

---

## Issues Summary Table

| # | Severity | Issue | File |
|---|----------|-------|------|
| 1 | 🔴 Critical | Duplicate thumbnail images — 9/10 projects share same image | `src/data/projects.ts` |
| 2 | 🟠 High | All project links are `'#'` (dead / unclickable) | `src/data/projects.ts` |
| 3 | 🟠 High | `overflow: hidden` on `<body>` breaks mobile scrolling | `src/index.css` |
| 4 | 🟠 High | AI Terminal fails for open-ended questions in dev (no `/api/chat`) | `src/services/aiService.ts` |
| 5 | 🟡 Medium | "Okt 2025" typo + experience widget is hardcoded (not data-driven) | `src/components/CenterPanel/DashboardSection.tsx` |
| 6 | 🟡 Medium | Overlapping date ranges between EXP-01 and EXP-03 | `src/data/experienceData.ts` |
| 7 | 🟡 Medium | `select-none` on root layout blocks text copy from bio/contact | `src/layouts/DashboardLayout.tsx` |
| 8 | 🟡 Medium | Contact form: no visual required-field markers (`*`) | `src/components/CenterPanel/ContactSection.tsx` |
| 9 | 🟢 Low | Missing SEO meta tags and favicon | `index.html` |
| 10 | 🟢 Low | Vite plugin deprecation warnings in dev console | `vite.config.ts` |

---

## Critical Issues

---

### #1 🔴 Duplicate Project Thumbnail Images

**File:** `src/data/projects.ts` · Lines 34–144

**Description:**
9 out of 10 projects share the **exact same Google image URL**. Only the first project (`core-qris`) has a unique image. Every other project card renders the same picture, making the Projects section look broken at first glance.

**Projects affected:** `ioms-telkomsel`, `pickme-talent`, `forza-api`, `simple-mobile`, `leadership-kit`, `pj360-suite`, `mentalfit`, `dlanguages`, `truck-route`

**Impact:**
A recruiter viewing the Projects section will see a wall of identical cards. This immediately looks like a bug or placeholder content and undermines portfolio credibility.

**How to fix:**
Replace the `image` field for each project with a unique, thematically appropriate image.
Options:
- Real screenshots of the project UI (best)
- AI-generated mock screenshots
- Stock images representing the domain (banking, telecom, HR, etc.)

```ts
// Example — each project should have its own unique image
{
  id: 'ioms-telkomsel',
  image: '/images/ioms-preview.png', // unique per project
  ...
}
```

---

## High Issues

---

### #2 🟠 All Project Links Are Dead (`'#'`)

**File:** `src/data/projects.ts`

**Description:**
Every project entry has `liveUrl: '#'` and/or `repoUrl: '#'`. The `ProjectCard` component does guard against this with `e.preventDefault()`, but the buttons still render and appear clickable — a recruiter will click them and nothing will happen.

**Impact:**
A recruiter who tries to verify any project will fail silently. This makes the portfolio feel incomplete or unfinished, especially for projects labeled `ACTIVE PROD`.

**How to fix — choose per project:**

| Situation | Action |
|-----------|--------|
| Project has a public GitHub repo | Set `repoUrl` to the real GitHub URL |
| Project is live/deployed | Set `liveUrl` to the real deployed URL |
| Project is internal/NDA | **Remove** the `liveUrl`/`repoUrl` fields entirely — the `🔒 INTERNAL_ENTERPRISE_SYSTEM` badge will render automatically |

> `forza-api` is listed as `ACTIVE PROD` — it should have a real live URL if it's actually deployed.

---

### #3 🟠 `overflow: hidden` on `<body>` Breaks Mobile Scrolling

**File:** `src/index.css` · Line 11

**Description:**
```css
body {
  overflow: hidden;  /* ← problem on mobile */
  height: 100vh;
}
```

On desktop, the `lg:h-screen` layout means each panel manages its own internal scroll — correct. On mobile, the layout switches to `flex-col` (stacked panels), but body-level `overflow: hidden` prevents native page scroll. If the total stacked content exceeds `100vh` (which it does on a phone), bottom content is permanently clipped.

**Impact:**
Mobile users cannot scroll to see the full profile card, AI terminal button, or lower content sections.

**How to fix:**
```css
@media (max-width: 1023px) {
  body {
    overflow: auto;
    height: auto;
  }
}
```

---

### #4 🟠 AI Terminal Fails for Open-Ended Questions in Dev

**File:** `src/services/aiService.ts` · Line 143

**Description:**
```ts
const response = await fetch('/api/chat', { method: 'POST', ... })
```

Any query that doesn't match a local command (e.g., "Tell me about yourself") is forwarded to `/api/chat`. This is a serverless function (`api/chat.ts`) that only works when deployed (Vercel). Running locally with `vite dev`, this route returns 404, and the terminal shows:

```
[COMM LINK FAILURE: ...] Check network or environment configuration.
```

**Impact:**
A recruiter interacting with the AI terminal will hit this error immediately for any natural language question.

**How to fix — Option A:** Add a Vite dev proxy in `vite.config.ts`:
```ts
server: {
  proxy: {
    '/api': 'http://localhost:3001',
  }
}
```

**How to fix — Option B (simpler):** Improve the catch error message to guide users:
```ts
// In the catch block of streamAIChat:
const errorNotice =
  `[AI UPLINK OFFLINE] Live AI requires production deployment.\n` +
  `Try local commands: help · skills · status · projects · contact`
```

---

## Medium Issues

---

### #5 🟡 "Okt 2025" Typo + Hardcoded Experience Widget

**File:** `src/components/CenterPanel/DashboardSection.tsx` · Lines 185–208

**Description:**

**Issue A — Typo:**
```tsx
<span ...>Okt 2025 - Aug 2026</span>
```
`"Okt"` is the Indonesian abbreviation for Oktober. In an English-language portfolio this reads as a typo.

**Issue B — Hardcoded data:**
The Work Experience widget in the Dashboard section is hardcoded with static strings instead of reading from `experienceData.ts`. Any future update to the data file will leave the Dashboard widget out of sync.

**How to fix:**
1. Change `"Okt 2025"` → `"Oct 2025"`
2. Replace the static block with a dynamic render from `experienceData.ts`:

```tsx
import { experiences } from '../../data/experienceData'

{experiences.slice(0, 3).map((exp) => (
  <div key={exp.id} className="border-l-2 border-primary pl-2.5 py-0.5">
    <div className="flex justify-between items-baseline">
      <p className="text-sm font-bold text-white font-headline">{exp.role}</p>
      <span className="text-xs font-mono text-success-neon">{exp.period}</span>
    </div>
    <p className="text-xs text-zinc-300 font-sans mt-0.5">{exp.company}</p>
  </div>
))}
```

---

### #6 🟡 Overlapping Date Ranges in Experience Data

**File:** `src/data/experienceData.ts` · Lines 8, 38

**Description:**
```ts
// EXP-01 (BNI)
period: 'Oct 2025 — August 2026',

// EXP-03 (Metrodata)
period: 'Sep 2023 — August 2026',
```

Both end in **August 2026**, and EXP-01 starts **Oct 2025** — creating a ~10-month overlap that makes it appear the candidate held two simultaneous full-time positions.

Additionally, month formatting is inconsistent across entries:
- `"Oct 2025 — August 2026"` (abbreviated start, full end)
- `"Jan 2024 — Sep 2025"` (both abbreviated)

**Impact:**
Recruiters carefully check date gaps and overlaps. Without context, this looks like a conflict.

**How to fix:**
1. Use consistent short format throughout: e.g. `'Oct 2025 — Aug 2026'`
2. Add a clarifying note to EXP-03's description to explain the consultant/client relationship:
   > "Deployed as consultant to PT Bank Negara Indonesia (BNI) under Metrodata umbrella from Oct 2025 – Aug 2026."

---

### #7 🟡 `select-none` Blocks Text Copy from Bio and Contact

**File:** `src/layouts/DashboardLayout.tsx` · Line 12

**Description:**
```tsx
<div className="flex flex-col min-h-screen lg:h-screen p-2 select-none">
```

`select-none` is applied to the entire app root, disabling text selection globally. This means recruiters cannot:
- Manually copy your email address
- Select and copy bio or objective text
- Copy skill or tech stack names

The `CopyButton` component handles email/phone specifically, but all other text is unselectable.

**How to fix:**
Remove `select-none` from the root layout div and apply it only to decorative/navigation elements:

```tsx
// DashboardLayout.tsx — remove select-none from root
<div className="flex flex-col min-h-screen lg:h-screen p-2">

// Apply only where appropriate
<nav className="... select-none">
<footer className="... select-none">
```

---

### #8 🟡 Contact Form Has No Required Field Indicators

**File:** `src/components/CenterPanel/ContactSection.tsx` · Lines 223–283, 305–306

**Description:**
The form hint text reads:
```
"All fields marked are required."
```
But no fields have any visual mark. All four inputs (Name, Email, Subject, Message) look identical. Name, Email, and Message are required; Subject is optional — users cannot tell the difference until they get an error.

**How to fix:**
Add `*` to required field labels and `(optional)` to Subject, and update the hint text:

```tsx
// Required label
<label ...>
  Name <span className="text-red-400">*</span>
</label>

// Optional label
<label ...>
  Subject <span className="text-zinc-500 text-[9px]">(optional)</span>
</label>

// Updated hint text
<span className="text-primary/30">Fields marked with * are required.</span>
```

---

## Low / Info Issues

---

### #9 🟢 Missing SEO Meta Tags and Favicon

**File:** `index.html`

**Description:**
The `<head>` only contains a `<title>` tag. The following are missing:

```html
<meta name="description" content="Muhammad Fachreal Bernov — Application & Full Stack Developer. 3+ years building enterprise systems, banking middleware, and modern web apps." />
<meta property="og:title" content="SES Phoenix — Bernov's Developer Portfolio" />
<meta property="og:description" content="Application Developer with expertise in Java, Spring Boot, webMethods, OutSystems, and React." />
<meta property="og:image" content="/og-preview.png" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="icon" href="/favicon.ico" />
```

**Impact:**
When the portfolio URL is shared on LinkedIn, Slack, or WhatsApp, no preview card is generated. The browser tab also shows no favicon.

---

### #10 🟢 Vite Plugin Deprecation Warnings

**File:** `vite.config.ts`

**Description:**
The dev server outputs on every start:
```
`esbuild` option was specified by "vite:react-babel" plugin. This option is deprecated, use `oxc` instead.
`optimizeDeps.rollupOptions` is deprecated. Use `optimizeDeps.rolldownOptions` instead.
```

**Impact:**
No functional impact currently, but these will become hard errors in future Vite versions.

**How to fix:**
Migrate to `@vitejs/plugin-react-oxc`:
```bash
pnpm remove @vitejs/plugin-react
pnpm add @vitejs/plugin-react-oxc
```
Then update `vite.config.ts`:
```ts
import react from '@vitejs/plugin-react-oxc'  // was: @vitejs/plugin-react
```

---

*End of QA Audit — 10 issues found: 1 Critical · 3 High · 4 Medium · 2 Low*
