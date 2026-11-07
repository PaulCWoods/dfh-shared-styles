# AGENTS.md: DFH Shared Styles

What the Design For Humans sites share on top of [DFH Components](../DFH-Components): the blog (`../designforhumans-blog`, Craft), the course (`../DFH-Course-Theme`, WordPress) and, where it needs them, the components docs site. Nothing here is a library component, and nothing here should become one without a decision to move it into DFH Components.

## How it's built

- `src/index.css` imports each file into one of the library's cascade layers. The files themselves are plain CSS with native nesting and no layer of their own.
- `npm run build` bundles them with Lightning CSS into `dist/dfh-site.css` (no targets, so modern CSS stays as written). Commit `dist/`.
- A release is a git tag (`0.1.0`), served by jsDelivr at `https://cdn.jsdelivr.net/gh/PaulCWoods/dfh-shared-styles@<tag>/dist/dfh-site.css`. A tag never moves: a change is a new version in `package.json` and a new tag.
- `config.library` in `package.json` names the DFH Components version this release is built for. Each site pins both: the blog in `templates/_layout.twig` (`DFH_SHARED_CSS` in `.env` overrides it), the course in `dfh_shared_css()` in `functions.php` (`DFH_SHARED_CSS` in `wp-config.php`).

## Where CSS goes

The rules on DFH Components' Customise page (`packages/docs/src/content/docs/start/customise.mdx`) apply:

| What it is | Layer |
| :--- | :--- |
| Component token choices and the sites' own tokens (`tokens.css`) | `tokens` |
| Page-wide behaviour (`view-transitions.css`) | `reset` |
| The sites' components (`components/*.css`) | `layout` while the sites pin library 0.3.0; `site` once they pin a version that declares it |

- **One file per component**, named after its block class, with a banner saying what it is.
- **Tokens before properties.** Set a library component's token in `tokens.css` before writing a rule for it.
- **Use the library's classes, not copies.** Type comes from text atoms on the markup (`.section__title.heading`), never from copying an atom's declarations. A component's own hooks hold layout only.
- **Semantic tokens only**, with the library's fallback rules: no raw colours, no Tier 1 ramps.
- **Only what's used.** Before adding to a component, check the sites use it; when a site stops using something, remove it here. Classes can come from CMS content (Craft's `classes` and figure fields, WordPress blocks), so check the live pages, not just the templates.
- **Only what's shared.** CSS one site uses goes in that site's own CSS.
- **Breakpoints** are the library's: md is 48em, lg 64em. Write them literally with a comment; media queries can't read custom properties.
- **Lightning CSS merges longhands into shorthands.** Given `animation` and `animation-timeline` together it folds the timeline into the shorthand, which browsers reject; write the animation as longhands.
