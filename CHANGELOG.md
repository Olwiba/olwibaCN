# Changelog

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
