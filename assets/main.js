/* Resenha Cast — interações mínimas, compartilhadas por todas as páginas. */
(function () {
  "use strict";

  var root = document.documentElement;

  // ==========================================================================
  // Menu mobile: abre/fecha o nav.
  // ==========================================================================
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });

    // Fecha o menu ao clicar num link (navegação single-page-ish).
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ==========================================================================
  // Bootstrap do GSAP (progressive enhancement).
  //
  // Regra de ouro: o CSS renderiza tudo no estado FINAL/visível por padrão.
  // Só quando o GSAP está presente E o usuário permite movimento é que
  // marcamos <html class="gsap-ready"> — e só sob essa classe o CSS aplica os
  // estados iniciais escondidos das animações (reveals etc., que entram nos
  // próximos passos). Assim: GSAP não carregou / JS off / reduced-motion =>
  // conteúdo inteiro visível, sem tela branca.
  // ==========================================================================
  var reduceMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var gsap = window.gsap;
  var hasGsap = typeof gsap !== "undefined";

  // Expõe o estado pro resto do código (passos seguintes) sem recalcular.
  window.RC = window.RC || {};
  window.RC.motion = hasGsap && !reduceMotion;
  window.RC.gsap = hasGsap ? gsap : null;

  if (window.RC.motion) {
    var plugins = [];
    if (window.ScrollTrigger) plugins.push(window.ScrollTrigger);
    if (window.SplitText) plugins.push(window.SplitText);
    if (plugins.length) {
      gsap.registerPlugin.apply(gsap, plugins);
    }
    root.classList.add("gsap-ready");
  }

  // ==========================================================================
  // Palco cinematográfico da Home: Cena 1 → mask-zoom pelo logo → Cena 2.
  // Só roda com GSAP presente + movimento permitido + #stage na página.
  // ==========================================================================
  var stage = document.getElementById("stage");
  if (window.RC.motion && window.ScrollTrigger && stage) {
    var openScene = document.getElementById("scene-open");
    var reelScene = document.getElementById("scene-reel");
    var scaler = stage.querySelector(".mask-reveal__scaler");
    var inner = stage.querySelector(".mask-reveal__inner");

    // Zoom por transform apenas: o scaler cresce (a janela-logo aumenta) e o
    // inner counter-escala (1/s), mantendo o fundo parado. GPU only.
    var zoom = { s: 0.001 };
    var applyZoom = function () {
      scaler.style.transform = "scale(" + zoom.s + ")";
      inner.style.transform = "scale(" + 1 / zoom.s + ")";
    };
    applyZoom();
    // Cena 2 real começa invisível SÓ quando há animação (sem GSAP fica visível).
    gsap.set(reelScene, { opacity: 0 });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: "top top",
        end: "bottom bottom",
        pin: "#stage-pin",
        scrub: 0.5,
      },
    });

    // Fase 1 (0–0.2): conteúdo da Cena 1 (logo/tagline/badge) SAI primeiro.
    tl.to(".open__hint", { opacity: 0, duration: 0.05 }, 0);
    tl.to(
      ".open__inner",
      { opacity: 0, y: -40, duration: 0.2, ease: "power1.in" },
      0
    );
    // Fundo da abertura esmaece lentamente (profundidade, sem texto).
    tl.to(openScene, { scale: 1.1, opacity: 0.35, duration: 0.9, ease: "none" }, 0.05);
    // Fase 2 (0.1–0.4): a janela-logo surge e assume o centro.
    tl.to(zoom, { s: 1, duration: 0.3, ease: "power1.inOut", onUpdate: applyZoom }, 0.1);
    // Fase 3 (0.4–0.85): mergulho através das letras rumo à luz da Cena 2.
    tl.to(zoom, { s: 70, duration: 0.45, ease: "power2.in", onUpdate: applyZoom }, 0.4);
    // Fase 4 (0.8–1): Cena 2 real entra por cima; fundo idêntico ao da camada
    // mascarada => crossfade invisível, e o texto só fica legível aqui.
    tl.to(reelScene, { opacity: 1, duration: 0.2, ease: "none" }, 0.8);
  }

  // TODO(reveals): próximo passo — IntersectionObserver/ScrollTrigger + SplitText,
  // sempre atrás de .gsap-ready e com o estado final como fallback.
})();
