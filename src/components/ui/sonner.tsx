"use client"

import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import * as React from "react"
import { Toaster as Sonner } from "sonner"
import { cn } from "@/lib/utils"
import { useUIVariant } from "@/components/ui/ui-variant-context"

type ToasterProps = React.ComponentProps<typeof Sonner>
type ToasterMode = "playful" | "smooth"

/**
 * Reads the theme off the document rather than a provider.
 *
 * This used to call next-themes' `useTheme()`, which only works in an app that
 * mounts its ThemeProvider — anywhere else the hook returns undefined, the
 * value fell back to "system", and sonner then followed the *OS* colour scheme
 * instead of the app's. A dark app on a light machine got a light toast.
 *
 * The class on `<html>` is the one thing every setup agrees on, next-themes
 * included, so watching it works for all of them.
 */
function useDocumentTheme(): "light" | "dark" {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const root = document.documentElement
    const read = () =>
      setTheme(
        root.classList.contains("dark") || root.dataset.theme === "dark"
          ? "dark"
          : "light",
      )

    read()
    const observer = new MutationObserver(read)
    observer.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] })
    return () => observer.disconnect()
  }, [])

  return theme
}

/**
 * sonner's own default is 4 seconds, which user testing found is roughly the
 * time it takes to *notice* a toast — people reported them vanishing as they
 * looked over. Anything carrying an action ("View my monitors") also has to be
 * read and then acted on, which 4s does not allow.
 *
 * A default rather than a fixed value: `duration` is still a prop, and an
 * individual toast can override it at the call site.
 */
const DEFAULT_TOAST_DURATION = 6000

const Toaster = ({
  mode: modeProp,
  className,
  style,
  duration = DEFAULT_TOAST_DURATION,
  // On by default, because the alternative was every consumer deciding
  // separately: the apps passed `closeButton`, the docs site did not, and the
  // same component then looked like two different components depending on where
  // you met it. A toast carrying an action is also one you may want to dismiss
  // without taking it, and waiting out the timer is not a dismissal.
  closeButton = true,
  ...props
}: ToasterProps & { mode?: ToasterMode }) => {
  const theme = useDocumentTheme()
  // Not `modeProp ?? useUIVariant()` — `??` short-circuits, so passing an
  // explicit mode skipped the hook call and changed the hook order between
  // renders.
  const ctxVariant = useUIVariant()
  const mode = modeProp ?? ctxVariant

  return (
    <>
      {/*
        sonner ships the close button top-LEFT, straddling the toast's edge
        (`--toast-close-button-start: 0` with a -35%/-35% transform), sized
        20px with a border, and coloured from its own `--gray*` scale rather
        than the theme. Every one of those is overridden here: moved to the
        top-right, tucked fully inside, and restyled as a ghost button on
        theme tokens so it follows light/dark like everything else.

        The extra `[data-sonner-toaster]` ancestor is load-bearing — it takes
        the selector past the specificity of sonner's own rules, including its
        `[data-sonner-theme='dark']` variants, so this doesn't depend on
        stylesheet order.
      */}
      <style>{`
        [data-sonner-toaster] [data-sonner-toast][data-styled='true'] [data-close-button] {
          /* Positioned here rather than through sonner's own
             --toast-close-button-start/end variables, which is what this used
             to do and why the button still rendered top-left, half outside the
             card, on every consumer.

             sonner declares those variables on \`[data-sonner-toaster][dir='ltr']\`
             — two attribute selectors — and the override sat on
             \`[data-sonner-toaster]\`, which is one. Sonner won every time, so
             the variables never changed and \`left: 0\` stood. Nothing about it
             looked wrong in this file; the rule was simply never in effect.

             This selector already carries the extra ancestor needed to outrank
             sonner's own \`[data-sonner-toast][data-styled='true'] [data-close-button]\`,
             so setting the properties directly is both simpler and no longer
             dependent on variables whose declaration site we do not control. */
          left: unset;
          right: 0;
          top: 0;
          height: 1.5rem;
          width: 1.5rem;
          padding: 0;
          border: none;
          /* Flush into the corner, with the top-right corner following the
             toast's own curve rather than approximating it.

             An inset looked deliberate in isolation and wrong in place: the
             button read as floating in the padding instead of occupying the
             corner, and the gap was uneven because the toast's radius pulls the
             card edge away diagonally. Sitting at 0/0 with the same
             --border-radius sonner gives the card, the hover fill ends exactly
             where the card ends and the two curves are one line. The remaining
             corners stay square, since they meet content rather than an edge. */
          border-radius: 0;
          border-top-right-radius: var(--border-radius);
          background: transparent;
          /* Inherited rather than a fixed token: on a richColors toast the
             text is already the only colour guaranteed to read against that
             background, so borrowing it keeps the button legible on every
             variant without a rule per type. */
          color: inherit;
          opacity: 0.6;
          transition: opacity 150ms ease, background-color 150ms ease;
        }
        [data-sonner-toaster] [data-sonner-toast][data-styled='true'] [data-close-button] svg {
          height: 0.75rem;
          width: 0.75rem;
        }
        /* Reserve the corner the close button now occupies.
           sonner's own button straddles the toast's edge (a -35%/-35%
           transform), so it can never touch the content. Moving it inside gave
           it a neater home and took that guarantee away with it: on a toast
           whose title runs the width of the card, the cross landed on the
           text. Padding is the other half of that decision. */
        [data-sonner-toaster] [data-sonner-toast][data-styled='true']:has([data-close-button]) {
          padding-right: 2rem;
        }
        /* Type scale. sonner renders title and description at the same weight
           and size, so a one-line toast reads as a sentence rather than a
           result — which is most of why these looked unfinished next to the
           richer notify() ones. */
        [data-sonner-toaster] [data-sonner-toast][data-styled='true'] [data-title] {
          font-weight: 500;
          line-height: 1.35;
        }
        [data-sonner-toaster] [data-sonner-toast][data-styled='true'] [data-description] {
          margin-top: 0.185rem;
          font-size: 0.8125rem;
          line-height: 1.45;
          opacity: 0.75;
        }
        /* Grid rather than sonner's flex row.
           Three things have to hold at once: the icon keeps its own column to
           the left of the text, it sits at the top of that column rather than
           centred, and the action takes a second row beneath the text instead of
           running inline at the end of the first.

           sonner centres every child, which is right for a one-line toast and
           steadily worse as it grows: with a title, a description and an action
           the icon drifts to the middle of a three-line block and stops reading
           as the marker for the line it belongs to. Toasts have no height limit,
           so that only gets worse the taller they are.

           Flex could not express the third without disturbing the first.
           Forcing a wrap with flex-basis: 100% and then clamping the width back
           with max-content does nothing, because flex line-breaking measures the
           item *after* max-width is applied: the button stayed narrow and stayed
           inline. Stating the placement is shorter than coaxing it. */
        [data-sonner-toaster] [data-sonner-toast][data-styled='true'] {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          align-items: start;
          column-gap: 6px;
          row-gap: 0.5rem;
        }
        [data-sonner-toaster] [data-sonner-toast][data-styled='true'] [data-icon] {
          grid-column: 1;
          grid-row: 1;
          /* Optical centring against the title's first line, not its box. */
          margin-top: 0.0625rem;
        }
        [data-sonner-toaster] [data-sonner-toast][data-styled='true'] [data-content] {
          grid-column: 2;
          grid-row: 1;
          min-width: 0;
        }
        /* A toast with no icon has nothing in column one, which collapses to
           zero width, so the text still starts at the padding edge. */
        [data-sonner-toaster] [data-sonner-toast][data-styled='true']:not(:has([data-icon])) [data-content] {
          grid-column: 1 / -1;
        }
        /* Buttons inherit the toast's own colour rather than the global
           primary, so an action on a richColors error still reads against red
           instead of disappearing into it. */
        [data-sonner-toaster] [data-sonner-toast][data-styled='true'] [data-button] {
          height: 1.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 500;
        }
        /* Second row, under the text and sharing its left edge.
           justify-self: start keeps it at its label width instead of
           stretching across the column, which a grid item otherwise does. */
        [data-sonner-toaster] [data-sonner-toast][data-styled='true'] [data-action] {
          grid-column: 2;
          grid-row: 2;
          justify-self: start;
          margin: 0;
        }
        [data-sonner-toaster] [data-sonner-toast][data-styled='true']:not(:has([data-icon])) [data-action] {
          grid-column: 1 / -1;
        }
        /* Inverted against the toast: its text colour becomes the fill.
           This used to read color-mix(in oklab, currentColor 90%, transparent)
           for the background while the same rule set color: var(--normal-bg).
           currentColor resolves to the element's own colour, so both ended up
           as the toast background: a dark button with dark text on a dark
           toast, invisible and impossible to aim at. Naming the token instead of
           reaching for currentColor keeps the contrast pair explicit, and still
           tracks a richColors toast, since sonner sets both variables per type. */
        [data-sonner-toaster] [data-sonner-toast][data-styled='true'] [data-action] {
          background: var(--normal-text);
          color: var(--normal-bg);
        }
        [data-sonner-toaster] [data-sonner-toast][data-styled='true'] [data-action]:hover {
          background: color-mix(in oklab, var(--normal-text) 88%, var(--normal-bg));
        }
        [data-sonner-toaster] [data-sonner-toast][data-styled='true'] [data-cancel] {
          background: color-mix(in oklab, currentColor 10%, transparent);
          color: inherit;
        }
        [data-sonner-toaster] [data-sonner-toast][data-styled='true']:hover [data-close-button]:hover {
          background: color-mix(in oklab, currentColor 12%, transparent);
          border-color: transparent;
          color: inherit;
          opacity: 1;
        }
      `}</style>
      {mode === "smooth" && (
        <style>{`[data-sonner-toaster].toaster-smooth { --border-radius: 1.5rem; }`}</style>
      )}
      {mode === "playful" && (
        <style>{`
          [data-sonner-toaster].toaster-playful [data-sonner-toast][data-mounted=true] {
            transform: var(--y) rotate(0.3deg);
            filter: drop-shadow(4px 4px 0 var(--border));
          }
          [data-sonner-toaster].toaster-playful [data-sonner-toast][data-mounted=true]:nth-child(even) {
            transform: var(--y) rotate(-0.3deg);
          }
        `}</style>
      )}
      <Sonner
        theme={theme as ToasterProps["theme"]}
        duration={duration}
        // Forwarded explicitly because it is destructured above to give it a
        // default. Taking it out of `...props` without passing it back on meant
        // sonner never received it at all and fell back to its own default of
        // false, so defaulting it to true here turned the close button off
        // everywhere instead of on: the props object no longer carried it, and
        // the one place that could have supplied it had stopped doing so.
        closeButton={closeButton}
        className={cn("toaster group", mode && `toaster-${mode}`, className)}
        style={{ zIndex: 9999999, ...style }}
        icons={{
          success: <CircleCheck className="h-4 w-4" />,
          info: <Info className="h-4 w-4" />,
          warning: <TriangleAlert className="h-4 w-4" />,
          error: <OctagonX className="h-4 w-4" />,
          loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
        }}
        toastOptions={{
          classNames: {
            toast: cn(
              "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            ),
            description: "group-[.toast]:text-muted-foreground",
            actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          },
        }}
        {...props}
      />
    </>
  )
}

export { Toaster }
