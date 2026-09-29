import { BLEND_MODES } from "@/types";
import { primaryLayer, useProjectStore } from "@/store/projectStore";

export function BlendModePanel() {
  const layer = useProjectStore((s) => primaryLayer(s));
  const update = useProjectStore((s) => s.updateSelectedLayers);
  const begin = useProjectStore((s) => s.beginGesture);
  const end = useProjectStore((s) => s.endGesture);
  const patch = useProjectStore((s) => s.patchLayers);
  if (!layer) return null;
  return (
    <div className="prop-block">
      <label className="slider-row">
        <span>Opacité {Math.round(layer.opacity * 100)}%</span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(layer.opacity * 100)}
          onPointerDown={() => begin()}
          onPointerUp={() => end()}
          onChange={(e) => {
            const opacity = Number(e.target.value) / 100;
            const state = useProjectStore.getState();
            const ids = new Set(state.selectedLayerIds);
            patch(
              state.layers.map((l) => (ids.has(l.id) ? { ...l, opacity } : l)),
              state.gesture ? "live" : "commit",
            );
          }}
        />
      </label>
      <label className="field" style={{ marginTop: 8 }}>
        <span>Mode de fusion</span>
        <select value={layer.blendMode} onChange={(e) => update({ blendMode: e.target.value as typeof layer.blendMode })}>
          {BLEND_MODES.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
