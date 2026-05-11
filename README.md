# Luma Comercializadora

Landing page estática para Luma Comercializadora. HTML, CSS y JavaScript vanilla con animaciones GSAP, scroll suave con Lenis y partículas con Three.js.

## Correr local

Requiere Node.js solo para servir estáticos.

```bash
npx serve public
```

Abre la URL que imprime (normalmente `http://localhost:3000`). Refresca tras cada cambio.

Alternativas si prefieres otro servidor estático:

```bash
python3 -m http.server -d public 3000
```

## Estructura

```
public/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── LUMA1.mp4
    ├── LUMA2.mp4
    └── LOGOLUMA.jpeg
```

## Deploy en Render (Static Site)

1. Sube el repo a GitHub.
2. En Render, **New → Static Site** y conecta el repositorio.
3. Configuración:
   - **Build Command:** *(vacío)*
   - **Publish Directory:** `public`
   - **Branch:** `main`
4. Deploy. Render sirve `public/index.html` en la raíz.

## Convenciones

Ver `CLAUDE.md` para stack, paleta, tipografías y reglas de diseño.
