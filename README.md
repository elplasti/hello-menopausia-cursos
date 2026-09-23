# Hello Menopausia — Cursos y Talleres

Sitio estático en [Astro](https://astro.build) con el catálogo de cursos y talleres de Hello Menopausia. El diseño toma la marca de [Partners](https://partners.hellomenopausia.com/) y la retícula de fichas de [Sin Reglas / Talleres](https://sin-reglas.mx/talleres).

Esta primera versión publica **12 cursos de ejemplo** (videos públicos de YouTube) y perfiles de ponentes listos para completar.

## Páginas

| Ruta | Descripción |
| --- | --- |
| `/` | Hero, destacados y grid de 12 cursos |
| `/cursos` | Catálogo con filtros Masterclass / Taller |
| `/cursos/[slug]` | Embed de YouTube + ficha de ponente |
| `/ponentes` | Directorio de ponentes |
| `/ponentes/[slug]` | Perfil y sesiones de la ponente |
| `/ponentes/mi-perfil` | Portal de ponente (validación + éxito) |
| `/admin` | Panel del equipo, protegido por contraseña |
| `/faq` | Preguntas frecuentes |

## Desarrollo

Requiere Node.js 20+.

```bash
npm install
npm run dev
```

Build de producción (salida en `dist/`):

```bash
npm run build
npm run preview
```

## Cloudflare Pages

El build público **no requiere secretos**.

```bash
npm run build
npx wrangler pages deploy dist --project-name hello-menopausia-cursos
```

Hay un `wrangler.toml` opcional (`pages_build_output_dir = "dist"`).

En el dashboard de Pages puedes usar:

- **Build command:** `npm run build`
- **Output directory:** `dist`

### Contraseña de admin

`/admin` usa `PUBLIC_ADMIN_PASSWORD`. Si no se define, el valor por defecto es `hello-admin`.

```bash
# .env local (no se commitea)
PUBLIC_ADMIN_PASSWORD=hello-admin
```

Es una puerta del lado del cliente para el equipo, no un secret de servidor. Los cambios del panel se guardan en `localStorage` y se pueden exportar como JSON para actualizar las colecciones.

## Contenido

- Colecciones Astro en `src/content/courses` y `src/content/speakers`
- Semilla: `src/data/seed-content.json`
- Regenerar markdown (opcional): `node scripts/generate-content.mjs`

Todo el copy público está en **español (es-MX)**. Las fichas llevan la leyenda de **contenido de ejemplo**.

## Marca

- Fondo `#F7F5EE`, suave `#FBF8F1`, tinta `#2D2E45`
- Rosa `#D1738B`, ciruela `#8D5473`, azul `#6E8FB1`
- Fuentes: Figtree + Instrument Serif
- Logos: `public/assets/logo-negro.png` y `public/assets/logo-blanco.png`

## Licencia

Contenido editorial de Hello Menopausia. Los videos semilla son material público de YouTube usado solo como ejemplo.
