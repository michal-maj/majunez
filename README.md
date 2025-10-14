# Majunez Portfolio – React + TypeScript

An updated, data-driven version of the Majunez portfolio site powered by React 19, Vite, and TypeScript. The project preserves the original visual experience while modernising the codebase with component composition, hooks, and typed integrations around legacy jQuery plugins.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser. The dev server reloads automatically when you edit source files.

### Production Build

```bash
npm run build
```

The optimised output lands in `dist/`. Preview it locally with:

```bash
npm run preview
```

## 🧩 Legacy Integrations

The original site relied heavily on jQuery-based plugins for animations, galleries, and lightboxes. These have been retained inside `public/` and orchestrated through typed hooks (`usePortfolioInit`, `useNavigationTransition`, etc.). Global typings are declared in `src/types/global.d.ts` to make the interop explicit.
