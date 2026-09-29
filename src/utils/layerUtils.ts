import type { AssetCategory, Layer } from "@/types";
import { FONT_UI } from "@/utils/fonts";
import { FULL_CROP } from "@/utils/cropUtils";
import { boundsOf, type Box } from "@/utils/geometry";

export function makeLayer(
  partial: Partial<Layer> &
    Pick<Layer, "id" | "panelId" | "name" | "type" | "x" | "y" | "w" | "h" | "z">,
): Layer {
  return {
    parentId: null,
    visible: true,
    locked: false,
    opacity: 1,
    blendMode: "normal",
    rotation: 0,
    flipH: false,
    flipV: false,
    crop: { ...FULL_CROP },
    mask: null,
    text: "",
    fontFamily: FONT_UI,
    fontSize: 20,
    fontWeight: 500,
    italic: false,
    color: "#1c2128",
    align: "center",
    bubbleStyle: "classic",
    sfxVariant: "boom",
    ...partial,
  };
}

export function childLayers(layers: Layer[], panelId: string, parentId: string | null): Layer[] {
  return layers
    .filter((l) => l.panelId === panelId && l.parentId === parentId)
    .sort((a, b) => a.z - b.z || a.id.localeCompare(b.id));
}

export function nextZ(layers: Layer[], panelId: string, parentId: string | null = null): number {
  return (
    layers.reduce((max, layer) => (layer.panelId === panelId && layer.parentId === parentId ? Math.max(max, layer.z) : max), 0) + 1
  );
}
export function siblingIds(layers: Layer[], panelId: string, parentId: string | null): string[] {
  return childLayers(layers, panelId, parentId).map((layer) => layer.id);
}

/** Rewrite one sibling group to z = 1…n (1 = back). Other groups stay untouched. */
export function withSiblingOrder(
  layers: Layer[],
  panelId: string,
  parentId: string | null,
  orderedIds: string[],
): Layer[] {
  const rank = new Map(orderedIds.map((id, index) => [id, index + 1]));
  let changed = false;
  const next = layers.map((layer) => {
    if (layer.panelId !== panelId || layer.parentId !== parentId) return layer;
    const z = rank.get(layer.id);
    if (z == null || z === layer.z) return layer;
    changed = true;
    return { ...layer, z };
  });
  return changed ? next : layers;
}

export function descendantsOf(layers: Layer[], id: string): Layer[] {
  const out: Layer[] = [];
  const walk = (pid: string) => {
    for (const layer of layers) {
      if (layer.parentId === pid) {
        out.push(layer);
        walk(layer.id);
      }
    }
  };
  walk(id);
  return out;
}

export function isEffectivelyLocked(layers: Layer[], layer: Layer): boolean {
  if (layer.locked) return true;
  const byId = new Map(layers.map((l) => [l.id, l]));
  let pid = layer.parentId;
  while (pid) {
    const parent = byId.get(pid);
    if (!parent) break;
    if (parent.locked) return true;
    pid = parent.parentId;
  }
  return false;
}

export function topmostIds(layers: Layer[], ids: string[]): string[] {
  const set = new Set(ids);
  const byId = new Map(layers.map((l) => [l.id, l]));
  return ids.filter((id) => {
    let pid = byId.get(id)?.parentId ?? null;
    while (pid) {
      if (set.has(pid)) return false;
      pid = byId.get(pid)?.parentId ?? null;
    }
    return true;
  });
}

export function refitGroups(layers: Layer[]): Layer[] {
  let next = layers;
  for (let pass = 0; pass < 4; pass += 1) {
    next = next.map((layer) => {
      if (layer.type !== "group") return layer;
      const kids = next.filter((l) => l.parentId === layer.id);
      if (!kids.length) return layer;
      return { ...layer, ...boundsOf(kids) };
    });
  }
  return next;
}

export function translateLayers(layers: Layer[], ids: string[], dx: number, dy: number): Layer[] {
  const roots = topmostIds(layers, ids);
  const move = new Set<string>();
  for (const id of roots) {
    const desc = descendantsOf(layers, id);
    if (desc.length) {
      for (const d of desc) move.add(d.id);
      const self = layers.find((l) => l.id === id);
      if (self && self.type !== "group") move.add(id);
    } else {
      move.add(id);
    }
  }
  const moved = layers.map((layer) =>
    move.has(layer.id) ? { ...layer, x: layer.x + dx, y: layer.y + dy } : layer,
  );
  return refitGroups(moved);
}

export function placementFor(category: AssetCategory): Box {
  switch (category) {
    case "background":
    case "photo":
    case "texture":
      return { x: 0, y: 0, w: 100, h: 100 };
    case "character":
      return { x: 30, y: 6, w: 34, h: 88 };
    case "modelsheet":
      return { x: 6, y: 16, w: 88, h: 68 };
    case "effect":
      return { x: 18, y: 12, w: 58, h: 58 };
    case "vehicle":
      return { x: 4, y: 46, w: 90, h: 40 };
    default:
      return { x: 28, y: 28, w: 40, h: 40 };
  }
}

export function reorderLayer(
  layers: Layer[],
  id: string,
  dir: "raise" | "lower" | "front" | "back",
): Layer[] {
  const layer = layers.find((l) => l.id === id);
  if (!layer) return layers;
  const ids = siblingIds(layers, layer.panelId, layer.parentId);
  const idx = ids.indexOf(id);
  if (idx < 0) return layers;
  const next = ids.slice();
  if (dir === "raise" && idx < next.length - 1) {
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
  } else if (dir === "lower" && idx > 0) {
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
  } else if (dir === "front") {
    next.splice(idx, 1);
    next.push(id);
  } else if (dir === "back") {
    next.splice(idx, 1);
    next.unshift(id);
  } else {
    return layers;
  }
  return withSiblingOrder(layers, layer.panelId, layer.parentId, next);
}

/** `above` = in front of the target (higher in the calques list). Same parent only. */
export function moveLayerBeside(
  layers: Layer[],
  id: string,
  targetId: string,
  place: "above" | "below",
): Layer[] {
  if (id === targetId) return layers;
  const layer = layers.find((l) => l.id === id);
  const target = layers.find((l) => l.id === targetId);
  if (!layer || !target) return layers;
  if (layer.panelId !== target.panelId || layer.parentId !== target.parentId) return layers;
  const ids = siblingIds(layers, layer.panelId, layer.parentId).filter((sid) => sid !== id);
  const at = ids.indexOf(targetId);
  if (at < 0) return layers;
  ids.splice(place === "above" ? at + 1 : at, 0, id);
  return withSiblingOrder(layers, layer.panelId, layer.parentId, ids);
}
