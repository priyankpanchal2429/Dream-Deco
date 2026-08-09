---
name: UI/UX Design System Skill
description: Enforces high-end enterprise SaaS UI/UX design standards, modern CSS design tokens, micro-animations, responsive layout rules, and accessibility across all web applications.
---

# UI/UX & Web Design System Skill

This skill provides comprehensive instructions for designing and implementing world-class enterprise SaaS interfaces (inspired by Stripe, Linear, Vercel, Notion, and GitHub).

## Core Design Principles

1. **Monochrome & Curated Palette Architecture**:
   - Never use default browser colors or generic primary red/blue/green.
   - Enforce explicit HSL or HEX design tokens (`#FFFFFF`, `#111111`, `#6B7280`, `#E5E7EB`).
   - Use subtle dark/light contrast ratios with clean borders (`1px solid #E5E7EB`).

2. **Typography & Geometry Rules**:
   - Use clean modern font stacks (Inter, System UI, SF Pro).
   - Standardize border radii (`12px` cards, `8px` inputs/buttons, `16px` pills).
   - Use subtle multi-layered drop shadows: `0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)`.

3. **Micro-Interactions & State Transitions**:
   - Enforce smooth 200ms cubic-bezier transitions (`all 200ms cubic-bezier(0.16, 1, 0.3, 1)`).
   - Input focus rings must smoothly transition borders to `#111111` with soft focus glow (`0 0 0 3px rgba(17, 17, 17, 0.08)`).
   - Buttons must feature loading spinners and disabled states during asynchronous operations.

4. **Responsive Layout Grid**:
   - Mobile-first and desktop-optimized flex/grid layouts.
   - Clean whitespace, generous padding (`24px` to `40px` card containers), and zero visual clutter.
