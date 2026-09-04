# Changelog









## 0.1.37

### Fixed

- Give the close button its corner back, and a type scale [skip ci]
- Make the mobile docs chrome actually usable [skip ci]
- Pin @olwiba/dx 0.0.23 [skip ci]

## 0.1.36

### Added

- Add form presentation

### Fixed

- Default toasts to 6s, not sonner's 4s

## 0.1.35

No packaged changes — `dist` and the two stylesheets are byte-identical to 0.1.34. Everything below is the docs site's `Sandbox`, which is documented here because page-pattern demos are how the components get read.

### Added

- `SandboxControls`, a portal for a demo's own example switches — loading/empty/populated, layout variants. A demo renders it anywhere in its tree, including inside the preview iframe, and the DOM lands in a bordered strip below the preview frame. Rendered in place, those switches sit inside the previewed page and read as product chrome, which teaches exactly the wrong lesson about a page pattern: the reader can't tell which controls belong to the pattern and which belong to the documentation. The strip mirrors the `ComponentPreview`/`DemoControls` convention already used for component demos, so the two demo types now read the same way
- The strip carries `data-slot="sandbox-controls"`, matching the ecosystem's `data-slot` convention and making it addressable from tests and inspection

### Fixed

- An expanded sandbox renders near-fullscreen, but a fixed-height preview kept its pixel height, floored at 720 — so every viewport preset stranded vertical space below the demo in the one mode that had room to spare. Fixed-height previews now stretch through the modal via the flex chain instead of a pixel height. Auto-height previews are unchanged: they keep growing and scrolling the wrapper, since there is no fixed frame to stretch

## 0.1.34

No user-facing changes.

## 0.1.33

### Changed

- Light neutrals are off-white and tinted toward the brand hue, and neither is configurable any more. The page sits at `#fafafa` (`oklch(0.985 …)`) rather than `#fefefe`, and every light neutral carries a trace of colour. A product gets both by doing nothing. The last three releases arrived at this by half-steps — a hue knob, then a chroma knob, then a lift, each defaulting to off or nearly off — and the result was that the defaults stayed wrong and every product had to restate the same three lines to fix them. Pure white and pure grey are the same mistake in two directions: white emits more light than any other surface on screen, so long reading tires eyes faster than an off-white and the page reads as sterile rather than clean; grey neutrals give a brand accent nothing to sit against, so light mode stops looking like a lighter version of the palette and starts looking like the absence of one. Neither is worth a setting
- The hue is read from `--primary` with relative colour syntax — `oklch(from var(--primary) 0.985 var(--neutral-tint-page) h)` — which is what makes this work without configuration. `cn` cannot know a product's brand hue, but it can read the one already declared, and a tint derived that way cannot drift from the brand the way a hardcoded number does
- Lightness is now stepped per token rather than derived from a lift multiplier, and `--card` (`0.997`) sits *above* `--background` (`0.985`) instead of below it. A card previously differed from the page only by its border, so a translucent surface over it — `bg-card/45` — showed nothing at all. Popovers move with cards; `secondary`, `muted`, `accent`, lines and `sidebar` each take their own step

### Removed

- `--neutral-tint-hue` and `--neutral-lift`, both added in the last two releases. The hue comes from `--primary` now, and the lift is baked into the token values. A consumer still setting either gets no error and no effect — the properties are simply unread
- The `:root:not(.dark)` override advice from 0.1.30 no longer applies to the one remaining knob. Dark's tokens don't read `--neutral-tint-chroma`, so a plain `:root` block is safe for it. The advice still holds for overriding any *token* directly

### Note

- `--neutral-tint-chroma: 0` is the single escape hatch, for a product where a colour cast would fight its content — a charting or data tool. It keeps the off-white and drops the hue. There is no longer a way to get pure white back short of setting `--background` yourself
- The brand-derived values live in `@supports (color: oklch(from white l c h))`, not alongside the plain ones in `:root`. The usual progressive-enhancement pattern — plain value first, derived value second, let an old browser drop the second — does not work for custom properties. A custom property accepts almost any token stream, so `--background: oklch(from …)` is *stored* even where it cannot be parsed; the failure surfaces only when the value is used, and then it is invalid at computed-value time and falls back to the property's initial value rather than to the earlier declaration. That is a transparent page, not an untinted one. Gating on support means an older browser never sees them and keeps the plain off-white neutrals, which are correct on their own — the tint is the refinement, not the requirement
- Foregrounds are untouched. The largest move is `1` → `0.985` on `background`, so contrast is effectively unchanged and still far past AA
- Dark is untouched. Neither problem exists there

## 0.1.32

### Changed

- `--neutral-lift` now defaults to `0.003` instead of `0`, putting the light-mode page at `#fefefe` rather than `#ffffff`. Pure white is the one value worth refusing by default: it emits more light than any other surface on the screen, so long reading sessions tire eyes faster on `#ffffff` than on an off-white, and it flattens a page into something sterile. Sitting just off it is the convention in editorial and product design, and it is the same reasoning behind the near-universal advice against pure black — which Refactoring UI states outright, while saying nothing about white
- `0.003` is deliberately conservative: one step per channel, enough to remove the extreme without restyling any consumer's product. It is the floor rather than the recommendation — `0.015` puts the page at `#fafafa`, which is where the glare actually goes

### Note

- This is the only value a consumer now inherits without asking for it. The two tint knobs shipped in 0.1.30 still default to `0` and still change nothing. The comment claiming all three were a no-op has been corrected rather than left to mislead
- `--neutral-lift: 0` gets pure white back for anything that wants it — a print stylesheet, a canvas, a screenshot surface
- The lift is distributed per token as in 0.1.31, so this moves every light-mode surface by its own share, not just `background`. Foregrounds are untouched and contrast is unaffected at this magnitude
- Dark is untouched

## 0.1.31

### Added

- `--neutral-lift`, how far light-mode surfaces drop below pure white, defaulting to `0`. The tint knobs shipped in 0.1.30 were incomplete on their own: `oklch(1 0.004 186)` is still white — there is almost no room for chroma at maximum lightness — so tinting a pure-white background barely registers and "light mode is too bright" stays true. The knob worked and did not solve the problem. Lowering the page a little is what makes both the tint visible and the page comfortable
- Lifting also separates `card` from `background`, which are otherwise the identical value. A card is distinguished from the page only by its border, and a translucent surface over it — `bg-card/45` — shows nothing at all. The card drops by a fifth of what the page does, so it lifts without reading as a different colour
- Each token takes its own share of the lift rather than a flat offset, the same way chroma does: the page and `accent` take it whole, raised surfaces `0.2`, `secondary` and `muted` `0.53`, lines and `sidebar` `0.67`. At `--neutral-lift: 0.015` with `--neutral-tint-chroma: 0.012` this reproduces a set of hand-tuned values to within a rounding step on one token, which is where the ratios came from

### Fixed

- `--sidebar-accent` and `--sidebar-border` were hardcoded achromatic, so they were the two light-mode tokens 0.1.30's tint knobs silently skipped — a tinted sidebar kept grey hover and grey rules. Both now read `--neutral-tint-chroma` / `--neutral-tint-line` like their non-sidebar counterparts

### Note

- Nothing changes for a consumer who sets nothing. `--neutral-lift: 0` makes every `calc()` resolve to the previous literal
- Foregrounds are untouched and the largest move is `1` → `0.985`, so contrast is effectively unchanged and still far past AA
- Dark is untouched, and deliberately not parameterised: the problem doesn't exist there
- Overriding these from a consumer stylesheet still needs `:root:not(.dark)`, not `:root` — see the 0.1.30 note

## 0.1.30

### Added

- Light-mode neutrals can be tinted toward a brand hue with `--neutral-tint-hue` and `--neutral-tint-chroma`, both defaulting to `0`. Pure achromatic neutrals — `oklch(1 0 0)` for the background, chroma 0 on every one of them — are the shadcn default and right for a neutral product, but they make a branded one read as clinical: an accent dropped onto pure white has nothing to sit against, and light mode looks less like "light" than like the absence of colour. Nine tokens read the two knobs: `background`, `card`, `popover`, `secondary`, `muted`, `accent`, `border`, `input`, `sidebar`
- Chroma is scaled per surface rather than applied flat, because a tint that reads as deliberate on a border reads as a colour cast across a full-page background. The page takes `0.33` of it, raised surfaces `0.25`, muted surfaces `0.67`, lines `0.83`, and `accent` takes it whole. Those shares are derived variables (`--neutral-tint-page`, `--neutral-tint-raised`, `--neutral-tint-muted`, `--neutral-tint-line`) rather than magic numbers repeated at each token, so a product tunes one value

### Note

- Nothing changes for a consumer who sets neither knob. `oklch(L 0 H)` is achromatic whatever the hue, so the declarations change and the computed values do not
- Dark is untouched, and deliberately not parameterised: dark neutrals are already dark enough to carry an accent, so the problem doesn't exist there
- Overriding these from a consumer stylesheet needs `:root:not(.dark)`, not `:root`. `.dark` is a class and `:root` a pseudo-class — equal specificity — and a consumer's stylesheet is imported after this preset, so a plain `:root` block wins on source order and repaints *dark* mode with the light values. It presents as the override being ignored in light mode and applied in dark, which sends you looking in the wrong place. The tint knobs exist partly to avoid needing such an override at all

## 0.1.29

### Added

- `NumberInput`: a number field whose steppers follow the theme. Native spin buttons can't be styled — `::-webkit-inner-spin-button` accepts little beyond `appearance: none` and Firefox exposes no hook at all — so they read as unstyled OS chrome inside a themed control, worst in `glass` and `playful`. This hides them and draws stacked chevrons inside the field border. Works controlled or uncontrolled: stepping writes through the prototype's value setter and dispatches `input`, which leaves React's instance-level value tracker stale and so registers as a change. `min`/`max` disable the respective button on arrival rather than clamping silently, stepping an empty field lands on `min` (or `0`) instead of ±step, `step` drives decimal rounding so repeated presses don't accrue float dust, and the buttons are not tab stops because `ArrowUp`/`ArrowDown` already step natively
- `Input` exports `inputBase` and `inputPlayfulBacking`, so a control that has to look like an Input without being one shares the surface instead of copying it

### Fixed

- `Input`: `modeProp ?? useUIVariant()` short-circuited, so passing an explicit `mode` skipped the hook call and changed hook order between renders. Same fix as `Toaster` in 0.1.28

### Note

- `Input` is unchanged behaviourally: a bare `<Input type="number" />` keeps its native spinners. Removing them there would take the control away from existing consumers and give nothing back — reach for `NumberInput` instead









## 0.1.28

### Changed

- `Toaster`: close button moved from top-left to top-right and tucked fully inside the toast (was straddling the edge), restyled as a 20px ghost button on theme tokens instead of sonner's bordered `--gray*` default. Colour is inherited rather than a fixed token, so it stays legible on `richColors` toasts of every type

### Fixed

- `Toaster` followed the OS colour scheme instead of the app's. It read next-themes' `useTheme()`, which only resolves in an app that mounts `ThemeProvider` — everywhere else the hook returned undefined and the value fell back to `"system"`, so a dark app on a light machine got a light toast. It also read `theme` rather than `resolvedTheme`, wrong even in a Next app. Theme is now derived from the `dark` class (or `data-theme`) on `<html>` and watched with a `MutationObserver`, which every setup agrees on, next-themes included. `next-themes` is no longer imported by this component
- `Toaster`: `modeProp ?? useUIVariant()` short-circuited, so passing an explicit `mode` skipped the hook call and changed hook order between renders

## 0.1.27

### Added

- New `mode="glass"` — frosted glassmorphism built on theme tokens (`background` / `popover` at reduced opacity) so it follows every theme and brand color in light and dark. Supported on `Button`, `Card`, `Input`, `Dialog`, `Popover`, and `Tooltip`; unsupported components fall through to default. Shared recipes live in `components/ui/glass.ts` (`glassSurface` for containers, `glassPanel` for floating panels, `glassControl` for form controls, plus `glassBlur`) so the look is tunable in one place. Tiny controls (checkbox, radio, switch, kbd) deliberately stay unchanged — frosted chrome is illegible at that size. `UIVariant` union widened to include `glass`
- `ContextMenu`, `Switch`, `RadioGroup`, `Kbd`, `Hotkey`, and `Progress` are now mode-aware, closing the family gaps: `ContextMenu` mirrors `DropdownMenu` (content `mode` prop + `UIVariantProvider` inheritance, per-mode item/trigger rounding); `Switch` and `RadioGroupItem` get the checkbox-style playful backdrop; `Kbd` / `Hotkey` get smooth rounding and a playful keycap backdrop; `Progress` gets the card-style neutral backdrop. Each reads `UIVariant` context with a per-component `mode` override
- `DocsLayout`: `variant="product"` drops the blueprint rails, widens gutters, and enlarges the title and description. Default `variant="technical"` renders identically to before; the root now carries `data-docs-variant` for CSS hooks
- Docs components `DocsHeroPattern` (gradient + grid hero backdrop), `DocsCardGrid` (pointer-glow landing nav cards), and `DocsFeedback` (inline was-this-page-helpful widget, same app-agnostic submit contract as `FeedbackSidebarItem`). Token colors throughout, no new dependencies

### Changed

- `AsciiText`: shine sweep slowed 25% (1.35 → 1.0125 passes per second, extracted to a `SHINE_SPEED` constant) — the band read too fast on mobile
- Build now cleans `dist` once up front via `scripts/clean-dist.ts` instead of during the bundle step

### Fixed

- `Dialog`, `AlertDialog`, `Alert`, `Sheet`, `Drawer`, `Tooltip`, `Toaster`, `ErrorPage`, and `InputGroup` accepted a `mode` prop but never read `UIVariant` context, so app-wide mode from `UIVariantProvider` silently skipped them. The overlay components made it worse by re-providing their own unset mode, resetting global mode for everything rendered inside a dialog, sheet, or drawer. All now resolve `modeProp ?? useUIVariant()`
- `Drawer`: public exports explicitly annotated so emitted declarations no longer reference vaul's internal `@radix-ui/react-dialog` types through package-store paths (TS2742), which broke `dts` builds outside this repo's exact `node_modules` layout
- Sandbox previews without an explicit `height` were pinned to the min-height floor; the iframe now measures `#sandbox-root` with a `ResizeObserver` and drives the frame height, so demos grow and shrink with their content. The `height` prop and `shellPreview` keep fixed-frame behavior; expanded mode scrolls tall previews
- Docs footer links (report a bug, feature request, changelog) overflowed the footer row on narrow viewports; below `md` they now collapse into a drop-up menu behind an ellipsis button
- Concurrent `tsup` configs raced on cleaning `dist` — the main bundle's clean could delete the email build's output mid-write

## 0.1.26

### Added

- Support pro brand shine
- Allow hiding header tools
- Make FeedbackSidebarItem app-agnostic, add pink confetti
- Add feedback sidebar, badge/input playful mode, toast rename

### Changed

- Halve IsometricPlane row count to trim decorative DOM weight
- Exempt first-party @olwiba/* from minimum release age
- Revert "chore: replace deprecated createServerFn inputValidator with validator"
- Replace deprecated createServerFn inputValidator with validator
- Resolve dev port via @olwiba/dx resolveDevPort

### Fixed

- Render iso plane skeleton during SSR, respect reduced motion
- Use inputValidator, not validator, for createServerFn
- Regenerate standalone bun.lock for tailwind/dx dep changes
- Preserve fumadocs relevance order
- Compile Tailwind via @tailwindcss/vite plugin
- Add wget to runtime stage for Coolify healthcheck

## 0.1.25

No user-facing changes.

## 0.1.24

No user-facing changes.

## 0.1.23

No user-facing changes.

## 0.1.22

### Changed

- `Button`: base styles now include `cursor-pointer` so buttons show a pointer cursor on hover
- Package is now mirrored to GitHub Packages in addition to npmjs.com

### Fixed

- Docs source no longer shipped in the client bundle: doc content moved into a route loader (`docs/-loader.ts`), `SearchDialog` fetches browse pages lazily, and registry JSON regenerated (adds `ui-variant-context` registry entry)
- `tsup` watch mode no longer cleans `dist` on every rebuild, preventing momentary missing-file errors during development

## 0.1.21

### Changed

- `DocsToc`: merged `useActiveItem` and `useScrollProgress` into a single `useTocScrollState` hook; geometry is measured once and cached, rebuild only on resize; scroll updates batched via `requestAnimationFrame`; pure `measureTocGeometry` / `calculateTocScrollState` functions extracted; bailed-out re-render when state is unchanged
- `SearchDialog`: browse pages now accepted via explicit `browsePages` prop instead of fetched internally from `/api/pages` on mount; `PageItem` renamed to `SearchDialogBrowsePage` and exported; `groupedPages` derived with `useMemo` instead of `useState` + `useEffect`

### Fixed

- `tsup` config: corrected `onResolve` parameter type from `filter: RegExp` to `options: { filter: RegExp }` and narrowed `format` cast
- Search API: replaced `SortedResult` import with local generic `SearchResult` type in `rankResults`

## 0.1.20

### Changed

- `Badge`: now reads `UIVariant` context — smooth mode applies `shadow-sm`, playful mode applies rotation + offset box-shadow
- `Accordion`: falls back to `useUIVariant()` when no explicit `mode` prop is passed, fixing FAQ section always rendering in default mode regardless of global mode state

## 0.1.19

No user-facing changes.

## 0.1.18

No user-facing changes.

## 0.1.17

### Changed

- `IsometricPlane`: layered compositor optimisations — reduced per-frame work
- `AsciiText`: resolved colors now cached, dropping per-frame style recalculation

### Fixed

- `@keyframes` hoisted out of `@theme` inline block so production builds correctly emit animation definitions

## 0.1.15

### Added

- Isometric component showcase canvas on homepage with infinite plane, vignette, and varied grid
- `Chart`: `disabled` prop
- `Carousel`: `mode`, `size`, and `disabled` props; fixed playful nav button wrapper
- `Calendar`: `size`, `uiMode`, and `disabled` props with smooth and playful style variants
- `Breadcrumb`: `size` variant
- `Card`: propagates `mode` to child components via `UIVariantProvider`
- Mechanics category, Icons page, and ErrorPage in component docs

### Changed

- Package now published to [npmjs.com](https://npmjs.com) (previously GitHub Packages)
- Updated ecosystem package dependencies

### Fixed

- Responsive ASCII logo on homepage and mobile min-width scaling
- TOC active item scoped to first heading at top of viewport
- TOC scroll bleeding into page content; removed misplaced entry from mechanics sidebar

## 0.1.14

### Changed

- Republished `0.1.13` contents under a new version to recover from a failed publish workflow run. No source changes.

## 0.1.13

### Added

- `Enchanted` effect component for animated highlight states.
- Dedicated `animations.css` stylesheet, extracted out of `app.css`.
- Dev banner support in the `tsup` watcher (via `@olwiba/dx`).

### Changed

- Migrated dev banner rendering to `@olwiba/dx`.
- Docs sidebar collapsible header split into a chevron toggle and a navigable category name; sidebar width transitions are smoother.

### Fixed

- Docs `CollapsibleTrigger` decoupled from `Link` to prevent dual navigation when toggling categories.

## 0.1.12

### Added

- `StatusIndicator` primitive: generic dot indicator with `tone`, `size`, `pulse`, and optional `dotClassName` override. Renders a pulsing or static dot with an optional inline label via children. No product state or copy — pills, status labels, and brand colors remain downstream concerns.
- `StatusIndicator` registered in the shadcn registry at `cn.olwiba.com/r/status-indicator.json`.
- `StatusIndicator` docs page added to the component reference.

### Changed

- Package description updated to reflect the full ecosystem role.
- README rewritten to accurately document the export surface, consumption paths, and ecosystem position.
- Registry index and existing component registry metadata refreshed.

## 0.1.10

### Added

- Dev banner rendering now supports multi-step width fallbacks with optional `compactSegments`, so terminals that cannot fit full DOS Rebel output gracefully fall back to compact figlet or plain text.

### Changed

- Banner segment normalization now defaults missing segment colors to white, and rendering now uses segmented boundary coloring to keep mixed-color banners stable.
- DOS Rebel font rendering utilities were updated to support the responsive banner pipeline used by downstream docs and UI repos.

## 0.1.5

### Fixed

- Force clean rebuild to correct 0.1.4 compiled output — Card, Input, Textarea, Checkbox, Switch shipped stale `playful`/`smooth` boolean types instead of the `mode?: "playful" | "smooth"` API introduced in the source.

## 0.1.4

### Changed

- Card, Input, Textarea, Checkbox, Switch: replaced separate `playful`/`smooth` boolean props with a single `mode?: "playful" | "smooth"`, matching the Button pattern.
- Badge primitive simplified to a direct pass-through (no mode support).
- Breadcrumb component and demo updates.

## 0.1.3

### Fixed

- `AsciiText` now renders an immediate static frame and fades into the animated canvas after the first painted frame, removing the initial blank/flash on docs homepages.

## 0.1.2

### Added

- GitHub publish workflow (`.github/workflows/publish-package.yml`) to publish to GitHub Packages and attach `.tgz` package artifacts to workflow runs/releases.

### Fixed

- Package type declarations are now emitted (`tsup dts: true`) and published.
- Package metadata now explicitly exposes types (`types` + `exports["."].types`).

## 0.1.1

### Added

- Exported `AsciiText` component and `AsciiTextProps` type from the package barrel — interactive FIGlet ASCII art renderer with hover glow, click ripples, and accent coloring (font bundled inline)
- Exported `fireConfetti` and `ConfettiOptions` from the package barrel (`@olwiba/cn`), enabling consumers to trigger theme-aware confetti without installing `canvas-confetti` directly

## 0.1.0

### Added

- Hotkey component for platform-aware keyboard shortcuts
- useCopyToClipboard hook
- Mobile navigation with Sheet drawer on docs site
- Docs site component descriptions (all 24 placeholder descriptions replaced)

### Fixed

- Registry: added missing hotkey component
- Registry: sidebar dependencies now correctly list all 7 required peer components
- Registry: command dependencies now include hotkey
- Registry: button-group dependencies corrected (separator, not button)
- Button API reference converted to APIReference component for consistency
- Removed duplicate use-mobile.tsx hook file

## 0.0.2

### Fixed

- Updated `react-resizable-panels` imports to use v4 API (`Group` and `Separator` instead of deprecated `PanelGroup` and `PanelResizeHandle`)

## 0.0.1

### Added

- Initial release
- Custom shadcn/ui component primitives
- Documentation site with Fumadocs + TanStack Start
