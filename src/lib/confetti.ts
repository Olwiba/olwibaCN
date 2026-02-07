import confetti from "canvas-confetti";

/** Resolve a CSS variable to a color string canvas accepts (e.g. rgb). Theme vars can be oklch; not all contexts resolve them. */
function resolveCssColor(varName: string): string | null {
  if (typeof document === "undefined") return null;
  const el = document.createElement("div");
  el.style.cssText = `position:absolute;left:-9999px;width:1px;height:1px;background:var(${varName});`;
  document.body.appendChild(el);
  const resolved = getComputedStyle(el).backgroundColor;
  el.remove();
  if (!resolved || resolved === "rgba(0, 0, 0, 0)" || resolved === "transparent") return null;
  return resolved;
}

function getThemeColors(): string[] {
  if (typeof document === "undefined") return ["#a3a3a3"];
  const vars = ["--primary", "--primary-foreground", "--accent", "--accent-foreground"];
  const colors: string[] = [];
  for (const v of vars) {
    const c = resolveCssColor(v);
    if (c && !colors.includes(c)) colors.push(c);
  }
  return colors.length ? colors : ["#a3a3a3"];
}

export interface ConfettiOptions {
  /** When true, shoot from bottom center; when false, from bottom left and bottom right corners. Default false. */
  centered?: boolean;
  particleCount?: number;
  spread?: number;
  scalar?: number;
  ticks?: number;
  /** Override colors; default is theme primary (resolved from CSS variables). */
  colors?: string[];
}

/**
 * Fire confetti using the theme primary color. Shoots from bottom left and bottom right corners (or bottom center if centered). Non-blocking; safe to call repeatedly.
 */
/** Fire confetti; does not block. Call multiple times to stack. */
export function fireConfetti(options?: ConfettiOptions): void {
  const colors = options?.colors ?? getThemeColors();
  const particleCount = options?.particleCount ?? 120;
  const spread = options?.spread ?? 60;
  const scalar = options?.scalar ?? 1.2;
  const ticks = options?.ticks ?? 200;
  const startVelocity = 35;

  if (options?.centered) {
    confetti({
      particleCount,
      spread,
      origin: { x: 0.5, y: 1 },
      angle: 90,
      startVelocity,
      scalar,
      ticks,
      colors,
    });
    return;
  }

  // Bottom left corner
  confetti({
    particleCount: Math.floor(particleCount * 0.6),
    angle: 60,
    spread,
    origin: { x: 0, y: 1 },
    startVelocity,
    colors,
    scalar,
    ticks,
  });
  // Bottom right corner
  confetti({
    particleCount: Math.floor(particleCount * 0.6),
    angle: 120,
    spread,
    origin: { x: 1, y: 1 },
    startVelocity,
    colors,
    scalar,
    ticks,
  });
}
