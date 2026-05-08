<p align="center">
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="./public/olwibaCN--light.gif" />
    <source media="(prefers-color-scheme: dark)" srcset="./public/olwibaCN.gif" />
    <img src="./public/olwibaCN.gif" alt="olwibaCN" style="width: 100%;" />
  </picture>
</p>

<h1 align="center">@olwiba/cn</h1>

<p align="center">
  <strong>Shared UI primitives, styling foundations, and shadcn registry components for the Olwiba ecosystem.</strong>
</p>

<p align="center">
  <a href="https://cn.olwiba.com">Docs</a> ·
  <a href="https://github.com/Olwiba/olwibaCN/issues/new?template=bug_report.md">Report a bug</a> ·
  <a href="https://github.com/Olwiba/olwibaCN/issues/new?template=feature_request.md">Feature request</a>
</p>

<p align="center">
  <a href="https://github.com/sponsors/Olwiba"><img src="https://img.shields.io/static/v1?label=Sponsor&message=❤&logo=GitHub&color=%23fe8e86" alt="Sponsor" /></a>
  <a href="https://buymeacoffee.com/olwiba"><img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?logo=buymeacoffee&logoColor=black" alt="Buy Me A Coffee" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/Olwiba/olwibaCN?label=license&logo=github" alt="License" /></a>
  <a href="https://github.com/Olwiba/olwibaCN/issues"><img src="https://img.shields.io/github/issues/Olwiba/olwibaCN" alt="Issues" /></a>
</p>

## What This Is

`@olwiba/cn` is the foundation package in the Nexus ecosystem.

Use it for:
- low-level shared UI primitives
- shared styling foundations and CSS entrypoints
- reusable hooks and utility helpers
- component building blocks that need to flow into both docs and app-level packages

This repository also powers the public shadcn registry at `cn.olwiba.com`.

## Package Chain

```text
@olwiba/cn   -> shared primitives, styles, hooks, and low-level interactions
@olwiba/docs -> docs shell, search, and MDX helpers built on @olwiba/cn
@olwiba/ui   -> app shells, marketing sections, and higher-level UI built on top
```

## Two Consumption Paths

### 1. Package imports

Use package imports when you want shared primitives maintained centrally across the ecosystem.

```bash
bun add @olwiba/cn
```

Peer dependencies:
- `react`
- `react-dom`
- `tailwindcss`

Example:

```tsx
import "@olwiba/cn/styles";
import { Button, Card, UIVariantProvider } from "@olwiba/cn";

export function Example() {
  return (
    <UIVariantProvider mode="smooth">
      <Card className="p-6">
        <Button>Continue</Button>
      </Card>
    </UIVariantProvider>
  );
}
```

Available CSS entrypoints:
- `@olwiba/cn/styles`
- `@olwiba/cn/theme`
- `@olwiba/cn/preset`

### 2. Registry installs

Use the registry when you want to copy component source into an app and own it locally.

Add the registry to your project's `components.json`:

```json
{
  "registries": {
    "@olwibacn": "https://cn.olwiba.com/r/{name}.json"
  }
}
```

Then install items with shadcn:

```bash
shadcn add @olwibacn/button
```

The registry mirrors the primitive layer and also exposes copy-own helpers such as `utils`, `confetti`, `use-copy-to-clipboard`, and `use-mobile`.

## Export Surface

The published package export surface is built from [`src/components/ui/index.ts`](./src/components/ui/index.ts).

It includes shared primitives, variant helpers, hooks, utilities, effects, theme helpers, and standalone components such as `AsciiText`.

## Docs Shell Source Of Truth

This repository contains docs-shell source files under `src/docs/components/*`, but those are not the published consumer contract for documentation sites.

Canonical docs flow:
- implement shared docs-shell behavior in `olwibaCN`
- sync it into `olwibaDOCS`
- consume it downstream from `@olwiba/docs`

Rule:
- app and docs consumers should import docs shell primitives such as `DocsLayout`, `DocsSidebar`, and docs search from `@olwiba/docs`, not from `@olwiba/cn`

## Development

```bash
bun install
bun run dev
bun run web:dev
bun run registry:build
bun run build
```

What each command does:
- `bun run dev` -> watches the published package build with `tsup`
- `bun run web:dev` -> starts the docs/registry site on port `3000`
- `bun run registry:build` -> regenerates the shadcn registry JSON
- `bun run build` -> builds the package for publishing

## Site Deployment

The `olwibaCN` site is hosted at `cn.olwiba.com`.

Site deployment and package publishing are separate:
- pushing `master` updates the site workflow
- publishing `@olwiba/cn` is tag-driven

## Package Release Flow

Package publishing is tag-driven, not push-driven.

1. Make the change locally and validate it.
2. Update `CHANGELOG.md` and bump `package.json` once the release content is final.
3. Commit and push `master`.
4. Create a matching version tag, for example `v0.1.3`.
5. Push the tag: `git push origin v0.1.3`.

The `publish-package` GitHub Actions workflow runs automatically on `v*` tags and verifies that the tag matches the package version before publishing. `workflow_dispatch` remains available as a manual fallback.

If the `DISCORD_WEBHOOK_URL` GitHub Actions secret is configured, the publish workflow also sends a Discord notification on both success and failure.

When a shared docs behavior change starts here as beta docs work, validate it in `olwibaCN` first, then sync the released docs-facing pieces into `olwibaDOCS`.

## Contributing

Bug reports and pull requests welcome. Open an issue first for anything beyond a small fix.

## Related

- [@olwiba/docs](https://github.com/Olwiba/olwibaDOCS) - Published docs shell and MDX package
- [@olwiba/ui](https://github.com/Olwiba/olwibaUI) - App-level package built on top of `@olwiba/cn`
