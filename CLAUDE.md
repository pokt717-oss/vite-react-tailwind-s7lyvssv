# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A Vite + React + Tailwind single-page app: a "Project D-Day Calendar" (프로젝트 D-Day 캘린더) for tracking project deadlines in a month-grid calendar view or a sorted list view. All UI text and most code comments are in Korean. There is no backend; all data lives in the browser via `localStorage`.

## Commands

```bash
npm install       # install dependencies
npm run dev        # start Vite dev server
npm run build       # production build to dist/
npm run preview      # serve the production build locally
```

There is no lint script and no test framework configured in this repo (no ESLint config, no test files/runner). `.prettierrc` defines formatting conventions but is not wired into an npm script — run `npx prettier --write .` directly if formatting is needed.

## Architecture

The entire app is one component: `src/main.jsx` mounts `<App />` (in `React.StrictMode`) into `#root`, and `src/App.jsx` default-exports a single component named `ProjectDDayCalendar` (the file name and component name differ — there's no separate router, page, or sub-component structure to look for).

Inside `App.jsx`:
- **State**: plain `useState`/`useEffect`, no external state library. `projects` is lazily initialized from `localStorage.getItem('dday-projects')` (falling back to 3 seed projects) and re-persisted to that same key on every change via a `useEffect`.
- **Data model**: a project is `{ id, title, date: 'YYYY-MM-DD', color, description }`, where `color` is one of the entries in the `COLORS` array (a fixed 7-color Google-Calendar-style palette, each with `name`, a raw hex `value` used for inline `borderLeftColor`, and `bg`/`text`/`border` Tailwind class names used together for chips/badges).
- **Views**: a `view` state toggles between `'calendar'` (month grid, manually computed from `daysInMonth`/`firstDayOfMonth` for the current `currentDate`) and `'list'` (all projects sorted by days-remaining).
- **D-Day math**: `getDDay`/`getDaysNumber` at the top of the file diff `targetDate` against today (both normalized to midnight) — reuse these instead of re-deriving date math elsewhere in the component.
- Adding/deleting projects, the "new project" modal, and month navigation (`prevMonth`/`nextMonth`) are all handled inline with local handlers in the same component.

## Styling

- Styling is almost entirely Tailwind utility classes inline in JSX (`tailwind.config.js` scans `./src/**/*.{html,js,jsx}`).
- The `@tailwind base/components/utilities` directives live in `src/main.scss` (compiled via `sass` + PostCSS/autoprefixer), not in `index.css`.
- `src/index.css` only carries legacy body/code font-family defaults from the original CRA-style template.
- `src/App.css` and `src/logo.svg` are unused leftovers from the original scaffold (not imported anywhere) — don't assume they're part of the active app.
- Icons come from `lucide-react`.

## Conventions

- New UI copy should follow the existing Korean-language convention used throughout `App.jsx`.
- Formatting per `.prettierrc`: no semicolons, single quotes, `arrowParens: avoid`, 120-char print width.
