# Project context for Claude sessions

Read this first — it catches any Claude session (on any of Omar's machines)
up on how this project works.

## What this is

A private family tree website for the Huertas family, deployed via GitHub
Pages at family.dbaomarhuertasllc.com (see CNAME). It is a static site —
no build step, no package.json, no CI. The main page is `index.html`;
subdirectories (album, cocina, history, pedigree, etc.) are section pages.

## Content workflow

- Historical source of truth for the main page content was
  `~/FamilyTree/site/family_tree.html` on Omar's original Mac, wrapped with
  the password gate to produce `index.html`. If that file isn't available
  on the current machine, edit `index.html` in this repo directly.
- The password gate is a client-side SHA-256 check in `index.html` — low
  security by design, fine for a low-stakes family page. Don't put anything
  truly sensitive on the site.

## Machines

Omar works from more than one Mac. `scripts/mac-setup.sh` gets a fresh Mac
ready (Homebrew, git, gh, VS Code, Node, Claude Code, clones this repo):

    curl -fsSL -o mac-setup.sh https://raw.githubusercontent.com/kaoshotbeatz-ops/family-tree-site/main/scripts/mac-setup.sh
    bash mac-setup.sh

(Download-then-run, not curl-pipe-to-bash — Homebrew needs a TTY for the
password prompt.)

## Conventions

- Deploys are just pushes to `main` — GitHub Pages serves the repo as-is.
- Preview locally with `python3 -m http.server 8000` from the repo root.
- Keep it simple: plain HTML/CSS/JS, no frameworks or build tooling.
