import type { PointerEvent as ReactPointerEvent } from "react";
import { useAssetUrl } from "@/hooks/useAssets";
import { primaryLayer, useProjectStore } from "@/store/projectStore";
import type { Layer, MaskShape } from "@/types";

const PRESETS: { id: string; label: string; mask: MaskShape }[] = [
  { id: "vignette", label: "Vignette", mask: { type: "ellipse", x: 0.08, y: 0.08, w: 0.84, h: 0.84 } },
  { id: "portrait", label: "Portrait", mask: { type: "ellipse", x: 0.2, y: 0.04, w: 0.6, h: 0.92 } },
  { id: "bandeau", label: "Bandeau", mask: { type: "rect", x: 0, y: 0.34, w: 1, h: 0.32 } },
  { id: "coin", label: "Coin", mask: { type: "rect", x: 0, y: 0, w: 0.55, h: 0.55 } },
];

export function MaskPanel() {
  const layer = useProjectStore((s) => primaryLayer(s));
  const update = useProjectStore((s) => s.updateSelectedLayers);
  if (!layer || layer.type === "group") return null;
  const mask = layer.mask;
  const setMask = (next: MaskShape | null) => update({ mask: next });

  return (
    <div className="prop-block">
      <div className="pane-kicker">Masque vectoriel</div>
      <p className="hint">
        Forme tracée sur le cadre du calque. L’intérieur reste visible, l’extérieur est caché. L’image n’est pas recadrée.
      </p>
      <div className="seg" style={{ marginTop: 8 }}>
        <button type="button" data-on={!mask ? "true" : "false"} onClick={() => setMask(null)}>
          Aucun
        </button>
        {(["rect", "ellipse", "free"] as const).map((type) => (
          <button
            key={type}
            type="button"
            data-on={mask?.type === type ? "true" : "false"}
            onClick={() =>
              setMask({
                type,
                x: mask?.x ?? 0.1,
                y: mask?.y ?? 0.1,
                w: mask?.w ?? 0.8,
                h: mask?.h ?? 0.8,
                points: type === "free" ? mask?.points ?? [] : undefined,
                feather: mask?.feather,
              })
            }
          >
            {type === "rect" ? "Rectangle" : type === "ellipse" ? "Ellipse" : "Libre"}
          </button>
        ))}
      </div>
      <MaskStage layer={layer} />
      <div className="mask-legend">
        <i />
        <span>Zone visible</span>
        <b />
        <span>Zone masquée</span>
      </div>
      {mask ? (
        <label className="field" style={{ marginTop: 8 }}>
          <span>Contour {mask.feather ?? 0}</span>
          <input
            type="range"
            min={0}
            max={24}
            value={mask.feather ?? 0}
            onChange={(e) => setMask({ ...mask, feather: Number(e.target.value) })}
          />
        </label>
      ) : null}
      <div className="row-actions">
        {PRESETS.map((preset) => (
          <button key={preset.id} type="button" className="btn btn-line" onClick={() => setMask(preset.mask)}>
            {preset.label}
          </button>
        ))}
      </div>
      {mask && mask.type !== "free" ? (
        <div className="prop-grid" style={{ marginTop: 8 }}>
          {(
            [
              ["x", "Gauche"],
              ["y", "Haut"],
              ["w", "Largeur"],
              ["h", "Hauteur"],
            ] as const
          ).map(([key, label]) => (
            <label className="field" key={key}>
              <span>{label}</span>
              <input
                type="number"
                min={0}
                max={100}
                value={Math.round(mask[key] * 100)}
                onChange={(e) => setMask({ ...mask, [key]: clamp01(Number(e.target.value) / 100) })}
              />
            </label>
          ))}
        </div>
      ) : null}
      {mask?.type === "free" ? (
        <div className="row-actions" style={{ marginTop: 8 }}>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => setMask({ ...mask, points: (mask.points ?? []).slice(0, -1) })}
          >
            Retirer le dernier point
          </button>
          <button type="button" className="btn btn-line" onClick={() => setMask({ ...mask, points: [] })}>
            Effacer
          </button>
        </div>
      ) : null}
      {mask ? (
        <p className="hint">
          {mask.type === "free"
            ? `${mask.points?.length ?? 0} points. Cliquez le cadre pour en ajouter, glissez un point pour le déplacer. Trois points ferment la forme.`
            : "Glissez la forme pour la déplacer, le coin pour la redimensionner. Valeurs en % du cadre."}
        </p>
      ) : (
        <p className="hint">Aucun masque : le calque est entièrement visible. Le recadrage, lui, choisit une portion de la photo.</p>
      )}
    </div>
  );
}

export function MaskOutline({ mask }: { mask: MaskShape }) {
  return (
    <svg className="mask-outline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <MaskShapeView mask={mask} />
    </svg>
  );
}

function MaskStage({ layer }: { layer: Layer }) {
  const src = useAssetUrl(layer.type === "image" ? layer.assetId : undefined);
  const mask = layer.mask;

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!mask || event.button !== 0) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const point = (ev: { clientX: number; clientY: number }) => ({
      x: clamp01((ev.clientX - bounds.left) / bounds.width),
      y: clamp01((ev.clientY - bounds.top) / bounds.height),
    });
    const start = point(event);
    const origin = mask;
    if (mask.type === "free") {
      const points = mask.points ?? [];
      const index = points.findIndex((p) => Math.hypot(p.x - start.x, p.y - start.y) < 0.045);
      if (index < 0) {
        writeMask(layer.id, { ...mask, points: [...points, start] }, "commit");
        return;
      }
      drag((ev) => {
        const next = point(ev);
        const copy = points.map((p, i) => (i === index ? next : p));
        writeMask(layer.id, { ...origin, points: copy }, "live");
      });
      return;
    }
    const resizing = nearCorner(mask, start);
    if (!resizing && !inside(mask, start)) return;
    drag((ev) => {
      const now = point(ev);
      const dx = now.x - start.x;
      const dy = now.y - start.y;
      if (resizing) {
        writeMask(
          layer.id,
          {
            ...origin,
            w: clamp(origin.w + dx, 0.05, 1 - origin.x),
            h: clamp(origin.h + dy, 0.05, 1 - origin.y),
          },
          "live",
        );
        return;
      }
      writeMask(
        layer.id,
        {
          ...origin,
          x: clamp(origin.x + dx, 0, 1 - origin.w),
          y: clamp(origin.y + dy, 0, 1 - origin.h),
        },
        "live",
      );
    });
  };

  return (
    <div className="mask-stage checker" onPointerDown={onPointerDown}>
      {src ? <img src={src} alt="" /> : <span className="mask-frame-label">{layer.name}</span>}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect width="100" height="100" fill="rgba(9,13,18,0.55)" />
        {mask ? (
          <g>
            <MaskShapeView mask={mask} fill="rgba(255,157,46,0.28)" />
            {mask.type !== "free" ? (
              <rect
                x={(mask.x + mask.w) * 100 - 1.6}
                y={(mask.y + mask.h) * 100 - 1.6}
                width="3.2"
                height="3.2"
                fill="#ffb84d"
                stroke="#1c2128"
                strokeWidth="0.4"
              />
            ) : (
              (mask.points ?? []).map((p, i) => <circle key={i} cx={p.x * 100} cy={p.y * 100} r="1.8" fill="#ffb84d" />)
            )}
          </g>
        ) : null}
      </svg>
    </div>
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

function drag(move: (ev: PointerEvent) => void) {
  useProjectStore.getState().beginGesture();
  const onMove = (ev: PointerEvent) => move(ev);
  const onUp = () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    useProjectStore.getState().endGesture();
  };
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
}

function writeMask(id: string, mask: MaskShape, mode: "live" | "commit") {
  const state = useProjectStore.getState();
  state.patchLayers(
    state.layers.map((layer) => (layer.id === id ? { ...layer, mask } : layer)),
    mode,
  );
}

function inside(mask: MaskShape, p: { x: number; y: number }) {
  if (mask.type === "ellipse") {
    const rx = Math.max(0.02, mask.w / 2);
    const ry = Math.max(0.02, mask.h / 2);
    const nx = (p.x - (mask.x + mask.w / 2)) / rx;
    const ny = (p.y - (mask.y + mask.h / 2)) / ry;
    return nx * nx + ny * ny <= 1;
  }
  return p.x >= mask.x && p.y >= mask.y && p.x <= mask.x + mask.w && p.y <= mask.y + mask.h;
}

function nearCorner(mask: MaskShape, p: { x: number; y: number }) {
  return Math.hypot(p.x - (mask.x + mask.w), p.y - (mask.y + mask.h)) < 0.06;
}

function clamp01(n: number) {
  return clamp(Number.isFinite(n) ? n : 0, 0, 1);
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
