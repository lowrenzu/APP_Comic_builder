import { useRef } from "react";
import { primaryLayer, useProjectStore } from "@/store/projectStore";
import { useAssetUrl } from "@/hooks/useAssets";
import { resolveSrc } from "@/utils/assetUtils";
import { FULL_CROP } from "@/utils/cropUtils";
import { idbSet, readFileAsDataUrl } from "@/utils/idb";
import { uid } from "@/utils/ids";

export function ImageLayerPanel() {
  const layer = useProjectStore((s) => primaryLayer(s));
  const src = useAssetUrl(layer?.type === "image" ? layer.assetId : undefined);
  const input = useRef<HTMLInputElement>(null);
  if (!layer || layer.type !== "image") return null;

  return (
    <div className="prop-block">
      <div className="pane-kicker">Image</div>
      <div className="image-preview checker">
        {src ? <img src={src} alt="" /> : <span className="hint">Source manquante</span>}
      </div>
      <div className="row-actions" style={{ marginTop: 8 }}>
        <button type="button" className="btn btn-line" onClick={() => fit("contain")}>
          Ajuster
        </button>
        <button type="button" className="btn btn-line" onClick={() => fit("cover")}>
          Remplir
        </button>
        <button type="button" className="btn btn-line" onClick={() => fit("fill")}>
          Étirer
        </button>
        <button
          type="button"
          className="btn btn-line"
          onClick={() =>
            useProjectStore.getState().updateSelectedLayers({
              x: (100 - layer.w) / 2,
              y: (100 - layer.h) / 2,
            })
          }
        >
          Centrer
        </button>
      </div>
      <div className="row-actions" style={{ marginTop: 6 }}>
        <button type="button" className="btn btn-accent" onClick={() => input.current?.click()}>
          Remplacer
        </button>
        <button type="button" className="btn btn-line" onClick={() => useProjectStore.getState().setTool("crop")}>
          Recadrer
        </button>
        <button type="button" className="btn btn-line" onClick={() => useProjectStore.getState().updateSelectedLayers({ crop: FULL_CROP })}>
          Cadrage original
        </button>
        <button
          type="button"
          className="btn btn-line"
          disabled={!layer.mask}
          onClick={() => useProjectStore.getState().updateSelectedLayers({ mask: null })}
        >
          Retirer le masque
        </button>
        <button type="button" className="btn btn-line" onClick={() => solo(layer.id, layer.panelId, true)}>
          Isoler
        </button>
        <button type="button" className="btn btn-line" onClick={() => solo(layer.id, layer.panelId, false)}>
          Tout afficher
        </button>
      </div>
      <div className="prop-grid" style={{ marginTop: 8 }}>
        <label className="field">
          <span>Lumière {Math.round((layer.brightness ?? 1) * 100)}</span>
          <input
            type="range"
            min={40}
            max={180}
            value={Math.round((layer.brightness ?? 1) * 100)}
            onChange={(e) => useProjectStore.getState().updateSelectedLayers({ brightness: Number(e.target.value) / 100 })}
          />
        </label>
        <label className="field">
          <span>Contraste {Math.round((layer.contrast ?? 1) * 100)}</span>
          <input
            type="range"
            min={40}
            max={180}
            value={Math.round((layer.contrast ?? 1) * 100)}
            onChange={(e) => useProjectStore.getState().updateSelectedLayers({ contrast: Number(e.target.value) / 100 })}
          />
        </label>
        <label className="field">
          <span>Teinte</span>
          <input
            type="color"
            value={layer.tint && /^#[0-9a-fA-F]{6}$/.test(layer.tint) ? layer.tint : "#ff9d2e"}
            onChange={(e) => useProjectStore.getState().updateSelectedLayers({ tint: e.target.value, tintAmount: layer.tintAmount || 0.35 })}
          />
        </label>
        <label className="field">
          <span>Force {Math.round((layer.tintAmount ?? 0) * 100)}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round((layer.tintAmount ?? 0) * 100)}
            onChange={(e) => useProjectStore.getState().updateSelectedLayers({ tintAmount: Number(e.target.value) / 100 })}
          />
        </label>
      </div>
      <input
        ref={input}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) void replaceImage(file);
        }}
      />
    </div>
  );
}

function fit(mode: "contain" | "cover" | "fill") {
  const state = useProjectStore.getState();
  const layer = primaryLayer(state);
  if (!layer || layer.type !== "image") return;
  if (mode === "fill") {
    state.updateSelectedLayers({ x: 0, y: 0, w: 100, h: 100 });
    return;
  }
  const panel = state.panels.find((p) => p.id === layer.panelId);
  const page = state.pages.find((p) => p.id === panel?.pageId);
  const src = resolveSrc(state.assets.find((a) => a.id === layer.assetId), state.blobUrls);
  if (!panel || !page || !src) return;
  const img = new Image();
  img.onload = () => {
    const pw = (page.width * panel.w) / 100;
    const ph = (page.height * panel.h) / 100;
    if (!pw || !ph || !img.naturalWidth || !img.naturalHeight) return;
    const ir = img.naturalWidth / img.naturalHeight;
    const pr = pw / ph;
    const wider = ir > pr;
    let w = 100;
    let h = 100;
    if (mode === "contain") {
      if (wider) h = (pr / ir) * 100;
      else w = (ir / pr) * 100;
    } else if (wider) w = (ir / pr) * 100;
    else h = (pr / ir) * 100;
    useProjectStore.getState().updateSelectedLayers({
      x: (100 - w) / 2,
      y: (100 - h) / 2,
      w,
      h,
    });
  };
  img.src = src;
}

function solo(id: string, panelId: string, isolate: boolean) {
  const state = useProjectStore.getState();
  state.patchLayers(
    state.layers.map((layer) => {
      if (layer.panelId !== panelId || layer.type !== "image") return layer;
      return { ...layer, visible: isolate ? layer.id === id : true };
    }),
  );
}

async function replaceImage(file: File) {
  if (!file.type.startsWith("image/")) {
    useProjectStore.getState().toast("Formats acceptés : PNG, JPG, WEBP, SVG, GIF.");
    return;
  }
  const data = await readFileAsDataUrl(file);
  const id = uid("asset");
  await idbSet(id, data);
  const current = primaryLayer(useProjectStore.getState());
  const previous = useProjectStore.getState().assets.find((a) => a.id === current?.assetId);
  useProjectStore.getState().addAsset(
    {
      id,
      name: file.name.replace(/\.[^.]+$/, "") || "Import",
      description: "",
      category: previous?.category ?? "photo",
      tags: ["import"],
      favorite: false,
      createdAt: Date.now(),
      source: "import",
      src: `idb:${id}`,
      mime: file.type || "image/png",
    },
    data,
  );
  useProjectStore.getState().updateSelectedLayers({ assetId: id });
  useProjectStore.getState().toast("Image du calque remplacée.");
}
