# Prompts — Site Resenha Cast no estilo GTA VI

Conjunto de prompts prontos pra colar no **Claude Code (VS Code)**, um por vez,
pra evoluir o site do Resenha Cast com a pegada visual do site oficial do
**GTA VI** (rockstargames.com/VI) — adaptada às regras do projeto.

> **Duas versões neste doc:**
> 1. **Prompt mestre fiel (abaixo)** — replica DE PERTO o site real, usando
>    **GSAP + ScrollTrigger** via CDN, como o site oficial faz. Use este se
>    fidelidade é a prioridade.
> 2. **Passos granulares (mais abaixo, "Prompt 0…9")** — versão vanilla pura,
>    sem dependência, aproximando os efeitos. Use se preferir zero libs.

---

## Como o site do GTA VI realmente funciona (pesquisado)

Confirmado por breakdowns de design e clones open-source do site:

- **Motor:** GSAP + **ScrollTrigger** + **SplitText**. É a mesma stack do site
  oficial. Entra por **CDN** (`<script>`), então **não é build step** — continua
  site estático.
- **Efeitos:** seções **fixadas (pinned)** que seguram a tela enquanto o conteúdo
  anima; **vídeo sincronizado ao scroll** (o vídeo "scrubba" conforme rola);
  **parallax** em camadas; **image masking / clip-path reveals**; **SplitText**
  (títulos entram letra/palavra); **timelines multi-seção**; **carrossel** animado.
- **Conteúdo (ordem):** hero em vídeo + logo → painéis dos protagonistas
  (Lucia/Jason) → áreas do mapa com botão "Explore" → galeria de screenshots →
  newsletter → footer.
- **Paleta:** degradê rosa-quente "sunset" (Vice City) + tipografia Pricedown
  pesada. Nosso magenta/indigo/pink é o equivalente.

**Teto de fidelidade honesto:** o efeito mais icônico (vídeo 4K que scrubba no
scroll) depende de ter o vídeo — e o canal ainda não saiu. Montamos o
**mecanismo** e usamos gradiente/still como placeholder, plugando o reel depois.

**Fontes:** [UX Analysis (pklavc)](https://pklavc.com/blog/gta-vi-website-ux-analysis/) ·
[Supercharging the GTA VI website with Motion](https://motion.dev/blog/supercharging-the-gta-vi-website-with-motion) ·
[Clone GSAP (adrianhajdin)](https://github.com/adrianhajdin/jsm_gta_vi_landing) ·
[Rockstar new website (RockstarINTEL)](https://rockstarintel.com/rockstar-games-launch-new-website-design-ahead-of-gta-6/)

---

## Prompt mestre fiel (cole este pra máxima fidelidade)

```
Você vai construir o site do Resenha Cast replicando DE PERTO a experiência do
site oficial do GTA VI (rockstargames.com/VI). Leia o CLAUDE.md inteiro antes.
Fidelidade é o objetivo principal deste trabalho.

COMO O SITE DO GTA VI FUNCIONA (replicar isto):
- Motor de animação: GSAP + ScrollTrigger + SplitText, carregados via CDN
  (tags <script> — NÃO é build step, continua site estático).
- Técnicas: seções fixadas (pinned) que seguram a tela enquanto o conteúdo anima;
  VÍDEO SINCRONIZADO AO SCROLL (o vídeo avança conforme o scroll); parallax em
  camadas; reveals com image masking / clip-path; SplitText (títulos entram
  letra/palavra); timelines que atravessam várias seções; um carrossel animado.
- Estética: tipografia condensada gigante caixa alta, degradê "sunset"
  (aqui: magenta #C300E3 / indigo #45009D / pink #F06EC1 sobre preto),
  grão filmico + vinheta. Disciplina: o ousado é a tipografia, o vídeo e o
  masking; o resto fica quieto.

RESTRIÇÕES DO PROJETO (não-negociáveis):
- Site estático: HTML/CSS/JS vanilla + GSAP via CDN. Sem framework, sem build,
  sem bundler. Roda em host estático. Não usar fetch de partials locais.
- Todo efeito degrada com elegância: em prefers-reduced-motion e com JS/GSAP
  indisponível, o CONTEÚDO aparece 100% legível no estado final (sem depender da
  animação). Nada de tela em branco se o GSAP não carregar.
- Anima só transform/opacity/clip-path. Foco de teclado visível. Imagens lazy.
- Marca "RESENHA CAST" sempre via PNG do logo (assets/logo-resenha.png). Fonte
  Anton (display) + Archivo (corpo). Nunca a Pricedown.
- Sem inventar links/embeds de YouTube: onde o GTA tem trailer/vídeo, usamos
  placeholder com o gradiente da marca e deixamos o mecanismo pronto pra plugar
  o reel depois (TODO comentado). Copy em PT-BR.
- Header/footer duplicados em cada página. Código em inglês, interface em PT-BR.

MAPEAMENTO fiel (seção do GTA VI -> seção do Resenha):
1. HERO em vídeo + logo + "assista o trailer"  ->  Hero: logo grande sobre o
   gradiente animado + tagline "PODCAST SEM FILTRO. RESENHA DE VERDADE." + botão
   "Em breve no YouTube". Um bloco de vídeo placeholder (gradiente) já com o
   mecanismo de scroll-sync pronto pra receber o reel depois.
2. Painéis dos protagonistas (Lucia/Jason)  ->  "O CAST": painéis pinned dos
   apresentadores, um por vez, com SplitText no nome e reveal por masking
   (arte placeholder com gradiente+logo até termos foto).
3. Áreas do mapa com "Explore"  ->  "O QUE ROLA NO RESENHA": sequência pinned de
   3-4 painéis (ex.: Resenha sem filtro / Convidados / Cortes) com masking reveal
   e parallax.
4. Galeria de screenshots (carrossel)  ->  "ÚLTIMOS EPISÓDIOS": carrossel/galeria
   horizontal (GSAP ou scroll-snap) com cards estilo "loading screen do GTA"
   (thumb grande + tarja com título e número). Placeholders "Em breve".
5. LOJA (nossa, não tem no GTA): vitrine "Em breve" de bonés e camisetas
   (imagem + preço + selo "Em breve", SEM checkout; TODO pro checkout).
6. Newsletter/updates  ->  CTA de contato / "avise-me quando sair".
7. Footer igual ao das outras páginas.

MODO DE TRABALHO (Akita, um passo por vez): NÃO faça tudo de uma vez. Ordem:
(a) subir GSAP/ScrollTrigger/SplitText por CDN + design system (grão, vinheta,
.text-gradient, escala tipográfica, hero com gradiente animado);
(b) SplitText + reveals base com fallback;
(c) hero com bloco de vídeo scroll-sync (placeholder) + parallax no logo + ticker;
(d) seção "O CAST" pinned; (e) "O que rola" pinned com masking; (f) carrossel de
episódios; (g) Loja vitrine; (h) nav (header some/volta + overlay full-screen);
(i) micro-interações; (j) passo final de performance/acessibilidade (reduced-
motion em tudo, sem overflow em 320/768/1280, preload de logo e fontes).

Para CADA passo: me mostre um plano curto ANTES de codar; implemente só aquele
passo; teste no navegador (python3 -m http.server + screenshot desktop e mobile);
resuma. Só então siga. Comece confirmando as restrições e o plano do passo (a).
Não escreva código ainda.
```

---

## Versão granular vanilla (sem libs) — passos 0 a 9

## Como usar

1. Cole o **Prompt 0** primeiro (define o norte e as regras).
2. Depois vá colando **um prompt por vez**, na ordem. Teste no navegador entre
   cada um (é a regra do projeto — ver `CLAUDE.md`).
3. Não pule etapas. Cada prompt é um "menor passo útil".

## Regras que valem pra TODOS os prompts (não-negociáveis)

- **HTML + CSS + JS vanilla. Sem framework, sem build step.** Nada que precise
  de `npm run build`.
- **Deploy-agnostic**: tem que rodar abrindo o arquivo e em host estático. Nada
  de `fetch` de partials locais (quebra em `file://`).
- **Acessibilidade**: todo efeito de movimento precisa respeitar
  `@media (prefers-reduced-motion: reduce)` — desliga/reduz animação. Foco de
  teclado sempre visível.
- **Performance**: animar só `transform` e `opacity`. Scroll com
  `requestAnimationFrame`, nunca listeners pesados. Imagens com `loading="lazy"`.
- **Marca**: usar os tokens da paleta e as fontes já definidas (Anton + Archivo).
  A marca "RESENHA CAST" é sempre o **PNG do logo**, nunca fonte recriada. Não
  usar a fonte Pricedown.
- **Sem inventar**: nenhum link/embed de YouTube fake. Placeholders "Em breve".
- **Idioma**: código e nomes em inglês; texto de interface em PT-BR.

## O que "estilo GTA VI" significa aqui (referência de técnicas)

Inventário do que o site do GTA VI faz, e como reproduzir em vanilla:

| Efeito GTA VI | Como fazer aqui (vanilla, sem build) |
|---|---|
| Vídeo/gradiente full-screen no hero | Gradiente CSS animado (já temos) + overlay de grain + logo grande |
| Rolagem suave com inércia | `scroll-behavior: smooth` + revelações; **não** trazer lib de smooth-scroll |
| Reveal de seções ao entrar na tela | `IntersectionObserver` adiciona `.in-view` → transição CSS |
| Parallax / zoom no scroll | `transform` via `rAF` no scroll, ou `animation-timeline: scroll()` como enhancement |
| Seção "presa" (pinned/scrollytelling) | `position: sticky` num wrapper alto |
| Galeria horizontal arrastável | CSS `scroll-snap` nativo (sem JS) |
| Ticker/marquee de texto | `@keyframes translateX`, pausa no hover e no reduced-motion |
| Grão/ruído + vinheta filmicos | Overlay `position: fixed` com textura SVG/noise, `mix-blend-mode`, opacidade baixa |
| Texto com gradiente (rosa→laranja) | `background-clip: text` com gradiente da marca |
| Header some ao descer / volta ao subir | JS mínimo comparando `scrollY` |
| Menu overlay full-screen | JS toggle de classe + `<dialog>`/overlay |
| Botão com "sweep" no hover | Pseudo-elemento que desliza no `:hover` |
| Lightbox de trailer | `<dialog>` nativo (plugar quando tiver vídeo) |

---

## Prompt 0 — Contexto e norte (cole primeiro)

```
Você vai evoluir o site estático do Resenha Cast (HTML/CSS/JS vanilla, SEM build)
pra ter a linguagem visual do site oficial do GTA VI (rockstargames.com/VI),
adaptada à nossa marca magenta/roxo.

Leia o CLAUDE.md do projeto inteiro antes de começar. Regras não-negociáveis:
- Sem framework e sem build step. Roda em host estático e abrindo o arquivo.
- Nada de fetch de partials locais (não pode quebrar em file://).
- Todo movimento respeita prefers-reduced-motion. Foco de teclado visível.
- Anima só transform/opacity; scroll com requestAnimationFrame. Imagens lazy.
- Marca "RESENHA CAST" sempre via PNG do logo. Fonte Anton (display) + Archivo
  (corpo). Nunca a fonte Pricedown.
- Sem inventar links/embeds de YouTube. Placeholders "Em breve".

Norte estético do GTA VI que queremos capturar: tipografia condensada enorme em
caixa alta, paleta sunset (no nosso caso magenta #C300E3 / indigo #45009D /
pink #F06EC1 sobre preto), grão filmico + vinheta, seções que revelam ao rolar,
galerias horizontais com scroll-snap, ticker de texto, e micro-interações
caprichadas. Disciplina: o "ousado" é a tipografia e os cards; o resto fica quieto.

NÃO implemente nada ainda. Primeiro me devolva um plano curto de como vai aplicar
isso nos arquivos atuais (index.html, assets/styles.css, assets/main.js) e
confirme que entendeu as restrições. Depois seguimos um passo por vez.
```

---

## Prompt 1 — Design system: grão, vinheta, gradiente de texto, tipo display

```
Passo 1: elevar o design system em assets/styles.css, sem mexer no conteúdo
das páginas ainda.

1. Adicione um overlay global de GRÃO + VINHETA filmicos: um elemento fixo
   (ex: body::after) cobrindo a viewport, pointer-events:none, z-index alto,
   com uma textura de ruído (gere um data-URI SVG de feTurbulence, nada de
   arquivo externo) em opacidade ~4-6% + um radial-gradient de vinheta escura
   nas bordas. Precisa ficar SUTIL, não sujar a leitura.
2. Crie um utilitário .text-gradient que aplica um gradiente
   (magenta -> cast-pink) no texto via background-clip:text.
3. Aumente a escala tipográfica dos títulos display (Anton) pra ficar mais
   "GTA": headings de seção maiores, tracking levemente negativo, line-height
   ~0.9. Use clamp() pra responsividade.
4. Reforce o hero: faça o gradiente atual do .hero ter um leve movimento
   (animação lenta de background-position ou de posição dos radiais), com
   duração longa (>=20s), e DESLIGUE a animação em prefers-reduced-motion.

Critérios de aceite: página abre normal, grão discreto sobre tudo, títulos
maiores e mais pesados, hero com brilho vivo mas texto 100% legível. Rode um
http.server e me mostre um screenshot desktop e mobile.
```

---

## Prompt 2 — Sistema de reveal no scroll (IntersectionObserver)

```
Passo 2: animação de entrada das seções ao rolar, no estilo GTA VI.

Em assets/main.js, crie um IntersectionObserver que adiciona a classe .in-view
aos elementos com [data-reveal] quando entram ~15% na viewport (unobserve depois,
pra rodar uma vez). Em assets/styles.css, defina o estado inicial ([data-reveal]
com opacity:0 e translateY(24px)) e o final (.in-view volta pra opacity:1,
translateY(0)) com transition suave (~0.6s ease). Suporte um data-reveal-delay
opcional pra escalonar itens (stagger) via transition-delay.

Aplique data-reveal nos blocos da Home: título de cada seção, cada card de
episódio (com stagger), cards de "Onde ouvir", e o CTA.

OBRIGATÓRIO: em prefers-reduced-motion, os elementos aparecem já no estado final
(sem animação, opacity:1). Sem reduced-motion e com JS desligado, o conteúdo
também precisa ficar visível (fallback: .no-js ou aplicar o estado final se o
observer não rodar). Teste no navegador e me mostre.
```

---

## Prompt 3 — Hero cinematográfico com ticker/marquee

```
Passo 3: deixar o hero da Home mais cinematográfico e com um ticker, tipo as
faixas de texto do site do GTA VI.

1. No index.html, abaixo da tagline, adicione uma faixa TICKER horizontal com
   texto em caixa alta repetido, ex: "PODCAST SEM FILTRO ✦ RESENHA DE VERDADE ✦
   NOVOS EPISÓDIOS EM BREVE ✦". Duplique o conteúdo pra loop perfeito.
2. Em CSS, anime o ticker com @keyframes translateX (loop infinito, linear,
   ~30s). Pausa no hover. DESLIGA em prefers-reduced-motion (fica estático).
3. Dê ao logo do hero um leve parallax: em main.js, no scroll (via rAF),
   translateY pequeno e proporcional ao scroll (máx ~40px) + leve fade. Desliga
   em reduced-motion.

Mantenha o logo como PNG. Não quebre o layout mobile. Teste e me mostre.
```

---

## Prompt 4 — Episódios como galeria horizontal (scroll-snap)

```
Passo 4: transformar "Últimos episódios" numa galeria horizontal arrastável,
estilo a galeria de screenshots do GTA VI — usando scroll-snap NATIVO (sem lib).

Em index.html, envolva os .ep-card num trilho horizontal (overflow-x:auto,
display:flex, scroll-snap-type:x mandatory; cada card com scroll-snap-align:start).
Aumente os cards (estilo "loading screen do GTA": thumb grande, tarja inferior
com título + número). Some 4-6 cards placeholder "Em breve". Barra de scroll
discreta ou escondida com fade nas laterais.

Acessibilidade: navegável por teclado (tabindex/rolagem por foco), e o container
com role/aria adequada. Em telas grandes pode mostrar 3 cards; no mobile, ~1,2.
Não invente episódios reais. Teste desktop e mobile e me mostre.
```

---

## Prompt 5 — Seção "Sobre" com scrollytelling (sticky)

```
Passo 5: construir a página sobre.html de verdade (hoje é placeholder), com uma
seção "presa" (pinned) estilo scrollytelling do GTA VI.

Estrutura: um wrapper alto; dentro, uma coluna de mídia/arte STICKY (position:
sticky; top: ...) que fica fixa enquanto blocos de texto (proposta do programa,
quem é o cast) passam ao lado rolando. No mobile, colapsa pra layout empilhado
simples (sem sticky).

Use o header/footer idênticos aos das outras páginas (só muda o aria-current).
Conteúdo em PT-BR, voz ativa. Sem foto real do cast ainda? Use um bloco de arte
com o gradiente da marca + logo como placeholder. Respeite reduced-motion.
Teste e me mostre.
```

---

## Prompt 6 — Loja (vitrine "Em breve")

```
Passo 6: criar a página loja.html — vitrine dos produtos do podcast (bonés e
camisetas). É SÓ VITRINE por enquanto: mostra produto + preço, com selo
"Em breve", SEM checkout.

- Adicione "Loja" no menu (header e footer de TODAS as páginas — duplicar o
  markup, como manda o CLAUDE.md).
- Grid/galeria de cards de produto no capricho visual do site (mesma pegada dos
  cards de episódio): imagem do produto, nome, preço, e um selo/badge "Em breve"
  no lugar do botão comprar. Deixe TODO comentado pra plugar o checkout depois
  (WhatsApp ou loja externa).
- Produtos iniciais: "Camiseta Resenha Cast" e "Boné Resenha Cast". Use imagens
  placeholder em assets/products/ (crie a pasta) até termos as fotos reais.
- Reveal no scroll (data-reveal) como nas outras seções.

Não invente formas de pagamento nem links de compra. Teste desktop e mobile.
```

---

## Prompt 7 — Navegação: header some/volta + menu overlay full-screen

```
Passo 7: header com comportamento do GTA VI.

1. Header some ao rolar pra baixo e reaparece ao rolar pra cima (JS mínimo em
   main.js comparando scrollY entre frames, via rAF; adicione classe .is-hidden).
   Sempre visível no topo da página.
2. No mobile, o menu vira um OVERLAY full-screen (fundo escuro com o gradiente da
   marca), links grandes em Anton, com fade/slide de entrada. Fecha no ESC, no
   clique fora e ao escolher um link. Trave o scroll do body enquanto aberto.
   aria-expanded/aria-controls corretos; foco vai pro primeiro link ao abrir e
   volta pro botão ao fechar (focus trap simples).

Respeite reduced-motion (sem slide, troca instantânea). Teste e me mostre.
```

---

## Prompt 8 — Micro-interações e polish

```
Passo 8: os detalhes que dão o acabamento GTA VI.

- Botões (.btn): efeito "sweep" no hover (pseudo-elemento que desliza) + leve
  scale. Mantenha o estilo atual como base.
- Cards (episódio, produto): no hover, leve zoom na thumb (transform:scale) com
  overflow:hidden, e a tarja sobe um pouco. Sombra/borda reagem.
- Títulos de seção: aplique .text-gradient em palavras-chave escolhidas.
- (Opcional, se ficar sutil) glow que segue o cursor no hero em telas com
  hover/fine-pointer; NUNCA no mobile, NUNCA em reduced-motion.

Nada pode piorar a legibilidade nem o desempenho. Anima só transform/opacity.
Teste e me mostre desktop e mobile.
```

---

## Prompt 9 — Passo final: performance + acessibilidade

```
Passo 9: fechamento de qualidade antes do deploy.

- Garanta que TODAS as animações têm fallback em prefers-reduced-motion.
- Verifique foco de teclado visível em todos os interativos e ordem de tabulação.
- Imagens com width/height (evitar layout shift) e loading="lazy" fora do hero.
- Preload do logo e das fontes (Anton/Archivo) pra não piscar.
- Teste em 320px, 768px e 1280px. Sem overflow horizontal.
- Rode um checklist tipo Lighthouse mental (contraste AA, alt em imagens,
  landmarks/headings em ordem). Liste o que ajustou.

Me entregue um resumo curto do que mudou e screenshots das 3 larguras.
```

---

## Dica final sobre as imagens dos produtos e do trailer

Modelos de imagem erram texto — o logo "RESENHA CAST" sai torto. Pra fotos de
produto (camiseta/boné), gere a **peça lisa** e componha o **PNG do logo real**
por cima. Prompts de geração das peças estão fora deste doc (peça ao assistente).
