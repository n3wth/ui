# Site maintenance

`ecosystem.json` records the six canonical domains, their source repositories, application roots and native validation commands. Keep separate applications and hosting projects; shared maintenance does not require matching page layouts or moving domains.

## Shared validation

Use Node 24 locally (`nvm use` reads `.nvmrc`). The package engine and CI use the same major version. Dependabot opens grouped weekly npm and GitHub Actions updates; review and validate them before merging.

`.github/workflows/site-check.yml` provides Node 24, a lockfile-keyed npm cache, `npm ci` and the caller's native check command. It checks out the calling repository. It needs only `contents: read` and no deployment secrets.

Consumers should reference a reviewed full commit SHA of this workflow, not a moving branch. Pass `working-directory: website` for r3; root applications use the default `.`. Pass the command from the manifest as `check-command`. Updating the pinned SHA is an explicit dependency update.

UI calls this workflow on pull requests and main pushes through `site-ci.yml`. The existing coverage gate remains independent. Run the same validation locally with:

```sh
npm ci
npm run lint && npm run build && npm run demo:build && npm test
```

`npm run build` produces the distributable library in `dist`. `npm run demo:build` produces the website in `dist-demo`. Vercel installs with `npm ci` and deploys `dist-demo`; npm package releases remain a separate release-triggered workflow. Website maintenance does not require publishing a new npm version.

## Domains and shared presentation

Change canonical domain entries here when a domain changes, then update that application's redirects, metadata and cross-site links together. The manifest documents intended configuration; it does not alter DNS or Vercel projects.

UI demo pages share footer links through `demo/siteLinks.ts`. Existing theme exports remain available at `@n3wth/ui/theme`; adopting this workflow does not require adding a UI package dependency or replacing an application's navigation.
