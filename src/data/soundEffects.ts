export interface SfxPreset {
  id: string;
  text: string;
  color: string;
  group: "Choc" | "Bris" | "Mouvement" | "Énergie" | "Voix";
  rotation: number;
  fontSize: number;
}

export const SFX_PRESETS: SfxPreset[] = [
  { id: "boom", text: "BOOM!", color: "#ff9d2e", group: "Choc", rotation: -8, fontSize: 40 },
  { id: "pow", text: "POW!", color: "#fff7ea", group: "Choc", rotation: 6, fontSize: 38 },
  { id: "bam", text: "BAM!", color: "#ffe08a", group: "Choc", rotation: -4, fontSize: 40 },
  { id: "paf", text: "PAF!", color: "#ffd0c2", group: "Choc", rotation: 8, fontSize: 36 },
  { id: "blam", text: "BLAM!", color: "#ffb020", group: "Choc", rotation: -10, fontSize: 36 },
  { id: "slam", text: "SLAM!", color: "#f4f7fa", group: "Choc", rotation: -6, fontSize: 34 },
  { id: "badaboum", text: "BADABOUM!", color: "#ff9d2e", group: "Choc", rotation: -3, fontSize: 28 },
  { id: "crash", text: "CRASH!", color: "#ffb84d", group: "Bris", rotation: -8, fontSize: 34 },
  { id: "crac", text: "CRAC!", color: "#ffe7b0", group: "Bris", rotation: 7, fontSize: 36 },
  { id: "craaac", text: "CRAAACK!", color: "#ffcf70", group: "Bris", rotation: -6, fontSize: 30 },
  { id: "clac", text: "CLAC!", color: "#f4f7fa", group: "Bris", rotation: 4, fontSize: 34 },
  { id: "toc", text: "TOC!", color: "#fffdf8", group: "Bris", rotation: -2, fontSize: 32 },
  { id: "gling", text: "GLING!", color: "#d7f4ff", group: "Bris", rotation: 10, fontSize: 30 },
  { id: "vroom", text: "VROOOM!", color: "#7dcea0", group: "Mouvement", rotation: -8, fontSize: 32 },
  { id: "vroum", text: "VROUM!", color: "#9be7b5", group: "Mouvement", rotation: 5, fontSize: 34 },
  { id: "woosh", text: "WOOSH!", color: "#c9e7ff", group: "Mouvement", rotation: -12, fontSize: 32 },
  { id: "froosh", text: "FROOOSH!", color: "#b7fff0", group: "Mouvement", rotation: -6, fontSize: 28 },
  { id: "plouf", text: "PLOUF!", color: "#8fd4ff", group: "Mouvement", rotation: 6, fontSize: 34 },
  { id: "splash", text: "SPLASH!", color: "#7ec8ff", group: "Mouvement", rotation: -4, fontSize: 32 },
  { id: "zap", text: "ZAP!", color: "#7dd3fc", group: "Énergie", rotation: -8, fontSize: 40 },
  { id: "bzzzt", text: "BZZZT!", color: "#b6f36b", group: "Énergie", rotation: 4, fontSize: 32 },
  { id: "crack", text: "CRACK!", color: "#ffb03a", group: "Énergie", rotation: -7, fontSize: 34 },
  { id: "flash", text: "FLASH!", color: "#fff4c2", group: "Énergie", rotation: 0, fontSize: 34 },
  { id: "huuum", text: "HUUUUM…", color: "#d6c7ff", group: "Énergie", rotation: -2, fontSize: 28 },
  { id: "ha", text: "HA!", color: "#fffdf8", group: "Voix", rotation: 8, fontSize: 36 },
  { id: "haaa", text: "HAAA!", color: "#ffe1e1", group: "Voix", rotation: -6, fontSize: 36 },
  { id: "he", text: "HÉ!", color: "#ffe08a", group: "Voix", rotation: 5, fontSize: 36 },
  { id: "ah", text: "AH…", color: "#f4f7fa", group: "Voix", rotation: -3, fontSize: 32 },
];

export const SFX_GROUPS = ["Choc", "Bris", "Mouvement", "Énergie", "Voix"] as const;

export function sfxPreset(id: string): SfxPreset {
  return SFX_PRESETS.find((s) => s.id === id) ?? SFX_PRESETS[0];
}