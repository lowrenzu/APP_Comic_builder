import { BlendModePanel } from "@/components/BlendModePanel";
import { ImageLayerPanel } from "@/components/ImageLayerPanel";
import { MaskPanel } from "@/components/MaskPanel";
import { SoundEffectPanel } from "@/components/SoundEffectPanel";
import { SpeechBubblePanel } from "@/components/SpeechBubblePanel";
import { TransformPanel } from "@/components/TransformPanel";
import { UI_FONTS, resolveFont } from "@/utils/fonts";
import { primaryLayer, useProjectStore } from "@/store/projectStore";

import { PRESET_LABEL } from "@/data/templates";

export function PropertiesPanel() {
  const layer = useProjectStore((s) => primaryLayer(s));
  const panel = useProjectStore((s) => s.panels.find((p) => p.id === s.selectedPanelId));
  const page = useProjectStore((s) => s.pages.find((p) => p.id === s.selectedPageId));
  const updateLayer = useProjectStore((s) => s.updateSelectedLayers);
  const updatePanel = useProjectStore((s) => s.updatePanel);
  const updatePage = useProjectStore((s) => s.updatePage);
  const rename = useProjectStore((s) => s.renameLayer);

  let title = "Propriétés de la page";
  if (layer?.type === "image") title = "Propriétés de l'image";
  else if (layer?.type === "text") title = "Propriétés du texte";
  else if (layer?.type === "bubble") title = "Propriétés de la bulle";
  else if (layer?.type === "sfx") title = "Propriétés de l'onomatopée";
  else if (layer?.type === "group") title = "Propriétés du groupe";
  else if (panel && !layer) title = "Propriétés de la case";

  return (
    <section className="inspector-props">
      <div className="pane-head">
        <div>
          <div className="pane-kicker">Inspecteur</div>
          <div className="pane-title">{title}</div>
        </div>
      </div>
      {layer ? (
        <>
          <div className="prop-block">
            <label className="field">
              <span>Nom</span>
              <input value={layer.name} onChange={(e) => rename(layer.id, e.target.value)} />
            </label>
            <p className="hint">Type · {layer.type}</p>
          </div>
          <TransformPanel />
          <BlendModePanel />
          {layer.type === "image" ? <ImageLayerPanel /> : null}
          {layer.type === "image" || layer.type === "text" || layer.type === "bubble" || layer.type === "sfx" ? <MaskPanel /> : null}
          {layer.type === "text" || layer.type === "bubble" || layer.type === "sfx" ? (
            <div className="prop-block">
              <div className="pane-kicker">Texte</div>
              {layer.type === "text" ? (
                <label className="field">
                  <span>Contenu</span>
                  <textarea value={layer.text} onChange={(e) => updateLayer({ text: e.target.value })} />
                </label>
              ) : null}
              <div className="prop-grid">
                <label className="field">
                  <span>Police</span>
                  <select value={resolveFont(layer.fontFamily)} onChange={(e) => updateLayer({ fontFamily: e.target.value })}>
                    {UI_FONTS.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>Taille</span>
                  <input type="number" value={layer.fontSize} onChange={(e) => updateLayer({ fontSize: Number(e.target.value) })} />
                </label>
                <label className="field">
                  <span>Couleur</span>
                  <input type="color" value={toHex(layer.color)} onChange={(e) => updateLayer({ color: e.target.value })} />
                </label>
                <label className="field">
                  <span>Graisse</span>
                  <input type="number" step={100} min={400} max={800} value={layer.fontWeight} onChange={(e) => updateLayer({ fontWeight: Number(e.target.value) })} />
                </label>
              </div>
              <div className="seg" style={{ marginTop: 8 }}>
                {(["left", "center", "right"] as const).map((align) => (
                  <button key={align} type="button" data-on={layer.align === align ? "true" : "false"} onClick={() => updateLayer({ align })}>
                    {align === "left" ? "Gauche" : align === "right" ? "Droite" : "Centre"}
                  </button>
                ))}
                <button type="button" data-on={layer.italic ? "true" : "false"} onClick={() => updateLayer({ italic: !layer.italic })}>
                  Italique
                </button>
              </div>
            </div>
          ) : null}
          <SpeechBubblePanel />
          <SoundEffectPanel />
        </>
      ) : null}
      {!layer && panel ? (
        <div className="prop-block">
          <div className="pane-kicker">Case</div>
          <div className="prop-grid">
            <label className="field">
              <span>Fond</span>
              <input type="color" value={toHex(panel.fill)} onChange={(e) => updatePanel(panel.id, { fill: e.target.value })} />
            </label>
            <label className="field">
              <span>Bordure</span>
              <input type="color" value={toHex(panel.border)} onChange={(e) => updatePanel(panel.id, { border: e.target.value })} />
            </label>
            <label className="field">
              <span>Épaisseur</span>
              <input type="number" min={0} max={12} value={panel.borderWidth} onChange={(e) => updatePanel(panel.id, { borderWidth: Number(e.target.value) })} />
            </label>
            <label className="field">
              <span>Rayon</span>
              <input type="number" min={0} max={40} value={panel.radius} onChange={(e) => updatePanel(panel.id, { radius: Number(e.target.value) })} />
            </label>
          </div>
          <label className="field" style={{ marginTop: 8 }}>
            <span>Trame</span>
            <button type="button" className="btn btn-line" onClick={() => updatePanel(panel.id, { halftone: !panel.halftone })}>
              {panel.halftone ? "Trame active" : "Sans trame"}
            </button>
          </label>
          <div className="row-actions" style={{ marginTop: 8 }}>
            <button type="button" className="btn btn-line" onClick={() => useProjectStore.getState().splitPanel("h")}>
              Scinder H
            </button>
            <button type="button" className="btn btn-line" onClick={() => useProjectStore.getState().splitPanel("v")}>
              Scinder V
            </button>
            <button type="button" className="btn btn-line" onClick={() => useProjectStore.getState().duplicatePanel()}>
              Dupliquer
            </button>
            <button type="button" className="btn btn-line" onClick={() => useProjectStore.getState().deletePanel()}>
              Supprimer
            </button>
          </div>
        </div>
      ) : null}
      {page ? (
        <div className="prop-block">
          <div className="pane-kicker">Planche · {PRESET_LABEL[page.preset]}</div>
          <label className="field">
            <span>Nom</span>
            <input value={page.name} onChange={(e) => updatePage(page.id, { name: e.target.value })} />
          </label>
          <div className="prop-grid" style={{ marginTop: 8 }}>
            <label className="field">
              <span>Fond</span>
              <input type="color" value={toHex(page.background)} onChange={(e) => updatePage(page.id, { background: e.target.value })} />
            </label>
            <label className="field">
              <span>Largeur</span>
              <input type="number" value={page.width} onChange={(e) => updatePage(page.id, { width: Number(e.target.value) })} />
            </label>
            <label className="field">
              <span>Hauteur</span>
              <input type="number" value={page.height} onChange={(e) => updatePage(page.id, { height: Number(e.target.value) })} />
            </label>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function toHex(color: string): string {
  if (/^#[0-9a-fA-F]{6}$/.test(color)) return color;
  return "#f7f4ee";
}
