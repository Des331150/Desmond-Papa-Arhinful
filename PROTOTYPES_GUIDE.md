# Site & Prototype Suite

**Live site root:** `index.html` — the portfolio.
**Prototype suite:** `prototypes/index.html` — a comparison hub for the five design
directions, plus a shared switcher badge on every page.

**Stack:** static HTML5, CSS3, vanilla ES6. No build step, no dependencies.

---

## 1. Why five prototypes exist

`prototypes/` holds five full implementations of the same content in different design
worlds, built to compare structural and typographic theses rather than just colour
swaps. They predate the current content, so they still carry the earlier placeholder
persona and placeholder case studies; the live site at the root is the one that was
rewritten with real work.

| # | Prototype | Aesthetic | Primary thesis |
|---|---|---|---|
| 01 | `split-ledger` | Swiss mechanical precision, light | Sticky capability ledger that filters the project stream; dual recruiter/client paths |
| 02 | `editorial-monograph` | Tactile editorial literature, warm paper | Narrative case studies with architectural prose; the **live** design |
| 03 | `linear-systems` | Obsidian dark terminal | Keyboard-driven scanning (`1`–`4`, `R`, `P`, `Esc`), inline ASCII topology |
| 04 | `bento-spatial` | Modular dark bento grid | Everything scannable in one viewport; modal architecture inspector |
| 05 | `kinetic-minimal` | Scandinavian typographic focus | 15-second scan; single-column accordion roster |

**Shared components**

- `shared/base.css` — reset, smooth scrolling, `.sr-only`. Deliberately minimal: it
  provides **no** focus styles and no type scale, so each prototype styles its own.
- `shared/switcher-badge.js` / `.css` — floating badge linking to the hub and sibling
  prototypes. Resolves every URL from its own `document.currentScript.src`, so it works
  unchanged from the site root or from `prototypes/<id>/`. Adds `aria-expanded` and
  Escape-to-close, and the menu is `aria-hidden` while closed.
- `prototypes/hub.js` / `hub.css` — the comparison hub, with a live iframe previewer
  and real CSS-pixel viewport toggles (fluid / 1280 / 768 / 390).

---

## 2. The live site

`index.html` is the portfolio that ships. It uses the `editorial-monograph` design.

- **Identity:** Desmond Papa-Arhinful, backend engineer (Python, FastAPI, Django).
- **Content:** three real projects, each with source linked.
  - **Lectiq** — AI study tool. Next.js 16 + React 19 + TypeScript, AI entirely in route
    handlers, OpenRouter gateway, client-side parsing (`pdfjs-dist` for PDF, `JSZip` for
    PPTX), map-reduce topic extraction, Supabase auth and Postgres, server-side quota.
  - **Text Summariser** — FastAPI + PyMuPDF, three extraction scopes, local
    `facebook/bart-large-cnn` inference. Documents its own input-window limitation.
  - **Gohanbako** — Django REST API, image validation and normalisation in `Model.save()`,
    pagination, filtering, DRF token auth.
- **Contact:** email with one-click clipboard copy, 20-minute intro call, structured
  project-brief generator, phone, GitHub.

### Invariants worth preserving when editing

1. **Engagement models are a single value list.** Each service card's
   `data-service-type` must exactly match an `<option value>` in `#projectScopeType`.
   Assigning a `<select>` a value that matches no option sets `selectedIndex = -1` and
   renders the control blank. `SCOPE_TYPE_ALIASES` in `app.js` maps legacy labels and
   logs a warning rather than failing silently.
2. **Every technical claim must be traceable to source.** No invented metrics, no
   client testimonials, no claimed seniority. This is the constraint that most
   distinguishes this build from the placeholder content it replaced.
3. **No `outline: none`.** Focus rings are suppressed nowhere; form controls match both
   `:focus` and `:focus-visible` because the contact form is the primary conversion
   path.
4. **Clipboard writes go through `writeToClipboard()`**, which falls back to
   `execCommand` on non-secure origins, where `navigator.clipboard` is undefined.
5. **Mobile nav is a `<details>` disclosure**, not a JS toggle, so navigation survives
   JavaScript being disabled.
6. **Ref links in the Index of Practice must resolve.** They are real anchors into
   `#spread-01` … `#spread-03`; there is a check for dangling targets in review.

---

## 3. Local preview

```bash
python3 server.py      # serves this directory on http://localhost:8080 with no-cache
```

`server.py`, `server.log` and `server.pid` are development-only and git-ignored.
