import confetti from "canvas-confetti";

/**
 * Read theme colors from CSS variables in JS.
 * Use the element that has the theme (e.g. documentElement for :root vars).
 */
export function getThemeColorsFromCSS(element?: HTMLElement): string[] {
  if (typeof document === "undefined") return [];
  const el = element ?? document.documentElement;
  const style = getComputedStyle(el);
  const primary = style.getPropertyValue("--primary").trim();
  const primaryFg = style.getPropertyValue("--primary-foreground").trim();
  const out: string[] = [];
  if (primary) out.push(primary);
  if (primaryFg && primaryFg !== primary) out.push(primaryFg);
  return out;
}


/** oklch(L C H) → #rrggbb in one step. canvas-confetti expects HEX. */
function oklchToHex(color: string): string | null {
  const m = color.trim().match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/);
  if (!m) return null;
  const L = Number(m[1]);
  const C = Number(m[2]);
  const H = (Number(m[3]) * Math.PI) / 180;
  const aLab = C * Math.cos(H);
  const bLab = C * Math.sin(H);
  const mul = (A: number[], B: number[]) => [
    A[0] * B[0] + A[1] * B[1] + A[2] * B[2],
    A[3] * B[0] + A[4] * B[1] + A[5] * B[2],
    A[6] * B[0] + A[7] * B[1] + A[8] * B[2],
  ];
  const lmsG = mul(
    [1, 0.3963377773761749, 0.2158037573099136, 1, -0.1055613458156586, -0.0638541728258133, 1, -0.0894841775298119, -1.2914855480194092],
    [L, aLab, bLab]
  );
  const lms = lmsG.map((x) => x ** 3);
  const xyz = mul(
    [1.2268798758459243, -0.5578149944602171, 0.2813910456659647, -0.0405757452148008, 1.112286803280317, -0.0717110580655164, -0.0763729366746601, -0.4214933324022432, 1.5869240198367816],
    lms
  );
  const rgbL = mul(
    [3.2409699419045226, -1.537383177570094, -0.4986107602930034, -0.9692436362808796, 1.8759675015077202, 0.04155505740717559, 0.05563007969699366, -0.20397695888897652, 1.0569715142428786],
    xyz
  );
  const [r, g, b] = rgbL.map((c) => {
    const v = Math.abs(c) > 0.0031308 ? (c < 0 ? -1 : 1) * (1.055 * Math.pow(Math.abs(c), 1 / 2.4) - 0.055) : 12.92 * c;
    return Math.max(0, Math.min(255, Math.round(v * 255)));
  });
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

/** rgb(r, g, b) → #rrggbb (for DOM fallback). */
function rgbToHex(rgb: string): string | null {
  const m = rgb.trim().match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  if (!m) return null;
  const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])].map((x) => Math.max(0, Math.min(255, x)));
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

/** Any CSS color → #rrggbb for canvas-confetti. */
function toHex(color: string): string {
  const v = color.trim();
  if (v.startsWith("#")) return v;
  const hex = oklchToHex(v);
  if (hex) return hex;
  if (v.startsWith("rgb")) return rgbToHex(v) ?? v;
  if (typeof document !== "undefined") {
    const el = document.createElement("div");
    el.style.cssText = `position:absolute;left:-9999px;width:2px;height:2px;background:${v};`;
    document.body.appendChild(el);
    el.offsetHeight;
    const res = getComputedStyle(el).backgroundColor;
    el.remove();
    if (res?.startsWith("rgb")) return rgbToHex(res) ?? v;
  }
  return v;
}

export interface ConfettiOptions {
  centered?: boolean;
  particleCount?: number;
  spread?: number;
  scalar?: number;
  ticks?: number;
  /** Colors to use. If not set, reads from CSS vars via getThemeColorsFromCSS(). */
  colors?: string[];
}

export function fireConfetti(options?: ConfettiOptions): void {
  const rawColors = options?.colors ?? getThemeColorsFromCSS();
  const colors =
    rawColors.length > 0 ? rawColors.map(toHex).filter((c) => c?.startsWith("#")) : undefined;

  const particleCount = options?.particleCount ?? 120;
  const spread = options?.spread ?? 60;
  const scalar = options?.scalar ?? 1.2;
  const ticks = options?.ticks ?? 200;
  const startVelocity = 35;
  const base = {
    particleCount,
    spread,
    startVelocity,
    scalar,
    ticks,
    ...(colors?.length ? { colors } : {}),
  };

  if (options?.centered) {
    confetti({ ...base, origin: { x: 0.5, y: 1 }, angle: 90 });
    return;
  }

  const side = Math.floor(particleCount * 0.6);
  confetti({ ...base, particleCount: side, angle: 60, origin: { x: 0, y: 1 } });
  confetti({ ...base, particleCount: side, angle: 120, origin: { x: 1, y: 1 } });
}
