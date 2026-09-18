# Changelog









## 0.1.58

### Added

- Make the no-preference default configurable

## 0.1.57

### Added

- Export FeedbackSidebarItem and make its copy props

## 0.1.56

### Added

- Own the toast trigger alongside the Toaster

### Changed

- Gate dev and build on dx dep-check

## 0.1.55

### Fixed

- The toast close button still sat above and outside the corner, roughly 8px up and to the left of the `0`/`0` that 0.1.54 gave it. Sonner's own button is meant to straddle the top-left edge of the card, and it gets there with `transform: var(--toast-close-button-transform)`, which resolves to `translate(-35%, -35%)` on `ltr`. Overriding `left`/`right`/`top` moves the box; it does not touch the transform, so the offset was reapplied after the move and dragged the button straight back out. Coordinates that read as flush therefore rendered as floating, and nothing in the rule looked wrong. The transform is now cancelled with `transform: none` rather than compensated for at the other end, since compensating would encode sonner's percentage into ours and break the moment either side changed.
- The button's corner curve was a pixel shy of the card's, leaving a hairline gap along the arc and nowhere on the straight edges. The two radii are measured from different edges: `--border-radius` describes the toast's outer edge, but an absolutely positioned child is laid out against the padding box, so `top`/`right: 0` puts the button on the inner edge of the `1px` border, where the same corner is one pixel tighter. Drawing the outer radius there made the button fall away from the corner faster than the card does. It now draws `calc(var(--border-radius) - 1px)`.
- The built registry item for `dialog` was two versions of the component behind, so installing it through the shadcn CLI got a `DialogContent` with no `showCloseButton`, the prop 0.1.42 added and this changelog has described as shipped since. The source was always correct; `registry:build` had simply not been rerun, and the gap is invisible from inside the repo because nothing here reads `public/r`. Regenerated. No source change.

### Changed

- Success and error toasts carry a colour. The accent shows at full strength on the icon and at a third on the border, while the card lands within a few percent of the page background and the text stays `--foreground`: enough to read as green or red at a glance, not enough to turn a toast into a banner. It is applied by retinting sonner's `--normal-bg`/`-border`/`-text` rather than by painting the card, because those three variables are what the rest of this stylesheet already reads — the action button inverts `--normal-text` against `--normal-bg`, the close button inherits the text colour — so retinting moves all of it together and a coloured toast keeps a legible action button without a rule per type. The variables are also restated as concrete `background`/`border-color`/`color`, since the `toastOptions` utilities tie with sonner's base rule on specificity and win on order, and the variables alone would have changed nothing visible. Error reads `--destructive` and so tracks whatever the consumer's theme sets. There is no `--success` in the shadcn token set and a registry item cannot ask consumers to add one, so a green is supplied through `var(--success, …)`, letting a project that has the token win: `oklch(0.55 0.14 152)` in light, and a hand-lightened `oklch(0.76 0.15 155)` in dark, which `--destructive` gets from the theme for free but a literal cannot. The card mix rises from 7% to 14% in dark mode, because mixing against near-black shifts less visibly than against near-white. Toasts passing `richColors` are left entirely to sonner: these rules outrank it but bow out of a toast that has it, since opting in to `richColors` should not land you in a third thing that is neither.
- In `smooth` mode the close button is an inset circle rather than a corner-hugging square. The corner shape is a default-mode idea that does not survive a `1.5rem` radius: at `8px` the button's own curve is a small correction to a mostly square corner, but at `24px` the corner is deeper than the button is wide, so the shape degenerates into a bare quarter-circle whose two straight edges cut across the card's curve. Rounder cards want the opposite — pull the button off the edge and let it be round. The inset is derived rather than picked: a rounded corner is an arc centred `--border-radius` in from both edges, so placing the button's centre on that same point makes the two concentric and holds the gap even the whole way round instead of pinching at the diagonal, which gives `calc(var(--border-radius) - 0.75rem - 1px)` once the button reaches half its own width back and the padding-box border is accounted for. The right padding is re-reserved at `calc(var(--border-radius) + 1.25rem)` so content still stops short of the button now that it has moved inward, and both track `--border-radius`, so retuning the smooth radius keeps them true.
- devDependency bump: `@olwiba/docs` 0.1.52 → 0.1.53. Docs-site only; it does not reach `dist` or a consumer.

## 0.1.54

### Changed

- The toast close button sits flush in the corner at `0`/`0` rather than inset by `0.375rem`, and its top-right corner now takes the same `--border-radius` sonner gives the card instead of approximating it at `0.375rem`. The inset looked deliberate in isolation and wrong in place: the button read as floating in the toast's padding rather than occupying the corner, and the gap looked uneven, because the card's radius pulls the edge away diagonally and equal top and right offsets therefore do not produce an equal-looking margin. Flush, with the card's own radius, the hover fill ends exactly where the card ends and the two curves read as one line. The other three corners stay square, since they meet content rather than an edge. The button is also `1.5rem` rather than `1.25rem`: at the smaller size the icon sat visibly off-centre once the button was in the corner rather than inset.
- The docs site is off pure white. Its light theme was `oklch(1 0 0)`, the same polarising white the products moved away from after an accessibility pass. That work was packaged into this package's preset, so anything importing it got the off-white for free, but the docs site predates the preset and carries its own hand-rolled neutral block, so it never received any of it, and products that read well sat beside docs that glared. The neutrals now match the preset exactly, with the muted and line steps adjusted to sit against the new base rather than against white, and the brand tint comes too, gated behind `@supports (color: oklch(from white l c h))` so a browser without relative colour syntax keeps the plain off-white rather than falling through to a transparent page. The tinted block is scoped `:root:not(.dark)`, not `:root`: `.dark` is a class and `:root` a pseudo-class, so they carry the same specificity, and a plain `:root` block imported later would win on source order and repaint dark mode with the light values. Values are copied rather than imported from the preset; importing it alongside the fumadocs presets the site already pulls in is the better answer and wants a build to verify. Docs-site only; `src/styles/app-theme.css` does not reach `dist` or a consumer.
- The isometric previews on the docs home page use the dark captures in both themes. They followed the page theme, which sounds right and is not: the plane sits directly on the page background, so in light mode a light screenshot is a pale rectangle on a pale surface and the component inside it all but disappears, leaving the plane reading as half empty. The dark captures carry their own contrast and read as objects on the plane whichever way the page is set, which is what the Pro site already does. Both variants were already on disk, so nothing was recaptured, and the theme-observer hook goes with the selection that needed it. Docs-site only.
- devDependency bump: `@olwiba/dx` 0.0.34 → 0.0.35. Docs-site only; it does not reach `dist` or a consumer.

## 0.1.53

### Fixed

- `closeButton` on `Toaster` never reached sonner, so 0.1.52's new default of `true` turned the close button off everywhere instead of on, including the docs site that was meant to gain one. The prop was destructured to give it a default and then not passed back on, which took it out of `...props` without putting it anywhere else: the one route that could have supplied it had stopped doing so, and sonner fell back to its own default of `false`. It is now forwarded explicitly.
- The toast action button was invisible. The rule filled it with `color-mix(in oklab, currentColor 90%, transparent)` while setting `color: var(--normal-bg)` on the same element, and `currentColor` resolves to the element's own colour, so the fill and the text both computed to the toast background: a dark button with dark text on a dark toast, impossible to see or to aim at. The fill now names `var(--normal-text)` directly, which keeps the contrast pair explicit and still tracks a `richColors` toast, since sonner sets both variables per type. Hovering mixes the fill back towards the toast background rather than relying on inheritance.
- The action button also never moved to the second row 0.1.52 claimed for it, and stayed inline at the end of the first. Forcing the wrap with `flex: 0 0 100%` and clamping the width back with `max-width: max-content` cannot work together, because flex line-breaking measures the item after `max-width` is applied, so the button stayed narrow and therefore stayed on the line.

### Changed

- The toast is laid out with grid rather than sonner's flex row. Three things have to hold at once: the icon keeps its own column, it sits at the top of that column rather than centred against the whole card, and the action takes a row of its own beneath the text at its label width. Grid states those placements instead of coaxing them out of flex, where the third could not be had without disturbing the first. A toast with no icon gives column one back to the text, so nothing starts behind an empty gutter. Visual behaviour is unchanged for anyone who was already getting what 0.1.52 described.

## 0.1.52

### Fixed

- The toast icon sat in the vertical centre of the card. sonner centres every child, which is right for a one-line toast and steadily worse as the toast grows: with a title, a description and an action the icon drifts to the middle of a three-line block and stops reading as the marker for the line it belongs to. Toasts have no height limit, so the taller they get the further off it sits. The toast is now top-aligned, with the icon nudged down `0.0625rem` so it centres optically against the title's first line rather than against its box.
- The action button was inline at the end of sonner's flex row, which on a toast with a description squeezed it against the right edge and left it competing with the close button for the same corner. It now takes its own row under the text: `flex: 0 0 100%` forces the wrap and `max-width: max-content` pulls it back to its label width so it does not stretch into a full-width bar. On a toast with an icon it is indented by the icon's box plus the column gap, so the left edges of title, description and action agree.

### Changed

- `closeButton` on `Toaster` now defaults to `true`. The apps passed it and the docs site did not, so the same component looked like two different components depending on where you met it. A toast carrying an action is also one you may want to dismiss without taking it, and waiting out the timer is not a dismissal. Pass `closeButton={false}` to get the old behaviour back.
- The close button is tucked further into the corner, `0.375rem` from the top and right rather than `0.5rem`, and its top-right corner is rounded harder than the other three so the hover fill nests inside the card's own curve instead of overhanging it.

## 0.1.51

### Added

- `PasswordInput`, a password field with a reveal toggle. Typing a password blind is why people paste from a password manager into a plain text field first to check it, or give up and reset an account they already had. A password field is a place someone can be silently wrong about what they typed. The fix has been standard for years, but only if it is shipped once: left to each form, half of them get it and half do not, which is what was happening here. It wraps `Input` rather than reimplementing the field, so mode variants, invalid styling and the playful backing all keep working, and the extra right padding lives on `PasswordInput` instead of `inputBase` because it exists only to make room for the button. The toggle is a real `button` carrying `aria-pressed` and a label that says what pressing it will do rather than what it currently is, but it sits at `tabIndex={-1}`: it has to be reachable by pointer and by screen reader, and putting it in the tab order drops an obstacle into the most common path through a login form, field to submit. The field is never `type="text"` at rest: revealing is transient state that resets on remount, so a revealed password cannot survive a navigation back to the form. `hideToggle` keeps the field a password input and drops the reveal control entirely, for the rare case where offering to show the value is wrong regardless of who is asking: a shared terminal, a kiosk, a recorded screen share.

### Fixed

- The toast close button rendered at the top left of the toast, half outside the card, for every consumer, not only in the docs site where it was noticed. `Toaster` tried to move it by overriding sonner's `--toast-close-button-start`/`-end` variables on `[data-sonner-toaster]`, one attribute selector. Sonner declares them on `[data-sonner-toaster][dir='ltr']`, two, so sonner won every time: the variables never changed, the underlying `left: 0` stood, and nothing about the override looked wrong in the file. The rule was simply never in effect. The position is now set directly as `left: unset; right: 0.5rem; top: 0.5rem` on the rule that already styles the button, whose selector carries the extra ancestor needed to outrank sonner's own. Simpler, and no longer dependent on variables declared somewhere we do not control.

### Changed

- devDependency bump: `@olwiba/docs` 0.1.51 → 0.1.52. Docs-site only; it does not reach `dist` or a consumer.

## 0.1.50

### Added

- `useResolvedTheme`, a hook reporting the theme actually in effect. It reads the `dark` class on `<html>`, which is what `ThemeScript` and the theme switches write, rather than `prefers-color-scheme`, which nothing in this design system sets. For content that needs the theme as a value instead of a `dark:` variant: raster assets requested in a light or dark flavour, canvas fills, embed parameters.
- `authSlot` on `DocsHeader`, pinned immediately before the optional theme toggle, so the account action holds one position regardless of sign-in state or viewport. It becomes the rightmost control when `showModeSwitcher` is off.

## 0.1.49

No user-facing changes.

## 0.1.48

No user-facing changes.

## 0.1.47

No user-facing changes.

## 0.1.46

### Added

- Put the version pill beside the credit line

### Changed

- Update

## 0.1.45

### Added

- Put the version pill beside the credit line

## 0.1.44

No packaged changes — nothing under the two entry points that build into `dist` (`src/components/ui`, `src/email`) moved, and the two published stylesheets are untouched. This release is the docs-site layout and the example environment file.

### Fixed

- The docs layout wrapper carried `lg:px-2` on top of the sidebar's own `px-2`, so sidebar text sat 16px from the layout edge and 8px from the rail on its other side. Nothing was broken — the two paddings simply did not know about each other, and the result read as a lopsided gutter at every width above `lg`. The outer padding is gone: the page's dashed rails already provide the outer breathing room, and the sidebar keeps the one gutter it actually owns

### Changed

- `.env.example` documents `VITE_GA_MEASUREMENT_ID`. Unset is the supported default — nothing loads, no request reaches Google, and there is no consent question to answer — which is the reason to write it down rather than leave it as a variable someone discovers in the source and has to guess the shape of. A measurement ID is public by design, so it ships in the page and authorises nothing. The note also records the deployment trap: it is a `VITE_` build argument, baked in when the image is built, so setting it on a running container does nothing until the image is rebuilt. In Coolify that means marking it as a build variable and redeploying, not restarting
- devDependency bump: `@olwiba/dx` 0.0.30 → 0.0.31. Build and lint tooling only; it is not a runtime dependency and nothing about it reaches a consumer

## 0.1.43

No user-facing changes.

## 0.1.42

### Added

- `showCloseButton` on `DialogContent`, defaulting to `true`. The corner close control rendered unconditionally, so a dialog that already ends in an obvious way out — a confirm button, the last step of a flow — carried two exits and no way to drop one. Escape and clicking the overlay still close the dialog whichever way this is set, so turning the corner button off costs no accessibility. It is a composition escape hatch rather than a licence to ship a dialog with no way out: leave it on for anything a reader might want out of quickly, and turn it off only where the second control genuinely competes with the one they are meant to press. `AlertDialog` is untouched — it has never rendered a corner close, because the point of it is that you answer the question

### Changed

- devDependency bumps: `@olwiba/docs` 0.1.46 → 0.1.47, `@olwiba/dx` 0.0.28 → 0.0.30. Docs-site and tooling only; neither reaches `dist` or a consumer

## 0.1.41

No packaged changes — `dist` and the two published stylesheets are byte-identical to 0.1.40. Three surfaces move here: the docs-site chrome (header, footer, search), the shadcn registry published at `/r`, and the server.

### Added

- `versions` on `DocsFooter`, rendering each released version as a pill linking to its changelog, plus the `VersionPill` component and `DocsFooterVersion` type behind it. A pill carries a bare semver — the `v` is added at render — with an optional `label` for sites shipping more than one package and an `accent` of `pro`, which borrows the primary colour so two pills can be told apart without reading them. This replaces the `changelog.md` text link, which said the same thing in more words and left the one fact a visitor actually wants — which version is out — somewhere else entirely. Setting `versions` ignores `changelogUrl`; the pills take over from the text link rather than sitting beside it, and `changelogUrl` on its own still works for sites that have not moved. Unlike the links, pills stay visible at every width: they are the shortest thing in the footer and the only part of it that changes, so collapsing them into the overflow menu would hide the one thing worth glancing at
- `number-input` in the published registry, along with the `glass` button mode on `button` and `ui-variant-context`. Both were committed in source and never regenerated into `public/r`, so the registry a consumer installs from had been serving the previous generation of those files

### Fixed

- `SearchButton` was `w-full max-w-[75%]` at every width, so on a 390px screen search claimed three quarters of the header row and left the wordmark crushed to a four-pixel sliver beside it. Nothing overflowed — the row simply gave all its space to the widest thing in it. Below `md` it is now a square icon button, the header gutter drops from `px-4` to `px-3`, and the wordmark steps down to `text-base` under `sm` rather than truncating mid-word. The ⌘K hint moves with the field to `md`, since a phone has no ⌘K to offer
- The footer's overflow menu rendered whenever the footer had anything on its right side, so a site with version pills and no links got a menu button that opened an empty menu. It now renders only when there are links or a changelog URL to put in it

### Changed

- `rightSlot` renders after the overflow button instead of before it. The theme switcher is pinned to the end of the header row, so anything a site keeps in the bar — a second switcher, most obviously — belongs beside it rather than stranded on the far side of a menu button. The overflow trigger also drops from `size-9` to `size-8`, matching the other controls in the row
- `server.ts` uses `createServer()` from `@olwiba/docs/server` instead of a hand-rolled Hono server. olwibaCN was the last site still running its own; `@olwiba/docs` was extracted from this repository, so the duplication was history rather than a decision, and it meant a server fix had to be made twice. `createServer()` is a superset of what was here — the same static-then-SSR routing, plus a cached SSR handler instead of a dynamic import per request, paths resolved against `process.cwd()` rather than relatively, and a bound fetch. The implied dependency cycle is nominal: `@olwiba/docs` peer-depends on `@olwiba/cn`, but the `/server` subpath imports only `hono` and `node:path`, and it is a devDependency besides — `files` is dist-only, so nothing reaches consumers

## 0.1.40

### Added

- Let the header collapse and the prop table explain itself

### Changed

- Pin @olwiba/dx 0.0.28 for env:check
- Add env:check

## 0.1.39

No packaged changes — `dist` and the two published stylesheets are byte-identical to 0.1.38. Everything below is docs-site surface: the sidebar, the API reference, the demo harness, and the animation sync source.

### Added

- `SidebarItemDecoration`, handed to `DocsSidebar` through `DocsLayout`'s new `itemDecoration` prop. Four optional per-page callbacks — `suffix` for a node rendered after the label, `enchanted` for the glint treatment, `muted` for rows the visitor cannot fully read yet, and `label` for screen-reader-only text describing the row's state. Deliberately generic: a docs site may want to mark rows paid, new or deprecated, and the sidebar has no business knowing which — it renders what it is given. `label` is the part that isn't optional in practice, because colour and motion must never carry the state on their own
- `locked` on `APIReference`, which renders the closed control with a lock, a `title` explaining why it will not open, and no contents. This is presentation for a decision made on the server, not the decision itself: it is safe only because the panel is closed by default and its body is conditionally rendered, so a locked control and a full one are identical in the DOM. Callers must omit `props` entirely — passing them alongside `locked` puts the data in the page for anyone to read. The control carries `aria-disabled` rather than `disabled`, matching `DocsHeader`'s locked GitHub control; a disabled button stops emitting pointer events, so the title explaining the lock would never appear
- `src/docs/components/demo-controls.tsx`, holding `DemoControls`, `LiveUsageCode` and `useUsageCode`. They lived in `ComponentPreview`, which also holds a registry of one site's demos and is necessarily site-local, while these three are generic and every published demo imports them — so a demo rendered by another site had to carry a consumer-local alias to a file that site does not have. `ComponentPreview` re-exports all three, so existing imports keep working
- `data-slot="sandbox-preview"` on the sandbox's iframe wrapper, giving preview capture a stable target. The demo itself lives in an iframe, which a selector cannot reach into; screenshotting the wrapper captures what the frame is displaying

### Fixed

- `ActiveThemeProvider` returned early whenever `initialTheme` was set, so any site declaring an application default could never restore a visitor's saved choice — the theme silently reset on every navigation. `initialTheme` is the application's default, not an override: precedence is the default first, then whatever the visitor picked
- Under `prefers-reduced-motion: reduce`, `.animate-enchanted` is now hidden. The reduced-motion block previously only paused `[data-iso-scroll]`, so glints kept animating at full strength for the visitors who asked them not to. They are hidden rather than paused because the keyframes drive opacity and scale, so a paused glint freezes wherever it happened to be — some invisible, some mid-pop — which reads as a rendering fault rather than a decoration. Hiding costs nothing: wherever the effect marks something, a label carries the meaning and the glint is decoration on top. `animations.css` is the sync source for `cn-animations.css`, so this reaches consumers on their next sync rather than through `dist`

### Changed

- A decorated sidebar row keeps its glint while it is the current page, instead of having to be pointed at. Everywhere else the effect stays hover-only, so a long list of decorated rows does not all animate at once. This is also why the reduced-motion fix above matters more than it used to: the effect can now run persistently rather than only under a cursor

## 0.1.38

No user-facing changes.

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
