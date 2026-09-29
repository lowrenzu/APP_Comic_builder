import { Columns2, Rows2 } from "lucide-react";
import { useProjectStore } from "@/store/projectStore";

export function CanvasToolbar() {
  const zoom = useProjectStore((s) => s.zoom);
  const setZoom = useProjectStore((s) => s.setZoom);
  const split = useProjectStore((s) => s.splitPanel);
  return (
    <div className="pane-head">
      <div className="pane-kicker">Planche</div>
      <div className="row-actions">
        <button type="button" className="btn btn-line" onClick={() => split("h")}>
          <Rows2 size={14} /> Scinder H
        </button>
        <button type="button" className="btn btn-line" onClick={() => split("v")}>
          <Columns2 size={14} /> Scinder V
        </button>
        <label className="field" style={{ width: 110 }}>
          <span>Zoom {Math.round(zoom * 100)}%</span>
          <input
            type="range"
            min={20}
            max={180}
            value={Math.round(zoom * 100)}
            onChange={(e) => setZoom(Number(e.target.value) / 100)}
          />
        </label>
      </div>
    </div>
  );
}
