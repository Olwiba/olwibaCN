import * as React from "react"

export type UIVariant = "playful" | "smooth" | "glass" | undefined

const UIVariantContext = React.createContext<UIVariant>(undefined)

/**
 * Sets a global default UI variant for all olwibaCN primitives in the tree.
 * Individual components can still override with an explicit `mode` prop.
 */
export function UIVariantProvider({
  mode,
  children,
}: {
  mode: UIVariant
  children: React.ReactNode
}) {
  return (
    <UIVariantContext.Provider value={mode}>
      {children}
    </UIVariantContext.Provider>
  )
}

export function useUIVariant(): UIVariant {
  return React.useContext(UIVariantContext)
}
