# Product

## Register

brand

## Users

Followers and prospects of BaldoMindset, the personal mindset/discipline coaching brand led by Liss Almonte. Primarily Spanish-speaking (the app defaults to `es`, with full English translations available). They arrive via social media (Instagram is showcased on the homepage) looking to break bad habits/vices, build military-grade discipline, reprogram their mindset, and eventually build their own profitable personal brand. The job to be done: get convinced this is a serious, elite program worth applying to (Academy) or paying for (Checkout), take the self-assessment, and return for daily motivational "boosts."

## Product Purpose

A single-page React marketing site for BaldoMindset. It tells the founder's story, explains the Academy mentorship program and pricing tiers, offers an interactive mindset-archetype assessment, delivers daily motivational quotes (Boost), and drives applicants into a Checkout flow. Success = visitors trust the brand enough to apply/purchase, and the site reads as a premium personal brand rather than a generic SaaS product.

## Brand Personality

Bold, raw, high-contrast. Feels like a premium personal brand — disciplined, elite, no-nonsense — not a polished SaaS dashboard. Confidence and intensity over friendliness; "forge" and "architect your legacy" framing rather than soft self-care language.

## Anti-references

- Generic AI/SaaS dark-mode product aesthetic (sky-blue gradient accents, the `#38bdf8` → `#2563eb` family).
- Glassmorphism as a default — blurred translucent cards everywhere.
- Neon glow effects: box-shadow/drop-shadow blooms on icons, buttons, badges, cards.
- Infinite decorative animations on primary CTAs and section titles (`cta-glow-pulse`, `gradient-shift`).
- Ambient floating gradient "orb" blobs behind hero/founder sections.
- Uniform 3-up equal card grids for the homepage portal links.
- An eyebrow/kicker on every single section.

## Design Principles

- Solid dark surfaces, not glass: cards are flat `#161616` panels with subtle borders, no backdrop-filter.
- One accent, used deliberately: red (`#e11d48` / `#9f1239`) replaces all blue, applied to borders, icons, and CTAs — not a rainbow of per-card accent colors.
- Asymmetric layouts over identical grids: bento-style, weighted compositions (e.g. the homepage portal grid) instead of evenly-sized repeating cards.
- Motion with purpose, not decoration: drop infinite ambient pulses/glows/shimmers; keep entrance/hover motion that responds to user action.
- Quieter typographic scaffolding: smaller, muted eyebrows — not a bright, oversized kicker on every section.

## Accessibility & Inclusion

No special requirements beyond standard practice: verify text/border contrast against the new `#0d0d0d`/`#161616` dark surfaces and the `#e11d48` accent, and preserve any existing `prefers-reduced-motion` handling.
