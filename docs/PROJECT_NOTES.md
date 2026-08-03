# Portfolio Website — Project Notes

Reference doc for working on this project with Claude Code (or any assistant) from a fresh session with no prior context.

## What this is

Priyanka Lakkad's personal portfolio site (product designer). Built by an
AI design tool (internally called "dc" / "designer canvas") that exports
static HTML pages driven by a small custom React-based runtime
(`support.js`, referred to as `dc-runtime` in its own header comment).
The runtime is NOT a normal build — it loads React, ReactDOM, and Babel
standalone from unpkg.com at page-load time in the browser, then
transpiles and mounts an inline `<script type="text/x-dc" data-dc-script>`
component found in each page. This is why pages look like static HTML
but have live interactivity (hover states, mobile menu, reveal-on-scroll,
etc.) — don't assume it's a plain static site when debugging.

## Key facts

- **GitHub repo:** `priyanka-lakkad/portfolio` — https://github.com/priyanka-lakkad/portfolio
  - Public repo (required for GitHub Pages on the Free plan — private repos
    can't use Pages without GitHub Pro/Team/Enterprise)
  - Default branch: `main`. Push directly to `main` — no PR workflow set up.
- **Local clone:** `~/Desktop/portfolio` — work here so `git push` reaches
  the live site.
- **Hosting:** GitHub Pages, serving from `main` branch, root path (`/`).
  Legacy build type (not GitHub Actions-based).
- **Custom domain:** `www.priyankalakkad.com`
  - Domain registrar/DNS: **Squarespace** (Settings → Domains →
    priyankalakkad.com → DNS Settings → Custom records)
  - DNS records live there:
    - `CNAME` `www` → `priyanka-lakkad.github.io`
    - 4× `A` `@` → `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`
      (bare `priyankalakkad.com` redirects to `www`)
  - `CNAME` file at repo root pins the custom domain for GitHub Pages
    (GitHub auto-manages this file when you change the domain via the
    Pages UI/API — don't be surprised if it shows up as a remote-only
    commit you need to pull).
  - HTTPS cert is auto-provisioned by GitHub (Let's Encrypt) once DNS
    resolves correctly — takes minutes to ~1hr after DNS changes, nothing
    to do manually. Check status: `gh api repos/priyanka-lakkad/portfolio/pages`
  - Squarespace has **no public API** for DNS/domain management — any DNS
    change has to be done manually in the Squarespace dashboard UI.

## Site structure

| Live page | File |
|---|---|
| Home (served at `/`) | `index.html` |
| About | `About.dc.html` |
| Contact | `Contact.dc.html` |
| Case study template (shared) | `CaseStudy.dc.html` |
| Apple case study | `Project-Apple.dc.html` (imports `CaseStudy` via `<dc-import>`) |
| ComplyOne case study | `Project-ComplyOne.dc.html` |
| Rebatify case study | `Project-Rebatify.dc.html` |
| Jaguar case study | `Project-Jaguar.dc.html` |
| Pattern Library case study | `Project-PatternLibrary.dc.html` |

Shared runtime/data files loaded via `<script>` tags on every page:
`support.js` (the dc-runtime bundle — generated, don't hand-edit, no
build source included in this repo), `image-slot.js`, `resume-data.js`,
`slot-files.js`, `resume-modal.js` (added by us, see below).

Resume PDF lives at `assets/Priyanka-Lakkad-Resume.pdf`.

## Changes made so far (reverse chronological)

- Added `resume-modal.js`: defines `window.__openResume`, which every
  page's existing (previously no-op) `openResume` click handler already
  calls. Opens the resume PDF in an in-page modal (iframe + Download
  button + Escape/backdrop-click to close) instead of a new tab.
- Rewired the site so `/` serves the homepage directly (`index.html` now
  contains the homepage content) instead of client-side redirecting to
  `Homepage.dc.html` — avoids the ugly filename showing in the address
  bar. All in-page "home"/logo links point to `/` now.
- Deleted `Homepage.dc.html` (redundant, `index.html` is now the same
  content) and the entire `snapshots/` directory (67 old design-iteration
  files from the design tool's version history) from the working tree.
  Both are still recoverable from git history if ever needed.
- Set up the custom domain + GitHub Pages hosting (see Hosting section
  above).
- Made the repo public (was private) to satisfy the GitHub Pages Free
  plan requirement.

## Gotchas / things to remember

- **git identity**: commits so far used an auto-detected local identity
  (`priyankalakkad@Priyankas-MacBook-Pro.local`), not a real GitHub-linked
  email. Cosmetic only, but consider `git config` if that should change.
- **`{{ placeholder }}` syntax in the `.dc.html` files is intentional** —
  it's the dc-runtime's template binding syntax, resolved client-side by
  `support.js`. It is NOT broken/unfinished markup — don't "fix" it by
  replacing with literal values.
- **`snapshots/`** was the design tool's own version history export: many
  timestamped copies of each page (e.g. `About_v9_2026-07-31.dc.html`).
  Deliberately removed from the live tree per user request; git history
  still has them.
- Local scratch/temp work during initial setup happened in a session
  scratchpad directory that no longer exists — this `~/Desktop/portfolio`
  clone is the real, permanent one going forward.
