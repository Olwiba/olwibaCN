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

Hosted on Coolify at `cn.olwiba.com`. Push to master triggers auto-deploy.
