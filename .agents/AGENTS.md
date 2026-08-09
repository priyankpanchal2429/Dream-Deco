# Antigravity Project Rules & Design Standards

## UI/UX & Frontend Standards
- Always enforce modern enterprise SaaS design aesthetics (Black & White theme, 12px border radius, thin light gray borders `#E5E7EB`, 200ms focus/hover transitions).
- Use reusable components, clean single-source-of-truth design tokens in `variables.css`, and modular structure.
- Never hardcode duplicate colors or ad-hoc inline styles when design tokens exist.
- Ensure 100% responsive design across desktop, tablet, and mobile displays.

## Architecture & Code Quality
- Follow SOLID principles, clean separation of files, and type safety (TypeScript).
- Backend and Frontend must be strictly organized in `frontend/` and `backend/` directories.
- Always verify builds with `npm run build` after completing edits.
