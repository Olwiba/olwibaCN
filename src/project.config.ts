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
    hex: "#06b6d4",
    lightOklch: "oklch(0.609 0.126 221.723)",
    darkOklch: "oklch(0.789 0.154 211.530)",
  },
  theme: {
    defaultName: "cyan",
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
