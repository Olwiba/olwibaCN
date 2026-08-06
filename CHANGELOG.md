# Changelog









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
