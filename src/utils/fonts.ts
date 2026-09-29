export const FONT_UI = '"Inter", ui-sans-serif, system-ui, sans-serif';
export const FONT_DISPLAY = '"Bangers", system-ui, sans-serif';
export const FONT_MARKER = '"Permanent Marker", cursive';

export const UI_FONTS = [
  { value: FONT_UI, label: "Inter" },
  { value: FONT_DISPLAY, label: "Bangers" },
  { value: FONT_MARKER, label: "Permanent Marker" },
] as const;

/** Map stored families, including the previous Plex / Lilita stacks, onto the studio fonts. */
export function resolveFont(family: string | undefined, role?: "sfx"): string {
  if (role === "sfx") return FONT_DISPLAY;
  const name = (family ?? "").toLowerCase();
  if (name.includes("bangers") || name.includes("lilita")) return FONT_DISPLAY;
  if (name.includes("marker") || name.includes("permanent")) return FONT_MARKER;
  if (!name || name.includes("inter") || name.includes("plex") || name.includes("comic") || name.includes("mono")) return FONT_UI;
  return family || FONT_UI;
}
