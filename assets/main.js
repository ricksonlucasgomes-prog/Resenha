/* Resenha Cast — interações mínimas, compartilhadas por todas as páginas. */
(function () {
  "use strict";

  // Menu mobile: abre/fecha o nav.
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

  // TODO(episodios): quando o canal do YouTube existir, plugar aqui a lista
  // manual de episódios (título + thumb + link) e/ou os embeds. Por ora os
  // cards são placeholders "Em breve".
})();
