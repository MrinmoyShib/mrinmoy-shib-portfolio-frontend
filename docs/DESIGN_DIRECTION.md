# Design direction A · Minimal Editorial

The assignment fixes page structure but lets the owner choose a visual system. This implementation commits to **A — Minimal Editorial**, rather than a downloaded portfolio template. Concept: a field notebook / editorial magazine. Type-driven hierarchy, warm off-white canvas, burnt-terracotta accent, subtle 1px rules, generous white space, and a distinctive arched portrait, instead of gradient cards or terminal chrome.

## Design tokens

All theme tokens are defined in `src/styles/tokens.css`. Shared CSS declarations in `main.css` use variables instead of scattered hexadecimal values; the special always-on terracotta contact section is an intentional brand surface.

| Token | Light | Dark |
| --- | --- | --- |
| `--background` | `#f9f6f0` | `#1b1a18` |
| `--surface` | `#fffdfa` | `#242320` |
| `--surface-alt` | `#f1ece5` | `#2f2c28` |
| `--ink` | `#24211e` | `#f3eee7` |
| `--ink-soft` | `#55514d` | `#d1c7bf` |
| `--muted` | `#716c65` | `#b4aba2` |
| `--border` | `#d9d3ca` | `#595148` |
| `--accent` | `#a74329` | `#ee9477` |
| `--accent-hover` | `#8d311b` | `#ffc2a8` |
| `--font-display` | Fraunces | Fraunces |
| `--font-ui` | DM Sans | DM Sans |
| `--s1`, `--s2`, `--s3`, `--s4`, `--s6`, `--s8`, `--s10`, `--s12` | 8, 16, 24, 32, 48, 64, 80, 96px | same |
| `--radius-sm`, `--radius-md`, `--radius-lg` | 4, 8, 16px | same |
| `--shadow-sm`, `--shadow-lg` | subtle soft surfaces | darker soft surfaces |

Body 16px with line-height 1.7. Type scale: 12 / 14 / 16 / 20 / 24 / 32 / 48 (plus clamp for the editorial hero display). Section spacing uses 96px desktop and 48px mobile (plus fixed consistent spacing scale).

**Measured normal text contrast examples:** light body `#24211e` on `#f9f6f0` = **14.85:1**; light muted `#716c65` on `#f9f6f0` = **4.82:1**; light accent `#a74329` on `#f9f6f0` = **5.60:1**. Dark body `#f3eee7` on `#1b1a18` = **15.07:1**; dark muted `#b4aba2` = **7.69:1**; dark accent `#ee9477` = **7.57:1**. Real page screenshots and additional component states should still be checked with browser accessibility tools after starting the site.

## Responsive structure

Desktop: centered content max-width 1248px, 3-column project/blog grids, split hero and sidebar dashboard. At 1024px grids collapse to two cards per row; 768px enables a mobile hamburger and horizontal owner tabs; 480px stacks all cards, forms, and footer columns. Images have fixed aspect ratios; all below-the-fold card images use lazy loading. Focus-visible states and disabled/hover styles are shared. `prefers-reduced-motion` is respected.

## Your personal visual identity

The profile avatar and name come exclusively from the API. **Replace the supplied generic SVG favicon with your own mark** before submission. Keep the chosen editorial direction, but check that no classmate selected the same accent/font pairing and change the tokens if needed.
