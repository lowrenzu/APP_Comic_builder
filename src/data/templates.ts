import type { PagePreset, Panel } from "@/types";
import { uid } from "@/utils/ids";

const INK = "#1a1e24";
const FILL = "#f7f4ee";
const NIGHT = "#12181f";

type Spec = { x: number; y: number; w: number; h: number; fill?: string; borderWidth?: number };

export interface PagePresetInfo {
  id: PagePreset;
  name: string;
  family: string;
  blurb: string;
  width: number;
  height: number;
  background: string;
}

const margin = (
  cols: number,
  rows: number,
  gap = 2,
  m = 3,
): Spec[] => {
  const w = (100 - m * 2 - gap * (cols - 1)) / cols;
  const h = (100 - m * 2 - gap * (rows - 1)) / rows;
  const out: Spec[] = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      out.push({ x: m + c * (w + gap), y: m + r * (h + gap), w, h });
    }
  }
  return out;
};

const bleed = (n: number, gap = 0.6): Spec[] => {
  const h = (100 - gap * (n - 1)) / n;
  return Array.from({ length: n }, (_, i) => ({
    x: 0,
    y: i * (h + gap),
    w: 100,
    h,
    fill: NIGHT,
    borderWidth: 0,
  }));
};

const SPECS: Record<PagePreset, Spec[]> = {
  franco: margin(2, 3, 2.2, 3),
  "franco-splash": [
    { x: 3, y: 2, w: 60, h: 62 },
    { x: 65, y: 2, w: 32, h: 30 },
    { x: 65, y: 34, w: 32, h: 30 },
    { x: 3, y: 66, w: 94, h: 32 },
  ],
  "franco-bandes": [
    { x: 3, y: 2, w: 94, h: 30 },
    { x: 3, y: 34, w: 94, h: 30 },
    { x: 3, y: 66, w: 94, h: 32 },
  ],
  tiers: [
    { x: 3, y: 2, w: 94, h: 46 },
    { x: 3, y: 50, w: 46, h: 48 },
    { x: 51, y: 50, w: 46, h: 48 },
  ],
  grid: margin(2, 2, 2.4, 3),
  manga: [
    { x: 3, y: 2, w: 94, h: 22 },
    { x: 51, y: 26, w: 46, h: 34 },
    { x: 3, y: 26, w: 46, h: 34 },
    { x: 3, y: 62, w: 94, h: 36 },
  ],
  "manga-stack": [
    { x: 4, y: 2, w: 92, h: 22 },
    { x: 4, y: 26, w: 92, h: 22 },
    { x: 4, y: 50, w: 92, h: 22 },
    { x: 4, y: 74, w: 92, h: 24 },
  ],
  comics: [
    { x: 3, y: 2, w: 94, h: 28 },
    { x: 3, y: 32, w: 30, h: 32 },
    { x: 35, y: 32, w: 30, h: 32 },
    { x: 67, y: 32, w: 30, h: 32 },
    { x: 3, y: 66, w: 94, h: 32 },
  ],
  "comics-grid": margin(3, 3, 2, 3),
  webtoon: bleed(6, 0.7),
  "webtoon-beats": bleed(8, 0.45),
  splash: [{ x: 3, y: 3, w: 94, h: 94 }],
  cinematic: [
    { x: 3, y: 4, w: 94, h: 44 },
    { x: 3, y: 52, w: 94, h: 44 },
  ],
  strip: [
    { x: 2, y: 8, w: 31, h: 84 },
    { x: 35, y: 8, w: 31, h: 84 },
    { x: 68, y: 8, w: 30, h: 84 },
  ],
  diptyque: [
    { x: 3, y: 3, w: 46, h: 94 },
    { x: 51, y: 3, w: 46, h: 94 },
  ],
  insert: [
    { x: 3, y: 3, w: 94, h: 94 },
    { x: 64, y: 64, w: 30, h: 30 },
  ],
  pyramide: [
    { x: 22, y: 2, w: 56, h: 28 },
    { x: 3, y: 32, w: 46, h: 30 },
    { x: 51, y: 32, w: 46, h: 30 },
    { x: 3, y: 64, w: 30, h: 34 },
    { x: 35, y: 64, w: 30, h: 34 },
    { x: 67, y: 64, w: 30, h: 34 },
  ],
  hero: [
    { x: 3, y: 2, w: 62, h: 96 },
    { x: 67, y: 2, w: 30, h: 31 },
    { x: 67, y: 35, w: 30, h: 31 },
    { x: 67, y: 68, w: 30, h: 30 },
  ],
  "manga-cols": [
    { x: 68, y: 2, w: 29, h: 96 },
    { x: 36, y: 2, w: 30, h: 96 },
    { x: 3, y: 2, w: 31, h: 96 },
  ],
  "manga-chute": [
    { x: 3, y: 2, w: 46, h: 26 },
    { x: 51, y: 2, w: 46, h: 26 },
    { x: 3, y: 30, w: 94, h: 68 },
  ],
  "comics-split": [
    { x: 3, y: 2, w: 94, h: 36 },
    { x: 3, y: 40, w: 46, h: 26 },
    { x: 51, y: 40, w: 46, h: 26 },
    { x: 3, y: 68, w: 30, h: 30 },
    { x: 35, y: 68, w: 30, h: 30 },
    { x: 67, y: 68, w: 30, h: 30 },
  ],
  "webtoon-talk": [
    { x: 0, y: 0, w: 100, h: 16, fill: NIGHT, borderWidth: 0 },
    { x: 0, y: 16.6, w: 100, h: 24, fill: NIGHT, borderWidth: 0 },
    { x: 0, y: 41.2, w: 100, h: 12, fill: NIGHT, borderWidth: 0 },
    { x: 0, y: 53.8, w: 100, h: 26, fill: NIGHT, borderWidth: 0 },
    { x: 0, y: 80.4, w: 100, h: 19.6, fill: NIGHT, borderWidth: 0 },
  ],
  carre: margin(2, 2, 2.4, 4),
  custom: [{ x: 4, y: 4, w: 92, h: 92 }],
};

export const PAGE_PRESETS: PagePresetInfo[] = [
  { id: "franco", name: "Franco-belge", family: "Album", blurb: "6 cases, 2 colonnes", width: 800, height: 1120, background: "#efe6d6" },
  { id: "franco-splash", name: "Splash + suites", family: "Album", blurb: "Grande case, deux inserts", width: 800, height: 1120, background: "#efe6d6" },
  { id: "franco-bandes", name: "Bandes", family: "Album", blurb: "3 bandes horizontales", width: 800, height: 1120, background: "#efe6d6" },
  { id: "tiers", name: "Tiers", family: "Album", blurb: "Établissant, puis 2 cases", width: 800, height: 1120, background: "#efe6d6" },
  { id: "grid", name: "Grille", family: "Album", blurb: "4 cases égales", width: 800, height: 1120, background: "#efe6d6" },
  { id: "diptyque", name: "Diptyque", family: "Album", blurb: "Deux cases pleine hauteur", width: 800, height: 1120, background: "#efe6d6" },
  { id: "insert", name: "Insert", family: "Album", blurb: "Grande case et médaillon", width: 800, height: 1120, background: "#efe6d6" },
  { id: "pyramide", name: "Pyramide", family: "Album", blurb: "1, puis 2, puis 3 cases", width: 800, height: 1120, background: "#efe6d6" },
  { id: "hero", name: "Héros", family: "Album", blurb: "Colonne haute, trois inserts", width: 800, height: 1120, background: "#efe6d6" },
  { id: "manga", name: "Manga", family: "Manga", blurb: "Bandeau, duo, chute", width: 720, height: 1080, background: "#f7f4ee" },
  { id: "manga-stack", name: "4-koma", family: "Manga", blurb: "4 bandes à lire en descendant", width: 720, height: 1100, background: "#f7f4ee" },
  { id: "manga-cols", name: "Colonnes", family: "Manga", blurb: "3 colonnes, lecture droite-gauche", width: 720, height: 1080, background: "#f7f4ee" },
  { id: "manga-chute", name: "Chute", family: "Manga", blurb: "Deux cases, puis une grande", width: 720, height: 1080, background: "#f7f4ee" },
  { id: "comics", name: "Comics", family: "Comics", blurb: "Splash, trio, chute", width: 760, height: 1160, background: "#efe6d6" },
  { id: "comics-grid", name: "Planche 9", family: "Comics", blurb: "Grille 3 × 3", width: 760, height: 1160, background: "#efe6d6" },
  { id: "comics-split", name: "Éclaté", family: "Comics", blurb: "Splash, duo, puis trio", width: 760, height: 1160, background: "#efe6d6" },
  { id: "webtoon", name: "Webtoon", family: "Webtoon", blurb: "6 écrans, fond nuit", width: 640, height: 2200, background: "#0c1116" },
  { id: "webtoon-beats", name: "Battements", family: "Webtoon", blurb: "8 cases plein cadre", width: 640, height: 2800, background: "#0c1116" },
  { id: "webtoon-talk", name: "Dialogue", family: "Webtoon", blurb: "5 hauteurs alternées", width: 640, height: 2400, background: "#0c1116" },
  { id: "splash", name: "Splash", family: "Cinéma", blurb: "Une seule case", width: 800, height: 1120, background: "#efe6d6" },
  { id: "cinematic", name: "Cinéma", family: "Cinéma", blurb: "Deux écrans larges", width: 1000, height: 680, background: "#efe6d6" },
  { id: "strip", name: "Strip", family: "Cinéma", blurb: "3 cases de gauche à droite", width: 1080, height: 420, background: "#efe6d6" },
  { id: "carre", name: "Carré", family: "Cinéma", blurb: "4 cases, format réseau", width: 1080, height: 1080, background: "#efe6d6" },
];

export function pagePresetInfo(preset: PagePreset): PagePresetInfo {
  return (
    PAGE_PRESETS.find((p) => p.id === preset) ?? {
      id: preset,
      name: "Libre",
      family: "Album",
      blurb: "Case unique",
      width: 800,
      height: 1120,
      background: "#efe6d6",
    }
  );
}

export function isWebtoonPreset(preset: PagePreset): boolean {
  return preset === "webtoon" || preset === "webtoon-beats" || preset === "webtoon-talk";
}

export function pageSize(preset: PagePreset): { width: number; height: number } {
  const info = pagePresetInfo(preset);
  return { width: info.width, height: info.height };
}

export function layoutBoxes(preset: PagePreset): Spec[] {
  return SPECS[preset] ?? SPECS.custom;
}

export function createPanels(preset: PagePreset, pageId: string): Panel[] {
  return layoutBoxes(preset).map((spec) => ({
    id: uid("panel"),
    pageId,
    x: spec.x,
    y: spec.y,
    w: spec.w,
    h: spec.h,
    fill: spec.fill ?? FILL,
    border: INK,
    borderWidth: spec.borderWidth ?? 2.5,
    radius: 0,
    halftone: false,
  }));
}

export const PRESET_LABEL: Record<PagePreset, string> = {
  franco: "Franco-belge",
  "franco-splash": "Splash + suites",
  "franco-bandes": "Bandes",
  tiers: "Tiers",
  grid: "Grille",
  manga: "Manga",
  "manga-stack": "4-koma",
  comics: "Comics",
  "comics-grid": "Planche 9",
  webtoon: "Webtoon",
  "webtoon-beats": "Battements",
  splash: "Splash",
  cinematic: "Cinéma",
  strip: "Strip",
  carre: "Carré",
  diptyque: "Diptyque",
  insert: "Insert",
  pyramide: "Pyramide",
  hero: "Héros",
  "manga-cols": "Colonnes",
  "manga-chute": "Chute",
  "comics-split": "Éclaté",
  "webtoon-talk": "Dialogue",
  custom: "Libre",
};

export const PRESET_FAMILIES = ["Album", "Manga", "Comics", "Webtoon", "Cinéma"] as const;