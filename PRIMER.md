# olwibaCN Component Primer

Reference guide for reviewing and completing components and mechanics. Each item needs a working demo, live usage code that matches the demo, and correct mode/size/disabled wiring.

---

## The Two Types

### Visual Components
Full visual identity. Default expectation is **size + mode + disabled** when those props create real component behavior.

Do not invent props or controls just to satisfy the default matrix. Small semantic helpers and utility components can be complete with fewer props when a size/mode/disabled option would not meaningfully change the component itself. Record that exception in the status notes.

| Prop | Values | Notes |
|---|---|---|
| `size` | `"sm" \| "default" \| "lg"` | Applied via cva or conditional classes |
| `mode` | `"playful" \| "smooth"` | Propagated via `UIVariantProvider` |
| `disabled` | `boolean` | `pointer-events-none opacity-50` or native `disabled` |

### Mechanics
Behavioural wrappers around Radix primitives. They **do not own size**. Mode is optional — only add it if the mechanic has its own visual surface (e.g. AlertDialog has a modal panel, Command has a container). Disabled comes from the Radix primitive.

| Prop | Rule |
|---|---|
| `size` | Never |
| `mode` | Only if the mechanic renders its own styled surface |
| `disabled` | Use Radix native prop where available, else `pointer-events-none opacity-50` |

---

## Mode System

### How it wires up

```tsx
// Root component accepts mode, wraps children
const MyComponent = ({ mode, children, ...props }) => (
  <UIVariantProvider mode={mode}>
    <div className={cn(
      "base-classes",
      mode === "smooth" && "rounded-2xl shadow-xl",
      mode === "playful" && "rounded-xl border-2 rotate-[0.3deg]",
    )} {...props}>
      {children}
    </div>
  </UIVariantProvider>
)

// Sub-components read from context
const MyItem = ({ className, ...props }) => {
  const mode = useUIVariant()
  return (
    <div className={cn(
      "base-classes",
      mode === "smooth" && "rounded-lg",
      mode === "playful" && "rounded-lg",
      className
    )} {...props} />
  )
}
```

### Usage examples

Component/mechanic usage examples should show local `mode` props on the visible pieces that need the mode. Use `UIVariantProvider` only when documenting global or section-level mode behavior, not as the default pattern for a specific component example.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button mode="playful">Open</Button>
  </DialogTrigger>
  <DialogContent mode="playful">
    ...
  </DialogContent>
</Dialog>
```

### Playful backdrop — inline (Button-style)

Use when the component is inline-level (buttons, badges, inputs).

```tsx
if (mode === "playful") {
  return (
    <span className="group/playful relative inline-flex">
      <span
        className={cn(
          "absolute inset-0 rounded-md transition-transform duration-200",
          "translate-x-[3px] translate-y-[3px] -rotate-[0.5deg]",
          "group-hover/playful:-rotate-[1.5deg] group-hover/playful:scale-[1.01]",
          backdropColor, // e.g. "bg-primary/30 dark:bg-primary/20"
        )}
        aria-hidden="true"
      />
      <Comp className={cn(baseClasses, "relative rotate-[0.3deg]")} ref={ref} {...props} />
    </span>
  )
}
```

### Playful backdrop — block (Card/Command-style)

Use when the component is block-level (cards, panels, command palette).

```tsx
if (mode === "playful") {
  return (
    <div className="relative">
      <span
        className="absolute inset-0 rounded-xl bg-foreground/10 translate-x-[3px] translate-y-[3px] -rotate-[0.5deg]"
        aria-hidden="true"
      />
      {inner} {/* inner has rotate-[0.3deg] applied */}
    </div>
  )
}
```

### Smooth mode conventions

| Element | Class |
|---|---|
| Buttons | `rounded-full shadow-none` |
| Panels / cards | `rounded-2xl shadow-xl` |
| Items / rows | `rounded-lg` |
| Inputs | `rounded-xl` |

---

## Demo File Template

```tsx
"use client";

import { useState } from "react";
import { MyComponent } from "@/components/ui/my-component";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

// Only define these for visual components — mechanics skip size
type MySize = "sm" | "default" | "lg";
type MyMode = "default" | "playful" | "smooth";

const sizes: MySize[] = ["default", "sm", "lg"];
const modes: MyMode[] = ["default", "playful", "smooth"];

export default function MyComponentDemo() {
  const [size, setSize] = useState<MySize>("default");
  const [mode, setMode] = useState<MyMode>("default");
  const [disabled, setDisabled] = useState(false);

  // Only include non-default props in the usage string
  // Keep this snippet aligned with the rendered demo markup.
  // Demo controls must update this snippet through useUsageCode.
  // Prefer explicit mode props in usage examples. Only include provider wrappers
  // when the example is specifically demonstrating provider-level behavior.
  const props = [
    size !== "default" && `size="${size}"`,
    mode !== "default" && `mode="${mode}"`,
    disabled && "disabled",
  ].filter(Boolean).join(" ");

  useUsageCode(`<MyComponent${props ? " " + props : ""}>Content</MyComponent>`);

  return (
    <>
      <MyComponent
        size={size}
        mode={mode === "default" ? undefined : mode}
        disabled={disabled}
      >
        Content
      </MyComponent>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          {/* Size — omit for mechanics */}
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

          {/* Mode — omit for mechanics without visual surface */}
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

          {/* Options — always present */}
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="demo-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="demo-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
```

---

## Live Demo / Usage Code Alignment

The preview and the usage snippet must be treated as one contract. A user should be able to configure the live demo, copy the usage snippet, and get the same visible result.

Watch for these specifically:

- **Text/content parity:** visible labels and copy must match exactly. If the preview trigger says `Open Drawer`, the usage snippet must also say `Open Drawer`, not `Open`.
- **Markup parity:** wrappers, `asChild`, `className`, child structure, icons, labels, and nested components shown in the preview must be represented in the snippet.
- **Control parity:** every demo control must update `useUsageCode`. This includes `mode`, `size`, `disabled`, orientation, variant, placement, open state defaults, and any option that changes the visible preview.
- **No fake controls:** do not add controls or public props for things the component does not actually own. For example, avoid forced device/platform toggles unless the component intentionally exposes that API.
- **No hidden state:** if the preview relies on a prop, provider, wrapper, or context to produce the visible state, the snippet must show the same mechanism. Prefer explicit local props for component/mechanic examples; only show `UIVariantProvider` when the example is specifically about provider-level behavior.
- **Import parity:** the MDX Usage import block must include every component/provider referenced by the live snippet.
- **No placeholders for completed demos:** avoid `...` in completed component/mechanic usage snippets when it hides visible preview content. The snippet should be copyable as the demonstrated example.
- **Initial-state parity:** the `LiveUsageCode defaultCode` must match the initial rendered demo before controls are changed.
- **Update behavior:** changing any control should immediately update the usage snippet. The snippet should not flicker back to stale/default code between updates.

For complex examples, prefer a small local usage-code generator so the rendered preview props and snippet props cannot drift:

```tsx
function getDrawerUsageCode({ mode, disabled }: { mode: Mode; disabled: boolean }) {
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : ""
  const disabledAttr = disabled ? " disabled" : ""

  return `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline"${modeAttr}${disabledAttr}>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent${modeAttr}>...</DrawerContent>
</Drawer>`
}

useUsageCode(getDrawerUsageCode({ mode, disabled }))
```

Final manual check before marking done:

1. Load the docs page.
2. Compare the default preview against the default usage snippet.
3. Change every control at least once.
4. Confirm the snippet updates and still reproduces the visible preview.
5. Confirm the MDX import block covers everything the snippet uses.

---

## MDX Doc Template

```mdx
---
title: My Component
description: One sentence description.
---

<div className="flex flex-col md:flex-row items-center justify-start gap-2 mb-2">
  <CopyCommandButton command="bunx shadcn@latest add @olwibacn/my-component" />
</div>

<ComponentPreview name="my-component" />

## Installation

<InstallationTabs name="my-component" />

## Usage

\`\`\`tsx
import { MyComponent } from "@/components/ui/my-component"
\`\`\`

<LiveUsageCode name="my-component" defaultCode={`<MyComponent>Content</MyComponent>`} />

## API Reference

<APIReference name="MyComponent" extends="div" props={[
  { name: "size", type: '"sm" | "default" | "lg"', default: '"default"' },
  { name: "mode", type: '"playful" | "smooth"', default: "—" },
  { name: "disabled", type: "boolean", default: "false" },
]} />
```

---

## Registration Checklist

When a component/mechanic is ready:

1. **`src/docs/components/ComponentPreview.tsx`** — add to `demos` map:
   ```ts
   'my-component': React.lazy(() => import('@/demos/my-component')),
   ```

2. **`src/routes/docs/$.tsx`** — add to `completedComponents` to remove `*`:
   ```ts
   '/docs/components/my-component',   // or /docs/mechanics/
   ```

---

## Review Checklist

Run through this for each item. Tick when done.

### Visual Component
- [ ] `mode` prop on root, wraps children in `UIVariantProvider`
- [ ] Playful: offset backdrop + `rotate-[0.3deg]` on element (inline or block pattern)
- [ ] Smooth: correct rounded/shadow values per element type
- [ ] `size` prop wired and affects padding/text/height
- [ ] `disabled` prop applies `pointer-events-none opacity-50` (or native)
- [ ] Sub-components read `useUIVariant()` where needed
- [ ] Demo: controls cover every supported visual prop; do not add unsupported/fake controls
- [ ] Demo: `useUsageCode` dynamically reflects control state (only non-default props emitted)
- [ ] Demo: live usage code matches the rendered demo markup; controls update the snippet immediately
- [ ] Demo: usage code uses explicit mode props unless demonstrating provider-level behavior
- [ ] MDX: `<LiveUsageCode>` not a static code block
- [ ] MDX: usage import block includes every component/provider referenced by live usage code
- [ ] MDX: `APIReference` lists all props
- [ ] Registered in `ComponentPreview.tsx` demos map
- [ ] Added to `completedComponents` in `$.tsx`

### Mechanic
- [ ] `mode` prop only if the mechanic has its own visual surface (panel, container)
- [ ] If mode: wraps rendered surface in `UIVariantProvider`, inner buttons use `Button` component (not `buttonVariants`)
- [ ] `disabled` via Radix native prop where available
- [ ] Demo: mode controls if applicable, disabled switch always
- [ ] Demo: `useUsageCode` dynamically reflects control state
- [ ] Demo: live usage code matches the rendered demo markup; controls update the snippet immediately
- [ ] Demo: usage code uses explicit mode props unless demonstrating provider-level behavior
- [ ] MDX: `<LiveUsageCode>` not a static code block
- [ ] MDX: usage import block includes every component/provider referenced by live usage code
- [ ] MDX: `APIReference` lists all exported sub-components
- [ ] Registered in `ComponentPreview.tsx` demos map
- [ ] Added to `completedComponents` in `$.tsx`

---

## Status

### Mechanics (14 / 18 done)

| Mechanic | Done | Has Mode | Notes |
|---|---|---|---|
| alert-dialog | ✅ | ✅ | Mode on `AlertDialogContent`; buttons use `Button` via `asChild` |
| collapsible | ✅ | — | Behavioural wrapper only; disabled via Radix |
| command | ✅ | ✅ | Playful block backdrop; `CommandItem` reads context |
| confetti | ✅ | — | Utility function; no visual surface, no mode/size/disabled |
| context-menu | ✅ | — | Disabled via `pointer-events-none`; primary dashed trigger |
| dialog | ✅ | ✅ | Mode on `DialogContent`; demo usage uses explicit mode props |
| drawer | ✅ | ✅ | Mode on `DrawerContent`; demo usage uses explicit mode props |
| dropdown-menu | ✅ | ✅ | Mode on content surfaces; demo usage uses explicit mode props |
| form | ✅ | — | RHF integration layer; no visual surface, no mode/size; disabled via RHF |
| hover-card | ✅ | ✅ | Mode on `HoverCardContent`; demo usage uses explicit mode props |
| menubar | ✅ | ✅ | Mode on bar/content surfaces; demo usage uses explicit mode props |
| navigation-menu | ✅ | ✅ | Mode on root; viewport gets playful block backdrop / smooth rounding; trigger gets playful inline backdrop / smooth rounded-full; cursor-pointer fixed |
| popover | ✅ | ✅ | Panel surface |
| resizable | ✅ | — | Layout primitive; no visual surface; library forces `height:100%` inline — wrap group in a container div and set height there (`h-[200px]` for vertical, `min-h-[200px]` for horizontal); v4 API uses `orientation` not `direction` |
| scroll-area | ✅ | — | Layout primitive; vertical default shows package list; both mode shows horizontal card row |
| sheet | ⬜ | ✅ needed | Slide-in panel |
| sonner | ⬜ | ✅ needed | Toast surface |
| tooltip | ⬜ | ✅ needed | Small panel surface |

### Components (38 / 38 done)

| Component | Done | Notes |
|---|---|---|
| accordion | ✅ | |
| alert | ✅ | |
| aspect-ratio | ✅ | Layout wrapper — no mode/size |
| avatar | ✅ | |
| badge | ✅ | |
| breadcrumb | ✅ | |
| button | ✅ | Reference impl for playful inline backdrop |
| button-group | ✅ | |
| calendar | ✅ | Playful selected day backdrop |
| card | ✅ | Playful block backdrop |
| carousel | ✅ | |
| chart | ✅ | |
| checkbox | ✅ | |
| empty | ✅ | |
| field | ✅ | Mode propagates via UIVariantProvider to children; no size; disabled via `data-disabled="true"` attr |
| hotkey | ✅ | Platform-aware; shortcut + `asKbd` |
| input | ✅ | |
| input-group | ✅ | |
| input-otp | ✅ | |
| item | ✅ | |
| kbd | ✅ | Static shortcut display |
| label | ✅ | Small — size only |
| pagination | ✅ | Uses buttons — mode |
| progress | ✅ | |
| radio-group | ✅ | Radix form primitive; disabled controls only |
| select | ✅ | Panel surface + trigger |
| separator | ✅ | Minimal |
| sidebar | ✅ | Primitive navigation system; AppShell composition lives in `@olwiba/ui` |
| skeleton | ✅ | No mode |
| slider | ✅ | Size only |
| spinner | ✅ | SVG indicator; size through `className` |
| status-indicator | ✅ | Size, color, pulse, disabled |
| switch | ✅ | Size + disabled; no mode |
| table | ✅ | Size controls table density; no mode/disabled |
| tabs | ✅ | Size on list; mode on root; disabled via trigger |
| textarea | ✅ | Size, mode, disabled; playful backdrop only |
| toggle | ✅ | Size, variant, mode, disabled; playful backdrop when pressed |
| toggle-group | ✅ | Size, variant, mode, disabled; playful backdrop on active items |
