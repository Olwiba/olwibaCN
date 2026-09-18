"use client"

import * as React from "react"
import { toast } from "sonner"

export interface NotifyAction {
  label: string
  onClick: () => void
}

export type NotifyVariant = "success" | "info" | "warning" | "error" | "message"

export interface NotifyOptions {
  variant?: NotifyVariant
  title: string
  description?: string
  /** Avatar image, replacing the variant icon (e.g. a message from a person). */
  avatar?: string
  /** Primary action (e.g. "Undo"). */
  action?: NotifyAction
  /** Secondary action, rendered beside the primary one (e.g. "Decline"). */
  secondaryAction?: NotifyAction
  /** Overrides the per-variant default below. */
  duration?: number
}

/**
 * How long a toast stays when the caller has not said.
 *
 * A failure has to be *read* — often it is the only account of what went
 * wrong, and a message that vanishes before it is understood is barely better
 * than none. A toast carrying an action has to be read *and* decided on, and a
 * button that disappears mid-reach is worse than no button, because the reader
 * knows they missed something.
 *
 * Returning undefined defers to the Toaster, so a product that set its own
 * default keeps it rather than being silently overridden here.
 */
function defaultDuration(variant: NotifyVariant | undefined, hasAction: boolean) {
  if (variant === "error") return 10_000
  if (variant === "warning") return 8_000
  if (hasAction) return 8_000
  return undefined
}

/**
 * Fire a toast. Requires `<Toaster />` from this package mounted once.
 *
 * Deliberately built on sonner's *native* toast rather than `toast.custom`.
 * That is the whole point of this function existing here.
 *
 * sonner marks a toast `data-styled="false"` whenever it carries its own JSX
 * (`"data-styled": !Boolean(toast.jsx || toast.unstyled || unstyled)`), and
 * every rule the Toaster in this package ships — the grid layout, the type
 * scale, the close button, the success/error tinting, the action button
 * inversion, the smooth and playful modes — is scoped to
 * `[data-sonner-toast][data-styled='true']`. So a toast that brings its own
 * markup opts out of the entire design system and lands looking like a
 * different product's toast.
 *
 * That is exactly what happened: a parallel `notify()` in @olwiba/ui rendered
 * through `toast.custom`, and after the Toaster here was reworked the two no
 * longer resembled each other. One trigger, one renderer, one set of styles.
 *
 * Every feature of that richer component survives the move. `avatar` maps onto
 * sonner's `icon` slot, and `secondaryAction` onto `cancel`, so nothing has to
 * fall back to custom markup.
 */
export function notify({
  variant = "info",
  title,
  description,
  avatar,
  action,
  secondaryAction,
  duration,
}: NotifyOptions) {
  // "message" is ours, not sonner's — it maps to the plain toast, which is the
  // neutral one.
  const fire = variant === "message" ? toast : toast[variant]

  return fire(title, {
    description,
    duration: duration ?? defaultDuration(variant, Boolean(action || secondaryAction)),
    // An avatar replaces the icon rather than sitting beside it: the toast has
    // one icon column, and a message from a person is identified by the person,
    // not by the fact that it is a message.
    icon: avatar ? (
      <img
        src={avatar}
        alt=""
        className="size-5 shrink-0 rounded-full object-cover"
      />
    ) : undefined,
    action: action ? { label: action.label, onClick: action.onClick } : undefined,
    cancel: secondaryAction
      ? { label: secondaryAction.label, onClick: secondaryAction.onClick }
      : undefined,
  })
}

/** Dismiss a toast by id, or all of them when called with nothing. */
export function dismissNotification(id?: string | number) {
  toast.dismiss(id)
}
