# CLAUDE.md — Site Resenha Cast

> Arquivo de contexto lido automaticamente pelo Claude Code no diretório do projeto.
> **Leia este arquivo inteiro antes de propor qualquer solução e use-o como regra de trabalho.**

---

## 0. Onde paramos (leia primeiro)

**Passo 1 da ordem de entrega está PRONTO e testado no navegador:** base
compartilhada + Home. O próximo passo combinado é o **Passo 2: página de
Episódios**. Não pule etapas — uma entrega por vez, com teste no navegador antes
de avançar (ver seção 6 e 7).

Detalhe do que já existe no código está na **seção 9 (Estado atual do código)**.

---

## 1. O que é

Site institucional do **Resenha Cast** — podcast brasileiro, tom "sem filtro,
resenha de verdade".
Objetivo do site: dar cara profissional ao projeto, centralizar os episódios
(YouTube) e servir de ponto de contato.

**Público:** ouvintes do podcast e possíveis convidados/parceiros.
**Job de cada página:** ver a marca → assistir episódios → saber quem é o cast →
falar com o cast.

**Repositório:** https://github.com/ricksonlucasgomes-prog/Resenha
**Cópia local do dono (Windows):** `C:\resenhacast-site`

---

## 2. Stack e restrições

- **Site estático multi-página**: HTML + CSS + JS vanilla. Sem framework por
  enquanto.
- **Deploy-agnostic**: precisa rodar em Cloudflare Pages, Netlify ou qualquer
  host estático sem retrabalho. Nada de `file://` quebrar (evitar `fetch` de
  partials locais).
- **Sem build step** na primeira versão. Se o projeto crescer, migração pra
  Astro/11ty entra como decisão futura — não agora.
- **Idioma:** código, variáveis e nomes de arquivo em **inglês**; todo texto de
  interface em **português (BR)**.

### Rodar localmente

Não há build. Basta abrir `index.html` ou servir via HTTP:

```bash
python3 -m http.server 8000   # abra http://localhost:8000
# ou: npx serve .
```

---

## 3. Identidade visual

### Paleta (extraída da arte oficial — usar exatamente estes hex)

| Token | Hex | Uso |
|---|---|---|
| `--white` | `#FFFFFF` | Logo, títulos display |
| `--ink` | `#141414` | Contorno do logo, texto escuro, sombras |
| `--magenta` | `#C300E3` | Accent primário |
| `--magenta-light` | `#D357D7` | Gradiente (canto claro) |
| `--indigo` | `#45009D` | Gradiente (roxo escuro) |
| `--near-black` | `#1B1E17` | Vinheta / fundo de seção escura |
| `--cast-purple` | `#A64DD6` | Início do gradiente do "CAST" |
| `--cast-pink` | `#F06EC1` | Fim do gradiente do "CAST" |

**Neutros de apoio** (derivados, já definidos em `assets/styles.css` — usar estes
para superfícies escuras em vez de inventar novos):
`--bg #0c0910`, `--surface #16121c`, `--surface-2 #1e1826`, `--border #2c2436`,
`--text #f4eef8`, `--text-dim #b9adc7`.

**Gradiente hero** (reproduzir em CSS, **não** usar a imagem de 8000px como
fundo): `radial-gradient` partindo de `--magenta-light` no topo-esquerda →
`--indigo` no topo-direita → `--magenta` na base-direita, com vinheta
`--near-black` descendo pro canto inferior-esquerdo. Já implementado em
`.hero` / `.hero::after` — ajustar lá se precisar refinar.

### Tipografia

- **Display / títulos de seção:** `Anton` (Google Fonts) — condensada e pesada,
  ecoa a Pricedown do logo sem problema de licença.
  **Não usar a fonte Pricedown real** (licença comercial insegura). A marca
  "RESENHA CAST" aparece como **imagem PNG do logo**, não recriada em fonte.
- **Corpo:** `Archivo` (Google Fonts) — legível, com leve pegada urbana.
- **Labels / eyebrows / dados:** `Archivo` em caixa alta com tracking aberto
  (classe `.eyebrow`).
- Não usar Inter como corpo (default batido).

### Signature element

Cards de episódio no estilo **"loading screen do GTA"**: thumb grande, tarja
inferior escura com título + número do episódio. É o único elemento "ousado" —
o resto do layout fica quieto e disciplinado. Já implementado em `.ep-card` &
filhos.

### Assets

- `assets/logo-resenha.png` — **já processado**: logo com fundo branco removido,
  transparente e otimizado (~1200px de largura). Usado no header, hero e footer.
- Arte de gradiente 16:9 → referência de cor apenas; o fundo é recriado em CSS.
- Tagline oficial: **"PODCAST SEM FILTRO. RESENHA DE VERDADE."**
- `assets/episodes/` — pasta para as thumbs dos episódios (vazia por ora).

---

## 4. Estrutura de páginas

```
index.html        Home                         [PRONTO]
episodios.html    Lista de episódios           [placeholder "Em breve"]
sobre.html        Sobre o cast                 [placeholder "Em breve"]
contato.html      Contato / redes              [placeholder "Em breve"]
/assets
  styles.css      tokens + estilos globais (um único CSS compartilhado)
  main.js         interações (menu mobile)
  logo-resenha.png
  /episodes       thumbs dos episódios
```

- **Home:** hero (logo sobre gradiente + tagline), "Últimos episódios" (3 cards
  placeholder), faixa "Onde ouvir" (YouTube em destaque, demais plataformas
  "Em breve"), CTA de contato.
- **Episódios:** grid de cards (estilo GTA loading screen), com placeholders.
- **Sobre:** quem é o cast, proposta do programa.
- **Contato:** formulário simples (mailto por ora) + redes sociais.

**Header e footer** iguais em todas as páginas. Como é estático sem build,
**duplicar o markup do header/footer** em cada página (consistente) — não usar
include via `fetch` (quebra em `file://`). Um único `styles.css` e `main.js`
compartilhados.

> Ao criar/editar páginas, copie o header e o footer exatamente como estão no
> `index.html` e só troque o `aria-current="page"` para o link da página atual.

---

## 5. Estado atual dos dados

- **YouTube ainda não publicado.** Não inventar links. Usar cards/placeholders
  com "Em breve" e deixar TODO comentado no código pra plugar os embeds depois
  (já há TODOs em `index.html` e `assets/main.js`).
- Quando o canal existir: episódios entram como lista manual (título + thumb +
  link) numa estrutura fácil de editar; automação de puxar do canal fica pra
  decisão futura.

---

## 6. Regras de trabalho (obrigatórias)

Estilo Akita, em ciclos pequenos:

1. **Inspecionar** o que já existe antes de mexer.
2. **Menor passo útil** — não tentar criar o site inteiro de uma vez.
3. **Implementar** só o passo combinado.
4. **Testar** no navegador (deve abrir e funcionar de verdade, não só ser bonito).
5. **Refatorar** se necessário.
6. **Resumo curto** do que mudou.

Outras regras:

- **Não escrever código de mais na primeira resposta de cada etapa — validar o
  plano do passo primeiro.**
- Priorizar **software utilizável e testável**, não demo bonita.
- Quebrar em pequenas entregas.
- Quality floor sem alarde: responsivo até mobile, foco de teclado visível,
  `prefers-reduced-motion` respeitado.
- Copy em PT-BR, voz ativa, sem encher linguiça. Estados de erro/vazio explicam
  o que fazer.

---

## 7. Ordem de entrega

1. **Base compartilhada + Home** → ✅ **PRONTO** (testado no navegador).
2. **Episódios** ← ⬅️ **PRÓXIMO PASSO**
3. Sobre
4. Contato
5. Polish responsivo + acessibilidade + deploy

Uma entrega por vez. Só avança pra próxima depois do "ok" no teste.

---

## 8. O que NÃO fazer

- Não usar a fonte Pricedown real (licença).
- Não inventar links/embeds de YouTube — usar placeholders.
- Não construir as 4 páginas de uma vez.
- Não usar imagem gigante como fundo (recriar gradiente em CSS).
- Não introduzir framework/build sem combinar antes.

---

## 9. Estado atual do código (o que já está implementado)

### `assets/styles.css`
Um único CSS compartilhado. Contém: tokens da paleta + neutros (seção 3), reset
enxuto, utilitários (`.container`, `.eyebrow`, `.section`, `.section__head`),
foco de teclado visível, `.skip-link`, botões (`.btn`, `.btn--primary`,
`.btn--ghost`), header (`.site-header`, `.brand`, `.nav`, `.nav-toggle`), hero
(`.hero` com o gradiente, `.hero__inner`, `.hero__logo`, `.hero__tagline`),
cards de episódio estilo GTA (`.episodes-grid`, `.ep-card` e filhos), "Onde
ouvir" (`.listen-grid`, `.listen-card`, variante `--live`), CTA (`.cta`),
página placeholder (`.page-hero`), footer (`.site-footer`) e o breakpoint mobile
(`max-width: 720px`) que vira o nav em menu hamburguer.

### `assets/main.js`
IIFE vanilla. Abre/fecha o menu mobile (atualiza `data-open` e `aria-expanded`)
e fecha ao clicar num link. Tem TODO pra plugar a lista real de episódios.

### `index.html` (Home)
Completa: skip-link, header, hero, "Últimos episódios" (3 `.ep-card`
placeholder), "Onde ouvir" (YouTube `--live` + Spotify/Apple "Em breve"), CTA,
footer. Ano do rodapé preenchido via JS.

### `episodios.html` / `sobre.html` / `contato.html`
Placeholders honestos: mesmo header/footer, corpo `.page-hero` com "Em breve" e
link de volta pra Home. Servem só pra nav não dar 404 — devem ser construídos de
verdade nos passos 2–4.

### Fontes
Anton + Archivo carregadas via `<link>` do Google Fonts no `<head>` de cada
página.

---

## 10. Fluxo de git

- Branch de trabalho atual: `claude/resenha-cast-base-home-wnz49g` (PR #1, draft).
- Trabalhe em branches; abra PR draft; não faça push direto na `main`.
- Deploy (quando for a hora): apontar o host estático pra raiz do repo.
