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
    // Começa perto do tamanho do logo do hero (não de um ponto): a janela
    // parece CONTINUAR o logo que acabou de sair, em vez de nascer minúscula
    // no meio de um quadro vazio.
    var zoom = { s: 0.55 };
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

    // Fase 1 (0–0.15): conteúdo da Cena 1 (logo/tagline/badge) SAI primeiro.
    tl.to(".open__hint", { opacity: 0, duration: 0.04 }, 0);
    tl.to(
      ".open__inner",
      { opacity: 0, y: -40, duration: 0.15, ease: "power1.in" },
      0
    );
    // A parede apaga CEDO e FUNDO (0.18 → 0.05). Antes ela seguia clara demais
    // enquanto a janela crescia, e as letras liam como vulto roxo sobre roxo.
    tl.to(openScene, { scale: 1.06, opacity: 0.18, duration: 0.22, ease: "power1.out" }, 0.04);
    tl.to(openScene, { scale: 1.12, opacity: 0.05, duration: 0.35, ease: "none" }, 0.3);
    // Fase 2 (0.06–0.32): a janela-logo surge e assume o centro mais cedo,
    // cortando o quadro quase vazio do começo.
    tl.to(zoom, { s: 1, duration: 0.26, ease: "power1.inOut", onUpdate: applyZoom }, 0.06);
    // Parallax do mundo atrás da janela (mesmos valores nas duas cópias de
    // .night-lights => o crossfade final continua invisível).
    tl.fromTo(
      stage.querySelectorAll(".night-lights"),
      { y: 60 },
      { y: -60, duration: 0.9, ease: "none" },
      0.1
    );
    // Fase 3 (0.28–0.62): mergulho através das letras rumo à luz da Cena 2.
    tl.to(zoom, { s: 70, duration: 0.34, ease: "power2.in", onUpdate: applyZoom }, 0.28);
    // Fase 4 (0.58–0.72): Cena 2 entra por cima; fundo idêntico ao da camada
    // mascarada => crossfade invisível.
    tl.to(reelScene, { opacity: 1, duration: 0.14, ease: "none" }, 0.58);
    // Fase 5 (0.72–1): PAUSA. Nada anima — o palco segue pinado com o card do
    // episódio parado e legível. Sem isso o destino aparecia e já saía rolando,
    // e o scroll investido na transição não entregava leitura nenhuma.
  }

  // TODO(reveals): próximo passo — IntersectionObserver/ScrollTrigger + SplitText,
  // sempre atrás de .gsap-ready e com o estado final como fallback.
})();
