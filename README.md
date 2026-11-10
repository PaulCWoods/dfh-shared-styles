# DFH Shared Styles

The CSS the Design For Humans sites share on top of [DFH Components](https://components.designforhumans.blog): the article, section, card list and index card, the brand frame, the reading progress, and the sites' component token choices.

Link it after the library and its theme, before a site's own CSS:

```html
<link rel="stylesheet" href="https://components.designforhumans.blog/css/0.5.1/dfh-components.css">
<link rel="stylesheet" href="https://components.designforhumans.blog/css/0.5.1/themes/dfh.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/PaulCWoods/dfh-shared-styles@0.5.0/dist/dfh-site.css">
<link rel="stylesheet" href="/css/site.css">
```

A site that needs one component alone takes it from `dist/components/`, in the same cascade layer: the components docs import `dist/components/brand-frame.css` as an npm dependency pinned to a tag (`github:PaulCWoods/dfh-shared-styles#0.2.0`).

## Working on it

```sh
npm install
npm run build   # src/index.css -> dist/dfh-site.css, and each component -> dist/components/
```

To try a change on a site before releasing it, point the site at your build: `DFH_SHARED_CSS` in the blog's `.env`, or `define('DFH_SHARED_CSS', '…')` in the course's `wp-config.php`.

To release: raise `version` in `package.json`, build, commit, tag the commit with the version, push the tag, then raise the version each site pins. Rules for what goes where are in [AGENTS.md](AGENTS.md).
