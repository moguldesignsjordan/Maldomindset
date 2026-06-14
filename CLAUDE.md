# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

No test suite is configured.

## Architecture

Single-page React app built with Vite. Navigation is handled entirely in state — there is no router. `App.jsx` owns `currentView`, `language`, and the shared `checkoutForm` state, and conditionally renders one page component at a time.

**Pages** (`src/pages/`): `Home`, `Story`, `Academy`, `Assessment`, `Boost`, `Checkout`. Each receives `navigateToView` and `language` as props. `Academy` also receives `setCheckoutForm` so it can pre-fill the checkout form from the application form before navigating.

**Constants** (`src/constants/`):
- `translations.js` — `TRANSLATIONS` object keyed by `'en'` and `'es'`. All user-visible strings live here. To add a string, add it to both locale objects.
- `data.js` — `MOTIVATIONAL_QUOTES` (by category: `discipline`, `resilience`, `focus`, `vision`), `getRandomQuote()` helper, and `ASSESSMENT_QUESTIONS` for the mindset quiz.

**Styling**: Plain CSS in `src/App.css` (global layout, navbar, footer, shared utilities) and `src/index.css` (base resets/fonts). No CSS modules or utility framework.

**Language toggle**: `language` state lives in `App.jsx` (`'es'` default). Every page receives it and resolves strings via `const t = TRANSLATIONS[language]`.

**Assets**: Static images/fonts in `src/assets/`. The `mdalogo` asset referenced in `App.jsx` must be a `.png` (currently `mdalogo.jpeg` exists but the import points to `mdalogo.png` which is deleted — this will cause a build error until resolved).
