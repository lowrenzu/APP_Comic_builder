import { useEffect, useRef } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAssetUrl } from "@/hooks/useAssets";
import { useProjectStore } from "@/store/projectStore";
import type { BubbleStyle, Layer, MaskShape } from "@/types";
import { cropImageStyle, coverImageStyle, maskToClip } from "@/utils/cropUtils";
import { localDelta, resizeBox, snapPosition } from "@/utils/geometry";
import { resolveFont } from "@/utils/fonts";
import { childLayers, isEffectivelyLocked, translateLayers } from "@/utils/layerUtils";

const HANDLES = ["nw", "n", "ne", "e", "se", "s", "sw", "w"] as const;

const SPIKES: Partial<Record<BubbleStyle, { fill: string; stroke: string; points: string }>> = {
  shout: { fill: "#fff4e4", stroke: "#1c2128", points: "100,4 118,28 148,10 142,40 176,36 154,58 196,70 150,78 168,108 128,90 112,116 96,88 60,112 72,82 28,96 52,70 8,62 48,50 22,24 62,36 78,8" },
  scream: { fill: "#ffe4e1", stroke: "#7a1d1d", points: "100,2 122,26 154,6 146,38 186,28 158,52 198,68 152,74 176,112 124,86 108,118 90,86 48,116 64,80 18,98 46,66 4,58 42,46 16,20 58,32 74,4" },
  electric: { fill: "#e5fbff", stroke: "#0e4a5c", points: "100,2 114,34 146,14 132,46 178,40 150,62 196,78 148,82 168,116 118,88 104,118 88,86 46,114 70,78 22,92 48,64 6,54 44,44 24,18 64,30 80,4" },
  boom: { fill: "#fff1d6", stroke: "#1c2128", points: "100,8 112,36 140,22 128,48 164,48 136,64 168,84 132,84 140,112 108,90 100,116 88,90 56,112 66,84 30,86 58,66 28,48 64,50 52,24 84,38" },
  anger: { fill: "#ffd9d4", stroke: "#7a1d1d", points: "100,0 126,22 160,4 148,36 196,30 160,54 198,78 152,78 170,118 116,88 100,120 82,88 28,118 48,78 2,76 40,54 6,28 52,36 42,4 74,22" },
};

function BubbleShape({ style }: { style: BubbleStyle }) {
  const spike = SPIKES[style];
  if (spike) {
    return (
      <svg className="bubble-svg" viewBox="0 0 200 120" preserveAspectRatio="none" aria-hidden>
        <polygon fill={spike.fill} stroke={spike.stroke} strokeWidth="3" vectorEffect="non-scaling-stroke" points={spike.points} />
      </svg>
    );
  }
  return <div className={`bubble-skin ${style}`} aria-hidden />;
}

function MaskOutline({ mask }: { mask: MaskShape }) {
  return (
    <svg className="mask-outline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <MaskShapeView mask={mask} />
    </svg>
  );
}

function MaskShapeView({ mask, fill = "none" }: { mask: MaskShape; fill?: string }) {
  if (mask.type === "ellipse") {
    return (
      <ellipse
        cx={(mask.x + mask.w / 2) * 100}
        cy={(mask.y + mask.h / 2) * 100}
        rx={Math.max(1, (mask.w * 100) / 2)}
        ry={Math.max(1, (mask.h * 100) / 2)}
        fill={fill}
        stroke="#ff9d2e"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    );
  }
  if (mask.type === "free") {
    const points = mask.points ?? [];
    if (points.length < 2) return null;
    const d = points.map((p) => `${p.x * 100},${p.y * 100}`).join(" ");
    return points.length >= 3 ? (
      <polygon points={d} fill={fill} stroke="#ff9d2e" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    ) : (
      <polyline points={d} fill="none" stroke="#ff9d2e" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    );
  }
  return (
    <rect
      x={mask.x * 100}
      y={mask.y * 100}
      width={mask.w * 100}
      height={mask.h * 100}
      fill={fill}
      stroke="#ff9d2e"
      strokeWidth="1.5"
      vectorEffect="non-scaling-stroke"
    />
  );
}

function maskRef(layer: Layer): string {
  return `mf-${layer.id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
}

function SoftMask({ layer }: { layer: Layer }) {
  const mask = layer.mask;
  const feather = mask?.feather ?? 0;
  if (!mask || feather <= 0) return null;
  const id = maskRef(layer);
  const blur = Math.max(0.006, feather / 320);
  const shape =
    mask.type === "ellipse" ? (
      <ellipse cx={mask.x + mask.w / 2} cy={mask.y + mask.h / 2} rx={mask.w / 2} ry={mask.h / 2} fill="white" filter={`url(#${id}-b)`} />
    ) : mask.type === "free" && mask.points && mask.points.length >= 3 ? (
      <polygon points={mask.points.map((point) => `${point.x},${point.y}`).join(" ")} fill="white" filter={`url(#${id}-b)`} />
    ) : (
      <rect x={mask.x} y={mask.y} width={mask.w} height={mask.h} fill="white" filter={`url(#${id}-b)`} />
    );
  return (
    <svg className="feather-svg" width="0" height="0" aria-hidden>
      <defs>
        <filter id={`${id}-b`} primitiveUnits="objectBoundingBox" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation={blur} />
        </filter>
        <mask id={id} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
          {shape}
        </mask>
      </defs>
    </svg>
  );
}

function maskStyle(layer: Layer, clip: string | undefined): CSSProperties {
  if ((layer.mask?.feather ?? 0) > 0) {
    const url = `url(#${maskRef(layer)})`;
    return { mask: url, WebkitMask: url };
  }
  return { clipPath: clip };
}

function useCanvas() {
  return useProjectStore(
    useShallow((s) => ({
      beginGesture: s.beginGesture,
      endGesture: s.endGesture,
      patchLayers: s.patchLayers,
      placeAsset: s.placeAsset,
      addText: s.addText,
      addBubble: s.addBubble,
      addSfx: s.addSfx,
    })),
  );
}

function LayerVisual({ layer, stack }: { layer: Layer; stack: number }) {
  const src = useAssetUrl(layer.assetId);
  const editing = useProjectStore((s) => s.editingLayerId === layer.id);
  const setEditing = useProjectStore((s) => s.setEditing);
  const patchLayers = useProjectStore((s) => s.patchLayers);
  const clip = maskToClip(layer.mask);
  const selected = useProjectStore((s) => s.selectedLayerIds.includes(layer.id));
  const cropping = useProjectStore((s) => s.tool === "crop" && s.selectedLayerIds.includes(layer.id) && layer.type === "image");
  const bright = layer.brightness ?? 1;
  const contrast = layer.contrast ?? 1;
  const grade = bright !== 1 || contrast !== 1 ? `brightness(${bright}) contrast(${contrast})` : "";
  const fullBleed = layer.w >= 98 && layer.h >= 98;
  const partialCrop = layer.crop.x > 0.01 || layer.crop.y > 0.01 || layer.crop.w < 0.98 || layer.crop.h < 0.98;
  const cutout = layer.type === "image" && !fullBleed && layer.blendMode === "normal";
  const common: CSSProperties = {
    position: "absolute",
    left: `${layer.x}%`,
    top: `${layer.y}%`,
    width: `${layer.w}%`,
    height: `${layer.h}%`,
    transform: `rotate(${layer.rotation}deg) scale(${layer.flipH ? -1 : 1}, ${layer.flipV ? -1 : 1})`,
    opacity: layer.opacity,
    mixBlendMode: layer.blendMode,
    zIndex: stack,
    display: layer.visible ? "block" : "none",
    filter: [cutout ? "drop-shadow(0 10px 8px rgba(0,0,0,.38))" : "", grade].filter(Boolean).join(" ") || undefined,
  };
  if (layer.type === "image") {
    const tint = layer.tintAmount ?? 0;
    return (
      <div className="layer-node" style={common} data-layer={layer.id}>
        {cropping && src ? (
          <>
            <img src={src} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "fill", opacity: 0.35 }} />
            <div className="crop-live" style={{ left: `${layer.crop.x * 100}%`, top: `${layer.crop.y * 100}%`, width: `${layer.crop.w * 100}%`, height: `${layer.crop.h * 100}%` }}>
              <img src={src} alt={layer.name} draggable={false} style={cropImageStyle(layer.crop)} />
            </div>
          </>
        ) : (
          <div className="crop-window" style={maskStyle(layer, clip)}>
            <SoftMask layer={layer} />
            {src ? (
              <img
                src={src}
                alt={layer.name}
                draggable={false}
                style={
                  fullBleed
                    ? coverImageStyle(layer.crop)
                    : partialCrop
                      ? cropImageStyle(layer.crop)
                      : { width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom" }
                }
              />
            ) : (
              <div className="hint" style={{ padding: 8 }}>
                {layer.name}
              </div>
            )}
            {tint > 0 ? <div className="tint-wash" style={{ background: layer.tint || "#fff", opacity: tint }} /> : null}
          </div>
        )}
        {selected && layer.mask && !cropping ? <MaskOutline mask={layer.mask} /> : null}
      </div>
    );
  }
  if (layer.type === "bubble") {
    const tailRot = layer.bubbleStyle === "thought" ? 0 : (Math.atan2((layer.tailX ?? 50) - 50, (layer.tailY ?? 100) - 74) * 180) / Math.PI;
    return (
      <div className="layer-node" style={common} data-layer={layer.id}>
        <div
          className="bubble-wrap"
          data-style={layer.bubbleStyle}
          style={{
            ...maskStyle(layer, clip),
            ["--tail-x" as string]: `${layer.tailX ?? (layer.bubbleStyle === "thought" ? 22 : 50)}%`,
            ["--tail-y" as string]: `${layer.tailY ?? (layer.bubbleStyle === "thought" ? 86 : 100)}%`,
            ["--tail-len" as string]: String(layer.tailLen ?? 1),
            ["--tail-rot" as string]: `${tailRot}deg`,
          }}
        >
          <SoftMask layer={layer} />
          <BubbleShape style={layer.bubbleStyle} />
          {editing ? (
            <textarea
              className="inline-edit"
              autoFocus
              defaultValue={layer.text}
              onBlur={(e) => {
                const value = e.target.value;
                patchLayers(
                  useProjectStore.getState().layers.map((item) =>
                    item.id === layer.id ? { ...item, text: value, name: value.slice(0, 24) || "Bulle" } : item,
                  ),
                );
                setEditing(null);
              }}
            />
          ) : (
            <div
              className="bubble-text"
              style={{
                fontFamily: resolveFont(layer.fontFamily),
                fontSize: layer.fontSize,
                fontWeight: layer.fontWeight,
                fontStyle: layer.italic ? "italic" : "normal",
                color: layer.color,
                textAlign: layer.align,
                justifyContent: layer.align === "left" ? "flex-start" : layer.align === "right" ? "flex-end" : "center",
              }}
            >
              {layer.text}
            </div>
          )}
        </div>
        {selected && layer.mask ? <MaskOutline mask={layer.mask} /> : null}
      </div>
    );
  }
  return (
    <div className="layer-node" style={common} data-layer={layer.id}>
      {editing ? (
        <textarea
          className="inline-edit"
          autoFocus
          defaultValue={layer.text}
          onBlur={(e) => {
            const value = e.target.value;
            patchLayers(
              useProjectStore.getState().layers.map((item) =>
                item.id === layer.id ? { ...item, text: value, name: value.slice(0, 24) || layer.name } : item,
              ),
            );
            setEditing(null);
          }}
        />
      ) : (
        <div
          className={layer.type === "sfx" ? "sfx-wrap" : "text-wrap"}
          style={{
            fontFamily: resolveFont(layer.fontFamily, layer.type === "sfx" ? "sfx" : undefined),
            fontSize: layer.fontSize,
            fontWeight: layer.fontWeight,
            fontStyle: layer.italic ? "italic" : "normal",
            color: layer.color,
            textAlign: layer.align,
            justifyContent: layer.align === "left" ? "flex-start" : layer.align === "right" ? "flex-end" : "center",
            ...maskStyle(layer, clip),
          }}
        >
          <SoftMask layer={layer} />
          {layer.text}
        </div>
      )}
      {selected && layer.mask ? <MaskOutline mask={layer.mask} /> : null}
    </div>
  );
}

function Stack({ panelId, parentId }: { panelId: string; parentId: string | null }) {
  const nodes = childLayers(useProjectStore((s) => s.layers), panelId, parentId);
  return (
    <>
      {nodes.map((layer, index) =>
        layer.type === "group" ? (
          <div
            key={layer.id}
            data-layer={layer.id}
            style={{
              position: "absolute",
              inset: 0,
              opacity: layer.visible ? layer.opacity : 0,
              mixBlendMode: layer.blendMode,
              pointerEvents: "none",
              isolation: "isolate",
              zIndex: index + 1,
            }}
          >
            <Stack panelId={panelId} parentId={layer.id} />
          </div>
        ) : (
          <LayerVisual key={layer.id} layer={layer} stack={index + 1} />
        ),
      )}
    </>
  );
}

function PageSheet({ pageId, mode }: { pageId: string; mode: "edit" | "thumb" | "read" }) {
  const page = useProjectStore((s) => s.pages.find((p) => p.id === pageId));
  const panels = useProjectStore((s) => s.panels).filter((p) => p.pageId === pageId);
  const selectedPanelId = useProjectStore((s) => s.selectedPanelId);
  const selectedLayerIds = useProjectStore((s) => s.selectedLayerIds);
  const layers = useProjectStore((s) => s.layers);
  const tool = useProjectStore((s) => s.tool);
  const { beginGesture, endGesture, patchLayers, placeAsset, addText, addBubble, addSfx } = useCanvas();
  if (!page) return null;
  const editable = mode === "edit";
  return (
    <div className="page-sheet" data-mode={mode} style={{ width: page.width, height: page.height, background: page.background }}>
      {panels.map((panel) => {
        const active = editable && panel.id === selectedPanelId;
        const selected = layers.filter((l) => selectedLayerIds.includes(l.id) && l.panelId === panel.id);
        const frame = selected.length === 1 ? selected[0] : null;
        return (
          <div
            key={panel.id}
            className="panel-frame"
            data-active={active ? "true" : "false"}
            style={{
              left: `${panel.x}%`,
              top: `${panel.y}%`,
              width: `${panel.w}%`,
              height: `${panel.h}%`,
              background: panel.fill,
              borderRadius: panel.radius,
              boxShadow: panel.borderWidth ? `inset 0 0 0 ${panel.borderWidth}px ${panel.border}` : undefined,
            }}
            onDragOver={(e) => {
              if (!editable) return;
              e.preventDefault();
            }}
            onDrop={(e) => {
              if (!editable) return;
              e.preventDefault();
              e.stopPropagation();
              const assetId = e.dataTransfer.getData("application/x-atelier-asset");
              const rect = e.currentTarget.getBoundingClientRect();
              const at = { x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 };
              if (assetId) {
                const state = useProjectStore.getState();
                const asset = state.assets.find((item) => item.id === assetId);
                const hits = state.layers
                  .filter(
                    (layer) =>
                      layer.panelId === panel.id &&
                      layer.type === "image" &&
                      !layer.locked &&
                      at.x >= layer.x &&
                      at.y >= layer.y &&
                      at.x <= layer.x + layer.w &&
                      at.y <= layer.y + layer.h,
                  )
                  .sort((a, b) => b.z - a.z);
                let target = hits[0]?.id;
                if (!target && asset?.category === "background") {
                  target = state.layers
                    .filter((layer) => {
                      if (layer.panelId !== panel.id || layer.type !== "image" || layer.locked) return false;
                      return state.assets.find((item) => item.id === layer.assetId)?.category === "background";
                    })
                    .sort((a, b) => a.z - b.z)[0]?.id;
                }
                if (target) state.replaceLayerAsset(target, assetId);
                else placeAsset(assetId, panel.id, at);
              }
              const files = [...e.dataTransfer.files];
              if (files.length) {
                void import("@/utils/importFiles").then(({ importImageFiles }) => importImageFiles(files, "custom", panel.id, at));
              }
              useProjectStore.getState().selectPanel(panel.id);
            }}
            onPointerDown={(e) => {
              if (!editable) return;
              const hit = (e.target as HTMLElement).closest("[data-layer]") as HTMLElement | null;
              if (!hit) {
                const rect = e.currentTarget.getBoundingClientRect();
                const at = { x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 };
                useProjectStore.getState().selectPanel(panel.id);
                if (tool === "text") addText(panel.id, at);
                else if (tool === "bubble") addBubble(panel.id, "classic", "…", at);
                else if (tool === "sfx") addSfx(panel.id, "boom", at);
                return;
              }
              const id = hit.dataset.layer;
              if (!id) return;
              const state = useProjectStore.getState();
              const layer = state.layers.find((l) => l.id === id);
              if (!layer || isEffectivelyLocked(state.layers, layer)) return;
              e.stopPropagation();
              let rootId = id;
              let parent = layer.parentId;
              while (parent) {
                if (state.selectedLayerIds.includes(parent)) {
                  rootId = parent;
                  break;
                }
                parent = state.layers.find((l) => l.id === parent)?.parentId ?? null;
              }
              if (rootId === id) {
                if (e.shiftKey) state.toggleLayer(id, true);
                else if (!state.selectedLayerIds.includes(id)) state.selectLayers([id]);
              }
              if (tool === "crop") return;
              const ids = useProjectStore.getState().selectedLayerIds;
              beginGesture();
              const origin = { x: e.clientX, y: e.clientY, layers: useProjectStore.getState().layers, ids };
              const move = (ev: PointerEvent) => {
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                const dx = ((ev.clientX - origin.x) / rect.width) * 100;
                const dy = ((ev.clientY - origin.y) / rect.height) * 100;
                if (Math.hypot(ev.clientX - origin.x, ev.clientY - origin.y) < 2) return;
                const moved = translateLayers(origin.layers, origin.ids, dx, dy);
                if (ev.altKey) {
                  patchLayers(moved, "live");
                  return;
                }
                const root = moved.find((item) => item.id === ids[0]);
                if (!root) {
                  patchLayers(moved, "live");
                  return;
                }
                const guidesX = [0, 50, 100];
                const guidesY = [0, 50, 100];
                for (const other of origin.layers) {
                  if (other.panelId !== panel.id || ids.includes(other.id)) continue;
                  guidesX.push(other.x, other.x + other.w / 2, other.x + other.w);
                  guidesY.push(other.y, other.y + other.h / 2, other.y + other.h);
                }
                const snapped = snapPosition(root, guidesX, guidesY);
                const extraX = snapped.x - root.x;
                const extraY = snapped.y - root.y;
                patchLayers(Math.abs(extraX) + Math.abs(extraY) < 0.01 ? moved : translateLayers(moved, ids, extraX, extraY), "live");
              };
              const up = () => {
                window.removeEventListener("pointermove", move);
                window.removeEventListener("pointerup", up);
                endGesture();
              };
              window.addEventListener("pointermove", move);
              window.addEventListener("pointerup", up);
            }}
            onDoubleClick={(e) => {
              const id = (e.target as HTMLElement).closest("[data-layer]")?.getAttribute("data-layer");
              if (!id || !editable) return;
              const layer = useProjectStore.getState().layers.find((l) => l.id === id);
              if (layer && (layer.type === "text" || layer.type === "bubble" || layer.type === "sfx")) useProjectStore.getState().setEditing(id);
            }}
          >
            <Stack panelId={panel.id} parentId={null} />
            {panel.halftone ? <div className="halftone" /> : null}
            {editable && frame ? <SelectionBox panelId={panel.id} layer={frame} /> : null}
          </div>
        );
      })}
    </div>
  );
}

function SelectionBox({ panelId, layer }: { panelId: string; layer: Layer }) {
  const ref = useRef<HTMLDivElement>(null);
  const beginGesture = useProjectStore((s) => s.beginGesture);
  const endGesture = useProjectStore((s) => s.endGesture);
  const patchLayers = useProjectStore((s) => s.patchLayers);
  const cropping = useProjectStore((s) => s.tool === "crop" && layer.type === "image");
  const onHandle = (handle: string) => (e: ReactPointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const panel = ref.current?.parentElement;
    if (!panel) return;
    beginGesture();
    const origin = {
      x: e.clientX,
      y: e.clientY,
      layers: useProjectStore.getState().layers,
      box: { x: layer.x, y: layer.y, w: layer.w, h: layer.h },
      fontSize: layer.fontSize,
    };
    const move = (ev: PointerEvent) => {
      const rect = panel.getBoundingClientRect();
      const dxPct = ((ev.clientX - origin.x) / rect.width) * 100;
      const dyPct = ((ev.clientY - origin.y) / rect.height) * 100;
      if (handle === "rot") {
        const cx = origin.box.x + origin.box.w / 2;
        const cy = origin.box.y + origin.box.h / 2;
        const a0 = Math.atan2(origin.y - (rect.top + (cy / 100) * rect.height), origin.x - (rect.left + (cx / 100) * rect.width));
        const a1 = Math.atan2(ev.clientY - (rect.top + (cy / 100) * rect.height), ev.clientX - (rect.left + (cx / 100) * rect.width));
        const rotation = layer.rotation + ((a1 - a0) * 180) / Math.PI;
        patchLayers(origin.layers.map((l) => (l.id === layer.id ? { ...l, rotation } : l)), "live");
        return;
      }
      const local = localDelta(dxPct, dyPct, rect.width, rect.height, layer.rotation);
      const aspect = origin.box.h === 0 ? 1 : origin.box.w / origin.box.h;
      const box = resizeBox(origin.box, handle, local.dx, local.dy, ev.shiftKey, aspect);
      const scale = origin.box.h ? box.h / origin.box.h : 1;
      if (layer.type === "group") {
        const sx = box.w / origin.box.w;
        const sy = box.h / origin.box.h;
        const kids = new Set(origin.layers.filter((l) => l.parentId === layer.id).map((l) => l.id));
        let grew = true;
        while (grew) {
          grew = false;
          for (const item of origin.layers) {
            if (item.parentId && kids.has(item.parentId) && !kids.has(item.id)) {
              kids.add(item.id);
              grew = true;
            }
          }
        }
        patchLayers(
          origin.layers.map((l) => {
            if (l.id === layer.id) return { ...l, ...box };
            if (!kids.has(l.id)) return l;
            return {
              ...l,
              x: box.x + (l.x - origin.box.x) * sx,
              y: box.y + (l.y - origin.box.y) * sy,
              w: Math.max(1, l.w * sx),
              h: Math.max(1, l.h * sy),
            };
          }),
          "live",
        );
        return;
      }
      patchLayers(
        origin.layers.map((l) =>
          l.id === layer.id
            ? { ...l, ...box, fontSize: l.type === "image" || l.type === "group" ? l.fontSize : Math.max(8, Math.round(origin.fontSize * scale)) }
            : l,
        ),
        "live",
      );
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      endGesture();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const dragFraction = (apply: (dx: number, dy: number) => void) => (e: ReactPointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const panel = ref.current?.parentElement;
    if (!panel) return;
    beginGesture();
    const origin = { x: e.clientX, y: e.clientY };
    const move = (ev: PointerEvent) => {
      const rect = panel.getBoundingClientRect();
      const local = localDelta(((ev.clientX - origin.x) / rect.width) * 100, ((ev.clientY - origin.y) / rect.height) * 100, rect.width, rect.height, layer.rotation);
      apply(local.dx / Math.max(1, layer.w), local.dy / Math.max(1, layer.h));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      endGesture();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const write = (partial: Partial<Layer>, mode: "live" | "commit") => {
    patchLayers(
      useProjectStore.getState().layers.map((item) => (item.id === layer.id ? { ...item, ...partial } : item)),
      mode,
    );
  };
  const pos: Record<string, CSSProperties> = {
    nw: { left: "0%", top: "0%" },
    n: { left: "50%", top: "0%" },
    ne: { left: "100%", top: "0%" },
    e: { left: "100%", top: "50%" },
    se: { left: "100%", top: "100%" },
    s: { left: "50%", top: "100%" },
    sw: { left: "0%", top: "100%" },
    w: { left: "0%", top: "50%" },
  };
  const tailed = layer.type === "bubble" && ["classic", "double", "square", "rounded", "tech", "thought"].includes(layer.bubbleStyle);
  const tailX = layer.tailX ?? (layer.bubbleStyle === "thought" ? 22 : 50);
  const tailY = layer.tailY ?? (layer.bubbleStyle === "thought" ? 86 : 100);
  const mask = layer.mask;
  return (
    <div
      ref={ref}
      className="sel-frame"
      data-panel={panelId}
      style={{ left: `${layer.x}%`, top: `${layer.y}%`, width: `${layer.w}%`, height: `${layer.h}%`, transform: `rotate(${layer.rotation}deg)` }}
    >
      {cropping ? (
        <div
          className="crop-frame"
          style={{ left: `${layer.crop.x * 100}%`, top: `${layer.crop.y * 100}%`, width: `${layer.crop.w * 100}%`, height: `${layer.crop.h * 100}%` }}
          onPointerDown={dragFraction((dx, dy) => {
            const crop = layer.crop;
            write({ crop: { ...crop, x: Math.min(1 - crop.w, Math.max(0, crop.x + dx)), y: Math.min(1 - crop.h, Math.max(0, crop.y + dy)) } }, "live");
          })}
        >
          <i
            className="handle"
            style={{ left: "100%", top: "100%" }}
            onPointerDown={dragFraction((dx, dy) => {
              const crop = layer.crop;
              write({ crop: { ...crop, w: Math.min(1 - crop.x, Math.max(0.08, crop.w + dx)), h: Math.min(1 - crop.y, Math.max(0.08, crop.h + dy)) } }, "live");
            })}
          />
        </div>
      ) : (
        <>
          {HANDLES.map((handle) => (
            <i key={handle} className="handle" style={pos[handle]} onPointerDown={onHandle(handle)} />
          ))}
          <i className="handle handle-rot" style={{ left: "50%", top: "-16px" }} onPointerDown={onHandle("rot")} />
          {mask && mask.type !== "free" ? (
            <div
              className="mask-frame"
              data-round={mask.type === "ellipse" ? "true" : "false"}
              style={{ left: `${mask.x * 100}%`, top: `${mask.y * 100}%`, width: `${mask.w * 100}%`, height: `${mask.h * 100}%` }}
              onPointerDown={dragFraction((dx, dy) => {
                write({ mask: { ...mask, x: Math.min(1 - mask.w, Math.max(0, mask.x + dx)), y: Math.min(1 - mask.h, Math.max(0, mask.y + dy)) } }, "live");
              })}
            >
              <i
                className="handle"
                style={{ left: "100%", top: "100%" }}
                onPointerDown={dragFraction((dx, dy) => {
                  write({ mask: { ...mask, w: Math.min(1 - mask.x, Math.max(0.05, mask.w + dx)), h: Math.min(1 - mask.y, Math.max(0.05, mask.h + dy)) } }, "live");
                })}
              />
            </div>
          ) : null}
          {mask?.type === "free"
            ? (mask.points ?? []).map((point, index) => (
                <i
                  key={index}
                  className="handle"
                  style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}
                  onPointerDown={dragFraction((dx, dy) => {
                    const points = (mask.points ?? []).map((p, i) =>
                      i === index ? { x: Math.min(1, Math.max(0, p.x + dx)), y: Math.min(1, Math.max(0, p.y + dy)) } : p,
                    );
                    write({ mask: { ...mask, points } }, "live");
                  })}
                />
              ))
            : null}
          {tailed ? (
            <i
              className="handle handle-tail"
              title="Pointer la queue"
              style={{ left: `${tailX}%`, top: `${tailY}%` }}
              onPointerDown={dragFraction((dx, dy) => {
                const nextX = Math.min(140, Math.max(-20, tailX + dx * 100));
                const nextY = Math.min(140, Math.max(-20, tailY + dy * 100));
                write(
                  { tailX: nextX, tailY: nextY, tailLen: Math.min(2.8, Math.max(0.35, Math.hypot(nextX - 50, nextY - 74) / 32)) },
                  "live",
                );
              })}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

export function ComicCanvas() {
  const pageId = useProjectStore((s) => s.selectedPageId);
  const page = useProjectStore((s) => s.pages.find((p) => p.id === pageId));
  const zoom = useProjectStore((s) => s.zoom);
  const setZoom = useProjectStore((s) => s.setZoom);
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const current = useProjectStore.getState().zoom;
      setZoom(Math.max(0.15, Math.min(2.6, current * (e.deltaY > 0 ? 0.94 : 1.06))));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [setZoom]);
  useEffect(() => {
    const el = scroller.current;
    if (!el || !page) return;
    const fit = Math.min((el.clientWidth - 48) / page.width, (el.clientHeight - 48) / page.height);
    if (Number.isFinite(fit) && fit > 0) setZoom(Math.max(0.2, Math.min(fit, 1.25)));
  }, [pageId, page, setZoom]);
  if (!page) return null;
  return (
    <div className="stage-scroll" ref={scroller}>
      <div className="stage-center">
        <div style={{ width: page.width * zoom, height: page.height * zoom }}>
          <div style={{ width: page.width, height: page.height, transform: `scale(${zoom})`, transformOrigin: "top left" }}>
            <PageSheet pageId={page.id} mode="edit" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { PageSheet };
