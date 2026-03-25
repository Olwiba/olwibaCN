# Component Variant System — Implementation Primer

Use this file to prime context when implementing the variant system across components.

---

## The Three Modes

Every component gets a `mode` prop (unless it's a pure layout primitive with no styling surface, e.g. AspectRatio):

| Mode | Description |
|---|---|
| *(omitted / default)* | Blocky, sharp, standard shadcn-style. Zero-cost — no extra classes or DOM nodes. |
| `smooth` | Softens the blockiness. Rounder corners, softer edges, more fluid. Same DOM structure as default. |
| `playful` | Expressive and fun. Often involves a backdrop shadow + slight rotation. May require a wrapper DOM element. |

The `smooth` interpretation is defined per-component — whatever removes the blockiness for that specific shape.

---

## Prop Naming Rules

- Use `mode?: "playful" | "smooth"` on the component prop.
- `size` and `disabled` are separate props, not part of mode.

---

## Multi-Part Components (e.g. Accordion, Avatar)

Use React context to thread `mode` and `size` through sub-components so the user only sets it once on the root:

```tsx
type MyMode = "playful" | "smooth"
const MyContext = React.createContext<{ mode?: MyMode }>({})

const MyRoot = React.forwardRef<..., ... & { mode?: MyMode }>(
  ({ mode, ...props }, ref) => (
    <MyContext.Provider value={{ mode }}>
      <Primitive.Root ref={ref} {...props} />
    </MyContext.Provider>
  )
)

const MyItem = React.forwardRef<...>(({ className, ...props }, ref) => {
  const { mode } = React.useContext(MyContext)
  return <Primitive.Item className={cn(...modeClasses, className)} {...props} />
})
```

---

## Disabled State

Match the button pattern: `opacity-50 pointer-events-none`.

- Native HTML elements: add `disabled && "opacity-50 pointer-events-none"` to `cn()`
- Radix primitives: use `data-[disabled]:opacity-50 data-[disabled]:pointer-events-none` (Radix sets `data-disabled` automatically)

---

## Size Prop

Not all components need size, but when added:
- Common values: `"sm" | "default" | "lg"` (or `"sm" | "default"` for compact-only)
- `default` is always the initial/default value
- For multi-part components, thread `size` through context alongside `mode`

---

## Demo Controls Pattern

Every demo is a `"use client"` component using `DemoControls` from `@/components/docs/ComponentPreview`.

Control order: **Size → Mode → Options**

```tsx
"use client"

import { useState } from "react"
import { DemoControls } from "@/components/docs/ComponentPreview"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type MyMode = "default" | "playful" | "smooth"
type MySize = "default" | "sm" | "lg"

const modes: MyMode[] = ["default", "playful", "smooth"]
const sizes: MySize[] = ["default", "sm", "lg"]

export default function MyDemo() {
  const [mode, setMode] = useState<MyMode>("default")
  const [size, setSize] = useState<MySize>("default")
  const [disabled, setDisabled] = useState(false)

  return (
    <>
      {/* component preview here */}
      <MyComponent
        mode={mode === "default" ? undefined : mode}
        size={size}
        disabled={disabled}
      />

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">

          {/* SIZE — default first, preselected */}
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Size</span>
            <div className="flex gap-1.5">
              {sizes.map((s) => (
                <Button key={s} variant={size === s ? "default" : "secondary"} size="sm" onClick={() => setSize(s)}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* MODE — Default first, preselected, radio-style (no toggle) */}
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Mode</span>
            <div className="flex gap-1.5">
              {modes.map((m) => (
                <Button key={m} variant={mode === m ? "default" : "secondary"} size="sm" onClick={() => setMode(m)}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* OPTIONS — disabled toggle */}
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="my-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="my-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>

        </div>
      </DemoControls>
    </>
  )
}
```

**Key rules:**
- `default` is always first in both `sizes` and `modes` arrays
- `default` is preselected via `useState("default")`
- Mode switcher is **radio-style** — `onClick={() => setMode(m)}` — no toggle/deselect
- Pass `mode={mode === "default" ? undefined : mode}` to the component (undefined = default)

---

## API Reference (docs)

Add `mode`, `size`, and `disabled` to the `APIReference` block:

```mdx
<APIReference name="MyComponent" extends="div" props={[
  { name: "mode", type: '"playful" | "smooth"', default: "undefined" },
  { name: "size", type: '"sm" | "default" | "lg"', default: '"default"' },
  { name: "disabled", type: "boolean", default: "false" },
]} />
```

---

## What to Skip

- **AspectRatio** — pure layout primitive, no styling surface, no mode
- Components where mode genuinely adds no value — flag and confirm before skipping
