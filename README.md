# DFH Shared Styles

The CSS the Design For Humans sites share on top of [DFH Components](https://components.designforhumans.blog): the article, section, card list, index card and grid settings, the brand frame, the header's site trail, and the sites' component token choices.

Link it after the library and its theme, before a site's own CSS:

```html
<link rel="stylesheet" href="https://components.designforhumans.blog/css/0.3.0/dfh-components.css">
<link rel="stylesheet" href="https://components.designforhumans.blog/css/0.3.0/themes/dfh.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/PaulCWoods/dfh-shared-styles@0.1.0/dist/dfh-site.css">
<link rel="stylesheet" href="/css/site.css">
```

## Working on it

```sh
npm install
npm run build   # src/index.css -> dist/dfh-site.css
```

To try a change on a site before releasing it, point the site at your build: `DFH_SHARED_CSS` in the blog's `.env`, or `define('DFH_SHARED_CSS', '…')` in the course's `wp-config.php`.

To release: raise `version` in `package.json`, build, commit, tag the commit with the version, push the tag, then raise the version each site pins. Rules for what goes where are in [AGENTS.md](AGENTS.md).
