/* =========================================================
   Luma — script principal
   Stack: GSAP + ScrollTrigger (UMD por CDN), Lenis (ESM por CDN).
   Three.js se importa cuando se necesite (próximas secciones).
   ========================================================= */

import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.mjs";

/* ===== GSAP global ===== */

gsap.registerPlugin(ScrollTrigger);

/* ===== Lenis — scroll suave global ===== */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const lenis = new Lenis({
  duration: 1.15,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});

// Sincroniza Lenis con el ticker de GSAP para que ScrollTrigger
// reciba los eventos de scroll correctos.
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Anclas con scroll suave (cualquier <a href="#..."> excepto "#")
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -72 });
  });
});

/* ===== Navegación — estado al hacer scroll ===== */

const nav = document.querySelector("[data-nav]");
if (nav) {
  const setNavState = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  setNavState();
  window.addEventListener("scroll", setNavState, { passive: true });
}

/* ===== Hero — animación de entrada ===== */

const heroMedia = document.querySelector("[data-hero-media]");
const heroTitle = document.querySelector(".hero__title");
const heroSubtitle = document.querySelector(".hero__subtitle");
const heroCtas = document.querySelector(".hero__ctas");

if (heroMedia) {
  // Estado inicial del contenido interno (sin afectar el contenedor).
  gsap.set([heroTitle, heroSubtitle, heroCtas], { opacity: 0, y: 18 });

  const tl = gsap.timeline({
    defaults: { ease: "expo.out" },
    delay: 0.1,
  });

  tl.to(heroMedia, {
    scale: 1,
    opacity: 1,
    duration: 1.4,
  })
    .to(
      heroTitle,
      { opacity: 1, y: 0, duration: 1.1 },
      "-=0.85"
    )
    .to(
      heroSubtitle,
      { opacity: 1, y: 0, duration: 0.9 },
      "-=0.75"
    )
    .to(
      heroCtas,
      { opacity: 1, y: 0, duration: 0.9 },
      "-=0.7"
    );
}
