# Changelog

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

