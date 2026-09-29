import { DEMO_ASSETS } from "@/data/demoAssets";
import type { CropRect, Layer, Page, Panel, ProjectMeta } from "@/types";
import { makeLayer } from "@/utils/layerUtils";

/** Bump to refresh the stock album for people still on the previous collage. */
export const DEMO_LAYOUT_REV = 3;

const PAPER = "#f4efe6";
const INK = "#1b1916";
const NIGHT = "#101418";

const W = 800;
const H = 1280;
const M = 22;
const G = 12;

type Box = { x: number; y: number; w: number; h: number };

function frame(pageW: number, pageH: number, x: number, y: number, w: number, h: number): Box {
  return {
    x: (x / pageW) * 100,
    y: (y / pageH) * 100,
    w: (w / pageW) * 100,
    h: (h / pageH) * 100,
  };
}

function fitH(
  panel: Box,
  pageW: number,
  pageH: number,
  imgW: number,
  imgH: number,
  x: number,
  height: number,
  bottom: number,
): Box {
  const panelPxW = (panel.w / 100) * pageW;
  const panelPxH = (panel.h / 100) * pageH;
  const hPx = (height / 100) * panelPxH;
  const wPx = hPx * (imgW / imgH);
  return { x, y: 100 - bottom - height, w: (wPx / panelPxW) * 100, h: height };
}

function fitW(
  panel: Box,
  pageW: number,
  pageH: number,
  imgW: number,
  imgH: number,
  x: number,
  y: number,
  width: number,
): Box {
  const panelPxW = (panel.w / 100) * pageW;
  const panelPxH = (panel.h / 100) * pageH;
  const wPx = (width / 100) * panelPxW;
  const hPx = wPx * (imgH / imgW);
  return { x, y, w: width, h: (hPx / panelPxH) * 100 };
}

function P(id: string, pageId: string, box: Box, extra?: Partial<Panel>): Panel {
  return {
    id,
    pageId,
    ...box,
    fill: "#f7f4ee",
    border: INK,
    borderWidth: 3,
    radius: 0,
    halftone: false,
    ...extra,
  };
}

function img(
  id: string,
  panelId: string,
  name: string,
  assetId: string,
  box: Box,
  z: number,
  extra?: Partial<Layer>,
): Layer {
  return makeLayer({
    id,
    panelId,
    name,
    type: "image",
    assetId,
    ...box,
    z,
    ...extra,
  });
}

function bubble(
  id: string,
  panelId: string,
  text: string,
  box: Box,
  z: number,
  extra?: Partial<Layer>,
): Layer {
  return makeLayer({
    id,
    panelId,
    name: text.replace(/\n/g, " ").slice(0, 24),
    type: "bubble",
    text,
    ...box,
    z,
    fontSize: 20,
    ...extra,
  });
}

const HERO: [number, number] = [279, 820];
const DOG: [number, number] = [448, 620];
const DOG_P: [number, number] = [559, 485];
const ALIEN: [number, number] = [270, 815];
const ART: [number, number] = [361, 776];
const COMP: [number, number] = [754, 578];
const LAMP: [number, number] = [248, 593];
const BOAT: [number, number] = [735, 243];
const BUST: CropRect = { x: 0, y: 0, w: 1, h: 0.58 };

export function createDemoProject(): {
  meta: ProjectMeta;
  pages: Page[];
  panels: Panel[];
  layers: Layer[];
} {
  const pages: Page[] = [
    { id: "page-1", name: "01 — L'approche", preset: "franco", background: PAPER, width: W, height: H },
    { id: "page-2", name: "02 — Sous les arbres", preset: "franco", background: PAPER, width: W, height: H },
    { id: "page-3", name: "03 — Contact", preset: "comics", background: PAPER, width: W, height: H },
    { id: "page-4", name: "04 — Défilement", preset: "webtoon", background: "#0b1016", width: 640, height: 2100 },
  ];

  const p1a = frame(W, H, M, M, 756, 400);
  const p1b = frame(W, H, M, 434, 372, 382);
  const p1c = frame(W, H, 406, 434, 372, 382);
  const p1d = frame(W, H, M, 828, 756, 430);

  const p2a = frame(W, H, M, M, 468, 1236);
  const p2b = frame(W, H, 502, M, 276, 612);
  const p2c = frame(W, H, 502, 646, 276, 612);

  const p3a = frame(W, H, M, M, 756, 400);
  const p3b = frame(W, H, M, 434, 372, 382);
  const p3c = frame(W, H, 406, 434, 372, 382);
  const p3d = frame(W, H, M, 828, 756, 430);

  const p4a = frame(640, 2100, 0, 0, 640, 680);
  const p4b = frame(640, 2100, 0, 696, 640, 760);
  const p4c = frame(640, 2100, 0, 1472, 640, 628);

  const panels: Panel[] = [
    P("p1a", "page-1", p1a),
    P("p1b", "page-1", p1b),
    P("p1c", "page-1", p1c),
    P("p1d", "page-1", p1d),
    P("p2a", "page-2", p2a),
    P("p2b", "page-2", p2b),
    P("p2c", "page-2", p2c),
    P("p3a", "page-3", p3a, { fill: NIGHT }),
    P("p3b", "page-3", p3b, { fill: NIGHT }),
    P("p3c", "page-3", p3c, { fill: NIGHT }),
    P("p3d", "page-3", p3d, { fill: NIGHT }),
    P("p4a", "page-4", p4a, { borderWidth: 0, fill: NIGHT }),
    P("p4b", "page-4", p4b, { borderWidth: 0, fill: NIGHT }),
    P("p4c", "page-4", p4c, { borderWidth: 0, fill: NIGHT }),
  ];

  const full = { x: 0, y: 0, w: 100, h: 100 };

  const layers: Layer[] = [
    img("l-isle", "p1a", "Île", "a-island", full, 1, { locked: true }),
    bubble("l-narr-1", "p1a", "Quelque part au large — une île absente de toutes les cartes.", { x: 8, y: 74, w: 84, h: 20 }, 4, {
      bubbleStyle: "narration",
      fontSize: 18,
      fontWeight: 500,
      italic: true,
      fontFamily: "\"Inter\", ui-sans-serif, system-ui, sans-serif",
      color: "#2a2418",
    }),

    img("l-ocean-1", "p1b", "Océan", "a-ocean", full, 1, { locked: true }),
    img("l-boat", "p1b", "Canot", "a-vehicle", fitW(p1b, W, H, BOAT[0], BOAT[1], -6, 56, 114), 2),
    bubble("l-thought", "p1b", "Cette odeur…", { x: 38, y: 5, w: 56, h: 30 }, 5, {
      bubbleStyle: "thought",
      fontSize: 18,
    }),

    img("l-ocean-2", "p1c", "Océan", "a-ocean", full, 1, {
      locked: true,
      crop: { x: 0, y: 0, w: 1, h: 0.72 },
    }),
    img("l-lena-1", "p1c", "Léna", "a-heroine", fitH(p1c, W, H, HERO[0], HERO[1] * BUST.h, 40, 100, 0), 2, {
      crop: BUST,
    }),
    bubble("l-say-1", "p1c", "Georges,\ntu sens ça ?", { x: 3, y: 4, w: 46, h: 32 }, 4, { fontSize: 18 }),

    img("l-coast", "p1d", "Grève", "a-photo", full, 1, { locked: true, crop: { x: 0, y: 0, w: 1, h: 0.86 } }),
    bubble("l-say-2", "p1d", "On accoste avant la nuit.", { x: 18, y: 4, w: 50, h: 16 }, 4, {
      bubbleStyle: "square",
      fontSize: 20,
    }),

    img("l-forest", "p2a", "Forêt", "a-forest", full, 1, { locked: true }),
    img("l-moss", "p2a", "Mousse", "a-texture", full, 2, {
      locked: true,
      opacity: 0.22,
      blendMode: "multiply",
    }),
    img("l-glow", "p2a", "Lumière", "a-fx-light", fitW(p2a, W, H, 900, 900, 4, 0, 92), 3, {
      blendMode: "screen",
      opacity: 0.7,
    }),
    makeLayer({
      id: "g-heroes",
      panelId: "p2a",
      name: "Groupe — Personnages",
      type: "group",
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      z: 6,
    }),
    img("l-lena-3", "p2a", "Léna", "a-heroine", fitH(p2a, W, H, HERO[0], HERO[1], 42, 62, 0), 5, {
      parentId: "g-heroes",
    }),
    img("l-geo-3", "p2a", "Georges", "a-georges-profile", fitW(p2a, W, H, DOG_P[0], DOG_P[1], -6, 77, 74), 6, {
      parentId: "g-heroes",
    }),
    img("l-lamp-2", "p2a", "Lanterne", "a-lamp", fitH(p2a, W, H, LAMP[0], LAMP[1], 78, 16, 18), 7),
    bubble("l-narr-forest", "p2a", "La forêt ne figure sur aucune carte.", { x: 6, y: 3, w: 78, h: 8 }, 8, {
      bubbleStyle: "narration",
      fontSize: 16,
      fontWeight: 500,
      italic: true,
      fontFamily: "\"Inter\", ui-sans-serif, system-ui, sans-serif",
      color: "#2a2418",
    }),

    img("l-ruins", "p2b", "Ruines", "a-ruins", full, 1, { locked: true }),
    img("l-artifact", "p2b", "Artefact", "a-artifact", fitH(p2b, W, H, ART[0], ART[1], 16, 64, 14), 3),
    img("l-dust", "p2b", "Poussière", "a-fx-dust", fitW(p2b, W, H, 900, 900, -6, 18, 112), 4, {
      blendMode: "screen",
      opacity: 0.72,
    }),

    img("l-ruins-2", "p2c", "Ruines", "a-ruins", full, 1, { locked: true, crop: { x: 0.1, y: 0.15, w: 0.8, h: 0.7 } }),
    img("l-comp", "p2c", "Ordinateur", "a-computer", fitW(p2c, W, H, COMP[0], COMP[1], 5, 40, 90), 2),
    bubble("l-say-3", "p2c", "Ce n'est pas une ruine.\nC'est une porte.", { x: 4, y: 3, w: 92, h: 26 }, 5, {
      fontSize: 16,
    }),
    makeLayer({
      id: "l-crack",
      panelId: "p2c",
      name: "CRACK!",
      type: "sfx",
      sfxVariant: "crash",
      text: "CRACK!",
      color: "#ffb03a",
      x: 10,
      y: 76,
      w: 80,
      h: 16,
      z: 6,
      fontSize: 30,
      rotation: -8,
      fontFamily: "\"Bangers\", system-ui, sans-serif",
    }),

    img("l-base", "p3a", "Base", "a-base", full, 1, { locked: true }),
    bubble("l-narr-cliff", "p3a", "Minuit. La falaise s'allume.", { x: 3, y: 4, w: 46, h: 16 }, 4, {
      bubbleStyle: "narration",
      fontSize: 16,
      fontWeight: 500,
      italic: true,
      fontFamily: "\"Inter\", ui-sans-serif, system-ui, sans-serif",
      color: "#2a2418",
    }),

    img("l-forest-2", "p3b", "Forêt", "a-forest", full, 1, { locked: true }),
    img("l-moss-2", "p3b", "Mousse", "a-texture", full, 2, {
      locked: true,
      opacity: 0.4,
      blendMode: "multiply",
    }),
    img("l-geo-4", "p3b", "Georges", "a-georges", fitH(p3b, W, H, DOG[0], DOG[1], -2, 72, 0), 3),
    img("l-lena-4", "p3b", "Léna", "a-heroine", fitH(p3b, W, H, HERO[0], HERO[1], 52, 94, 0), 4),
    bubble("l-say-4", "p3b", "Qu'est-ce que c'est ?", { x: 4, y: 3, w: 74, h: 22 }, 6, { fontSize: 17 }),

    img("l-base-mid", "p3c", "Base", "a-base", full, 1, { locked: true }),
    img("l-alien", "p3c", "Silar", "a-alien", fitH(p3c, W, H, ALIEN[0], ALIEN[1], 60, 92, 0), 3),
    makeLayer({
      id: "l-zap",
      panelId: "p3c",
      name: "ZAP!",
      type: "sfx",
      sfxVariant: "zap",
      text: "ZAP!",
      color: "#9aefff",
      x: 4,
      y: 8,
      w: 48,
      h: 22,
      z: 5,
      rotation: -8,
      fontSize: 32,
      fontFamily: "\"Bangers\", system-ui, sans-serif",
    }),

    img("l-base-2", "p3d", "Base", "a-base", full, 1, { locked: true, crop: { x: 0, y: 0.08, w: 1, h: 0.84 } }),
    img("l-smoke", "p3d", "Fumée", "a-fx-smoke", fitW(p3d, W, H, 900, 900, 46, 6, 36), 4, {
      blendMode: "screen",
      opacity: 0.8,
    }),
    img("l-boom", "p3d", "Explosion", "a-fx-explosion", fitW(p3d, W, H, 900, 900, 60, 16, 34), 5, {
      blendMode: "screen",
      opacity: 0.88,
    }),
    bubble("l-narr-2", "p3d", "La lumière répond.", { x: 3, y: 5, w: 36, h: 18 }, 6, {
      bubbleStyle: "narration",
      fontSize: 17,
      fontWeight: 500,
      italic: true,
      fontFamily: "\"Inter\", ui-sans-serif, system-ui, sans-serif",
      color: "#2a2418",
    }),

    img("l-w-island", "p4a", "Île", "a-island", full, 1, { locked: true }),
    makeLayer({
      id: "l-w-title",
      panelId: "p4a",
      name: "Titre",
      type: "text",
      text: "LE SECRET DE L'ÎLE",
      x: 6,
      y: 74,
      w: 88,
      h: 12,
      z: 3,
      fontFamily: "\"Bangers\", system-ui, sans-serif",
      fontSize: 34,
      color: "#fff8ee",
      align: "center",
    }),
    makeLayer({
      id: "l-w-sub",
      panelId: "p4a",
      name: "Sous-titre",
      type: "text",
      text: "Récit d'expédition",
      x: 12,
      y: 86,
      w: 76,
      h: 6,
      z: 4,
      fontFamily: "\"Inter\", ui-sans-serif, system-ui, sans-serif",
      fontSize: 16,
      fontWeight: 500,
      italic: true,
      color: "#f4efe6",
      align: "center",
    }),

    img("l-w-forest", "p4b", "Forêt", "a-forest", full, 1, { locked: true }),
    img("l-w-geo", "p4b", "Georges", "a-georges", fitH(p4b, 640, 2100, DOG[0], DOG[1], 2, 62, 0), 2),
    img("l-w-lena", "p4b", "Léna", "a-heroine", fitH(p4b, 640, 2100, HERO[0], HERO[1], 48, 78, 0), 3),
    bubble("l-w-say", "p4b", "Ne cours pas.", { x: 6, y: 4, w: 48, h: 14 }, 5, {
      bubbleStyle: "whisper",
      fontSize: 20,
      italic: true,
    }),

    img("l-w-base", "p4c", "Base", "a-base", full, 1, { locked: true, crop: { x: 0.2, y: 0, w: 0.8, h: 1 } }),
    img("l-w-alien", "p4c", "Silar", "a-alien", fitH(p4c, 640, 2100, ALIEN[0], ALIEN[1], 54, 86, 0), 3),
    makeLayer({
      id: "l-w-zap",
      panelId: "p4c",
      name: "ZAP!",
      type: "sfx",
      sfxVariant: "zap",
      text: "ZAP!",
      color: "#9aefff",
      x: 6,
      y: 6,
      w: 42,
      h: 14,
      z: 6,
      fontSize: 36,
      fontFamily: "\"Bangers\", system-ui, sans-serif",
    }),
  ];

  return {
    meta: {
      id: "projet-ile",
      title: "Le Secret de l'Île",
      subtitle: "Récit d'expédition",
      author: "Atelier",
      updatedAt: Date.now(),
    },
    pages,
    panels,
    layers,
  };
}

export { DEMO_ASSETS };
