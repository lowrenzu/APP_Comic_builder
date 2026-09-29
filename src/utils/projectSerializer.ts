import { DEMO_ASSETS } from "@/data/demoAssets";
import type { Asset, Layer, Page, Panel, ProjectMeta } from "@/types";
import { idbGet, idbSet } from "@/utils/idb";
import { uid } from "@/utils/ids";

export const STORAGE_KEY = "atelier-bd-pro-v1";

export interface ProjectFile {
  version: 1;
  project: ProjectMeta;
  pages: Page[];
  panels: Panel[];
  layers: Layer[];
  assets: Asset[];
  characters: { key: string; name: string; description: string }[];
  modelSheets: Asset[];
  palettes: string[];
  selectedPageId: string;
}

export function toProjectFile(
  meta: ProjectMeta,
  pages: Page[],
  panels: Panel[],
  layers: Layer[],
  assets: Asset[],
  selectedPageId: string,
): ProjectFile {
  const characters = new Map<string, { key: string; name: string; description: string }>();
  for (const asset of assets) {
    if (asset.category !== "character" || !asset.characterKey) continue;
    if (!characters.has(asset.characterKey)) {
      characters.set(asset.characterKey, {
        key: asset.characterKey,
        name: asset.name,
        description: asset.description,
      });
    }
  }
  return {
    version: 1,
    project: meta,
    pages,
    panels,
    layers,
    assets,
    characters: [...characters.values()],
    modelSheets: assets.filter((a) => a.category === "modelsheet"),
    palettes: [],
    selectedPageId,
  };
}

export async function embedAssets(assets: Asset[]): Promise<Asset[]> {
  const out: Asset[] = [];
  for (const asset of assets) {
    if (asset.src.startsWith("idb:")) {
      const data = await idbGet(asset.src.slice(4));
      out.push({ ...asset, src: data ?? "" });
    } else {
      out.push(asset);
    }
  }
  return out;
}

export async function materializeAssets(assets: Asset[]): Promise<{ assets: Asset[]; blobUrls: Record<string, string> }> {
  const blobUrls: Record<string, string> = {};
  const next: Asset[] = [];
  for (const asset of assets) {
    if (asset.src.startsWith("data:")) {
      const id = asset.id || uid("asset");
      await idbSet(id, asset.src);
      blobUrls[id] = asset.src;
      next.push({ ...asset, id, src: `idb:${id}` });
    } else if (asset.src.startsWith("idb:")) {
      const key = asset.src.slice(4);
      const data = await idbGet(key);
      if (data) blobUrls[key] = data;
      next.push(asset);
    } else {
      next.push(asset);
    }
  }
  return { assets: next, blobUrls };
}

export function parseProjectFile(raw: unknown): ProjectFile | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as Partial<ProjectFile>;
  if (!Array.isArray(data.pages) || !Array.isArray(data.panels) || !Array.isArray(data.layers)) return null;
  const assets = Array.isArray(data.assets) ? data.assets : DEMO_ASSETS;
  const project = data.project;
  if (!project || typeof project !== "object" || !project.title) return null;
  return {
    version: 1,
    project: {
      id: project.id || uid("projet"),
      title: project.title,
      subtitle: project.subtitle || "",
      author: project.author || "",
      updatedAt: project.updatedAt || Date.now(),
    },
    pages: data.pages,
    panels: data.panels,
    layers: data.layers,
    assets,
    characters: data.characters ?? [],
    modelSheets: data.modelSheets ?? [],
    palettes: data.palettes ?? [],
    selectedPageId: data.selectedPageId || data.pages[0]?.id || "",
  };
}

export function downloadText(filename: string, text: string, mime = "application/json"): void {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadBlob(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
