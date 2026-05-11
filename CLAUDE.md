# CLAUDE.md — Luma Comercializadora

Convenciones del proyecto. Léelo antes de tocar código.

## Stack

- HTML, CSS y JavaScript vanilla. **Sin frameworks.**
- Sin bundler. Servir `public/` como estático.

## Librerías (vía CDN)

- **GSAP 3.x** con `ScrollTrigger` para animaciones e interacciones de scroll.
- **Lenis** para scroll suave global.
- **Three.js** para elementos 3D (partículas, fondos sutiles).

## Tipografías (Google Fonts)

- **Fraunces** para títulos (serif, pesos 300 / 400 / 500).
- **Inter** para cuerpo (pesos 400 / 500 / 600).

## Paleta

| Token              | Hex       | Uso                              |
| ------------------ | --------- | -------------------------------- |
| `--white`          | `#FFFFFF` | Fondo dominante                  |
| `--bone`           | `#FAFAF7` | Fondo alternativo / secciones    |
| `--luma-blue`      | `#0E4DA4` | Azul de marca, acento principal  |
| `--gold`           | `#C9A24C` | Acento dorado puntual            |
| `--ink`            | `#0A0F1C` | Texto principal                  |
| `--ink-soft`       | `#5B6470` | Texto secundario                 |
| `--rule`           | `#E8E8E3` | Bordes y divisores               |

## Reglas de diseño críticas

- **Todas las esquinas redondeadas.** Mínimo 16px, ideal 20–28px en tarjetas, 32–40px en piezas de hero, 999px píldora en botones principales.
- **Cero líneas decorativas en esquinas.** Nada de "corner brackets".
- Aire generoso. Padding vertical mínimo 120px en secciones, 180–240px cuando la sección es manifiesto.
- Sombras suaves y muy difuminadas (`0 30px 80px -20px rgba(10,15,28,.18)` y similares). Nada de sombras duras.

## Estética de referencia

Linear, Vercel, Notion, Stripe, Arc Browser. Blanco minimalista, mucho aire, tipografía como protagonista, microinteracciones discretas.

## Estructura de JS

- Por ahora todo en `public/script.js`, bien comentado por sección (`/* ===== Hero ===== */`, etc.).
- Si crece, partir en módulos (`hero.js`, `manifesto.js`, …) e importarlos como `<script type="module">`.

## Estructura de carpetas

```
LUMA/
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── assets/
│       ├── LUMA1.mp4
│       ├── LUMA2.mp4
│       └── LOGOLUMA.jpeg
├── .gitignore
├── README.md
└── CLAUDE.md
```

## Desarrollo

Ver `README.md` para correr local y deploy en Render.
