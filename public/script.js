/* =========================================================
   Luma — script principal
   GSAP + ScrollTrigger (UMD por CDN) · Lenis (ESM por CDN)
   Three.js (ESM, lazy) para detalle 3D en sección contacto.
   ========================================================= */

import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.mjs";

const WA_BASE = "https://wa.me/525549591723?text=";
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

gsap.registerPlugin(ScrollTrigger);

/* ===== Lenis — scroll suave global ===== */

const lenis = new Lenis({
  duration: 1.15,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

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

/* ===== WhatsApp templated — construye hrefs desde data-wa ===== */

document.querySelectorAll("[data-wa]").forEach((el) => {
  const msg = el.getAttribute("data-wa") || "";
  el.setAttribute("href", WA_BASE + encodeURIComponent(msg));
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
});

/* ===== Nav — estado al hacer scroll ===== */

const nav = document.querySelector("[data-nav]");
if (nav) {
  const setNavState = () =>
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  setNavState();
  window.addEventListener("scroll", setNavState, { passive: true });
}

/* ===== Floating WhatsApp — aparece tras 200px de scroll ===== */

const waFloat = document.querySelector("[data-wa-float]");
if (waFloat) {
  const setWaState = () =>
    waFloat.classList.toggle("is-visible", window.scrollY > 200);
  setWaState();
  window.addEventListener("scroll", setWaState, { passive: true });
}

/* ===== Hero — animación de entrada ===== */

const heroMedia = document.querySelector("[data-hero-media]");
const heroTitle = document.querySelector(".hero__title");
const heroSubtitle = document.querySelector(".hero__subtitle");
const heroCtas = document.querySelector(".hero__ctas");
const heroAudio = document.querySelector("[data-audio-toggle]");

if (heroMedia) {
  gsap.set([heroTitle, heroSubtitle, heroCtas, heroAudio], {
    opacity: 0,
    y: 18,
  });

  const tl = gsap.timeline({
    defaults: { ease: "expo.out" },
    delay: 0.1,
  });

  tl.to(heroMedia, { scale: 1, opacity: 1, duration: 1.4 })
    .to(heroTitle, { opacity: 1, y: 0, duration: 1.1 }, "-=0.85")
    .to(heroSubtitle, { opacity: 1, y: 0, duration: 0.9 }, "-=0.75")
    .to(heroCtas, { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
    .to(heroAudio, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5");
}

/* ===== Hero — audio toggle ===== */

const heroVideo = document.querySelector("[data-hero-video]");
if (heroAudio && heroVideo) {
  heroAudio.addEventListener("click", () => {
    const willMute = !heroVideo.muted;
    heroVideo.muted = willMute;
    heroAudio.classList.toggle("is-muted", willMute);
    heroAudio.setAttribute("aria-pressed", String(!willMute));
    heroAudio.setAttribute(
      "aria-label",
      willMute ? "Activar audio del video" : "Silenciar audio del video"
    );
    const p = heroVideo.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  });
}

/* ===== Video 2 — play con audio en click del usuario ===== */

const v2 = document.querySelector("[data-video2-el]");
const v2Play = document.querySelector("[data-video2-play]");
const v2Poster = document.querySelector("[data-video2-poster]");

if (v2 && v2Play && v2Poster) {
  v2Play.addEventListener("click", () => {
    v2.muted = false;
    v2.controls = true;
    v2Poster.classList.add("is-hidden");
    v2Play.classList.add("is-hidden");
    const p = v2.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        v2.controls = true;
      });
    }
  });
}

/* ===== Reveal genérico — ScrollTrigger =====
   <... data-reveal>: anima el elemento (fade + slide up).
   <... data-reveal data-reveal-children=".cls" data-reveal-stagger="0.1">:
     anima hijos del selector con stagger.
   data-reveal-mode="scale": entrada con fade + scale 0.92.
   ========================================================= */

gsap.utils.toArray("[data-reveal]").forEach((el) => {
  const childrenSelector = el.getAttribute("data-reveal-children");
  const targets = childrenSelector
    ? el.querySelectorAll(childrenSelector)
    : el;

  if (childrenSelector && (!targets || targets.length === 0)) return;

  const staggerAttr = el.getAttribute("data-reveal-stagger");
  const stagger = staggerAttr ? parseFloat(staggerAttr) : 0.08;
  const mode = el.getAttribute("data-reveal-mode");

  const fromProps =
    mode === "scale"
      ? { opacity: 0, scale: 0.92, y: 20, transformOrigin: "50% 50%" }
      : { opacity: 0, y: 36 };

  gsap.from(targets, {
    ...fromProps,
    duration: 1.05,
    ease: "power3.out",
    stagger: childrenSelector ? stagger : 0,
    scrollTrigger: {
      trigger: el,
      start: "top 82%",
      once: true,
    },
  });
});

/* ===== Float infinito — íconos de "A quién servimos" ===== */

if (!prefersReducedMotion) {
  document.querySelectorAll("[data-float]").forEach((el, i) => {
    gsap.to(el, {
      y: -6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: (i % 6) * 0.4,
    });
  });
}

/* ===== Tilt 3D suave — tarjetas de cobertura =====
   rotateX/rotateY sutiles siguiendo el cursor, vuelve al estado base al salir.
   ========================================================= */

if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const MAX = 6; // grados máximos de rotación

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotY = (px - 0.5) * 2 * MAX;
      const rotX = (0.5 - py) * 2 * MAX;
      card.style.transform = `translateY(-4px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    };

    const onLeave = () => {
      card.style.transform = "";
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
  });
}

/* ===== Three.js — detalle dorado en sección Contacto =====
   Carga perezosa solo cuando la sección entra al viewport.
   ========================================================= */

const contactCanvas = document.querySelector("[data-contact-canvas]");
const contactInner = document.querySelector(".contact__inner");

if (contactCanvas && contactInner && !prefersReducedMotion) {
  const io = new IntersectionObserver(
    async (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      try {
        const THREE = await import(
          "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"
        );
        initContactScene(THREE, contactCanvas);
      } catch (err) {
        // Si Three.js no carga, simplemente no se muestra el detalle.
        // La sección sigue funcionando perfectamente sin él.
      }
    },
    { rootMargin: "200px" }
  );
  io.observe(contactInner);
}

function initContactScene(THREE, canvas) {
  const getSize = () => {
    const rect = canvas.getBoundingClientRect();
    return { w: Math.max(rect.width, 1), h: Math.max(rect.height, 1) };
  };

  const { w, h } = getSize();

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h, false);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
  camera.position.z = 4;

  // Geometría — icosaedro suavemente facetado
  const geometry = new THREE.IcosahedronGeometry(1.4, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0xc9a24c,
    roughness: 0.35,
    metalness: 0.6,
    flatShading: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Luces
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc9a24c, 0.6);
  rim.position.set(-3, -2, -2);
  scene.add(rim);

  // Resize observer mantiene el canvas a su tamaño CSS real
  const ro = new ResizeObserver(() => {
    const { w, h } = getSize();
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
  ro.observe(canvas);

  // Animación
  const animate = () => {
    mesh.rotation.x += 0.0025;
    mesh.rotation.y += 0.004;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  };
  let rafId = requestAnimationFrame(animate);

  // Pausa cuando la pestaña está oculta — ahorra batería
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(animate);
    }
  });
}

/* ===== Refresh ScrollTrigger tras carga total de assets ===== */

window.addEventListener("load", () => ScrollTrigger.refresh());
