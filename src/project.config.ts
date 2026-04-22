type ProjectThemeConfig = {
  id: string
  label: string
  brandAccent: {
    hex: string
    lightOklch: string
    darkOklch: string
  }
  theme: {
    defaultName: string
  }
  banner: {
    segments: readonly {
      text: string
      accent?: boolean
      colorHex?: string
    }[]
  }
}

export const projectConfig = {
  id: "olwibaCN",
  label: "olwibaCN",
  brandAccent: {
    hex: "#10b981",
    lightOklch: "oklch(0.596 0.145 163.225)",
    darkOklch: "oklch(0.765 0.177 163.223)",
  },
  theme: {
    defaultName: "emerald",
  },
  banner: {
    segments: [
      { text: "olwiba" },
      { text: "CN", accent: true },
    ],
  },
} as const satisfies ProjectThemeConfig

export const projectThemeStyleVars = {
  "--project-brand-accent": projectConfig.brandAccent.lightOklch,
  "--project-brand-accent-dark": projectConfig.brandAccent.darkOklch,
} as const

export const projectBanner: {
  segments: {
    text: string
    colorHex?: string
  }[]
} = {
  segments: projectConfig.banner.segments.map((segment) => {
    let colorHex: string | undefined

    if ("accent" in segment && segment.accent) {
      colorHex = projectConfig.brandAccent.hex
    } else if ("colorHex" in segment && typeof segment.colorHex === "string") {
      colorHex = segment.colorHex
    }

    return {
      text: segment.text,
      colorHex,
    }
  }),
}
