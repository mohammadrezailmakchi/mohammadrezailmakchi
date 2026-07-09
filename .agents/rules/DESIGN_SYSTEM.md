---
name: design-system
description: Enforces a high-end, premium minimalist aesthetic on all UI layouts.
activated: always-on
---
# Premium Front-End UI Architecture Constraints

You must strictly execute all styling under these elite design standards. Do not compromise.

## 1. Aesthetic Identity & Composition
- **Minimalism Over Complexity:** Never stack distinct tools or tech icons inside heavily outlined, intensely colored boxes. 
- **The Floating Grid Concept:** All sections must breathe. Use layout background gradients rather than structural boxes to separate blocks.
- **Negative Space Enforcements:** Double the amount of padding between core elements. Use `space-y-12`, `py-24`, and generous section margins.
- **Micro-Interactions:** Animations must be brief, ultra-low weight, and purposeful (e.g., subtle text opacity reveals or tiny 2px translational shifts on hover). No long or jarring animations.

## 2. Dynamic Typography Hierarchy
- Set explicit font weight scaling. Titles must utilize `font-extrabold` and `tracking-tight` with fluid sizing (`text-4xl sm:text-6xl`).
- Global Prose must be set to soft, clean readability (`text-slate-400` in dark mode or `text-zinc-600` in light mode).
- **Multilingual Support:** For all Persian/Farsi linguistic text, you must use the 'Vazirmatn' font family with balanced line-heights (`leading-relaxed`).

## 3. Light/Dark Architecture
- Implement a flawless toggle system utilizing Tailwind's `class` mechanism. 
- Dark Mode Base: `bg-slate-950` with highly transparent grid lines (`border-slate-900/40`).
- Light Mode Base: `bg-zinc-50` or `bg-slate-50` with minimal borders (`border-zinc-200/60`).