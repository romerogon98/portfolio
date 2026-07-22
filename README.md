# Portfolio — Gonzalo Romero

Sitio personal de portfolio. Next.js + GSAP + next-intl, deploy en Vercel.

## Flujo de ramas

- `main` → producción. Protegida: solo se actualiza vía Pull Request con CI en verde.
- `staging` → rama de trabajo. Cada push genera un preview deploy propio en Vercel.
- `feature/*` (opcional) → para cambios grandes o riesgosos, con su propio preview.

Flujo típico: trabajar en `staging` (o una rama `feature/x`) → push → revisar el preview de Vercel → abrir PR a `main` → esperar CI → merge → queda en producción.

## Desarrollo local

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Deploy

Conectado a Vercel: cada push a cualquier rama genera un deployment (preview para ramas que no son `main`, producción para `main`).
