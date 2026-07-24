# Resenha Cast — site

Site institucional do **Resenha Cast** — podcast brasileiro, tom "sem filtro,
resenha de verdade".

## Stack

Site estático multi-página: HTML + CSS + JS vanilla. **Sem build step.** Roda em
qualquer host estático (Cloudflare Pages, Netlify, GitHub Pages) ou abrindo os
arquivos direto no navegador.

## Estrutura

```
index.html        Home
episodios.html    Lista de episódios (placeholder "Em breve")
sobre.html        Sobre o cast (placeholder "Em breve")
contato.html      Contato / redes (placeholder "Em breve")
/assets
  styles.css      tokens + estilos globais (um único CSS compartilhado)
  main.js         interações (menu mobile)
  logo-resenha.png logo com fundo transparente
  /episodes       thumbs dos episódios (a preencher)
```

Header e footer são **duplicados** em cada página (site estático sem build,
sem include via `fetch` — evita quebrar em `file://`).

## Rodar localmente

Basta abrir `index.html` no navegador. Para servir via HTTP:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Status atual

Passo 1 da entrega: **base compartilhada + Home**. Episódios, Sobre e Contato
são placeholders honestos ("Em breve") e serão construídos nos próximos passos.

O canal do YouTube ainda não foi publicado — os cards de episódio e as
plataformas em "Onde ouvir" usam placeholders. TODOs no código marcam onde
plugar os episódios reais.
