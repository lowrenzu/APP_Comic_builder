import type { BubbleStyle } from "@/types";
import { FONT_DISPLAY, FONT_MARKER, FONT_UI } from "@/utils/fonts";

export interface BubblePreset {
  style: BubbleStyle;
  name: string;
  sample: string;
  fill: string;
  ink: string;
  group: "Parole" | "Récit" | "Émotion";
  fontFamily?: string;
  italic?: boolean;
  weight?: number;
  fontSize?: number;
}

export const BUBBLE_PRESETS: BubblePreset[] = [
  { style: "classic", name: "Classique", sample: "On y va.", fill: "#fffdf8", ink: "#1c2128", group: "Parole" },
  { style: "double", name: "Double trait", sample: "Je te l'avais dit.", fill: "#fffdf8", ink: "#1c2128", group: "Parole" },
  { style: "square", name: "Carrée", sample: "Par ici.", fill: "#fffdf8", ink: "#1c2128", group: "Parole" },
  { style: "oval", name: "Ovale", sample: "Regarde.", fill: "#fffdf8", ink: "#1c2128", group: "Parole" },
  { style: "cloud", name: "Nuage", sample: "Doucement.", fill: "#fffdf8", ink: "#1c2128", group: "Parole" },
  { style: "thought", name: "Pensée", sample: "Et si…", fill: "#fffdf8", ink: "#1c2128", group: "Parole", italic: true },
  { style: "whisper", name: "Murmure", sample: "chut…", fill: "#f4f7fb", ink: "#4d5966", group: "Parole", italic: true },
  { style: "radio", name: "Radio", sample: "Base, vous me recevez ?", fill: "#f3f6ea", ink: "#1c2128", group: "Parole", fontFamily: FONT_UI, weight: 500, fontSize: 13 },
  { style: "rounded", name: "Ronde", sample: "D'accord.", fill: "#fffdf8", ink: "#1c2128", group: "Parole" },
  { style: "tech", name: "Technique", sample: "Système en ligne.", fill: "#eef3f8", ink: "#1c3a52", group: "Parole", fontFamily: FONT_UI, weight: 500, fontSize: 13 },
  { style: "shout", name: "Cri", sample: "Attention !", fill: "#fff4e4", ink: "#1c2128", group: "Émotion", fontFamily: FONT_DISPLAY, weight: 400, fontSize: 18 },
  { style: "scream", name: "Hurlement", sample: "NON !", fill: "#ffe4e1", ink: "#7a1d1d", group: "Émotion", fontFamily: FONT_DISPLAY, weight: 400, fontSize: 20 },
  { style: "electric", name: "Éclair", sample: "ZZZT !", fill: "#e5fbff", ink: "#0e4a5c", group: "Émotion", fontFamily: FONT_DISPLAY, weight: 400, fontSize: 18 },
  { style: "icy", name: "Givre", sample: "Il fait trop froid.", fill: "#eef8ff", ink: "#24566a", group: "Émotion", italic: true },
  { style: "dark", name: "Nuit", sample: "Qui est là ?", fill: "#1a1e24", ink: "#f4efe6", group: "Émotion" },
  { style: "boom", name: "Impact", sample: "BAM !", fill: "#fff1d6", ink: "#1c2128", group: "Émotion", fontFamily: FONT_DISPLAY, weight: 400, fontSize: 20 },
  { style: "anger", name: "Colère", sample: "ASSEZ !", fill: "#ffd9d4", ink: "#7a1d1d", group: "Émotion", fontFamily: FONT_DISPLAY, weight: 400, fontSize: 18 },
  { style: "glitch", name: "Glitch", sample: "Signal perdu.", fill: "#e8fff4", ink: "#0d3b2e", group: "Émotion", fontFamily: FONT_UI, weight: 500, fontSize: 13 },
  { style: "sleep", name: "Sommeil", sample: "Zzz…", fill: "#f4f0ff", ink: "#3d3560", group: "Émotion", italic: true },
  { style: "narration", name: "Narration", sample: "Plus tard, sur la grève.", fill: "#f6e7c4", ink: "#2a2418", group: "Récit", fontFamily: FONT_UI, italic: true, weight: 500, fontSize: 14 },
  { style: "caption", name: "Cartouche", sample: "Île de Sanguinet.", fill: "#fffdf8", ink: "#1c2128", group: "Récit", fontFamily: FONT_UI, italic: true, weight: 500, fontSize: 14 },
  { style: "banner", name: "Bandeau", sample: "FIN.", fill: "#1c2128", ink: "#fff8ee", group: "Récit", fontFamily: FONT_DISPLAY, weight: 400, fontSize: 18 },
  { style: "note", name: "Note", sample: "Ne pas oublier la lampe.", fill: "#fff4c8", ink: "#2a2418", group: "Récit", fontFamily: FONT_MARKER, weight: 400, fontSize: 14 },
  { style: "location", name: "Lieu", sample: "Port de Sanguinet", fill: "#fffdf8", ink: "#1c2128", group: "Récit", fontFamily: FONT_UI, weight: 500, fontSize: 14 },
  { style: "chapter", name: "Chapitre", sample: "Chapitre 2", fill: "#1c2128", ink: "#fff8ee", group: "Récit", fontFamily: FONT_DISPLAY, weight: 400, fontSize: 18 },
];

export function bubblePreset(style: BubbleStyle): BubblePreset {
  return BUBBLE_PRESETS.find((b) => b.style === style) ?? BUBBLE_PRESETS[0];
}

export const BUBBLE_GROUPS = ["Parole", "Récit", "Émotion"] as const;