import { FlipHorizontal2, FlipVertical2 } from "lucide-react";
import { useProjectStore, primaryLayer } from "@/store/projectStore";

export function TransformPanel() {
  const layer = useProjectStore((s) => primaryLayer(s));
  const update = useProjectStore((s) => s.updateSelectedLayers);
  if (!layer) return null;
  const num = (key: "x" | "y" | "w" | "h" | "rotation", label: string) => (
    <label className="field" key={key}>
      <span>{label}</span>
      <input
        type="number"
        value={Math.round(layer[key] * 10) / 10}
        onChange={(e) => update({ [key]: Number(e.target.value) })}
      />
    </label>
  );
  return (
    <div className="prop-block">
      <div className="pane-kicker">Transformation</div>
      <div className="prop-grid">
        {num("x", "X")}
        {num("y", "Y")}
        {num("w", "Largeur")}
        {num("h", "Hauteur")}
        {num("rotation", "Rotation")}
      </div>
      <div className="row-actions" style={{ marginTop: 8 }}>
        <button type="button" className="btn btn-line" onClick={() => update({ x: 0 })}>Gauche</button>
        <button type="button" className="btn btn-line" onClick={() => update({ x: (100 - layer.w) / 2 })}>Centre</button>
        <button type="button" className="btn btn-line" onClick={() => update({ x: 100 - layer.w })}>Droite</button>
        <button type="button" className="btn btn-line" onClick={() => update({ y: 0 })}>Haut</button>
        <button type="button" className="btn btn-line" onClick={() => update({ y: (100 - layer.h) / 2 })}>Milieu</button>
        <button type="button" className="btn btn-line" onClick={() => update({ y: 100 - layer.h })}>Bas</button>
      </div>
      <div className="row-actions" style={{ marginTop: 8 }}>
        <button type="button" className="btn btn-line" onClick={() => update({ flipH: !layer.flipH })}>
          <FlipHorizontal2 size={14} /> Horizontal
        </button>
        <button type="button" className="btn btn-line" onClick={() => update({ flipV: !layer.flipV })}>
          <FlipVertical2 size={14} /> Vertical
        </button>
      </div>
    </div>
  );
}
