# olwibaCN

Custom shadcn/ui component registry.

## Structure

```
olwibaCN/
├── registry/           # Source components
│   ├── lib/           # Utilities (utils.ts)
│   └── ui/            # UI components (button.tsx, etc.)
├── public/r/          # Generated JSON (served at /r/{name}.json)
├── src/               # TanStack Start docs site
├── registry.json      # Registry definition
└── vite.config.ts
```

## Adding Components

1. Create component in `registry/ui/` or `registry/lib/`
2. Add entry to `registry.json`
3. Run `npx shadcn@latest build`

## Development

```bash
bun install
bun dev              # Start dev server at localhost:3000
bun run registry:build   # Generate JSON files
```

## Using in Projects

Add to your project's `components.json`:

```json
{
  "registries": {
    "@olwibacn": "https://cn.olwiba.com/r/{name}.json"
  }
}
```

Then install components:

```bash
shadcn add @olwibacn/button
```

## Deployment

Hosted on Coolify at `cn.olwiba.com`. 
Push to master triggers auto-deploy.

## Package Release Flow

Package publishing is tag-driven, not push-driven.

1. Make the change locally and validate it.
2. Bump `package.json` once the release content is final.
3. Commit and push `master`.
4. Create a matching version tag, for example `v0.1.3`.
5. Push the tag: `git push origin v0.1.3`.

The `publish-package` GitHub Actions workflow runs automatically on `v*` tags and verifies that the tag matches the package version before publishing. `workflow_dispatch` remains available as a manual fallback.

If the `DISCORD_WEBHOOK_URL` GitHub Actions secret is configured, the publish workflow also sends a Discord notification on both success and failure.

When a shared docs behavior change starts here as beta docs work, validate it in `olwibaCN` first, then sync the released docs-facing pieces into `olwibaDOCS`.
