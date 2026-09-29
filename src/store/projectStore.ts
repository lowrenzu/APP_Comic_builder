import { create } from "zustand";
import { DEMO_ASSETS } from "@/data/demoAssets";
import { createDemoProject } from "@/data/demoProject";
import { bubblePreset } from "@/data/bubbles";
import { sfxPreset } from "@/data/soundEffects";
import { createPanels, pagePresetInfo, pageSize, PRESET_LABEL } from "@/data/templates";
import type {
  Asset,
  AssetCategory,
  BubbleStyle,
  LibraryCategory,
  Layer,
  MaskShape,
  Page,
  PagePreset,
  Panel,
  ProjectMeta,
  ToastItem,
  ToolId,
} from "@/types";
import { FULL_CROP } from "@/utils/cropUtils";
import { FONT_DISPLAY, FONT_UI } from "@/utils/fonts";
import { uid } from "@/utils/ids";
import {
  descendantsOf,
  makeLayer,
  placementFor,
  refitGroups,
  reorderLayer,
  moveLayerBeside,
  nextZ,
  topmostIds,
} from "@/utils/layerUtils";
import { type ProjectFile } from "@/utils/projectSerializer";

interface Snap {
  pages: Page[];
  panels: Panel[];
  layers: Layer[];
}

interface StudioState {
  meta: ProjectMeta;
  pages: Page[];
  panels: Panel[];
  layers: Layer[];
  assets: Asset[];
  blobUrls: Record<string, string>;
  past: Snap[];
  future: Snap[];
  pastLabels: string[];
  futureLabels: string[];
  clipboard: Layer[];
  gesture: Snap | null;
  selectedPageId: string;
  selectedPanelId: string | null;
  selectedLayerIds: string[];
  editingLayerId: string | null;
  tool: ToolId;
  zoom: number;
  libraryCategory: LibraryCategory;
  libraryQuery: string;
  favoritesOnly: boolean;
  libraryTag: string | null;
  recentAssetIds: string[];
  libraryOpen: boolean;
  saveState: "saved" | "dirty";
  readerOpen: boolean;
  readerMode: "album" | "webtoon";
  overviewOpen: boolean;
  importOpen: boolean;
  cropOpen: boolean;
  cloudOpen: boolean;
  aiOpen: boolean;
  mobilePane: "canvas" | "assets" | "layers";
  toasts: ToastItem[];
  toast: (text: string) => void;
  setTool: (tool: ToolId) => void;
  setZoom: (zoom: number) => void;
  setLibraryCategory: (category: LibraryCategory) => void;
  setLibraryQuery: (query: string) => void;
  setFavoritesOnly: (value: boolean) => void;
  setLibraryTag: (tag: string | null) => void;
  noteRecent: (id: string) => void;
  setLibraryOpen: (open: boolean) => void;
  setMobilePane: (pane: "canvas" | "assets" | "layers") => void;
  setReader: (open: boolean, mode?: "album" | "webtoon") => void;
  setOverview: (open: boolean) => void;
  setImportOpen: (open: boolean) => void;
  setCropOpen: (open: boolean) => void;
  setCloudOpen: (open: boolean) => void;
  setAiOpen: (open: boolean) => void;
  setBlobUrls: (urls: Record<string, string>) => void;
  selectPage: (id: string) => void;
  selectPanel: (id: string | null) => void;
  selectLayers: (ids: string[]) => void;
  toggleLayer: (id: string, additive: boolean) => void;
  setEditing: (id: string | null) => void;
  beginGesture: () => void;
  endGesture: () => void;
  patchLayers: (layers: Layer[], mode?: "live" | "commit") => void;
  patchPanels: (panels: Panel[], mode?: "live" | "commit") => void;
  updateMeta: (partial: Partial<ProjectMeta>) => void;
  updatePage: (id: string, partial: Partial<Page>) => void;
  updatePanel: (id: string, partial: Partial<Panel>) => void;
  updateSelectedLayers: (partial: Partial<Layer>) => void;
  renameLayer: (id: string, name: string) => void;
  placeAsset: (assetId: string, panelId: string, at?: { x: number; y: number }) => void;
  replaceLayerAsset: (layerId: string, assetId: string) => void;
  lockBackgrounds: () => void;
  addText: (panelId: string, at: { x: number; y: number }) => void;
  addBubble: (panelId: string, style: BubbleStyle, text?: string, at?: { x: number; y: number }) => void;
  addSfx: (panelId: string, variant: string, at?: { x: number; y: number }) => void;
  deleteSelected: () => void;
  duplicateSelected: () => void;
  copySelected: () => void;
  pasteClipboard: () => void;
  jumpHistory: (pastIndex: number) => void;
  reorderSelected: (dir: "raise" | "lower" | "front" | "back") => void;
  moveLayer: (id: string, targetId: string, place: "above" | "below") => void;
  groupSelected: () => void;
  ungroupSelected: () => void;
  addAsset: (asset: Asset, blobUrl?: string) => void;
  updateAsset: (id: string, partial: Partial<Asset>) => void;
  removeAsset: (id: string) => void;
  addPage: (preset: PagePreset) => void;
  deletePage: (id: string) => void;
  duplicatePage: (id: string) => void;
  reorderPages: (fromId: string, toId: string) => void;
  splitPanel: (dir: "h" | "v") => void;
  duplicatePanel: () => void;
  deletePanel: () => void;
  undo: () => void;
  redo: () => void;
  loadFile: (file: ProjectFile, blobUrls: Record<string, string>) => void;
  resetDemo: () => void;
  newBlank: () => void;
}

function snapOf(s: { pages: Page[]; panels: Panel[]; layers: Layer[] }): Snap {
  return { pages: s.pages, panels: s.panels, layers: s.layers };
}

function loadInitial() {
  const demo = createDemoProject();
  return {
    meta: demo.meta,
    pages: demo.pages,
    panels: demo.panels,
    layers: demo.layers,
    assets: DEMO_ASSETS,
    selectedPageId: demo.pages[0].id,
  };
}

const boot = loadInitial();

function describeChange(
  before: { pages: Page[]; panels: Panel[]; layers: Layer[] },
  after: { pages: Page[]; panels: Panel[]; layers: Layer[] },
): string {
  if (after.pages.length !== before.pages.length) return after.pages.length > before.pages.length ? "Planche ajoutée" : "Planche retirée";
  if (after.panels.length !== before.panels.length) return after.panels.length > before.panels.length ? "Case ajoutée" : "Case retirée";
  if (after.layers.length > before.layers.length) {
    const added = after.layers.find((layer) => !before.layers.some((item) => item.id === layer.id));
    return added ? `Ajouter ${added.name}` : "Ajouter";
  }
  if (after.layers.length < before.layers.length) return "Supprimer";
  const changed = after.layers.find((layer) => {
    const old = before.layers.find((item) => item.id === layer.id);
    if (!old) return false;
    return (
      old.x !== layer.x ||
      old.y !== layer.y ||
      old.w !== layer.w ||
      old.h !== layer.h ||
      old.rotation !== layer.rotation ||
      old.mask !== layer.mask ||
      old.opacity !== layer.opacity ||
      old.text !== layer.text ||
      old.tailLen !== layer.tailLen ||
      old.tailX !== layer.tailX ||
      old.assetId !== layer.assetId ||
      old.locked !== layer.locked ||
      old.crop !== layer.crop
    );
  });
  if (!changed) return "Modifier";
  const old = before.layers.find((item) => item.id === changed.id);
  if (!old) return "Modifier";
  if (old.assetId !== changed.assetId) return `Remplacer ${changed.name}`;
  if (old.mask !== changed.mask) return `Masque ${changed.name}`;
  if (old.x !== changed.x || old.y !== changed.y) return `Déplacer ${changed.name}`;
  if (old.text !== changed.text) return `Texte ${changed.name}`;
  if (old.opacity !== changed.opacity) return `Opacité ${changed.name}`;
  return `Modifier ${changed.name}`;
}

function commitSet(
  set: (partial: Partial<StudioState>) => void,
  get: () => StudioState,
  partial: Partial<StudioState>,
) {
  const s = get();
  if (s.gesture) {
    set({ ...partial, saveState: "dirty" });
    return;
  }
  const label = describeChange(s, {
    pages: partial.pages ?? s.pages,
    panels: partial.panels ?? s.panels,
    layers: partial.layers ?? s.layers,
  });
  set({
    ...partial,
    past: [...s.past, snapOf(s)].slice(-40),
    pastLabels: [...s.pastLabels, label].slice(-40),
    future: [],
    futureLabels: [],
    saveState: "dirty",
  });
}

export const useProjectStore = create<StudioState>((set, get) => ({
  meta: boot.meta,
  pages: boot.pages,
  panels: boot.panels,
  layers: boot.layers,
  assets: boot.assets,
  blobUrls: {},
  past: [],
  future: [],
  pastLabels: [],
  futureLabels: [],
  clipboard: [],
  gesture: null,
  selectedPageId: boot.selectedPageId,
  selectedPanelId: boot.panels.find((p) => p.pageId === boot.selectedPageId)?.id ?? null,
  selectedLayerIds: [],
  editingLayerId: null,
  tool: "select",
  zoom: 0.72,
  libraryCategory: "all",
  libraryQuery: "",
  favoritesOnly: false,
  libraryTag: null,
  recentAssetIds: [],
  libraryOpen: true,
  saveState: "saved",
  readerOpen: false,
  readerMode: "album",
  overviewOpen: false,
  importOpen: false,
  cropOpen: false,
  cloudOpen: false,
  aiOpen: false,
  mobilePane: "canvas",
  toasts: [],

  toast: (text) => {
    const id = uid("toast");
    set((s) => ({ toasts: [...s.toasts, { id, text }].slice(-4) }));
    window.setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 2800);
  },
  setTool: (tool) => {
    const categoryMap: Partial<Record<ToolId, AssetCategory | "all">> = {
      library: "all",
      image: "all",
      character: "character",
      background: "background",
      photo: "photo",
      modelsheet: "modelsheet",
      object: "object",
      effect: "effect",
      bubble: "bubble",
      sfx: "sfx",
    };
    const category = categoryMap[tool];
    set({
      tool,
      libraryCategory: category ?? get().libraryCategory,
      libraryOpen: category ? true : get().libraryOpen,
      cropOpen: get().cropOpen,
      aiOpen: tool === "ai" ? true : get().aiOpen,
      cloudOpen: tool === "cloud" ? true : get().cloudOpen,
      mobilePane: category ? "assets" : get().mobilePane,
    });
    if (tool === "crop") {
      const layer = get().layers.find((l) => l.id === get().selectedLayerIds.at(-1));
      if (!layer || layer.type !== "image") get().toast("Sélectionnez une image à recadrer.");
    }
  },
  setZoom: (zoom) => set({ zoom }),
  setLibraryCategory: (libraryCategory) => set({ libraryCategory }),
  setLibraryQuery: (libraryQuery) => set({ libraryQuery }),
  setFavoritesOnly: (favoritesOnly) => set({ favoritesOnly }),
  setLibraryTag: (libraryTag) => set({ libraryTag }),
  noteRecent: (id) =>
    set((s) => ({ recentAssetIds: [id, ...s.recentAssetIds.filter((x) => x !== id)].slice(0, 10) })),
  setLibraryOpen: (libraryOpen) => set({ libraryOpen }),
  setMobilePane: (mobilePane) => set({ mobilePane }),
  setReader: (readerOpen, mode) => set({ readerOpen, readerMode: mode ?? get().readerMode }),
  setOverview: (overviewOpen) => set({ overviewOpen }),
  setImportOpen: (importOpen) => set({ importOpen }),
  setCropOpen: (cropOpen) => set({ cropOpen }),
  setCloudOpen: (cloudOpen) => set({ cloudOpen }),
  setAiOpen: (aiOpen) => set({ aiOpen }),
  setBlobUrls: (blobUrls) => set({ blobUrls: { ...get().blobUrls, ...blobUrls } }),
  selectPage: (id) => {
    const panel = get().panels.find((p) => p.pageId === id);
    set({ selectedPageId: id, selectedPanelId: panel?.id ?? null, selectedLayerIds: [], editingLayerId: null });
  },
  selectPanel: (id) => set({ selectedPanelId: id, selectedLayerIds: [], editingLayerId: null }),
  selectLayers: (ids) => {
    const layer = get().layers.find((l) => l.id === ids.at(-1));
    set({
      selectedLayerIds: ids,
      selectedPanelId: layer?.panelId ?? get().selectedPanelId,
      editingLayerId: null,
    });
  },
  toggleLayer: (id, additive) => {
    const cur = get().selectedLayerIds;
    const next = additive ? (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]) : [id];
    get().selectLayers(next);
  },
  setEditing: (editingLayerId) => set({ editingLayerId }),
  beginGesture: () => {
    const s = get();
    if (s.gesture) return;
    set({ gesture: snapOf(s) });
  },
  endGesture: () => {
    const s = get();
    if (!s.gesture) return;
    const changed = s.gesture.layers !== s.layers || s.gesture.panels !== s.panels || s.gesture.pages !== s.pages;
    const label = describeChange(s.gesture, s);
    set({
      gesture: null,
      past: changed ? [...s.past, s.gesture].slice(-40) : s.past,
      pastLabels: changed ? [...s.pastLabels, label].slice(-40) : s.pastLabels,
      future: changed ? [] : s.future,
      futureLabels: changed ? [] : s.futureLabels,
      saveState: changed ? "dirty" : s.saveState,
    });
  },
  patchLayers: (layers, mode = "commit") => {
    const fitted = refitGroups(layers);
    if (mode === "live") set({ layers: fitted, saveState: "dirty" });
    else commitSet(set, get, { layers: fitted });
  },
  patchPanels: (panels, mode = "commit") => {
    if (mode === "live") set({ panels, saveState: "dirty" });
    else commitSet(set, get, { panels });
  },
  updateMeta: (partial) => commitSet(set, get, { meta: { ...get().meta, ...partial } }),
  updatePage: (id, partial) => {
    commitSet(set, get, { pages: get().pages.map((p) => (p.id === id ? { ...p, ...partial } : p)) });
  },
  updatePanel: (id, partial) => {
    commitSet(set, get, { panels: get().panels.map((p) => (p.id === id ? { ...p, ...partial } : p)) });
  },
  updateSelectedLayers: (partial) => {
    const ids = new Set(get().selectedLayerIds);
    if (!ids.size) return;
    commitSet(set, get, {
      layers: get().layers.map((l) => (ids.has(l.id) ? { ...l, ...partial } : l)),
    });
  },
  renameLayer: (id, name) => {
    commitSet(set, get, { layers: get().layers.map((l) => (l.id === id ? { ...l, name } : l)) });
  },
  placeAsset: (assetId, panelId, at) => {
    const asset = get().assets.find((a) => a.id === assetId);
    if (!asset) return;
    get().noteRecent(assetId);
    const box = placementFor(asset.category);
    const w = box.w;
    const h = box.h;
    const x = at ? Math.min(96, Math.max(-15, at.x - w / 2)) : box.x;
    const y = at ? Math.min(96, Math.max(-15, at.y - h / 2)) : box.y;
    const layer = makeLayer({
      id: uid("layer"),
      panelId,
      name: asset.viewLabel ? `${asset.name} · ${asset.viewLabel}` : asset.name,
      type: "image",
      assetId: asset.id,
      x,
      y,
      w,
      h,
      z: nextZ(get().layers, panelId),
      blendMode: asset.category === "effect" ? "screen" : asset.category === "texture" ? "multiply" : "normal",
      opacity: asset.category === "texture" ? 0.45 : 1,
    });
    commitSet(set, get, { layers: [...get().layers, layer], selectedPanelId: panelId, selectedLayerIds: [layer.id] });
  },
  replaceLayerAsset: (layerId, assetId) => {
    const asset = get().assets.find((a) => a.id === assetId);
    const layer = get().layers.find((l) => l.id === layerId);
    if (!asset || !layer || layer.locked) return;
    get().noteRecent(assetId);
    commitSet(set, get, {
      layers: get().layers.map((item) =>
        item.id === layerId
          ? {
              ...item,
              type: "image",
              assetId: asset.id,
              name: asset.viewLabel ? `${asset.name} · ${asset.viewLabel}` : asset.name,
            }
          : item,
      ),
      selectedPanelId: layer.panelId,
      selectedLayerIds: [layerId],
    });
    get().toast(asset.category === "background" ? "Décor remplacé." : "Calque remplacé.");
  },
  lockBackgrounds: () => {
    const pageId = get().selectedPageId;
    const panelIds = new Set(get().panels.filter((p) => p.pageId === pageId).map((p) => p.id));
    const backgrounds = new Set(get().assets.filter((a) => a.category === "background").map((a) => a.id));
    const targets = get().layers.filter(
      (l) => l.type === "image" && l.assetId && panelIds.has(l.panelId) && backgrounds.has(l.assetId),
    );
    if (!targets.length) {
      get().toast("Aucun décor sur cette planche.");
      return;
    }
    const lock = targets.some((l) => !l.locked);
    const ids = new Set(targets.map((l) => l.id));
    commitSet(set, get, {
      layers: get().layers.map((l) => (ids.has(l.id) ? { ...l, locked: lock } : l)),
    });
    get().toast(lock ? "Décors verrouillés." : "Décors déverrouillés.");
  },
  addText: (panelId, at) => {
    const layer = makeLayer({
      id: uid("layer"),
      panelId,
      name: "Texte",
      type: "text",
      text: "Texte",
      x: at.x - 16,
      y: at.y - 6,
      w: 36,
      h: 12,
      z: nextZ(get().layers, panelId),
      fontSize: 22,
      fontWeight: 700,
      color: "#1c2128",
    });
    commitSet(set, get, {
      layers: [...get().layers, layer],
      selectedPanelId: panelId,
      selectedLayerIds: [layer.id],
      editingLayerId: layer.id,
      tool: "select",
    });
  },
  addBubble: (panelId, style, text, at) => {
    const preset = bubblePreset(style);
    const x = at ? at.x - 22 : 18;
    const y = at ? at.y - 12 : 8;
    const layer = makeLayer({
      id: uid("layer"),
      panelId,
      name: preset.name,
      type: "bubble",
      bubbleStyle: style,
      text: text ?? preset.sample,
      x,
      y,
      w: 46,
      h: 24,
      z: nextZ(get().layers, panelId),
      fontSize: preset.fontSize ?? 16,
      fontFamily: preset.fontFamily ?? FONT_UI,
      fontWeight: preset.weight ?? 700,
      italic: preset.italic ?? false,
      color: preset.ink,
    });
    commitSet(set, get, {
      layers: [...get().layers, layer],
      selectedPanelId: panelId,
      selectedLayerIds: [layer.id],
      editingLayerId: layer.id,
    });
  },
  addSfx: (panelId, variant, at) => {
    const preset = sfxPreset(variant);
    const layer = makeLayer({
      id: uid("layer"),
      panelId,
      name: preset.text,
      type: "sfx",
      sfxVariant: preset.id,
      text: preset.text,
      color: preset.color,
      x: at ? at.x - 24 : 20,
      y: at ? at.y - 10 : 16,
      w: 50,
      h: 22,
      z: nextZ(get().layers, panelId),
      fontSize: preset.fontSize,
      fontFamily: FONT_DISPLAY,
      rotation: preset.rotation,
    });
    commitSet(set, get, {
      layers: [...get().layers, layer],
      selectedPanelId: panelId,
      selectedLayerIds: [layer.id],
    });
  },
  deleteSelected: () => {
    const ids = new Set(get().selectedLayerIds);
    if (!ids.size) return;
    for (const id of [...ids]) for (const d of descendantsOf(get().layers, id)) ids.add(d.id);
    commitSet(set, get, {
      layers: get().layers.filter((l) => !ids.has(l.id)),
      selectedLayerIds: [],
      editingLayerId: null,
    });
  },
  duplicateSelected: () => {
    const selected = topmostIds(get().layers, get().selectedLayerIds);
    if (!selected.length) return;
    const idMap = new Map<string, string>();
    const sourceIds = new Set<string>();
    for (const id of selected) {
      sourceIds.add(id);
      idMap.set(id, uid("layer"));
      for (const d of descendantsOf(get().layers, id)) {
        sourceIds.add(d.id);
        idMap.set(d.id, uid("layer"));
      }
    }
    const base = [...get().layers];
    const clones = get()
      .layers.filter((l) => sourceIds.has(l.id))
      .map((l) => ({
        ...l,
        id: idMap.get(l.id) ?? uid("layer"),
        parentId: l.parentId && idMap.has(l.parentId) ? idMap.get(l.parentId)! : l.parentId,
        name: `${l.name} copie`,
        x: l.x + 3,
        y: l.y + 3,
      }));
    for (const clone of clones) {
      const max = base
        .filter((l) => l.panelId === clone.panelId && l.parentId === clone.parentId)
        .reduce((m, l) => Math.max(m, l.z), 0);
      clone.z = max + 1;
      base.push(clone);
    }
    commitSet(set, get, {
      layers: refitGroups(base),
      selectedLayerIds: selected.map((id) => idMap.get(id)!),
    });
  },
  copySelected: () => {
    const selected = topmostIds(get().layers, get().selectedLayerIds);
    if (!selected.length) return;
    const ids = new Set<string>();
    for (const id of selected) {
      ids.add(id);
      for (const child of descendantsOf(get().layers, id)) ids.add(child.id);
    }
    set({
      clipboard: get().layers.filter((layer) => ids.has(layer.id)).map((layer) => ({
        ...layer,
        crop: { ...layer.crop },
        mask: layer.mask ? { ...layer.mask, points: layer.mask.points?.map((point) => ({ ...point })) } : null,
      })),
    });
    get().toast("Calques copiés.");
  },
  pasteClipboard: () => {
    const clip = get().clipboard;
    const panelId = get().selectedPanelId;
    if (!clip.length || !panelId) {
      get().toast("Rien à coller.");
      return;
    }
    const idMap = new Map(clip.map((layer) => [layer.id, uid("layer")]));
    const samePanel = clip.some((layer) => layer.panelId === panelId);
    let z = nextZ(get().layers, panelId);
    const clones = clip.map((layer) => {
      const parentInClip = layer.parentId != null && idMap.has(layer.parentId);
      const clone = {
        ...layer,
        id: idMap.get(layer.id) ?? uid("layer"),
        panelId,
        parentId: parentInClip ? idMap.get(layer.parentId!)! : null,
        x: layer.x + (samePanel ? 4 : 0),
        y: layer.y + (samePanel ? 4 : 0),
        z: layer.z,
        crop: { ...layer.crop },
        mask: layer.mask ? { ...layer.mask, points: layer.mask.points?.map((point) => ({ ...point })) } : null,
      };
      if (!parentInClip) {
        clone.z = z;
        z += 1;
      }
      return clone;
    });
    const roots = clip.filter((layer) => !layer.parentId || !idMap.has(layer.parentId)).map((layer) => idMap.get(layer.id)!);
    commitSet(set, get, {
      layers: refitGroups([...get().layers, ...clones]),
      selectedPanelId: panelId,
      selectedLayerIds: roots,
    });
  },
  jumpHistory: (index) => {
    const s = get();
    const target = s.past[index];
    if (!target) return;
    const skipped = s.past.slice(index + 1);
    const skippedLabels = s.pastLabels.slice(index + 1);
    set({
      ...target,
      past: s.past.slice(0, index),
      pastLabels: s.pastLabels.slice(0, index),
      future: [...s.future.slice().reverse(), snapOf(s), ...skipped.slice().reverse()],
      futureLabels: [...s.futureLabels.slice().reverse(), ...skippedLabels.slice().reverse(), s.pastLabels[index] ?? "Étape"],
      saveState: "dirty",
      selectedLayerIds: s.selectedLayerIds.filter((id) => target.layers.some((layer) => layer.id === id)),
    });
  },
  reorderSelected: (dir) => {
    const id = get().selectedLayerIds.at(-1);
    if (!id) return;
    commitSet(set, get, { layers: reorderLayer(get().layers, id, dir) });
  },
  moveLayer: (id, targetId, place) => {
    const next = moveLayerBeside(get().layers, id, targetId, place);
    if (next === get().layers) return;
    commitSet(set, get, { layers: next });
  },
  groupSelected: () => {
    const ids = topmostIds(get().layers, get().selectedLayerIds);
    if (ids.length < 2) {
      get().toast("Sélectionnez au moins deux calques.");
      return;
    }
    const chosen = get().layers.filter((l) => ids.includes(l.id));
    const panelId = chosen[0]?.panelId;
    const parentId = chosen[0]?.parentId ?? null;
    if (!panelId || chosen.some((l) => l.panelId !== panelId || l.parentId !== parentId)) {
      get().toast("Les calques doivent appartenir à la même case.");
      return;
    }
    const id = uid("group");
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const l of chosen) {
      minX = Math.min(minX, l.x);
      minY = Math.min(minY, l.y);
      maxX = Math.max(maxX, l.x + l.w);
      maxY = Math.max(maxY, l.y + l.h);
    }
    const group = makeLayer({
      id,
      panelId,
      parentId,
      name: "Groupe",
      type: "group",
      x: minX,
      y: minY,
      w: maxX - minX,
      h: maxY - minY,
      z: Math.max(...chosen.map((l) => l.z)) + 1,
    });
    const idSet = new Set(ids);
    commitSet(set, get, {
      layers: [...get().layers.map((l) => (idSet.has(l.id) ? { ...l, parentId: id } : l)), group],
      selectedLayerIds: [id],
    });
  },
  ungroupSelected: () => {
    const groups = get().layers.filter((l) => get().selectedLayerIds.includes(l.id) && l.type === "group");
    if (!groups.length) return;
    let layers = get().layers;
    const freed: string[] = [];
    for (const group of groups) {
      layers = layers
        .filter((l) => l.id !== group.id)
        .map((l) => (l.parentId === group.id ? { ...l, parentId: group.parentId } : l));
      freed.push(...get().layers.filter((l) => l.parentId === group.id).map((l) => l.id));
    }
    commitSet(set, get, { layers: refitGroups(layers), selectedLayerIds: freed });
  },
  addAsset: (asset, blobUrl) => {
    set({
      assets: [asset, ...get().assets],
      blobUrls: blobUrl ? { ...get().blobUrls, [asset.src.replace("idb:", "")]: blobUrl } : get().blobUrls,
      saveState: "dirty",
    });
  },
  updateAsset: (id, partial) => {
    set({ assets: get().assets.map((a) => (a.id === id ? { ...a, ...partial } : a)), saveState: "dirty" });
  },
  removeAsset: (id) => {
    set({ assets: get().assets.filter((a) => a.id !== id), saveState: "dirty" });
    get().toast("Asset retiré. Les instances déjà posées restent dans les cases.");
  },
  addPage: (preset) => {
    const size = pageSize(preset);
    const id = uid("page");
    const page: Page = {
      id,
      name: `${String(get().pages.length + 1).padStart(2, "0")} — ${PRESET_LABEL[preset]}`,
      preset,
      background: pagePresetInfo(preset).background,
      width: size.width,
      height: size.height,
    };
    const panels = createPanels(preset, id);
    commitSet(set, get, {
      pages: [...get().pages, page],
      panels: [...get().panels, ...panels],
      selectedPageId: id,
      selectedPanelId: panels[0]?.id ?? null,
      selectedLayerIds: [],
    });
  },
  deletePage: (id) => {
    if (get().pages.length <= 1) {
      get().toast("Le projet doit garder au moins une page.");
      return;
    }
    const panelIds = new Set(get().panels.filter((p) => p.pageId === id).map((p) => p.id));
    const pages = get().pages.filter((p) => p.id !== id);
    const nextId = get().selectedPageId === id ? pages[0].id : get().selectedPageId;
    commitSet(set, get, {
      pages,
      panels: get().panels.filter((p) => p.pageId !== id),
      layers: get().layers.filter((l) => !panelIds.has(l.panelId)),
      selectedPageId: nextId,
      selectedPanelId: get().panels.find((p) => p.pageId === nextId && !panelIds.has(p.id))?.id ?? null,
      selectedLayerIds: [],
    });
  },
  duplicatePage: (id) => {
    const page = get().pages.find((p) => p.id === id);
    if (!page) return;
    const pageId = uid("page");
    const panelMap = new Map<string, string>();
    const panels = get()
      .panels.filter((p) => p.pageId === id)
      .map((p) => {
        const nid = uid("panel");
        panelMap.set(p.id, nid);
        return { ...p, id: nid, pageId };
      });
    const layerMap = new Map<string, string>();
    const source = get().layers.filter((l) => panelMap.has(l.panelId));
    for (const layer of source) layerMap.set(layer.id, uid("layer"));
    const layers = source.map((l) => ({
      ...l,
      id: layerMap.get(l.id)!,
      panelId: panelMap.get(l.panelId)!,
      parentId: l.parentId ? (layerMap.get(l.parentId) ?? null) : null,
    }));
    const idx = get().pages.findIndex((p) => p.id === id);
    const pages = [...get().pages];
    pages.splice(idx + 1, 0, { ...page, id: pageId, name: `${page.name} copie` });
    commitSet(set, get, {
      pages,
      panels: [...get().panels, ...panels],
      layers: [...get().layers, ...layers],
      selectedPageId: pageId,
      selectedPanelId: panels[0]?.id ?? null,
      selectedLayerIds: [],
    });
  },
  reorderPages: (fromId, toId) => {
    if (fromId === toId) return;
    const pages = [...get().pages];
    const from = pages.findIndex((p) => p.id === fromId);
    const to = pages.findIndex((p) => p.id === toId);
    if (from < 0 || to < 0) return;
    const [item] = pages.splice(from, 1);
    pages.splice(to, 0, item);
    commitSet(set, get, { pages });
  },
  splitPanel: (dir) => {
    const panel = get().panels.find((p) => p.id === get().selectedPanelId);
    if (!panel) {
      get().toast("Sélectionnez une case à scinder.");
      return;
    }
    const gap = 1.4;
    if ((dir === "h" && panel.h < 12) || (dir === "v" && panel.w < 12)) {
      get().toast("La case est trop petite pour être scindée.");
      return;
    }
    const id = uid("panel");
    let updated = panel;
    let created: Panel;
    if (dir === "h") {
      const h = (panel.h - gap) / 2;
      updated = { ...panel, h };
      created = { ...panel, id, y: panel.y + h + gap, h };
    } else {
      const w = (panel.w - gap) / 2;
      updated = { ...panel, w };
      created = { ...panel, id, x: panel.x + w + gap, w };
    }
    commitSet(set, get, {
      panels: [...get().panels.map((p) => (p.id === panel.id ? updated : p)), created],
      selectedPanelId: panel.id,
    });
  },
  duplicatePanel: () => {
    const panel = get().panels.find((p) => p.id === get().selectedPanelId);
    if (!panel) return;
    const id = uid("panel");
    const copy: Panel = { ...panel, id, x: Math.min(panel.x + 3, 70), y: Math.min(panel.y + 3, 70) };
    const map = new Map<string, string>();
    const source = get().layers.filter((l) => l.panelId === panel.id);
    for (const layer of source) map.set(layer.id, uid("layer"));
    const layers = source.map((l) => ({
      ...l,
      id: map.get(l.id)!,
      panelId: id,
      parentId: l.parentId ? (map.get(l.parentId) ?? null) : null,
    }));
    commitSet(set, get, {
      panels: [...get().panels, copy],
      layers: [...get().layers, ...layers],
      selectedPanelId: id,
      selectedLayerIds: [],
    });
  },
  deletePanel: () => {
    const id = get().selectedPanelId;
    if (!id) return;
    const panel = get().panels.find((p) => p.id === id);
    commitSet(set, get, {
      panels: get().panels.filter((p) => p.id !== id),
      layers: get().layers.filter((l) => l.panelId !== id),
      selectedPanelId: get().panels.find((p) => p.pageId === panel?.pageId && p.id !== id)?.id ?? null,
      selectedLayerIds: [],
    });
  },
  undo: () => {
    const s = get();
    const prev = s.past[s.past.length - 1];
    if (!prev) return;
    set({
      ...prev,
      past: s.past.slice(0, -1),
      pastLabels: s.pastLabels.slice(0, -1),
      future: [...s.future, snapOf(s)],
      futureLabels: [...s.futureLabels, s.pastLabels.at(-1) ?? "Étape"],
      saveState: "dirty",
      selectedLayerIds: s.selectedLayerIds.filter((id) => prev.layers.some((l) => l.id === id)),
    });
  },
  redo: () => {
    const s = get();
    const next = s.future[s.future.length - 1];
    if (!next) return;
    set({
      ...next,
      future: s.future.slice(0, -1),
      futureLabels: s.futureLabels.slice(0, -1),
      past: [...s.past, snapOf(s)],
      pastLabels: [...s.pastLabels, s.futureLabels.at(-1) ?? "Étape"],
      saveState: "dirty",
    });
  },
  loadFile: (file, blobUrls) => {
    set({
      meta: file.project,
      pages: file.pages,
      panels: file.panels,
      layers: file.layers,
      assets: file.assets,
      blobUrls: { ...get().blobUrls, ...blobUrls },
      selectedPageId: file.selectedPageId || file.pages[0]?.id,
      selectedPanelId: file.panels.find((p) => p.pageId === (file.selectedPageId || file.pages[0]?.id))?.id ?? null,
      selectedLayerIds: [],
      past: [],
      pastLabels: [],
      future: [],
      futureLabels: [],
      saveState: "dirty",
    });
    get().toast("Projet importé.");
  },
  resetDemo: () => {
    const demo = createDemoProject();
    set({
      meta: demo.meta,
      pages: demo.pages,
      panels: demo.panels,
      layers: demo.layers,
      assets: DEMO_ASSETS,
      selectedPageId: demo.pages[0].id,
      selectedPanelId: demo.panels[0]?.id ?? null,
      selectedLayerIds: [],
      past: [],
      pastLabels: [],
      future: [],
      futureLabels: [],
      saveState: "dirty",
    });
    get().toast("Projet exemple rechargé.");
  },
  newBlank: () => {
    const size = pageSize("franco");
    const id = uid("page");
    const panels = createPanels("franco", id);
    set({
      meta: {
        id: uid("projet"),
        title: "Sans titre",
        subtitle: "",
        author: "",
        updatedAt: Date.now(),
      },
      pages: [
        {
          id,
          name: "01 — Planche",
          preset: "franco",
          background: "#efe6d6",
          width: size.width,
          height: size.height,
        },
      ],
      panels,
      layers: [],
      selectedPageId: id,
      selectedPanelId: panels[0]?.id ?? null,
      selectedLayerIds: [],
      past: [],
      pastLabels: [],
      future: [],
      futureLabels: [],
      saveState: "dirty",
    });
  },
}));

export function primaryLayer(state: StudioState): Layer | undefined {
  const id = state.selectedLayerIds.at(-1);
  return state.layers.find((l) => l.id === id);
}

export const EMPTY_MASK: MaskShape = { type: "rect", x: 0.1, y: 0.1, w: 0.8, h: 0.8 };

export { FULL_CROP };
