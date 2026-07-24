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

  // TODO(reveals): próximo passo — IntersectionObserver/ScrollTrigger + SplitText,
  // sempre atrás de .gsap-ready e com o estado final como fallback.
})();
