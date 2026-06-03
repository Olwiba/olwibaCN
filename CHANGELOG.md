# Changelog





## 0.1.19

### Changed

- No notable changes.

## 0.1.18

### Changed

- No notable changes.

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

