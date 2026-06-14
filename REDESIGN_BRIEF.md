# BaldoMindset — Full Frontend Redesign Brief

## What we're doing
Executing a **full visual reset** of the BaldoMindset React site. The user confirmed direction: "Full reset — new visual language, bold, raw, high-contrast, feels more like a premium personal brand than a SaaS product."

---

## Current State (What's Wrong)
- **Colors:** Sky-blue gradient accent (`#38bdf8` → `#2563eb`). Looks like a generic AI/SaaS dark mode product. Wrong for a grit/discipline personal brand.
- **Glassmorphism everywhere:** Every card uses `backdrop-filter: blur(16px)`. Cliché.
- **Neon glow effects everywhere:** 40+ instances of `rgba(56, 189, 248, x)` box-shadows, drop-shadows, glow pulses.
- **`cta-glow-pulse` infinite animation on every primary button.** Tacky.
- **Hero:** Centered text over a slideshow with a floating blue ambient orb (`hero-section::before`). Generic.
- **3 equal portal cards** on home page. Banned by design system.
- **Eyebrow abuse:** `section-subtitle` on every single section. Too many.
- **Section title has infinite `gradient-shift` animation.** Remove.
- **Ambient glow orb on founder section** (`founder-glow-backdrop`). Remove glow.
- **Mobile nav active state has blue text-shadow.** Remove.

---

## New Design System

### Colors (replace in `:root`)
```css
--bg-primary: #0d0d0d;
--bg-secondary: #111111;
--bg-card: #161616;
--bg-card-hover: #1c1c1c;

--border-color: rgba(255, 255, 255, 0.07);
--border-color-hover: rgba(225, 29, 72, 0.28);
--border-glow: rgba(225, 29, 72, 0.18);

--text-primary: #f2efea;
--text-secondary: #717171;
--text-muted: #4a4a4a;

--accent-primary: #e11d48;
--accent-secondary: #9f1239;
--accent-gradient: linear-gradient(135deg, #e11d48 0%, #9f1239 100%);
--accent-gradient-glow: rgba(225, 29, 72, 0.06);

--success: #10b981;
--success-glow: rgba(16, 185, 129, 0.12);

--font-heading: 'Expose Variable', 'Outfit', -apple-system, sans-serif;
--font-body: 'Plus Jakarta Sans', -apple-system, sans-serif;

--transition-fast: 0.18s cubic-bezier(0.4, 0, 0.2, 1);
--transition-normal: 0.28s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 0.45s cubic-bezier(0.4, 0, 0.2, 1);

--glass-backdrop: blur(12px);
--glass-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.5);
```

### Shape consistency (pick one system, apply everywhere)
- Cards: `border-radius: 12px`
- Buttons: `border-radius: 10px`
- Inputs: `border-radius: 8px`
- Small UI (badge, tag): `border-radius: 6px`
- Lang toggle: `border-radius: 6px` (NOT 9999px pill)
- Remove all `border-radius: 9999px` pill buttons

### Glass card — solid, not glassmorphism
```css
.glass-card {
  background: var(--bg-card); /* #161616 - solid */
  border: 1px solid var(--border-color);
  border-radius: 12px;
  /* NO backdrop-filter, NO -webkit-backdrop-filter */
  transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
}
.glass-card:hover {
  border-color: var(--border-color-hover);
  box-shadow: 0 8px 30px 0 rgba(0, 0, 0, 0.4);
}
```

### Section subtitle (eyebrow) — smaller, less dominant
```css
.section-subtitle {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted); /* was accent-primary — too bright */
  display: inline-block;
  margin-bottom: 10px;
}
```

---

## Specific Changes Needed

### `src/index.css` — FULL REWRITE
Replace the entire file with new design tokens and base styles as specified above. Keep:
- The `@import url(Google Fonts)` line (already in production)
- The `@font-face` for Expose Variable
- The base resets and headings
- Gradient-text utility (but it'll now be red since `--accent-gradient` is red)

### `src/App.css` — TARGETED EDITS + COLOR REPLACE

**Step 1: bash sed - replace hardcoded blue colors**
Run in `/Users/moguljordan23/maldomindset/src/`:
```bash
sed -i '' 's/rgba(56, 189, 248,/rgba(225, 29, 72,/g' App.css
sed -i '' 's/rgba(37, 99, 235,/rgba(159, 18, 57,/g' App.css
sed -i '' 's/rgba(8, 9, 13,/rgba(13, 13, 13,/g' App.css
```

**Step 2: Structural edits to App.css**

1. **Navbar** — remove blue glow from logo, subtle blur kept (nav is sticky):
   ```css
   /* Find .nav-logo-icon and remove this line: */
   filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.5));
   ```

2. **Mobile nav active text-shadow** — remove:
   ```css
   /* Find .mobile-nav-link.active and remove: */
   text-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
   ```

3. **CTA nav button** — change `border-radius: 9999px` → `border-radius: 10px`, remove blue glow shadow

4. **Hero section** — left-align the content:
   ```css
   .hero-section {
     align-items: flex-start;
     text-align: left;
     padding-left: max(24px, 8vw);
   }
   .hero-content {
     align-items: flex-start;
   }
   .hero-actions {
     justify-content: flex-start;
   }
   ```

5. **Hero overlay** — change from top-to-bottom to left-to-right:
   ```css
   .hero-video-overlay {
     background: linear-gradient(
       100deg,
       rgba(13, 13, 13, 0.90) 0%,
       rgba(13, 13, 13, 0.72) 40%,
       rgba(13, 13, 13, 0.40) 70%,
       rgba(13, 13, 13, 0.15) 100%
     );
   }
   ```

6. **Hero ambient glow blob** — remove entirely:
   ```css
   .hero-section::before {
     display: none;
   }
   ```

7. **Primary button** — remove the infinite glow pulse, change radius:
   ```css
   /* In the main .primary-btn block, keep box-shadow but remove animation */
   /* Remove this entire block at the bottom of App.css: */
   .primary-btn {
     animation: cta-glow-pulse 3s ease-in-out infinite;
   }
   /* And remove/keep-but-empty the keyframes: */
   @keyframes cta-glow-pulse { ... }
   ```

8. **Portal card grid** — asymmetric bento (2-column where first card spans 2 rows):
   ```css
   .home-portal-grid {
     display: grid;
     grid-template-columns: 1fr 1fr;
     grid-template-rows: auto auto;
     gap: 24px;
     margin-top: 48px;
   }
   .home-portal-grid .portal-card:first-child {
     grid-row: span 2;
   }
   @media (max-width: 1024px) {
     .home-portal-grid {
       grid-template-columns: 1fr 1fr;
     }
   }
   @media (max-width: 768px) {
     .home-portal-grid {
       grid-template-columns: 1fr;
     }
     .home-portal-grid .portal-card:first-child {
       grid-row: auto;
     }
   }
   ```

9. **Portal card icons** — normalize all to single red accent (remove purple/rose/green variations):
   ```css
   .portal-card-icon.academy-color,
   .portal-card-icon.assessment-color,
   .portal-card-icon.story-color,
   .portal-card-icon.pillars-color {
     color: var(--accent-primary);
     filter: none; /* remove the drop-shadow glow */
   }
   ```

10. **Pillar icon wrappers** — normalize all to same red (remove 4-color system):
    ```css
    .pillar-icon-wrapper.discipline,
    .pillar-icon-wrapper.fortitude,
    .pillar-icon-wrapper.vision,
    .pillar-icon-wrapper.mastery {
      background: rgba(225, 29, 72, 0.08);
      color: var(--accent-primary);
      border: 1px solid rgba(225, 29, 72, 0.18);
    }
    ```

11. **Section title** — remove `gradient-shift` animation and `background-size: 200% auto`:
    ```css
    /* Find this block and remove: */
    .section-title {
      background-size: 200% auto;
      animation: gradient-shift 5s ease infinite;
    }
    /* Also remove the @keyframes gradient-shift block */
    ```

12. **CTA glow overlay** — hide the blue radial blob:
    ```css
    .cta-glow-overlay {
      display: none;
    }
    ```

13. **Founder glow backdrop** — remove the animated floating glow:
    ```css
    .founder-glow-backdrop {
      display: none;
    }
    ```

14. **Benefit icon and check icon** — remove blue filter glow:
    ```css
    /* Find and remove lines like: */
    filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4));
    filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); /* keep green for checkmarks if wanted */
    ```

15. **Badge glow** (`.badge-glow` in hero if still used) — simplify or remove the glowing border

16. **All `border-radius: 9999px`** for buttons → `border-radius: 10px` (keep 9999px only for very small pills like tags)

### No JSX changes required
All the design changes above are CSS-only. The JSX structure stays intact. The `gradient-text` class on the hero second line will automatically become red since `--accent-gradient` is now red.

---

## Files to modify
1. `src/index.css` — full rewrite
2. `src/App.css` — sed + structural edits (no JSX changes needed)

## Files NOT to touch
- All `.jsx` files in `src/pages/` 
- `src/App.jsx`
- `src/main.jsx`
- `src/constants/`
- `package.json`
- `vite.config.js`

---

## Quick validation after changes
Run `npm run dev` and verify:
- Hero is left-aligned with red accent on "Architect Your Legacy" text
- No blue anywhere (cards, buttons, borders, glows)
- Cards are solid dark (#161616), not glassmorphism
- Primary button has no infinite pulse animation
- Portal cards are in an asymmetric 2-column bento layout (left card taller)
- Section subtitles are smaller and muted gray (not bright blue)

---

## Project tech stack
- React 19 + Vite 8
- No Tailwind (pure CSS with CSS custom properties)
- No test suite
- `npm run dev` to start, `npm run build` for production
- Working dir: `/Users/moguljordan23/maldomindset`
