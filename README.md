# SES Phoenix Command Center (TypeScript)

Componentized, typed Vite + React version of the original static HTML dashboard.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build / type-check

```bash
npm run build      # tsc -b && vite build
npm run lint       # tsc --noEmit only
```

## Folder structure

```
src/
  assets/          Static files (images/fonts) you import directly in code.
                   Currently empty — see assets/README.md.

  components/      Reusable, presentational building blocks. No page/route
                   knows or cares about *where* it's rendered.
    icons/PhoenixIcon.tsx
    Header/Header.tsx
    Footer/Footer.tsx
    LeftPanel/       ProfileCard.tsx, AITerminal.tsx, index.tsx
    CenterPanel/     RadarBackground.tsx, ProjectCard.tsx, TacticalButtons.tsx, index.tsx
    RightPanel/      CombatReadiness.tsx, TechStackItem.tsx, index.tsx

  context/         React Context providers for state shared across many
                   components/pages (not just parent → child props).
    TerminalContext.tsx   Shares the AI terminal's log + sendCommand.

  data/            Static/seed data, fully typed against utils/types.ts.
    projects.ts
    techStack.ts

  hooks/           Reusable stateful logic extracted out of components.
    useClock.ts          Live HH:MM:SS clock.
    useTerminalLog.ts    Terminal log state + sendCommand logic.

  layouts/         Shells that wrap one or more pages with shared chrome
                   (header, footer, nav) via react-router's <Outlet />.
    DashboardLayout.tsx

  pages/           Route-level components. Compose components/ + layouts/.
    DashboardPage.tsx    The main three-panel command center view.
    NotFoundPage.tsx     Fallback route, proves the layout serves >1 page.

  services/        Framework-agnostic business logic / would-be API calls.
    commandService.ts    Simulates the AI's async response to a command.

  utils/           Small, pure, dependency-free helpers and shared types.
    time.ts              formatTime()
    types.ts             Project, TechStackEntry, TerminalLine, etc.

  App.tsx          Route table (react-router-dom <Routes>/<Route>).
  main.tsx         Entry point: BrowserRouter + TerminalProvider + App.
  index.css        Tailwind directives + custom effects (scanline, hex-frame, etc).
```

## Why this shape

- **components/** never import from **pages/** — they're pure UI, reusable by
  any current or future page (e.g. you could add a `SettingsPage` that reuses
  `RightPanel` without touching it).
- **pages/** are the only things wired into routing (`App.tsx`); they just
  assemble components.
- **layouts/** hold anything that should persist across page navigation
  (header, footer, scanline overlay) so pages don't repeat that markup.
- **context/** is for state that multiple, possibly unrelated, components
  need — here, the AI terminal log, in case a future page wants to show or
  control it too. Local-only UI state (like the terminal's input box value)
  stays in the component via `useState`.
- **hooks/** and **services/** split "React state glue" (hooks) from
  "actual logic / would-be network calls" (services), so swapping
  `commandService.ts`'s mock for a real `fetch()` call touches one file.
- **utils/types.ts** is the single source of truth for shared shapes
  (`Project`, `TechStackEntry`, `TerminalLine`), imported with `import type`
  everywhere else.

## Notes on the conversion

- Tailwind compiles via `tailwindcss`/PostCSS (see `tailwind.config.js`)
  instead of the `cdn.tailwindcss.com` script, since the CDN build isn't
  meant for production.
- `react-router-dom` was added so `DashboardLayout` can wrap multiple pages
  and share `Header`/`Footer` — ready for you to add more routes/pages that
  reuse the same panel components.
- A `@/*` path alias (pointing at `src/`) is configured in both
  `tsconfig.json` and `vite.config.ts` if you'd rather write
  `import Header from '@/components/Header/Header'` than relative paths.
- I could not run `npm install`/`tsc`/`vite build` in this sandbox (no
  network access), so please run `npm install && npm run build` on your
  machine as a first check — let me know if anything doesn't compile and
  I'll fix it.
