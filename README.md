# @olwiba/cn

> Customized shadcn/ui primitives — part of the [shadcn "cn" family](https://ui.shadcn.com/).

## What This Is

Base UI components built on top of shadcn/ui with Olwiba-specific customizations. These are the foundational primitives used by `@olwiba/ui`.

## Package

```
npm: @olwiba/cn
registry: private (Verdaccio)
```

## Installation

```bash
# Configure Verdaccio in bunfig.toml first
bun add @olwiba/cn
```

## Components

- Button
- Card (Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription)
- Dialog
- Input
- Label
- Form components
- Dropdown Menu
- Avatar
- Separator
- Tabs
- Toast / Sonner
- Checkbox
- Select
- Textarea
- Badge
- Alert
- Skeleton

## Utilities

```tsx
import { cn } from "@olwiba/cn";

// Merge Tailwind classes
cn("px-4 py-2", conditional && "bg-blue-500");
```

## Peer Dependencies

- react
- tailwindcss

## Related

- [@olwiba/ui](https://github.com/Olwiba/olwibaUI) — App components built on cn
- [@genesis/renderer](https://github.com/Olwiba/genesis-renderer) — JSON-to-UI engine
