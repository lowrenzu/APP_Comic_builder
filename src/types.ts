export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "soft-light"
  | "hard-light"
  | "darken"
  | "lighten"
  | "color"
  | "luminosity";

export type AssetCategory =
  | "character"
  | "modelsheet"
  | "background"
  | "photo"
  | "object"
  | "vehicle"
  | "effect"
  | "texture"
  | "bubble"
  | "sfx"
  | "custom";

export type LayerType = "image" | "text" | "bubble" | "sfx" | "group";

export type ToolId =
  | "select"
  | "move"
  | "transform"
  | "crop"
  | "image"
  | "character"
  | "background"
  | "photo"
  | "modelsheet"
  | "object"
  | "effect"
  | "text"
  | "bubble"
  | "sfx"
  | "library"
  | "ai"
  | "cloud";

export type PagePreset =
  | "franco"
  | "franco-splash"
  | "franco-bandes"
  | "tiers"
  | "grid"
  | "diptyque"
  | "insert"
  | "pyramide"
  | "hero"
  | "manga"
  | "manga-stack"
  | "manga-cols"
  | "manga-chute"
  | "comics"
  | "comics-grid"
  | "comics-split"
  | "webtoon"
  | "webtoon-beats"
  | "webtoon-talk"
  | "splash"
  | "cinematic"
  | "strip"
  | "carre"
  | "custom";

export type BubbleStyle =
  | "classic"
  | "square"
  | "thought"
  | "shout"
  | "whisper"
  | "narration"
  | "double"
  | "oval"
  | "cloud"
  | "radio"
  | "caption"
  | "banner"
  | "note"
  | "icy"
  | "dark"
  | "scream"
  | "electric"
  | "rounded"
  | "tech"
  | "location"
  | "chapter"
  | "glitch"
  | "sleep"
  | "boom"
  | "anger";

export type LibraryCategory = AssetCategory | "all" | "layout";

export type TextAlign = "left" | "center" | "right";

export interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MaskShape {
  type: "rect" | "ellipse" | "free";
  x: number;
  y: number;
  w: number;
  h: number;
  points?: { x: number; y: number }[];
  /** Adoucissement du contour, 0–24. */
  feather?: number;
}

export interface Asset {
  id: string;
  name: string;
  description: string;
  category: AssetCategory;
  tags: string[];
  favorite: boolean;
  createdAt: number;
  source: "demo" | "import" | "ai" | "cloud";
  src: string;
  mime: string;
  characterKey?: string;
  viewLabel?: string;
}

export interface Layer {
  id: string;
  panelId: string;
  parentId: string | null;
  name: string;
  type: LayerType;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: BlendMode;
  z: number;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
  flipH: boolean;
  flipV: boolean;
  assetId?: string;
  crop: CropRect;
  mask: MaskShape | null;
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  italic: boolean;
  color: string;
  align: TextAlign;
  bubbleStyle: BubbleStyle;
  sfxVariant: string;
  /** Queue de bulle, en % du cadre (peut dépasser). */
  tailX?: number;
  tailY?: number;
  tailLen?: number;
  brightness?: number;
  contrast?: number;
  tint?: string;
  tintAmount?: number;
}

export interface Panel {
  id: string;
  pageId: string;
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  border: string;
  borderWidth: number;
  radius: number;
  halftone: boolean;
}

export interface Page {
  id: string;
  name: string;
  preset: PagePreset;
  background: string;
  width: number;
  height: number;
}

export interface ProjectMeta {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  updatedAt: number;
}

export interface ToastItem {
  id: string;
  text: string;
}

export const BLEND_MODES: { id: BlendMode; label: string }[] = [
  { id: "normal", label: "Normal" },
  { id: "multiply", label: "Multiply" },
  { id: "screen", label: "Screen" },
  { id: "overlay", label: "Overlay" },
  { id: "soft-light", label: "Soft Light" },
  { id: "hard-light", label: "Hard Light" },
  { id: "darken", label: "Darken" },
  { id: "lighten", label: "Lighten" },
  { id: "color", label: "Color" },
  { id: "luminosity", label: "Luminosity" },
];

export const CATEGORY_LABEL: Record<AssetCategory | "all", string> = {
  all: "Tous",
  character: "Personnages",
  modelsheet: "Model sheets",
  background: "Décors",
  photo: "Photos",
  object: "Objets",
  vehicle: "Véhicules",
  effect: "Effets",
  texture: "Textures",
  bubble: "Bulles",
  sfx: "Onomatopées",
  custom: "Custom",
};
