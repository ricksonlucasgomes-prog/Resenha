/* ==========================================================================
   Resenha Cast — lista de episódios (ÚNICO ponto de edição).

   Para adicionar um episódio: copie o modelo comentado dentro de EPISODES,
   tire os "//" e preencha os campos. Não precisa mexer em mais nada.

     num     -> número do episódio (vira "Episódio 01" na tarja)
     title   -> título que aparece no card
     youtube -> ID do vídeo no YouTube (o trecho depois de "watch?v=" ou
                "youtu.be/"). NÃO é a URL inteira, só o ID.
     thumb   -> caminho da imagem em assets/episodes/ (opcional). Sem thumb,
                o card mostra um placeholder com o número do episódio.

   Enquanto a lista estiver vazia, a página mantém os cards "Em breve" que já
   estão no HTML (episodios.html). Assim que houver 1+ episódio aqui, o script
   troca os placeholders pelos episódios reais (mais recentes primeiro).
   ========================================================================== */
(function (root) {
  "use strict";

  // ======================= EDITE AQUI ↓ =======================
  var EPISODES = [
    // {
    //   num: 1,
    //   title: "Título do primeiro episódio",
    //   youtube: "VIDEO_ID",
    //   thumb: "assets/episodes/ep01.jpg",
    // },
  ];
  // ======================= EDITE AQUI ↑ =======================

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function make(doc, tag, className, text) {
    var node = doc.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // Monta um card de episódio real (o card inteiro é um link pro vídeo).
  function episodeCard(doc, ep) {
    var num = pad(ep.num);

    var card = make(doc, "a", "ep-card ep-card--link");
    card.href = "https://www.youtube.com/watch?v=" + ep.youtube;
    card.target = "_blank";
    card.rel = "noopener";
    card.setAttribute("aria-label", "Episódio " + num + ": " + ep.title);

    var thumb = make(doc, "div", "ep-card__thumb");
    if (ep.thumb) {
      var img = make(doc, "img");
      img.src = ep.thumb;
      img.alt = "";
      img.loading = "lazy";
      thumb.appendChild(img);
    } else {
      thumb.appendChild(make(doc, "span", "ep-card__placeholder", "EP " + num));
    }

    var bar = make(doc, "div", "ep-card__bar");
    bar.appendChild(make(doc, "span", "ep-card__num", "Episódio " + num));
    bar.appendChild(make(doc, "h3", "ep-card__title", ep.title));

    card.appendChild(thumb);
    card.appendChild(bar);
    return card;
  }

  function render(doc, list) {
    var grid = doc.getElementById("episodes");
    if (!grid) return;
    // Sem episódios: mantém os cards "Em breve" que já vêm no HTML.
    if (!list.length) return;

    grid.textContent = "";
    list
      .slice()
      .sort(function (a, b) {
        return b.num - a.num; // mais recentes (num maior) primeiro
      })
      .forEach(function (ep) {
        grid.appendChild(episodeCard(doc, ep));
      });
  }

  // Navegador: renderiza com o document real.
  if (root && root.document) {
    render(root.document, EPISODES);
  }

  // Node (testes): expõe as funções puras, sem depender do navegador.
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { episodeCard: episodeCard, render: render, EPISODES: EPISODES };
  }
})(typeof window !== "undefined" ? window : this);
